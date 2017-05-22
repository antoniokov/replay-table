(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["replayTable"] = factory();
	else
		root["replayTable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value) {
    return typeof value === 'string' || value instanceof String;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr) {
    var validateElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (elem) {
        return true;
    };

    if (!Array.isArray(arr)) {
        return false;
    }

    return arr.every(function (elem) {
        return validateElement(elem);
    });
};

;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (input) {
    try {
        return JSON.parse(input.replace(/'/g, '"'));
    } catch (e) {
        return null;
    }
};

;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (obj) {
    var validateKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (key) {
        return true;
    };
    var validateValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (value) {
        return true;
    };

    if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        return false;
    }

    var areKeysValid = Object.keys(obj).every(function (key) {
        return validateKey(key);
    });
    var areValuesValid = Object.values(obj).every(function (value) {
        return validateValue(value);
    });

    return areKeysValid && areValuesValid;
};

;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (text) {
    console.log(text);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var checkingFunctions = {
    alwaysTrue: function alwaysTrue(transformedData) {
        return true;
    },

    hasOutcome: function hasOutcome(outcome) {
        return function (transformedData) {
            return transformedData.some(function (round) {
                return round.results.some(function (result) {
                    return result.outcome === outcome;
                });
            });
        };
    },

    hasMatches: function hasMatches(transformedData) {
        return transformedData.some(function (round) {
            return round.results.some(function (result) {
                return result.match;
            });
        });
    }
};

exports.default = {
    'points': {
        check: checkingFunctions.alwaysTrue,
        calculate: function calculate(result) {
            return result.change || 0;
        }
    },
    'rounds': {
        check: checkingFunctions.alwaysTrue,
        calculate: function calculate(result) {
            return result.change === null ? 0 : 1;
        }
    },

    'wins': {
        check: checkingFunctions.hasOutcome('win'),
        calculate: function calculate(result) {
            return result.outcome === 'win' ? 1 : 0;
        }
    },
    'losses': {
        check: checkingFunctions.hasOutcome('loss'),
        calculate: function calculate(result) {
            return result.outcome === 'loss' ? 1 : 0;
        }
    },
    'draws': {
        check: checkingFunctions.hasOutcome('draw'),
        calculate: function calculate(result) {
            return result.outcome === 'draw' ? 1 : 0;
        }
    },

    'goalsFor': {
        check: checkingFunctions.hasMatches,
        calculate: function calculate(result) {
            return result.match ? result.match.score : 0;
        }
    },
    'goalsAgainst': {
        check: checkingFunctions.hasMatches,
        calculate: function calculate(result) {
            return result.match ? result.match.opponentScore : 0;
        }
    },

    'goalsDifference': {
        check: checkingFunctions.hasMatches,
        calculate: function calculate(result) {
            return result.match ? result.match.score - result.match.opponentScore : 0;
        }
    },

    'winningPercentage': {
        check: checkingFunctions.hasOutcome('win'),
        calculate: function calculate(calculatedResult) {
            return calculatedResult.rounds.total ? calculatedResult.wins.total / calculatedResult.rounds.total : 0;
        },
        isPost: true
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _csv = __webpack_require__(51);

Object.defineProperty(exports, 'csv', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_csv).default;
  }
});

var _json = __webpack_require__(52);

Object.defineProperty(exports, 'json', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_json).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _play = __webpack_require__(73);

Object.defineProperty(exports, 'play', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_play).default;
  }
});

var _previous = __webpack_require__(74);

Object.defineProperty(exports, 'previous', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_previous).default;
  }
});

var _next = __webpack_require__(72);

Object.defineProperty(exports, 'next', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_next).default;
  }
});

var _slider = __webpack_require__(75);

Object.defineProperty(exports, 'slider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_slider).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (transformedData, userConfig) {
    var params = (0, _parametrize2.default)(_config2.default, userConfig);

    var enriched = calculators.enrich(transformedData, params);
    var sorted = calculators.sort(enriched, params);
    var positioned = calculators.position(sorted, params);

    return calculators.addMeta(positioned, params);
};

var _calculators = __webpack_require__(36);

var calculators = _interopRequireWildcard(_calculators);

var _parametrize = __webpack_require__(17);

var _parametrize2 = _interopRequireDefault(_parametrize);

var _config = __webpack_require__(13);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (id, userConfig) {
    var config = (0, _getPresetConfig2.default)(userConfig.preset) || (0, _getEmptyConfig2.default)(configs);
    var extendedConfigs = (0, _extendConfigs2.default)(configs, config, userConfig);

    Object.keys(userConfig).filter(function (param) {
        return !reservedKeywords.includes(param);
    }).map(function (param) {
        return (0, _toCamelCase2.default)(param);
    }).forEach(function (param) {
        var module = (0, _mapParamToModule2.default)(param, extendedConfigs);

        if (module) {
            config[module][param] = extendedConfigs[module][param].parse(userConfig[param]);
        } else {
            (0, _warn2.default)('Sorry, there is no "' + param + '" parameter available. Ignoring it and moving on.');
        }
    });

    return (0, _addId2.default)(id, config);
};

var _configs = __webpack_require__(40);

var configs = _interopRequireWildcard(_configs);

var _getPresetConfig = __webpack_require__(45);

var _getPresetConfig2 = _interopRequireDefault(_getPresetConfig);

var _getEmptyConfig = __webpack_require__(44);

var _getEmptyConfig2 = _interopRequireDefault(_getEmptyConfig);

var _extendConfigs = __webpack_require__(43);

var _extendConfigs2 = _interopRequireDefault(_extendConfigs);

var _mapParamToModule = __webpack_require__(15);

var _mapParamToModule2 = _interopRequireDefault(_mapParamToModule);

var _addId = __webpack_require__(42);

var _addId2 = _interopRequireDefault(_addId);

var _toCamelCase = __webpack_require__(23);

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

var _warn = __webpack_require__(4);

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var reservedKeywords = ['preset'];

;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (userConfig) {
    var source = _config2.default.source.validate(userConfig.source) && userConfig.source;

    if (!source) {
        (0, _crash2.default)('Please, check the data source. We couldn\'t get anything out from ' + userConfig.source);
        return;
    }

    var extractor = userConfig.extractor || (0, _guessExtractor2.default)(source);

    if (!_config2.default.extractor.validate(extractor)) {
        (0, _warn2.default)('We couldn\'t determine the extractor so we\'ll try to use the default one, which is ' + _config2.default.extractor.default);
        return extractors[_config2.default.extractor.default](source);
    }

    return extractors[extractor](source);
};

var _extractors = __webpack_require__(6);

var extractors = _interopRequireWildcard(_extractors);

var _guessExtractor = __webpack_require__(53);

var _guessExtractor2 = _interopRequireDefault(_guessExtractor);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _crash = __webpack_require__(19);

var _crash2 = _interopRequireDefault(_crash);

var _warn = __webpack_require__(4);

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (rawData, userConfig) {
    var params = (0, _initialize2.default)('transformer', _config2.default, transformersConfig, userConfig);

    var transformed = transformers[params.transformer](rawData, params);

    var filtered = params.filterItems.length > 0 ? postTransformers.filterItems(transformed, params.filterItems) : transformed;

    var collapsed = params.collapseToRounds ? postTransformers.collapseToRounds(filtered) : filtered;

    return params.insertStartRound ? postTransformers.insertStartRound(collapsed, params.insertStartRound) : collapsed;
};

var _config = __webpack_require__(24);

var _config2 = _interopRequireDefault(_config);

var _configs = __webpack_require__(25);

var transformersConfig = _interopRequireWildcard(_configs);

var _initialize = __webpack_require__(16);

var _initialize2 = _interopRequireDefault(_initialize);

var _transformers = __webpack_require__(26);

var transformers = _interopRequireWildcard(_transformers);

var _postTransformers = __webpack_require__(66);

var postTransformers = _interopRequireWildcard(_postTransformers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (calculatedData, userConfig) {
    var params = (0, _initialize2.default)('visualizer', _config2.default, visualizersConfigs, userConfig);
    return new visualizers[params.visualizer](calculatedData, params);
};

var _config = __webpack_require__(28);

var _config2 = _interopRequireDefault(_config);

var _configs = __webpack_require__(29);

var visualizersConfigs = _interopRequireWildcard(_configs);

var _initialize = __webpack_require__(16);

var _initialize2 = _interopRequireDefault(_initialize);

var _visualizers = __webpack_require__(31);

var visualizers = _interopRequireWildcard(_visualizers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _calculations = __webpack_require__(5);

var _calculations2 = _interopRequireDefault(_calculations);

var _validateArray = __webpack_require__(1);

var _validateArray2 = _interopRequireDefault(_validateArray);

var _isString = __webpack_require__(0);

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    id: {
        default: '',
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    },

    orderBy: {
        default: ['points'],
        parse: function parse(input) {
            return input.split(',');
        },
        validate: function validate(value) {
            return (0, _validateArray2.default)(value, function (value) {
                return _calculations2.default.hasOwnProperty(value);
            });
        }
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (orderBy) {
    return function (a, b) {
        var tieBreaker = orderBy.filter(function (calc) {
            return b[calc].total !== a[calc].total;
        })[0];

        if (tieBreaker) {
            return b[tieBreaker].total - a[tieBreaker].total;
        } else {
            return 0;
        }
    };
};

;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (param, configs) {
    var modules = Object.keys(configs).filter(function (config) {
        return configs[config].hasOwnProperty(param);
    });
    return modules.length > 0 ? modules[0] : null;
};

;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (processorField, moduleConfig, processorsConfigs, userConfig) {
    var processor = (0, _parametrize4.default)(_defineProperty({}, processorField, moduleConfig[processorField]), _defineProperty({}, processorField, userConfig[processorField]))[processorField];

    var config = processorsConfigs.hasOwnProperty(processor) ? Object.assign({}, moduleConfig, processorsConfigs[processor]) : moduleConfig;

    return (0, _parametrize4.default)(config, userConfig);
};

var _parametrize3 = __webpack_require__(17);

var _parametrize4 = _interopRequireDefault(_parametrize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (config, userConfig) {
    Object.keys(userConfig).filter(function (param) {
        return !config.hasOwnProperty(param);
    }).forEach(function (param) {
        return (0, _warn2.default)('Sorry, there is no "' + param + '" parameter available. Ignoring it and moving on.');
    });

    var params = Object.keys(config).reduce(function (obj, param) {
        return Object.assign(obj, _defineProperty({}, param, config[param].default));
    }, {});

    Object.keys(userConfig).filter(function (param) {
        return config.hasOwnProperty(param);
    }).forEach(function (param) {
        if (config[param].validate(userConfig[param])) {
            params[param] = userConfig[param];
        } else if (userConfig[param] !== undefined) {
            (0, _warn2.default)('Sorry, we cannot accept ' + userConfig[param] + ' as ' + param + '.                 Moving on with the default value, which is ' + params[param] + '.');
        }
    });

    return params;
};

var _warn = __webpack_require__(4);

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extractors = __webpack_require__(6);

var extractors = _interopRequireWildcard(_extractors);

var _isString = __webpack_require__(0);

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    id: {
        default: '',
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    },

    extractor: {
        default: 'csv',
        parse: function parse(input) {
            return input;
        },
        validate: function validate(value) {
            return extractors.hasOwnProperty(value);
        }
    },

    source: {
        default: undefined,
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (text) {
    console.log(text);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (results, item) {
    var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return results.map(function (round) {
        var result = round.results.filter(function (result) {
            return result.item === item;
        })[0];
        return Object.assign({}, result, { roundMeta: round.meta });
    }).filter(function (result) {
        return !filter || result.change !== null;
    });
};

;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (results) {
    return [].concat(_toConsumableArray(new Set(results.reduce(function (list, round) {
        return [].concat(_toConsumableArray(list), _toConsumableArray(round.results.map(function (result) {
            return result.item;
        })));
    }, []))));
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (number) {
    var zeroString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (number > 0) {
        return '+' + number;
    } else if (number < 0) {
        return number.toString();
    } else {
        return zeroString;
    }
};

;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (str) {
    return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _transformers = __webpack_require__(26);

var transformers = _interopRequireWildcard(_transformers);

var _validateObject = __webpack_require__(3);

var _validateObject2 = _interopRequireDefault(_validateObject);

var _validateArray = __webpack_require__(1);

var _validateArray2 = _interopRequireDefault(_validateArray);

var _isString = __webpack_require__(0);

var _isString2 = _interopRequireDefault(_isString);

var _parseObject = __webpack_require__(2);

var _parseObject2 = _interopRequireDefault(_parseObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    id: {
        default: '',
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    },

    transformer: {
        default: 'listOfMatches',
        parse: function parse(value) {
            return value;
        },
        validate: function validate(value) {
            return transformers.hasOwnProperty(value);
        }
    },

    changeToOutcome: {
        default: {
            3: 'win',
            1: 'draw',
            0: 'loss'
        },
        parse: function parse(input) {
            return (0, _parseObject2.default)(input);
        },
        validate: function validate(obj) {
            return (0, _validateObject2.default)(obj, function (key) {
                return !Number.isNaN(key);
            }, function (value) {
                return ['win', 'draw', 'loss'].includes(value);
            });
        }
    },

    //post-transformers
    filterItems: {
        default: [],
        parse: function parse(input) {
            return input.split(',');
        },
        validate: function validate(value) {
            return (0, _validateArray2.default)(value, _isString2.default);
        }
    },

    insertStartRound: {
        default: '0',
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pointsTable = __webpack_require__(61);

Object.defineProperty(exports, 'pointsTable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pointsTable).default;
  }
});

var _listOfMatches = __webpack_require__(60);

Object.defineProperty(exports, 'listOfMatches', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_listOfMatches).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pointsTable = __webpack_require__(69);

Object.defineProperty(exports, 'pointsTable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pointsTable).default;
  }
});

var _listOfMatches = __webpack_require__(68);

Object.defineProperty(exports, 'listOfMatches', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_listOfMatches).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _calculations = __webpack_require__(5);

var _calculations2 = _interopRequireDefault(_calculations);

var _numberToChange = __webpack_require__(22);

var _numberToChange2 = _interopRequireDefault(_numberToChange);

var _formatPosition = __webpack_require__(77);

var _formatPosition2 = _interopRequireDefault(_formatPosition);

var _mapParamToModule = __webpack_require__(15);

var _mapParamToModule2 = _interopRequireDefault(_mapParamToModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
    function Cell(column, result, params) {
        _classCallCheck(this, Cell);

        this.column = column;
        this.result = result;

        if (this[column]) {
            return this[column](result, params);
        } else if (_calculations2.default.hasOwnProperty(column)) {
            return this.makeCalculation(column, result, params);
        } else if (column.includes('.change')) {
            return this.makeChange(column, result, params);
        } else if (column.includes('spark')) {
            return this.makeSpark(column, result, params);
        } else if ((0, _mapParamToModule2.default)(column, result.extras)) {
            return this.makeExtra(column, result, params);
        } else {
            this.text = '';
            this.classes = [];
            return this;
        }
    }

    _createClass(Cell, [{
        key: 'position',
        value: function position(result, params) {
            this.text = (0, _formatPosition2.default)(result.position, params.positionWhenTied);
            this.classes = ['position'];
            return this;
        }
    }, {
        key: 'item',
        value: function item(result, params) {
            this.text = result.item;
            this.classes = ['item', 'clickable'];
            return this;
        }
    }, {
        key: 'match',
        value: function match(result, params) {
            this.text = result.match ? result.match.score + '-' + result.match.opponentScore + ' ' + result.match.opponent : '';
            this.classes = ['change'];
            return this;
        }
    }, {
        key: 'outcome',
        value: function outcome(result, params) {
            this.text = '';
            this.classes = ['outcome'];
            this.backgroundColor = params.colors[result.outcome] || 'transparent';
            return this;
        }
    }, {
        key: 'goalsDifference',
        value: function goalsDifference(result, params) {
            this.text = (0, _numberToChange2.default)(result.goalsDifference.total, '0');
            this.classes = ['calculation'];
            return this;
        }
    }, {
        key: 'winningPercentage',
        value: function winningPercentage(result, params) {
            this.text = result.winningPercentage.total.toFixed(3).toString().replace('0', '');
            this.classes = ['calculation'];
            return this;
        }
    }, {
        key: 'round',
        value: function round(result, params) {
            this.text = result.roundMeta.name;
            this.classes = ['round', 'clickable'];
            return this;
        }
    }, {
        key: 'makeCalculation',
        value: function makeCalculation(column, result, params) {
            this.text = result[column].total;
            this.classes = ['calculation'];
            return this;
        }
    }, {
        key: 'makeChange',
        value: function makeChange(column, result, params) {
            var calc = column.replace('.change', '');
            this.text = (0, _numberToChange2.default)(result[calc].change);
            this.classes = ['change'];
            return this;
        }
    }, {
        key: 'makeSpark',
        value: function makeSpark(column, result, params) {
            this.text = '';
            this.classes = ['spark'];

            this.roundIndex = Number.parseInt(column.split('.')[1]);
            var itemResults = params.sparklinesData.get(result.item);

            if (this.roundIndex >= itemResults.length) {
                this.backgroundColor = 'transparent';
                this.result = {};
            } else {
                this.result = itemResults[this.roundIndex];

                if (this.roundIndex === params.currentRound) {
                    this.classes.push('current');
                    this.backgroundColor = params.currentSparkColors[itemResults[this.roundIndex].outcome] || 'transparent';
                } else {
                    this.backgroundColor = params.sparkColors[itemResults[this.roundIndex].outcome] || 'transparent';
                }
            }

            return this;
        }
    }, {
        key: 'makeExtra',
        value: function makeExtra(column, result, params) {
            var extraType = (0, _mapParamToModule2.default)(column, result.extras);
            this.text = result.extras[extraType][column];
            this.classes = ['extra-' + extraType];
            return this;
        }
    }]);

    return Cell;
}();

exports.default = Cell;
;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visualizers = __webpack_require__(31);

var visualizers = _interopRequireWildcard(_visualizers);

var _controls = __webpack_require__(7);

var controls = _interopRequireWildcard(_controls);

var _isString = __webpack_require__(0);

var _isString2 = _interopRequireDefault(_isString);

var _parseObject = __webpack_require__(2);

var _parseObject2 = _interopRequireDefault(_parseObject);

var _validateObject = __webpack_require__(3);

var _validateObject2 = _interopRequireDefault(_validateObject);

var _validateArray = __webpack_require__(1);

var _validateArray2 = _interopRequireDefault(_validateArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    id: {
        default: '',
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    },

    visualizer: {
        default: 'classic',
        parse: function parse(input) {
            return input;
        },
        validate: function validate(value) {
            return visualizers.hasOwnProperty(value);
        }
    },

    controls: {
        default: ['play', 'previous', 'next', 'slider'],
        parse: function parse(input) {
            return input.split(',');
        },
        validate: function validate(value) {
            return (0, _validateArray2.default)(value, function (value) {
                return controls.hasOwnProperty(value);
            });
        }
    },

    startFromRound: {
        default: null,
        parse: function parse(input) {
            return Number.parseInt(input, 10);
        },
        validate: function validate(value) {
            return !value || !Number.isNaN(value);
        }
    },

    roundsTotalNumber: {
        default: null,
        parse: function parse(input) {
            return Number.parseInt(input, 10) || undefined;
        },
        validate: function validate(value) {
            return !value || !Number.isNaN(value);
        }
    },

    positionWhenTied: {
        default: 'strict',
        parse: function parse(input) {
            return input;
        },
        validate: function validate(value) {
            return ['strict', 'highest', 'range', 'average'].includes(value);
        }
    },

    animationSpeed: {
        default: 1.0,
        parse: Number.parseFloat,
        validate: function validate(value) {
            return !Number.isNaN(value) && value > 0.0 && value <= 10.0;
        }
    }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classic = __webpack_require__(70);

Object.defineProperty(exports, 'classic', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_classic).default;
  }
});

var _sparklines = __webpack_require__(71);

Object.defineProperty(exports, 'sparklines', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sparklines).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controls = __webpack_require__(7);

var Controls = _interopRequireWildcard(_controls);

var _adjustDurations = __webpack_require__(76);

var _adjustDurations2 = _interopRequireDefault(_adjustDurations);

var _getRowsYs = __webpack_require__(78);

var _getRowsYs2 = _interopRequireDefault(_getRowsYs);

var _toCamelCase = __webpack_require__(23);

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dispatchers = ['roundChange', 'play', 'pause', 'roundPreview', 'endPreview', 'drillDown', 'endDrillDown'];

var _class = function () {
    function _class(data, params) {
        var _d,
            _this = this;

        _classCallCheck(this, _class);

        this.data = data;
        this.params = params;

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.preview = this.preview.bind(this);
        this.endPreview = this.endPreview.bind(this);
        this.drillDown = this.drillDown.bind(this);
        this.endDrillDown = this.endDrillDown.bind(this);

        this.durations = (0, _adjustDurations2.default)(params.durations, params.animationSpeed);

        this.roundsTotalNumber = this.params.roundsTotalNumber || this.data.meta.lastRound;
        this.currentRound = params.startFromRound === null ? this.data.meta.lastRound : params.startFromRound;
        this.previewedRound = null;
        this.drilldown = {};

        this.dispatch = (_d = d3).dispatch.apply(_d, dispatchers);
        this.dispatch.on('roundChange', function (roundMeta) {
            return _this.currentRound = roundMeta.index;
        });
        this.dispatch.on('play', function () {
            return _this.isPlaying = true;
        });
        this.dispatch.on('pause', function () {
            return _this.isPlaying = false;
        });

        this.dispatch.on('roundPreview', function (roundMeta) {
            return _this.previewedRound = roundMeta.index;
        });
        this.dispatch.on('endPreview', function (roundMeta) {
            return _this.previewedRound = null;
        });
        this.dispatch.on('drillDown', function (item) {
            _this.tableContainer.classed('drilldowned', true);
            _this.drilldown.item = item;
        });
        this.dispatch.on('endDrillDown', function (item) {
            _this.tableContainer.classed('drilldowned', false);
            _this.drilldown = {};
        });

        this.selector = params.id ? '#' + params.id : '.replayTable';

        this.controlsContainer = d3.select(this.selector).append('div').attr('class', 'controls-container ' + params.visualizer);
        this.controls = this.renderControls(this.controlsContainer, this.params.controls);

        this.tableContainer = d3.select(this.selector).append('div').attr('class', 'table-container ' + params.visualizer);

        var _renderTable = this.renderTable(this.data.results[this.currentRound].results);

        var _renderTable2 = _slicedToArray(_renderTable, 3);

        this.table = _renderTable2[0];
        this.rows = _renderTable2[1];
        this.cells = _renderTable2[2];

        this.ys = this.rows.nodes().map(function (n) {
            return n.getBoundingClientRect().top;
        });
        this.initialPositions = this.data.results[this.currentRound].results.reduce(function (obj, res) {
            return Object.assign(obj, _defineProperty({}, res.item, res.position.strict - 1));
        }, {});
    }

    _createClass(_class, [{
        key: 'renderControls',
        value: function renderControls(container, list) {
            var _this2 = this;

            var controls = container.append('div').attr('class', 'controls');

            var roundMeta = this.data.results[this.currentRound].meta;

            var controlsObject = {};
            var args = {
                play: [controls, roundMeta, this.play, this.pause],
                previous: [controls, roundMeta, this.previous],
                next: [controls, roundMeta, this.next],
                slider: [controls, this.data.meta.lastRound, this.roundsTotalNumber, roundMeta, this.preview, this.endPreview]
            };
            list.forEach(function (control) {
                return controlsObject[control] = new (Function.prototype.bind.apply(Controls[control], [null].concat(_toConsumableArray(args[control]))))();
            });

            Object.keys(controlsObject).forEach(function (ctrl) {
                var control = controlsObject[ctrl];
                dispatchers.forEach(function (dispatcher) {
                    var method = (0, _toCamelCase2.default)('on-' + dispatcher);
                    if (control[method]) {
                        _this2.dispatch.on(dispatcher + '.' + ctrl, control[method].bind(control));
                    }
                });
            });

            return controls;
        }
    }, {
        key: 'move',
        value: function move(roundIndex, delay, duration) {
            var _this3 = this;

            var cells = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.cells;

            var nextPositions = this.data.results[roundIndex].results.reduce(function (obj, res) {
                return Object.assign(obj, _defineProperty({}, res.item, res.position.strict - 1));
            }, {});

            return new Promise(function (resolve, reject) {
                var transitionsFinished = 0;
                cells.transition().delay(delay).duration(duration).style('transform', function (cell) {
                    var initialY = _this3.ys[_this3.initialPositions[cell.result.item]];
                    var nextY = _this3.ys[nextPositions[cell.result.item]];
                    return 'translateY(' + (nextY - initialY) + 'px)';
                }).each(function () {
                    return ++transitionsFinished;
                }).on('end', function () {
                    if (! --transitionsFinished) {
                        resolve();
                    }
                });
            });
        }
    }, {
        key: 'first',
        value: function first() {
            return this.to(0);
        }
    }, {
        key: 'last',
        value: function last() {
            return this.to(this.data.meta.lastRound);
        }
    }, {
        key: 'previous',
        value: function previous() {
            if (this.currentRound > 0) {
                return this.to(this.currentRound - 1);
            }
        }
    }, {
        key: 'next',
        value: function next() {
            if (this.currentRound < this.data.meta.lastRound) {
                return this.to(this.currentRound + 1);
            }
        }
    }, {
        key: 'play',
        value: function play() {
            var _this4 = this;

            var stopAt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.meta.lastRound;

            this.dispatch.call('play');

            var playFunction = function playFunction() {
                if (_this4.currentRound === stopAt || !_this4.isPlaying) {
                    _this4.pause();
                } else {
                    Promise.resolve(_this4.next()).then(function () {
                        return setTimeout(playFunction, _this4.durations.freeze);
                    });
                }
            };

            if (this.currentRound === this.data.meta.lastRound) {
                Promise.resolve(this.first()).then(function () {
                    return setTimeout(playFunction, _this4.durations.freeze);
                });
            } else {
                Promise.resolve(this.next()).then(function () {
                    return setTimeout(playFunction, _this4.durations.freeze);
                });
            }
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.dispatch.call('pause');
        }
    }, {
        key: 'endPreview',
        value: function endPreview() {
            var _this5 = this;

            var move = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var end = function end() {
                _this5.dispatch.call('endPreview', _this5, _this5.data.results[_this5.currentRound].meta);
                return Promise.resolve();
            };

            if (this.previewedRound === null || this.previewedRound === this.currentRound) {
                return end();
            } else if (!move) {
                return Promise.resolve(this.preview(this.currentRound)).then(end);
            } else {
                return Promise.resolve(this.to(this.previewedRound)).then(end);
            }
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classic = __webpack_require__(81);

Object.defineProperty(exports, 'classic', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_classic).default;
  }
});

var _sparklines = __webpack_require__(82);

Object.defineProperty(exports, 'sparklines', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sparklines).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return Array.from(document.getElementsByClassName('replayTable')).map(function (table) {
        var config = (0, _configure2.default)(table.id, table.dataset);

        return Promise.resolve((0, _extract2.default)(config.extract)).then(function (raw) {
            var transformed = (0, _transform2.default)(raw, config.transform);
            var calculated = (0, _calculate2.default)(transformed, config.calculate);
            return (0, _visualize2.default)(calculated, config.visualize);
        }).catch(function (error) {
            return (0, _crash2.default)(error);
        });
    });
};

var _configure = __webpack_require__(9);

var _configure2 = _interopRequireDefault(_configure);

var _extract = __webpack_require__(10);

var _extract2 = _interopRequireDefault(_extract);

var _transform = __webpack_require__(11);

var _transform2 = _interopRequireDefault(_transform);

var _calculate = __webpack_require__(8);

var _calculate2 = _interopRequireDefault(_calculate);

var _visualize = __webpack_require__(12);

var _visualize2 = _interopRequireDefault(_visualize);

var _crash = __webpack_require__(19);

var _crash2 = _interopRequireDefault(_crash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data, params) {
    var enriched = data.map(function (round, i) {
        return {
            meta: {
                name: round.name,
                index: i,
                isLast: false,
                items: round.results.filter(function (result) {
                    return result.change !== null;
                }).length,
                hasOnlyOutcomes: round.results.every(function (result) {
                    return result.outcome || result.change === null;
                }),
                biggestChange: Math.max.apply(Math, _toConsumableArray(round.results.map(function (result) {
                    return Math.abs(result.change || 0);
                }))),
                sumOfChanges: round.results.reduce(function (sum, result) {
                    return sum + (result.change || 0);
                }, 0)
            },
            results: round.results
        };
    });

    var lastRound = enriched.filter(function (round) {
        return round.results.some(function (result) {
            return result.change !== null;
        });
    }).reduce(function (maxIndex, round) {
        return Math.max(round.meta.index, maxIndex);
    }, 0);

    enriched[lastRound].meta.isLast = true;

    return {
        meta: {
            lastRound: lastRound
        },
        results: enriched
    };
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (transformedData, params) {
    var calculations = Object.keys(_calculations2.default).filter(function (calc) {
        return _calculations2.default[calc].check(transformedData);
    });

    var items = (0, _getItems2.default)(transformedData);

    var initialStats = calculations.reduce(function (obj, calc) {
        return Object.assign(obj, _defineProperty({}, calc, 0));
    }, {});
    var itemStats = items.reduce(function (obj, item) {
        return Object.assign(obj, _defineProperty({}, item, Object.assign({}, initialStats)));
    }, {});

    return transformedData.map(function (round) {
        var results = round.results.map(function (result) {
            var calculatedResult = Object.assign({}, result);
            var stats = itemStats[result.item];

            calculations.filter(function (calc) {
                return !_calculations2.default[calc].isPost;
            }).forEach(function (calc) {
                var change = _calculations2.default[calc].calculate(calculatedResult);
                calculatedResult[calc] = {
                    change: change,
                    total: stats[calc] + change
                };
                stats[calc] += change;
            });

            calculations.filter(function (calc) {
                return _calculations2.default[calc].isPost;
            }).forEach(function (calc) {
                var total = _calculations2.default[calc].calculate(calculatedResult);
                calculatedResult[calc] = {
                    change: null,
                    total: total
                };
            });

            return calculatedResult;
        });

        return {
            name: round.name,
            results: results
        };
    });
};

var _calculations = __webpack_require__(5);

var _calculations2 = _interopRequireDefault(_calculations);

var _getItems = __webpack_require__(21);

var _getItems2 = _interopRequireDefault(_getItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enrich = __webpack_require__(35);

Object.defineProperty(exports, 'enrich', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_enrich).default;
  }
});

var _sort = __webpack_require__(38);

Object.defineProperty(exports, 'sort', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sort).default;
  }
});

var _position = __webpack_require__(37);

Object.defineProperty(exports, 'position', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_position).default;
  }
});

var _addMeta = __webpack_require__(34);

Object.defineProperty(exports, 'addMeta', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_addMeta).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data, params) {
    var compare = (0, _getCompareFunction2.default)(params.orderBy);

    return data.map(function (round) {
        var results = round.results.map(function (result, i) {
            var positionedResult = Object.assign({}, result);

            var itemsHigher = round.results.filter(function (res) {
                return compare(res, result) < 0;
            });
            var itemsEqual = round.results.filter(function (res) {
                return res.item !== result.item && compare(res, result) === 0;
            });

            positionedResult.position = {
                strict: i + 1,
                highest: itemsHigher.length + 1,
                lowest: itemsHigher.length + itemsEqual.length + 1
            };

            return positionedResult;
        });

        return {
            name: round.name,
            results: results
        };
    });
};

var _getCompareFunction = __webpack_require__(14);

var _getCompareFunction2 = _interopRequireDefault(_getCompareFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data, params) {
    var sorted = data.slice(0, 1);

    var compareFunction = (0, _getCompareFunction2.default)(params.orderBy);
    data.slice(1).forEach(function (round, i) {
        sorted.push({
            name: round.name,
            results: (0, _sortRoundResults2.default)(round.results, sorted[i].results, compareFunction)
        });
    });

    return sorted;
};

var _sortRoundResults = __webpack_require__(39);

var _sortRoundResults2 = _interopRequireDefault(_sortRoundResults);

var _getCompareFunction = __webpack_require__(14);

var _getCompareFunction2 = _interopRequireDefault(_getCompareFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (roundResults, sortedPreviousRoundResults, compareFunction) {
    return roundResults.map(function (result) {
        return {
            obj: result,
            idx: sortedPreviousRoundResults.map(function (result) {
                return result.item;
            }).indexOf(result.item)
        };
    }).sort(function (a, b) {
        return compareFunction(a.obj, b.obj) ? compareFunction(a.obj, b.obj) : a.idx - b.idx;
    }).map(function (item) {
        return item.obj;
    });
};

;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(18);

Object.defineProperty(exports, 'extract', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_config).default;
  }
});

var _config2 = __webpack_require__(24);

Object.defineProperty(exports, 'transform', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_config2).default;
  }
});

var _config3 = __webpack_require__(13);

Object.defineProperty(exports, 'calculate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_config3).default;
  }
});

var _config4 = __webpack_require__(28);

Object.defineProperty(exports, 'visualize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_config4).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.visualize = exports.transform = undefined;

var _configs = __webpack_require__(25);

var transformConfigs = _interopRequireWildcard(_configs);

var _configs2 = __webpack_require__(29);

var visualizeConfigs = _interopRequireWildcard(_configs2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var transform = exports.transform = {
    processorField: 'transformer',
    configs: transformConfigs
};

var visualize = exports.visualize = {
    processorField: 'visualizer',
    configs: visualizeConfigs
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (id, config) {
    return Object.keys(config).reduce(function (obj, module) {
        var moduleConfig = Object.assign({ id: id }, config[module]);
        return Object.assign(obj, _defineProperty({}, module, moduleConfig));
    }, {});
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (configs, presetConfig, userConfig) {
    return Object.keys(configs).map(function (module) {
        if (!extensions.hasOwnProperty(module)) {
            return {
                name: module,
                config: configs[module]
            };
        }

        var processorField = extensions[module].processorField;
        var processor = configs[module][processorField].validate(userConfig[processorField]) ? userConfig[processorField] : presetConfig[module][processorField] || configs[module][processorField].default;

        var config = extensions[module].configs[processor] ? Object.assign({}, configs[module], extensions[module].configs[processor]) : configs[module];

        return {
            name: module,
            config: config
        };
    }).reduce(function (extendedConfigs, elem) {
        return Object.assign(extendedConfigs, _defineProperty({}, elem.name, elem.config));
    }, {});
};

var _extensions = __webpack_require__(41);

var extensions = _interopRequireWildcard(_extensions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (configs) {
    return Object.keys(configs).reduce(function (obj, module) {
        return Object.assign(obj, _defineProperty({}, module, {}));
    }, {});
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (userPreset) {
    if (!userPreset) {
        return null;
    }

    if (!presets.hasOwnProperty(userPreset)) {
        (0, _warn2.default)('No "' + userPreset + '" preset for now, sorry about that. Moving on with the default settings.');
        return null;
    }

    return Object.keys(presets[userPreset]).reduce(function (obj, key) {
        return Object.assign(obj, _defineProperty({}, key, Object.assign({}, presets[userPreset][key])));
    }, {});
};

var _presets = __webpack_require__(48);

var presets = _interopRequireWildcard(_presets);

var _warn = __webpack_require__(4);

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    extract: {},
    transform: {
        transformer: 'pointsTable',
        changeToOutcome: {
            1: 'win',
            0: 'loss'
        }
    },
    calculate: {},
    visualize: {
        columns: ['position', 'item', 'points', 'outcome'],
        labels: ['#', 'Команда', 'Взятых'],
        positionWhenTied: 'range'
    }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    extract: {},
    transform: {
        transformer: 'pointsTable',
        changeToOutcome: {
            25: 'win'
        },
        insertStartRound: 'Start →'
    },
    calculate: {
        orderBy: ['points', 'wins']
    },
    visualize: {
        columns: ['position', 'item', 'points', 'points.change'],
        labels: ['#', 'Driver', 'Points']
    }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winLoss = __webpack_require__(50);

Object.defineProperty(exports, 'winLoss', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_winLoss).default;
  }
});

var _chgk = __webpack_require__(46);

Object.defineProperty(exports, 'chgk', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_chgk).default;
  }
});

var _f = __webpack_require__(47);

Object.defineProperty(exports, 'f1', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_f).default;
  }
});

var _matches = __webpack_require__(49);

Object.defineProperty(exports, 'matches', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_matches).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    extract: {},
    transform: {
        transformer: 'listOfMatches',
        collapseToRounds: false
    },
    calculate: {},
    visualize: {
        columns: ['position', 'item', 'points', 'outcome', 'match'],
        labels: ['#', 'Team', 'Points']
    }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    extract: {},
    transform: {
        transformer: 'listOfMatches',
        changeToOutcome: {
            1: 'win',
            0: 'loss'
        }
    },
    calculate: {
        orderBy: ['winningPercentage', 'wins']
    },
    visualize: {
        visualizer: 'classic',
        columns: ['position', 'item', 'rounds', 'wins', 'losses', 'winningPercentage', 'outcome', 'match'],
        labels: ['#', 'Team', 'G', 'W', 'L', 'Win %']
    }
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (path) {
    return new Promise(function (resolve, reject) {
        d3.text(path, function (text) {
            if (!text) {
                reject("Sorry, we can't reach your csv file");
                return;
            }

            var parsed = d3.csvParseRows(text);
            resolve(parsed);
        });
    });
};

;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (path) {
    return new Promise(function (resolve, reject) {
        d3.json(path, function (data) {
            if (!data) {
                reject("Sorry, we can't reach your json file");
                return;
            }

            resolve(data);
        });
    });
};

;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (source) {
    var extension = (0, _getFileExtension2.default)(source);
    return extractors.hasOwnProperty(extension) ? extension : null;
};

var _extractors = __webpack_require__(6);

var extractors = _interopRequireWildcard(_extractors);

var _getFileExtension = __webpack_require__(56);

var _getFileExtension2 = _interopRequireDefault(_getFileExtension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

exports.default = function (obj) {
        return Object.keys(obj).reduce(function (result, key) {
                var keyNumber = Number.parseInt(key, 10);
                var newValue = isNaN(keyNumber) ? key : keyNumber;
                var newKey = obj[key];
                return Object.assign(result, _defineProperty({}, newKey, newValue));
        }, {});
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (str) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
        return str.toUpperCase();
    });
};

;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (filename) {
    return filename.slice((Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1);
};

;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (n, a, b) {
    return (n - a) * (n - b) <= 0;
};

;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (matrix) {
    return Object.keys(matrix[0]).map(function (colNumber) {
        return matrix.map(function (rowNumber) {
            return rowNumber[colNumber];
        });
    });
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.magic = exports.visualize = exports.calculate = exports.transform = exports.extract = exports.configure = undefined;

var _configure = __webpack_require__(9);

Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_configure).default;
  }
});

var _extract = __webpack_require__(10);

Object.defineProperty(exports, 'extract', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extract).default;
  }
});

var _transform = __webpack_require__(11);

Object.defineProperty(exports, 'transform', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_transform).default;
  }
});

var _calculate = __webpack_require__(8);

Object.defineProperty(exports, 'calculate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_calculate).default;
  }
});

var _visualize = __webpack_require__(12);

Object.defineProperty(exports, 'visualize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_visualize).default;
  }
});

var _magic = __webpack_require__(32);

Object.defineProperty(exports, 'magic', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_magic).default;
  }
});

__webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    format: {
        default: 'csv',
        parse: function parse(input) {
            return input;
        },
        validate: function validate(value) {
            return ['csv', 'football-data.org'].includes(value);
        }
    },

    locationFirst: {
        default: 'home',
        parse: function parse(input) {
            return input;
        },
        validate: function validate(value) {
            return ['home', 'away'].includes(value);
        }
    },

    collapseToRounds: {
        default: false,
        parse: function parse(input) {
            return input === 'true';
        },
        validate: function validate(value) {
            return typeof value === 'boolean';
        }
    }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    extraColumnsNumber: {
        default: 0,
        parse: function parse(input) {
            return Number.parseInt(input, 10);
        },
        validate: function validate(value) {
            return !Number.isNaN(value);
        }
    }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (result) {
    return {
        team: result.match.opponent,
        match: {
            location: flipLocation(result.match.location),
            score: result.match.opponentScore,
            opponent: result.team,
            opponentScore: result.match.score
        }
    };
};

function flipLocation(location) {
    switch (location) {
        case 'home':
            return 'away';
        case 'away':
            return 'home';
        case 'neutral':
            return 'neutral';
        default:
            return null;
    }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (result) {
    if (result.match.score === null || result.match.opponentScore === null) {
        return null;
    }

    if (result.match.score > result.match.opponentScore) {
        return 'win';
    } else if (result.match.score < result.match.opponentScore) {
        return 'loss';
    } else if (result.match.score === result.match.opponentScore) {
        return 'draw';
    } else {
        return null;
    }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (transformedData) {
    var items = (0, _getItems2.default)(transformedData);
    var itemRound = items.reduce(function (obj, item) {
        return Object.assign(obj, _defineProperty({}, item, 0));
    }, {});

    var collapsed = [];

    transformedData.forEach(function (round) {
        round.results.filter(function (result) {
            return result.change !== null;
        }).forEach(function (result) {
            var roundNumber = ++itemRound[result.item];

            if (collapsed.length < roundNumber) {
                collapsed.push({
                    name: roundNumber.toString(),
                    results: []
                });
            }

            collapsed[roundNumber - 1].results.push(result);
        });
    });

    return collapsed;
};

var _getItems = __webpack_require__(21);

var _getItems2 = _interopRequireDefault(_getItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (transformedData, items) {
    return transformedData.map(function (round) {
        return {
            name: round.name,
            results: round.results.filter(function (result) {
                return items.includes(result.item);
            })
        };
    });
};

;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collapseToRounds = __webpack_require__(64);

Object.defineProperty(exports, 'collapseToRounds', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_collapseToRounds).default;
  }
});

var _filterItems = __webpack_require__(65);

Object.defineProperty(exports, 'filterItems', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_filterItems).default;
  }
});

var _insertStartRound = __webpack_require__(67);

Object.defineProperty(exports, 'insertStartRound', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_insertStartRound).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (transformedData, roundName) {
    var startRoundResults = transformedData[0].results.map(function (result) {
        var startResult = Object.assign({}, result);

        ['change', 'match', 'outcome'].filter(function (key) {
            return result.hasOwnProperty(key);
        }).forEach(function (key) {
            return startResult[key] = null;
        });

        if (startResult.extras) {
            Object.keys(startResult.extras).filter(function (key) {
                return key !== 'item';
            }).forEach(function (key) {
                return startResult.extras[key] = null;
            });
        }

        return startResult;
    });

    return [{
        name: roundName,
        results: startRoundResults
    }].concat(transformedData);
};

;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (rawData, params) {
    var list = new List(rawData, params.format);
    var outcomeToChange = (0, _flipObject2.default)(params.changeToOutcome);

    return list.roundsNames.map(function (roundName) {
        var roundResults = [];
        list.matches.filter(function (match) {
            return list.getRoundName(match) === roundName;
        }).forEach(function (match) {
            var firstTeamResult = {
                team: list.getFirstTeam(match),
                match: {
                    location: params.locationFirst,
                    score: list.getScore(match),
                    opponent: list.getSecondTeam(match),
                    opponentScore: list.getOpponentScore(match)
                }
            };

            [firstTeamResult, (0, _flip2.default)(firstTeamResult)].forEach(function (teamResult) {
                var outcome = (0, _getOutcome2.default)(teamResult);

                roundResults.push({
                    item: teamResult.team,
                    change: outcome ? outcomeToChange[outcome] : null,
                    outcome: outcome,
                    match: teamResult.match,
                    extras: {}
                });
            });
        });

        list.itemsNames.filter(function (name) {
            return !roundResults.map(function (result) {
                return result.item;
            }).includes(name);
        }).forEach(function (name) {
            roundResults.push({
                item: name,
                change: null,
                match: null,
                extras: {}
            });
        });

        return {
            name: roundName,
            results: roundResults
        };
    });
};

var _flipObject = __webpack_require__(54);

var _flipObject2 = _interopRequireDefault(_flipObject);

var _flip = __webpack_require__(62);

var _flip2 = _interopRequireDefault(_flip);

var _getOutcome = __webpack_require__(63);

var _getOutcome2 = _interopRequireDefault(_getOutcome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
    function List(data, format) {
        var _this = this;

        _classCallCheck(this, List);

        this.data = data;
        this.format = format;

        switch (format) {
            case 'csv':
                var _data$filter = data.filter(function (row) {
                    return row && row.length >= 5;
                }),
                    _data$filter2 = _toArray(_data$filter),
                    headers = _data$filter2[0],
                    matches = _data$filter2.slice(1);

                this.matches = matches;
                break;
            case 'football-data.org':
                this.matches = data.fixtures;
                break;
        }

        this.roundsNames = [].concat(_toConsumableArray(new Set(this.matches.map(function (match) {
            return _this.getRoundName(match);
        }))));
        this.itemsNames = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(this.matches.map(function (match) {
            return _this.getFirstTeam(match);
        })), _toConsumableArray(this.matches.map(function (match) {
            return _this.getSecondTeam(match);
        }))))));
    }

    _createClass(List, [{
        key: 'getRoundName',
        value: function getRoundName(match) {
            switch (this.format) {
                case 'csv':
                    return match[0];
                case 'football-data.org':
                    return match.matchday.toString();
            }
        }
    }, {
        key: 'getFirstTeam',
        value: function getFirstTeam(match) {
            switch (this.format) {
                case 'csv':
                    return match[1];
                case 'football-data.org':
                    return match.homeTeamName.replace('AFC', 'FC').replace('FC', '').trim();
            }
        }
    }, {
        key: 'getSecondTeam',
        value: function getSecondTeam(match) {
            switch (this.format) {
                case 'csv':
                    return match[3];
                case 'football-data.org':
                    return match.awayTeamName.replace('AFC', 'FC').replace('FC', '').trim();
            }
        }
    }, {
        key: 'getScore',
        value: function getScore(match) {
            switch (this.format) {
                case 'csv':
                    return Number.parseInt(match[2], 10);
                case 'football-data.org':
                    return match.status === 'FINISHED' ? match.result.goalsHomeTeam : null;
            }
        }
    }, {
        key: 'getOpponentScore',
        value: function getOpponentScore(match) {
            switch (this.format) {
                case 'csv':
                    return Number.parseInt(match[4], 10);
                case 'football-data.org':
                    return match.status === 'FINISHED' ? match.result.goalsAwayTeam : null;
            }
        }
    }]);

    return List;
}();

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (rawData, params) {
    var offset = (params.extraColumnsNumber || 0) + 1;

    var extraColumnsNames = rawData[0].slice(1, offset);
    var roundsNames = rawData[0].slice(offset);

    var transposed = (0, _transpose2.default)(rawData.slice(1).filter(function (row) {
        return row[0];
    }));
    var itemsNames = transposed[0];
    var extraColumns = transposed.slice(1, offset).map(function (column) {
        return new Map(itemsNames.map(function (item, i) {
            return [item, column[i]];
        }));
    });
    var changes = transposed.slice(offset);

    return changes.map(function (resultRow, rowIndex) {
        var roundResults = [];
        resultRow.forEach(function (changeString, itemNumber) {
            var item = itemsNames[itemNumber];
            var change = changeString ? Number.parseInt(changeString, 10) || 0 : null;

            roundResults.push({
                item: item,
                change: change,
                outcome: params.changeToOutcome[change] || null,
                extras: {
                    item: extraColumns.reduce(function (obj, col, i) {
                        return Object.assign(obj, _defineProperty({}, extraColumnsNames[i], col.get(item)));
                    }, {})
                }
            });
        });

        return {
            name: roundsNames[rowIndex],
            results: roundResults
        };
    });
};

var _transpose = __webpack_require__(58);

var _transpose2 = _interopRequireDefault(_transpose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validateArray = __webpack_require__(1);

var _validateArray2 = _interopRequireDefault(_validateArray);

var _isString = __webpack_require__(0);

var _isString2 = _interopRequireDefault(_isString);

var _parseObject = __webpack_require__(2);

var _parseObject2 = _interopRequireDefault(_parseObject);

var _validateObject = __webpack_require__(3);

var _validateObject2 = _interopRequireDefault(_validateObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    columns: {
        default: ['position', 'item', 'points'],
        parse: function parse(input) {
            return input.split(',');
        },
        validate: function validate(value) {
            return (0, _validateArray2.default)(value, _isString2.default);
        }
    },

    labels: {
        default: ['#', 'Team', 'Points'],
        parse: function parse(input) {
            return input.split(',');
        },
        validate: function validate(value) {
            return (0, _validateArray2.default)(value, _isString2.default);
        }
    },

    colors: {
        default: {
            'win': '#ACE680',
            'draw': '#B3B3B3',
            'loss': '#E68080'
        },
        parse: _parseObject2.default,
        validate: function validate(obj) {
            return (0, _validateObject2.default)(obj, function (key) {
                return ['win', 'draw', 'loss'].includes(key);
            }, function (value) {
                return (0, _isString2.default)(value);
            });
        }
    },

    durations: {
        default: {
            move: 750,
            freeze: 750,
            outcomes: 200
        },
        parse: _parseObject2.default,
        validate: function validate(obj) {
            return (0, _validateObject2.default)(obj, function (key) {
                return ['move', 'freeze', 'outcomes'].includes(key);
            }, function (value) {
                return !Number.isNaN(value) && value >= 0;
            });
        }
    }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validateArray = __webpack_require__(1);

var _validateArray2 = _interopRequireDefault(_validateArray);

var _isString = __webpack_require__(0);

var _isString2 = _interopRequireDefault(_isString);

var _controls = __webpack_require__(7);

var controls = _interopRequireWildcard(_controls);

var _parseObject = __webpack_require__(2);

var _parseObject2 = _interopRequireDefault(_parseObject);

var _validateObject = __webpack_require__(3);

var _validateObject2 = _interopRequireDefault(_validateObject);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    controls: {
        default: ['play'],
        parse: function parse(input) {
            return input.split(',');
        },
        validate: function validate(value) {
            return (0, _validateArray2.default)(value, function (value) {
                return controls.hasOwnProperty(value);
            });
        }
    },

    colors: {
        default: {
            'win': '#21c114',
            'draw': '#828282',
            'loss': '#e63131'
        },
        parse: _parseObject2.default,
        validate: function validate(obj) {
            return (0, _validateObject2.default)(obj, function (key) {
                return ['win', 'draw', 'loss'].includes(key);
            }, function (value) {
                return (0, _isString2.default)(value);
            });
        }
    },

    sparkColors: {
        default: {
            'win': '#D7E7C1',
            'draw': '#F0F0F0',
            'loss': '#EFCEBA'
        },
        parse: _parseObject2.default,
        validate: function validate(obj) {
            return (0, _validateObject2.default)(obj, function (key) {
                return ['win', 'draw', 'loss'].includes(key);
            }, function (value) {
                return (0, _isString2.default)(value);
            });
        }
    },

    currentSparkColors: {
        default: {
            'win': '#AAD579',
            'draw': '#CCCCCC',
            'loss': '#E89B77'
        },
        parse: _parseObject2.default,
        validate: function validate(obj) {
            return (0, _validateObject2.default)(obj, function (key) {
                return ['win', 'draw', 'loss'].includes(key);
            }, function (value) {
                return (0, _isString2.default)(value);
            });
        }
    },

    durations: {
        default: {
            move: 1000,
            freeze: 500,
            pre: 750
        },
        parse: _parseObject2.default,
        validate: function validate(obj) {
            return (0, _validateObject2.default)(obj, function (key) {
                return ['move', 'freeze', 'pre'].includes(key);
            }, function (value) {
                return !Number.isNaN(value) && value >= 0;
            });
        }
    },

    pointsLabel: {
        default: 'points',
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    },

    allLabel: {
        default: 'All',
        parse: function parse(input) {
            return input;
        },
        validate: _isString2.default
    }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(selector, roundMeta, next) {
        _classCallCheck(this, _class);

        this.button = selector.append('div').attr('class', 'next').classed('disabled', roundMeta.isLast).on('click', next);

        this.onRoundChange = this.onRoundChange.bind(this);
    }

    _createClass(_class, [{
        key: 'onRoundChange',
        value: function onRoundChange(roundMeta) {
            this.button.classed('disabled', roundMeta.isLast);
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(selector, roundMeta, play, pause) {
        var _this = this;

        _classCallCheck(this, _class);

        this.isLast = roundMeta.isLast;

        this.button = selector.append('div').on('click', function () {
            if (_this.isPlaying) {
                pause();
            } else {
                play();
            }
        });

        this.updateClass();

        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onRoundChange = this.onRoundChange.bind(this);
    }

    _createClass(_class, [{
        key: 'onPlay',
        value: function onPlay() {
            this.isPlaying = true;
            this.updateClass();
        }
    }, {
        key: 'onPause',
        value: function onPause() {
            this.isPlaying = false;
            this.updateClass();
        }
    }, {
        key: 'onRoundChange',
        value: function onRoundChange(roundMeta) {
            this.isLast = roundMeta.isLast;
            this.updateClass();
        }
    }, {
        key: 'updateClass',
        value: function updateClass() {
            var className = this.isPlaying ? 'pause' : this.isLast ? 'replay' : 'play';

            this.button.classed('play', className === 'play').classed('pause', className === 'pause').classed('replay', className === 'replay');
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(selector, roundMeta, previous) {
        _classCallCheck(this, _class);

        this.button = selector.append('div').attr('class', 'previous').classed('disabled', roundMeta.index === 0).on('click', previous);

        this.onRoundChange = this.onRoundChange.bind(this);
    }

    _createClass(_class, [{
        key: 'onRoundChange',
        value: function onRoundChange(roundMeta) {
            this.button.classed('disabled', roundMeta.index === 0);
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(selector, roundsAvailable, roundsTotal, roundMeta, preview, endPreview) {
        var _this = this;

        _classCallCheck(this, _class);

        this.container = selector.append('div').attr('class', 'slider');

        this.roundToPercent = d3.scaleLinear().domain([0, roundsTotal]).range([0, 100]);

        var rectangle = this.container.node().getBoundingClientRect();
        this.scale = d3.scaleLinear().range([0, rectangle.right - rectangle.left]).domain([0, roundsTotal]).clamp(true);

        this.available = this.container.append('span').attr('class', 'slider-available').style('width', this.roundToPercent(roundsAvailable) + '%');

        var progress = this.roundToPercent(roundMeta.index) + '%';

        this.toggle = this.container.append('span').attr('class', 'slider-toggle').style('left', progress).text(roundMeta.name).style('margin-left', this.adaptMargin).call(d3.drag().on("drag", function () {
            var round = Math.min(Math.round(_this.scale.invert(d3.event.x)), roundsAvailable);
            preview(round);
        }).on("end", function () {
            return endPreview(true);
        }));

        this.progress = this.container.append('span').attr('class', 'slider-progress').style('width', progress);

        this.onRoundPreview = this.onRoundPreview.bind(this);
        this.onRoundChange = this.onRoundChange.bind(this);
    }

    _createClass(_class, [{
        key: 'adaptMargin',
        value: function adaptMargin() {
            var width = d3.select(this).node().getBoundingClientRect().width;
            return '-' + width / 2 + 'px';
        }
    }, {
        key: 'onRoundPreview',
        value: function onRoundPreview(roundMeta) {
            var progress = this.roundToPercent(roundMeta.index) + '%';

            this.toggle.style('left', progress).text(roundMeta.name).style('margin-left', this.adaptMargin);

            this.progress.style('width', progress);
        }
    }, {
        key: 'onRoundChange',
        value: function onRoundChange(roundMeta) {
            var _this2 = this;

            var progress = this.roundToPercent(roundMeta.index) + '%';

            this.toggle.transition().duration(500).styleTween('left', function () {
                return d3.interpolateString(_this2.toggle.node().style.left, progress);
            }).on('end', function () {
                _this2.toggle.text(roundMeta.name).style('margin-left', _this2.adaptMargin);
            });

            this.progress.transition().duration(500).styleTween('width', function () {
                return d3.interpolateString(_this2.progress.node().style.width, progress);
            });
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (durations, speed) {
    return Object.keys(durations).reduce(function (obj, key) {
        return Object.assign(obj, _defineProperty({}, key, durations[key] / speed));
    }, {});
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (position, positionWhenTied) {
    switch (positionWhenTied) {
        case 'strict':
            return position.strict.toString();
        case 'highest':
            return position.highest.toString();
        case 'range':
            if (position.highest !== position.lowest) {
                return position.highest + '\u2013' + position.lowest;
            } else {
                return position.highest.toString();
            }
        case 'average':
            return ((position.highest + position.lowest) / 2).toString();
        default:
            return position.strict.toString();
    }
};

;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (rows) {
    var ys = {};
    rows.nodes().forEach(function (n) {
        var item = n.__data__.item;
        var top = n.getBoundingClientRect().top;
        if (!ys[item] || ys[item] < top) {
            ys[item] = top;
        }
    });

    return ys;
};

;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (cell, roundIndex) {
    var classes = ['spark'];

    if (cell.roundMeta.index === roundIndex) {
        classes.push('current');
    } else if (cell.roundMeta.index > roundIndex) {
        classes.push('overlapped');
    }

    return classes.join(' ');
};

;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (cell, roundIndex, params) {
    if (!cell.result.outcome) {
        return 'transparent';
    }

    return cell.roundMeta.index === roundIndex ? params.currentSparkColors[cell.result.outcome] : params.sparkColors[cell.result.outcome];
};

;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _skeleton = __webpack_require__(30);

var _skeleton2 = _interopRequireDefault(_skeleton);

var _cell = __webpack_require__(27);

var _cell2 = _interopRequireDefault(_cell);

var _fromCamelCase = __webpack_require__(55);

var _fromCamelCase2 = _interopRequireDefault(_fromCamelCase);

var _getItemResults = __webpack_require__(20);

var _getItemResults2 = _interopRequireDefault(_getItemResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headerlessColumns = ['outcome', 'match', 'round', 'score', 'opponent'];

var _class = function (_Skeleton) {
    _inherits(_class, _Skeleton);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'renderTable',
        value: function renderTable(data) {
            var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['main'];

            var _this2 = this;

            var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.params.columns;
            var labels = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.params.labels;

            var table = this.tableContainer.append('table').attr('class', classes.join(' '));

            var thead = table.append('thead');
            thead.append('tr').selectAll('th').data(columns).enter().append('th').text(function (column, i) {
                if (labels[i]) {
                    return labels[i];
                } else if (headerlessColumns.includes(column) || column.includes('.change')) {
                    return '';
                } else {
                    return (0, _fromCamelCase2.default)(column);
                }
            });

            var tbody = table.append('tbody');
            var rows = tbody.selectAll('tr').data(data, function (k) {
                return k.item || k.roundMeta.index;
            }).enter().append('tr');

            var cells = rows.selectAll('td').data(function (result) {
                return columns.map(function (column) {
                    return new _cell2.default(column, result, _this2.params);
                });
            }).enter().append('td').attr('class', function (cell) {
                return cell.classes.join(' ');
            }).style('background-color', function (cell) {
                return cell.backgroundColor || 'transparent';
            }).text(function (cell) {
                return cell.text;
            }).on('click', function (cell) {
                switch (cell.column) {
                    case 'item':
                        return _this2.drillDown(cell.result.item);
                    case 'round':
                        return _this2.endDrillDown(cell.result.roundMeta.index);
                    default:
                        return null;
                }
            });

            return [table, rows, cells];
        }
    }, {
        key: 'to',
        value: function to(roundIndex) {
            var _this3 = this;

            if (roundIndex < 0 || roundIndex > this.data.meta.lastRound) {
                return Promise.reject('Sorry we can\'t go to round #' + roundIndex);
            }

            this.dispatch.call('roundChange', this, this.data.results[roundIndex].meta);

            this.rows = this.rows.data(this.data.results[roundIndex].results, function (k) {
                return k.item;
            });

            this.cells = this.cells.data(function (result) {
                return _this3.params.columns.map(function (column) {
                    return new _cell2.default(column, result, _this3.params);
                });
            });

            var animateOutcomes = this.params.columns.includes('outcome');
            if (animateOutcomes) {
                this.table.selectAll('td.outcome').transition().duration(this.durations.outcomes).style("background-color", function (cell) {
                    return _this3.params.colors[cell.result.outcome] || 'transparent';
                });
            }

            this.cells.filter('.change').attr('class', function (cell) {
                return cell.classes.join(' ');
            }).text(function (cell) {
                return cell.text;
            });

            return this.move(roundIndex, animateOutcomes ? this.durations.outcomes : 0, this.durations.move).then(function () {
                _this3.cells.filter(':not(.change)').attr('class', function (cell) {
                    return cell.classes.join(' ');
                }).text(function (cell) {
                    return cell.text;
                });
            });
        }
    }, {
        key: 'preview',
        value: function preview(roundIndex) {
            var _this4 = this;

            this.dispatch.call('roundPreview', this, this.data.results[roundIndex].meta);

            this.rows = this.rows.data(this.data.results[roundIndex].results, function (k) {
                return k.item;
            });

            this.cells = this.rows.selectAll('td').data(function (result) {
                return _this4.params.columns.map(function (column) {
                    return new _cell2.default(column, result, _this4.params);
                });
            }).attr('class', function (cell) {
                return cell.classes.join(' ');
            }).style('background-color', function (cell) {
                return cell.backgroundColor || 'transparent';
            }).text(function (cell) {
                return cell.text;
            });

            return Promise.resolve();
        }
    }, {
        key: 'drillDown',
        value: function drillDown(item) {
            var _this5 = this;

            this.dispatch.call('drillDown', this, item);

            this.controls.classed('hidden', true);
            this.drilldown.controls = this.controlsContainer.append('div').attr('class', 'drilldown-contorls');
            this.drilldown.controls.append('div').attr('class', 'back').text('<-').on('click', this.endDrillDown.bind(this));
            this.drilldown.controls.append('div').attr('class', 'item').text(item);

            var columns = ['round'];
            var labels = [''];
            this.params.columns.forEach(function (column, i) {
                var classes = new _cell2.default(column, _this5.data.results[1].results[0], _this5.params).classes;
                if (column !== 'item' && !classes.includes('extra-item')) {
                    columns.push(column);
                    labels.push(_this5.params.labels[i] || '');
                }
            });

            var itemData = (0, _getItemResults2.default)(this.data.results, item, true);

            this.table.classed('hidden', true);

            var _renderTable = this.renderTable(itemData, ['drilldown'], columns, labels);

            var _renderTable2 = _slicedToArray(_renderTable, 3);

            this.drilldown.table = _renderTable2[0];
            this.drilldown.rows = _renderTable2[1];
            this.drilldown.cells = _renderTable2[2];


            return Promise.resolve();
        }
    }, {
        key: 'endDrillDown',
        value: function endDrillDown() {
            var _this6 = this;

            var roundIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var end = function end() {
                _this6.dispatch.call('endDrillDown', _this6, roundIndex);
                return Promise.resolve();
            };

            this.drilldown.controls.remove();
            this.controls.classed('hidden', false);

            this.drilldown.table.remove();
            this.table.classed('hidden', false);

            if (roundIndex !== null) {
                return Promise.resolve(this.to(roundIndex)).then(end);
            } else {
                end();
            }
        }
    }]);

    return _class;
}(_skeleton2.default);

exports.default = _class;
;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _skeleton = __webpack_require__(30);

var _skeleton2 = _interopRequireDefault(_skeleton);

var _cell = __webpack_require__(27);

var _cell2 = _interopRequireDefault(_cell);

var _numberToChange = __webpack_require__(22);

var _numberToChange2 = _interopRequireDefault(_numberToChange);

var _isBetween = __webpack_require__(57);

var _isBetween2 = _interopRequireDefault(_isBetween);

var _getItemResults = __webpack_require__(20);

var _getItemResults2 = _interopRequireDefault(_getItemResults);

var _getSparkColor = __webpack_require__(80);

var _getSparkColor2 = _interopRequireDefault(_getSparkColor);

var _getSparkClasses = __webpack_require__(79);

var _getSparkClasses2 = _interopRequireDefault(_getSparkClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var columns = {
    left: ['position', 'item'],
    right: ['score', 'opponent', 'points.change', 'equal', 'points', 'pointsLabel'],
    drilldown: ['score', 'opponent', 'wins', 'draws', 'losses', 'labeledPoints']
};

var _class = function (_Skeleton) {
    _inherits(_class, _Skeleton);

    function _class(data, params) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, data, params));

        _this.durations.scale = d3.scaleLinear().domain([1, data.meta.lastRound]).range([_this.durations.move, 1.5 * _this.durations.move]);

        ['right', 'slider', 'sparks'].forEach(function (el) {
            return _this[el].roundIndex = _this.currentRound;
        });
        return _this;
    }

    _createClass(_class, [{
        key: 'renderTable',
        value: function renderTable(data) {
            var _this2 = this;

            var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['main'];

            this.left = {};
            this.sparks = {};
            this.right = {};
            this.slider = {};

            this.left.columns = columns.left;
            this.right.columns = columns.right;

            var _makeTable = this.makeTable(data, [].concat(_toConsumableArray(classes), ['left']), this.left.columns);

            var _makeTable2 = _slicedToArray(_makeTable, 3);

            this.left.table = _makeTable2[0];
            this.left.rows = _makeTable2[1];
            this.left.cells = _makeTable2[2];

            var _makeSparks = this.makeSparks(data);

            var _makeSparks2 = _slicedToArray(_makeSparks, 3);

            this.sparks.table = _makeSparks2[0];
            this.sparks.rows = _makeSparks2[1];
            this.sparks.cells = _makeSparks2[2];

            var _makeTable3 = this.makeTable(data, [].concat(_toConsumableArray(classes), ['right']), this.right.columns);

            var _makeTable4 = _slicedToArray(_makeTable3, 3);

            this.right.table = _makeTable4[0];
            this.right.rows = _makeTable4[1];
            this.right.cells = _makeTable4[2];


            this.sparks.width = this.sparks.rows.node().offsetWidth - this.sparks.cells.node().offsetWidth;

            this.scale = d3.scaleLinear().domain([1, this.data.meta.lastRound]).range([0, this.sparks.width]).clamp(true);

            this.moveRightTable(this.currentRound);

            this.slider.top = this.makeSlider('top');
            this.slider.bottom = this.makeSlider('bottom');

            this.right.table.call(d3.drag().on("start", function () {
                _this2.right.drag = {
                    x: d3.event.x,
                    roundIndex: _this2.right.roundIndex
                };
            }).on("drag", function () {
                var difference = Math.abs(_this2.right.drag.x - d3.event.x);
                var sign = Math.sign(_this2.right.drag.x - d3.event.x);
                var index = _this2.right.drag.roundIndex - sign * Math.round(_this2.scale.invert(difference)) + 1;
                var roundIndex = Math.min(Math.max(index, 1), _this2.data.meta.lastRound);

                _this2.moveRightTable(roundIndex);
                _this2.preview(roundIndex);
            }).on("end", function () {
                return _this2.endPreview(true);
            }));

            return ['table', 'rows', 'cells'].map(function (el) {
                var nodes = ['left', 'sparks', 'right'].map(function (part) {
                    return _this2[part][el].nodes();
                });
                return d3.selectAll(d3.merge(nodes));
            });
        }
    }, {
        key: 'makeTable',
        value: function makeTable(data, classes, columns) {
            var _this3 = this;

            var table = this.tableContainer.append('table').attr('class', classes.join(' '));

            var tbody = table.append('tbody');
            var rows = tbody.selectAll('tr').data(data, function (k) {
                return k.item;
            }).enter().append('tr');

            var cells = rows.selectAll('td').data(function (result) {
                return columns.map(function (column) {
                    return new Cell(column, result, _this3.params);
                });
            }).enter().append('td').attr('class', function (cell) {
                return cell.classes.join(' ');
            }).style('color', function (cell) {
                return cell.color;
            }).text(function (cell) {
                return cell.text;
            });

            cells.filter('.clickable').on('click', function (cell) {
                switch (cell.column) {
                    case 'item':
                        if (_this3.drilldown.item !== cell.result.item) {
                            return _this3.drillDown(cell.result.item);
                        } else {
                            return _this3.endDrillDown();
                        }
                    default:
                        return null;
                }
            });

            return [table, rows, cells];
        }
    }, {
        key: 'makeSparks',
        value: function makeSparks(data) {
            var _this4 = this;

            var table = this.tableContainer.append('table').attr('class', 'sparks');

            var tbody = table.append('tbody');

            var sparksData = data.map(function (result) {
                return {
                    item: result.item,
                    results: (0, _getItemResults2.default)(_this4.data.results, result.item)
                };
            });

            var rows = tbody.selectAll('tr').data(sparksData, function (k) {
                return k.item;
            }).enter().append('tr');

            var cells = rows.selectAll('td').data(function (row) {
                return _this4.data.results.slice(1, _this4.data.meta.lastRound + 1).map(function (round, i) {
                    return {
                        result: row.results[i + 1],
                        roundMeta: row.results[i + 1].roundMeta
                    };
                });
            }).enter().append('td').attr('class', function (cell) {
                return (0, _getSparkClasses2.default)(cell, _this4.currentRound);
            }).style('background-color', function (cell) {
                return (0, _getSparkColor2.default)(cell, _this4.currentRound, _this4.params);
            }).on('mouseover', function (cell) {
                return _this4.preview(cell.roundMeta.index);
            }).on('mouseout', function (cell) {
                return _this4.endPreview(false);
            }).on('click', function (cell) {
                return _this4.endPreview(true);
            });

            var scale = d3.scaleLinear().domain([1, sparksData.length]).range([0, 100]);

            cells.filter(function (cell) {
                return cell.result.change !== null;
            }).append('span').attr('class', 'spark-position').style('top', function (cell) {
                return scale(cell.result.position.strict) + '%';
            });

            cells.filter(function (cell) {
                return cell.result.change !== null;
            }).append('span').attr('class', 'spark-score muted').style('color', function (cell) {
                return _this4.params.colors[cell.result.outcome] || 'black';
            }).text(function (cell) {
                return cell.result.match ? cell.result.match.score + ':' + cell.result.match.opponentScore : '';
            });

            cells.filter(function (cell) {
                return cell.roundMeta.index > _this4.currentRound;
            }).classed('overlapped', true);

            this.dispatch.on('roundPreview.sparks', function (roundMeta) {
                return _this4.moveSparks(roundMeta.index, 0);
            });

            return [table, rows, cells];
        }
    }, {
        key: 'makeSlider',
        value: function makeSlider() {
            var _this5 = this;

            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'top';

            var slider = position === 'top' ? this.sparks.table.select('tbody').insert('tr', 'tr') : this.sparks.table.select('tbody').append('tr');

            slider.attr('class', 'sparklines-slider ' + position).append('td').attr('class', 'slider-cell').attr('colspan', this.roundsTotalNumber);

            var left = this.scale(this.currentRound) + 'px';
            return slider.select('.slider-cell').append('span').attr('class', 'slider-toggle').style('left', left).text(this.data.results[this.currentRound].meta.name).call(d3.drag().on("drag", function () {
                var roundIndex = Math.round(_this5.scale.invert(d3.event.x));
                _this5.moveRightTable(roundIndex);
                _this5.preview(roundIndex);
            }).on("end", function () {
                return _this5.endPreview(true);
            }));
        }
    }, {
        key: 'to',
        value: function to(roundIndex) {
            var _this6 = this;

            if (roundIndex < 1 || roundIndex > this.data.meta.lastRound) {
                return Promise.reject('Sorry we can\'t go to round #' + roundIndex);
            }

            if (roundIndex === this.currentRound) {
                return Promise.resolve();
            }

            var change = roundIndex - this.currentRound;
            this.dispatch.call('roundChange', this, this.data.results[roundIndex].meta);

            ['left', 'right'].forEach(function (side) {
                _this6[side].rows.data(_this6.data.results[roundIndex].results, function (k) {
                    return k.item;
                });

                _this6[side].cells = _this6[side].cells.data(function (result) {
                    return _this6[side].columns.map(function (column) {
                        return new Cell(column, result, _this6.params);
                    });
                });
            });

            this.right.cells.filter('.change').attr('class', function (cell) {
                return cell.classes.join(' ');
            }).style('color', function (cell) {
                return cell.color;
            }).text(function (cell) {
                return cell.text;
            });

            var preAnimations = ['right', 'slider', 'sparks'].filter(function (element) {
                return _this6[element].roundIndex !== _this6.currentRound;
            });

            preAnimations.forEach(function (element) {
                return {
                    right: _this6.moveRightTable,
                    slider: _this6.moveSlider,
                    sparks: _this6.moveSparks
                }[element].bind(_this6)(roundIndex, _this6.durations.pre);
            });

            var duration = this.durations.scale(Math.abs(change));
            return this.move(roundIndex, preAnimations.length ? this.durations.pre : 0, duration).then(function () {
                var merged = d3.merge([_this6.left.cells.nodes(), _this6.right.cells.filter(':not(.change)').nodes()]);
                d3.selectAll(merged).attr('class', function (cell) {
                    return cell.classes.join(' ');
                }).style('color', function (cell) {
                    return cell.color;
                }).text(function (cell) {
                    return cell.text;
                });
            });
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider(roundIndex) {
            var _this7 = this;

            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var left = this.scale(roundIndex) + 'px';
            [this.slider.top, this.slider.bottom].map(function (slider) {
                slider.transition().duration(duration).style('left', left).text(_this7.data.results[roundIndex].meta.name).on('end', function () {
                    return _this7.slider.roundIndex = roundIndex;
                });
            });
        }
    }, {
        key: 'moveRightTable',
        value: function moveRightTable(roundIndex) {
            var _this8 = this;

            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.right.table.transition().duration(duration).style('left', '-' + (this.sparks.width - this.scale(roundIndex)) + 'px').on('end', function () {
                return _this8.right.roundIndex = roundIndex;
            });
        }
    }, {
        key: 'moveSparks',
        value: function moveSparks(roundIndex) {
            var _this9 = this;

            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var changed = this.sparks.cells.filter(function (cell) {
                return (0, _isBetween2.default)(cell.roundMeta.index, roundIndex, _this9.sparks.roundIndex);
            });

            if (!duration) {
                changed.style('background-color', function (cell) {
                    return (0, _getSparkColor2.default)(cell, roundIndex, _this9.params);
                }).style('opacity', function (cell) {
                    return cell.roundMeta.index > roundIndex ? 0.15 : 1;
                });

                this.sparks.roundIndex = roundIndex;
            } else {
                changed.transition().duration(duration).style('background-color', function (cell) {
                    return (0, _getSparkColor2.default)(cell, roundIndex, _this9.params);
                }).style('opacity', function (cell) {
                    return cell.roundMeta.index > roundIndex ? 0.15 : 1;
                }).on('end', function () {
                    return _this9.sparks.roundIndex = roundIndex;
                });
            }
        }
    }, {
        key: 'first',
        value: function first() {
            return this.to(1);
        }
    }, {
        key: 'preview',
        value: function preview(roundIndex) {
            var _this10 = this;

            if (roundIndex < 1 || roundIndex > this.data.meta.lastRound) {
                return Promise.reject('Sorry we can\'t preview round #' + roundIndex);
            }

            var previousPreviewedRound = this.previewedRound;

            if (previousPreviewedRound === roundIndex) {
                return Promise.resolve();
            }

            this.dispatch.call('roundPreview', this, this.data.results[roundIndex].meta);

            this.moveSlider(roundIndex);

            ['left', 'right'].forEach(function (side) {
                _this10[side].rows.data(_this10.data.results[roundIndex].results, function (k) {
                    return k.item;
                });

                _this10[side].cells = _this10[side].cells.data(function (result) {
                    return _this10[side].columns.map(function (column) {
                        return new Cell(column, result, _this10.params);
                    });
                }).attr('class', function (cell) {
                    return cell.classes.join(' ');
                }).style('color', function (cell) {
                    return cell.color;
                }).text(function (cell) {
                    return cell.text;
                });
            });

            return Promise.resolve();
        }
    }, {
        key: 'drillDown',
        value: function drillDown(item) {
            var _this11 = this;

            this.dispatch.call('drillDown', this, item);

            if (!this.drilldown.controls) {
                this.drilldown.controls = this.controls.append('div').attr('class', 'drilldown-control').on('click', this.endDrillDown).text(this.params.allLabel);
            }

            this.right.columns = columns.drilldown;

            this.right.cells.data(function (result) {
                return _this11.right.columns.map(function (column) {
                    return new Cell(column, result, _this11.params);
                });
            }).attr('class', function (cell) {
                return cell.classes.join(' ');
            }).style('color', function (cell) {
                return cell.color;
            }).text(function (cell) {
                return cell.text;
            });

            this.right.rows.classed('muted', function (row) {
                return row.item !== item;
            });

            this.sparks.cells.classed('muted', function (cell) {
                return !cell.result.match || cell.result.item !== item && cell.result.match.opponent !== item;
            });

            this.sparks.cells.selectAll('.spark-score').classed('muted', function (cell) {
                return !cell.result.match || cell.result.item === item || cell.result.match.opponent !== item;
            });

            return Promise.resolve();
        }
    }, {
        key: 'endDrillDown',
        value: function endDrillDown() {
            var _this12 = this;

            this.drilldown.controls.remove();
            this.drilldown.controls = null;

            this.sparks.cells.classed('muted', false);

            this.sparks.cells.selectAll('.spark-score').classed('muted', true);

            this.right.columns = columns.right;

            this.right.cells.data(function (result) {
                return _this12.right.columns.map(function (column) {
                    return new Cell(column, result, _this12.params);
                });
            }).attr('class', function (cell) {
                return cell.classes.join(' ');
            }).style('color', function (cell) {
                return cell.color;
            }).text(function (cell) {
                return cell.text;
            });

            this.right.rows.classed('muted', false);

            this.dispatch.call('endDrillDown', this, null);

            return Promise.resolve();
        }
    }]);

    return _class;
}(_skeleton2.default);

exports.default = _class;
;

var Cell = function (_skeletonCell) {
    _inherits(Cell, _skeletonCell);

    function Cell() {
        _classCallCheck(this, Cell);

        return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).apply(this, arguments));
    }

    _createClass(Cell, [{
        key: 'score',
        value: function score(result, params) {
            this.text = result.match && result.match.score !== null ? result.match.score + ':' + result.match.opponentScore : '';
            this.classes = ['score', 'change'];
            this.color = params.colors[result.outcome];
            return this;
        }
    }, {
        key: 'opponent',
        value: function opponent(result, params) {
            this.text = result.match ? result.match.opponent : '';
            this.classes = ['opponent', 'change'];
            return this;
        }
    }, {
        key: 'equal',
        value: function equal(result, params) {
            this.text = result.position.strict === 1 ? '=' : '';
            this.classes = ['label'];
            return this;
        }
    }, {
        key: 'pointsLabel',
        value: function pointsLabel(result, params) {
            this.text = result.position.strict === 1 ? params.pointsLabel : '';
            this.classes = ['label'];
            return this;
        }
    }, {
        key: 'wins',
        value: function wins(result, params) {
            this.text = result.wins.total + ' w.';
            this.classes = ['change'];
            this.color = params.colors.win;
            return this;
        }
    }, {
        key: 'draws',
        value: function draws(result, params) {
            this.text = result.draws.total + ' d.';
            this.classes = ['calculation'];
            this.color = params.colors.draw;
            return this;
        }
    }, {
        key: 'losses',
        value: function losses(result, params) {
            this.text = result.losses.total + ' l.';
            this.classes = ['calculation'];
            this.color = params.colors.loss;
            return this;
        }
    }, {
        key: 'labeledPoints',
        value: function labeledPoints(result, params) {
            this.text = result.points.total + ' points';
            this.classes = ['calculation'];
            return this;
        }
    }, {
        key: 'makeChange',
        value: function makeChange(column, result, params) {
            var calc = column.replace('.change', '');
            this.text = result.change !== null ? (0, _numberToChange2.default)(result[calc].change, '0') : '';
            this.classes = ['change'];
            this.color = params.colors[result.outcome];
            return this;
        }
    }]);

    return Cell;
}(_cell2.default);

/***/ })
/******/ ]);
});