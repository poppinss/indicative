# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.1.1](https://github.com/poppinss/indicative/compare/v7.1.0...v7.1.1) (2019-04-02)

**Note:** Version bump only for package indicative





# [7.1.0](https://github.com/poppinss/indicative/compare/v7.0.0...v7.1.0) (2019-04-01)


### Features

* **indicative:** add support for config and extending validations ([876417f](https://github.com/poppinss/indicative/commit/876417f))





# [7.0.0](https://github.com/poppinss/indicative/compare/v5.0.8...v7.0.0) (2019-04-01)


### Bug Fixes

* fix exports from main module ([5b349c6](https://github.com/poppinss/indicative/commit/5b349c6))
* **compiler:** add parser as prod dependency, required by ts compiler ([7629b5e](https://github.com/poppinss/indicative/commit/7629b5e))
* **indicative:** broken package.json file ([7e7095a](https://github.com/poppinss/indicative/commit/7e7095a))
* **lerna:** build packages before running tests ([e40f4bf](https://github.com/poppinss/indicative/commit/e40f4bf))
* **parser:** ensure rules string is defined and not empty ([a972422](https://github.com/poppinss/indicative/commit/a972422))
* **parser:** handle object schema nodes properly ([d6a3fa8](https://github.com/poppinss/indicative/commit/d6a3fa8))
* **rules:** fix case sensitive paths ([f578641](https://github.com/poppinss/indicative/commit/f578641))
* **webpack:** define globalObject ([90b8ba7](https://github.com/poppinss/indicative/commit/90b8ba7))
* json syntax issue ([44d2aca](https://github.com/poppinss/indicative/commit/44d2aca))


### Code Refactoring

* **parser:** rename schemaParser to rulesParser ([7f0fca1](https://github.com/poppinss/indicative/commit/7f0fca1))
* **utils:** move cast functions to a single method `cast` ([a4f7cf1](https://github.com/poppinss/indicative/commit/a4f7cf1))


### Features

* **compiler:** add support for validation compile method ([bbe38f6](https://github.com/poppinss/indicative/commit/bbe38f6))
* **compiler:** expose compiler config ([918e3e6](https://github.com/poppinss/indicative/commit/918e3e6))
* **compiler:** implement compiler ([8a666ab](https://github.com/poppinss/indicative/commit/8a666ab))
* **formatters:** add vanilla formatter ([9dc6df0](https://github.com/poppinss/indicative/commit/9dc6df0))
* **indicative:** export global validator ([d0aa5aa](https://github.com/poppinss/indicative/commit/d0aa5aa))
* **indicative:** initiate validator ([79a47fc](https://github.com/poppinss/indicative/commit/79a47fc))
* **parser:** add messages parser ([b2a826e](https://github.com/poppinss/indicative/commit/b2a826e))
* **parser:** add support for indexed arrays ([74f21f1](https://github.com/poppinss/indicative/commit/74f21f1))
* **requiredIf:** accept another argument for truthy check ([bb3e149](https://github.com/poppinss/indicative/commit/bb3e149))
* **rules:** add raw validation rules ([8249dbc](https://github.com/poppinss/indicative/commit/8249dbc))
* move parser to it's own package ([fbc7764](https://github.com/poppinss/indicative/commit/fbc7764))
* use typescript & drop support for browsers ([f4a8fa9](https://github.com/poppinss/indicative/commit/f4a8fa9))
* validate subset arrays ([b1cd13a](https://github.com/poppinss/indicative/commit/b1cd13a))
* **rules:** add sanitizations ([ae3baa7](https://github.com/poppinss/indicative/commit/ae3baa7))
* **rules:** add validations ([42463bd](https://github.com/poppinss/indicative/commit/42463bd))
* **sanitizations:** add lowerCase and upperCase method ([#211](https://github.com/poppinss/indicative/issues/211)) ([7329a2e](https://github.com/poppinss/indicative/commit/7329a2e))
* **utils:** add patchValue method to mutate data values ([8de528f](https://github.com/poppinss/indicative/commit/8de528f))


### BREAKING CHANGES

* **utils:** Remove individual cast functions in favor of
`cast` method
* **parser:** schema is a generic name for any schema and rules
is a more appropriate name for the parser that parser rules
* **parser:** messages tree is similar to schema tree and hence
we need to rename `rules` property to `rhs` for a generic name
* Removed support for browsers





## [6.0.1](https://github.com/poppinss/indicative/compare/v6.0.0...v6.0.1) (2019-03-29)

**Note:** Version bump only for package indicative





# [6.0.0](https://github.com/poppinss/indicative/compare/v5.0.8...v6.0.0) (2019-03-29)


### Bug Fixes

* fix exports from main module ([9970e95](https://github.com/poppinss/indicative/commit/9970e95))
* **indicative:** broken package.json file ([a887131](https://github.com/poppinss/indicative/commit/a887131))
* **parser:** ensure rules string is defined and not empty ([a5e34d8](https://github.com/poppinss/indicative/commit/a5e34d8))
* **parser:** handle object schema nodes properly ([cfad4ae](https://github.com/poppinss/indicative/commit/cfad4ae))
* **webpack:** define globalObject ([ab242c4](https://github.com/poppinss/indicative/commit/ab242c4))


### Code Refactoring

* **parser:** rename schemaParser to rulesParser ([987dc8d](https://github.com/poppinss/indicative/commit/987dc8d))
* **utils:** move cast functions to a single method `cast` ([758e5da](https://github.com/poppinss/indicative/commit/758e5da))


### Features

* **compiler:** add support for validation compile method ([f074c24](https://github.com/poppinss/indicative/commit/f074c24))
* **compiler:** expose compiler config ([2812125](https://github.com/poppinss/indicative/commit/2812125))
* **compiler:** implement compiler ([bd4e532](https://github.com/poppinss/indicative/commit/bd4e532))
* **formatters:** add vanilla formatter ([433000d](https://github.com/poppinss/indicative/commit/433000d))
* **indicative:** export global validator ([ee7802c](https://github.com/poppinss/indicative/commit/ee7802c))
* **indicative:** initiate validator ([80a6712](https://github.com/poppinss/indicative/commit/80a6712))
* **parser:** add messages parser ([e3e185a](https://github.com/poppinss/indicative/commit/e3e185a))
* **parser:** add support for indexed arrays ([7aa1224](https://github.com/poppinss/indicative/commit/7aa1224))
* **rules:** add raw validation rules ([23da296](https://github.com/poppinss/indicative/commit/23da296))
* move parser to it's own package ([3552632](https://github.com/poppinss/indicative/commit/3552632))
* use typescript & drop support for browsers ([9f07821](https://github.com/poppinss/indicative/commit/9f07821))
* validate subset arrays ([b1cd13a](https://github.com/poppinss/indicative/commit/b1cd13a))
* **rules:** add sanitizations ([57b6553](https://github.com/poppinss/indicative/commit/57b6553))
* **rules:** add validations ([6ae7b0b](https://github.com/poppinss/indicative/commit/6ae7b0b))
* **sanitizations:** add lowerCase and upperCase method ([#211](https://github.com/poppinss/indicative/issues/211)) ([7329a2e](https://github.com/poppinss/indicative/commit/7329a2e))
* **utils:** add patchValue method to mutate data values ([84a0f56](https://github.com/poppinss/indicative/commit/84a0f56))


### BREAKING CHANGES

* **utils:** Remove individual cast functions in favor of
`cast` method
* **parser:** schema is a generic name for any schema and rules
is a more appropriate name for the parser that parser rules
* **parser:** messages tree is similar to schema tree and hence
we need to rename `rules` property to `rhs` for a generic name
* Removed support for browsers





<a name="5.0.8"></a>
## [5.0.8](https://github.com/poppinss/indicative/compare/v5.0.7...v5.0.8) (2018-08-15)



<a name="5.0.7"></a>
## [5.0.7](https://github.com/poppinss/indicative/compare/v5.0.5...v5.0.7) (2018-08-15)


### Bug Fixes

* **number:** cast value to number when strict is true ([5a2b8f2](https://github.com/poppinss/indicative/commit/5a2b8f2)), closes [#178](https://github.com/poppinss/indicative/issues/178)
* **range:** add null and non-numbers check ([ee320f3](https://github.com/poppinss/indicative/commit/ee320f3)), closes [#184](https://github.com/poppinss/indicative/issues/184)
* **striptags:** compile striptags module via babel ([40af075](https://github.com/poppinss/indicative/commit/40af075)), closes [#177](https://github.com/poppinss/indicative/issues/177) [#194](https://github.com/poppinss/indicative/issues/194)
* **validations:** cast value to number for integer & number validations ([f651f9a](https://github.com/poppinss/indicative/commit/f651f9a)), closes [#178](https://github.com/poppinss/indicative/issues/178)


### Features

* **raw:** allow raw validations to be extended ([5138106](https://github.com/poppinss/indicative/commit/5138106))
* **trim:** add trim sanitization ([aa9f0ba](https://github.com/poppinss/indicative/commit/aa9f0ba))
* **validations:** validate arrays with min&max rules ([9a7860f](https://github.com/poppinss/indicative/commit/9a7860f))



<a name="5.0.6"></a>
## [5.0.6](https://github.com/poppinss/indicative/compare/v5.0.5...v5.0.6) (2018-07-18)


### Bug Fixes

* **number:** cast value to number when strict is true ([34e67cd](https://github.com/poppinss/indicative/commit/34e67cd)), closes [#178](https://github.com/poppinss/indicative/issues/178)
* **range:** add null and non-numbers check ([4888887](https://github.com/poppinss/indicative/commit/4888887)), closes [#184](https://github.com/poppinss/indicative/issues/184)
* **striptags:** compile striptags module via babel ([04035e5](https://github.com/poppinss/indicative/commit/04035e5)), closes [#177](https://github.com/poppinss/indicative/issues/177) [#194](https://github.com/poppinss/indicative/issues/194)
* **validations:** cast value to number for integer & number validations ([35b5ee7](https://github.com/poppinss/indicative/commit/35b5ee7)), closes [#178](https://github.com/poppinss/indicative/issues/178)


### Features

* **raw:** allow raw validations to be extended ([d8dfde0](https://github.com/poppinss/indicative/commit/d8dfde0))
* **trim:** add trim sanitization ([80c0cb9](https://github.com/poppinss/indicative/commit/80c0cb9))
* **validations:** validate arrays with min&max rules ([5bbb828](https://github.com/poppinss/indicative/commit/5bbb828))



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
