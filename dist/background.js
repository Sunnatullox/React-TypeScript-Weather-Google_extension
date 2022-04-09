/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/api.ts":
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchOpenWeatherData": () => (/* binding */ fetchOpenWeatherData),
/* harmony export */   "getWeatherIconSrc": () => (/* binding */ getWeatherIconSrc)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const OPEN_WEATHER_API_KEY = '05b9fab091a8c3649cb86aa21968da56';
function fetchOpenWeatherData(sity, tempScale) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sity}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`);
        if (!res.ok)
            throw new Error("City not found");
        const data = yield res.json();
        return data;
    });
}
function getWeatherIconSrc(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}


/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStoredCities": () => (/* binding */ setStoredCities),
/* harmony export */   "getStorageCities": () => (/* binding */ getStorageCities),
/* harmony export */   "setStoredOptions": () => (/* binding */ setStoredOptions),
/* harmony export */   "getStorageOptions": () => (/* binding */ getStorageOptions)
/* harmony export */ });
function setStoredCities(cities) {
    const value = {
        cities
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(value, () => resolve());
    });
}
function getStorageCities() {
    const keys = ["cities"];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (result) => {
            var _a;
            resolve((_a = result.cities) !== null && _a !== void 0 ? _a : []);
        });
    });
}
function setStoredOptions(options) {
    const value = {
        options
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(value, () => {
            resolve();
        });
    });
}
function getStorageOptions() {
    const keys = ['options'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (result) => {
            resolve(result.options);
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.ts");


// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredCities)([]);
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredOptions)({
        hasAutoOverlay: false,
        homCity: "",
        tempScale: 'metric'
    });
    chrome.contextMenus.create({
        contexts: ['selection'],
        title: "Add city to weather extension",
        id: "weatherExtension"
    });
    chrome.alarms.create({
        periodInMinutes: 0.1 / 6
    });
});
chrome.contextMenus.onClicked.addListener((event) => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.getStorageCities)().then(city => {
        (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredCities)([...city, event.selectionText]);
    });
});
chrome.alarms.onAlarm.addListener(() => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.getStorageOptions)().then((options) => {
        if (options.homCity === '') {
            return;
        }
        (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.fetchOpenWeatherData)(options.homCity, options.tempScale).then(data => {
            const temp = Math.round(data.main.temp);
            const simbol = options.tempScale === "metric" ? "\u2103" : "\u2109";
            chrome.action.setBadgeText({
                text: `${temp}${simbol}`
            });
        });
    });
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map