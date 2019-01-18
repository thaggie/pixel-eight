# Pixel 8

A library inspired by the [pico-8][pico-8] API for writing games for the
[Kano Pixel][pixel-kit].

> Expect breaking changes every patch / minor until 1.0.0

## Usage

You can setup a pixel-8 project thus:

```sh
mkdir demo
cd demo
npm init -y
yarn add pixel-eight
```

### Example Program

```js
const { color, createMap, start } = require("pixel-eight");

const map = createMap([
  "cccccccccccccccc",
  "c              c",
  "c              c",
  "c    56789     c",
  "c    abcde     c",
  "c              c",
  "c              c",
  "cccccccccccccccc"
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
```

If you put the above script in a `example.js` file, you can then run it:

```sh
node ./example.js
```

If you install [nodemon](nodemon) it makes for a good development environment
as it'll restart each time you hit save.

```sh
yarn add -D nodemon
./node_modules/.bin/nodemon ./example.js
```

## Contributing

Please read our [code of conduct][code-of-conduct] which comes from
[Contributor Covenant][contributor-covenant].

If you have questions, suggestions or want to contribute changes please check
the [issues list][issues] to see if it's already been raised, if not please
[create an issue][new-issue]. Please try to provide lots of context when
creating an issue, if it's a bug report please provide reproduction steps, if
it's a feature request please describe why it's valuable.

## Contact

Contact is best done through the [repository's issues][issues]. Messages that
are unsuitable for the issue tracker can be sent as direct message to my
[twitter profile][twitter-profile].

[code-of-conduct]: ./code-of-conduct.md
[contributor-covenant]: https://www.contributor-covenant.org
[issues]: https://github.com/thaggie/pixel-8/issues
[new-issue]: https://github.com/thaggie/pixel-8/issues/new
[nodemon]: https://nodemon.io
[pico-8]: https://www.lexaloffle.com/pico-8.php
[pixel-kit]: https://kano.me/store/us/products/pixel-kit
[twitter-profile]: https://twitter.com/thaggie
