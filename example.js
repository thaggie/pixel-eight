const { start } = require("./index");

start({
  init: () => {
    return { x: 4, y: 4 };
  },

  update: ({ x, y }, buttons) => {
    if (buttons.down && y < 6) {
      y += 1;
    }
    if (buttons.up && y > 1) {
      y -= 1;
    }
    if (buttons.left && x > 1) {
      x -= 1;
    }
    if (buttons.right && x < 14) {
      x += 1;
    }
    return { x, y };
  },

  draw: (frame, { x, y }) => {
    frame.rect(0, 0, 16, 8, 7);
    frame.pset(x, y, 6);
  }
});
