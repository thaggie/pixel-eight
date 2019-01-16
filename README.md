# Pixel 8

A library inspired by the [pico-8][pico-8] API for writing games for the
[Kano Pixel][pixel-kit].

> Expect breaking changes every patch / minor until 1.0.0

## Usage

You can setup a pixel-8 project thus:

```
mkdir demo
cd demo
npm init -y
yarn add pixel-eight
```

### Example Program

```
const { start } = require("pixel-eight");

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
```

If you put the above script in a `example.js` file, you can then run it:

```
node ./example.js
```

If you install [nodemon](nodemon) it makes for a good development environment
as it'll restart each time you hit save.

```
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
