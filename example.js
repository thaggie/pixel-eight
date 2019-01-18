const { start, color, createMap } = require("./index");

// prettier-ignore
const map = createMap([
  'cccccccccccccccc',
  'c              c',
  'c              c',
  'c    56789     c',
  'c    abcde     c',
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
    frame.mset(0, 0, map);
    frame.rect(3, 1, 12, 7, color.pink);
    frame.pset(x, y, color.red);
  }
});
