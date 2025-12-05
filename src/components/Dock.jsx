import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";

import { dockApps } from "@/constants";
import { useGSAP } from "@gsap/react";
import useWindowStore from "@/store/window";

const Dock = () => {
  const { openWindow, minimizeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width: iconWidth } =
          icon.getBoundingClientRect();
        const iconCenter = iconLeft - left + iconWidth / 2;
        const distance = Math.abs(mouseX - iconCenter);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.3,
          ease: "power1.out",
          overwrite: "auto",
        });
      });
    };

    const handleMouseMove = (event) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(event.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        })
      );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app, event) => {
    if (!app.canOpen) return;

    const window = windows[app.id];

    if (!window) {
      console.error(`No window configuration found for app id: ${app.id}`);
      return;
    }

    // If window is minimized, just restore it (un-minimize)
    if (window.isMinimized) {
      const iconElement = event.currentTarget;
      const rect = iconElement.getBoundingClientRect();
      const iconPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
      openWindow(app.id, null, iconPosition);
    } else if (window.isOpen) {
      // If already open, minimize it instead of closing
      minimizeWindow(app.id);
    } else {
      const iconElement = event.currentTarget;
      const rect = iconElement.getBoundingClientRect();
      const iconPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
      openWindow(app.id, null, iconPosition);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon origin-bottom will-change-transform"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={(e) => toggleApp({ id, canOpen }, e)}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
