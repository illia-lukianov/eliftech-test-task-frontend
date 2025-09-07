import {
  createPersistoid,
  getStoredState,
  persistReducer,
  purgeStoredState
} from "./chunk-SYYCCCU4.js";
import {
  persistStore
} from "./chunk-OTY75I5Q.js";
import {
  DEFAULT_VERSION,
  FLUSH,
  KEY_PREFIX,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE
} from "./chunk-TQWTMSAS.js";
import {
  combineReducers
} from "./chunk-MBT3EELI.js";
import "./chunk-V4OQ3NZ2.js";

// node_modules/redux-persist/es/stateReconciler/autoMergeLevel2.js
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function autoMergeLevel2(inboundState, originalState, reducedState, _ref) {
  var debug = _ref.debug;
  var newState = _objectSpread({}, reducedState);
  if (inboundState && _typeof(inboundState) === "object") {
    Object.keys(inboundState).forEach(function(key) {
      if (key === "_persist") return;
      if (originalState[key] !== reducedState[key]) {
        if (debug) console.log("redux-persist/stateReconciler: sub state for key `%s` modified, skipping.", key);
        return;
      }
      if (isPlainEnoughObject(reducedState[key])) {
        newState[key] = _objectSpread({}, newState[key], {}, inboundState[key]);
        return;
      }
      newState[key] = inboundState[key];
    });
  }
  if (debug && inboundState && _typeof(inboundState) === "object") console.log("redux-persist/stateReconciler: rehydrated keys '".concat(Object.keys(inboundState).join(", "), "'"));
  return newState;
}
function isPlainEnoughObject(o) {
  return o !== null && !Array.isArray(o) && _typeof(o) === "object";
}

// node_modules/redux-persist/es/persistCombineReducers.js
function persistCombineReducers(config, reducers) {
  config.stateReconciler = config.stateReconciler === void 0 ? autoMergeLevel2 : config.stateReconciler;
  return persistReducer(config, combineReducers(reducers));
}

// node_modules/redux-persist/es/createMigrate.js
function createMigrate(migrations, config) {
  var _ref = config || {}, debug = _ref.debug;
  return function(state, currentVersion) {
    if (!state) {
      if (debug) console.log("redux-persist: no inbound state, skipping migration");
      return Promise.resolve(void 0);
    }
    var inboundVersion = state._persist && state._persist.version !== void 0 ? state._persist.version : DEFAULT_VERSION;
    if (inboundVersion === currentVersion) {
      if (debug) console.log("redux-persist: versions match, noop migration");
      return Promise.resolve(state);
    }
    if (inboundVersion > currentVersion) {
      if (true) console.error("redux-persist: downgrading version is not supported");
      return Promise.resolve(state);
    }
    var migrationKeys = Object.keys(migrations).map(function(ver) {
      return parseInt(ver);
    }).filter(function(key) {
      return currentVersion >= key && key > inboundVersion;
    }).sort(function(a, b) {
      return a - b;
    });
    if (debug) console.log("redux-persist: migrationKeys", migrationKeys);
    try {
      var migratedState = migrationKeys.reduce(function(state2, versionKey) {
        if (debug) console.log("redux-persist: running migration for versionKey", versionKey);
        return migrations[versionKey](state2);
      }, state);
      return Promise.resolve(migratedState);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

// node_modules/redux-persist/es/createTransform.js
function createTransform(inbound, outbound) {
  var config = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var whitelist = config.whitelist || null;
  var blacklist = config.blacklist || null;
  function whitelistBlacklistCheck(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return true;
    if (blacklist && blacklist.indexOf(key) !== -1) return true;
    return false;
  }
  return {
    in: function _in(state, key, fullState) {
      return !whitelistBlacklistCheck(key) && inbound ? inbound(state, key, fullState) : state;
    },
    out: function out(state, key, fullState) {
      return !whitelistBlacklistCheck(key) && outbound ? outbound(state, key, fullState) : state;
    }
  };
}
export {
  DEFAULT_VERSION,
  FLUSH,
  KEY_PREFIX,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createMigrate,
  createPersistoid,
  createTransform,
  getStoredState,
  persistCombineReducers,
  persistReducer,
  persistStore,
  purgeStoredState
};
//# sourceMappingURL=redux-persist.js.map
