const { start, color, createMap } = require("./index");

const { bitmaps } = require("./exported-animation.json");

// prettier-ignore
const map = createMap([
  'cccccccccccccccc',
  'c              c',
  'c              c',
  'c              c',
  'c              c',
  'c              c',
  'c              c',
  'cccccccccccccccc',
]);

start({
  init: () => {
    return { x: 1, y: 1 };
  },

  update: ({ x, y }, { pressed }) => {
    if (pressed.down && !map.pget(x, y + 1)) {
      y += 1;
    }
    if (pressed.up && y > 1 && !map.pget(x, y - 1)) {
      y -= 1;
    }
    if (pressed.left && x > 1 && !map.pget(x - 1, y)) {
      x -= 1;
    }
    if (pressed.right && !map.pget(x + 1, y)) {
      x += 1;
    }
    return { x, y };
  },

  draw: (frame, { x, y }) => {
    frame.bset(bitmaps[0]);
    frame.mset(0, 0, map, 0);
    frame.rect(1, 1, 15, 7, color.pink);
    frame.pset(x, y, color.red);
  }
});
