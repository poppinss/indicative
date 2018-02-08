<a name="5.0.5"></a>
## [5.0.5](https://github.com/poppinss/indicative/compare/v5.0.4...v5.0.5) (2018-02-08)


### Bug Fixes

* **messages:** allow snake_case rule name in custom messages ([d5ee3cb](https://github.com/poppinss/indicative/commit/d5ee3cb))



<a name="5.0.4"></a>
## [5.0.4](https://github.com/poppinss/indicative/compare/v5.0.3...v5.0.4) (2018-02-07)


### Bug Fixes

* **builds:** remove module build ([e1fabd2](https://github.com/poppinss/indicative/commit/e1fabd2))



<a name="5.0.3"></a>
## [5.0.3](https://github.com/poppinss/indicative/compare/v5.0.2...v5.0.3) (2018-02-07)


### Bug Fixes

* **formatter:** jsonapi formatter return null in case no errors ([69a8e10](https://github.com/poppinss/indicative/commit/69a8e10))
* **validator:** handle array expressions properly ([6201721](https://github.com/poppinss/indicative/commit/6201721)), closes [#165](https://github.com/poppinss/indicative/issues/165)


### Features

* **build:** generate es module for tree-shaking ([c80feea](https://github.com/poppinss/indicative/commit/c80feea)), closes [#168](https://github.com/poppinss/indicative/issues/168)



<a name="5.0.2"></a>
## [5.0.2](https://github.com/poppinss/indicative/compare/v5.0.1...v5.0.2) (2018-01-28)



<a name="5.0.1"></a>
## [5.0.1](https://github.com/poppinss/indicative/compare/v5.0.0...v5.0.1) (2018-01-28)


### Bug Fixes

* **validator:** checks for errors length when it's an array ([5119ea9](https://github.com/poppinss/indicative/commit/5119ea9))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/poppinss/indicative/compare/v4.0.4...v5.0.0) (2018-01-28)


### Bug Fixes

* **formatters:** fix jsonapi formatter to return errors in right format ([eb74497](https://github.com/poppinss/indicative/commit/eb74497))


### Features

* **formatter:** now receives additional args argument ([8826d27](https://github.com/poppinss/indicative/commit/8826d27))


### BREAKING CHANGES

* **formatters:** Instead of returning an array, an object with key `error` is returned containing an
array of errors



<a name="4.0.4"></a>
## [4.0.4](https://github.com/poppinss/indicative/compare/v4.0.3...v4.0.4) (2018-01-12)


### Bug Fixes

* **main:** allows validations & sanitizor to be extend ([55158cd](https://github.com/poppinss/indicative/commit/55158cd))



<a name="4.0.3"></a>
## [4.0.3](https://github.com/poppinss/indicative/compare/v4.0.2...v4.0.3) (2017-12-27)



<a name="4.0.2"></a>
## [4.0.2](https://github.com/poppinss/indicative/compare/v4.0.1...v4.0.2) (2017-12-27)


### Bug Fixes

* **dateFormat:** handle timezones carefully ([c5dcb19](https://github.com/poppinss/indicative/commit/c5dcb19)), closes [#160](https://github.com/poppinss/indicative/issues/160)
* **package:** add missing dependency to generate docs ([9a4653e](https://github.com/poppinss/indicative/commit/9a4653e))


### Features

* **sanitizations:** add escape and stripLinks sanitizations ([8c03548](https://github.com/poppinss/indicative/commit/8c03548))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/poppinss/indicative/compare/v4.0.0...v4.0.1) (2017-12-26)


### Bug Fixes

* **package:** remove bin section ([d3daef8](https://github.com/poppinss/indicative/commit/d3daef8))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/poppinss/indicative/compare/v3.0.6...v4.0.0) (2017-12-26)

### Features

* initial build for browser ([931442f](https://github.com/poppinss/indicative/commit/931442f))
* **browser:** working state for browsers build ([9fde38c](https://github.com/poppinss/indicative/commit/9fde38c))
* **builds:** bundle rule and configure fn ([1f808e2](https://github.com/poppinss/indicative/commit/1f808e2))
* **formatters:** add JsonApi formatter ([4705fbb](https://github.com/poppinss/indicative/commit/4705fbb))
* **validation:** add number validation ([c266160](https://github.com/poppinss/indicative/commit/c266160))



<a name="3.0.6"></a>
## [3.0.6](https://github.com/poppinss/indicative/compare/v3.0.5...v3.0.6) (2017-11-17)


### Features

* **formatter:** allow registering a default formatter ([50fe027](https://github.com/poppinss/indicative/commit/50fe027))



<a name="3.0.5"></a>
## [3.0.5](https://github.com/poppinss/indicative/compare/v3.0.4...v3.0.5) (2017-11-17)


### Bug Fixes

* **validator:** fix promises concurrency bug with engine ([6159327](https://github.com/poppinss/indicative/commit/6159327))



<a name="3.0.4"></a>
## [3.0.4](https://github.com/poppinss/indicative/compare/v3.0.3...v3.0.4) (2017-11-17)


### Features

* **formatters:** add support for formatters ([7f332f8](https://github.com/poppinss/indicative/commit/7f332f8))
* **sanitization:** use [@slynova](https://github.com/slynova)/slug to slugify ([#155](https://github.com/poppinss/indicative/issues/155)) ([78a8b36](https://github.com/poppinss/indicative/commit/78a8b36))



<a name="3.0.3"></a>
## [3.0.3](https://github.com/poppinss/indicative/compare/v3.0.2...v3.0.3) (2017-10-29)


### Bug Fixes

* **sanitization:** only sanitize fields available in data object ([d910165](https://github.com/poppinss/indicative/commit/d910165)), closes [#150](https://github.com/poppinss/indicative/issues/150)



<a name="3.0.2"></a>
## [3.0.2](https://github.com/poppinss/indicative/compare/v3.0.1...v3.0.2) (2017-10-29)


### Bug Fixes

* **raw:** fix where `function` keyword was used as property ([c8c47a2](https://github.com/poppinss/indicative/commit/c8c47a2))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/poppinss/indicative/compare/v3.0.0...v3.0.1) (2017-10-29)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/poppinss/indicative/compare/v2.2.1...v3.0.0) (2017-08-19)


### Bug Fixes

* **rules:** work with short urls ([e9fa432](https://github.com/poppinss/indicative/commit/e9fa432))
* **sanitization:** make 2nd arg optional ([4bb95ec](https://github.com/poppinss/indicative/commit/4bb95ec)), closes [#88](https://github.com/poppinss/indicative/issues/88)
* **validateAll:** return all validation errors ([a76f146](https://github.com/poppinss/indicative/commit/a76f146)), closes [#100](https://github.com/poppinss/indicative/issues/100)


### Features

* **rule:** add a new way to define rules ([26468ac](https://github.com/poppinss/indicative/commit/26468ac))
* **typescript:** add tsd ([ccbb8fc](https://github.com/poppinss/indicative/commit/ccbb8fc))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/poppinss/indicative/compare/v2.2.0...v2.2.1) (2016-10-11)


### Bug Fixes

* **validator:** convert message field to snake_case ([cae5884](https://github.com/poppinss/indicative/commit/cae5884)), closes [#76](https://github.com/poppinss/indicative/issues/76)



<a name="2.2.0"></a>
# [2.2.0](https://github.com/poppinss/indicative/compare/v2.1.0...v2.2.0) (2016-09-23)


### Bug Fixes

* **rules:equals:** perform loose comparison ([73007b1](https://github.com/poppinss/indicative/commit/73007b1)), closes [#69](https://github.com/poppinss/indicative/issues/69)
* **validator:** fix custom message typo error ([19ec186](https://github.com/poppinss/indicative/commit/19ec186))
* **validator:extend:** make sure to set the extended rule message ([2f1054c](https://github.com/poppinss/indicative/commit/2f1054c))


### Features

* **modes:** add strict mode ([ac07f38](https://github.com/poppinss/indicative/commit/ac07f38)), closes [#72](https://github.com/poppinss/indicative/issues/72)
* **raw:** allow 63 characters long TLD in email ([bd90485](https://github.com/poppinss/indicative/commit/bd90485))
* **rule:** add string validation rule ([b0ee84a](https://github.com/poppinss/indicative/commit/b0ee84a))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/poppinss/indicative/compare/v2.1.0...v2.1.2) (2016-06-18)


### Bug Fixes

* **validator:** fix custom message typo error([19ec186](https://github.com/poppinss/indicative/commit/19ec186))
* **validator:extend:** make sure to set the extended rule message([2f1054c](https://github.com/poppinss/indicative/commit/2f1054c))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/poppinss/indicative/compare/v2.1.0...v2.1.1) (2016-06-11)


### Bug Fixes

* **validator:extend:** make sure to set the extended rule message([2f1054c](https://github.com/poppinss/indicative/commit/2f1054c))


<a name="2.0.6"></a>
## 2.0.6 (2016-02-15)

### Bug Fixes
* **validator:** Allow emails with address extension, e.g. foo+baz@bar.com ([125fe9f](https://github.com/poppinss/indicative/commit/125fe9f))


<a name="2.0.5"></a>
## 2.0.5 (2016-01-21)


### Bug Fixes

* **exported-tests:** removed unwanted exported tests ([16288bf](https://github.com/poppinss/indicative/commit/16288bf))

### Features

* **package:** added commitizen ([c8c319d](https://github.com/poppinss/indicative/commit/c8c319d))
* **sanitizaor:** Added extend method to add sanitization filters ([dc11f5a](https://github.com/poppinss/indicative/commit/dc11f5a))
* **sanitizations:** Added support for sanitizations ([ee33244](https://github.com/poppinss/indicative/commit/ee33244))



<a name="2.0.4"></a>
## 2.0.4 (2016-01-21)


### Features

* **package:** added commitizen ([c8c319d](https://github.com/poppinss/indicative/commit/c8c319d))
* **sanitizaor:** Added extend method to add sanitization filters ([dc11f5a](https://github.com/poppinss/indicative/commit/dc11f5a))
* **sanitizations:** Added support for sanitizations ([ee33244](https://github.com/poppinss/indicative/commit/ee33244))



