import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "@/store/window";

// Motion system: timing tokens and eases
const MOTION = {
  durations: {
    open: 0.4,
    close: 0.2,
    minimize: 0.55,
    maximize: 0.4,
    poof: 0.4,
  },
  eases: {
    open: "power3.out",
    close: "power2.in",
    minimize: "power2.in",
    maximize: "back.out(1.2)",
    restore: "back.out(1.7)",
    poof: "power2.out",
  },
};

// Check if user prefers reduced motion
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Helper: create poof particles using GSAP
const createPoofEffect = (el, onComplete) => {
  if (prefersReducedMotion()) {
    onComplete?.();
    return null;
  }

  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    left: ${centerX}px;
    top: ${centerY}px;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(container);

  const particleCount = 16;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #d1d5db;
      filter: blur(4px);
    `;
    container.appendChild(particle);
    particles.push(particle);
  }

  const tl = gsap.timeline({
    onComplete: () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      onComplete?.();
    },
  });

  particles.forEach((particle, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 40 + Math.random() * 30;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 20;

    tl.fromTo(
      particle,
      { x: 0, y: 0, scale: 0, opacity: 0.8 },
      {
        x,
        y,
        scale: 1 + Math.random() * 0.5,
        opacity: 0,
        duration: MOTION.durations.poof + Math.random() * 0.2,
        ease: MOTION.eases.poof,
      },
      0
    );
  });

  return tl;
};

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { maximizeWindow, focusWindow, windows } = useWindowStore();
    const ref = useRef(null);
    const dragInstanceRef = useRef(null);
    const poofTlRef = useRef(null);
    const minimizeTlRef = useRef(null);
    const prevStateRef = useRef({ isOpen: false, isMinimized: false });
    const prevMaximizedRef = useRef(false);

    // Get window data
    const windowData = windows[windowKey];
    const {
      isOpen = false,
      zIndex = 1000,
      iconPosition = null,
      dockIconPosition = null,
      isMinimized = false,
      isMaximized = false,
    } = windowData || {};

    // Single unified GSAP context for all animations and interactions
    useGSAP(
      () => {
        const el = ref.current;
        if (!el || !windowData) return;

        const reducedMotion = prefersReducedMotion();
        const prevState = prevStateRef.current;
        const wasOpen = prevState.isOpen;
        const wasMinimized = prevState.isMinimized;
        const wasMaximized = prevMaximizedRef.current;

        // DRAGGABLE SETUP - only when window is open
        if (isOpen && !dragInstanceRef.current) {
          const header = el.querySelector("#window-header");
          if (header) {
            dragInstanceRef.current = Draggable.create(el, {
              trigger: header,
              type: "x,y",
              bounds: typeof window !== "undefined" ? window : undefined,
              edgeResistance: 0.65,
              onDragStart: function () {
                focusWindow(windowKey);
              },
              onClick: function () {
                const now = Date.now();
                const lastClick = this.lastClickTime || 0;
                this.lastClickTime = now;

                if (now - lastClick < 300) {
                  maximizeWindow(windowKey);
                }
              },
            })[0];
          }
        }

        // OPENING ANIMATION
        if (!wasOpen && isOpen && !isMinimized) {
          gsap.killTweensOf(el);
          el.style.display = "block";
          gsap.set(el, { transformOrigin: "center center" });

          if (reducedMotion) {
            gsap.set(el, { opacity: 1, scale: 1, x: 0, y: 0 });
          } else {
            const rect = el.getBoundingClientRect();
            const windowCenterX = rect.left + rect.width / 2;
            const windowCenterY = rect.top + rect.height / 2;

            let fromX = 0;
            let fromY = 40;
            let fromScale = 0.8;

            if (iconPosition) {
              fromX = iconPosition.x - windowCenterX;
              fromY = iconPosition.y - windowCenterY;
              fromScale = 0.1;
            }

            gsap.fromTo(
              el,
              { scale: fromScale, opacity: 0, x: fromX, y: fromY },
              {
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0,
                duration: MOTION.durations.open,
                ease: MOTION.eases.open,
              }
            );
          }
        }

        // CLOSING ANIMATION (with poof effect)
        else if (wasOpen && !isOpen && !wasMinimized) {
          gsap.killTweensOf(el);

          if (reducedMotion) {
            el.style.display = "none";
            gsap.set(el, { clearProps: "all" });
          } else {
            // Kill any existing poof animation
            if (poofTlRef.current) {
              poofTlRef.current.kill();
              poofTlRef.current = null;
            }

            // Window shrink
            gsap.to(el, {
              scale: 0.5,
              opacity: 0,
              duration: MOTION.durations.close,
              ease: MOTION.eases.close,
            });

            // Poof effect
            poofTlRef.current = createPoofEffect(el, () => {
              el.style.display = "none";
              gsap.set(el, { clearProps: "transform,opacity,scale" });
              poofTlRef.current = null;
            });
          }
        }

        // MINIMIZING ANIMATION (genie effect)
        else if (isOpen && !wasMinimized && isMinimized) {
          gsap.killTweensOf(el);

          if (reducedMotion) {
            el.style.display = "none";
            gsap.set(el, { clearProps: "transform" });
          } else {
            const originPos = dockIconPosition || iconPosition;
            const dockX =
              originPos?.x ??
              (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
            const dockY =
              originPos?.y ??
              (typeof window !== "undefined" ? window.innerHeight - 40 : 0);

            const rect = el.getBoundingClientRect();
            const windowCenterX = rect.left + rect.width / 2;
            const windowBottom = rect.bottom;

            const toX = dockX - windowCenterX;
            const toY = dockY - windowBottom;

            gsap.set(el, { transformOrigin: "bottom center" });

            minimizeTlRef.current = gsap.timeline({
              onComplete: () => {
                el.style.display = "none";
                gsap.set(el, { clearProps: "transform" });
                minimizeTlRef.current = null;
              },
            });

            minimizeTlRef.current
              .to(el, {
                duration: 0.12,
                scaleY: 1.04,
                scaleX: 0.98,
                ease: "power1.out",
              })
              .to(el, {
                duration: MOTION.durations.minimize,
                x: `+=${toX}`,
                y: `+=${toY}`,
                scaleY: 0,
                scaleX: 0.15,
                opacity: 0,
                ease: MOTION.eases.minimize,
              });
          }
        }

        // UN-MINIMIZING ANIMATION
        else if (wasMinimized && !isMinimized && isOpen) {
          gsap.killTweensOf(el);
          el.style.display = "block";
          gsap.set(el, { clearProps: "transform" });

          if (reducedMotion) {
            gsap.set(el, { opacity: 1, scale: 1 });
          } else {
            gsap.fromTo(
              el,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
            );
          }
        }

        // MAXIMIZING ANIMATION
        if (!wasMaximized && isMaximized) {
          gsap.killTweensOf(el);

          if (reducedMotion) {
            gsap.set(el, { clearProps: "transform,borderRadius,opacity" });
          } else {
            gsap.fromTo(
              el,
              { scale: 0.7, opacity: 0.8, borderRadius: "20px" },
              {
                scale: 1,
                opacity: 1,
                borderRadius: "0px",
                duration: MOTION.durations.maximize,
                ease: MOTION.eases.maximize,
                onComplete: () => {
                  gsap.set(el, {
                    clearProps: "transform,borderRadius,opacity",
                  });
                },
              }
            );
          }
        }

        // RESTORING FROM MAXIMIZE
        else if (wasMaximized && !isMaximized) {
          gsap.killTweensOf(el);

          if (reducedMotion) {
            gsap.set(el, { clearProps: "scale,borderRadius" });
          } else {
            gsap.fromTo(
              el,
              { scale: 1, borderRadius: "0px" },
              {
                scale: 1,
                borderRadius: "12px",
                duration: MOTION.durations.maximize,
                ease: MOTION.eases.restore,
                clearProps: "scale,borderRadius",
              }
            );
          }
        }

        // Update state refs
        prevStateRef.current = { isOpen, isMinimized };
        prevMaximizedRef.current = isMaximized;

        // Cleanup function
        return () => {
          if (poofTlRef.current) {
            poofTlRef.current.kill();
            poofTlRef.current = null;
          }
          if (minimizeTlRef.current) {
            minimizeTlRef.current.kill();
            minimizeTlRef.current = null;
          }
        };
      },
      {
        dependencies: [
          isOpen,
          isMinimized,
          isMaximized,
          iconPosition,
          dockIconPosition,
          windowData,
        ],
        scope: ref,
      }
    );

    // Cleanup draggable when window closes
    useLayoutEffect(() => {
      if (!isOpen && dragInstanceRef.current) {
        dragInstanceRef.current.kill();
        dragInstanceRef.current = null;
      }
    }, [isOpen]);

    // Initial display state
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || !windowData) return;

      if (!isOpen) {
        el.style.display = "none";
      }
    }, [windowData]);

    // Early return after all hooks
    if (!windowData) {
      console.warn(`WindowWrapper: No window found with key "${windowKey}"`);
      return null;
    }

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute will-change-transform ${
          isMaximized ? "maximized inset-0" : ""
        }`}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
