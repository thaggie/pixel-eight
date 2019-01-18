const { start, color } = require("./index");

start({
  init: () => {
    return { x: 4, y: 4 };
  },

  update: ({ x, y }, { pressed }) => {
    if (pressed.down && y < 6) {
      y += 1;
    }
    if (pressed.up && y > 1) {
      y -= 1;
    }
    if (pressed.left && x > 1) {
      x -= 1;
    }
    if (pressed.right && x < 14) {
      x += 1;
    }
    return { x, y };
  },

  draw: (frame, { x, y }) => {
    frame.cls();
    frame.rect(0, 0, 16, 8, color.lightblue);
    frame.pset(x, y, color.red);
  }
});
