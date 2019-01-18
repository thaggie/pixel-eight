declare module "pixel-eight" {
  export interface Buttons {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    a: boolean;
    b: boolean;
    j: boolean;
  }

  export interface ButtonData {
    /** The buttons that are currently pressed */
    pressed: Buttons;

    /** The buttons that were pressed during the tick */
    clicked: Buttons;
  }

  export interface Colors {
    black: number;
    darkblue: number;
    purple: number;
    darkgreen: number;
    brown: number;
    darkgrey: number;
    lightgrey: number;
    white: number;
    red: number;
    orange: number;
    yellow: number;
    green: number;
    lightblue: number;
    bluegrey: number;
    pink: number;
    beige: number;
  }

  export const colors: Colors;

  /** The Frame represents the screen of the pixel */
  export interface Frame {
    /** Color a single pixel at the point (x,y) with the color c  */
    pset(x: number, y: number, color: number): undefined;

    /** Clear the screen (color black if unspecified) */
    cls(color?: number): undefined;
    rect(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: number
    ): undefined;
  }

  /** Interface for specifying a game */
  export interface Game<T> {
    /** Initialize the game - called once */
    init?(): T;

    /** Update the game state - called once per frame */
    update?(state: T, buttons: Buttons, ticks: number): T;

    /** Draw to the screen - called once per frame */
    draw(frame: Frame, state: T): undefined;

    /** The frame rate - defaults 10 frames per second */
    frameRate?: number;
  }

  export function start(game: Game): undefined;
}
