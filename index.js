const DeviceManager = require("./community-sdk/communitysdk").DeviceManager;
const PixelKit = require("./community-sdk/communitysdk").RetailPixelKit;

const parseColor = color => {
  const rgb888 = parseInt(color.substring(1, 7), 16);
  //                blue                 green                  red
  const rgb565 =
    ((rgb888 & 0xf8) >> 3) |
    ((rgb888 & 0xfc00) >> 5) |
    ((rgb888 & 0xf80000) >> 8);
  return rgb565;
};

const colorMap = {
  black: parseColor("#000000"),
  darkblue: parseColor("#444477"),
  purple: parseColor("#784470"),
  darkgreen: parseColor("#446644"),
  brown: parseColor("#774433"),
  darkgrey: parseColor("#808080"),
  lightgrey: parseColor("#aaaaaa"),
  white: parseColor("#cccccc"),
  red: parseColor("#880000"),
  orange: parseColor("#cca500"),
  yellow: parseColor("#bbbb00"),
  green: parseColor("#00aa00"),
  lightblue: parseColor("#7777cc"),
  bluegrey: parseColor("#8080aa"),
  pink: parseColor("#ccaaaa"),
  beige: parseColor("#bbaaaa")
};

const color = Object.keys(colorMap).reduce((agg, color, index) => {
  agg[color] = index;
  return agg;
}, {});

const palette = Object.values(colorMap);

class Frame {
  constructor() {
    this.buffer = Buffer.alloc(128 * 2, 0);
    this.palette = palette.slice();
  }

  pset(x, y, color) {
    this.buffer.writeUInt16BE(this.palette[color], (16 * y + x) * 2);
  }

  cls(color = 0) {
    this.buffer.fill(color);
  }

  rect(x1, y1, x2, y2, color) {
    for (let x = x1; x < x2; ++x) {
      this.pset(x, y1, color);
      this.pset(x, y2 - 1, color);
    }
    for (let y = y1; y < y2; ++y) {
      this.pset(x1, y, color);
      this.pset(x2 - 1, y, color);
    }
  }

  toString() {
    return this.buffer.toString("base64");
  }
}

const createButtons = () => ({
  left: false,
  right: false,
  up: false,
  down: false,
  a: false,
  b: false,
  j: false
});

const start = ({ init, update, draw, frameRate = 100 }) => {
  return new Promise((resolve, reject) => {
    DeviceManager.listConnectedDevices().then(devices => {
      let rpk = devices.find(device => {
        return device instanceof PixelKit;
      });
      if (!rpk) {
        reject(new Error("No Pixel Kit was found :("));
      } else {
        const pressed = createButtons();
        let clicked = createButtons();
        const buttonMap = {
          "js-left": "left",
          "js-right": "right",
          "js-up": "up",
          "js-down": "down",
          "btn-A": "a",
          "btn-B": "b",
          "js-click": "j"
        };

        rpk.on("button-down", buttonId => {
          const button = buttonMap[buttonId];
          pressed[button] = true;
          clicked[button] = true;
        });

        rpk.on("button-up", buttonId => {
          const button = buttonMap[buttonId];
          pressed[button] = false;
        });

        let state = init ? init() : {};
        let ticks = 0;
        let frame = new Frame();
        setInterval(() => {
          ticks += 1;
          if (update) {
            state = update(state, { pressed, clicked }, ticks);
          }

          if (draw) {
            draw(frame, state);
          }
          rpk.rpcRequest("lightboard:on", [{ map: frame.toString() }]);
          clicked = createButtons();
        }, frameRate);
      }
    });
  });
};

module.exports = { start, color };
