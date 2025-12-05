import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "@/store/window";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const ref = useRef(null);
    const prevStateRef = useRef({ isOpen: false, isMinimized: false });

    // Get window data (may be undefined)
    const windowData = windows[windowKey];
    const {
      isOpen = false,
      zIndex = 1000,
      iconPosition = null,
      dockIconPosition = null,
      isMinimized = false,
      isMaximized = false,
    } = windowData || {};

    // 1. DRAGGABLE - Make window draggable by header and focus on click
    useGSAP(() => {
      const el = ref.current;
      if (!el || !windowData) return;

      const header = el.querySelector("#window-header");
      if (!header) return;

      const [instance] = Draggable.create(el, {
        trigger: header,
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, [windowData]);

    // 2. MAIN ANIMATION CONTROLLER - Handles open, close, minimize
    useGSAP(() => {
      const el = ref.current;
      if (!el || !windowData) return;

      const prevState = prevStateRef.current;
      const wasOpen = prevState.isOpen;
      const wasMinimized = prevState.isMinimized;

      // OPENING: window opens (wasn't open before, now is open)
      if (!wasOpen && isOpen && !isMinimized) {
        // Kill any running animations first
        gsap.killTweensOf(el);

        el.style.display = "block";
        gsap.set(el, { transformOrigin: "center center" });

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
            duration: 0.4,
            ease: "power3.out",
          }
        );
      }

      // CLOSING: window closes (was open, now not open)
      // Use wasMinimized to check if it was minimizing before close
      else if (wasOpen && !isOpen && !wasMinimized) {
        // Kill any running animations first
        gsap.killTweensOf(el);

        // Create poof particles at center
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create container for poof effect
        const poofContainer = document.createElement("div");
        poofContainer.style.position = "fixed";
        poofContainer.style.left = `${centerX}px`;
        poofContainer.style.top = `${centerY}px`;
        poofContainer.style.pointerEvents = "none";
        poofContainer.style.zIndex = "9999";
        document.body.appendChild(poofContainer);

        // Create multiple smoke particles
        const particleCount = 16;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.style.position = "absolute";
          particle.style.width = "20px";
          particle.style.height = "20px";
          particle.style.borderRadius = "50%";
          particle.style.backgroundColor = "#d1d5db";
          particle.style.filter = "blur(4px)";
          poofContainer.appendChild(particle);
          particles.push(particle);
        }

        // Animate window shrinking into poof
        gsap.to(el, {
          scale: 0.5,
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        });

        // Animate particles spreading out and fading
        particles.forEach((particle, i) => {
          const angle = (i / particleCount) * Math.PI * 2;
          const distance = 40 + Math.random() * 30;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance - 20; // Slight upward bias

          gsap.fromTo(
            particle,
            {
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0.8,
            },
            {
              x,
              y,
              scale: 1 + Math.random() * 0.5,
              opacity: 0,
              duration: 0.4 + Math.random() * 0.2,
              ease: "power2.out",
            }
          );
        });

        // Cleanup
        setTimeout(() => {
          el.style.display = "none";
          gsap.set(el, { clearProps: "transform,opacity,scale" });
          document.body.removeChild(poofContainer);
        }, 600);
      }

      // MINIMIZING: window gets minimized (is still open but becomes minimized)
      else if (isOpen && !wasMinimized && isMinimized) {
        const originPos = dockIconPosition || iconPosition;
        const dockX = originPos?.x ?? window.innerWidth / 2;
        const dockY = originPos?.y ?? window.innerHeight - 40;

        const rect = el.getBoundingClientRect();
        const windowCenterX = rect.left + rect.width / 2;
        const windowBottom = rect.bottom;

        const toX = dockX - windowCenterX;
        const toY = dockY - windowBottom;

        gsap.set(el, { transformOrigin: "bottom center" });

        const tl = gsap.timeline({
          onComplete: () => {
            el.style.display = "none";
            gsap.set(el, { clearProps: "transform" });
          },
        });

        tl.to(el, {
          duration: 0.12,
          scaleY: 1.04,
          scaleX: 0.98,
          ease: "power1.out",
        }).to(el, {
          duration: 0.55,
          x: `+=${toX}`,
          y: `+=${toY}`,
          scaleY: 0,
          scaleX: 0.15,
          opacity: 0,
          ease: "power2.in",
        });
      }

      // UN-MINIMIZING: window was minimized, now opening again
      else if (wasMinimized && !isMinimized && isOpen) {
        el.style.display = "block";
        gsap.set(el, { clearProps: "transform" });
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }

      // Update previous state
      prevStateRef.current = { isOpen, isMinimized };
    }, [isOpen, isMinimized, iconPosition, dockIconPosition, windowData]);

    // 3. MAXIMIZE HANDLER - Clear transforms when maximized
    useGSAP(() => {
      const el = ref.current;
      if (!el || !windowData) return;

      if (isMaximized) {
        gsap.set(el, { x: 0, y: 0, clearProps: "transform" });
      }
    }, [isMaximized, windowData]);

    // 4. INITIAL DISPLAY STATE
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || !windowData) return;

      if (!isOpen) {
        el.style.display = "none";
      }
    }, [windowData]);

    // Early return after all hooks have been called
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
