import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "@/store/window";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();

    if (!windows[windowKey]) {
      console.warn(`WindowWrapper: No window found with key "${windowKey}"`);
      return null;
    }

    const {
      isOpen,
      zIndex,
      iconPosition,
      dockIconPosition, // optional: if you store dock icon separately
      isMinimized,
      isMaximized,
    } = windows[windowKey];

    const ref = useRef(null);

    // OPEN ANIMATION (from icon to window position)
    useGSAP(
      () => {
        const el = ref.current;
        if (!el || !isOpen) return;

        el.style.display = "block";
        gsap.set(el, { transformOrigin: "center center" });

        // Get the window's final (layout) position
        const rect = el.getBoundingClientRect();
        const windowCenterX = rect.left + rect.width / 2;
        const windowCenterY = rect.top + rect.height / 2;

        // Default open-from offset (e.g. small lift)
        let fromX = 0;
        let fromY = 40;
        let fromScale = 0.8;

        // If we know the app/dock icon position, open from there
        if (iconPosition) {
          fromX = iconPosition.x - windowCenterX;
          fromY = iconPosition.y - windowCenterY;
          fromScale = 0.1;
        }

        gsap.fromTo(
          el,
          {
            scale: fromScale,
            opacity: 0,
            x: fromX,
            y: fromY,
          },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          }
        );
      },
      // re-run when open state or icon origin changes
      [isOpen, iconPosition]
    );

    // DRAGGABLE (click brings to front)
    useGSAP(
      () => {
        const el = ref.current;
        if (!el) return;

        const [instance] = Draggable.create(el, {
          // Draggable defaults: uses x/y transforms for movement
          onPress: () => focusWindow(windowKey),
        });

        return () => {
          instance.kill();
        };
      },
      [] // only once
    );

    // MINIMIZE ANIMATION (genie-ish collapse into dock)
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isMinimized) return;

      // Respect prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        el.style.display = "none";
        return;
      }

      // Prefer explicit dockIconPosition; fall back to app icon; then center bottom
      const originPos = dockIconPosition || iconPosition;

      const dockX =
        originPos?.x ??
        (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
      const dockY =
        originPos?.y ??
        (typeof window !== "undefined" ? window.innerHeight - 40 : 0);

      // Get current transforms (from dragging)
      const currentTransform = gsap.getProperty(el, "x");
      const currentTransformY = gsap.getProperty(el, "y");

      // Current window geometry (includes current transforms)
      const rect = el.getBoundingClientRect();
      const windowCenterX = rect.left + rect.width / 2;
      const windowBottom = rect.bottom;

      // Calculate absolute distance from current visual position to dock
      const toX = dockX - windowCenterX;
      const toY = dockY - windowBottom;

      gsap.set(el, { transformOrigin: "bottom center" });

      const tl = gsap.timeline({
        onComplete: () => {
          // Hide and reset transforms so future open animation
          // measures layout from the "resting" position.
          el.style.display = "none";
          gsap.set(el, {
            clearProps: "transform", // clears x, y, scale, etc.
          });
        },
      });

      // Smooth, organic genie effect
      tl.to(el, {
        duration: 0.12,
        scaleY: 1.04,
        scaleX: 0.98,
        ease: "power1.out",
      })
        // Single smooth collapse with all transformations happening together
        .to(el, {
          duration: 0.55,
          x: `+=${toX}`,
          y: `+=${toY}`,
          scaleY: 0,
          scaleX: 0.15,
          opacity: 0,
          ease: "power2.in",
        });
    }, [isMinimized, dockIconPosition, iconPosition]);

    // HANDLE MAXIMIZE STATE - clear transforms when maximized
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isMaximized) {
        // Clear any drag transforms so the CSS maximized class works properly
        gsap.set(el, { x: 0, y: 0, clearProps: "transform" });
      }
    }, [isMaximized]);

    // HANDLE DISPLAY WHEN CLOSED (not minimized)
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Only handle display for open/close, not minimize (animation handles that)
      if (!isOpen) {
        el.style.display = "none";
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute will-change-transform [backface-visibility:hidden] ${
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
