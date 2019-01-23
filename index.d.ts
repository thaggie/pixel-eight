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

  export interface Map {
    /** The width of the map */
    width: number;

    /** The height of the map */
    height: number;

    /** Set a pixel in the map to the color */
    pset(x, y, color: number): undefined;

    /** Get the color of a pixel in the map */
    pget(x, y): number;
  }

  /** The Frame represents the screen of the pixel */
  export interface Frame {
    /** Color a single pixel at the point (x,y) with the color c  */
    pset(x: number, y: number, color: number): undefined;

    /** Draw a map to the screen offseting into it using the x / y  */
    mset(x: number, y: number, map: Map, transparent?: number): undefined;

    /** Draw a bitmap from an exported animation */
    bset(bitmap: string[], transparent?: string);

    /** Clear the screen (color black if unspecified) */
    cls(color?: number): undefined;

    /** Draw a rectangle on the screen */
    rect(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: number
    ): undefined;

    /** Fill in a rectangle on the screen (defaults to black) */
    fill(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color?: number
    ): undefined;

    /** Write text to the screen at the given co-ordinates */
    print(text: string, x?: number, y?: number, color?: number);
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

  /** Create a map from an array of strings of hex colors */
  export function createMap(hexMap: string[]): Map;

  /** Start the game running */
  export function start(game: Game): undefined;
}
