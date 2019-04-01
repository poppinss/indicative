# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [7.0.0](http://github.com/poppinss/indicative/tree/master/packages/parser/compare/v5.0.8...v7.0.0) (2019-04-01)


### Bug Fixes

* **parser:** ensure rules string is defined and not empty ([a972422](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/a972422))
* **parser:** handle object schema nodes properly ([d6a3fa8](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/d6a3fa8))


### Code Refactoring

* **parser:** rename schemaParser to rulesParser ([7f0fca1](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/7f0fca1))


### Features

* move parser to it's own package ([fbc7764](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/fbc7764))
* use typescript & drop support for browsers ([f4a8fa9](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/f4a8fa9))
* **parser:** add messages parser ([b2a826e](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/b2a826e))
* **parser:** add support for indexed arrays ([74f21f1](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/74f21f1))


### BREAKING CHANGES

* **parser:** schema is a generic name for any schema and rules
is a more appropriate name for the parser that parser rules
* **parser:** messages tree is similar to schema tree and hence
we need to rename `rules` property to `rhs` for a generic name
* Removed support for browsers





# [6.0.0](http://github.com/poppinss/indicative/tree/master/packages/parser/compare/v5.0.8...v6.0.0) (2019-03-29)


### Bug Fixes

* **parser:** ensure rules string is defined and not empty ([a5e34d8](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/a5e34d8))
* **parser:** handle object schema nodes properly ([cfad4ae](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/cfad4ae))


### Code Refactoring

* **parser:** rename schemaParser to rulesParser ([987dc8d](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/987dc8d))


### Features

* move parser to it's own package ([3552632](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/3552632))
* **parser:** add messages parser ([e3e185a](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/e3e185a))
* **parser:** add support for indexed arrays ([7aa1224](http://github.com/poppinss/indicative/tree/master/packages/parser/commit/7aa1224))


### BREAKING CHANGES

* **parser:** schema is a generic name for any schema and rules
is a more appropriate name for the parser that parser rules
* **parser:** messages tree is similar to schema tree and hence
we need to rename `rules` property to `rhs` for a generic name
