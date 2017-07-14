<a name="1.2.1"></a>
## [1.2.1](https://github.com/davidchin/react-input-range/compare/v1.2.0...v1.2.1) (2017-07-14)


### Bug Fixes

* Always set slider dragging back to false ([#98](https://github.com/davidchin/react-input-range/issues/98)) ([d22fa26](https://github.com/davidchin/react-input-range/commit/d22fa26))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/davidchin/react-input-range/compare/v1.1.5...v1.2.0) (2017-07-09)


### Features

* Add track dragging functionality ([#91](https://github.com/davidchin/react-input-range/issues/91)) ([4a8ca26](https://github.com/davidchin/react-input-range/commit/4a8ca26))



<a name="1.1.5"></a>
## [1.1.5](https://github.com/davidchin/react-input-range/compare/v1.1.4...v1.1.5) (2017-07-09)


### Bug Fixes

* Fix Typescript definition file ([4935745](https://github.com/davidchin/react-input-range/commit/4935745))



<a name="1.1.4"></a>
## [1.1.4](https://github.com/davidchin/react-input-range/compare/v1.1.3...v1.1.4) (2017-05-20)


### Bug Fixes

* Remove event listener handleTouchEnd when Slider unmount ([#89](https://github.com/davidchin/react-input-range/issues/89)) ([660fa5c](https://github.com/davidchin/react-input-range/commit/660fa5c))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/davidchin/react-input-range/compare/v1.1.2...v1.1.3) (2017-05-03)


### Changes

* Include prop-types package to support React 15.5 ([1939f6c](https://github.com/davidchin/react-input-range/commit/1939f6c))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/davidchin/react-input-range/compare/v1.1.1...v1.1.2) (2017-03-30)


### Bug Fixes

* **build:** Fix requiring React as an external dependency ([903eadb](https://github.com/davidchin/react-input-range/commit/903eadb))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/davidchin/react-input-range/compare/v1.1.0...v1.1.1) (2017-03-28)


### Bug Fixes

* Only uglify and minify min.js files ([c73a491](https://github.com/davidchin/react-input-range/commit/c73a491))


<a name="1.1.0"></a>
# [1.1.0](https://github.com/davidchin/react-input-range/compare/v1.0.2...v1.1.0) (2017-03-26)


### Features

* Add a callback prop responsible for notifying the start of any interaction ([#66](https://github.com/davidchin/react-input-range/issues/66)) ([4ca6ea2](https://github.com/davidchin/react-input-range/commit/4ca6ea2))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/davidchin/react-input-range/compare/v1.0.1...v1.0.2) (2017-02-01)


### Bug Fixes

* Fix the display glitch affecting moving sliders in Safari ([69c9511](https://github.com/davidchin/react-input-range/commit/69c9511))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/davidchin/react-input-range/compare/v1.0.0...v1.0.1) (2017-01-31)


### Bug Fixes

* Fix CommonJS and global default exports ([ff39e9d](https://github.com/davidchin/react-input-range/commit/ff39e9d))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/davidchin/react-input-range/compare/v0.10.0...v1.0.0) (2017-01-30)


### Bug Fixes

* Fix a display glitch affecting labels on mobile devices ([d809046](https://github.com/davidchin/react-input-range/commit/d809046))
* Render hidden inputs with values ([57c44f8](https://github.com/davidchin/react-input-range/commit/57c44f8))


### Breaking

* Bump React version to `^15.0.0` ([d741a58](https://github.com/davidchin/react-input-range/commit/d741a58))
* Remove Bower support ([7a28c64](https://github.com/davidchin/react-input-range/commit/7a28c64))
* Change `onChange` and `onChangeComplete` callback signature. They no longer pass the component as a parameter ([c824064](https://github.com/davidchin/react-input-range/commit/c824064))
* Remove `labelPrefix` and `labelSuffix` props. Use `formatLabel` prop to format labels instead. Remove `defaultValue` prop. Use `value` prop to set an initial value instead ([bb40806](https://github.com/davidchin/react-input-range/commit/bb40806))
* Change the naming convention of CSS classes to BEM ([9e22025](https://github.com/davidchin/react-input-range/commit/9e22025))
* Change `classNames` prop to accept a different set of keys ([92277fe](https://github.com/davidchin/react-input-range/commit/92277fe))
