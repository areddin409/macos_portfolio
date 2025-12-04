import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
/**
 * Window Management Store
 *
 * This Zustand store manages the state of all windows in the macOS portfolio application.
 * It handles window visibility, z-index layering, and window-specific data.
 *
 * Uses the Immer middleware for immutable state updates with a mutable-like syntax.
 */

/**
 * @typedef {Object} WindowState
 * @property {Object} windows - Collection of all window configurations keyed by window identifier
 * @property {number} nextZIndex - The next available z-index value for window layering
 * @property {Function} openWindow - Opens a window and brings it to the front
 * @property {Function} closeWindow - Closes a window and resets its state
 * @property {Function} focusWindow - Brings a window to the front without changing other properties
 * @property {Function} minimizeWindow - Minimizes a window
 * @property {Function} maximizeWindow - Toggles window maximize state
 */

/**
 * Window management store hook
 *
 * @returns {WindowState} The window store state and actions
 */
const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    /**
     * Opens a window and brings it to the front
     *
     * @param {string} windowKey - The unique identifier for the window
     * @param {*} data - Optional data to pass to the window (defaults to existing data if null)
     * @param {Object} iconPosition - The position of the clicked icon {x, y, width, height}
     */
    openWindow: (windowKey, data = null, iconPosition = null) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isOpen = true;
        window.isMinimized = false;
        window.zIndex = state.nextZIndex;
        window.data = data ?? window.data;
        window.iconPosition = iconPosition;
        state.nextZIndex++;
      }),

    /**
     * Closes a window and resets its state
     *
     * @param {string} windowKey - The unique identifier for the window to close
     */
    closeWindow: (windowKey) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isOpen = false;
        window.zIndex = INITIAL_Z_INDEX;
        window.data = null;
        window.iconPosition = null;
        window.isMinimized = false;
        window.isMaximized = false;
      }),

    /**
     * Brings a window to the front by assigning it the highest z-index
     *
     * @param {string} windowKey - The unique identifier for the window to focus
     */
    focusWindow: (windowKey) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.zIndex = state.nextZIndex++;
      }),

    /**
     * Minimizes a window (hides it but keeps it open)
     *
     * @param {string} windowKey - The unique identifier for the window to minimize
     */
    minimizeWindow: (windowKey) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isMinimized = true;
      }),

    /**
     * Toggles the maximize state of a window
     *
     * @param {string} windowKey - The unique identifier for the window to maximize/restore
     */
    maximizeWindow: (windowKey) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isMaximized = !window.isMaximized;
      }),
  }))
);

export default useWindowStore;
