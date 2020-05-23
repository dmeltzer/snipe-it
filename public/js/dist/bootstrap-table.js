(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = global || self, global.BootstrapTable = factory(global.jQuery));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.0',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol() == 'symbol';

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	if (!useSymbolAsUid) {
	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var v8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return v8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
	  [].filter.call({ length: -1, 0: 1 }, function (it) { throw it; });
	});

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var $findIndex = arrayIteration.findIndex;


	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND_INDEX);

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD$1 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var $map = arrayIteration.map;



	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH$1 = HAS_SPECIES_SUPPORT$1 && !fails(function () {
	  [].map.call({ length: -1, 0: 1 }, function (it) { throw it; });
	});

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var nativeReverse = [].reverse;
	var test = [1, 2];

	// `Array.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
	// fix for Safari 12.0 bug
	// https://bugs.webkit.org/show_bug.cgi?id=188794
	_export({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
	  reverse: function reverse() {
	    // eslint-disable-next-line no-self-assign
	    if (isArray(this)) this.length = this.length;
	    return nativeReverse.call(this);
	  }
	});

	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var test$1 = [];
	var nativeSort = test$1.sort;

	// IE8-
	var FAILS_ON_UNDEFINED = fails(function () {
	  test$1.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails(function () {
	  test$1.sort(null);
	});
	// Old WebKit
	var SLOPPY_METHOD$2 = sloppyArrayMethod('sort');

	var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$2;

	// `Array.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.sort
	_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? nativeSort.call(toObject(this))
	      : nativeSort.call(toObject(this), aFunction$1(comparefn));
	  }
	});

	var max$2 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$3 = objectDefineProperty.f;
	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;

	// Opera ~12 has broken Object#toString
	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

	// `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = it.slice(2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper
	      // check on 1..constructor(foo) case
	      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
	        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };
	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys$1.length > j; j++) {
	    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
	      defineProperty$3(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	var nativeAssign = Object.assign;
	var defineProperty$4 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$4({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$4(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$3 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$3(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$3(false)
	};

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.github.io/ecma262/#sec-object.entries
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test$2 = {};

	test$2[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test$2) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	var trim$1 = stringTrim.trim;


	var nativeParseFloat = global_1.parseFloat;
	var FORCED$2 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity;

	// `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string
	var _parseFloat = FORCED$2 ? function parseFloat(string) {
	  var trimmedString = trim$1(String(string));
	  var result = nativeParseFloat(trimmedString);
	  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
	} : nativeParseFloat;

	// `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string
	_export({ global: true, forced: parseFloat != _parseFloat }, {
	  parseFloat: _parseFloat
	});

	var trim$2 = stringTrim.trim;


	var nativeParseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$3 = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

	// `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix
	var _parseInt = FORCED$3 ? function parseInt(string, radix) {
	  var S = trim$2(String(string));
	  return nativeParseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
	} : nativeParseInt;

	// `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix
	_export({ global: true, forced: parseInt != _parseInt }, {
	  parseInt: _parseInt
	});

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$4(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$4(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var SPECIES$3 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0)) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, { REPLACE_KEEPS_$0: REPLACE_KEEPS_$0 });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var max$3 = Math.max;
	var min$3 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (reason.REPLACE_KEEPS_$0 || (typeof replaceValue === 'string' && replaceValue.indexOf('$0') === -1)) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$3(min$3(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// `SameValue` abstract operation
	// https://tc39.github.io/ecma262/#sec-samevalue
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// @@search logic
	fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible(this);
	      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
	      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative(nativeSearch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regexpExecAbstract(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	var SPECIES$4 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$4 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var forcedStringTrimMethod = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim
	_export({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var $forEach$1 = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  if (CollectionPrototype$1) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype$1[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype$1[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
	    }
	    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
	    return;
	  }

	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	var VERSION = '1.16.0';
	var bootstrapVersion = 4;

	try {
	  var rawVersion = $.fn.dropdown.Constructor.VERSION; // Only try to parse VERSION if it is defined.
	  // It is undefined in older versions of Bootstrap (tested with 3.1.1).

	  if (rawVersion !== undefined) {
	    bootstrapVersion = parseInt(rawVersion, 10);
	  }
	} catch (e) {// ignore
	}

	var CONSTANTS = {
	  3: {
	    iconsPrefix: 'glyphicon',
	    icons: {
	      paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
	      paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
	      refresh: 'glyphicon-refresh icon-refresh',
	      toggleOff: 'glyphicon-list-alt icon-list-alt',
	      toggleOn: 'glyphicon-list-alt icon-list-alt',
	      columns: 'glyphicon-th icon-th',
	      detailOpen: 'glyphicon-plus icon-plus',
	      detailClose: 'glyphicon-minus icon-minus',
	      fullscreen: 'glyphicon-fullscreen',
	      search: 'glyphicon-search',
	      clearSearch: 'glyphicon-trash'
	    },
	    classes: {
	      buttonsPrefix: 'btn',
	      buttons: 'default',
	      buttonsGroup: 'btn-group',
	      buttonsDropdown: 'btn-group',
	      pull: 'pull',
	      inputGroup: 'input-group',
	      inputPrefix: 'input-',
	      input: 'form-control',
	      paginationDropdown: 'btn-group dropdown',
	      dropup: 'dropup',
	      dropdownActive: 'active',
	      paginationActive: 'active',
	      buttonActive: 'active'
	    },
	    html: {
	      toolbarDropdown: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
	      toolbarDropdownItem: '<li class="dropdown-item-marker" role="menuitem"><label>%s</label></li>',
	      toolbarDropdownSeparator: '<li class="divider"></li>',
	      pageDropdown: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
	      pageDropdownItem: '<li role="menuitem" class="%s"><a href="#">%s</a></li>',
	      dropdownCaret: '<span class="caret"></span>',
	      pagination: ['<ul class="pagination%s">', '</ul>'],
	      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
	      icon: '<i class="%s %s"></i>',
	      inputGroup: '<div class="input-group">%s<span class="input-group-btn">%s</span></div>',
	      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
	      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
	      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
	    }
	  },
	  4: {
	    iconsPrefix: 'fa',
	    icons: {
	      paginationSwitchDown: 'fa-caret-square-down',
	      paginationSwitchUp: 'fa-caret-square-up',
	      refresh: 'fa-sync',
	      toggleOff: 'fa-toggle-off',
	      toggleOn: 'fa-toggle-on',
	      columns: 'fa-th-list',
	      detailOpen: 'fa-plus',
	      detailClose: 'fa-minus',
	      fullscreen: 'fa-arrows-alt',
	      search: 'fa-search',
	      clearSearch: 'fa-trash'
	    },
	    classes: {
	      buttonsPrefix: 'btn',
	      buttons: 'secondary',
	      buttonsGroup: 'btn-group',
	      buttonsDropdown: 'btn-group',
	      pull: 'float',
	      inputGroup: 'btn-group',
	      inputPrefix: 'form-control-',
	      input: 'form-control',
	      paginationDropdown: 'btn-group dropdown',
	      dropup: 'dropup',
	      dropdownActive: 'active',
	      paginationActive: 'active',
	      buttonActive: 'active'
	    },
	    html: {
	      toolbarDropdown: ['<div class="dropdown-menu dropdown-menu-right">', '</div>'],
	      toolbarDropdownItem: '<label class="dropdown-item dropdown-item-marker">%s</label>',
	      pageDropdown: ['<div class="dropdown-menu">', '</div>'],
	      pageDropdownItem: '<a class="dropdown-item %s" href="#">%s</a>',
	      toolbarDropdownSeparator: '<div class="dropdown-divider"></div>',
	      dropdownCaret: '<span class="caret"></span>',
	      pagination: ['<ul class="pagination%s">', '</ul>'],
	      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
	      icon: '<i class="%s %s"></i>',
	      inputGroup: '<div class="input-group">%s<div class="input-group-append">%s</div></div>',
	      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
	      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
	      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
	    }
	  }
	}[bootstrapVersion];
	var DEFAULTS = {
	  height: undefined,
	  classes: 'table table-bordered table-hover',
	  theadClasses: '',
	  headerStyle: function headerStyle(column) {
	    return {};
	  },
	  rowStyle: function rowStyle(row, index) {
	    return {};
	  },
	  rowAttributes: function rowAttributes(row, index) {
	    return {};
	  },
	  undefinedText: '-',
	  locale: undefined,
	  virtualScroll: false,
	  virtualScrollItemHeight: undefined,
	  sortable: true,
	  sortClass: undefined,
	  silentSort: true,
	  sortName: undefined,
	  sortOrder: 'asc',
	  sortStable: false,
	  rememberOrder: false,
	  serverSort: true,
	  customSort: undefined,
	  columns: [[]],
	  data: [],
	  url: undefined,
	  method: 'get',
	  cache: true,
	  contentType: 'application/json',
	  dataType: 'json',
	  ajax: undefined,
	  ajaxOptions: {},
	  queryParams: function queryParams(params) {
	    return params;
	  },
	  queryParamsType: 'limit',
	  // 'limit', undefined
	  responseHandler: function responseHandler(res) {
	    return res;
	  },
	  totalField: 'total',
	  totalNotFilteredField: 'totalNotFiltered',
	  dataField: 'rows',
	  pagination: false,
	  onlyInfoPagination: false,
	  showExtendedPagination: false,
	  paginationLoop: true,
	  sidePagination: 'client',
	  // client or server
	  totalRows: 0,
	  totalNotFiltered: 0,
	  pageNumber: 1,
	  pageSize: 10,
	  pageList: [10, 25, 50, 100],
	  paginationHAlign: 'right',
	  // right, left
	  paginationVAlign: 'bottom',
	  // bottom, top, both
	  paginationDetailHAlign: 'left',
	  // right, left
	  paginationPreText: '&lsaquo;',
	  paginationNextText: '&rsaquo;',
	  paginationSuccessivelySize: 5,
	  // Maximum successively number of pages in a row
	  paginationPagesBySide: 1,
	  // Number of pages on each side (right, left) of the current page.
	  paginationUseIntermediate: false,
	  // Calculate intermediate pages for quick access
	  search: false,
	  searchOnEnterKey: false,
	  strictSearch: false,
	  visibleSearch: false,
	  showButtonIcons: true,
	  showButtonText: false,
	  showSearchButton: false,
	  showSearchClearButton: false,
	  trimOnSearch: true,
	  searchAlign: 'right',
	  searchTimeOut: 500,
	  searchText: '',
	  customSearch: undefined,
	  showHeader: true,
	  showFooter: false,
	  footerStyle: function footerStyle(column) {
	    return {};
	  },
	  showColumns: false,
	  showColumnsToggleAll: false,
	  showColumnsSearch: false,
	  minimumCountColumns: 1,
	  showPaginationSwitch: false,
	  showRefresh: false,
	  showToggle: false,
	  showFullscreen: false,
	  smartDisplay: true,
	  escape: false,
	  filterOptions: {
	    filterAlgorithm: 'and'
	  },
	  idField: undefined,
	  selectItemName: 'btSelectItem',
	  clickToSelect: false,
	  ignoreClickToSelectOn: function ignoreClickToSelectOn(_ref) {
	    var tagName = _ref.tagName;
	    return ['A', 'BUTTON'].includes(tagName);
	  },
	  singleSelect: false,
	  checkboxHeader: true,
	  maintainMetaData: false,
	  multipleSelectRow: false,
	  uniqueId: undefined,
	  cardView: false,
	  detailView: false,
	  detailViewIcon: true,
	  detailViewByClick: false,
	  detailFormatter: function detailFormatter(index, row) {
	    return '';
	  },
	  detailFilter: function detailFilter(index, row) {
	    return true;
	  },
	  toolbar: undefined,
	  toolbarAlign: 'left',
	  buttonsToolbar: undefined,
	  buttonsAlign: 'right',
	  buttonsOrder: ['paginationSwitch', 'refresh', 'toggle', 'fullscreen', 'columns'],
	  buttonsPrefix: CONSTANTS.classes.buttonsPrefix,
	  buttonsClass: CONSTANTS.classes.buttons,
	  icons: CONSTANTS.icons,
	  html: CONSTANTS.html,
	  iconSize: undefined,
	  iconsPrefix: CONSTANTS.iconsPrefix,
	  // glyphicon or fa(font-awesome)
	  onAll: function onAll(name, args) {
	    return false;
	  },
	  onClickCell: function onClickCell(field, value, row, $element) {
	    return false;
	  },
	  onDblClickCell: function onDblClickCell(field, value, row, $element) {
	    return false;
	  },
	  onClickRow: function onClickRow(item, $element) {
	    return false;
	  },
	  onDblClickRow: function onDblClickRow(item, $element) {
	    return false;
	  },
	  onSort: function onSort(name, order) {
	    return false;
	  },
	  onCheck: function onCheck(row) {
	    return false;
	  },
	  onUncheck: function onUncheck(row) {
	    return false;
	  },
	  onCheckAll: function onCheckAll(rows) {
	    return false;
	  },
	  onUncheckAll: function onUncheckAll(rows) {
	    return false;
	  },
	  onCheckSome: function onCheckSome(rows) {
	    return false;
	  },
	  onUncheckSome: function onUncheckSome(rows) {
	    return false;
	  },
	  onLoadSuccess: function onLoadSuccess(data) {
	    return false;
	  },
	  onLoadError: function onLoadError(status) {
	    return false;
	  },
	  onColumnSwitch: function onColumnSwitch(field, checked) {
	    return false;
	  },
	  onPageChange: function onPageChange(number, size) {
	    return false;
	  },
	  onSearch: function onSearch(text) {
	    return false;
	  },
	  onToggle: function onToggle(cardView) {
	    return false;
	  },
	  onPreBody: function onPreBody(data) {
	    return false;
	  },
	  onPostBody: function onPostBody() {
	    return false;
	  },
	  onPostHeader: function onPostHeader() {
	    return false;
	  },
	  onPostFooter: function onPostFooter() {
	    return false;
	  },
	  onExpandRow: function onExpandRow(index, row, $detail) {
	    return false;
	  },
	  onCollapseRow: function onCollapseRow(index, row) {
	    return false;
	  },
	  onRefreshOptions: function onRefreshOptions(options) {
	    return false;
	  },
	  onRefresh: function onRefresh(params) {
	    return false;
	  },
	  onResetView: function onResetView() {
	    return false;
	  },
	  onScrollBody: function onScrollBody() {
	    return false;
	  }
	};
	var EN = {
	  formatLoadingMessage: function formatLoadingMessage() {
	    return 'Loading, please wait';
	  },
	  formatRecordsPerPage: function formatRecordsPerPage(pageNumber) {
	    return "".concat(pageNumber, " rows per page");
	  },
	  formatShowingRows: function formatShowingRows(pageFrom, pageTo, totalRows, totalNotFiltered) {
	    if (totalNotFiltered !== undefined && totalNotFiltered > 0 && totalNotFiltered > totalRows) {
	      return "Showing ".concat(pageFrom, " to ").concat(pageTo, " of ").concat(totalRows, " rows (filtered from ").concat(totalNotFiltered, " total rows)");
	    }

	    return "Showing ".concat(pageFrom, " to ").concat(pageTo, " of ").concat(totalRows, " rows");
	  },
	  formatSRPaginationPreText: function formatSRPaginationPreText() {
	    return 'previous page';
	  },
	  formatSRPaginationPageText: function formatSRPaginationPageText(page) {
	    return "to page ".concat(page);
	  },
	  formatSRPaginationNextText: function formatSRPaginationNextText() {
	    return 'next page';
	  },
	  formatDetailPagination: function formatDetailPagination(totalRows) {
	    return "Showing ".concat(totalRows, " rows");
	  },
	  formatSearch: function formatSearch() {
	    return 'Search';
	  },
	  formatClearSearch: function formatClearSearch() {
	    return 'Clear Search';
	  },
	  formatNoMatches: function formatNoMatches() {
	    return 'No matching records found';
	  },
	  formatPaginationSwitch: function formatPaginationSwitch() {
	    return 'Hide/Show pagination';
	  },
	  formatPaginationSwitchDown: function formatPaginationSwitchDown() {
	    return 'Show pagination';
	  },
	  formatPaginationSwitchUp: function formatPaginationSwitchUp() {
	    return 'Hide pagination';
	  },
	  formatRefresh: function formatRefresh() {
	    return 'Refresh';
	  },
	  formatToggle: function formatToggle() {
	    return 'Toggle';
	  },
	  formatToggleOn: function formatToggleOn() {
	    return 'Show card view';
	  },
	  formatToggleOff: function formatToggleOff() {
	    return 'Hide card view';
	  },
	  formatColumns: function formatColumns() {
	    return 'Columns';
	  },
	  formatColumnsToggleAll: function formatColumnsToggleAll() {
	    return 'Toggle all';
	  },
	  formatFullscreen: function formatFullscreen() {
	    return 'Fullscreen';
	  },
	  formatAllRows: function formatAllRows() {
	    return 'All';
	  }
	};
	var COLUMN_DEFAULTS = {
	  field: undefined,
	  title: undefined,
	  titleTooltip: undefined,
	  'class': undefined,
	  width: undefined,
	  widthUnit: 'px',
	  rowspan: undefined,
	  colspan: undefined,
	  align: undefined,
	  // left, right, center
	  halign: undefined,
	  // left, right, center
	  falign: undefined,
	  // left, right, center
	  valign: undefined,
	  // top, middle, bottom
	  cellStyle: undefined,
	  radio: false,
	  checkbox: false,
	  checkboxEnabled: true,
	  clickToSelect: true,
	  showSelectTitle: false,
	  sortable: false,
	  sortName: undefined,
	  order: 'asc',
	  // asc, desc
	  sorter: undefined,
	  visible: true,
	  switchable: true,
	  cardVisible: true,
	  searchable: true,
	  formatter: undefined,
	  footerFormatter: undefined,
	  detailFormatter: undefined,
	  searchFormatter: true,
	  escape: false,
	  events: undefined
	};
	var METHODS = ['getOptions', 'refreshOptions', 'getData', 'getSelections', 'getAllSelections', 'load', 'append', 'prepend', 'remove', 'removeAll', 'insertRow', 'updateRow', 'getRowByUniqueId', 'updateByUniqueId', 'removeByUniqueId', 'updateCell', 'updateCellByUniqueId', 'showRow', 'hideRow', 'getHiddenRows', 'showColumn', 'hideColumn', 'getVisibleColumns', 'getHiddenColumns', 'showAllColumns', 'hideAllColumns', 'mergeCells', 'checkAll', 'uncheckAll', 'checkInvert', 'check', 'uncheck', 'checkBy', 'uncheckBy', 'refresh', 'destroy', 'resetView', 'showLoading', 'hideLoading', 'togglePagination', 'toggleFullscreen', 'toggleView', 'resetSearch', 'filterBy', 'scrollTo', 'getScrollPosition', 'selectPage', 'prevPage', 'nextPage', 'toggleDetailView', 'expandRow', 'collapseRow', 'expandAllRows', 'collapseAllRows', 'updateColumnTitle', 'updateFormatText'];
	var EVENTS = {
	  'all.bs.table': 'onAll',
	  'click-row.bs.table': 'onClickRow',
	  'dbl-click-row.bs.table': 'onDblClickRow',
	  'click-cell.bs.table': 'onClickCell',
	  'dbl-click-cell.bs.table': 'onDblClickCell',
	  'sort.bs.table': 'onSort',
	  'check.bs.table': 'onCheck',
	  'uncheck.bs.table': 'onUncheck',
	  'check-all.bs.table': 'onCheckAll',
	  'uncheck-all.bs.table': 'onUncheckAll',
	  'check-some.bs.table': 'onCheckSome',
	  'uncheck-some.bs.table': 'onUncheckSome',
	  'load-success.bs.table': 'onLoadSuccess',
	  'load-error.bs.table': 'onLoadError',
	  'column-switch.bs.table': 'onColumnSwitch',
	  'page-change.bs.table': 'onPageChange',
	  'search.bs.table': 'onSearch',
	  'toggle.bs.table': 'onToggle',
	  'pre-body.bs.table': 'onPreBody',
	  'post-body.bs.table': 'onPostBody',
	  'post-header.bs.table': 'onPostHeader',
	  'post-footer.bs.table': 'onPostFooter',
	  'expand-row.bs.table': 'onExpandRow',
	  'collapse-row.bs.table': 'onCollapseRow',
	  'refresh-options.bs.table': 'onRefreshOptions',
	  'reset-view.bs.table': 'onResetView',
	  'refresh.bs.table': 'onRefresh',
	  'scroll-body.bs.table': 'onScrollBody'
	};
	Object.assign(DEFAULTS, EN);
	var Constants = {
	  VERSION: VERSION,
	  THEME: "bootstrap".concat(bootstrapVersion),
	  CONSTANTS: CONSTANTS,
	  DEFAULTS: DEFAULTS,
	  COLUMN_DEFAULTS: COLUMN_DEFAULTS,
	  METHODS: METHODS,
	  EVENTS: EVENTS,
	  LOCALES: {
	    en: EN,
	    'en-US': EN
	  }
	};

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var Utils = {
	  // it only does '%s', and return '' when arguments are undefined
	  sprintf: function sprintf(_str) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var flag = true;
	    var i = 0;

	    var str = _str.replace(/%s/g, function () {
	      var arg = args[i++];

	      if (typeof arg === 'undefined') {
	        flag = false;
	        return '';
	      }

	      return arg;
	    });

	    return flag ? str : '';
	  },
	  isEmptyObject: function isEmptyObject() {
	    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    return Object.entries(obj).length === 0 && obj.constructor === Object;
	  },
	  isNumeric: function isNumeric(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	  },
	  getFieldTitle: function getFieldTitle(list, value) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var item = _step.value;

	        if (item.field === value) {
	          return item.title;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return != null) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return '';
	  },
	  setFieldIndex: function setFieldIndex(columns) {
	    var totalCol = 0;
	    var flag = [];
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = columns[0][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var column = _step2.value;
	        totalCol += column.colspan || 1;
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    for (var i = 0; i < columns.length; i++) {
	      flag[i] = [];

	      for (var j = 0; j < totalCol; j++) {
	        flag[i][j] = false;
	      }
	    }

	    for (var _i = 0; _i < columns.length; _i++) {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = columns[_i][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var r = _step3.value;
	          var rowspan = r.rowspan || 1;
	          var colspan = r.colspan || 1;

	          var index = flag[_i].indexOf(false);

	          r.colspanIndex = index;

	          if (colspan === 1) {
	            r.fieldIndex = index; // when field is undefined, use index instead

	            if (typeof r.field === 'undefined') {
	              r.field = index;
	            }
	          } else {
	            r.colspanGroup = r.colspan;
	          }

	          for (var k = 0; k < rowspan; k++) {
	            flag[_i + k][index] = true;
	          }

	          for (var _k = 0; _k < colspan; _k++) {
	            flag[_i][index + _k] = true;
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  },
	  updateFieldGroup: function updateFieldGroup(columns) {
	    var _ref;

	    var allColumns = (_ref = []).concat.apply(_ref, _toConsumableArray(columns));

	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;

	    try {
	      for (var _iterator4 = columns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	        var c = _step4.value;
	        var _iteratorNormalCompletion5 = true;
	        var _didIteratorError5 = false;
	        var _iteratorError5 = undefined;

	        try {
	          for (var _iterator5 = c[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var r = _step5.value;

	            if (r.colspanGroup > 1) {
	              var colspan = 0;

	              var _loop = function _loop(i) {
	                var column = allColumns.find(function (col) {
	                  return col.fieldIndex === i;
	                });

	                if (column.visible) {
	                  colspan++;
	                }
	              };

	              for (var i = r.colspanIndex; i < r.colspanIndex + r.colspanGroup; i++) {
	                _loop(i);
	              }

	              r.colspan = colspan;
	              r.visible = colspan > 0;
	            }
	          }
	        } catch (err) {
	          _didIteratorError5 = true;
	          _iteratorError5 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
	              _iterator5.return();
	            }
	          } finally {
	            if (_didIteratorError5) {
	              throw _iteratorError5;
	            }
	          }
	        }
	      }
	    } catch (err) {
	      _didIteratorError4 = true;
	      _iteratorError4 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
	          _iterator4.return();
	        }
	      } finally {
	        if (_didIteratorError4) {
	          throw _iteratorError4;
	        }
	      }
	    }
	  },
	  getScrollBarWidth: function getScrollBarWidth() {
	    if (this.cachedWidth === undefined) {
	      var $inner = $('<div/>').addClass('fixed-table-scroll-inner');
	      var $outer = $('<div/>').addClass('fixed-table-scroll-outer');
	      $outer.append($inner);
	      $('body').append($outer);
	      var w1 = $inner[0].offsetWidth;
	      $outer.css('overflow', 'scroll');
	      var w2 = $inner[0].offsetWidth;

	      if (w1 === w2) {
	        w2 = $outer[0].clientWidth;
	      }

	      $outer.remove();
	      this.cachedWidth = w1 - w2;
	    }

	    return this.cachedWidth;
	  },
	  calculateObjectValue: function calculateObjectValue(self, name, args, defaultValue) {
	    var func = name;

	    if (typeof name === 'string') {
	      // support obj.func1.func2
	      var names = name.split('.');

	      if (names.length > 1) {
	        func = window;
	        var _iteratorNormalCompletion6 = true;
	        var _didIteratorError6 = false;
	        var _iteratorError6 = undefined;

	        try {
	          for (var _iterator6 = names[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            var f = _step6.value;
	            func = func[f];
	          }
	        } catch (err) {
	          _didIteratorError6 = true;
	          _iteratorError6 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
	              _iterator6.return();
	            }
	          } finally {
	            if (_didIteratorError6) {
	              throw _iteratorError6;
	            }
	          }
	        }
	      } else {
	        func = window[name];
	      }
	    }

	    if (func !== null && _typeof(func) === 'object') {
	      return func;
	    }

	    if (typeof func === 'function') {
	      return func.apply(self, args || []);
	    }

	    if (!func && typeof name === 'string' && this.sprintf.apply(this, [name].concat(_toConsumableArray(args)))) {
	      return this.sprintf.apply(this, [name].concat(_toConsumableArray(args)));
	    }

	    return defaultValue;
	  },
	  compareObjects: function compareObjects(objectA, objectB, compareLength) {
	    var aKeys = Object.keys(objectA);
	    var bKeys = Object.keys(objectB);

	    if (compareLength && aKeys.length !== bKeys.length) {
	      return false;
	    }

	    for (var _i2 = 0, _aKeys = aKeys; _i2 < _aKeys.length; _i2++) {
	      var key = _aKeys[_i2];

	      if (bKeys.includes(key) && objectA[key] !== objectB[key]) {
	        return false;
	      }
	    }

	    return true;
	  },
	  escapeHTML: function escapeHTML(text) {
	    if (typeof text === 'string') {
	      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/`/g, '&#x60;');
	    }

	    return text;
	  },
	  getRealDataAttr: function getRealDataAttr(dataAttr) {
	    for (var _i3 = 0, _Object$entries = Object.entries(dataAttr); _i3 < _Object$entries.length; _i3++) {
	      var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
	          attr = _Object$entries$_i[0],
	          value = _Object$entries$_i[1];

	      var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase();

	      if (auxAttr !== attr) {
	        dataAttr[auxAttr] = value;
	        delete dataAttr[attr];
	      }
	    }

	    return dataAttr;
	  },
	  getItemField: function getItemField(item, field, escape) {
	    var value = item;

	    if (typeof field !== 'string' || item.hasOwnProperty(field)) {
	      return escape ? this.escapeHTML(item[field]) : item[field];
	    }

	    var props = field.split('.');
	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;

	    try {
	      for (var _iterator7 = props[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	        var p = _step7.value;
	        value = value && value[p];
	      }
	    } catch (err) {
	      _didIteratorError7 = true;
	      _iteratorError7 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
	          _iterator7.return();
	        }
	      } finally {
	        if (_didIteratorError7) {
	          throw _iteratorError7;
	        }
	      }
	    }

	    return escape ? this.escapeHTML(value) : value;
	  },
	  isIEBrowser: function isIEBrowser() {
	    return navigator.userAgent.includes('MSIE ') || /Trident.*rv:11\./.test(navigator.userAgent);
	  },
	  findIndex: function findIndex(items, item) {
	    var _iteratorNormalCompletion8 = true;
	    var _didIteratorError8 = false;
	    var _iteratorError8 = undefined;

	    try {
	      for (var _iterator8 = items[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	        var it = _step8.value;

	        if (JSON.stringify(it) === JSON.stringify(item)) {
	          return items.indexOf(it);
	        }
	      }
	    } catch (err) {
	      _didIteratorError8 = true;
	      _iteratorError8 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
	          _iterator8.return();
	        }
	      } finally {
	        if (_didIteratorError8) {
	          throw _iteratorError8;
	        }
	      }
	    }

	    return -1;
	  },
	  trToData: function trToData(columns, $els) {
	    var _this = this;

	    var data = [];
	    var m = [];
	    $els.each(function (y, el) {
	      var row = {}; // save tr's id, class and data-* attributes

	      row._id = $(el).attr('id');
	      row._class = $(el).attr('class');
	      row._data = _this.getRealDataAttr($(el).data());
	      $(el).find('>td,>th').each(function (_x, el) {
	        var cspan = +$(el).attr('colspan') || 1;
	        var rspan = +$(el).attr('rowspan') || 1;
	        var x = _x; // skip already occupied cells in current row

	        for (; m[y] && m[y][x]; x++) {} // ignore
	        // mark matrix elements occupied by current cell with true


	        for (var tx = x; tx < x + cspan; tx++) {
	          for (var ty = y; ty < y + rspan; ty++) {
	            if (!m[ty]) {
	              // fill missing rows
	              m[ty] = [];
	            }

	            m[ty][tx] = true;
	          }
	        }

	        var field = columns[x].field;
	        row[field] = $(el).html().trim(); // save td's id, class and data-* attributes

	        row["_".concat(field, "_id")] = $(el).attr('id');
	        row["_".concat(field, "_class")] = $(el).attr('class');
	        row["_".concat(field, "_rowspan")] = $(el).attr('rowspan');
	        row["_".concat(field, "_colspan")] = $(el).attr('colspan');
	        row["_".concat(field, "_title")] = $(el).attr('title');
	        row["_".concat(field, "_data")] = _this.getRealDataAttr($(el).data());
	      });
	      data.push(row);
	    });
	    return data;
	  },
	  sort: function sort(a, b, order, sortStable, aPosition, bPosition) {
	    if (a === undefined || a === null) {
	      a = '';
	    }

	    if (b === undefined || b === null) {
	      b = '';
	    }

	    if (sortStable && a === b) {
	      a = aPosition;
	      b = bPosition;
	    } // If both values are numeric, do a numeric comparison


	    if (this.isNumeric(a) && this.isNumeric(b)) {
	      // Convert numerical values form string to float.
	      a = parseFloat(a);
	      b = parseFloat(b);

	      if (a < b) {
	        return order * -1;
	      }

	      if (a > b) {
	        return order;
	      }

	      return 0;
	    }

	    if (a === b) {
	      return 0;
	    } // If value is not a string, convert to string


	    if (typeof a !== 'string') {
	      a = a.toString();
	    }

	    if (a.localeCompare(b) === -1) {
	      return order * -1;
	    }

	    return order;
	  },
	  getResizeEventName: function getResizeEventName() {
	    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    id = id || "".concat(+new Date()).concat(~~(Math.random() * 1000000));
	    return "resize.bootstrap-table-".concat(id);
	  }
	};

	var BLOCK_ROWS = 50;
	var CLUSTER_BLOCKS = 4;

	var VirtualScroll =
	/*#__PURE__*/
	function () {
	  function VirtualScroll(options) {
	    var _this = this;

	    _classCallCheck(this, VirtualScroll);

	    this.rows = options.rows;
	    this.scrollEl = options.scrollEl;
	    this.contentEl = options.contentEl;
	    this.callback = options.callback;
	    this.itemHeight = options.itemHeight;
	    this.cache = {};
	    this.scrollTop = this.scrollEl.scrollTop;
	    this.initDOM(this.rows, options.fixedScroll);
	    this.scrollEl.scrollTop = this.scrollTop;
	    this.lastCluster = 0;

	    var onScroll = function onScroll() {
	      if (_this.lastCluster !== (_this.lastCluster = _this.getNum())) {
	        _this.initDOM(_this.rows);

	        _this.callback();
	      }
	    };

	    this.scrollEl.addEventListener('scroll', onScroll, false);

	    this.destroy = function () {
	      _this.contentEl.innerHtml = '';

	      _this.scrollEl.removeEventListener('scroll', onScroll, false);
	    };
	  }

	  _createClass(VirtualScroll, [{
	    key: "initDOM",
	    value: function initDOM(rows, fixedScroll) {
	      if (typeof this.clusterHeight === 'undefined') {
	        this.cache.scrollTop = this.scrollEl.scrollTop;
	        this.cache.data = this.contentEl.innerHTML = rows[0] + rows[0] + rows[0];
	        this.getRowsHeight(rows);
	      }

	      var data = this.initData(rows, this.getNum(fixedScroll));
	      var thisRows = data.rows.join('');
	      var dataChanged = this.checkChanges('data', thisRows);
	      var topOffsetChanged = this.checkChanges('top', data.topOffset);
	      var bottomOffsetChanged = this.checkChanges('bottom', data.bottomOffset);
	      var html = [];

	      if (dataChanged && topOffsetChanged) {
	        if (data.topOffset) {
	          html.push(this.getExtra('top', data.topOffset));
	        }

	        html.push(thisRows);

	        if (data.bottomOffset) {
	          html.push(this.getExtra('bottom', data.bottomOffset));
	        }

	        this.contentEl.innerHTML = html.join('');

	        if (fixedScroll) {
	          this.contentEl.scrollTop = this.cache.scrollTop;
	        }
	      } else if (bottomOffsetChanged) {
	        this.contentEl.lastChild.style.height = "".concat(data.bottomOffset, "px");
	      }
	    }
	  }, {
	    key: "getRowsHeight",
	    value: function getRowsHeight() {
	      if (typeof this.itemHeight === 'undefined') {
	        var nodes = this.contentEl.children;
	        var node = nodes[Math.floor(nodes.length / 2)];
	        this.itemHeight = node.offsetHeight;
	      }

	      this.blockHeight = this.itemHeight * BLOCK_ROWS;
	      this.clusterRows = BLOCK_ROWS * CLUSTER_BLOCKS;
	      this.clusterHeight = this.blockHeight * CLUSTER_BLOCKS;
	    }
	  }, {
	    key: "getNum",
	    value: function getNum(fixedScroll) {
	      this.scrollTop = fixedScroll ? this.cache.scrollTop : this.scrollEl.scrollTop;
	      return Math.floor(this.scrollTop / (this.clusterHeight - this.blockHeight)) || 0;
	    }
	  }, {
	    key: "initData",
	    value: function initData(rows, num) {
	      if (rows.length < BLOCK_ROWS) {
	        return {
	          topOffset: 0,
	          bottomOffset: 0,
	          rowsAbove: 0,
	          rows: rows
	        };
	      }

	      var start = Math.max((this.clusterRows - BLOCK_ROWS) * num, 0);
	      var end = start + this.clusterRows;
	      var topOffset = Math.max(start * this.itemHeight, 0);
	      var bottomOffset = Math.max((rows.length - end) * this.itemHeight, 0);
	      var thisRows = [];
	      var rowsAbove = start;

	      if (topOffset < 1) {
	        rowsAbove++;
	      }

	      for (var i = start; i < end; i++) {
	        rows[i] && thisRows.push(rows[i]);
	      }

	      return {
	        topOffset: topOffset,
	        bottomOffset: bottomOffset,
	        rowsAbove: rowsAbove,
	        rows: thisRows
	      };
	    }
	  }, {
	    key: "checkChanges",
	    value: function checkChanges(type, value) {
	      var changed = value !== this.cache[type];
	      this.cache[type] = value;
	      return changed;
	    }
	  }, {
	    key: "getExtra",
	    value: function getExtra(className, height) {
	      var tag = document.createElement('tr');
	      tag.className = "virtual-scroll-".concat(className);

	      if (height) {
	        tag.style.height = "".concat(height, "px");
	      }

	      return tag.outerHTML;
	    }
	  }]);

	  return VirtualScroll;
	}();

	var BootstrapTable =
	/*#__PURE__*/
	function () {
	  function BootstrapTable(el, options) {
	    _classCallCheck(this, BootstrapTable);

	    this.options = options;
	    this.$el = $(el);
	    this.$el_ = this.$el.clone();
	    this.timeoutId_ = 0;
	    this.timeoutFooter_ = 0;
	    this.init();
	  }

	  _createClass(BootstrapTable, [{
	    key: "init",
	    value: function init() {
	      this.initConstants();
	      this.initLocale();
	      this.initContainer();
	      this.initTable();
	      this.initHeader();
	      this.initData();
	      this.initHiddenRows();
	      this.initToolbar();
	      this.initPagination();
	      this.initBody();
	      this.initSearchText();
	      this.initServer();
	    }
	  }, {
	    key: "initConstants",
	    value: function initConstants() {
	      var opts = this.options;
	      this.constants = Constants.CONSTANTS;
	      this.constants.theme = $.fn.bootstrapTable.theme;
	      var buttonsPrefix = opts.buttonsPrefix ? "".concat(opts.buttonsPrefix, "-") : '';
	      this.constants.buttonsClass = [opts.buttonsPrefix, buttonsPrefix + opts.buttonsClass, Utils.sprintf("".concat(buttonsPrefix, "%s"), opts.iconSize)].join(' ').trim();
	    }
	  }, {
	    key: "initLocale",
	    value: function initLocale() {
	      if (this.options.locale) {
	        var locales = $.fn.bootstrapTable.locales;
	        var parts = this.options.locale.split(/-|_/);
	        parts[0] = parts[0].toLowerCase();

	        if (parts[1]) {
	          parts[1] = parts[1].toUpperCase();
	        }

	        if (locales[this.options.locale]) {
	          $.extend(this.options, locales[this.options.locale]);
	        } else if (locales[parts.join('-')]) {
	          $.extend(this.options, locales[parts.join('-')]);
	        } else if (locales[parts[0]]) {
	          $.extend(this.options, locales[parts[0]]);
	        }
	      }
	    }
	  }, {
	    key: "initContainer",
	    value: function initContainer() {
	      var topPagination = ['top', 'both'].includes(this.options.paginationVAlign) ? '<div class="fixed-table-pagination clearfix"></div>' : '';
	      var bottomPagination = ['bottom', 'both'].includes(this.options.paginationVAlign) ? '<div class="fixed-table-pagination"></div>' : '';
	      this.$container = $("\n      <div class=\"bootstrap-table ".concat(this.constants.theme, "\">\n      <div class=\"fixed-table-toolbar\"></div>\n      ").concat(topPagination, "\n      <div class=\"fixed-table-container\">\n      <div class=\"fixed-table-header\"><table></table></div>\n      <div class=\"fixed-table-body\">\n      <div class=\"fixed-table-loading\">\n      <span class=\"loading-wrap\">\n      <span class=\"loading-text\">").concat(this.options.formatLoadingMessage(), "</span>\n      <span class=\"animation-wrap\"><span class=\"animation-dot\"></span></span>\n      </span>\n      </div>\n      </div>\n      <div class=\"fixed-table-footer\"><table><thead><tr></tr></thead></table></div>\n      </div>\n      ").concat(bottomPagination, "\n      </div>\n    "));
	      this.$container.insertAfter(this.$el);
	      this.$tableContainer = this.$container.find('.fixed-table-container');
	      this.$tableHeader = this.$container.find('.fixed-table-header');
	      this.$tableBody = this.$container.find('.fixed-table-body');
	      this.$tableLoading = this.$container.find('.fixed-table-loading');
	      this.$tableFooter = this.$el.find('tfoot'); // checking if custom table-toolbar exists or not

	      if (this.options.buttonsToolbar) {
	        this.$toolbar = $('body').find(this.options.buttonsToolbar);
	      } else {
	        this.$toolbar = this.$container.find('.fixed-table-toolbar');
	      }

	      this.$pagination = this.$container.find('.fixed-table-pagination');
	      this.$tableBody.append(this.$el);
	      this.$container.after('<div class="clearfix"></div>');
	      this.$el.addClass(this.options.classes);
	      this.$tableLoading.addClass(this.options.classes);

	      if (this.options.height) {
	        this.$tableContainer.addClass('fixed-height');

	        if (this.options.showFooter) {
	          this.$tableContainer.addClass('has-footer');
	        }

	        if (this.options.classes.split(' ').includes('table-bordered')) {
	          this.$tableBody.append('<div class="fixed-table-border"></div>');
	          this.$tableBorder = this.$tableBody.find('.fixed-table-border');
	          this.$tableLoading.addClass('fixed-table-border');
	        }

	        this.$tableFooter = this.$container.find('.fixed-table-footer');
	      }
	    }
	  }, {
	    key: "initTable",
	    value: function initTable() {
	      var _this = this;

	      var columns = [];
	      this.$header = this.$el.find('>thead');

	      if (!this.$header.length) {
	        this.$header = $("<thead class=\"".concat(this.options.theadClasses, "\"></thead>")).appendTo(this.$el);
	      } else if (this.options.theadClasses) {
	        this.$header.addClass(this.options.theadClasses);
	      }

	      this.$header.find('tr').each(function (i, el) {
	        var column = [];
	        $(el).find('th').each(function (i, el) {
	          // #2014: getFieldIndex and elsewhere assume this is string, causes issues if not
	          if (typeof $(el).data('field') !== 'undefined') {
	            $(el).data('field', "".concat($(el).data('field')));
	          }

	          column.push($.extend({}, {
	            title: $(el).html(),
	            'class': $(el).attr('class'),
	            titleTooltip: $(el).attr('title'),
	            rowspan: $(el).attr('rowspan') ? +$(el).attr('rowspan') : undefined,
	            colspan: $(el).attr('colspan') ? +$(el).attr('colspan') : undefined
	          }, $(el).data()));
	        });
	        columns.push(column);
	      });

	      if (!Array.isArray(this.options.columns[0])) {
	        this.options.columns = [this.options.columns];
	      }

	      this.options.columns = $.extend(true, [], columns, this.options.columns);
	      this.columns = [];
	      this.fieldsColumnsIndex = [];
	      Utils.setFieldIndex(this.options.columns);
	      this.options.columns.forEach(function (columns, i) {
	        columns.forEach(function (_column, j) {
	          var column = $.extend({}, BootstrapTable.COLUMN_DEFAULTS, _column);

	          if (typeof column.fieldIndex !== 'undefined') {
	            _this.columns[column.fieldIndex] = column;
	            _this.fieldsColumnsIndex[column.field] = column.fieldIndex;
	          }

	          _this.options.columns[i][j] = column;
	        });
	      }); // if options.data is setting, do not process tbody and tfoot data

	      if (!this.options.data.length) {
	        this.options.data = Utils.trToData(this.columns, this.$el.find('>tbody>tr'));

	        if (this.options.data.length) {
	          this.fromHtml = true;
	        }
	      }

	      this.footerData = Utils.trToData(this.columns, this.$el.find('>tfoot>tr'));

	      if (this.footerData) {
	        this.$el.find('tfoot').html('<tr></tr>');
	      }

	      if (!this.options.showFooter || this.options.cardView) {
	        this.$tableFooter.hide();
	      } else {
	        this.$tableFooter.show();
	      }
	    }
	  }, {
	    key: "initHeader",
	    value: function initHeader() {
	      var _this2 = this;

	      var visibleColumns = {};
	      var html = [];
	      this.header = {
	        fields: [],
	        styles: [],
	        classes: [],
	        formatters: [],
	        detailFormatters: [],
	        events: [],
	        sorters: [],
	        sortNames: [],
	        cellStyles: [],
	        searchables: []
	      };
	      Utils.updateFieldGroup(this.options.columns);
	      this.options.columns.forEach(function (columns, i) {
	        html.push('<tr>');

	        if (i === 0 && !_this2.options.cardView && _this2.options.detailView && _this2.options.detailViewIcon) {
	          html.push("<th class=\"detail\" rowspan=\"".concat(_this2.options.columns.length, "\">\n          <div class=\"fht-cell\"></div>\n          </th>\n        "));
	        }

	        columns.forEach(function (column, j) {
	          var class_ = Utils.sprintf(' class="%s"', column['class']);
	          var unitWidth = column.widthUnit;
	          var width = parseFloat(column.width);
	          var halign = Utils.sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
	          var align = Utils.sprintf('text-align: %s; ', column.align);
	          var style = Utils.sprintf('vertical-align: %s; ', column.valign);
	          style += Utils.sprintf('width: %s; ', (column.checkbox || column.radio) && !width ? !column.showSelectTitle ? '36px' : undefined : width ? width + unitWidth : undefined);

	          if (typeof column.fieldIndex === 'undefined' && !column.visible) {
	            return;
	          }

	          var headerStyle = Utils.calculateObjectValue(null, _this2.options.headerStyle, [column]);
	          var csses = [];
	          var classes = '';

	          if (headerStyle && headerStyle.css) {
	            for (var _i = 0, _Object$entries = Object.entries(headerStyle.css); _i < _Object$entries.length; _i++) {
	              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
	                  key = _Object$entries$_i[0],
	                  value = _Object$entries$_i[1];

	              csses.push("".concat(key, ": ").concat(value));
	            }
	          }

	          if (headerStyle && headerStyle.classes) {
	            classes = Utils.sprintf(' class="%s"', column['class'] ? [column['class'], headerStyle.classes].join(' ') : headerStyle.classes);
	          }

	          if (typeof column.fieldIndex !== 'undefined') {
	            _this2.header.fields[column.fieldIndex] = column.field;
	            _this2.header.styles[column.fieldIndex] = align + style;
	            _this2.header.classes[column.fieldIndex] = class_;
	            _this2.header.formatters[column.fieldIndex] = column.formatter;
	            _this2.header.detailFormatters[column.fieldIndex] = column.detailFormatter;
	            _this2.header.events[column.fieldIndex] = column.events;
	            _this2.header.sorters[column.fieldIndex] = column.sorter;
	            _this2.header.sortNames[column.fieldIndex] = column.sortName;
	            _this2.header.cellStyles[column.fieldIndex] = column.cellStyle;
	            _this2.header.searchables[column.fieldIndex] = column.searchable;

	            if (!column.visible) {
	              return;
	            }

	            if (_this2.options.cardView && !column.cardVisible) {
	              return;
	            }

	            visibleColumns[column.field] = column;
	          }

	          html.push("<th".concat(Utils.sprintf(' title="%s"', column.titleTooltip)), column.checkbox || column.radio ? Utils.sprintf(' class="bs-checkbox %s"', column['class'] || '') : classes || class_, Utils.sprintf(' style="%s"', halign + style + csses.join('; ')), Utils.sprintf(' rowspan="%s"', column.rowspan), Utils.sprintf(' colspan="%s"', column.colspan), Utils.sprintf(' data-field="%s"', column.field), // If `column` is not the first element of `this.options.columns[0]`, then className 'data-not-first-th' should be added.
	          j === 0 && i > 0 ? ' data-not-first-th' : '', '>');
	          html.push(Utils.sprintf('<div class="th-inner %s">', _this2.options.sortable && column.sortable ? 'sortable both' : ''));
	          var text = _this2.options.escape ? Utils.escapeHTML(column.title) : column.title;
	          var title = text;

	          if (column.checkbox) {
	            text = '';

	            if (!_this2.options.singleSelect && _this2.options.checkboxHeader) {
	              text = '<label><input name="btSelectAll" type="checkbox" /><span></span></label>';
	            }

	            _this2.header.stateField = column.field;
	          }

	          if (column.radio) {
	            text = '';
	            _this2.header.stateField = column.field;
	          }

	          if (!text && column.showSelectTitle) {
	            text += title;
	          }

	          html.push(text);
	          html.push('</div>');
	          html.push('<div class="fht-cell"></div>');
	          html.push('</div>');
	          html.push('</th>');
	        });
	        html.push('</tr>');
	      });
	      this.$header.html(html.join(''));
	      this.$header.find('th[data-field]').each(function (i, el) {
	        $(el).data(visibleColumns[$(el).data('field')]);
	      });
	      this.$container.off('click', '.th-inner').on('click', '.th-inner', function (e) {
	        var $this = $(e.currentTarget);

	        if (_this2.options.detailView && !$this.parent().hasClass('bs-checkbox')) {
	          if ($this.closest('.bootstrap-table')[0] !== _this2.$container[0]) {
	            return false;
	          }
	        }

	        if (_this2.options.sortable && $this.parent().data().sortable) {
	          _this2.onSort(e);
	        }
	      });
	      this.$header.children().children().off('keypress').on('keypress', function (e) {
	        if (_this2.options.sortable && $(e.currentTarget).data().sortable) {
	          var code = e.keyCode || e.which;

	          if (code === 13) {
	            // Enter keycode
	            _this2.onSort(e);
	          }
	        }
	      });
	      var resizeEvent = Utils.getResizeEventName(this.$el.attr('id'));
	      $(window).off(resizeEvent);

	      if (!this.options.showHeader || this.options.cardView) {
	        this.$header.hide();
	        this.$tableHeader.hide();
	        this.$tableLoading.css('top', 0);
	      } else {
	        this.$header.show();
	        this.$tableHeader.show();
	        this.$tableLoading.css('top', this.$header.outerHeight() + 1); // Assign the correct sortable arrow

	        this.getCaret();
	        $(window).on(resizeEvent, function () {
	          return _this2.resetView();
	        });
	      }

	      this.$selectAll = this.$header.find('[name="btSelectAll"]');
	      this.$selectAll.off('click').on('click', function (e) {
	        e.stopPropagation();
	        var checked = $(e.currentTarget).prop('checked');

	        _this2[checked ? 'checkAll' : 'uncheckAll']();

	        _this2.updateSelected();
	      });
	    }
	  }, {
	    key: "initData",
	    value: function initData(data, type) {
	      if (type === 'append') {
	        this.options.data = this.options.data.concat(data);
	      } else if (type === 'prepend') {
	        this.options.data = [].concat(data).concat(this.options.data);
	      } else {
	        this.options.data = data || this.options.data;
	      }

	      this.data = this.options.data;

	      if (this.options.sidePagination === 'server') {
	        return;
	      }

	      this.initSort();
	    }
	  }, {
	    key: "initSort",
	    value: function initSort() {
	      var _this3 = this;

	      var name = this.options.sortName;
	      var order = this.options.sortOrder === 'desc' ? -1 : 1;
	      var index = this.header.fields.indexOf(this.options.sortName);
	      var timeoutId = 0;

	      if (index !== -1) {
	        if (this.options.sortStable) {
	          this.data.forEach(function (row, i) {
	            if (!row.hasOwnProperty('_position')) {
	              row._position = i;
	            }
	          });
	        }

	        if (this.options.customSort) {
	          Utils.calculateObjectValue(this.options, this.options.customSort, [this.options.sortName, this.options.sortOrder, this.data]);
	        } else {
	          this.data.sort(function (a, b) {
	            if (_this3.header.sortNames[index]) {
	              name = _this3.header.sortNames[index];
	            }

	            var aa = Utils.getItemField(a, name, _this3.options.escape);
	            var bb = Utils.getItemField(b, name, _this3.options.escape);
	            var value = Utils.calculateObjectValue(_this3.header, _this3.header.sorters[index], [aa, bb, a, b]);

	            if (value !== undefined) {
	              if (_this3.options.sortStable && value === 0) {
	                return order * (a._position - b._position);
	              }

	              return order * value;
	            }

	            return Utils.sort(aa, bb, order, _this3.options.sortStable, a._position, b._position);
	          });
	        }

	        if (this.options.sortClass !== undefined) {
	          clearTimeout(timeoutId);
	          timeoutId = setTimeout(function () {
	            _this3.$el.removeClass(_this3.options.sortClass);

	            var index = _this3.$header.find("[data-field=\"".concat(_this3.options.sortName, "\"]")).index();

	            _this3.$el.find("tr td:nth-child(".concat(index + 1, ")")).addClass(_this3.options.sortClass);
	          }, 250);
	        }
	      }
	    }
	  }, {
	    key: "onSort",
	    value: function onSort(_ref) {
	      var type = _ref.type,
	          currentTarget = _ref.currentTarget;
	      var $this = type === 'keypress' ? $(currentTarget) : $(currentTarget).parent();
	      var $this_ = this.$header.find('th').eq($this.index());
	      this.$header.add(this.$header_).find('span.order').remove();

	      if (this.options.sortName === $this.data('field')) {
	        this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
	      } else {
	        this.options.sortName = $this.data('field');

	        if (this.options.rememberOrder) {
	          this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
	        } else {
	          this.options.sortOrder = this.columns[this.fieldsColumnsIndex[$this.data('field')]].sortOrder || this.columns[this.fieldsColumnsIndex[$this.data('field')]].order;
	        }
	      }

	      this.trigger('sort', this.options.sortName, this.options.sortOrder);
	      $this.add($this_).data('order', this.options.sortOrder); // Assign the correct sortable arrow

	      this.getCaret();

	      if (this.options.sidePagination === 'server' && this.options.serverSort) {
	        this.options.pageNumber = 1;
	        this.initServer(this.options.silentSort);
	        return;
	      }

	      this.initSort();
	      this.initBody();
	    }
	  }, {
	    key: "initToolbar",
	    value: function initToolbar() {
	      var _this4 = this;

	      var opts = this.options;
	      var html = [];
	      var timeoutId = 0;
	      var $keepOpen;
	      var switchableCount = 0;

	      if (this.$toolbar.find('.bs-bars').children().length) {
	        $('body').append($(opts.toolbar));
	      }

	      this.$toolbar.html('');

	      if (typeof opts.toolbar === 'string' || _typeof(opts.toolbar) === 'object') {
	        $(Utils.sprintf('<div class="bs-bars %s-%s"></div>', this.constants.classes.pull, opts.toolbarAlign)).appendTo(this.$toolbar).append($(opts.toolbar));
	      } // showColumns, showToggle, showRefresh


	      html = ["<div class=\"".concat(['columns', "columns-".concat(opts.buttonsAlign), this.constants.classes.buttonsGroup, "".concat(this.constants.classes.pull, "-").concat(opts.buttonsAlign)].join(' '), "\">")];

	      if (typeof opts.icons === 'string') {
	        opts.icons = Utils.calculateObjectValue(null, opts.icons);
	      }

	      var buttonsHtml = {
	        paginationSwitch: "<button class=\"".concat(this.constants.buttonsClass, "\" type=\"button\" name=\"paginationSwitch\"\n        aria-label=\"Pagination Switch\" title=\"").concat(opts.formatPaginationSwitch(), "\">\n        ").concat(opts.showButtonIcons ? Utils.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.paginationSwitchDown) : '', "\n        ").concat(opts.showButtonText ? opts.formatPaginationSwitchUp() : '', "\n        </button>"),
	        refresh: "<button class=\"".concat(this.constants.buttonsClass, "\" type=\"button\" name=\"refresh\"\n        aria-label=\"Refresh\" title=\"").concat(opts.formatRefresh(), "\">\n        ").concat(opts.showButtonIcons ? Utils.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.refresh) : '', "\n        ").concat(opts.showButtonText ? opts.formatRefresh() : '', "\n        </button>"),
	        toggle: "<button class=\"".concat(this.constants.buttonsClass, "\" type=\"button\" name=\"toggle\"\n        aria-label=\"Toggle\" title=\"").concat(opts.formatToggle(), "\">\n        ").concat(opts.showButtonIcons ? Utils.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.toggleOff) : '', "\n        ").concat(opts.showButtonText ? opts.formatToggleOn() : '', "\n        </button>"),
	        fullscreen: "<button class=\"".concat(this.constants.buttonsClass, "\" type=\"button\" name=\"fullscreen\"\n        aria-label=\"Fullscreen\" title=\"").concat(opts.formatFullscreen(), "\">\n        ").concat(opts.showButtonIcons ? Utils.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.fullscreen) : '', "\n        ").concat(opts.showButtonText ? opts.formatFullscreen() : '', "\n        </button>"),
	        columns: function () {
	          var html = [];
	          html.push("<div class=\"keep-open ".concat(_this4.constants.classes.buttonsDropdown, "\" title=\"").concat(opts.formatColumns(), "\">\n          <button class=\"").concat(_this4.constants.buttonsClass, " dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"\n          aria-label=\"Columns\" title=\"").concat(opts.formatColumns(), "\">\n          ").concat(opts.showButtonIcons ? Utils.sprintf(_this4.constants.html.icon, opts.iconsPrefix, opts.icons.columns) : '', "\n          ").concat(opts.showButtonText ? opts.formatColumns() : '', "\n          ").concat(_this4.constants.html.dropdownCaret, "\n          </button>\n          ").concat(_this4.constants.html.toolbarDropdown[0]));

	          if (opts.showColumnsSearch) {
	            html.push(Utils.sprintf(_this4.constants.html.toolbarDropdownItem, Utils.sprintf('<input type="text" class="%s" id="columnsSearch" placeholder="%s" autocomplete="off">', _this4.constants.classes.input, opts.formatSearch())));
	            html.push(_this4.constants.html.toolbarDropdownSeparator);
	          }

	          if (opts.showColumnsToggleAll) {
	            var allFieldsVisible = _this4.getVisibleColumns().length === _this4.columns.filter(function (column) {
	              return !_this4.isSelectionColumn(column);
	            }).length;

	            html.push(Utils.sprintf(_this4.constants.html.toolbarDropdownItem, Utils.sprintf('<input type="checkbox" class="toggle-all" %s> <span>%s</span>', allFieldsVisible ? 'checked="checked"' : '', opts.formatColumnsToggleAll())));
	            html.push(_this4.constants.html.toolbarDropdownSeparator);
	          }

	          var visibleColumns = 0;

	          _this4.columns.forEach(function (column, i) {
	            if (column.visible) {
	              visibleColumns++;
	            }
	          });

	          _this4.columns.forEach(function (column, i) {
	            if (_this4.isSelectionColumn(column)) {
	              return;
	            }

	            if (opts.cardView && !column.cardVisible) {
	              return;
	            }

	            var checked = column.visible ? ' checked="checked"' : '';
	            var disabled = visibleColumns <= _this4.options.minimumCountColumns && checked ? ' disabled="disabled"' : '';

	            if (column.switchable) {
	              html.push(Utils.sprintf(_this4.constants.html.toolbarDropdownItem, Utils.sprintf('<input type="checkbox" data-field="%s" value="%s"%s%s> <span>%s</span>', column.field, i, checked, disabled, column.title)));
	              switchableCount++;
	            }
	          });

	          html.push(_this4.constants.html.toolbarDropdown[1], '</div>');
	          return html.join('');
	        }()
	      };

	      if (typeof opts.buttonsOrder === 'string') {
	        opts.buttonsOrder = opts.buttonsOrder.replace(/\[|\]| |'/g, '').toLowerCase().split(',');
	      }

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = opts.buttonsOrder[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var button = _step.value;

	          if (opts['show' + button.charAt(0).toUpperCase() + button.substring(1)]) {
	            html.push(buttonsHtml[button]);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return != null) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      html.push('</div>'); // Fix #188: this.showToolbar is for extensions

	      if (this.showToolbar || html.length > 2) {
	        this.$toolbar.append(html.join(''));
	      }

	      if (opts.showPaginationSwitch) {
	        this.$toolbar.find('button[name="paginationSwitch"]').off('click').on('click', function () {
	          return _this4.togglePagination();
	        });
	      }

	      if (opts.showFullscreen) {
	        this.$toolbar.find('button[name="fullscreen"]').off('click').on('click', function () {
	          return _this4.toggleFullscreen();
	        });
	      }

	      if (opts.showRefresh) {
	        this.$toolbar.find('button[name="refresh"]').off('click').on('click', function () {
	          return _this4.refresh();
	        });
	      }

	      if (opts.showToggle) {
	        this.$toolbar.find('button[name="toggle"]').off('click').on('click', function () {
	          _this4.toggleView();
	        });
	      }

	      if (opts.showColumns) {
	        $keepOpen = this.$toolbar.find('.keep-open');
	        var $checkboxes = $keepOpen.find('input[type="checkbox"]:not(".toggle-all")');
	        var $toggleAll = $keepOpen.find('input[type="checkbox"].toggle-all');

	        if (switchableCount <= opts.minimumCountColumns) {
	          $keepOpen.find('input').prop('disabled', true);
	        }

	        $keepOpen.find('li, label').off('click').on('click', function (e) {
	          e.stopImmediatePropagation();
	        });
	        $checkboxes.off('click').on('click', function (_ref2) {
	          var currentTarget = _ref2.currentTarget;
	          var $this = $(currentTarget);

	          _this4._toggleColumn($this.val(), $this.prop('checked'), false);

	          _this4.trigger('column-switch', $this.data('field'), $this.prop('checked'));

	          $toggleAll.prop('checked', $checkboxes.filter(':checked').length === _this4.columns.filter(function (column) {
	            return !_this4.isSelectionColumn(column);
	          }).length);
	        });
	        $toggleAll.off('click').on('click', function (_ref3) {
	          var currentTarget = _ref3.currentTarget;

	          _this4._toggleAllColumns($(currentTarget).prop('checked'));
	        });

	        if (opts.showColumnsSearch) {
	          var $columnsSearch = $keepOpen.find('#columnsSearch');
	          var $listItems = $keepOpen.find('.dropdown-item-marker');
	          $columnsSearch.on('keyup paste change', function (_ref4) {
	            var currentTarget = _ref4.currentTarget;
	            var $this = $(currentTarget);
	            var searchValue = $this.val().toLowerCase();
	            $listItems.show();
	            $checkboxes.each(function (i, el) {
	              var $checkbox = $(el);
	              var $listItem = $checkbox.parents('.dropdown-item-marker');
	              var text = $listItem.text().toLowerCase();

	              if (!text.includes(searchValue)) {
	                $listItem.hide();
	              }
	            });
	          });
	        }
	      } // Fix #4516: this.showSearchClearButton is for extensions


	      if (opts.search || this.showSearchClearButton) {
	        html = [];
	        var showSearchButton = Utils.sprintf(this.constants.html.searchButton, this.constants.buttonsClass, opts.formatSearch(), opts.showButtonIcons ? Utils.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.search) : '', opts.showButtonText ? opts.formatSearch() : '');
	        var showSearchClearButton = Utils.sprintf(this.constants.html.searchClearButton, this.constants.buttonsClass, opts.formatClearSearch(), opts.showButtonIcons ? Utils.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.clearSearch) : '', opts.showButtonText ? opts.formatClearSearch() : '');
	        var searchInputHtml = "<input class=\"".concat(this.constants.classes.input, "\n        ").concat(Utils.sprintf(' %s%s', this.constants.classes.inputPrefix, opts.iconSize), "\n        search-input\" type=\"text\" placeholder=\"").concat(opts.formatSearch(), "\" autocomplete=\"off\">");
	        var searchInputFinalHtml = searchInputHtml;

	        if (opts.showSearchButton || opts.showSearchClearButton) {
	          var _buttonsHtml = (opts.showSearchButton ? showSearchButton : '') + (opts.showSearchClearButton ? showSearchClearButton : '');

	          searchInputFinalHtml = opts.search ? Utils.sprintf(this.constants.html.inputGroup, searchInputHtml, _buttonsHtml) : _buttonsHtml;
	        }

	        html.push(Utils.sprintf("\n        <div class=\"".concat(this.constants.classes.pull, "-").concat(opts.searchAlign, " search ").concat(this.constants.classes.inputGroup, "\">\n          %s\n        </div>\n      "), searchInputFinalHtml));
	        this.$toolbar.append(html.join(''));
	        var $searchInput = this.$toolbar.find('.search input');

	        var handleInputEvent = function handleInputEvent() {
	          var eventTriggers = "keyup drop blur ".concat(Utils.isIEBrowser() ? 'mouseup' : '');
	          $searchInput.off(eventTriggers).on(eventTriggers, function (event) {
	            if (opts.searchOnEnterKey && event.keyCode !== 13) {
	              return;
	            }

	            if ([37, 38, 39, 40].includes(event.keyCode)) {
	              return;
	            }

	            clearTimeout(timeoutId); // doesn't matter if it's 0

	            timeoutId = setTimeout(function () {
	              _this4.onSearch({
	                currentTarget: event.currentTarget
	              });
	            }, opts.searchTimeOut);
	          });
	        };

	        if (opts.showSearchButton) {
	          this.$toolbar.find('.search button[name=search]').off('click').on('click', function (event) {
	            clearTimeout(timeoutId); // doesn't matter if it's 0

	            timeoutId = setTimeout(function () {
	              _this4.onSearch({
	                currentTarget: $searchInput
	              });
	            }, opts.searchTimeOut);
	          });

	          if (opts.searchOnEnterKey) {
	            handleInputEvent();
	          }
	        } else {
	          handleInputEvent();
	        }

	        if (opts.showSearchClearButton) {
	          this.$toolbar.find('.search button[name=clearSearch]').click(function () {
	            _this4.resetSearch();
	          });
	        }
	      }
	    }
	  }, {
	    key: "onSearch",
	    value: function onSearch() {
	      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          currentTarget = _ref5.currentTarget,
	          firedByInitSearchText = _ref5.firedByInitSearchText;

	      var overwriteSearchText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      if (currentTarget !== undefined && $(currentTarget).length && overwriteSearchText) {
	        var text = $(currentTarget).val().trim();

	        if (this.options.trimOnSearch && $(currentTarget).val() !== text) {
	          $(currentTarget).val(text);
	        }

	        if (this.searchText === text && text.length > 0) {
	          return;
	        }

	        if ($(currentTarget).hasClass('search-input')) {
	          this.searchText = text;
	          this.options.searchText = text;
	        }
	      }

	      if (!firedByInitSearchText) {
	        this.options.pageNumber = 1;
	      }

	      this.initSearch();

	      if (firedByInitSearchText) {
	        if (this.options.sidePagination === 'client') {
	          this.updatePagination();
	        }
	      } else {
	        this.updatePagination();
	      }

	      this.trigger('search', this.searchText);
	    }
	  }, {
	    key: "initSearch",
	    value: function initSearch() {
	      var _this5 = this;

	      this.filterOptions = this.filterOptions || this.options.filterOptions;

	      if (this.options.sidePagination !== 'server') {
	        if (this.options.customSearch) {
	          this.data = Utils.calculateObjectValue(this.options, this.options.customSearch, [this.options.data, this.searchText, this.filterColumns]);
	          return;
	        }

	        var s = this.searchText && (this.fromHtml ? Utils.escapeHTML(this.searchText) : this.searchText).toLowerCase();
	        var f = Utils.isEmptyObject(this.filterColumns) ? null : this.filterColumns; // Check filter

	        if (typeof this.filterOptions.filterAlgorithm === 'function') {
	          this.data = this.options.data.filter(function (item, i) {
	            return _this5.filterOptions.filterAlgorithm.apply(null, [item, f]);
	          });
	        } else if (typeof this.filterOptions.filterAlgorithm === 'string') {
	          this.data = f ? this.options.data.filter(function (item, i) {
	            var filterAlgorithm = _this5.filterOptions.filterAlgorithm;

	            if (filterAlgorithm === 'and') {
	              for (var key in f) {
	                if (Array.isArray(f[key]) && !f[key].includes(item[key]) || !Array.isArray(f[key]) && item[key] !== f[key]) {
	                  return false;
	                }
	              }
	            } else if (filterAlgorithm === 'or') {
	              var match = false;

	              for (var _key in f) {
	                if (Array.isArray(f[_key]) && f[_key].includes(item[_key]) || !Array.isArray(f[_key]) && item[_key] === f[_key]) {
	                  match = true;
	                }
	              }

	              return match;
	            }

	            return true;
	          }) : this.options.data;
	        }

	        var visibleFields = this.getVisibleFields();
	        this.data = s ? this.data.filter(function (item, i) {
	          for (var j = 0; j < _this5.header.fields.length; j++) {
	            if (!_this5.header.searchables[j] || _this5.options.visibleSearch && visibleFields.indexOf(_this5.header.fields[j]) === -1) {
	              continue;
	            }

	            var key = Utils.isNumeric(_this5.header.fields[j]) ? parseInt(_this5.header.fields[j], 10) : _this5.header.fields[j];
	            var column = _this5.columns[_this5.fieldsColumnsIndex[key]];
	            var value = void 0;

	            if (typeof key === 'string') {
	              value = item;
	              var props = key.split('.');

	              for (var _i2 = 0; _i2 < props.length; _i2++) {
	                if (value[props[_i2]] !== null) {
	                  value = value[props[_i2]];
	                }
	              }
	            } else {
	              value = item[key];
	            } // Fix #142: respect searchFormatter boolean


	            if (column && column.searchFormatter) {
	              value = Utils.calculateObjectValue(column, _this5.header.formatters[j], [value, item, i, column.field], value);
	            }

	            if (typeof value === 'string' || typeof value === 'number') {
	              if (_this5.options.strictSearch) {
	                if ("".concat(value).toLowerCase() === s) {
	                  return true;
	                }
	              } else {
	                var largerSmallerEqualsRegex = /(?:(<=|=>|=<|>=|>|<)(?:\s+)?(\d+)?|(\d+)?(\s+)?(<=|=>|=<|>=|>|<))/gm;
	                var matches = largerSmallerEqualsRegex.exec(s);
	                var comparisonCheck = false;

	                if (matches) {
	                  var operator = matches[1] || "".concat(matches[5], "l");
	                  var comparisonValue = matches[2] || matches[3];
	                  var int = parseInt(value, 10);
	                  var comparisonInt = parseInt(comparisonValue, 10);

	                  switch (operator) {
	                    case '>':
	                    case '<l':
	                      comparisonCheck = int > comparisonInt;
	                      break;

	                    case '<':
	                    case '>l':
	                      comparisonCheck = int < comparisonInt;
	                      break;

	                    case '<=':
	                    case '=<':
	                    case '>=l':
	                    case '=>l':
	                      comparisonCheck = int <= comparisonInt;
	                      break;

	                    case '>=':
	                    case '=>':
	                    case '<=l':
	                    case '=<l':
	                      comparisonCheck = int >= comparisonInt;
	                      break;
	                  }
	                }

	                if (comparisonCheck || "".concat(value).toLowerCase().includes(s)) {
	                  return true;
	                }
	              }
	            }
	          }

	          return false;
	        }) : this.data;
	      }

	      this.initSort();
	    }
	  }, {
	    key: "initPagination",
	    value: function initPagination() {
	      var _this6 = this;

	      var opts = this.options;

	      if (!opts.pagination) {
	        this.$pagination.hide();
	        return;
	      }

	      this.$pagination.show();
	      var html = [];
	      var allSelected = false;
	      var i;
	      var from;
	      var to;
	      var $pageList;
	      var $pre;
	      var $next;
	      var $number;
	      var data = this.getData({
	        includeHiddenRows: false
	      });
	      var pageList = opts.pageList;

	      if (typeof pageList === 'string') {
	        pageList = pageList.replace(/\[|\]| /g, '').toLowerCase().split(',');
	      }

	      pageList = pageList.map(function (value) {
	        if (typeof value === 'string') {
	          return value.toLowerCase() === opts.formatAllRows().toLowerCase() || ['all', 'unlimited'].includes(value.toLowerCase()) ? opts.formatAllRows() : +value;
	        }

	        return value;
	      });

	      if (opts.sidePagination !== 'server') {
	        opts.totalRows = data.length;
	      }

	      this.totalPages = 0;

	      if (opts.totalRows) {
	        if (opts.pageSize === opts.formatAllRows()) {
	          opts.pageSize = opts.totalRows;
	          allSelected = true;
	        }

	        this.totalPages = ~~((opts.totalRows - 1) / opts.pageSize) + 1;
	        opts.totalPages = this.totalPages;
	      }

	      if (this.totalPages > 0 && opts.pageNumber > this.totalPages) {
	        opts.pageNumber = this.totalPages;
	      }

	      this.pageFrom = (opts.pageNumber - 1) * opts.pageSize + 1;
	      this.pageTo = opts.pageNumber * opts.pageSize;

	      if (this.pageTo > opts.totalRows) {
	        this.pageTo = opts.totalRows;
	      }

	      if (this.options.pagination && this.options.sidePagination !== 'server') {
	        this.options.totalNotFiltered = this.options.data.length;
	      }

	      if (!this.options.showExtendedPagination) {
	        this.options.totalNotFiltered = undefined;
	      }

	      var paginationInfo = opts.onlyInfoPagination ? opts.formatDetailPagination(opts.totalRows) : opts.formatShowingRows(this.pageFrom, this.pageTo, opts.totalRows, opts.totalNotFiltered);
	      html.push("<div class=\"".concat(this.constants.classes.pull, "-").concat(opts.paginationDetailHAlign, " pagination-detail\">\n      <span class=\"pagination-info\">\n      ").concat(paginationInfo, "\n      </span>"));

	      if (!opts.onlyInfoPagination) {
	        html.push('<span class="page-list">');
	        var pageNumber = ["<span class=\"".concat(this.constants.classes.paginationDropdown, "\">\n        <button class=\"").concat(this.constants.buttonsClass, " dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n        <span class=\"page-size\">\n        ").concat(allSelected ? opts.formatAllRows() : opts.pageSize, "\n        </span>\n        ").concat(this.constants.html.dropdownCaret, "\n        </button>\n        ").concat(this.constants.html.pageDropdown[0])];
	        pageList.forEach(function (page, i) {
	          if (!opts.smartDisplay || i === 0 || pageList[i - 1] < opts.totalRows) {
	            var active;

	            if (allSelected) {
	              active = page === opts.formatAllRows() ? _this6.constants.classes.dropdownActive : '';
	            } else {
	              active = page === opts.pageSize ? _this6.constants.classes.dropdownActive : '';
	            }

	            pageNumber.push(Utils.sprintf(_this6.constants.html.pageDropdownItem, active, page));
	          }
	        });
	        pageNumber.push("".concat(this.constants.html.pageDropdown[1], "</span>"));
	        html.push(opts.formatRecordsPerPage(pageNumber.join('')));
	        html.push('</span></div>');
	        html.push("<div class=\"".concat(this.constants.classes.pull, "-").concat(opts.paginationHAlign, " pagination\">"), Utils.sprintf(this.constants.html.pagination[0], Utils.sprintf(' pagination-%s', opts.iconSize)), Utils.sprintf(this.constants.html.paginationItem, ' page-pre', opts.formatSRPaginationPreText(), opts.paginationPreText));

	        if (this.totalPages < opts.paginationSuccessivelySize) {
	          from = 1;
	          to = this.totalPages;
	        } else {
	          from = opts.pageNumber - opts.paginationPagesBySide;
	          to = from + opts.paginationPagesBySide * 2;
	        }

	        if (opts.pageNumber < opts.paginationSuccessivelySize - 1) {
	          to = opts.paginationSuccessivelySize;
	        }

	        if (opts.paginationSuccessivelySize > this.totalPages - from) {
	          from = from - (opts.paginationSuccessivelySize - (this.totalPages - from)) + 1;
	        }

	        if (from < 1) {
	          from = 1;
	        }

	        if (to > this.totalPages) {
	          to = this.totalPages;
	        }

	        var middleSize = Math.round(opts.paginationPagesBySide / 2);

	        var pageItem = function pageItem(i) {
	          var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	          return Utils.sprintf(_this6.constants.html.paginationItem, classes + (i === opts.pageNumber ? " ".concat(_this6.constants.classes.paginationActive) : ''), opts.formatSRPaginationPageText(i), i);
	        };

	        if (from > 1) {
	          var max = opts.paginationPagesBySide;
	          if (max >= from) max = from - 1;

	          for (i = 1; i <= max; i++) {
	            html.push(pageItem(i));
	          }

	          if (from - 1 === max + 1) {
	            i = from - 1;
	            html.push(pageItem(i));
	          } else {
	            if (from - 1 > max) {
	              if (from - opts.paginationPagesBySide * 2 > opts.paginationPagesBySide && opts.paginationUseIntermediate) {
	                i = Math.round((from - middleSize) / 2 + middleSize);
	                html.push(pageItem(i, ' page-intermediate'));
	              } else {
	                html.push(Utils.sprintf(this.constants.html.paginationItem, ' page-first-separator disabled', '', '...'));
	              }
	            }
	          }
	        }

	        for (i = from; i <= to; i++) {
	          html.push(pageItem(i));
	        }

	        if (this.totalPages > to) {
	          var min = this.totalPages - (opts.paginationPagesBySide - 1);
	          if (to >= min) min = to + 1;

	          if (to + 1 === min - 1) {
	            i = to + 1;
	            html.push(pageItem(i));
	          } else {
	            if (min > to + 1) {
	              if (this.totalPages - to > opts.paginationPagesBySide * 2 && opts.paginationUseIntermediate) {
	                i = Math.round((this.totalPages - middleSize - to) / 2 + to);
	                html.push(pageItem(i, ' page-intermediate'));
	              } else {
	                html.push(Utils.sprintf(this.constants.html.paginationItem, ' page-last-separator disabled', '', '...'));
	              }
	            }
	          }

	          for (i = min; i <= this.totalPages; i++) {
	            html.push(pageItem(i));
	          }
	        }

	        html.push(Utils.sprintf(this.constants.html.paginationItem, ' page-next', opts.formatSRPaginationNextText(), opts.paginationNextText));
	        html.push(this.constants.html.pagination[1], '</div>');
	      }

	      this.$pagination.html(html.join(''));
	      var dropupClass = ['bottom', 'both'].includes(opts.paginationVAlign) ? " ".concat(this.constants.classes.dropup) : '';
	      this.$pagination.last().find('.page-list > span').addClass(dropupClass);

	      if (!opts.onlyInfoPagination) {
	        $pageList = this.$pagination.find('.page-list a');
	        $pre = this.$pagination.find('.page-pre');
	        $next = this.$pagination.find('.page-next');
	        $number = this.$pagination.find('.page-item').not('.page-next, .page-pre, .page-last-separator, .page-first-separator');

	        if (this.totalPages <= 1) {
	          this.$pagination.find('div.pagination').hide();
	        }

	        if (opts.smartDisplay) {
	          if (pageList.length < 2 || opts.totalRows <= pageList[0]) {
	            this.$pagination.find('span.page-list').hide();
	          }
	        } // when data is empty, hide the pagination


	        this.$pagination[this.getData().length ? 'show' : 'hide']();

	        if (!opts.paginationLoop) {
	          if (opts.pageNumber === 1) {
	            $pre.addClass('disabled');
	          }

	          if (opts.pageNumber === this.totalPages) {
	            $next.addClass('disabled');
	          }
	        }

	        if (allSelected) {
	          opts.pageSize = opts.formatAllRows();
	        } // removed the events for last and first, onPageNumber executeds the same logic


	        $pageList.off('click').on('click', function (e) {
	          return _this6.onPageListChange(e);
	        });
	        $pre.off('click').on('click', function (e) {
	          return _this6.onPagePre(e);
	        });
	        $next.off('click').on('click', function (e) {
	          return _this6.onPageNext(e);
	        });
	        $number.off('click').on('click', function (e) {
	          return _this6.onPageNumber(e);
	        });
	      }
	    }
	  }, {
	    key: "updatePagination",
	    value: function updatePagination(event) {
	      // Fix #171: IE disabled button can be clicked bug.
	      if (event && $(event.currentTarget).hasClass('disabled')) {
	        return;
	      }

	      if (!this.options.maintainMetaData) {
	        this.resetRows();
	      }

	      this.initPagination();

	      if (this.options.sidePagination === 'server') {
	        this.initServer();
	      } else {
	        this.initBody();
	      }

	      this.trigger('page-change', this.options.pageNumber, this.options.pageSize);
	    }
	  }, {
	    key: "onPageListChange",
	    value: function onPageListChange(event) {
	      event.preventDefault();
	      var $this = $(event.currentTarget);
	      $this.parent().addClass(this.constants.classes.dropdownActive).siblings().removeClass(this.constants.classes.dropdownActive);
	      this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +$this.text();
	      this.$toolbar.find('.page-size').text(this.options.pageSize);
	      this.updatePagination(event);
	      return false;
	    }
	  }, {
	    key: "onPagePre",
	    value: function onPagePre(event) {
	      event.preventDefault();

	      if (this.options.pageNumber - 1 === 0) {
	        this.options.pageNumber = this.options.totalPages;
	      } else {
	        this.options.pageNumber--;
	      }

	      this.updatePagination(event);
	      return false;
	    }
	  }, {
	    key: "onPageNext",
	    value: function onPageNext(event) {
	      event.preventDefault();

	      if (this.options.pageNumber + 1 > this.options.totalPages) {
	        this.options.pageNumber = 1;
	      } else {
	        this.options.pageNumber++;
	      }

	      this.updatePagination(event);
	      return false;
	    }
	  }, {
	    key: "onPageNumber",
	    value: function onPageNumber(event) {
	      event.preventDefault();

	      if (this.options.pageNumber === +$(event.currentTarget).text()) {
	        return;
	      }

	      this.options.pageNumber = +$(event.currentTarget).text();
	      this.updatePagination(event);
	      return false;
	    }
	  }, {
	    key: "initRow",
	    value: function initRow(item, i, data, trFragments) {
	      var _this7 = this;

	      var html = [];
	      var style = {};
	      var csses = [];
	      var data_ = '';
	      var attributes = {};
	      var htmlAttributes = [];

	      if (Utils.findIndex(this.hiddenRows, item) > -1) {
	        return;
	      }

	      style = Utils.calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);

	      if (style && style.css) {
	        for (var _i3 = 0, _Object$entries2 = Object.entries(style.css); _i3 < _Object$entries2.length; _i3++) {
	          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
	              key = _Object$entries2$_i[0],
	              value = _Object$entries2$_i[1];

	          csses.push("".concat(key, ": ").concat(value));
	        }
	      }

	      attributes = Utils.calculateObjectValue(this.options, this.options.rowAttributes, [item, i], attributes);

	      if (attributes) {
	        for (var _i4 = 0, _Object$entries3 = Object.entries(attributes); _i4 < _Object$entries3.length; _i4++) {
	          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i4], 2),
	              _key2 = _Object$entries3$_i[0],
	              _value = _Object$entries3$_i[1];

	          htmlAttributes.push("".concat(_key2, "=\"").concat(Utils.escapeHTML(_value), "\""));
	        }
	      }

	      if (item._data && !Utils.isEmptyObject(item._data)) {
	        for (var _i5 = 0, _Object$entries4 = Object.entries(item._data); _i5 < _Object$entries4.length; _i5++) {
	          var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i5], 2),
	              k = _Object$entries4$_i[0],
	              v = _Object$entries4$_i[1];

	          // ignore data-index
	          if (k === 'index') {
	            return;
	          }

	          data_ += " data-".concat(k, "='").concat(_typeof(v) === 'object' ? JSON.stringify(v) : v, "'");
	        }
	      }

	      html.push('<tr', Utils.sprintf(' %s', htmlAttributes.length ? htmlAttributes.join(' ') : undefined), Utils.sprintf(' id="%s"', Array.isArray(item) ? undefined : item._id), Utils.sprintf(' class="%s"', style.classes || (Array.isArray(item) ? undefined : item._class)), " data-index=\"".concat(i, "\""), Utils.sprintf(' data-uniqueid="%s"', Utils.getItemField(item, this.options.uniqueId, false)), Utils.sprintf(' data-has-detail-view="%s"', !this.options.cardView && this.options.detailView && Utils.calculateObjectValue(null, this.options.detailFilter, [i, item]) ? 'true' : undefined), Utils.sprintf('%s', data_), '>');

	      if (this.options.cardView) {
	        html.push("<td colspan=\"".concat(this.header.fields.length, "\"><div class=\"card-views\">"));
	      }

	      if (!this.options.cardView && this.options.detailView && this.options.detailViewIcon) {
	        html.push('<td>');

	        if (Utils.calculateObjectValue(null, this.options.detailFilter, [i, item])) {
	          html.push("\n          <a class=\"detail-icon\" href=\"#\">\n          ".concat(Utils.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen), "\n          </a>\n        "));
	        }

	        html.push('</td>');
	      }

	      this.header.fields.forEach(function (field, j) {
	        var text = '';
	        var value_ = Utils.getItemField(item, field, _this7.options.escape);
	        var value = '';
	        var type = '';
	        var cellStyle = {};
	        var id_ = '';
	        var class_ = _this7.header.classes[j];
	        var style_ = '';
	        var data_ = '';
	        var rowspan_ = '';
	        var colspan_ = '';
	        var title_ = '';
	        var column = _this7.columns[j];

	        if (_this7.fromHtml && typeof value_ === 'undefined') {
	          if (!column.checkbox && !column.radio) {
	            return;
	          }
	        }

	        if (!column.visible) {
	          return;
	        }

	        if (_this7.options.cardView && !column.cardVisible) {
	          return;
	        }

	        if (column.escape) {
	          value_ = Utils.escapeHTML(value_);
	        }

	        if (csses.concat([_this7.header.styles[j]]).length) {
	          style_ = " style=\"".concat(csses.concat([_this7.header.styles[j]]).join('; '), "\"");
	        } // handle td's id and class


	        if (item["_".concat(field, "_id")]) {
	          id_ = Utils.sprintf(' id="%s"', item["_".concat(field, "_id")]);
	        }

	        if (item["_".concat(field, "_class")]) {
	          class_ = Utils.sprintf(' class="%s"', item["_".concat(field, "_class")]);
	        }

	        if (item["_".concat(field, "_rowspan")]) {
	          rowspan_ = Utils.sprintf(' rowspan="%s"', item["_".concat(field, "_rowspan")]);
	        }

	        if (item["_".concat(field, "_colspan")]) {
	          colspan_ = Utils.sprintf(' colspan="%s"', item["_".concat(field, "_colspan")]);
	        }

	        if (item["_".concat(field, "_title")]) {
	          title_ = Utils.sprintf(' title="%s"', item["_".concat(field, "_title")]);
	        }

	        cellStyle = Utils.calculateObjectValue(_this7.header, _this7.header.cellStyles[j], [value_, item, i, field], cellStyle);

	        if (cellStyle.classes) {
	          class_ = " class=\"".concat(cellStyle.classes, "\"");
	        }

	        if (cellStyle.css) {
	          var csses_ = [];

	          for (var _i6 = 0, _Object$entries5 = Object.entries(cellStyle.css); _i6 < _Object$entries5.length; _i6++) {
	            var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i6], 2),
	                _key3 = _Object$entries5$_i[0],
	                _value2 = _Object$entries5$_i[1];

	            csses_.push("".concat(_key3, ": ").concat(_value2));
	          }

	          style_ = " style=\"".concat(csses_.concat(_this7.header.styles[j]).join('; '), "\"");
	        }

	        value = Utils.calculateObjectValue(column, _this7.header.formatters[j], [value_, item, i, field], value_);

	        if (item["_".concat(field, "_data")] && !Utils.isEmptyObject(item["_".concat(field, "_data")])) {
	          for (var _i7 = 0, _Object$entries6 = Object.entries(item["_".concat(field, "_data")]); _i7 < _Object$entries6.length; _i7++) {
	            var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i7], 2),
	                _k = _Object$entries6$_i[0],
	                _v = _Object$entries6$_i[1];

	            // ignore data-index
	            if (_k === 'index') {
	              return;
	            }

	            data_ += " data-".concat(_k, "=\"").concat(_v, "\"");
	          }
	        }

	        if (column.checkbox || column.radio) {
	          type = column.checkbox ? 'checkbox' : type;
	          type = column.radio ? 'radio' : type;
	          var c = column['class'] || '';
	          var isChecked = (value === true || value_ || value && value.checked) && value !== false;
	          var isDisabled = !column.checkboxEnabled || value && value.disabled;
	          text = [_this7.options.cardView ? "<div class=\"card-view ".concat(c, "\">") : "<td class=\"bs-checkbox ".concat(c, "\"").concat(class_).concat(style_, ">"), "<label>\n            <input\n            data-index=\"".concat(i, "\"\n            name=\"").concat(_this7.options.selectItemName, "\"\n            type=\"").concat(type, "\"\n            ").concat(Utils.sprintf('value="%s"', item[_this7.options.idField]), "\n            ").concat(Utils.sprintf('checked="%s"', isChecked ? 'checked' : undefined), "\n            ").concat(Utils.sprintf('disabled="%s"', isDisabled ? 'disabled' : undefined), " />\n            <span></span>\n            </label>"), _this7.header.formatters[j] && typeof value === 'string' ? value : '', _this7.options.cardView ? '</div>' : '</td>'].join('');
	          item[_this7.header.stateField] = value === true || !!value_ || value && value.checked;
	        } else {
	          value = typeof value === 'undefined' || value === null ? _this7.options.undefinedText : value;

	          if (_this7.options.cardView) {
	            var cardTitle = _this7.options.showHeader ? "<span class=\"card-view-title\"".concat(style_, ">").concat(Utils.getFieldTitle(_this7.columns, field), "</span>") : '';
	            text = "<div class=\"card-view\">".concat(cardTitle, "<span class=\"card-view-value\">").concat(value, "</span></div>");

	            if (_this7.options.smartDisplay && value === '') {
	              text = '<div class="card-view"></div>';
	            }
	          } else {
	            text = "<td".concat(id_).concat(class_).concat(style_).concat(data_).concat(rowspan_).concat(colspan_).concat(title_, ">").concat(value, "</td>");
	          }
	        }

	        html.push(text);
	      });

	      if (this.options.cardView) {
	        html.push('</div></td>');
	      }

	      html.push('</tr>');
	      return html.join('');
	    }
	  }, {
	    key: "initBody",
	    value: function initBody(fixedScroll) {
	      var _this8 = this;

	      var data = this.getData();
	      this.trigger('pre-body', data);
	      this.$body = this.$el.find('>tbody');

	      if (!this.$body.length) {
	        this.$body = $('<tbody></tbody>').appendTo(this.$el);
	      } // Fix #389 Bootstrap-table-flatJSON is not working


	      if (!this.options.pagination || this.options.sidePagination === 'server') {
	        this.pageFrom = 1;
	        this.pageTo = data.length;
	      }

	      var rows = [];
	      var trFragments = $(document.createDocumentFragment());
	      var hasTr = false;

	      for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
	        var item = data[i];
	        var tr = this.initRow(item, i, data, trFragments);
	        hasTr = hasTr || !!tr;

	        if (tr && typeof tr === 'string') {
	          if (!this.options.virtualScroll) {
	            trFragments.append(tr);
	          } else {
	            rows.push(tr);
	          }
	        }
	      } // show no records


	      if (!hasTr) {
	        this.$body.html("<tr class=\"no-records-found\">".concat(Utils.sprintf('<td colspan="%s">%s</td>', this.$header.find('th').length, this.options.formatNoMatches()), "</tr>"));
	      } else {
	        if (!this.options.virtualScroll) {
	          this.$body.html(trFragments);
	        } else {
	          if (this.virtualScroll) {
	            this.virtualScroll.destroy();
	          }

	          this.virtualScroll = new VirtualScroll({
	            rows: rows,
	            fixedScroll: fixedScroll,
	            scrollEl: this.$tableBody[0],
	            contentEl: this.$body[0],
	            itemHeight: this.options.virtualScrollItemHeight,
	            callback: function callback() {
	              _this8.fitHeader();

	              _this8.initBodyEvent();
	            }
	          });
	        }
	      }

	      if (!fixedScroll) {
	        this.scrollTo(0);
	      }

	      this.initBodyEvent();
	      this.updateSelected();
	      this.initFooter();
	      this.resetView();

	      if (this.options.sidePagination !== 'server') {
	        this.options.totalRows = data.length;
	      }

	      this.trigger('post-body', data);
	    }
	  }, {
	    key: "initBodyEvent",
	    value: function initBodyEvent() {
	      var _this9 = this;

	      // click to select by column
	      this.$body.find('> tr[data-index] > td').off('click dblclick').on('click dblclick', function (e) {
	        var $td = $(e.currentTarget);
	        var $tr = $td.parent();
	        var $cardViewArr = $(e.target).parents('.card-views').children();
	        var $cardViewTarget = $(e.target).parents('.card-view');
	        var rowIndex = $tr.data('index');
	        var item = _this9.data[rowIndex];
	        var index = _this9.options.cardView ? $cardViewArr.index($cardViewTarget) : $td[0].cellIndex;

	        var fields = _this9.getVisibleFields();

	        var field = fields[_this9.options.detailView && _this9.options.detailViewIcon && !_this9.options.cardView ? index - 1 : index];
	        var column = _this9.columns[_this9.fieldsColumnsIndex[field]];
	        var value = Utils.getItemField(item, field, _this9.options.escape);

	        if ($td.find('.detail-icon').length) {
	          return;
	        }

	        _this9.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item, $td);

	        _this9.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, $tr, field); // if click to select - then trigger the checkbox/radio click


	        if (e.type === 'click' && _this9.options.clickToSelect && column.clickToSelect && !Utils.calculateObjectValue(_this9.options, _this9.options.ignoreClickToSelectOn, [e.target])) {
	          var $selectItem = $tr.find(Utils.sprintf('[name="%s"]', _this9.options.selectItemName));

	          if ($selectItem.length) {
	            $selectItem[0].click();
	          }
	        }

	        if (e.type === 'click' && _this9.options.detailViewByClick) {
	          _this9.toggleDetailView(rowIndex, _this9.header.detailFormatters[_this9.fieldsColumnsIndex[field]]);
	        }
	      }).off('mousedown').on('mousedown', function (e) {
	        // https://github.com/jquery/jquery/issues/1741
	        _this9.multipleSelectRowCtrlKey = e.ctrlKey || e.metaKey;
	        _this9.multipleSelectRowShiftKey = e.shiftKey;
	      });
	      this.$body.find('> tr[data-index] > td > .detail-icon').off('click').on('click', function (e) {
	        e.preventDefault();

	        _this9.toggleDetailView($(e.currentTarget).parent().parent().data('index'));

	        return false;
	      });
	      this.$selectItem = this.$body.find(Utils.sprintf('[name="%s"]', this.options.selectItemName));
	      this.$selectItem.off('click').on('click', function (e) {
	        e.stopImmediatePropagation();
	        var $this = $(e.currentTarget);

	        _this9._toggleCheck($this.prop('checked'), $this.data('index'));
	      });
	      this.header.events.forEach(function (_events, i) {
	        var events = _events;

	        if (!events) {
	          return;
	        } // fix bug, if events is defined with namespace


	        if (typeof events === 'string') {
	          events = Utils.calculateObjectValue(null, events);
	        }

	        var field = _this9.header.fields[i];

	        var fieldIndex = _this9.getVisibleFields().indexOf(field);

	        if (fieldIndex === -1) {
	          return;
	        }

	        if (_this9.options.detailView && !_this9.options.cardView) {
	          fieldIndex += 1;
	        }

	        var _loop = function _loop(key) {
	          if (!events.hasOwnProperty(key)) {
	            return "continue";
	          }

	          var event = events[key];

	          _this9.$body.find('>tr:not(.no-records-found)').each(function (i, tr) {
	            var $tr = $(tr);
	            var $td = $tr.find(_this9.options.cardView ? '.card-views>.card-view' : '>td').eq(fieldIndex);
	            var index = key.indexOf(' ');
	            var name = key.substring(0, index);
	            var el = key.substring(index + 1);
	            $td.find(el).off(name).on(name, function (e) {
	              var index = $tr.data('index');
	              var row = _this9.data[index];
	              var value = row[field];
	              event.apply(_this9, [e, value, row, index]);
	            });
	          });
	        };

	        for (var key in events) {
	          var _ret = _loop(key);

	          if (_ret === "continue") continue;
	        }
	      });
	    }
	  }, {
	    key: "initServer",
	    value: function initServer(silent, query, url) {
	      var _this10 = this;

	      var data = {};
	      var index = this.header.fields.indexOf(this.options.sortName);
	      var params = {
	        searchText: this.searchText,
	        sortName: this.options.sortName,
	        sortOrder: this.options.sortOrder
	      };

	      if (this.header.sortNames[index]) {
	        params.sortName = this.header.sortNames[index];
	      }

	      if (this.options.pagination && this.options.sidePagination === 'server') {
	        params.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
	        params.pageNumber = this.options.pageNumber;
	      }

	      if (!(url || this.options.url) && !this.options.ajax) {
	        return;
	      }

	      if (this.options.queryParamsType === 'limit') {
	        params = {
	          search: params.searchText,
	          sort: params.sortName,
	          order: params.sortOrder
	        };

	        if (this.options.pagination && this.options.sidePagination === 'server') {
	          params.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1);
	          params.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;

	          if (params.limit === 0) {
	            delete params.limit;
	          }
	        }
	      }

	      if (!Utils.isEmptyObject(this.filterColumnsPartial)) {
	        params.filter = JSON.stringify(this.filterColumnsPartial, null);
	      }

	      $.extend(params, query || {});
	      data = Utils.calculateObjectValue(this.options, this.options.queryParams, [params], data); // false to stop request

	      if (data === false) {
	        return;
	      }

	      if (!silent) {
	        this.showLoading();
	      }

	      var request = $.extend({}, Utils.calculateObjectValue(null, this.options.ajaxOptions), {
	        type: this.options.method,
	        url: url || this.options.url,
	        data: this.options.contentType === 'application/json' && this.options.method === 'post' ? JSON.stringify(data) : data,
	        cache: this.options.cache,
	        contentType: this.options.contentType,
	        dataType: this.options.dataType,
	        success: function success(_res, textStatus, jqXHR) {
	          var res = Utils.calculateObjectValue(_this10.options, _this10.options.responseHandler, [_res, jqXHR], _res);

	          _this10.load(res);

	          _this10.trigger('load-success', res, jqXHR && jqXHR.status, jqXHR);

	          if (!silent) {
	            _this10.hideLoading();
	          }

	          if (_this10.options.sidePagination === 'server' && res[_this10.options.totalField] > 0 && !res[_this10.options.dataField].length) {
	            _this10.updatePagination();
	          }
	        },
	        error: function error(jqXHR) {
	          var data = [];

	          if (_this10.options.sidePagination === 'server') {
	            data = {};
	            data[_this10.options.totalField] = 0;
	            data[_this10.options.dataField] = [];
	          }

	          _this10.load(data);

	          _this10.trigger('load-error', jqXHR && jqXHR.status, jqXHR);

	          if (!silent) _this10.$tableLoading.hide();
	        }
	      });

	      if (this.options.ajax) {
	        Utils.calculateObjectValue(this, this.options.ajax, [request], null);
	      } else {
	        if (this._xhr && this._xhr.readyState !== 4) {
	          this._xhr.abort();
	        }

	        this._xhr = $.ajax(request);
	      }

	      return data;
	    }
	  }, {
	    key: "initSearchText",
	    value: function initSearchText() {
	      if (this.options.search) {
	        this.searchText = '';

	        if (this.options.searchText !== '') {
	          var $search = this.$toolbar.find('.search input');
	          $search.val(this.options.searchText);
	          this.onSearch({
	            currentTarget: $search,
	            firedByInitSearchText: true
	          });
	        }
	      }
	    }
	  }, {
	    key: "getCaret",
	    value: function getCaret() {
	      var _this11 = this;

	      this.$header.find('th').each(function (i, th) {
	        $(th).find('.sortable').removeClass('desc asc').addClass($(th).data('field') === _this11.options.sortName ? _this11.options.sortOrder : 'both');
	      });
	    }
	  }, {
	    key: "updateSelected",
	    value: function updateSelected() {
	      var checkAll = this.$selectItem.filter(':enabled').length && this.$selectItem.filter(':enabled').length === this.$selectItem.filter(':enabled').filter(':checked').length;
	      this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);
	      this.$selectItem.each(function (i, el) {
	        $(el).closest('tr')[$(el).prop('checked') ? 'addClass' : 'removeClass']('selected');
	      });
	    }
	  }, {
	    key: "updateRows",
	    value: function updateRows() {
	      var _this12 = this;

	      this.$selectItem.each(function (i, el) {
	        _this12.data[$(el).data('index')][_this12.header.stateField] = $(el).prop('checked');
	      });
	    }
	  }, {
	    key: "resetRows",
	    value: function resetRows() {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var row = _step2.value;
	          this.$selectAll.prop('checked', false);
	          this.$selectItem.prop('checked', false);

	          if (this.header.stateField) {
	            row[this.header.stateField] = false;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      this.initHiddenRows();
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(_name) {
	      var _this$options;

	      var name = "".concat(_name, ".bs.table");

	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key4 = 1; _key4 < _len; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      (_this$options = this.options)[BootstrapTable.EVENTS[name]].apply(_this$options, args);

	      this.$el.trigger($.Event(name), args);
	      this.options.onAll(name, args);
	      this.$el.trigger($.Event('all.bs.table'), [name, args]);
	    }
	  }, {
	    key: "resetHeader",
	    value: function resetHeader() {
	      var _this13 = this;

	      // fix #61: the hidden table reset header bug.
	      // fix bug: get $el.css('width') error sometime (height = 500)
	      clearTimeout(this.timeoutId_);
	      this.timeoutId_ = setTimeout(function () {
	        return _this13.fitHeader();
	      }, this.$el.is(':hidden') ? 100 : 0);
	    }
	  }, {
	    key: "fitHeader",
	    value: function fitHeader() {
	      var _this14 = this;

	      if (this.$el.is(':hidden')) {
	        this.timeoutId_ = setTimeout(function () {
	          return _this14.fitHeader();
	        }, 100);
	        return;
	      }

	      var fixedBody = this.$tableBody.get(0);
	      var scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? Utils.getScrollBarWidth() : 0;
	      this.$el.css('margin-top', -this.$header.outerHeight());
	      var focused = $(':focus');

	      if (focused.length > 0) {
	        var $th = focused.parents('th');

	        if ($th.length > 0) {
	          var dataField = $th.attr('data-field');

	          if (dataField !== undefined) {
	            var $headerTh = this.$header.find("[data-field='".concat(dataField, "']"));

	            if ($headerTh.length > 0) {
	              $headerTh.find(':input').addClass('focus-temp');
	            }
	          }
	        }
	      }

	      this.$header_ = this.$header.clone(true, true);
	      this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
	      this.$tableHeader.css('margin-right', scrollWidth).find('table').css('width', this.$el.outerWidth()).html('').attr('class', this.$el.attr('class')).append(this.$header_);
	      this.$tableLoading.css('width', this.$el.outerWidth());
	      var focusedTemp = $('.focus-temp:visible:eq(0)');

	      if (focusedTemp.length > 0) {
	        focusedTemp.focus();
	        this.$header.find('.focus-temp').removeClass('focus-temp');
	      } // fix bug: $.data() is not working as expected after $.append()


	      this.$header.find('th[data-field]').each(function (i, el) {
	        _this14.$header_.find(Utils.sprintf('th[data-field="%s"]', $(el).data('field'))).data($(el).data());
	      });
	      var visibleFields = this.getVisibleFields();
	      var $ths = this.$header_.find('th');
	      var $tr = this.$body.find('>tr:not(.no-records-found,.virtual-scroll-top)').eq(0);

	      while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
	        $tr = $tr.next();
	      }

	      $tr.find('> *').each(function (i, el) {
	        var $this = $(el);
	        var index = i;

	        if (_this14.options.detailView && _this14.options.detailViewIcon && !_this14.options.cardView) {
	          if (i === 0) {
	            var $thDetail = $ths.filter('.detail');

	            var _zoomWidth = $thDetail.innerWidth() - $thDetail.find('.fht-cell').width();

	            $thDetail.find('.fht-cell').width($this.innerWidth() - _zoomWidth);
	          }

	          index = i - 1;
	        }

	        if (index === -1) {
	          return;
	        }

	        var $th = _this14.$header_.find(Utils.sprintf('th[data-field="%s"]', visibleFields[index]));

	        if ($th.length > 1) {
	          $th = $($ths[$this[0].cellIndex]);
	        }

	        var zoomWidth = $th.innerWidth() - $th.find('.fht-cell').width();
	        $th.find('.fht-cell').width($this.innerWidth() - zoomWidth);
	      });
	      this.horizontalScroll();
	      this.trigger('post-header');
	    }
	  }, {
	    key: "initFooter",
	    value: function initFooter() {
	      if (!this.options.showFooter || this.options.cardView) {
	        // do nothing
	        return;
	      }

	      var data = this.getData();
	      var html = [];

	      if (!this.options.cardView && this.options.detailView && this.options.detailViewIcon) {
	        html.push('<th class="detail"><div class="th-inner"></div><div class="fht-cell"></div></th>');
	      }

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var column = _step3.value;
	          var falign = '';
	          var valign = '';
	          var csses = [];
	          var style = {};
	          var class_ = Utils.sprintf(' class="%s"', column['class']);

	          if (!column.visible) {
	            continue;
	          }

	          if (this.options.cardView && !column.cardVisible) {
	            return;
	          }

	          falign = Utils.sprintf('text-align: %s; ', column.falign ? column.falign : column.align);
	          valign = Utils.sprintf('vertical-align: %s; ', column.valign);
	          style = Utils.calculateObjectValue(null, this.options.footerStyle, [column]);

	          if (style && style.css) {
	            for (var _i8 = 0, _Object$entries7 = Object.entries(style.css); _i8 < _Object$entries7.length; _i8++) {
	              var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i8], 2),
	                  key = _Object$entries7$_i[0],
	                  value = _Object$entries7$_i[1];

	              csses.push("".concat(key, ": ").concat(value));
	            }
	          }

	          if (style && style.classes) {
	            class_ = Utils.sprintf(' class="%s"', column['class'] ? [column['class'], style.classes].join(' ') : style.classes);
	          }

	          html.push('<th', class_, Utils.sprintf(' style="%s"', falign + valign + csses.concat().join('; ')), '>');
	          html.push('<div class="th-inner">');
	          html.push(Utils.calculateObjectValue(column, column.footerFormatter, [data], this.footerData[0] && this.footerData[0][column.field] || ''));
	          html.push('</div>');
	          html.push('<div class="fht-cell"></div>');
	          html.push('</div>');
	          html.push('</th>');
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      if (!this.options.height && !this.$tableFooter.length) {
	        this.$el.append('<tfoot><tr></tr></tfoot>');
	        this.$tableFooter = this.$el.find('tfoot');
	      }

	      this.$tableFooter.find('tr').html(html.join(''));
	      this.trigger('post-footer', this.$tableFooter);
	    }
	  }, {
	    key: "fitFooter",
	    value: function fitFooter() {
	      var _this15 = this;

	      if (this.$el.is(':hidden')) {
	        setTimeout(function () {
	          return _this15.fitFooter();
	        }, 100);
	        return;
	      }

	      var fixedBody = this.$tableBody.get(0);
	      var scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? Utils.getScrollBarWidth() : 0;
	      this.$tableFooter.css('margin-right', scrollWidth).find('table').css('width', this.$el.outerWidth()).attr('class', this.$el.attr('class'));
	      var visibleFields = this.getVisibleFields();
	      var $ths = this.$tableFooter.find('th');
	      var $tr = this.$body.find('>tr:first-child:not(.no-records-found)');

	      while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
	        $tr = $tr.next();
	      }

	      $tr.find('> *').each(function (i, el) {
	        var $this = $(el);
	        var index = i;

	        if (_this15.options.detailView && !_this15.options.cardView) {
	          if (i === 0) {
	            var $thDetail = $ths.filter('.detail');

	            var _zoomWidth2 = $thDetail.innerWidth() - $thDetail.find('.fht-cell').width();

	            $thDetail.find('.fht-cell').width($this.innerWidth() - _zoomWidth2);
	          }

	          index = i - 1;
	        }

	        if (index === -1) {
	          return;
	        }

	        var $th = $ths.eq(i);
	        var zoomWidth = $th.innerWidth() - $th.find('.fht-cell').width();
	        $th.find('.fht-cell').width($this.innerWidth() - zoomWidth);
	      });
	      this.horizontalScroll();
	    }
	  }, {
	    key: "horizontalScroll",
	    value: function horizontalScroll() {
	      var _this16 = this;

	      // horizontal scroll event
	      // TODO: it's probably better improving the layout than binding to scroll event
	      this.$tableBody.off('scroll').on('scroll', function () {
	        var scrollLeft = _this16.$tableBody.scrollLeft();

	        if (_this16.options.showHeader && _this16.options.height) {
	          _this16.$tableHeader.scrollLeft(scrollLeft);
	        }

	        if (_this16.options.showFooter && !_this16.options.cardView) {
	          _this16.$tableFooter.scrollLeft(scrollLeft);
	        }

	        _this16.trigger('scroll-body', _this16.$tableBody);
	      });
	    }
	  }, {
	    key: "getVisibleFields",
	    value: function getVisibleFields() {
	      var visibleFields = [];
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = this.header.fields[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var field = _step4.value;
	          var column = this.columns[this.fieldsColumnsIndex[field]];

	          if (!column || !column.visible) {
	            continue;
	          }

	          visibleFields.push(field);
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }

	      return visibleFields;
	    }
	  }, {
	    key: "initHiddenRows",
	    value: function initHiddenRows() {
	      this.hiddenRows = [];
	    } // PUBLIC FUNCTION DEFINITION
	    // =======================

	  }, {
	    key: "getOptions",
	    value: function getOptions() {
	      // deep copy and remove data
	      var options = $.extend({}, this.options);
	      delete options.data;
	      return $.extend(true, {}, options);
	    }
	  }, {
	    key: "refreshOptions",
	    value: function refreshOptions(options) {
	      // If the objects are equivalent then avoid the call of destroy / init methods
	      if (Utils.compareObjects(this.options, options, true)) {
	        return;
	      }

	      this.options = $.extend(this.options, options);
	      this.trigger('refresh-options', this.options);
	      this.destroy();
	      this.init();
	    }
	  }, {
	    key: "getData",
	    value: function getData(params) {
	      var data = this.options.data;

	      if ((this.searchText || this.options.customSearch || this.options.sortName || !Utils.isEmptyObject(this.filterColumns) || !Utils.isEmptyObject(this.filterColumnsPartial)) && (!params || !params.unfiltered)) {
	        data = this.data;
	      }

	      if (params && params.useCurrentPage) {
	        data = data.slice(this.pageFrom - 1, this.pageTo);
	      }

	      if (params && !params.includeHiddenRows) {
	        var hiddenRows = this.getHiddenRows();
	        data = data.filter(function (row) {
	          return Utils.findIndex(hiddenRows, row) === -1;
	        });
	      }

	      return data;
	    }
	  }, {
	    key: "getSelections",
	    value: function getSelections() {
	      var _this17 = this;

	      // fix #2424: from html with checkbox
	      return this.data.filter(function (row) {
	        return row[_this17.header.stateField] === true;
	      });
	    }
	  }, {
	    key: "getAllSelections",
	    value: function getAllSelections() {
	      var _this18 = this;

	      return this.options.data.filter(function (row) {
	        return row[_this18.header.stateField] === true;
	      });
	    }
	  }, {
	    key: "load",
	    value: function load(_data) {
	      var fixedScroll = false;
	      var data = _data; // #431: support pagination

	      if (this.options.pagination && this.options.sidePagination === 'server') {
	        this.options.totalRows = data[this.options.totalField];
	      }

	      if (this.options.pagination && this.options.sidePagination === 'server') {
	        this.options.totalNotFiltered = data[this.options.totalNotFilteredField];
	      }

	      fixedScroll = data.fixedScroll;
	      data = Array.isArray(data) ? data : data[this.options.dataField];
	      this.initData(data);
	      this.initSearch();
	      this.initPagination();
	      this.initBody(fixedScroll);
	    }
	  }, {
	    key: "append",
	    value: function append(data) {
	      this.initData(data, 'append');
	      this.initSearch();
	      this.initPagination();
	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "prepend",
	    value: function prepend(data) {
	      this.initData(data, 'prepend');
	      this.initSearch();
	      this.initPagination();
	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "remove",
	    value: function remove(params) {
	      var len = this.options.data.length;
	      var i;
	      var row;

	      if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
	        return;
	      }

	      for (i = len - 1; i >= 0; i--) {
	        row = this.options.data[i];

	        if (!row.hasOwnProperty(params.field)) {
	          continue;
	        }

	        if (params.values.includes(row[params.field])) {
	          this.options.data.splice(i, 1);

	          if (this.options.sidePagination === 'server') {
	            this.options.totalRows -= 1;
	          }
	        }
	      }

	      if (len === this.options.data.length) {
	        return;
	      }

	      this.initSearch();
	      this.initPagination();
	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "removeAll",
	    value: function removeAll() {
	      if (this.options.data.length > 0) {
	        this.options.data.splice(0, this.options.data.length);
	        this.initSearch();
	        this.initPagination();
	        this.initBody(true);
	      }
	    }
	  }, {
	    key: "insertRow",
	    value: function insertRow(params) {
	      if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
	        return;
	      }

	      this.options.data.splice(params.index, 0, params.row);
	      this.initSearch();
	      this.initPagination();
	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "updateRow",
	    value: function updateRow(params) {
	      var allParams = Array.isArray(params) ? params : [params];
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = allParams[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var _params = _step5.value;

	          if (!_params.hasOwnProperty('index') || !_params.hasOwnProperty('row')) {
	            continue;
	          }

	          $.extend(this.options.data[_params.index], _params.row);

	          if (_params.hasOwnProperty('replace') && _params.replace) {
	            this.options.data[_params.index] = _params.row;
	          } else {
	            $.extend(this.options.data[_params.index], _params.row);
	          }
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }

	      this.initSearch();
	      this.initPagination();
	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "getRowByUniqueId",
	    value: function getRowByUniqueId(_id) {
	      var uniqueId = this.options.uniqueId;
	      var len = this.options.data.length;
	      var id = _id;
	      var dataRow = null;
	      var i;
	      var row;
	      var rowUniqueId;

	      for (i = len - 1; i >= 0; i--) {
	        row = this.options.data[i];

	        if (row.hasOwnProperty(uniqueId)) {
	          // uniqueId is a column
	          rowUniqueId = row[uniqueId];
	        } else if (row._data && row._data.hasOwnProperty(uniqueId)) {
	          // uniqueId is a row data property
	          rowUniqueId = row._data[uniqueId];
	        } else {
	          continue;
	        }

	        if (typeof rowUniqueId === 'string') {
	          id = id.toString();
	        } else if (typeof rowUniqueId === 'number') {
	          if (Number(rowUniqueId) === rowUniqueId && rowUniqueId % 1 === 0) {
	            id = parseInt(id);
	          } else if (rowUniqueId === Number(rowUniqueId) && rowUniqueId !== 0) {
	            id = parseFloat(id);
	          }
	        }

	        if (rowUniqueId === id) {
	          dataRow = row;
	          break;
	        }
	      }

	      return dataRow;
	    }
	  }, {
	    key: "updateByUniqueId",
	    value: function updateByUniqueId(params) {
	      var allParams = Array.isArray(params) ? params : [params];
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = allParams[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var _params2 = _step6.value;

	          if (!_params2.hasOwnProperty('id') || !_params2.hasOwnProperty('row')) {
	            continue;
	          }

	          var rowId = this.options.data.indexOf(this.getRowByUniqueId(_params2.id));

	          if (rowId === -1) {
	            continue;
	          }

	          if (_params2.hasOwnProperty('replace') && _params2.replace) {
	            this.options.data[rowId] = _params2.row;
	          } else {
	            $.extend(this.options.data[rowId], _params2.row);
	          }
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }

	      this.initSearch();
	      this.initPagination();
	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "removeByUniqueId",
	    value: function removeByUniqueId(id) {
	      var len = this.options.data.length;
	      var row = this.getRowByUniqueId(id);

	      if (row) {
	        this.options.data.splice(this.options.data.indexOf(row), 1);
	      }

	      if (len === this.options.data.length) {
	        return;
	      }

	      this.initSearch();
	      this.initPagination();
	      this.initBody(true);
	    }
	  }, {
	    key: "updateCell",
	    value: function updateCell(params) {
	      if (!params.hasOwnProperty('index') || !params.hasOwnProperty('field') || !params.hasOwnProperty('value')) {
	        return;
	      }

	      this.data[params.index][params.field] = params.value;

	      if (params.reinit === false) {
	        return;
	      }

	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "updateCellByUniqueId",
	    value: function updateCellByUniqueId(params) {
	      var _this19 = this;

	      if (!params.hasOwnProperty('id') || !params.hasOwnProperty('field') || !params.hasOwnProperty('value')) {
	        return;
	      }

	      var allParams = Array.isArray(params) ? params : [params];
	      allParams.forEach(function (_ref6) {
	        var id = _ref6.id,
	            field = _ref6.field,
	            value = _ref6.value;

	        var rowId = _this19.options.data.indexOf(_this19.getRowByUniqueId(id));

	        if (rowId === -1) {
	          return;
	        }

	        _this19.options.data[rowId][field] = value;
	      });

	      if (params.reinit === false) {
	        return;
	      }

	      this.initSort();
	      this.initBody(true);
	    }
	  }, {
	    key: "showRow",
	    value: function showRow(params) {
	      this._toggleRow(params, true);
	    }
	  }, {
	    key: "hideRow",
	    value: function hideRow(params) {
	      this._toggleRow(params, false);
	    }
	  }, {
	    key: "_toggleRow",
	    value: function _toggleRow(params, visible) {
	      var row;

	      if (params.hasOwnProperty('index')) {
	        row = this.getData()[params.index];
	      } else if (params.hasOwnProperty('uniqueId')) {
	        row = this.getRowByUniqueId(params.uniqueId);
	      }

	      if (!row) {
	        return;
	      }

	      var index = Utils.findIndex(this.hiddenRows, row);

	      if (!visible && index === -1) {
	        this.hiddenRows.push(row);
	      } else if (visible && index > -1) {
	        this.hiddenRows.splice(index, 1);
	      }

	      if (visible) {
	        this.updatePagination();
	      } else {
	        this.initBody(true);
	        this.initPagination();
	      }
	    }
	  }, {
	    key: "getHiddenRows",
	    value: function getHiddenRows(show) {
	      if (show) {
	        this.initHiddenRows();
	        this.initBody(true);
	        return;
	      }

	      var data = this.getData();
	      var rows = [];
	      var _iteratorNormalCompletion7 = true;
	      var _didIteratorError7 = false;
	      var _iteratorError7 = undefined;

	      try {
	        for (var _iterator7 = data[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	          var row = _step7.value;

	          if (this.hiddenRows.includes(row)) {
	            rows.push(row);
	          }
	        }
	      } catch (err) {
	        _didIteratorError7 = true;
	        _iteratorError7 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
	            _iterator7.return();
	          }
	        } finally {
	          if (_didIteratorError7) {
	            throw _iteratorError7;
	          }
	        }
	      }

	      this.hiddenRows = rows;
	      return rows;
	    }
	  }, {
	    key: "showColumn",
	    value: function showColumn(field) {
	      var _this20 = this;

	      var fields = Array.isArray(field) ? field : [field];
	      fields.forEach(function (field) {
	        _this20._toggleColumn(_this20.fieldsColumnsIndex[field], true, true);
	      });
	    }
	  }, {
	    key: "hideColumn",
	    value: function hideColumn(field) {
	      var _this21 = this;

	      var fields = Array.isArray(field) ? field : [field];
	      fields.forEach(function (field) {
	        _this21._toggleColumn(_this21.fieldsColumnsIndex[field], false, true);
	      });
	    }
	  }, {
	    key: "_toggleColumn",
	    value: function _toggleColumn(index, checked, needUpdate) {
	      if (index === -1 || this.columns[index].visible === checked) {
	        return;
	      }

	      this.columns[index].visible = checked;
	      this.initHeader();
	      this.initSearch();
	      this.initPagination();
	      this.initBody();

	      if (this.options.showColumns) {
	        var $items = this.$toolbar.find('.keep-open input:not(".toggle-all")').prop('disabled', false);

	        if (needUpdate) {
	          $items.filter(Utils.sprintf('[value="%s"]', index)).prop('checked', checked);
	        }

	        if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
	          $items.filter(':checked').prop('disabled', true);
	        }
	      }
	    }
	  }, {
	    key: "getVisibleColumns",
	    value: function getVisibleColumns() {
	      var _this22 = this;

	      return this.columns.filter(function (column) {
	        return column.visible && !_this22.isSelectionColumn(column);
	      });
	    }
	  }, {
	    key: "getHiddenColumns",
	    value: function getHiddenColumns() {
	      return this.columns.filter(function (_ref7) {
	        var visible = _ref7.visible;
	        return !visible;
	      });
	    }
	  }, {
	    key: "isSelectionColumn",
	    value: function isSelectionColumn(column) {
	      return column.radio || column.checkbox;
	    }
	  }, {
	    key: "showAllColumns",
	    value: function showAllColumns() {
	      this._toggleAllColumns(true);
	    }
	  }, {
	    key: "hideAllColumns",
	    value: function hideAllColumns() {
	      this._toggleAllColumns(false);
	    }
	  }, {
	    key: "_toggleAllColumns",
	    value: function _toggleAllColumns(visible) {
	      var _this23 = this;

	      var _iteratorNormalCompletion8 = true;
	      var _didIteratorError8 = false;
	      var _iteratorError8 = undefined;

	      try {
	        for (var _iterator8 = this.columns.slice().reverse()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	          var column = _step8.value;

	          if (column.switchable) {
	            if (!visible && this.options.showColumns && this.getVisibleColumns().length === this.options.minimumCountColumns) {
	              continue;
	            }

	            column.visible = visible;
	          }
	        }
	      } catch (err) {
	        _didIteratorError8 = true;
	        _iteratorError8 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
	            _iterator8.return();
	          }
	        } finally {
	          if (_didIteratorError8) {
	            throw _iteratorError8;
	          }
	        }
	      }

	      this.initHeader();
	      this.initSearch();
	      this.initPagination();
	      this.initBody();

	      if (this.options.showColumns) {
	        var $items = this.$toolbar.find('.keep-open input[type="checkbox"]:not(".toggle-all")').prop('disabled', false);

	        if (visible) {
	          $items.prop('checked', visible);
	        } else {
	          $items.get().reverse().forEach(function (item) {
	            if ($items.filter(':checked').length > _this23.options.minimumCountColumns) {
	              $(item).prop('checked', visible);
	            }
	          });
	        }

	        if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
	          $items.filter(':checked').prop('disabled', true);
	        }
	      }
	    }
	  }, {
	    key: "mergeCells",
	    value: function mergeCells(options) {
	      var row = options.index;
	      var col = this.getVisibleFields().indexOf(options.field);
	      var rowspan = options.rowspan || 1;
	      var colspan = options.colspan || 1;
	      var i;
	      var j;
	      var $tr = this.$body.find('>tr');

	      if (this.options.detailView && !this.options.cardView) {
	        col += 1;
	      }

	      var $td = $tr.eq(row).find('>td').eq(col);

	      if (row < 0 || col < 0 || row >= this.data.length) {
	        return;
	      }

	      for (i = row; i < row + rowspan; i++) {
	        for (j = col; j < col + colspan; j++) {
	          $tr.eq(i).find('>td').eq(j).hide();
	        }
	      }

	      $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
	    }
	  }, {
	    key: "checkAll",
	    value: function checkAll() {
	      this._toggleCheckAll(true);
	    }
	  }, {
	    key: "uncheckAll",
	    value: function uncheckAll() {
	      this._toggleCheckAll(false);
	    }
	  }, {
	    key: "_toggleCheckAll",
	    value: function _toggleCheckAll(checked) {
	      var rowsBefore = this.getSelections();
	      this.$selectAll.add(this.$selectAll_).prop('checked', checked);
	      this.$selectItem.filter(':enabled').prop('checked', checked);
	      this.updateRows();
	      var rowsAfter = this.getSelections();

	      if (checked) {
	        this.trigger('check-all', rowsAfter, rowsBefore);
	        return;
	      }

	      this.trigger('uncheck-all', rowsAfter, rowsBefore);
	    }
	  }, {
	    key: "checkInvert",
	    value: function checkInvert() {
	      var $items = this.$selectItem.filter(':enabled');
	      var checked = $items.filter(':checked');
	      $items.each(function (i, el) {
	        $(el).prop('checked', !$(el).prop('checked'));
	      });
	      this.updateRows();
	      this.updateSelected();
	      this.trigger('uncheck-some', checked);
	      checked = this.getSelections();
	      this.trigger('check-some', checked);
	    }
	  }, {
	    key: "check",
	    value: function check(index) {
	      this._toggleCheck(true, index);
	    }
	  }, {
	    key: "uncheck",
	    value: function uncheck(index) {
	      this._toggleCheck(false, index);
	    }
	  }, {
	    key: "_toggleCheck",
	    value: function _toggleCheck(checked, index) {
	      var $el = this.$selectItem.filter("[data-index=\"".concat(index, "\"]"));
	      var row = this.data[index];

	      if ($el.is(':radio') || this.options.singleSelect || this.options.multipleSelectRow && !this.multipleSelectRowCtrlKey && !this.multipleSelectRowShiftKey) {
	        var _iteratorNormalCompletion9 = true;
	        var _didIteratorError9 = false;
	        var _iteratorError9 = undefined;

	        try {
	          for (var _iterator9 = this.options.data[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	            var r = _step9.value;
	            r[this.header.stateField] = false;
	          }
	        } catch (err) {
	          _didIteratorError9 = true;
	          _iteratorError9 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
	              _iterator9.return();
	            }
	          } finally {
	            if (_didIteratorError9) {
	              throw _iteratorError9;
	            }
	          }
	        }

	        this.$selectItem.filter(':checked').not($el).prop('checked', false);
	      }

	      row[this.header.stateField] = checked;

	      if (this.options.multipleSelectRow) {
	        if (this.multipleSelectRowShiftKey && this.multipleSelectRowLastSelectedIndex >= 0) {
	          var indexes = [this.multipleSelectRowLastSelectedIndex, index].sort();

	          for (var i = indexes[0] + 1; i < indexes[1]; i++) {
	            this.data[i][this.header.stateField] = true;
	            this.$selectItem.filter("[data-index=\"".concat(i, "\"]")).prop('checked', true);
	          }
	        }

	        this.multipleSelectRowCtrlKey = false;
	        this.multipleSelectRowShiftKey = false;
	        this.multipleSelectRowLastSelectedIndex = checked ? index : -1;
	      }

	      $el.prop('checked', checked);
	      this.updateSelected();
	      this.trigger(checked ? 'check' : 'uncheck', this.data[index], $el);
	    }
	  }, {
	    key: "checkBy",
	    value: function checkBy(obj) {
	      this._toggleCheckBy(true, obj);
	    }
	  }, {
	    key: "uncheckBy",
	    value: function uncheckBy(obj) {
	      this._toggleCheckBy(false, obj);
	    }
	  }, {
	    key: "_toggleCheckBy",
	    value: function _toggleCheckBy(checked, obj) {
	      var _this24 = this;

	      if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
	        return;
	      }

	      var rows = [];
	      this.data.forEach(function (row, i) {
	        if (!row.hasOwnProperty(obj.field)) {
	          return false;
	        }

	        if (obj.values.includes(row[obj.field])) {
	          var $el = _this24.$selectItem.filter(':enabled').filter(Utils.sprintf('[data-index="%s"]', i));

	          $el = checked ? $el.not(':checked') : $el.filter(':checked');

	          if (!$el.length) {
	            return;
	          }

	          $el.prop('checked', checked);
	          row[_this24.header.stateField] = checked;
	          rows.push(row);

	          _this24.trigger(checked ? 'check' : 'uncheck', row, $el);
	        }
	      });
	      this.updateSelected();
	      this.trigger(checked ? 'check-some' : 'uncheck-some', rows);
	    }
	  }, {
	    key: "refresh",
	    value: function refresh(params) {
	      if (params && params.url) {
	        this.options.url = params.url;
	      }

	      if (params && params.pageNumber) {
	        this.options.pageNumber = params.pageNumber;
	      }

	      if (params && params.pageSize) {
	        this.options.pageSize = params.pageSize;
	      }

	      this.trigger('refresh', this.initServer(params && params.silent, params && params.query, params && params.url));
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.$el.insertBefore(this.$container);
	      $(this.options.toolbar).insertBefore(this.$el);
	      this.$container.next().remove();
	      this.$container.remove();
	      this.$el.html(this.$el_.html()).css('margin-top', '0').attr('class', this.$el_.attr('class') || ''); // reset the class
	    }
	  }, {
	    key: "resetView",
	    value: function resetView(params) {
	      var padding = 0;

	      if (params && params.height) {
	        this.options.height = params.height;
	      }

	      this.$selectAll.prop('checked', this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(':checked').length);
	      this.$tableContainer.toggleClass('has-card-view', this.options.cardView);

	      if (!this.options.cardView && this.options.showHeader && this.options.height) {
	        this.$tableHeader.show();
	        this.resetHeader();
	        padding += this.$header.outerHeight(true) + 1;
	      } else {
	        this.$tableHeader.hide();
	        this.trigger('post-header');
	      }

	      if (!this.options.cardView && this.options.showFooter) {
	        this.$tableFooter.show();
	        this.fitFooter();

	        if (this.options.height) {
	          padding += this.$tableFooter.outerHeight(true);
	        }
	      }

	      if (this.$container.hasClass('fullscreen')) {
	        this.$tableContainer.css('height', '');
	        this.$tableContainer.css('width', '');
	      } else if (this.options.height) {
	        var toolbarHeight = this.$toolbar.outerHeight(true);
	        var paginationHeight = this.$pagination.outerHeight(true);
	        var height = this.options.height - toolbarHeight - paginationHeight;
	        var $bodyTable = this.$tableBody.find('>table');
	        var tableHeight = $bodyTable.outerHeight();
	        this.$tableContainer.css('height', "".concat(height, "px"));

	        if (this.$tableBorder) {
	          var tableBorderHeight = height - tableHeight - 2;

	          if (this.$tableBody[0].scrollWidth - this.$tableBody.innerWidth()) {
	            tableBorderHeight -= Utils.getScrollBarWidth();
	          }

	          this.$tableBorder.css('width', "".concat($bodyTable.outerWidth(), "px"));
	          this.$tableBorder.css('height', "".concat(tableBorderHeight, "px"));
	        }
	      }

	      if (this.options.cardView) {
	        // remove the element css
	        this.$el.css('margin-top', '0');
	        this.$tableContainer.css('padding-bottom', '0');
	        this.$tableFooter.hide();
	      } else {
	        // Assign the correct sortable arrow
	        this.getCaret();
	        this.$tableContainer.css('padding-bottom', "".concat(padding, "px"));
	      }

	      this.trigger('reset-view');
	    }
	  }, {
	    key: "showLoading",
	    value: function showLoading() {
	      this.$tableLoading.css('display', 'flex');
	    }
	  }, {
	    key: "hideLoading",
	    value: function hideLoading() {
	      this.$tableLoading.css('display', 'none');
	    }
	  }, {
	    key: "togglePagination",
	    value: function togglePagination() {
	      this.options.pagination = !this.options.pagination;
	      var icon = this.options.showButtonIcons ? this.options.pagination ? this.options.icons.paginationSwitchDown : this.options.icons.paginationSwitchUp : '';
	      var text = this.options.showButtonText ? this.options.pagination ? this.options.formatPaginationSwitchUp() : this.options.formatPaginationSwitchDown() : '';
	      this.$toolbar.find('button[name="paginationSwitch"]').html(Utils.sprintf(this.constants.html.icon, this.options.iconsPrefix, icon) + ' ' + text);
	      this.updatePagination();
	    }
	  }, {
	    key: "toggleFullscreen",
	    value: function toggleFullscreen() {
	      this.$el.closest('.bootstrap-table').toggleClass('fullscreen');
	      this.resetView();
	    }
	  }, {
	    key: "toggleView",
	    value: function toggleView() {
	      this.options.cardView = !this.options.cardView;
	      this.initHeader();
	      var icon = this.options.showButtonIcons ? this.options.cardView ? this.options.icons.toggleOn : this.options.icons.toggleOff : '';
	      var text = this.options.showButtonText ? this.options.cardView ? this.options.formatToggleOff() : this.options.formatToggleOn() : '';
	      this.$toolbar.find('button[name="toggle"]').html(Utils.sprintf(this.constants.html.icon, this.options.iconsPrefix, icon) + ' ' + text);
	      this.initBody();
	      this.trigger('toggle', this.options.cardView);
	    }
	  }, {
	    key: "resetSearch",
	    value: function resetSearch(text) {
	      var $search = this.$toolbar.find('.search input');
	      $search.val(text || '');
	      this.onSearch({
	        currentTarget: $search
	      });
	    }
	  }, {
	    key: "filterBy",
	    value: function filterBy(columns, options) {
	      this.filterOptions = Utils.isEmptyObject(options) ? this.options.filterOptions : $.extend(this.options.filterOptions, options);
	      this.filterColumns = Utils.isEmptyObject(columns) ? {} : columns;
	      this.options.pageNumber = 1;
	      this.initSearch();
	      this.updatePagination();
	    }
	  }, {
	    key: "scrollTo",
	    value: function scrollTo(params) {
	      if (typeof params === 'undefined') {
	        return this.$tableBody.scrollTop();
	      }

	      var options = {
	        unit: 'px',
	        value: 0
	      };

	      if (_typeof(params) === 'object') {
	        options = Object.assign(options, params);
	      } else if (typeof params === 'string' && params === 'bottom') {
	        options.value = this.$tableBody[0].scrollHeight;
	      } else if (typeof params === 'string') {
	        options.value = params;
	      }

	      var scrollTo = options.value;

	      if (options.unit === 'rows') {
	        scrollTo = 0;
	        this.$body.find("> tr:lt(".concat(options.value, ")")).each(function (i, el) {
	          scrollTo += $(el).outerHeight(true);
	        });
	      }

	      this.$tableBody.scrollTop(scrollTo);
	    }
	  }, {
	    key: "getScrollPosition",
	    value: function getScrollPosition() {
	      return this.scrollTo();
	    }
	  }, {
	    key: "selectPage",
	    value: function selectPage(page) {
	      if (page > 0 && page <= this.options.totalPages) {
	        this.options.pageNumber = page;
	        this.updatePagination();
	      }
	    }
	  }, {
	    key: "prevPage",
	    value: function prevPage() {
	      if (this.options.pageNumber > 1) {
	        this.options.pageNumber--;
	        this.updatePagination();
	      }
	    }
	  }, {
	    key: "nextPage",
	    value: function nextPage() {
	      if (this.options.pageNumber < this.options.totalPages) {
	        this.options.pageNumber++;
	        this.updatePagination();
	      }
	    }
	  }, {
	    key: "toggleDetailView",
	    value: function toggleDetailView(index, _columnDetailFormatter) {
	      var $tr = this.$body.find(Utils.sprintf('> tr[data-index="%s"]', index));

	      if ($tr.next().is('tr.detail-view')) {
	        this.collapseRow(index);
	      } else {
	        this.expandRow(index, _columnDetailFormatter);
	      }

	      this.resetView();
	    }
	  }, {
	    key: "expandRow",
	    value: function expandRow(index, _columnDetailFormatter) {
	      var row = this.data[index];
	      var $tr = this.$body.find(Utils.sprintf('> tr[data-index="%s"][data-has-detail-view]', index));

	      if ($tr.next().is('tr.detail-view')) {
	        return;
	      }

	      if (this.options.detailViewIcon) {
	        $tr.find('a.detail-icon').html(Utils.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailClose));
	      }

	      $tr.after(Utils.sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.children('td').length));
	      var $element = $tr.next().find('td');
	      var detailFormatter = _columnDetailFormatter || this.options.detailFormatter;
	      var content = Utils.calculateObjectValue(this.options, detailFormatter, [index, row, $element], '');

	      if ($element.length === 1) {
	        $element.append(content);
	      }

	      this.trigger('expand-row', index, row, $element);
	    }
	  }, {
	    key: "collapseRow",
	    value: function collapseRow(index) {
	      var row = this.data[index];
	      var $tr = this.$body.find(Utils.sprintf('> tr[data-index="%s"][data-has-detail-view]', index));

	      if (!$tr.next().is('tr.detail-view')) {
	        return;
	      }

	      if (this.options.detailViewIcon) {
	        $tr.find('a.detail-icon').html(Utils.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen));
	      }

	      this.trigger('collapse-row', index, row, $tr.next());
	      $tr.next().remove();
	    }
	  }, {
	    key: "expandAllRows",
	    value: function expandAllRows() {
	      var trs = this.$body.find('> tr[data-index][data-has-detail-view]');

	      for (var i = 0; i < trs.length; i++) {
	        this.expandRow($(trs[i]).data('index'));
	      }
	    }
	  }, {
	    key: "collapseAllRows",
	    value: function collapseAllRows() {
	      var trs = this.$body.find('> tr[data-index][data-has-detail-view]');

	      for (var i = 0; i < trs.length; i++) {
	        this.collapseRow($(trs[i]).data('index'));
	      }
	    }
	  }, {
	    key: "updateColumnTitle",
	    value: function updateColumnTitle(params) {
	      if (!params.hasOwnProperty('field') || !params.hasOwnProperty('title')) {
	        return;
	      }

	      this.columns[this.fieldsColumnsIndex[params.field]].title = this.options.escape ? Utils.escapeHTML(params.title) : params.title;

	      if (this.columns[this.fieldsColumnsIndex[params.field]].visible) {
	        var header = this.options.height !== undefined ? this.$tableHeader : this.$header;
	        header.find('th[data-field]').each(function (i, el) {
	          if ($(el).data('field') === params.field) {
	            $($(el).find('.th-inner')[0]).text(params.title);
	            return false;
	          }
	        });
	      }
	    }
	  }, {
	    key: "updateFormatText",
	    value: function updateFormatText(formatName, text) {
	      if (!/^format/.test(formatName) || !this.options[formatName]) {
	        return;
	      }

	      if (typeof text === 'string') {
	        this.options[formatName] = function () {
	          return text;
	        };
	      } else if (typeof text === 'function') {
	        this.options[formatName] = text;
	      }

	      this.initToolbar();
	      this.initPagination();
	      this.initBody();
	    }
	  }]);

	  return BootstrapTable;
	}();

	BootstrapTable.VERSION = Constants.VERSION;
	BootstrapTable.DEFAULTS = Constants.DEFAULTS;
	BootstrapTable.LOCALES = Constants.LOCALES;
	BootstrapTable.COLUMN_DEFAULTS = Constants.COLUMN_DEFAULTS;
	BootstrapTable.METHODS = Constants.METHODS;
	BootstrapTable.EVENTS = Constants.EVENTS; // BOOTSTRAP TABLE PLUGIN DEFINITION
	// =======================

	$.BootstrapTable = BootstrapTable;

	$.fn.bootstrapTable = function (option) {
	  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key5 = 1; _key5 < _len2; _key5++) {
	    args[_key5 - 1] = arguments[_key5];
	  }

	  var value;
	  this.each(function (i, el) {
	    var data = $(el).data('bootstrap.table');
	    var options = $.extend({}, BootstrapTable.DEFAULTS, $(el).data(), _typeof(option) === 'object' && option);

	    if (typeof option === 'string') {
	      var _data2;

	      if (!Constants.METHODS.includes(option)) {
	        throw new Error("Unknown method: ".concat(option));
	      }

	      if (!data) {
	        return;
	      }

	      value = (_data2 = data)[option].apply(_data2, args);

	      if (option === 'destroy') {
	        $(el).removeData('bootstrap.table');
	      }
	    }

	    if (!data) {
	      $(el).data('bootstrap.table', data = new $.BootstrapTable(el, options));
	    }
	  });
	  return typeof value === 'undefined' ? this : value;
	};

	$.fn.bootstrapTable.Constructor = BootstrapTable;
	$.fn.bootstrapTable.theme = Constants.THEME;
	$.fn.bootstrapTable.VERSION = Constants.VERSION;
	$.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
	$.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
	$.fn.bootstrapTable.events = BootstrapTable.EVENTS;
	$.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
	$.fn.bootstrapTable.methods = BootstrapTable.METHODS;
	$.fn.bootstrapTable.utils = Utils; // BOOTSTRAP TABLE INIT
	// =======================

	$(function () {
	  $('[data-toggle="table"]').bootstrapTable();
	});

	return BootstrapTable;

})));

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = global || self, factory(global.jQuery));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.0',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol() == 'symbol';

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	if (!useSymbolAsUid) {
	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var v8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return v8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var $map = arrayIteration.map;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
	  [].map.call({ length: -1, 0: 1 }, function (it) { throw it; });
	});

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var SPECIES$3 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0)) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, { REPLACE_KEEPS_$0: REPLACE_KEEPS_$0 });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var max$2 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (reason.REPLACE_KEEPS_$0 || (typeof replaceValue === 'string' && replaceValue.indexOf('$0') === -1)) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$2(min$2(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var SPECIES$4 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var $forEach$1 = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  if (CollectionPrototype$1) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype$1[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype$1[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
	    }
	    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	/**
	 * @author zhixin wen <wenzhixin2010@gmail.com>
	 * extensions: https://github.com/hhurz/tableExport.jquery.plugin
	 */

	var Utils = $.fn.bootstrapTable.utils;
	var TYPE_NAME = {
	  json: 'JSON',
	  xml: 'XML',
	  png: 'PNG',
	  csv: 'CSV',
	  txt: 'TXT',
	  sql: 'SQL',
	  doc: 'MS-Word',
	  excel: 'MS-Excel',
	  xlsx: 'MS-Excel (OpenXML)',
	  powerpoint: 'MS-Powerpoint',
	  pdf: 'PDF'
	};
	$.extend($.fn.bootstrapTable.defaults, {
	  showExport: false,
	  exportDataType: 'basic',
	  // basic, all, selected
	  exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel'],
	  exportOptions: {
	    onCellHtmlData: function onCellHtmlData(cell, rowIndex, colIndex, htmlData) {
	      if (cell.is('th')) {
	        return cell.find('.th-inner').text();
	      }

	      return htmlData;
	    }
	  },
	  exportFooter: false
	});
	$.extend($.fn.bootstrapTable.columnDefaults, {
	  forceExport: false
	});
	$.extend($.fn.bootstrapTable.defaults.icons, {
	  export: {
	    bootstrap3: 'glyphicon-export icon-share',
	    materialize: 'file_download'
	  }[$.fn.bootstrapTable.theme] || 'fa-download'
	});
	$.extend($.fn.bootstrapTable.locales, {
	  formatExport: function formatExport() {
	    return 'Export data';
	  }
	});
	$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);
	$.fn.bootstrapTable.methods.push('exportTable');
	$.extend($.fn.bootstrapTable.defaults, {
	  onExportSaved: function onExportSaved(exportedRows) {
	    return false;
	  }
	});
	$.extend($.fn.bootstrapTable.Constructor.EVENTS, {
	  'export-saved.bs.table': 'onExportSaved'
	});

	$.BootstrapTable =
	/*#__PURE__*/
	function (_$$BootstrapTable) {
	  _inherits(_class, _$$BootstrapTable);

	  function _class() {
	    _classCallCheck(this, _class);

	    return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
	  }

	  _createClass(_class, [{
	    key: "initToolbar",
	    value: function initToolbar() {
	      var _get2,
	          _this = this;

	      var o = this.options;
	      this.showToolbar = this.showToolbar || o.showExport;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      (_get2 = _get(_getPrototypeOf(_class.prototype), "initToolbar", this)).call.apply(_get2, [this].concat(args));

	      if (!this.options.showExport) {
	        return;
	      }

	      var $btnGroup = this.$toolbar.find('>.columns');
	      this.$export = $btnGroup.find('div.export');

	      if (this.$export.length) {
	        this.updateExportButton();
	        return;
	      }

	      var $menu = $(this.constants.html.toolbarDropdown.join(''));
	      var exportTypes = o.exportTypes;

	      if (typeof exportTypes === 'string') {
	        var types = exportTypes.slice(1, -1).replace(/ /g, '').split(',');
	        exportTypes = types.map(function (t) {
	          return t.slice(1, -1);
	        });
	      }

	      this.$export = $(exportTypes.length === 1 ? "\n      <div class=\"export ".concat(this.constants.classes.buttonsDropdown, "\"\n      data-type=\"").concat(exportTypes[0], "\">\n      <button class=\"").concat(this.constants.buttonsClass, "\"\n      aria-label=\"Export\"\n      type=\"button\"\n      title=\"").concat(o.formatExport(), "\">\n      ").concat(o.showButtonIcons ? Utils.sprintf(this.constants.html.icon, o.iconsPrefix, o.icons.export) : '', "\n      ").concat(o.showButtonText ? o.formatExport() : '', "\n      </button>\n      </div>\n    ") : "\n      <div class=\"export ".concat(this.constants.classes.buttonsDropdown, "\">\n      <button class=\"").concat(this.constants.buttonsClass, " dropdown-toggle\"\n      aria-label=\"Export\"\n      data-toggle=\"dropdown\"\n      type=\"button\"\n      title=\"").concat(o.formatExport(), "\">\n      ").concat(o.showButtonIcons ? Utils.sprintf(this.constants.html.icon, o.iconsPrefix, o.icons.export) : '', "\n      ").concat(o.showButtonText ? o.formatExport() : '', "\n      ").concat(this.constants.html.dropdownCaret, "\n      </button>\n      </div>\n    ")).appendTo($btnGroup);
	      var $items = this.$export;

	      if (exportTypes.length > 1) {
	        this.$export.append($menu); // themes support

	        if ($menu.children().length) {
	          $menu = $menu.children().eq(0);
	        }

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = exportTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var type = _step.value;

	            if (TYPE_NAME.hasOwnProperty(type)) {
	              var $item = $(Utils.sprintf(this.constants.html.pageDropdownItem, '', TYPE_NAME[type]));
	              $item.attr('data-type', type);
	              $menu.append($item);
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return != null) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        $items = $menu.children();
	      }

	      this.updateExportButton();
	      $items.click(function (e) {
	        e.preventDefault();
	        var type = $(e.currentTarget).data('type');
	        var exportOptions = {
	          type: type,
	          escape: false
	        };

	        _this.exportTable(exportOptions);
	      });
	      this.handleToolbar();
	    }
	  }, {
	    key: "handleToolbar",
	    value: function handleToolbar() {
	      if (!this.$export) {
	        return;
	      }

	      if ($.fn.bootstrapTable.theme === 'foundation') {
	        this.$export.find('.dropdown-pane').attr('id', 'toolbar-export-id');
	      } else if ($.fn.bootstrapTable.theme === 'materialize') {
	        this.$export.find('.dropdown-content').attr('id', 'toolbar-export-id');
	      }

	      if (_get(_getPrototypeOf(_class.prototype), "handleToolbar", this)) {
	        _get(_getPrototypeOf(_class.prototype), "handleToolbar", this).call(this);
	      }
	    }
	  }, {
	    key: "exportTable",
	    value: function exportTable(options) {
	      var _this2 = this;

	      var o = this.options;
	      var stateField = this.header.stateField;
	      var isCardView = o.cardView;

	      var doExport = function doExport(callback) {
	        if (stateField) {
	          _this2.hideColumn(stateField);
	        }

	        if (isCardView) {
	          _this2.toggleView();
	        }

	        var data = _this2.getData();

	        if (o.exportFooter) {
	          var $footerRow = _this2.$tableFooter.find('tr').first();

	          var footerData = {};
	          var footerHtml = [];
	          $.each($footerRow.children(), function (index, footerCell) {
	            var footerCellHtml = $(footerCell).children('.th-inner').first().html();
	            footerData[_this2.columns[index].field] = footerCellHtml === '&nbsp;' ? null : footerCellHtml; // grab footer cell text into cell index-based array

	            footerHtml.push(footerCellHtml);
	          });

	          _this2.$body.append(_this2.$body.children().last()[0].outerHTML);

	          var $lastTableRow = _this2.$body.children().last();

	          $.each($lastTableRow.children(), function (index, lastTableRowCell) {
	            $(lastTableRowCell).html(footerHtml[index]);
	          });
	        }

	        var hiddenColumns = _this2.getHiddenColumns();

	        hiddenColumns.forEach(function (row) {
	          if (row.forceExport) {
	            _this2.showColumn(row.field);
	          }
	        });

	        if (typeof o.exportOptions.fileName === 'function') {
	          options.fileName = o.exportOptions.fileName();
	        }

	        _this2.$el.tableExport($.extend({
	          onAfterSaveToFile: function onAfterSaveToFile() {
	            if (o.exportFooter) {
	              _this2.load(data);
	            }

	            if (stateField) {
	              _this2.showColumn(stateField);
	            }

	            if (isCardView) {
	              _this2.toggleView();
	            }

	            hiddenColumns.forEach(function (row) {
	              if (row.forceExport) {
	                _this2.hideColumn(row.field);
	              }
	            });
	            if (callback) callback();
	          }
	        }, o.exportOptions, options));
	      };

	      if (o.exportDataType === 'all' && o.pagination) {
	        var eventName = o.sidePagination === 'server' ? 'post-body.bs.table' : 'page-change.bs.table';
	        var virtualScroll = this.options.virtualScroll;
	        this.$el.one(eventName, function () {
	          doExport(function () {
	            _this2.options.virtualScroll = virtualScroll;

	            _this2.togglePagination();
	          });
	        });
	        this.options.virtualScroll = false;
	        this.togglePagination();
	        this.trigger('export-saved', this.getData());
	      } else if (o.exportDataType === 'selected') {
	        var data = this.getData();
	        var selectedData = this.getSelections();

	        if (!selectedData.length) {
	          return;
	        }

	        if (o.sidePagination === 'server') {
	          data = _defineProperty({
	            total: o.totalRows
	          }, this.options.dataField, data);
	          selectedData = _defineProperty({
	            total: selectedData.length
	          }, this.options.dataField, selectedData);
	        }

	        this.load(selectedData);
	        doExport(function () {
	          _this2.load(data);
	        });
	        this.trigger('export-saved', selectedData);
	      } else {
	        doExport();
	        this.trigger('export-saved', this.getData(true));
	      }
	    }
	  }, {
	    key: "updateSelected",
	    value: function updateSelected() {
	      _get(_getPrototypeOf(_class.prototype), "updateSelected", this).call(this);

	      this.updateExportButton();
	    }
	  }, {
	    key: "updateExportButton",
	    value: function updateExportButton() {
	      if (this.options.exportDataType === 'selected') {
	        this.$export.find('> button').prop('disabled', !this.getSelections().length);
	      }
	    }
	  }]);

	  return _class;
	}($.BootstrapTable);

})));

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = global || self, factory(global.jQuery));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.0',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol() == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var v8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return v8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
	  [].filter.call({ length: -1, 0: 1 }, function (it) { throw it; });
	});

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var SPECIES$2 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$2] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0)) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, { REPLACE_KEEPS_$0: REPLACE_KEEPS_$0 });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (reason.REPLACE_KEEPS_$0 || (typeof replaceValue === 'string' && replaceValue.indexOf('$0') === -1)) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$1(min$2(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// `SameValue` abstract operation
	// https://tc39.github.io/ecma262/#sec-samevalue
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// @@search logic
	fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible(this);
	      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
	      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative(nativeSearch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regexpExecAbstract(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var SPECIES$3 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var $forEach = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	/**
	 * @author: Dennis Hernández
	 * @webSite: http://djhvscf.github.io/Blog
	 * @update zhixin wen <wenzhixin2010@gmail.com>
	 */

	var Utils = $.fn.bootstrapTable.utils;
	var UtilsCookie = {
	  cookieIds: {
	    sortOrder: 'bs.table.sortOrder',
	    sortName: 'bs.table.sortName',
	    pageNumber: 'bs.table.pageNumber',
	    pageList: 'bs.table.pageList',
	    columns: 'bs.table.columns',
	    searchText: 'bs.table.searchText',
	    reorderColumns: 'bs.table.reorderColumns',
	    filterControl: 'bs.table.filterControl',
	    filterBy: 'bs.table.filterBy'
	  },
	  getCurrentHeader: function getCurrentHeader(that) {
	    var header = that.$header;

	    if (that.options.height) {
	      header = that.$tableHeader;
	    }

	    return header;
	  },
	  getCurrentSearchControls: function getCurrentSearchControls(that) {
	    var searchControls = 'select, input';

	    if (that.options.height) {
	      searchControls = 'table select, table input';
	    }

	    return searchControls;
	  },
	  cookieEnabled: function cookieEnabled() {
	    return !!navigator.cookieEnabled;
	  },
	  inArrayCookiesEnabled: function inArrayCookiesEnabled(cookieName, cookiesEnabled) {
	    var index = -1;

	    for (var i = 0; i < cookiesEnabled.length; i++) {
	      if (cookieName.toLowerCase() === cookiesEnabled[i].toLowerCase()) {
	        index = i;
	        break;
	      }
	    }

	    return index;
	  },
	  setCookie: function setCookie(that, cookieName, cookieValue) {
	    if (!that.options.cookie || !UtilsCookie.cookieEnabled() || that.options.cookieIdTable === '') {
	      return;
	    }

	    if (UtilsCookie.inArrayCookiesEnabled(cookieName, that.options.cookiesEnabled) === -1) {
	      return;
	    }

	    cookieName = "".concat(that.options.cookieIdTable, ".").concat(cookieName);

	    switch (that.options.cookieStorage) {
	      case 'cookieStorage':
	        document.cookie = [cookieName, '=', encodeURIComponent(cookieValue), "; expires=".concat(UtilsCookie.calculateExpiration(that.options.cookieExpire)), that.options.cookiePath ? "; path=".concat(that.options.cookiePath) : '', that.options.cookieDomain ? "; domain=".concat(that.options.cookieDomain) : '', that.options.cookieSecure ? '; secure' : ''].join('');
	        break;

	      case 'localStorage':
	        localStorage.setItem(cookieName, cookieValue);
	        break;

	      case 'sessionStorage':
	        sessionStorage.setItem(cookieName, cookieValue);
	        break;

	      case 'customStorage':
	        if (!that.options.cookieCustomStorageSet || !that.options.cookieCustomStorageGet || !that.options.cookieCustomStorageDelete) {
	          throw new Error('The following options must be set while using the customStorage: cookieCustomStorageSet, cookieCustomStorageGet and cookieCustomStorageDelete');
	        }

	        Utils.calculateObjectValue(that.options, that.options.cookieCustomStorageSet, [cookieName, cookieValue], '');
	        break;

	      default:
	        return false;
	    }

	    return true;
	  },
	  getCookie: function getCookie(that, tableName, cookieName) {
	    if (!cookieName) {
	      return null;
	    }

	    if (UtilsCookie.inArrayCookiesEnabled(cookieName, that.options.cookiesEnabled) === -1) {
	      return null;
	    }

	    cookieName = "".concat(tableName, ".").concat(cookieName);

	    switch (that.options.cookieStorage) {
	      case 'cookieStorage':
	        var value = "; ".concat(document.cookie);
	        var parts = value.split("; ".concat(cookieName, "="));
	        return parts.length === 2 ? decodeURIComponent(parts.pop().split(';').shift()) : null;

	      case 'localStorage':
	        return localStorage.getItem(cookieName);

	      case 'sessionStorage':
	        return sessionStorage.getItem(cookieName);

	      case 'customStorage':
	        if (!that.options.cookieCustomStorageSet || !that.options.cookieCustomStorageGet || !that.options.cookieCustomStorageDelete) {
	          throw new Error('The following options must be set while using the customStorage: cookieCustomStorageSet, cookieCustomStorageGet and cookieCustomStorageDelete');
	        }

	        return Utils.calculateObjectValue(that.options, that.options.cookieCustomStorageGet, [cookieName], '');

	      default:
	        return null;
	    }
	  },
	  deleteCookie: function deleteCookie(that, tableName, cookieName) {
	    cookieName = "".concat(tableName, ".").concat(cookieName);

	    switch (that.options.cookieStorage) {
	      case 'cookieStorage':
	        document.cookie = [encodeURIComponent(cookieName), '=', '; expires=Thu, 01 Jan 1970 00:00:00 GMT', that.options.cookiePath ? "; path=".concat(that.options.cookiePath) : '', that.options.cookieDomain ? "; domain=".concat(that.options.cookieDomain) : ''].join('');
	        break;

	      case 'localStorage':
	        localStorage.removeItem(cookieName);
	        break;

	      case 'sessionStorage':
	        sessionStorage.removeItem(cookieName);
	        break;

	      case 'customStorage':
	        if (!that.options.cookieCustomStorageSet || !that.options.cookieCustomStorageGet || !that.options.cookieCustomStorageDelete) {
	          throw new Error('The following options must be set while using the customStorage: cookieCustomStorageSet, cookieCustomStorageGet and cookieCustomStorageDelete');
	        }

	        Utils.calculateObjectValue(that.options, that.options.cookieCustomStorageDelete, [cookieName], '');
	        break;

	      default:
	        return false;
	    }

	    return true;
	  },
	  calculateExpiration: function calculateExpiration(cookieExpire) {
	    var time = cookieExpire.replace(/[0-9]*/, ''); // s,mi,h,d,m,y

	    cookieExpire = cookieExpire.replace(/[A-Za-z]{1,2}/, ''); // number

	    switch (time.toLowerCase()) {
	      case 's':
	        cookieExpire = +cookieExpire;
	        break;

	      case 'mi':
	        cookieExpire *= 60;
	        break;

	      case 'h':
	        cookieExpire = cookieExpire * 60 * 60;
	        break;

	      case 'd':
	        cookieExpire = cookieExpire * 24 * 60 * 60;
	        break;

	      case 'm':
	        cookieExpire = cookieExpire * 30 * 24 * 60 * 60;
	        break;

	      case 'y':
	        cookieExpire = cookieExpire * 365 * 24 * 60 * 60;
	        break;

	      default:
	        cookieExpire = undefined;
	        break;
	    }

	    if (!cookieExpire) {
	      return '';
	    }

	    var d = new Date();
	    d.setTime(d.getTime() + cookieExpire * 1000);
	    return d.toGMTString();
	  },
	  initCookieFilters: function initCookieFilters(bootstrapTable) {
	    setTimeout(function () {
	      var parsedCookieFilters = JSON.parse(UtilsCookie.getCookie(bootstrapTable, bootstrapTable.options.cookieIdTable, UtilsCookie.cookieIds.filterControl));

	      if (!bootstrapTable.options.filterControlValuesLoaded && parsedCookieFilters) {
	        var cachedFilters = {};
	        var header = UtilsCookie.getCurrentHeader(bootstrapTable);
	        var searchControls = UtilsCookie.getCurrentSearchControls(bootstrapTable);

	        var applyCookieFilters = function applyCookieFilters(element, filteredCookies) {
	          filteredCookies.forEach(function (cookie) {
	            if (cookie.text !== '' && element.tagName === 'INPUT') {
	              element.value = cookie.text;
	              cachedFilters[cookie.field] = cookie.text;
	            } else if (cookie.text !== '' && element.tagName === 'SELECT') {
	              var option = document.createElement('option');
	              option.value = cookie.text;
	              option.text = cookie.text;
	              element.add(option, element[1]);
	              element.selectedIndex = 1;
	              cachedFilters[cookie.field] = cookie.text;
	            }
	          });
	        };

	        header.find(searchControls).each(function () {
	          var field = $(this).closest('[data-field]').data('field');
	          var filteredCookies = parsedCookieFilters.filter(function (cookie) {
	            return cookie.field === field;
	          });
	          applyCookieFilters(this, filteredCookies);
	        });
	        bootstrapTable.initColumnSearch(cachedFilters);
	        bootstrapTable.options.filterControlValuesLoaded = true;
	        bootstrapTable.initServer();
	      }
	    }, 250);
	  }
	};
	$.extend($.fn.bootstrapTable.defaults, {
	  cookie: false,
	  cookieExpire: '2h',
	  cookiePath: null,
	  cookieDomain: null,
	  cookieSecure: null,
	  cookieIdTable: '',
	  cookiesEnabled: ['bs.table.sortOrder', 'bs.table.sortName', 'bs.table.pageNumber', 'bs.table.pageList', 'bs.table.columns', 'bs.table.searchText', 'bs.table.filterControl', 'bs.table.filterBy', 'bs.table.reorderColumns'],
	  cookieStorage: 'cookieStorage',
	  // localStorage, sessionStorage, customStorage
	  // internal variable
	  filterControls: [],
	  filterControlValuesLoaded: false
	});
	$.fn.bootstrapTable.methods.push('getCookies');
	$.fn.bootstrapTable.methods.push('deleteCookie');
	$.extend($.fn.bootstrapTable.utils, {
	  setCookie: UtilsCookie.setCookie,
	  getCookie: UtilsCookie.getCookie
	});

	$.BootstrapTable =
	/*#__PURE__*/
	function (_$$BootstrapTable) {
	  _inherits(_class, _$$BootstrapTable);

	  function _class() {
	    _classCallCheck(this, _class);

	    return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
	  }

	  _createClass(_class, [{
	    key: "init",
	    value: function init() {
	      if (this.options.cookie) {
	        // FilterBy logic
	        var filterByCookieValue = UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.filterBy);

	        if (typeof filterByCookieValue === 'boolean' && !filterByCookieValue) {
	          throw new Error('The cookie value of filterBy must be a json!');
	        }

	        var filterByCookie = {};

	        try {
	          filterByCookie = JSON.parse(filterByCookieValue);
	        } catch (e) {
	          throw new Error('Could not parse the json of the filterBy cookie!');
	        }

	        this.filterColumns = filterByCookie ? filterByCookie : {}; // FilterControl logic

	        this.options.filterControls = [];
	        this.options.filterControlValuesLoaded = false;
	        this.options.cookiesEnabled = typeof this.options.cookiesEnabled === 'string' ? this.options.cookiesEnabled.replace('[', '').replace(']', '').replace(/'/g, '').replace(/ /g, '').toLowerCase().split(',') : this.options.cookiesEnabled;

	        if (this.options.filterControl) {
	          var that = this;
	          this.$el.on('column-search.bs.table', function (e, field, text) {
	            var isNewField = true;

	            for (var i = 0; i < that.options.filterControls.length; i++) {
	              if (that.options.filterControls[i].field === field) {
	                that.options.filterControls[i].text = text;
	                isNewField = false;
	                break;
	              }
	            }

	            if (isNewField) {
	              that.options.filterControls.push({
	                field: field,
	                text: text
	              });
	            }

	            UtilsCookie.setCookie(that, UtilsCookie.cookieIds.filterControl, JSON.stringify(that.options.filterControls));
	          }).on('created-controls.bs.table', UtilsCookie.initCookieFilters(that));
	        }
	      }

	      _get(_getPrototypeOf(_class.prototype), "init", this).call(this);
	    }
	  }, {
	    key: "initServer",
	    value: function initServer() {
	      var _get2;

	      if (this.options.cookie && this.options.filterControl && !this.options.filterControlValuesLoaded) {
	        var cookie = JSON.parse(UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.filterControl));

	        if (cookie) {
	          return;
	        }
	      }

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      (_get2 = _get(_getPrototypeOf(_class.prototype), "initServer", this)).call.apply(_get2, [this].concat(args));
	    }
	  }, {
	    key: "initTable",
	    value: function initTable() {
	      var _get3;

	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      (_get3 = _get(_getPrototypeOf(_class.prototype), "initTable", this)).call.apply(_get3, [this].concat(args));

	      this.initCookie();
	    }
	  }, {
	    key: "onSort",
	    value: function onSort() {
	      var _get4;

	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      (_get4 = _get(_getPrototypeOf(_class.prototype), "onSort", this)).call.apply(_get4, [this].concat(args));

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.sortOrder, this.options.sortOrder);
	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.sortName, this.options.sortName);
	    }
	  }, {
	    key: "onPageNumber",
	    value: function onPageNumber() {
	      var _get5;

	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      (_get5 = _get(_getPrototypeOf(_class.prototype), "onPageNumber", this)).call.apply(_get5, [this].concat(args));

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
	    }
	  }, {
	    key: "onPageListChange",
	    value: function onPageListChange() {
	      var _get6;

	      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }

	      (_get6 = _get(_getPrototypeOf(_class.prototype), "onPageListChange", this)).call.apply(_get6, [this].concat(args));

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageList, this.options.pageSize);
	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
	    }
	  }, {
	    key: "onPagePre",
	    value: function onPagePre() {
	      var _get7;

	      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }

	      (_get7 = _get(_getPrototypeOf(_class.prototype), "onPagePre", this)).call.apply(_get7, [this].concat(args));

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
	    }
	  }, {
	    key: "onPageNext",
	    value: function onPageNext() {
	      var _get8;

	      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }

	      (_get8 = _get(_getPrototypeOf(_class.prototype), "onPageNext", this)).call.apply(_get8, [this].concat(args));

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
	    }
	  }, {
	    key: "_toggleColumn",
	    value: function _toggleColumn() {
	      var _get9;

	      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	        args[_key8] = arguments[_key8];
	      }

	      (_get9 = _get(_getPrototypeOf(_class.prototype), "_toggleColumn", this)).call.apply(_get9, [this].concat(args));

	      var visibleColumns = [];
	      $.each(this.columns, function (i, column) {
	        if (column.visible) {
	          visibleColumns.push(column.field);
	        }
	      });
	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.columns, JSON.stringify(visibleColumns));
	    }
	  }, {
	    key: "selectPage",
	    value: function selectPage(page) {
	      _get(_getPrototypeOf(_class.prototype), "selectPage", this).call(this, page);

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, page);
	    }
	  }, {
	    key: "onSearch",
	    value: function onSearch(event) {
	      _get(_getPrototypeOf(_class.prototype), "onSearch", this).call(this, event);

	      if (this.options.search) {
	        UtilsCookie.setCookie(this, UtilsCookie.cookieIds.searchText, this.searchText);
	      }

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
	    }
	  }, {
	    key: "initHeader",
	    value: function initHeader() {
	      var _get10;

	      if (this.options.reorderableColumns) {
	        this.columnsSortOrder = JSON.parse(UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.reorderColumns));
	      }

	      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	        args[_key9] = arguments[_key9];
	      }

	      (_get10 = _get(_getPrototypeOf(_class.prototype), "initHeader", this)).call.apply(_get10, [this].concat(args));
	    }
	  }, {
	    key: "persistReorderColumnsState",
	    value: function persistReorderColumnsState(that) {
	      UtilsCookie.setCookie(that, UtilsCookie.cookieIds.reorderColumns, JSON.stringify(that.columnsSortOrder));
	    }
	  }, {
	    key: "filterBy",
	    value: function filterBy() {
	      var _get11;

	      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        args[_key10] = arguments[_key10];
	      }

	      (_get11 = _get(_getPrototypeOf(_class.prototype), "filterBy", this)).call.apply(_get11, [this].concat(args));

	      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.filterBy, JSON.stringify(this.filterColumns));
	    }
	  }, {
	    key: "initCookie",
	    value: function initCookie() {
	      if (!this.options.cookie) {
	        return;
	      }

	      if (this.options.cookieIdTable === '' || this.options.cookieExpire === '' || !UtilsCookie.cookieEnabled()) {
	        console.error('Configuration error. Please review the cookieIdTable and the cookieExpire property. If the properties are correct, then this browser does not support cookies.');
	        this.options.cookie = false; // Make sure that the cookie extension is disabled

	        return;
	      }

	      var sortOrderCookie = UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.sortOrder);
	      var sortOrderNameCookie = UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.sortName);
	      var pageNumberCookie = UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.pageNumber);
	      var pageListCookie = UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.pageList);
	      var searchTextCookie = UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.searchText);
	      var columnsCookieValue = UtilsCookie.getCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds.columns);

	      if (typeof columnsCookieValue === 'boolean' && !columnsCookieValue) {
	        throw new Error('The cookie value of filterBy must be a json!');
	      }

	      var columnsCookie = {};

	      try {
	        columnsCookie = JSON.parse(columnsCookieValue);
	      } catch (e) {
	        throw new Error('Could not parse the json of the columns cookie!', columnsCookieValue);
	      } // sortOrder


	      this.options.sortOrder = sortOrderCookie ? sortOrderCookie : this.options.sortOrder; // sortName

	      this.options.sortName = sortOrderNameCookie ? sortOrderNameCookie : this.options.sortName; // pageNumber

	      this.options.pageNumber = pageNumberCookie ? +pageNumberCookie : this.options.pageNumber; // pageSize

	      this.options.pageSize = pageListCookie ? pageListCookie === this.options.formatAllRows() ? pageListCookie : +pageListCookie : this.options.pageSize; // searchText

	      this.options.searchText = searchTextCookie ? searchTextCookie : '';

	      if (columnsCookie) {
	        $.each(this.columns, function (i, column) {
	          column.visible = $.inArray(column.field, columnsCookie) !== -1;
	        });
	      }
	    }
	  }, {
	    key: "getCookies",
	    value: function getCookies() {
	      var bootstrapTable = this;
	      var cookies = {};
	      $.each(UtilsCookie.cookieIds, function (key, value) {
	        cookies[key] = UtilsCookie.getCookie(bootstrapTable, bootstrapTable.options.cookieIdTable, value);

	        if (key === 'columns') {
	          cookies[key] = JSON.parse(cookies[key]);
	        }
	      });
	      return cookies;
	    }
	  }, {
	    key: "deleteCookie",
	    value: function deleteCookie(cookieName) {
	      if (cookieName === '' || !UtilsCookie.cookieEnabled()) {
	        return;
	      }

	      UtilsCookie.deleteCookie(this, this.options.cookieIdTable, UtilsCookie.cookieIds[cookieName]);
	    }
	  }]);

	  return _class;
	}($.BootstrapTable);

})));

jQuery.base64 = (function($) {

    // private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // private method for UTF-8 encoding
    function utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    function encode(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }

    return {
        encode: function (str) {
            return encode(str);
        }
    };

}(jQuery));
/**
 * @preserve tableExport.jquery.plugin
 *
 * Version 1.10.17
 *
 * Copyright (c) 2015-2020 hhurz, https://github.com/hhurz/tableExport.jquery.plugin
 *
 * Based on https://github.com/kayalshri/tableExport.jquery.plugin
 *
 * Licensed under the MIT License
 **/

'use strict';

(function ($) {
  $.fn.tableExport = function (options) {
    var defaults = {
      csvEnclosure:       '"',
      csvSeparator:       ',',
      csvUseBOM:          true,
      date: {
        html:             'dd/mm/yyyy'  // Date format used in html source. Supported placeholders: dd, mm, yy, yyyy and a arbitrary single separator character
      },
      displayTableName:   false,        // Deprecated
      escape:             false,        // Deprecated
      exportHiddenCells:  false,        // true = speed up export of large tables with hidden cells (hidden cells will be exported !)
      fileName:           'tableExport',
      htmlContent:        false,
      htmlHyperlink:      'content',    // Export the 'content' or the 'href' link of <a> tags unless onCellHtmlHyperlink is not defined
      ignoreColumn:       [],
      ignoreRow:          [],
      jsonScope:          'all',        // One of 'head', 'data', 'all'
      jspdf: {                          // jsPDF / jsPDF-AutoTable related options
        orientation:      'p',
        unit:             'pt',
        format:           'a4',         // One of jsPDF page formats or 'bestfit' for automatic paper format selection
        margins:          {left: 20, right: 10, top: 10, bottom: 10},
        onDocCreated:     null,
        autotable: {
          styles: {
            cellPadding:  2,
            rowHeight:    12,
            fontSize:     8,
            fillColor:    255,          // Color value or 'inherit' to use css background-color from html table
            textColor:    50,           // Color value or 'inherit' to use css color from html table
            fontStyle:    'normal',     // 'normal', 'bold', 'italic', 'bolditalic' or 'inherit' to use css font-weight and font-style from html table
            overflow:     'ellipsize',  // 'visible', 'hidden', 'ellipsize' or 'linebreak'
            halign:       'inherit',    // 'left', 'center', 'right' or 'inherit' to use css horizontal cell alignment from html table
            valign:       'middle'      // 'top', 'middle', or 'bottom'
          },
          headerStyles: {
            fillColor:    [52, 73, 94],
            textColor:    255,
            fontStyle:    'bold',
            halign:       'inherit',    // 'left', 'center', 'right' or 'inherit' to use css horizontal header cell alignment from html table
            valign:       'middle'      // 'top', 'middle', or 'bottom'
          },
          alternateRowStyles: {
            fillColor:     245
          },
          tableExport: {
            doc:               null,    // jsPDF doc object. If set, an already created doc object will be used to export to
            onAfterAutotable:  null,
            onBeforeAutotable: null,
            onAutotableText:   null,
            onTable:           null,
            outputImages:      true
          }
        }
      },
      mso: {                            // MS Excel and MS Word related options
        fileFormat:        'xlshtml',   // 'xlshtml' = Excel 2000 html format
                                        // 'xmlss' = XML Spreadsheet 2003 file format (XMLSS)
                                        // 'xlsx' = Excel 2007 Office Open XML format
        onMsoNumberFormat: null,        // Excel 2000 html format only. See readme.md for more information about msonumberformat
        pageFormat:        'a4',        // Page format used for page orientation
        pageOrientation:   'portrait',  // portrait, landscape (xlshtml format only)
        rtl:               false,       // true = Set worksheet option 'DisplayRightToLeft'
        styles:            [],          // E.g. ['border-bottom', 'border-top', 'border-left', 'border-right']
        worksheetName:     '',
        xslx: {                         // Specific Excel 2007 XML format settings:
          formatId: {                   // XLSX format (id) used to format excel cells. See readme.md: data-tableexport-xlsxformatid
            date:          14,          // formatId or format string (e.g. 'm/d/yy') or function(cell, row, col) {return formatId}
            numbers:       2            // formatId or format string (e.g. '\"T\"\ #0.00') or function(cell, row, col) {return formatId}
          }
        }
      },
      numbers: {
        html: {
          decimalMark:        '.',      // Decimal mark in html source
          thousandsSeparator: ','       // Thousands separator in html source
        },
        output: {                       // Set 'output: false' to keep number format of html source in resulting output
          decimalMark:        '.',      // Decimal mark in resulting output
          thousandsSeparator: ','       // Thousands separator in resulting output
        }
      },
      onAfterSaveToFile:   null,        // function(data, fileName)
      onBeforeSaveToFile:  null,        // saveIt = function(data, fileName, type, charset, encoding): Return false to abort save process
      onCellData:          null,        // Text to export = function($cell, row, col, href, cellText, cellType)
      onCellHtmlData:      null,        // Text to export = function($cell, row, col, htmlContent)
      onCellHtmlHyperlink: null,        // Text to export = function($cell, row, col, href, cellText)
      onIgnoreRow:         null,        // ignoreRow = function($tr, row): Return true to prevent export of the row
      onTableExportBegin:  null,        // function() - called when export starts
      onTableExportEnd:    null,        // function() - called when export ends
      outputMode:          'file',      // 'file', 'string', 'base64' or 'window' (experimental)
      pdfmake: {
        enabled:           false,       // true: use pdfmake instead of jspdf and jspdf-autotable (experimental)
        docDefinition: {
          pageOrientation: 'portrait',  // 'portrait' or 'landscape'
          defaultStyle: {
            font:          'Roboto'     // Default is 'Roboto', for an arabic font set this option to 'Mirza' and include mirza_fonts.js
          }
        },
        fonts: {}
      },
      preserve: {
        leadingWS:         false,       // preserve leading white spaces
        trailingWS:        false        // preserve trailing white spaces
      },
      preventInjection:    true,        // Prepend a single quote to cell strings that start with =,+,- or @ to prevent formula injection
      sql: {
        tableEnclosure:     '`',        // If table name or column names contain any characters except letters, numbers, and
        columnEnclosure:    '`'         // underscores, usually the name must be delimited by enclosing it in back quotes (`)
      },
      tbodySelector:       'tr',
      tfootSelector:       'tr',        // Set empty ('') to prevent export of tfoot rows
      theadSelector:       'tr',
      tableName:           'Table',
      type:                'csv'        // Export format: 'csv', 'tsv', 'txt', 'sql', 'json', 'xml', 'excel', 'doc', 'png' or 'pdf'
    };

    var pageFormats = { // Size in pt of various paper formats. Adopted from jsPDF.
      'a0': [2383.94, 3370.39], 'a1': [1683.78, 2383.94], 'a2': [1190.55, 1683.78],
      'a3': [841.89, 1190.55],  'a4': [595.28, 841.89],   'a5': [419.53, 595.28],
      'a6': [297.64, 419.53],   'a7': [209.76, 297.64],   'a8': [147.40, 209.76],
      'a9': [104.88, 147.40],   'a10': [73.70, 104.88],
      'b0': [2834.65, 4008.19], 'b1': [2004.09, 2834.65], 'b2': [1417.32, 2004.09],
      'b3': [1000.63, 1417.32], 'b4': [708.66, 1000.63],  'b5': [498.90, 708.66],
      'b6': [354.33, 498.90],   'b7': [249.45, 354.33],   'b8': [175.75, 249.45],
      'b9': [124.72, 175.75],   'b10': [87.87, 124.72],
      'c0': [2599.37, 3676.54],
      'c1': [1836.85, 2599.37], 'c2': [1298.27, 1836.85], 'c3': [918.43, 1298.27],
      'c4': [649.13, 918.43],   'c5': [459.21, 649.13],   'c6': [323.15, 459.21],
      'c7': [229.61, 323.15],   'c8': [161.57, 229.61],   'c9': [113.39, 161.57],
      'c10': [79.37, 113.39],
      'dl': [311.81, 623.62],
      'letter': [612, 792], 'government-letter': [576, 756], 'legal': [612, 1008],
      'junior-legal': [576, 360], 'ledger': [1224, 792], 'tabloid': [792, 1224],
      'credit-card': [153, 243]
    };
    var FONT_ROW_RATIO = 1.15;
    var el = this;
    var DownloadEvt = null;
    var $hrows = [];
    var $rows = [];
    var rowIndex = 0;
    var trData = '';
    var colNames = [];
    var ranges = [];
    var blob;
    var $hiddenTableElements = [];
    var checkCellVisibilty = false;

    $.extend(true, defaults, options);

    // Adopt deprecated options
    if (defaults.type === 'xlsx') {
      defaults.mso.fileFormat = defaults.type;
      defaults.type = 'excel';
    }
    if (typeof defaults.excelFileFormat !== 'undefined' && defaults.mso.fileFormat === 'undefined')
      defaults.mso.fileFormat = defaults.excelFileFormat;
    if (typeof defaults.excelPageFormat !== 'undefined' && defaults.mso.pageFormat === 'undefined')
      defaults.mso.pageFormat = defaults.excelPageFormat;
    if (typeof defaults.excelPageOrientation !== 'undefined' && defaults.mso.pageOrientation === 'undefined')
      defaults.mso.pageOrientation = defaults.excelPageOrientation;
    if (typeof defaults.excelRTL !== 'undefined' && defaults.mso.rtl === 'undefined')
      defaults.mso.rtl = defaults.excelRTL;
    if (typeof defaults.excelstyles !== 'undefined' && defaults.mso.styles === 'undefined')
      defaults.mso.styles = defaults.excelstyles;
    if (typeof defaults.onMsoNumberFormat !== 'undefined' && defaults.mso.onMsoNumberFormat === 'undefined')
      defaults.mso.onMsoNumberFormat = defaults.onMsoNumberFormat;
    if (typeof defaults.worksheetName !== 'undefined' && defaults.mso.worksheetName === 'undefined')
      defaults.mso.worksheetName = defaults.worksheetName;

    // Check values of some options
    defaults.mso.pageOrientation = (defaults.mso.pageOrientation.substr(0, 1) === 'l') ? 'landscape' : 'portrait';
    defaults.date.html = defaults.date.html || '';

    if (defaults.date.html.length) {
      var patt = [];
      patt['dd'] = '(3[01]|[12][0-9]|0?[1-9])';
      patt['mm'] = '(1[012]|0?[1-9])';
      patt['yyyy'] = '((?:1[6-9]|2[0-2])\\d{2})';
      patt['yy'] = '(\\d{2})';

      var separator = defaults.date.html.match(/[^a-zA-Z0-9]/)[0];
      var formatItems = defaults.date.html.toLowerCase().split(separator);
      defaults.date.regex = '^\\s*';
      defaults.date.regex += patt[formatItems[0]];
      defaults.date.regex += '(.)'; // separator group
      defaults.date.regex += patt[formatItems[1]];
      defaults.date.regex += '\\2'; // identical separator group
      defaults.date.regex += patt[formatItems[2]];
      defaults.date.regex += '\\s*$';
      // e.g. '^\\s*(3[01]|[12][0-9]|0?[1-9])(.)(1[012]|0?[1-9])\\2((?:1[6-9]|2[0-2])\\d{2})\\s*$'

      defaults.date.pattern = new RegExp(defaults.date.regex, 'g');
      var f = formatItems.indexOf('dd') + 1;
      defaults.date.match_d = f + (f > 1 ? 1 : 0);
      f = formatItems.indexOf('mm') + 1;
      defaults.date.match_m = f + (f > 1 ? 1 : 0);
      f = (formatItems.indexOf('yyyy') >= 0 ? formatItems.indexOf('yyyy') : formatItems.indexOf('yy')) + 1;
      defaults.date.match_y = f + (f > 1 ? 1 : 0);
    }

    colNames = GetColumnNames(el);

    if (typeof defaults.onTableExportBegin === 'function')
      defaults.onTableExportBegin();

    if (defaults.type === 'csv' || defaults.type === 'tsv' || defaults.type === 'txt') {

      var csvData = '';
      var rowlength = 0;
      ranges = [];
      rowIndex = 0;

      var csvString = function (cell, rowIndex, colIndex) {
        var result = '';

        if (cell !== null) {
          var dataString = parseString(cell, rowIndex, colIndex);

          var csvValue = (dataString === null || dataString === '') ? '' : dataString.toString();

          if (defaults.type === 'tsv') {
            if (dataString instanceof Date)
              dataString.toLocaleString();

            // According to http://www.iana.org/assignments/media-types/text/tab-separated-values
            // are fields that contain tabs not allowable in tsv encoding
            result = replaceAll(csvValue, '\t', ' ');
          } else {
            // Takes a string and encapsulates it (by default in double-quotes) if it
            // contains the csv field separator, spaces, or linebreaks.
            if (dataString instanceof Date)
              result = defaults.csvEnclosure + dataString.toLocaleString() + defaults.csvEnclosure;
            else {
              result = preventInjection(csvValue);
              result = replaceAll(result, defaults.csvEnclosure, defaults.csvEnclosure + defaults.csvEnclosure);

              if (result.indexOf(defaults.csvSeparator) >= 0 || /[\r\n ]/g.test(result))
                result = defaults.csvEnclosure + result + defaults.csvEnclosure;
            }
          }
        }

        return result;
      };

      var CollectCsvData = function ($rows, rowselector, length) {

        $rows.each(function () {
          trData = '';
          ForEachVisibleCell(this, rowselector, rowIndex, length + $rows.length,
            function (cell, row, col) {
              trData += csvString(cell, row, col) + (defaults.type === 'tsv' ? '\t' : defaults.csvSeparator);
            });
          trData = $.trim(trData).substring(0, trData.length - 1);
          if (trData.length > 0) {

            if (csvData.length > 0)
              csvData += '\n';

            csvData += trData;
          }
          rowIndex++;
        });

        return $rows.length;
      };

      rowlength += CollectCsvData($(el).find('thead').first().find(defaults.theadSelector), 'th,td', rowlength);
      findTableElements($(el), 'tbody').each(function () {
        rowlength += CollectCsvData(findTableElements($(this), defaults.tbodySelector), 'td,th', rowlength);
      });
      if (defaults.tfootSelector.length)
        CollectCsvData($(el).find('tfoot').first().find(defaults.tfootSelector), 'td,th', rowlength);

      csvData += '\n';

      //output
      if (defaults.outputMode === 'string')
        return csvData;

      if (defaults.outputMode === 'base64')
        return base64encode(csvData);

      if (defaults.outputMode === 'window') {
        downloadFile(false, 'data:text/' + (defaults.type === 'csv' ? 'csv' : 'plain') + ';charset=utf-8,', csvData);
        return;
      }

      saveToFile(csvData,
        defaults.fileName + '.' + defaults.type,
        'text/' + (defaults.type === 'csv' ? 'csv' : 'plain'),
        'utf-8',
        '',
        (defaults.type === 'csv' && defaults.csvUseBOM));

    } else if (defaults.type === 'sql') {

      // Header
      rowIndex = 0;
      ranges = [];
      var tdData = 'INSERT INTO ' + defaults.sql.tableEnclosure + defaults.tableName + defaults.sql.tableEnclosure + ' (';
      $hrows = collectHeadRows($(el));
      $($hrows).each(function () {
        ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length,
          function (cell, row, col) {
            var colName = parseString(cell, row, col) || '';
            if (colName.indexOf(defaults.sql.columnEnclosure) > -1)
              colName = replaceAll(colName.toString(), defaults.sql.columnEnclosure, defaults.sql.columnEnclosure + defaults.sql.columnEnclosure);
            tdData += defaults.sql.columnEnclosure + colName + defaults.sql.columnEnclosure + ',';
          });
        rowIndex++;
        tdData = $.trim(tdData).substring(0, tdData.length - 1);
      });
      tdData += ') VALUES ';

      // Data
      $rows = collectRows($(el));
      $($rows).each(function () {
        trData = '';
        ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length,
          function (cell, row, col) {
            var dataString = parseString(cell, row, col) || '';
            if (dataString.indexOf('\'') > -1)
              dataString = replaceAll(dataString.toString(), '\'', '\'\'');
            trData += '\'' + dataString + '\',';
          });
        if (trData.length > 3) {
          tdData += '(' + trData;
          tdData = $.trim(tdData).substring(0, tdData.length - 1);
          tdData += '),';
        }
        rowIndex++;
      });

      tdData = $.trim(tdData).substring(0, tdData.length - 1);
      tdData += ';';

      // Output
      if (defaults.outputMode === 'string')
        return tdData;

      if (defaults.outputMode === 'base64')
        return base64encode(tdData);

      saveToFile(tdData, defaults.fileName + '.sql', 'application/sql', 'utf-8', '', false);

    } else if (defaults.type === 'json') {
      var jsonHeaderArray = [];
      ranges = [];
      $hrows = collectHeadRows($(el));
      $($hrows).each(function () {
        var jsonArrayTd = [];

        ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length,
          function (cell, row, col) {
            jsonArrayTd.push(parseString(cell, row, col));
          });
        jsonHeaderArray.push(jsonArrayTd);
      });

      // Data
      var jsonArray = [];

      $rows = collectRows($(el));
      $($rows).each(function () {
        var jsonObjectTd = {};
        var colIndex = 0;

        ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length,
          function (cell, row, col) {
            if (jsonHeaderArray.length) {
              jsonObjectTd[jsonHeaderArray[jsonHeaderArray.length - 1][colIndex]] = parseString(cell, row, col);
            } else {
              jsonObjectTd[colIndex] = parseString(cell, row, col);
            }
            colIndex++;
          });
        if ($.isEmptyObject(jsonObjectTd) === false)
          jsonArray.push(jsonObjectTd);

        rowIndex++;
      });

      var sdata;

      if (defaults.jsonScope === 'head')
        sdata = JSON.stringify(jsonHeaderArray);
      else if (defaults.jsonScope === 'data')
        sdata = JSON.stringify(jsonArray);
      else // all
        sdata = JSON.stringify({header: jsonHeaderArray, data: jsonArray});

      if (defaults.outputMode === 'string')
        return sdata;

      if (defaults.outputMode === 'base64')
        return base64encode(sdata);

      saveToFile(sdata, defaults.fileName + '.json', 'application/json', 'utf-8', 'base64', false);

    } else if (defaults.type === 'xml') {
      rowIndex = 0;
      ranges = [];
      var xml = '<?xml version="1.0" encoding="utf-8"?>';
      xml += '<tabledata><fields>';

      // Header
      $hrows = collectHeadRows($(el));
      $($hrows).each(function () {

        ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length,
          function (cell, row, col) {
            xml += '<field>' + parseString(cell, row, col) + '</field>';
          });
        rowIndex++;
      });
      xml += '</fields><data>';

      // Data
      var rowCount = 1;

      $rows = collectRows($(el));
      $($rows).each(function () {
        var colCount = 1;
        trData = '';
        ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length,
          function (cell, row, col) {
            trData += '<column-' + colCount + '>' + parseString(cell, row, col) + '</column-' + colCount + '>';
            colCount++;
          });
        if (trData.length > 0 && trData !== '<column-1></column-1>') {
          xml += '<row id="' + rowCount + '">' + trData + '</row>';
          rowCount++;
        }

        rowIndex++;
      });
      xml += '</data></tabledata>';

      // Output
      if (defaults.outputMode === 'string')
        return xml;

      if (defaults.outputMode === 'base64')
        return base64encode(xml);

      saveToFile(xml, defaults.fileName + '.xml', 'application/xml', 'utf-8', 'base64', false);
    } else if (defaults.type === 'excel' && defaults.mso.fileFormat === 'xmlss') {
      var docDatas = [];
      var docNames = [];

      $(el).filter(function () {
        return isVisible($(this));
      }).each(function () {
        var $table = $(this);

        var ssName = '';
        if (typeof defaults.mso.worksheetName === 'string' && defaults.mso.worksheetName.length)
          ssName = defaults.mso.worksheetName + ' ' + (docNames.length + 1);
        else if (typeof defaults.mso.worksheetName[docNames.length] !== 'undefined')
          ssName = defaults.mso.worksheetName[docNames.length];
        if (!ssName.length)
          ssName = $table.find('caption').text() || '';
        if (!ssName.length)
          ssName = 'Table ' + (docNames.length + 1);
        ssName = $.trim(ssName.replace(/[\\\/[\]*:?'"]/g, '').substring(0, 31));

        docNames.push($('<div />').text(ssName).html());

        if (defaults.exportHiddenCells === false) {
          $hiddenTableElements = $table.find('tr, th, td').filter(':hidden');
          checkCellVisibilty = $hiddenTableElements.length > 0;
        }

        rowIndex = 0;
        colNames = GetColumnNames(this);
        docData = '<Table>\r';

        function CollectXmlssData ($rows, rowselector, length) {
          var spans = [];

          $($rows).each(function () {
            var ssIndex = 0;
            var nCols = 0;
            trData = '';

            ForEachVisibleCell(this, 'td,th', rowIndex, length + $rows.length,
              function (cell, row, col) {
                if (cell !== null) {
                  var style = '';
                  var data = parseString(cell, row, col);
                  var type = 'String';

                  if (jQuery.isNumeric(data) !== false) {
                    type = 'Number';
                  } else {
                    var number = parsePercent(data);
                    if (number !== false) {
                      data = number;
                      type = 'Number';
                      style += ' ss:StyleID="pct1"';
                    }
                  }

                  if (type !== 'Number')
                    data = data.replace(/\n/g, '<br>');

                  var colspan = getColspan(cell);
                  var rowspan = getRowspan(cell);

                  // Skip spans
                  $.each(spans, function () {
                    var range = this;
                    if (rowIndex >= range.s.r && rowIndex <= range.e.r && nCols >= range.s.c && nCols <= range.e.c) {
                      for (var i = 0; i <= range.e.c - range.s.c; ++i) {
                        nCols++;
                        ssIndex++;
                      }
                    }
                  });

                  // Handle Row Span
                  if (rowspan || colspan) {
                    rowspan = rowspan || 1;
                    colspan = colspan || 1;
                    spans.push({
                      s: {r: rowIndex, c: nCols},
                      e: {r: rowIndex + rowspan - 1, c: nCols + colspan - 1}
                    });
                  }

                  // Handle Colspan
                  if (colspan > 1) {
                    style += ' ss:MergeAcross="' + (colspan - 1) + '"';
                    nCols += (colspan - 1);
                  }

                  if (rowspan > 1) {
                    style += ' ss:MergeDown="' + (rowspan - 1) + '" ss:StyleID="rsp1"';
                  }

                  if (ssIndex > 0) {
                    style += ' ss:Index="' + (nCols + 1) + '"';
                    ssIndex = 0;
                  }

                  trData += '<Cell' + style + '><Data ss:Type="' + type + '">' +
                    $('<div />').text(data).html() +
                    '</Data></Cell>\r';
                  nCols++;
                }
              });
            if (trData.length > 0)
              docData += '<Row ss:AutoFitHeight="0">\r' + trData + '</Row>\r';
            rowIndex++;
          });

          return $rows.length;
        }

        var rowLength = CollectXmlssData(collectHeadRows($table), 'th,td', 0);
        CollectXmlssData(collectRows($table), 'td,th', rowLength);

        docData += '</Table>\r';
        docDatas.push(docData);
      });

      var count = {};
      var firstOccurences = {};
      var item, itemCount;
      for (var n = 0, c = docNames.length; n < c; n++) {
        item = docNames[n];
        itemCount = count[item];
        itemCount = count[item] = (itemCount == null ? 1 : itemCount + 1);

        if (itemCount === 2)
          docNames[firstOccurences[item]] = docNames[firstOccurences[item]].substring(0, 29) + '-1';
        if (count[item] > 1)
          docNames[n] = docNames[n].substring(0, 29) + '-' + count[item];
        else
          firstOccurences[item] = n;
      }

      var CreationDate = new Date().toISOString();
      var xmlssDocFile = '<?xml version="1.0" encoding="UTF-8"?>\r' +
        '<?mso-application progid="Excel.Sheet"?>\r' +
        '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r' +
        ' xmlns:o="urn:schemas-microsoft-com:office:office"\r' +
        ' xmlns:x="urn:schemas-microsoft-com:office:excel"\r' +
        ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r' +
        ' xmlns:html="http://www.w3.org/TR/REC-html40">\r' +
        '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r' +
        '  <Created>' + CreationDate + '</Created>\r' +
        '</DocumentProperties>\r' +
        '<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r' +
        '  <AllowPNG/>\r' +
        '</OfficeDocumentSettings>\r' +
        '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r' +
        '  <WindowHeight>9000</WindowHeight>\r' +
        '  <WindowWidth>13860</WindowWidth>\r' +
        '  <WindowTopX>0</WindowTopX>\r' +
        '  <WindowTopY>0</WindowTopY>\r' +
        '  <ProtectStructure>False</ProtectStructure>\r' +
        '  <ProtectWindows>False</ProtectWindows>\r' +
        '</ExcelWorkbook>\r' +
        '<Styles>\r' +
        '  <Style ss:ID="Default" ss:Name="Normal">\r' +
        '    <Alignment ss:Vertical="Bottom"/>\r' +
        '    <Borders/>\r' +
        '    <Font/>\r' +
        '    <Interior/>\r' +
        '    <NumberFormat/>\r' +
        '    <Protection/>\r' +
        '  </Style>\r' +
        '  <Style ss:ID="rsp1">\r' +
        '    <Alignment ss:Vertical="Center"/>\r' +
        '  </Style>\r' +
        '  <Style ss:ID="pct1">\r' +
        '    <NumberFormat ss:Format="Percent"/>\r' +
        '  </Style>\r' +
        '</Styles>\r';

      for (var j = 0; j < docDatas.length; j++) {
        xmlssDocFile += '<Worksheet ss:Name="' + docNames[j] + '" ss:RightToLeft="' + (defaults.mso.rtl ? '1' : '0') + '">\r' +
          docDatas[j];
        if (defaults.mso.rtl) {
          xmlssDocFile += '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r' +
            '<DisplayRightToLeft/>\r' +
            '</WorksheetOptions>\r';
        } else
          xmlssDocFile += '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r';
        xmlssDocFile += '</Worksheet>\r';
      }

      xmlssDocFile += '</Workbook>\r';

      if (defaults.outputMode === 'string')
        return xmlssDocFile;

      if (defaults.outputMode === 'base64')
        return base64encode(xmlssDocFile);

      saveToFile(xmlssDocFile, defaults.fileName + '.xml', 'application/xml', 'utf-8', 'base64', false);
    } else if (defaults.type === 'excel' && defaults.mso.fileFormat === 'xlsx') {

      var sheetNames = [];
      var workbook = XLSX.utils.book_new();

      // Multiple worksheets and .xlsx file extension #202

      $(el).filter(function () {
        return isVisible($(this));
      }).each(function () {
        var $table = $(this);
        var ws = xlsxTableToSheet(this);

        var sheetName = '';
        if (typeof defaults.mso.worksheetName === 'string' && defaults.mso.worksheetName.length)
          sheetName = defaults.mso.worksheetName + ' ' + (sheetNames.length + 1);
        else if (typeof defaults.mso.worksheetName[sheetNames.length] !== 'undefined')
          sheetName = defaults.mso.worksheetName[sheetNames.length];
        if (!sheetName.length)
          sheetName = $table.find('caption').text() || '';
        if (!sheetName.length)
          sheetName = 'Table ' + (sheetNames.length + 1);
        sheetName = $.trim(sheetName.replace(/[\\\/[\]*:?'"]/g, '').substring(0, 31));

        sheetNames.push(sheetName);
        XLSX.utils.book_append_sheet(workbook, ws, sheetName);
      });

      // add worksheet to workbook
      var wbout = XLSX.write(workbook, {type: 'binary', bookType: defaults.mso.fileFormat, bookSST: false});

      saveToFile(xlsxWorkbookToArrayBuffer(wbout),
        defaults.fileName + '.' + defaults.mso.fileFormat,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'UTF-8', '', false);
    } else if (defaults.type === 'excel' || defaults.type === 'xls' || defaults.type === 'word' || defaults.type === 'doc') {

      var MSDocType = (defaults.type === 'excel' || defaults.type === 'xls') ? 'excel' : 'word';
      var MSDocExt = (MSDocType === 'excel') ? 'xls' : 'doc';
      var MSDocSchema = 'xmlns:x="urn:schemas-microsoft-com:office:' + MSDocType + '"';
      var docData = '';
      var docName = '';

      $(el).filter(function () {
        return isVisible($(this));
      }).each(function () {
        var $table = $(this);

        if (docName === '') {
          docName = defaults.mso.worksheetName || $table.find('caption').text() || 'Table';
          docName = $.trim(docName.replace(/[\\\/[\]*:?'"]/g, '').substring(0, 31));
        }

        if (defaults.exportHiddenCells === false) {
          $hiddenTableElements = $table.find('tr, th, td').filter(':hidden');
          checkCellVisibilty = $hiddenTableElements.length > 0;
        }

        rowIndex = 0;
        ranges = [];
        colNames = GetColumnNames(this);

        // Header
        docData += '<table><thead>';
        $hrows = collectHeadRows($table);
        $($hrows).each(function () {
          var $row = $(this);
          trData = '';
          ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length,
            function (cell, row, col) {
              if (cell !== null) {
                var thstyle = '';

                trData += '<th';
                if (defaults.mso.styles.length) {
                  var cellstyles = document.defaultView.getComputedStyle(cell, null);
                  var rowstyles = document.defaultView.getComputedStyle($row[0], null);

                  for (var cssStyle in defaults.mso.styles) {
                    var thcss = cellstyles[defaults.mso.styles[cssStyle]];
                    if (thcss === '')
                      thcss = rowstyles[defaults.mso.styles[cssStyle]];
                    if (thcss !== '' && thcss !== '0px none rgb(0, 0, 0)' && thcss !== 'rgba(0, 0, 0, 0)') {
                      thstyle += (thstyle === '') ? 'style="' : ';';
                      thstyle += defaults.mso.styles[cssStyle] + ':' + thcss;
                    }
                  }
                }
                if (thstyle !== '')
                  trData += ' ' + thstyle + '"';

                var tdcolspan = getColspan(cell);
                if (tdcolspan > 0)
                  trData += ' colspan="' + tdcolspan + '"';

                var tdrowspan = getRowspan(cell);
                if (tdrowspan > 0)
                  trData += ' rowspan="' + tdrowspan + '"';

                trData += '>' + parseString(cell, row, col) + '</th>';
              }
            });
          if (trData.length > 0)
            docData += '<tr>' + trData + '</tr>';
          rowIndex++;
        });
        docData += '</thead><tbody>';

        // Data
        $rows = collectRows($table);
        $($rows).each(function () {
          var $row = $(this);
          trData = '';
          ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length,
            function (cell, row, col) {
              if (cell !== null) {
                var tdvalue = parseString(cell, row, col);
                var tdstyle = '';
                var tdcss = $(cell).attr('data-tableexport-msonumberformat');

                if (typeof tdcss === 'undefined' && typeof defaults.mso.onMsoNumberFormat === 'function')
                  tdcss = defaults.mso.onMsoNumberFormat(cell, row, col);

                if (typeof tdcss !== 'undefined' && tdcss !== '')
                  tdstyle = 'style="mso-number-format:\'' + tdcss + '\'';

                if (defaults.mso.styles.length) {
                  var cellstyles = document.defaultView.getComputedStyle(cell, null);
                  var rowstyles = document.defaultView.getComputedStyle($row[0], null);

                  for (var cssStyle in defaults.mso.styles) {
                    tdcss = cellstyles[defaults.mso.styles[cssStyle]];
                    if (tdcss === '')
                      tdcss = rowstyles[defaults.mso.styles[cssStyle]];

                    if (tdcss !== '' && tdcss !== '0px none rgb(0, 0, 0)' && tdcss !== 'rgba(0, 0, 0, 0)') {
                      tdstyle += (tdstyle === '') ? 'style="' : ';';
                      tdstyle += defaults.mso.styles[cssStyle] + ':' + tdcss;
                    }
                  }
                }

                trData += '<td';
                if (tdstyle !== '')
                  trData += ' ' + tdstyle + '"';

                var tdcolspan = getColspan(cell);
                if (tdcolspan > 0)
                  trData += ' colspan="' + tdcolspan + '"';

                var tdrowspan = getRowspan(cell);
                if (tdrowspan > 0)
                  trData += ' rowspan="' + tdrowspan + '"';

                if (typeof tdvalue === 'string' && tdvalue !== '') {
                  tdvalue = preventInjection(tdvalue);
                  tdvalue = tdvalue.replace(/\n/g, '<br>');
                }

                trData += '>' + tdvalue + '</td>';
              }
            });
          if (trData.length > 0)
            docData += '<tr>' + trData + '</tr>';
          rowIndex++;
        });

        if (defaults.displayTableName)
          docData += '<tr><td></td></tr><tr><td></td></tr><tr><td>' + parseString($('<p>' + defaults.tableName + '</p>')) + '</td></tr>';

        docData += '</tbody></table>';
      });

      //noinspection XmlUnusedNamespaceDeclaration
      var docFile = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' + MSDocSchema + ' xmlns="http://www.w3.org/TR/REC-html40">';
      docFile += '<meta http-equiv="content-type" content="application/vnd.ms-' + MSDocType + '; charset=UTF-8">';
      docFile += '<head>';
      if (MSDocType === 'excel') {
        docFile += '<!--[if gte mso 9]>';
        docFile += '<xml>';
        docFile += '<x:ExcelWorkbook>';
        docFile += '<x:ExcelWorksheets>';
        docFile += '<x:ExcelWorksheet>';
        docFile += '<x:Name>';
        docFile += docName;
        docFile += '</x:Name>';
        docFile += '<x:WorksheetOptions>';
        docFile += '<x:DisplayGridlines/>';
        if (defaults.mso.rtl)
          docFile += '<x:DisplayRightToLeft/>';
        docFile += '</x:WorksheetOptions>';
        docFile += '</x:ExcelWorksheet>';
        docFile += '</x:ExcelWorksheets>';
        docFile += '</x:ExcelWorkbook>';
        docFile += '</xml>';
        docFile += '<![endif]-->';
      }
      docFile += '<style>';

      docFile += '@page { size:' + defaults.mso.pageOrientation + '; mso-page-orientation:' + defaults.mso.pageOrientation + '; }';
      docFile += '@page Section1 {size:' + pageFormats[defaults.mso.pageFormat][0] + 'pt ' + pageFormats[defaults.mso.pageFormat][1] + 'pt';
      docFile += '; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}';
      docFile += 'div.Section1 {page:Section1;}';
      docFile += '@page Section2 {size:' + pageFormats[defaults.mso.pageFormat][1] + 'pt ' + pageFormats[defaults.mso.pageFormat][0] + 'pt';
      docFile += ';mso-page-orientation:' + defaults.mso.pageOrientation + ';margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}';
      docFile += 'div.Section2 {page:Section2;}';

      docFile += 'br {mso-data-placement:same-cell;}';
      docFile += '</style>';
      docFile += '</head>';
      docFile += '<body>';
      docFile += '<div class="Section' + ((defaults.mso.pageOrientation === 'landscape') ? '2' : '1') + '">';
      docFile += docData;
      docFile += '</div>';
      docFile += '</body>';
      docFile += '</html>';

      if (defaults.outputMode === 'string')
        return docFile;

      if (defaults.outputMode === 'base64')
        return base64encode(docFile);

      saveToFile(docFile, defaults.fileName + '.' + MSDocExt, 'application/vnd.ms-' + MSDocType, '', 'base64', false);
    } else if (defaults.type === 'png') {
      html2canvas($(el)[0]).then(
        function (canvas) {

          var image = canvas.toDataURL();
          var byteString = atob(image.substring(22)); // remove data stuff
          var buffer = new ArrayBuffer(byteString.length);
          var intArray = new Uint8Array(buffer);

          for (var i = 0; i < byteString.length; i++)
            intArray[i] = byteString.charCodeAt(i);

          if (defaults.outputMode === 'string')
            return byteString;

          if (defaults.outputMode === 'base64')
            return base64encode(image);

          if (defaults.outputMode === 'window') {
            window.open(image);
            return;
          }

          saveToFile(buffer, defaults.fileName + '.png', 'image/png', '', '', false);
        });

    } else if (defaults.type === 'pdf') {

      if (defaults.pdfmake.enabled === true) {
        // pdf output using pdfmake
        // https://github.com/bpampuch/pdfmake

        var widths = [];
        var body = [];
        rowIndex = 0;
        ranges = [];

        /**
         * @return {number}
         */
        var CollectPdfmakeData = function ($rows, colselector, length) {
          var rlength = 0;

          $($rows).each(function () {
            var r = [];

            ForEachVisibleCell(this, colselector, rowIndex, length,
              function (cell, row, col) {
                if (typeof cell !== 'undefined' && cell !== null) {

                  var colspan = getColspan(cell);
                  var rowspan = getRowspan(cell);

                  var cellValue = parseString(cell, row, col) || ' ';

                  if (colspan > 1 || rowspan > 1) {
                    colspan = colspan || 1;
                    rowspan = rowspan || 1;
                    r.push({colSpan: colspan, rowSpan: rowspan, text: cellValue});
                  } else
                    r.push(cellValue);
                } else
                  r.push(' ');
              });

            if (r.length)
              body.push(r);

            if (rlength < r.length)
              rlength = r.length;

            rowIndex++;
          });

          return rlength;
        };

        $hrows = collectHeadRows($(this));

        var colcount = CollectPdfmakeData($hrows, 'th,td', $hrows.length);

        for (var i = widths.length; i < colcount; i++)
          widths.push('*');

        // Data
        $rows = collectRows($(this));

        CollectPdfmakeData($rows, 'th,td', $hrows.length + $rows.length);

        var docDefinition = {
          content: [{
            table: {
              headerRows: $hrows.length,
              widths: widths,
              body: body
            }
          }]
        };

        $.extend(true, docDefinition, defaults.pdfmake.docDefinition);

        pdfMake.fonts = {
          Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
          }
        };

        $.extend(true, pdfMake.fonts, defaults.pdfmake.fonts);

        pdfMake.createPdf(docDefinition).getBuffer(function (buffer) {
          saveToFile(buffer, defaults.fileName + '.pdf', 'application/pdf', '', '', false);
        });

      } else if (defaults.jspdf.autotable === false) {
        // pdf output using jsPDF's core html support

        var addHtmlOptions = {
          dim: {
            w: getPropertyUnitValue($(el).first().get(0), 'width', 'mm'),
            h: getPropertyUnitValue($(el).first().get(0), 'height', 'mm')
          },
          pagesplit: false
        };

        var doc = new jsPDF(defaults.jspdf.orientation, defaults.jspdf.unit, defaults.jspdf.format);
        doc.addHTML($(el).first(),
          defaults.jspdf.margins.left,
          defaults.jspdf.margins.top,
          addHtmlOptions,
          function () {
            jsPdfOutput(doc, false);
          });
        //delete doc;
      } else {
        // pdf output using jsPDF AutoTable plugin
        // https://github.com/simonbengtsson/jsPDF-AutoTable

        var teOptions = defaults.jspdf.autotable.tableExport;

        // When setting jspdf.format to 'bestfit' tableExport tries to choose
        // the minimum required paper format and orientation in which the table
        // (or tables in multitable mode) completely fits without column adjustment
        if (typeof defaults.jspdf.format === 'string' && defaults.jspdf.format.toLowerCase() === 'bestfit') {
          var rk = '', ro = '';
          var mw = 0;

          $(el).each(function () {
            if (isVisible($(this))) {
              var w = getPropertyUnitValue($(this).get(0), 'width', 'pt');

              if (w > mw) {
                if (w > pageFormats.a0[0]) {
                  rk = 'a0';
                  ro = 'l';
                }
                for (var key in pageFormats) {
                  if (pageFormats.hasOwnProperty(key)) {
                    if (pageFormats[key][1] > w) {
                      rk = key;
                      ro = 'l';
                      if (pageFormats[key][0] > w)
                        ro = 'p';
                    }
                  }
                }
                mw = w;
              }
            }
          });
          defaults.jspdf.format = (rk === '' ? 'a4' : rk);
          defaults.jspdf.orientation = (ro === '' ? 'w' : ro);
        }

        // The jsPDF doc object is stored in defaults.jspdf.autotable.tableExport,
        // thus it can be accessed from any callback function
        if (teOptions.doc == null) {
          teOptions.doc = new jsPDF(defaults.jspdf.orientation,
            defaults.jspdf.unit,
            defaults.jspdf.format);
          teOptions.wScaleFactor = 1;
          teOptions.hScaleFactor = 1;

          if (typeof defaults.jspdf.onDocCreated === 'function')
            defaults.jspdf.onDocCreated(teOptions.doc);
        }

        if (teOptions.outputImages === true)
          teOptions.images = {};

        if (typeof teOptions.images !== 'undefined') {
          $(el).filter(function () {
            return isVisible($(this));
          }).each(function () {
            var rowCount = 0;
            ranges = [];

            if (defaults.exportHiddenCells === false) {
              $hiddenTableElements = $(this).find('tr, th, td').filter(':hidden');
              checkCellVisibilty = $hiddenTableElements.length > 0;
            }

            $hrows = collectHeadRows($(this));
            $rows = collectRows($(this));

            $($rows).each(function () {
              ForEachVisibleCell(this, 'td,th', $hrows.length + rowCount, $hrows.length + $rows.length,
                function (cell) {
                  collectImages(cell, $(cell).children(), teOptions);
                });
              rowCount++;
            });
          });

          $hrows = [];
          $rows = [];
        }

        loadImages(teOptions, function () {
          $(el).filter(function () {
            return isVisible($(this));
          }).each(function () {
            var colKey;
            rowIndex = 0;
            ranges = [];

            if (defaults.exportHiddenCells === false) {
              $hiddenTableElements = $(this).find('tr, th, td').filter(':hidden');
              checkCellVisibilty = $hiddenTableElements.length > 0;
            }

            colNames = GetColumnNames(this);

            teOptions.columns = [];
            teOptions.rows = [];
            teOptions.teCells = {};

            // onTable: optional callback function for every matching table that can be used
            // to modify the tableExport options or to skip the output of a particular table
            // if the table selector targets multiple tables
            if (typeof teOptions.onTable === 'function')
              if (teOptions.onTable($(this), defaults) === false)
                return true; // continue to next iteration step (table)

            // each table works with an own copy of AutoTable options
            defaults.jspdf.autotable.tableExport = null;  // avoid deep recursion error
            var atOptions = $.extend(true, {}, defaults.jspdf.autotable);
            defaults.jspdf.autotable.tableExport = teOptions;

            atOptions.margin = {};
            $.extend(true, atOptions.margin, defaults.jspdf.margins);
            atOptions.tableExport = teOptions;

            // Fix jsPDF Autotable's row height calculation
            if (typeof atOptions.beforePageContent !== 'function') {
              atOptions.beforePageContent = function (data) {
                if (data.pageCount === 1) {
                  var all = data.table.rows.concat(data.table.headerRow);
                  $.each(all, function () {
                    var row = this;
                    if (row.height > 0) {
                      row.height += (2 - FONT_ROW_RATIO) / 2 * row.styles.fontSize;
                      data.table.height += (2 - FONT_ROW_RATIO) / 2 * row.styles.fontSize;
                    }
                  });
                }
              };
            }

            if (typeof atOptions.createdHeaderCell !== 'function') {
              // apply some original css styles to pdf header cells
              atOptions.createdHeaderCell = function (cell, data) {

                // jsPDF AutoTable plugin v2.0.14 fix: each cell needs its own styles object
                cell.styles = $.extend({}, data.row.styles);

                if (typeof teOptions.columns [data.column.dataKey] !== 'undefined') {
                  var col = teOptions.columns [data.column.dataKey];

                  if (typeof col.rect !== 'undefined') {
                    var rh;

                    cell.contentWidth = col.rect.width;

                    if (typeof teOptions.heightRatio === 'undefined' || teOptions.heightRatio === 0) {
                      if (data.row.raw [data.column.dataKey].rowspan)
                        rh = data.row.raw [data.column.dataKey].rect.height / data.row.raw [data.column.dataKey].rowspan;
                      else
                        rh = data.row.raw [data.column.dataKey].rect.height;

                      teOptions.heightRatio = cell.styles.rowHeight / rh;
                    }

                    rh = data.row.raw [data.column.dataKey].rect.height * teOptions.heightRatio;
                    if (rh > cell.styles.rowHeight)
                      cell.styles.rowHeight = rh;
                  }

                  cell.styles.halign = (atOptions.headerStyles.halign === 'inherit') ? 'center' : atOptions.headerStyles.halign;
                  cell.styles.valign = atOptions.headerStyles.valign;

                  if (typeof col.style !== 'undefined' && col.style.hidden !== true) {
                    if (atOptions.headerStyles.halign === 'inherit')
                      cell.styles.halign = col.style.align;
                    if (atOptions.styles.fillColor === 'inherit')
                      cell.styles.fillColor = col.style.bcolor;
                    if (atOptions.styles.textColor === 'inherit')
                      cell.styles.textColor = col.style.color;
                    if (atOptions.styles.fontStyle === 'inherit')
                      cell.styles.fontStyle = col.style.fstyle;
                  }
                }
              };
            }

            if (typeof atOptions.createdCell !== 'function') {
              // apply some original css styles to pdf table cells
              atOptions.createdCell = function (cell, data) {
                var tecell = teOptions.teCells [data.row.index + ':' + data.column.dataKey];

                cell.styles.halign = (atOptions.styles.halign === 'inherit') ? 'center' : atOptions.styles.halign;
                cell.styles.valign = atOptions.styles.valign;

                if (typeof tecell !== 'undefined' && typeof tecell.style !== 'undefined' && tecell.style.hidden !== true) {
                  if (atOptions.styles.halign === 'inherit')
                    cell.styles.halign = tecell.style.align;
                  if (atOptions.styles.fillColor === 'inherit')
                    cell.styles.fillColor = tecell.style.bcolor;
                  if (atOptions.styles.textColor === 'inherit')
                    cell.styles.textColor = tecell.style.color;
                  if (atOptions.styles.fontStyle === 'inherit')
                    cell.styles.fontStyle = tecell.style.fstyle;
                }
              };
            }

            if (typeof atOptions.drawHeaderCell !== 'function') {
              atOptions.drawHeaderCell = function (cell, data) {
                var colopt = teOptions.columns [data.column.dataKey];

                if ((colopt.style.hasOwnProperty('hidden') !== true || colopt.style.hidden !== true) &&
                  colopt.rowIndex >= 0)
                  return prepareAutoTableText(cell, data, colopt);
                else
                  return false; // cell is hidden
              };
            }

            if (typeof atOptions.drawCell !== 'function') {
              atOptions.drawCell = function (cell, data) {
                var tecell = teOptions.teCells [data.row.index + ':' + data.column.dataKey];
                var draw2canvas = (typeof tecell !== 'undefined' && tecell.isCanvas);

                if (draw2canvas !== true) {
                  if (prepareAutoTableText(cell, data, tecell)) {

                    teOptions.doc.rect(cell.x, cell.y, cell.width, cell.height, cell.styles.fillStyle);

                    if (typeof tecell !== 'undefined' &&
                      typeof tecell.elements !== 'undefined' && tecell.elements.length) {

                      var hScale = cell.height / tecell.rect.height;
                      if (hScale > teOptions.hScaleFactor)
                        teOptions.hScaleFactor = hScale;
                      teOptions.wScaleFactor = cell.width / tecell.rect.width;

                      var ySave = cell.textPos.y;
                      drawAutotableElements(cell, tecell.elements, teOptions);
                      cell.textPos.y = ySave;

                      drawAutotableText(cell, tecell.elements, teOptions);
                    } else
                      drawAutotableText(cell, {}, teOptions);
                  }
                } else {
                  var container = tecell.elements[0];
                  var imgId = $(container).attr('data-tableexport-canvas');
                  var r = container.getBoundingClientRect();

                  cell.width = r.width * teOptions.wScaleFactor;
                  cell.height = r.height * teOptions.hScaleFactor;
                  data.row.height = cell.height;

                  jsPdfDrawImage(cell, container, imgId, teOptions);
                }
                return false;
              };
            }

            // collect header and data rows
            teOptions.headerrows = [];
            $hrows = collectHeadRows($(this));
            $($hrows).each(function () {
              colKey = 0;
              teOptions.headerrows[rowIndex] = [];

              ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length,
                function (cell, row, col) {
                  var obj = getCellStyles(cell);
                  obj.title = parseString(cell, row, col);
                  obj.key = colKey++;
                  obj.rowIndex = rowIndex;
                  teOptions.headerrows[rowIndex].push(obj);
                });
              rowIndex++;
            });

            if (rowIndex > 0) {
              // iterate through last row
              var lastrow = rowIndex - 1;
              while (lastrow >= 0) {
                $.each(teOptions.headerrows[lastrow], function () {
                  var obj = this;

                  if (lastrow > 0 && this.rect === null)
                    obj = teOptions.headerrows[lastrow - 1][this.key];

                  if (obj !== null && obj.rowIndex >= 0 &&
                    (obj.style.hasOwnProperty('hidden') !== true || obj.style.hidden !== true))
                    teOptions.columns.push(obj);
                });

                lastrow = (teOptions.columns.length > 0) ? -1 : lastrow - 1;
              }
            }

            var rowCount = 0;
            $rows = [];
            $rows = collectRows($(this));
            $($rows).each(function () {
              var rowData = [];
              colKey = 0;

              ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length,
                function (cell, row, col) {
                  var obj;

                  if (typeof teOptions.columns[colKey] === 'undefined') {
                    // jsPDF-Autotable needs columns. Thus define hidden ones for tables without thead
                    obj = {
                      title: '',
                      key: colKey,
                      style: {
                        hidden: true
                      }
                    };
                    teOptions.columns.push(obj);
                  }
                  if (typeof cell !== 'undefined' && cell !== null) {
                    obj = getCellStyles(cell);
                    obj.isCanvas = cell.hasAttribute('data-tableexport-canvas');
                    obj.elements = obj.isCanvas ? $(cell) : $(cell).children();
                    teOptions.teCells [rowCount + ':' + colKey++] = obj;
                  } else {
                    obj = $.extend(true, {}, teOptions.teCells [rowCount + ':' + (colKey - 1)]);
                    obj.colspan = -1;
                    teOptions.teCells [rowCount + ':' + colKey++] = obj;
                  }

                  rowData.push(parseString(cell, row, col));
                });
              if (rowData.length) {
                teOptions.rows.push(rowData);
                rowCount++;
              }
              rowIndex++;
            });

            // onBeforeAutotable: optional callback function before calling
            // jsPDF AutoTable that can be used to modify the AutoTable options
            if (typeof teOptions.onBeforeAutotable === 'function')
              teOptions.onBeforeAutotable($(this), teOptions.columns, teOptions.rows, atOptions);

            teOptions.doc.autoTable(teOptions.columns, teOptions.rows, atOptions);

            // onAfterAutotable: optional callback function after returning
            // from jsPDF AutoTable that can be used to modify the AutoTable options
            if (typeof teOptions.onAfterAutotable === 'function')
              teOptions.onAfterAutotable($(this), atOptions);

            // set the start position for the next table (in case there is one)
            defaults.jspdf.autotable.startY = teOptions.doc.autoTableEndPosY() + atOptions.margin.top;

          });

          jsPdfOutput(teOptions.doc, (typeof teOptions.images !== 'undefined' && jQuery.isEmptyObject(teOptions.images) === false));

          if (typeof teOptions.headerrows !== 'undefined')
            teOptions.headerrows.length = 0;
          if (typeof teOptions.columns !== 'undefined')
            teOptions.columns.length = 0;
          if (typeof teOptions.rows !== 'undefined')
            teOptions.rows.length = 0;
          delete teOptions.doc;
          teOptions.doc = null;
        });
      }
    }

    function collectHeadRows ($table) {
      var result = [];
      findTableElements($table, 'thead').each(function () {
        result.push.apply(result, findTableElements($(this), defaults.theadSelector).toArray());
      });
      return result;
    }

    function collectRows ($table) {
      var result = [];
      findTableElements($table, 'tbody').each(function () {
        result.push.apply(result, findTableElements($(this), defaults.tbodySelector).toArray());
      });
      if (defaults.tfootSelector.length) {
        findTableElements($table, 'tfoot').each(function () {
          result.push.apply(result, findTableElements($(this), defaults.tfootSelector).toArray());
        });
      }
      return result;
    }

    function findTableElements ($parent, selector) {
      var parentSelector = $parent[0].tagName;
      var parentLevel = $parent.parents(parentSelector).length;
      return $parent.find(selector).filter(function () {
        return parentLevel === $(this).closest(parentSelector).parents(parentSelector).length;
      });
    }

    function GetColumnNames (table) {
      var result = [];
      $(table).find('thead').first().find('th').each(function (index, el) {
        if ($(el).attr('data-field') !== undefined)
          result[index] = $(el).attr('data-field');
        else
          result[index] = index.toString();
      });
      return result;
    }

    function isVisible ($element) {
      var isRow = typeof $element[0].rowIndex !== 'undefined';
      var isCell = isRow === false && typeof $element[0].cellIndex !== 'undefined';
      var isElementVisible = (isCell || isRow) ? isTableElementVisible($element) : $element.is(':visible');
      var tableexportDisplay = $element.attr('data-tableexport-display');

      if (isCell && tableexportDisplay !== 'none' && tableexportDisplay !== 'always') {
        $element = $($element[0].parentNode);
        isRow = typeof $element[0].rowIndex !== 'undefined';
        tableexportDisplay = $element.attr('data-tableexport-display');
      }
      if (isRow && tableexportDisplay !== 'none' && tableexportDisplay !== 'always') {
        tableexportDisplay = $element.closest('table').attr('data-tableexport-display');
      }

      return tableexportDisplay !== 'none' && (isElementVisible === true || tableexportDisplay === 'always');
    }

    function isTableElementVisible ($element) {
      var hiddenEls = [];

      if (checkCellVisibilty) {
        hiddenEls = $hiddenTableElements.filter(function () {
          var found = false;

          if (this.nodeType === $element[0].nodeType) {
            if (typeof this.rowIndex !== 'undefined' && this.rowIndex === $element[0].rowIndex)
              found = true;
            else if (typeof this.cellIndex !== 'undefined' && this.cellIndex === $element[0].cellIndex &&
              typeof this.parentNode.rowIndex !== 'undefined' &&
              typeof $element[0].parentNode.rowIndex !== 'undefined' &&
              this.parentNode.rowIndex === $element[0].parentNode.rowIndex)
              found = true;
          }
          return found;
        });
      }
      return (checkCellVisibilty === false || hiddenEls.length === 0);
    }

    function isColumnIgnored ($cell, rowLength, colIndex) {
      var result = false;

      if (isVisible($cell)) {
        if (defaults.ignoreColumn.length > 0) {
          if ($.inArray(colIndex, defaults.ignoreColumn) !== -1 ||
            $.inArray(colIndex - rowLength, defaults.ignoreColumn) !== -1 ||
            (colNames.length > colIndex && typeof colNames[colIndex] !== 'undefined' &&
              $.inArray(colNames[colIndex], defaults.ignoreColumn) !== -1))
            result = true;
        }
      } else
        result = true;

      return result;
    }

    function ForEachVisibleCell (tableRow, selector, rowIndex, rowCount, cellcallback) {
      if (typeof (cellcallback) === 'function') {
        var ignoreRow = false;

        if (typeof defaults.onIgnoreRow === 'function')
          ignoreRow = defaults.onIgnoreRow($(tableRow), rowIndex);

        if (ignoreRow === false &&
          (defaults.ignoreRow.length === 0 ||
            ($.inArray(rowIndex, defaults.ignoreRow) === -1 &&
              $.inArray(rowIndex - rowCount, defaults.ignoreRow) === -1)) &&
          isVisible($(tableRow))) {

          var $cells = findTableElements($(tableRow), selector);
          var cellCount = 0;

          $cells.each(function (colIndex) {
            var $cell = $(this);
            var c;
            var colspan = getColspan(this);
            var rowspan = getRowspan(this);

            // Skip ranges
            $.each(ranges, function () {
              var range = this;
              if (rowIndex >= range.s.r && rowIndex <= range.e.r && cellCount >= range.s.c && cellCount <= range.e.c) {
                for (c = 0; c <= range.e.c - range.s.c; ++c)
                  cellcallback(null, rowIndex, cellCount++);
              }
            });

            if (isColumnIgnored($cell, $cells.length, colIndex) === false) {
              // Handle Row Span
              if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({
                  s: {r: rowIndex, c: cellCount},
                  e: {r: rowIndex + rowspan - 1, c: cellCount + colspan - 1}
                });
              }

              // Handle Value
              cellcallback(this, rowIndex, cellCount++);
            }

            // Handle Colspan
            if (colspan)
              for (c = 0; c < colspan - 1; ++c)
                cellcallback(null, rowIndex, cellCount++);
          });

          // Skip ranges
          $.each(ranges, function () {
            var range = this;
            if (rowIndex >= range.s.r && rowIndex <= range.e.r && cellCount >= range.s.c && cellCount <= range.e.c) {
              for (c = 0; c <= range.e.c - range.s.c; ++c)
                cellcallback(null, rowIndex, cellCount++);
            }
          });
        }
      }
    }

    function jsPdfDrawImage (cell, container, imgId, teOptions) {
      if (typeof teOptions.images !== 'undefined') {
        var image = teOptions.images[imgId];

        if (typeof image !== 'undefined') {
          var r = container.getBoundingClientRect();
          var arCell = cell.width / cell.height;
          var arImg = r.width / r.height;
          var imgWidth = cell.width;
          var imgHeight = cell.height;
          var px2pt = 0.264583 * 72 / 25.4;
          var uy = 0;

          if (arImg <= arCell) {
            imgHeight = Math.min(cell.height, r.height);
            imgWidth = r.width * imgHeight / r.height;
          } else if (arImg > arCell) {
            imgWidth = Math.min(cell.width, r.width);
            imgHeight = r.height * imgWidth / r.width;
          }

          imgWidth *= px2pt;
          imgHeight *= px2pt;

          if (imgHeight < cell.height)
            uy = (cell.height - imgHeight) / 2;

          try {
            teOptions.doc.addImage(image.src, cell.textPos.x, cell.y + uy, imgWidth, imgHeight);
          } catch (e) {
            // TODO: IE -> convert png to jpeg
          }
          cell.textPos.x += imgWidth;
        }
      }
    }

    function jsPdfOutput (doc, hasimages) {
      if (defaults.outputMode === 'string')
        return doc.output();

      if (defaults.outputMode === 'base64')
        return base64encode(doc.output());

      if (defaults.outputMode === 'window') {
        window.URL = window.URL || window.webkitURL;
        window.open(window.URL.createObjectURL(doc.output('blob')));
        return;
      }

      try {
        var blob = doc.output('blob');
        saveAs(blob, defaults.fileName + '.pdf');
      } catch (e) {
        downloadFile(defaults.fileName + '.pdf',
          'data:application/pdf' + (hasimages ? '' : ';base64') + ',',
          hasimages ? doc.output('blob') : doc.output());
      }
    }

    function prepareAutoTableText (cell, data, cellopt) {
      var cs = 0;
      if (typeof cellopt !== 'undefined')
        cs = cellopt.colspan;

      if (cs >= 0) {
        // colspan handling
        var cellWidth = cell.width;
        var textPosX = cell.textPos.x;
        var i = data.table.columns.indexOf(data.column);

        for (var c = 1; c < cs; c++) {
          var column = data.table.columns[i + c];
          cellWidth += column.width;
        }

        if (cs > 1) {
          if (cell.styles.halign === 'right')
            textPosX = cell.textPos.x + cellWidth - cell.width;
          else if (cell.styles.halign === 'center')
            textPosX = cell.textPos.x + (cellWidth - cell.width) / 2;
        }

        cell.width = cellWidth;
        cell.textPos.x = textPosX;

        if (typeof cellopt !== 'undefined' && cellopt.rowspan > 1)
          cell.height = cell.height * cellopt.rowspan;

        // fix jsPDF's calculation of text position
        if (cell.styles.valign === 'middle' || cell.styles.valign === 'bottom') {
          var splittedText = typeof cell.text === 'string' ? cell.text.split(/\r\n|\r|\n/g) : cell.text;
          var lineCount = splittedText.length || 1;
          if (lineCount > 2)
            cell.textPos.y -= ((2 - FONT_ROW_RATIO) / 2 * data.row.styles.fontSize) * (lineCount - 2) / 3;
        }
        return true;
      } else
        return false; // cell is hidden (colspan = -1), don't draw it
    }

    function collectImages (cell, elements, teOptions) {
      if (typeof cell !== 'undefined' && cell !== null) {

        if (cell.hasAttribute('data-tableexport-canvas')) {
          var imgId = new Date().getTime();
          $(cell).attr('data-tableexport-canvas', imgId);

          teOptions.images[imgId] = {
            url: '[data-tableexport-canvas="' + imgId + '"]',
            src: null
          };
        } else if (elements !== 'undefined' && elements != null) {
          elements.each(function () {
            if ($(this).is('img')) {
              var imgId = strHashCode(this.src);
              teOptions.images[imgId] = {
                url: this.src,
                src: this.src
              };
            }
            collectImages(cell, $(this).children(), teOptions);
          });
        }
      }
    }

    function loadImages (teOptions, callback) {
      var imageCount = 0;
      var pendingCount = 0;

      function done () {
        callback(imageCount);
      }

      function loadImage (image) {
        if (image.url) {
          if (!image.src) {
            var $imgContainer = $(image.url);
            if ($imgContainer.length) {
              imageCount = ++pendingCount;

              html2canvas($imgContainer[0]).then(function (canvas) {
                image.src = canvas.toDataURL('image/png');
                if (!--pendingCount)
                  done();
              });
            }
          } else {
            var img = new Image();
            imageCount = ++pendingCount;
            img.crossOrigin = 'Anonymous';
            img.onerror = img.onload = function () {
              if (img.complete) {

                if (img.src.indexOf('data:image/') === 0) {
                  img.width = image.width || img.width || 0;
                  img.height = image.height || img.height || 0;
                }

                if (img.width + img.height) {
                  var canvas = document.createElement('canvas');
                  var ctx = canvas.getContext('2d');

                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);

                  image.src = canvas.toDataURL('image/png');
                }
              }
              if (!--pendingCount)
                done();
            };
            img.src = image.url;
          }
        }
      }

      if (typeof teOptions.images !== 'undefined') {
        for (var i in teOptions.images)
          if (teOptions.images.hasOwnProperty(i))
            loadImage(teOptions.images[i]);
      }

      return pendingCount || done();
    }

    function drawAutotableElements (cell, elements, teOptions) {
      elements.each(function () {
        if ($(this).is('div')) {
          var bcolor = rgb2array(getStyle(this, 'background-color'), [255, 255, 255]);
          var lcolor = rgb2array(getStyle(this, 'border-top-color'), [0, 0, 0]);
          var lwidth = getPropertyUnitValue(this, 'border-top-width', defaults.jspdf.unit);

          var r = this.getBoundingClientRect();
          var ux = this.offsetLeft * teOptions.wScaleFactor;
          var uy = this.offsetTop * teOptions.hScaleFactor;
          var uw = r.width * teOptions.wScaleFactor;
          var uh = r.height * teOptions.hScaleFactor;

          teOptions.doc.setDrawColor.apply(undefined, lcolor);
          teOptions.doc.setFillColor.apply(undefined, bcolor);
          teOptions.doc.setLineWidth(lwidth);
          teOptions.doc.rect(cell.x + ux, cell.y + uy, uw, uh, lwidth ? 'FD' : 'F');
        } else if ($(this).is('img')) {
          var imgId = strHashCode(this.src);
          jsPdfDrawImage(cell, this, imgId, teOptions);
        }

        drawAutotableElements(cell, $(this).children(), teOptions);
      });
    }

    function drawAutotableText (cell, texttags, teOptions) {
      if (typeof teOptions.onAutotableText === 'function') {
        teOptions.onAutotableText(teOptions.doc, cell, texttags);
      } else {
        var x = cell.textPos.x;
        var y = cell.textPos.y;
        var style = {halign: cell.styles.halign, valign: cell.styles.valign};

        if (texttags.length) {
          var tag = texttags[0];
          while (tag.previousSibling)
            tag = tag.previousSibling;

          var b = false, i = false;

          while (tag) {
            var txt = tag.innerText || tag.textContent || '';
            var leadingspace = (txt.length && txt[0] === ' ') ? ' ' : '';
            var trailingspace = (txt.length > 1 && txt[txt.length - 1] === ' ') ? ' ' : '';

            if (defaults.preserve.leadingWS !== true)
              txt = leadingspace + trimLeft(txt);
            if (defaults.preserve.trailingWS !== true)
              txt = trimRight(txt) + trailingspace;

            if ($(tag).is('br')) {
              x = cell.textPos.x;
              y += teOptions.doc.internal.getFontSize();
            }

            if ($(tag).is('b'))
              b = true;
            else if ($(tag).is('i'))
              i = true;

            if (b || i)
              teOptions.doc.setFontType((b && i) ? 'bolditalic' : b ? 'bold' : 'italic');

            var w = teOptions.doc.getStringUnitWidth(txt) * teOptions.doc.internal.getFontSize();

            if (w) {
              if (cell.styles.overflow === 'linebreak' &&
                x > cell.textPos.x && (x + w) > (cell.textPos.x + cell.width)) {
                var chars = '.,!%*;:=-';
                if (chars.indexOf(txt.charAt(0)) >= 0) {
                  var s = txt.charAt(0);
                  w = teOptions.doc.getStringUnitWidth(s) * teOptions.doc.internal.getFontSize();
                  if ((x + w) <= (cell.textPos.x + cell.width)) {
                    teOptions.doc.autoTableText(s, x, y, style);
                    txt = txt.substring(1, txt.length);
                  }
                  w = teOptions.doc.getStringUnitWidth(txt) * teOptions.doc.internal.getFontSize();
                }
                x = cell.textPos.x;
                y += teOptions.doc.internal.getFontSize();
              }

              if (cell.styles.overflow !== 'visible') {
                while (txt.length && (x + w) > (cell.textPos.x + cell.width)) {
                  txt = txt.substring(0, txt.length - 1);
                  w = teOptions.doc.getStringUnitWidth(txt) * teOptions.doc.internal.getFontSize();
                }
              }

              teOptions.doc.autoTableText(txt, x, y, style);
              x += w;
            }

            if (b || i) {
              if ($(tag).is('b'))
                b = false;
              else if ($(tag).is('i'))
                i = false;

              teOptions.doc.setFontType((!b && !i) ? 'normal' : b ? 'bold' : 'italic');
            }

            tag = tag.nextSibling;
          }
          cell.textPos.x = x;
          cell.textPos.y = y;
        } else {
          teOptions.doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, style);
        }
      }
    }

    function escapeRegExp (string) {
      return string == null ? '' : string.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    }

    function replaceAll (string, find, replace) {
      return string == null ? '' : string.toString().replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    function trimLeft (string) {
      return string == null ? '' : string.toString().replace(/^\s+/, '');
    }

    function trimRight (string) {
      return string == null ? '' : string.toString().replace(/\s+$/, '');
    }

    function parseDateUTC (s) {
      defaults.date.pattern.lastIndex = 0;

      var match = defaults.date.pattern.exec(s);
      if (match == null)
        return false;

      var y = +match[defaults.date.match_y];
      if (y < 0 || y > 8099) return false;
      var m = match[defaults.date.match_m] * 1;
      var d = match[defaults.date.match_d] * 1;
      if (!isFinite(d)) return false;

      var o = new Date(y, m - 1, d, 0, 0, 0);
      if (o.getFullYear() === y && o.getMonth() === (m - 1) && o.getDate() === d)
        return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
      else
        return false;
    }

    function parseNumber (value) {
      value = value || '0';
      if ('' !== defaults.numbers.html.thousandsSeparator)
        value = replaceAll(value, defaults.numbers.html.thousandsSeparator, '');
      if ('.' !== defaults.numbers.html.decimalMark)
        value = replaceAll(value, defaults.numbers.html.decimalMark, '.');

      return typeof value === 'number' || jQuery.isNumeric(value) !== false ? value : false;
    }

    function parsePercent (value) {
      if (value.indexOf('%') > -1) {
        value = parseNumber(value.replace(/%/g, ''));
        if (value !== false)
          value = value / 100;
      } else
        value = false;
      return value;
    }

    function parseString (cell, rowIndex, colIndex, cellInfo) {
      var result = '';
      var cellType = 'text';

      if (cell !== null) {
        var $cell = $(cell);
        var htmlData;

        if ($cell[0].hasAttribute('data-tableexport-canvas')) {
          htmlData = '';
        } else if ($cell[0].hasAttribute('data-tableexport-value')) {
          htmlData = $cell.attr('data-tableexport-value');
          htmlData = htmlData ? htmlData + '' : '';
        } else {
          htmlData = $cell.html();

          if (typeof defaults.onCellHtmlData === 'function')
            htmlData = defaults.onCellHtmlData($cell, rowIndex, colIndex, htmlData);
          else if (htmlData !== '') {
            var html = $.parseHTML(htmlData);
            var inputidx = 0;
            var selectidx = 0;

            htmlData = '';
            $.each(html, function () {
              if ($(this).is('input'))
                htmlData += $cell.find('input').eq(inputidx++).val();
              else if ($(this).is('select'))
                htmlData += $cell.find('select option:selected').eq(selectidx++).text();
              else if ($(this).is('br'))
                htmlData += '<br>';
              else {
                if (typeof $(this).html() === 'undefined')
                  htmlData += $(this).text();
                else if (jQuery().bootstrapTable === undefined ||
                  ($(this).hasClass('fht-cell') === false &&  // BT 4
                    $(this).hasClass('filterControl') === false &&
                    $cell.parents('.detail-view').length === 0))
                  htmlData += $(this).html();

                if ($(this).is('a')) {
                  var href = $cell.find('a').attr('href') || '';
                  if (typeof defaults.onCellHtmlHyperlink === 'function')
                    result += defaults.onCellHtmlHyperlink($cell, rowIndex, colIndex, href, htmlData);
                  else if (defaults.htmlHyperlink === 'href')
                    result += href;
                  else // 'content'
                    result += htmlData;
                  htmlData = '';
                }
              }
            });
          }
        }

        if (htmlData && htmlData !== '' && defaults.htmlContent === true) {
          result = $.trim(htmlData);
        } else if (htmlData && htmlData !== '') {
          var cellFormat = $cell.attr('data-tableexport-cellformat');

          if (cellFormat !== '') {
            var text = htmlData.replace(/\n/g, '\u2028').replace(/(<\s*br([^>]*)>)/gi, '\u2060');
            var obj = $('<div/>').html(text).contents();
            var number = false;
            text = '';

            $.each(obj.text().split('\u2028'), function (i, v) {
              if (i > 0)
                text += ' ';

              if (defaults.preserve.leadingWS !== true)
                v = trimLeft(v);
              text += (defaults.preserve.trailingWS !== true) ? trimRight(v) : v;
            });

            $.each(text.split('\u2060'), function (i, v) {
              if (i > 0)
                result += '\n';

              if (defaults.preserve.leadingWS !== true)
                v = trimLeft(v);
              if (defaults.preserve.trailingWS !== true)
                v = trimRight(v);
              result += v.replace(/\u00AD/g, ''); // remove soft hyphens
            });

            result = result.replace(/\u00A0/g, ' '); // replace nbsp's with spaces

            if (defaults.type === 'json' ||
              (defaults.type === 'excel' && defaults.mso.fileFormat === 'xmlss') ||
              defaults.numbers.output === false) {
              number = parseNumber(result);

              if (number !== false) {
                cellType = 'number';
                result = Number(number);
              }
            } else if (defaults.numbers.html.decimalMark !== defaults.numbers.output.decimalMark ||
              defaults.numbers.html.thousandsSeparator !== defaults.numbers.output.thousandsSeparator) {
              number = parseNumber(result);

              if (number !== false) {
                var frac = ('' + number.substr(number < 0 ? 1 : 0)).split('.');
                if (frac.length === 1)
                  frac[1] = '';
                var mod = frac[0].length > 3 ? frac[0].length % 3 : 0;

                cellType = 'number';
                result = (number < 0 ? '-' : '') +
                  (defaults.numbers.output.thousandsSeparator ? ((mod ? frac[0].substr(0, mod) + defaults.numbers.output.thousandsSeparator : '') + frac[0].substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + defaults.numbers.output.thousandsSeparator)) : frac[0]) +
                  (frac[1].length ? defaults.numbers.output.decimalMark + frac[1] : '');
              }
            }
          } else
            result = htmlData;
        }

        if (defaults.escape === true) {
          //noinspection JSDeprecatedSymbols
          result = escape(result);
        }

        if (typeof defaults.onCellData === 'function') {
          result = defaults.onCellData($cell, rowIndex, colIndex, result, cellType);
        }
      }

      if (cellInfo !== undefined)
        cellInfo.type = cellType;

      return result;
    }

    function preventInjection (str) {
      if (str.length > 0 && defaults.preventInjection === true) {
        var chars = '=+-@';
        if (chars.indexOf(str.charAt(0)) >= 0)
          return ('\'' + str);
      }
      return str;
    }

    //noinspection JSUnusedLocalSymbols
    function hyphenate (a, b, c) {
      return b + '-' + c.toLowerCase();
    }

    function rgb2array (rgb_string, default_result) {
      var re = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
      var bits = re.exec(rgb_string);
      var result = default_result;
      if (bits)
        result = [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
      return result;
    }

    function getCellStyles (cell) {
      var a = getStyle(cell, 'text-align');
      var fw = getStyle(cell, 'font-weight');
      var fs = getStyle(cell, 'font-style');
      var f = '';
      if (a === 'start')
        a = getStyle(cell, 'direction') === 'rtl' ? 'right' : 'left';
      if (fw >= 700)
        f = 'bold';
      if (fs === 'italic')
        f += fs;
      if (f === '')
        f = 'normal';

      var result = {
        style: {
          align: a,
          bcolor: rgb2array(getStyle(cell, 'background-color'), [255, 255, 255]),
          color: rgb2array(getStyle(cell, 'color'), [0, 0, 0]),
          fstyle: f
        },
        colspan: getColspan(cell),
        rowspan: getRowspan(cell)
      };

      if (cell !== null) {
        var r = cell.getBoundingClientRect();
        result.rect = {
          width: r.width,
          height: r.height
        };
      }

      return result;
    }

    function getColspan (cell) {
      var result = $(cell).attr('data-tableexport-colspan');
      if (typeof result === 'undefined' && $(cell).is('[colspan]'))
        result = $(cell).attr('colspan');

      return (parseInt(result) || 0);
    }

    function getRowspan (cell) {
      var result = $(cell).attr('data-tableexport-rowspan');
      if (typeof result === 'undefined' && $(cell).is('[rowspan]'))
        result = $(cell).attr('rowspan');

      return (parseInt(result) || 0);
    }

    // get computed style property
    function getStyle (target, prop) {
      try {
        if (window.getComputedStyle) { // gecko and webkit
          prop = prop.replace(/([a-z])([A-Z])/, hyphenate);  // requires hyphenated, not camel
          return window.getComputedStyle(target, null).getPropertyValue(prop);
        }
        if (target.currentStyle) { // ie
          return target.currentStyle[prop];
        }
        return target.style[prop];
      } catch (e) {
      }
      return '';
    }

    function getUnitValue (parent, value, unit) {
      var baseline = 100;  // any number serves

      var temp = document.createElement('div');  // create temporary element
      temp.style.overflow = 'hidden';  // in case baseline is set too low
      temp.style.visibility = 'hidden';  // no need to show it

      parent.appendChild(temp); // insert it into the parent for em, ex and %

      temp.style.width = baseline + unit;
      var factor = baseline / temp.offsetWidth;

      parent.removeChild(temp);  // clean up

      return (value * factor);
    }

    function getPropertyUnitValue (target, prop, unit) {
      var value = getStyle(target, prop);  // get the computed style value

      var numeric = value.match(/\d+/);  // get the numeric component
      if (numeric !== null) {
        numeric = numeric[0];  // get the string

        return getUnitValue(target.parentElement, numeric, unit);
      }
      return 0;
    }

    function xlsxWorkbookToArrayBuffer (s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    function xlsxTableToSheet (table) {
      var ws = ({});
      var rows = table.getElementsByTagName('tr');
      var sheetRows = 10000000;
      var range = {s: {r: 0, c: 0}, e: {r: 0, c: 0}};
      var merges = [], midx = 0;
      var rowinfo = [];
      var _R = 0, R = 0, _C, C, RS, CS;
      var elt;
      var ssfTable = XLSX.SSF.get_table();

      for (; _R < rows.length && R < sheetRows; ++_R) {
        var row = rows[_R];

        var ignoreRow = false;
        if (typeof defaults.onIgnoreRow === 'function')
          ignoreRow = defaults.onIgnoreRow($(row), _R);

        if (ignoreRow === true ||
            (defaults.ignoreRow.length !== 0 &&
             ($.inArray(_R, defaults.ignoreRow) !== -1 ||
              $.inArray(_R - rows.length, defaults.ignoreRow) !== -1)) ||
            isVisible($(row)) === false) {
          continue;
        } 
        
        var elts = (row.children);
        var _CLength = 0;
        for (_C = 0; _C < elts.length; ++_C) {
          elt = elts[_C];
          CS = +getColspan(elt) || 1;
          _CLength += CS;
        }

        var CSOffset = 0;
        for (_C = C = 0; _C < elts.length; ++_C) {
          elt = elts[_C];
          CS = +getColspan(elt) || 1;

          var col = _C + CSOffset;
          if (isColumnIgnored($(elt), _CLength, col + (col < C ? C - col : 0)))
            continue;
          CSOffset += CS - 1;

          for (midx = 0; midx < merges.length; ++midx) {
            var m = merges[midx];
            if (m.s.c == C && m.s.r <= R && R <= m.e.r) {
              C = m.e.c + 1;
              midx = -1;
            }
          }

          if ((RS = +getRowspan(elt)) > 0 || CS > 1)
            merges.push({s: {r: R, c: C}, e: {r: R + (RS || 1) - 1, c: C + CS - 1}});

          var cellInfo = {type: ''};
          var v = parseString(elt, _R, _C + CSOffset, cellInfo);
          var o = {t: 's', v: v};
          var _t = '';
          var cellFormat = $(elt).attr('data-tableexport-cellformat');

          if (cellFormat !== '') {
            var ssfId = parseInt($(elt).attr('data-tableexport-xlsxformatid') || 0);

            if (ssfId === 0 &&
              typeof defaults.mso.xslx.formatId.numbers === 'function')
              ssfId = defaults.mso.xslx.formatId.numbers($(elt), _R, _C + CSOffset);

            if (ssfId === 0 &&
              typeof defaults.mso.xslx.formatId.date === 'function')
              ssfId = defaults.mso.xslx.formatId.date($(elt), _R, _C + CSOffset);

            if (ssfId === 49 || ssfId === '@')
              _t = 's';
            else if (cellInfo.type === 'number' ||
              (ssfId > 0 && ssfId < 14) || (ssfId > 36 && ssfId < 41) || ssfId === 48)
              _t = 'n';
            else if (cellInfo.type === 'date' ||
              (ssfId > 13 && ssfId < 37) || (ssfId > 44 && ssfId < 48) || ssfId === 56)
              _t = 'd';
          } else
            _t = 's';

          if (v != null) {
            var vd;

            if (v.length === 0)
              o.t = _t || 'z';
            else if (v.trim().length === 0 || _t === 's') {
            } else if (cellInfo.type === 'function')
              o = {f: v};
            else if (v === 'TRUE')
              o = {t: 'b', v: true};
            else if (v === 'FALSE')
              o = {t: 'b', v: false};
            else if (_t === '' && $(elt).find('a').length) {
              v = defaults.htmlHyperlink !== 'href' ? v : '';
              o = {f: '=HYPERLINK("' + $(elt).find('a').attr('href') + (v.length ? '","' + v : '') + '")'};
            } else if (_t === 'n' || isFinite(xlsxToNumber(v, defaults.numbers.output))) { // yes, defaults.numbers.output is right
              var vn = xlsxToNumber(v, defaults.numbers.output);
              if (ssfId === 0 && typeof defaults.mso.xslx.formatId.numbers !== 'function')
                ssfId = defaults.mso.xslx.formatId.numbers;
              if (isFinite(vn) || isFinite(v))
                o = {
                  t: 'n',
                  v: (isFinite(vn) ? vn : v),
                  z: (typeof ssfId === 'string') ? ssfId : (ssfId in ssfTable ? ssfTable[ssfId] : '0.00')
                };
            } else if ((vd = parseDateUTC(v)) !== false || _t === 'd') {
              if (ssfId === 0 && typeof defaults.mso.xslx.formatId.date !== 'function')
                ssfId = defaults.mso.xslx.formatId.date;
              o = {
                t: 'd',
                v: (vd !== false ? vd : v),
                z: (typeof ssfId === 'string') ? ssfId : (ssfId in ssfTable ? ssfTable[ssfId] : 'm/d/yy')
              };
            }
          }
          ws[xlsxEncodeCell({c: C, r: R})] = o;
          if (range.e.c < C)
            range.e.c = C;
          C += CS;
        }
        ++R;
      }
      if (merges.length) ws['!merges'] = merges;
      if (rowinfo.length) ws['!rows'] = rowinfo;
      range.e.r = R - 1;
      ws['!ref'] = xlsxEncodeRange(range);
      if (R >= sheetRows)
        ws['!fullref'] = xlsxEncodeRange((range.e.r = rows.length - _R + R - 1, range));
      return ws;
    }

    function xlsxEncodeRow (row) { return '' + (row + 1); }

    function xlsxEncodeCol (col) {
      var s = '';
      for (++col; col; col = Math.floor((col - 1) / 26)) s = String.fromCharCode(((col - 1) % 26) + 65) + s;
      return s;
    }

    function xlsxEncodeCell (cell) { return xlsxEncodeCol(cell.c) + xlsxEncodeRow(cell.r); }

    function xlsxEncodeRange (cs, ce) {
      if (typeof ce === 'undefined' || typeof ce === 'number') {
        return xlsxEncodeRange(cs.s, cs.e);
      }
      if (typeof cs !== 'string') cs = xlsxEncodeCell((cs));
      if (typeof ce !== 'string') ce = xlsxEncodeCell((ce));
      return cs === ce ? cs : cs + ':' + ce;
    }

    function xlsxToNumber (s, numbersFormat) {
      var v = Number(s);
      if (isFinite(v)) return v;
      var wt = 1;
      var ss = s;
      if ('' !== numbersFormat.thousandsSeparator)
        ss = ss.replace(new RegExp('([\\d])' + numbersFormat.thousandsSeparator + '([\\d])', 'g'), '$1$2');
      if ('.' !== numbersFormat.decimalMark)
        ss = ss.replace(new RegExp('([\\d])' + numbersFormat.decimalMark + '([\\d])', 'g'), '$1.$2');
      ss = ss.replace(/[$]/g, '').replace(/[%]/g, function () {
        wt *= 100;
        return '';
      });
      if (isFinite(v = Number(ss))) return v / wt;
      ss = ss.replace(/[(](.*)[)]/, function ($$, $1) {
        wt = -wt;
        return $1;
      });
      if (isFinite(v = Number(ss))) return v / wt;
      return v;
    }

    function strHashCode (str) {
      var hash = 0, i, chr, len;
      if (str.length === 0) return hash;
      for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }

    function saveToFile (data, fileName, type, charset, encoding, bom) {
      var saveIt = true;
      if (typeof defaults.onBeforeSaveToFile === 'function') {
        saveIt = defaults.onBeforeSaveToFile(data, fileName, type, charset, encoding);
        if (typeof saveIt !== 'boolean')
          saveIt = true;
      }

      if (saveIt) {
        try {
          blob = new Blob([data], {type: type + ';charset=' + charset});
          saveAs(blob, fileName, bom === false);

          if (typeof defaults.onAfterSaveToFile === 'function')
            defaults.onAfterSaveToFile(data, fileName);
        } catch (e) {
          downloadFile(fileName,
            'data:' + type +
            (charset.length ? ';charset=' + charset : '') +
            (encoding.length ? ';' + encoding : '') + ',',
            (bom ? ('\ufeff' + data) : data));
        }
      }
    }

    function downloadFile (filename, header, data) {
      var ua = window.navigator.userAgent;
      if (filename !== false && window.navigator.msSaveOrOpenBlob) {
        //noinspection JSUnresolvedFunction
        window.navigator.msSaveOrOpenBlob(new Blob([data]), filename);
      } else if (filename !== false && (ua.indexOf('MSIE ') > 0 || !!ua.match(/Trident.*rv\:11\./))) {
        // Internet Explorer (<= 9) workaround by Darryl (https://github.com/dawiong/tableExport.jquery.plugin)
        // based on sampopes answer on http://stackoverflow.com/questions/22317951
        // ! Not working for json and pdf format !
        var frame = document.createElement('iframe');

        if (frame) {
          document.body.appendChild(frame);
          frame.setAttribute('style', 'display:none');
          frame.contentDocument.open('txt/plain', 'replace');
          frame.contentDocument.write(data);
          frame.contentDocument.close();
          frame.contentWindow.focus();

          var extension = filename.substr((filename.lastIndexOf('.') + 1));
          switch (extension) {
            case 'doc':
            case 'json':
            case 'png':
            case 'pdf':
            case 'xls':
            case 'xlsx':
              filename += '.txt';
              break;
          }
          frame.contentDocument.execCommand('SaveAs', true, filename);
          document.body.removeChild(frame);
        }
      } else {
        var DownloadLink = document.createElement('a');

        if (DownloadLink) {
          var blobUrl = null;

          DownloadLink.style.display = 'none';
          if (filename !== false)
            DownloadLink.download = filename;
          else
            DownloadLink.target = '_blank';

          if (typeof data === 'object') {
            window.URL = window.URL || window.webkitURL;
            var binaryData = [];
            binaryData.push(data);
            blobUrl = window.URL.createObjectURL(new Blob(binaryData, {type: header}));
            DownloadLink.href = blobUrl;
          } else if (header.toLowerCase().indexOf('base64,') >= 0)
            DownloadLink.href = header + base64encode(data);
          else
            DownloadLink.href = header + encodeURIComponent(data);

          document.body.appendChild(DownloadLink);

          if (document.createEvent) {
            if (DownloadEvt === null)
              DownloadEvt = document.createEvent('MouseEvents');

            DownloadEvt.initEvent('click', true, false);
            DownloadLink.dispatchEvent(DownloadEvt);
          } else if (document.createEventObject)
            DownloadLink.fireEvent('onclick');
          else if (typeof DownloadLink.onclick === 'function')
            DownloadLink.onclick();

          setTimeout(function () {
            if (blobUrl)
              window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(DownloadLink);

            if (typeof defaults.onAfterSaveToFile === 'function')
              defaults.onAfterSaveToFile(data, filename);
          }, 100);
        }
      }
    }

    function utf8Encode (text) {
      if (typeof text === 'string') {
        text = text.replace(/\x0d\x0a/g, '\x0a');
        var utftext = '';
        for (var n = 0; n < text.length; n++) {
          var c = text.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }
        return utftext;
      }
      return text;
    }

    function base64encode (input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = '';
      var i = 0;
      input = utf8Encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          keyStr.charAt(enc1) + keyStr.charAt(enc2) +
          keyStr.charAt(enc3) + keyStr.charAt(enc4);
      }
      return output;
    }

    if (typeof defaults.onTableExportEnd === 'function')
      defaults.onTableExportEnd();

    return this;
  };
})(jQuery);

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.jspdf=e()}(this,function(){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var s={key:t,arg:e,resolve:n,reject:i,next:null};a?a=a.next=s:(o=a=s,r(t,e))})}function r(n,o){try{var a=e[n](o),s=a.value;s instanceof t?Promise.resolve(s.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(a.done?"return":"normal",a.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):a=null}var o,a;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(e){function n(t){var n={};this.subscribe=function(t,e,r){if("function"!=typeof e)return!1;n.hasOwnProperty(t)||(n[t]={});var i=Math.random().toString(35);return n[t][i]=[e,!!r],i},this.unsubscribe=function(t){for(var e in n)if(n[e][t])return delete n[e][t],!0;return!1},this.publish=function(r){if(n.hasOwnProperty(r)){var i=Array.prototype.slice.call(arguments,1),o=[];for(var a in n[r]){var s=n[r][a];try{s[0].apply(t,i)}catch(t){e.console&&console.error("jsPDF PubSub Error",t.message,t)}s[1]&&o.push(a)}o.length&&o.forEach(this.unsubscribe)}}}function r(c,l,u,h){var f={};"object"===("undefined"==typeof c?"undefined":t(c))&&(f=c,c=f.orientation,l=f.unit||l,u=f.format||u,h=f.compress||f.compressPdf||h),l=l||"mm",u=u||"a4",c=(""+(c||"P")).toLowerCase();var d,p,g,m,w,y,v,b,x,k=((""+u).toLowerCase(),!!h&&"function"==typeof Uint8Array),_=f.textColor||"0 g",C=f.drawColor||"0 G",A=f.fontSize||16,S=f.lineHeight||1.15,q=f.lineWidth||.200025,T=2,P=!1,I=[],E={},O={},F=0,R=[],B=[],D=[],j=[],z=[],N=0,L=0,M=0,U={title:"",subject:"",author:"",keywords:"",creator:""},H={},W=new n(H),X=function(t){return t.toFixed(2)},V=function(t){return t.toFixed(3)},Y=function(t){return("0"+parseInt(t)).slice(-2)},G=function(t){P?R[m].push(t):(M+=t.length+1,j.push(t))},J=function(){return T++,I[T]=M,G(T+" 0 obj"),T},Q=function(){var t=2*R.length+1;t+=z.length;var e={objId:t,content:""};return z.push(e),e},K=function(){return T++,I[T]=function(){return M},T},$=function(t){I[t]=M},Z=function(t){G("stream"),G(t),G("endstream")},tt=function(){var t,n,i,o,s,c,l,u,h,f=[];for(l=e.adler32cs||r.adler32cs,k&&"undefined"==typeof l&&(k=!1),t=1;t<=F;t++){if(f.push(J()),u=(w=D[t].width)*p,h=(y=D[t].height)*p,G("<</Type /Page"),G("/Parent 1 0 R"),G("/Resources 2 0 R"),G("/MediaBox [0 0 "+X(u)+" "+X(h)+"]"),W.publish("putPage",{pageNumber:t,page:R[t]}),G("/Contents "+(T+1)+" 0 R"),G(">>"),G("endobj"),n=R[t].join("\n"),J(),k){for(i=[],o=n.length;o--;)i[o]=n.charCodeAt(o);c=l.from(n),s=new a(6),s.append(new Uint8Array(i)),n=s.flush(),i=new Uint8Array(n.length+6),i.set(new Uint8Array([120,156])),i.set(n,2),i.set(new Uint8Array([255&c,c>>8&255,c>>16&255,c>>24&255]),n.length+2),n=String.fromCharCode.apply(null,i),G("<</Length "+n.length+" /Filter [/FlateDecode]>>")}else G("<</Length "+n.length+">>");Z(n),G("endobj")}I[1]=M,G("1 0 obj"),G("<</Type /Pages");var d="/Kids [";for(o=0;o<F;o++)d+=f[o]+" 0 R ";G(d+"]"),G("/Count "+F),G(">>"),G("endobj"),W.publish("postPutPages")},et=function(t){t.objectNumber=J(),G("<</BaseFont/"+t.PostScriptName+"/Type/Font"),"string"==typeof t.encoding&&G("/Encoding/"+t.encoding),G("/Subtype/Type1>>"),G("endobj")},nt=function(){for(var t in E)E.hasOwnProperty(t)&&et(E[t])},rt=function(){W.publish("putXobjectDict")},it=function(){G("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),G("/Font <<");for(var t in E)E.hasOwnProperty(t)&&G("/"+t+" "+E[t].objectNumber+" 0 R");G(">>"),G("/XObject <<"),rt(),G(">>")},ot=function(){nt(),W.publish("putResources"),I[2]=M,G("2 0 obj"),G("<<"),it(),G(">>"),G("endobj"),W.publish("postPutResources")},at=function(){W.publish("putAdditionalObjects");for(var t=0;t<z.length;t++){var e=z[t];I[e.objId]=M,G(e.objId+" 0 obj"),G(e.content),G("endobj")}T+=z.length,W.publish("postPutAdditionalObjects")},st=function(t,e,n){O.hasOwnProperty(e)||(O[e]={}),O[e][n]=t},ct=function(t,e,n,r){var i="F"+(Object.keys(E).length+1).toString(10),o=E[i]={id:i,PostScriptName:t,fontName:e,fontStyle:n,encoding:r,metadata:{}};return st(i,e,n),W.publish("addFont",o),i},lt=function(){for(var t="helvetica",e="times",n="courier",r="normal",i="bold",o="italic",a="bolditalic",s="StandardEncoding",c="zapfdingbats",l=[["Helvetica",t,r],["Helvetica-Bold",t,i],["Helvetica-Oblique",t,o],["Helvetica-BoldOblique",t,a],["Courier",n,r],["Courier-Bold",n,i],["Courier-Oblique",n,o],["Courier-BoldOblique",n,a],["Times-Roman",e,r],["Times-Bold",e,i],["Times-Italic",e,o],["Times-BoldItalic",e,a],["ZapfDingbats",c]],u=0,h=l.length;u<h;u++){var f=ct(l[u][0],l[u][1],l[u][2],s),d=l[u][0].split("-");st(f,d[0],d[1]||"")}W.publish("addFonts",{fonts:E,dictionary:O})},ut=function(t){return t.foo=function(){try{return t.apply(this,arguments)}catch(t){var n=t.stack||"";~n.indexOf(" at ")&&(n=n.split(" at ")[1]);var r="Error in function "+n.split("\n")[0].split("<")[0]+": "+t.message;if(!e.console)throw new Error(r);e.console.error(r,t),e.alert&&alert(r)}},t.foo.bar=t,t.foo},ht=function(t,e){var n,r,i,o,a,s,c,l,u;if(e=e||{},i=e.sourceEncoding||"Unicode",a=e.outputEncoding,(e.autoencode||a)&&E[d].metadata&&E[d].metadata[i]&&E[d].metadata[i].encoding&&(o=E[d].metadata[i].encoding,!a&&E[d].encoding&&(a=E[d].encoding),!a&&o.codePages&&(a=o.codePages[0]),"string"==typeof a&&(a=o[a]),a)){for(c=!1,s=[],n=0,r=t.length;n<r;n++)l=a[t.charCodeAt(n)],l?s.push(String.fromCharCode(l)):s.push(t[n]),s[n].charCodeAt(0)>>8&&(c=!0);t=s.join("")}for(n=t.length;void 0===c&&0!==n;)t.charCodeAt(n-1)>>8&&(c=!0),n--;if(!c)return t;for(s=e.noBOM?[]:[254,255],n=0,r=t.length;n<r;n++){if(l=t.charCodeAt(n),u=l>>8,u>>8)throw new Error("Character at position "+n+" of string '"+t+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");s.push(u),s.push(l-(u<<8))}return String.fromCharCode.apply(void 0,s)},ft=function(t,e){return ht(t,e).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},dt=function(){G("/Producer (jsPDF "+r.version+")");for(var t in U)U.hasOwnProperty(t)&&U[t]&&G("/"+t.substr(0,1).toUpperCase()+t.substr(1)+" ("+ft(U[t])+")");var e=new Date,n=e.getTimezoneOffset(),i=n<0?"+":"-",o=Math.floor(Math.abs(n/60)),a=Math.abs(n%60),s=[i,Y(o),"'",Y(a),"'"].join("");G(["/CreationDate (D:",e.getFullYear(),Y(e.getMonth()+1),Y(e.getDate()),Y(e.getHours()),Y(e.getMinutes()),Y(e.getSeconds()),s,")"].join(""))},pt=function(){switch(G("/Type /Catalog"),G("/Pages 1 0 R"),b||(b="fullwidth"),b){case"fullwidth":G("/OpenAction [3 0 R /FitH null]");break;case"fullheight":G("/OpenAction [3 0 R /FitV null]");break;case"fullpage":G("/OpenAction [3 0 R /Fit]");break;case"original":G("/OpenAction [3 0 R /XYZ null null 1]");break;default:var t=""+b;"%"===t.substr(t.length-1)&&(b=parseInt(b)/100),"number"==typeof b&&G("/OpenAction [3 0 R /XYZ null null "+X(b)+"]")}switch(x||(x="continuous"),x){case"continuous":G("/PageLayout /OneColumn");break;case"single":G("/PageLayout /SinglePage");break;case"two":case"twoleft":G("/PageLayout /TwoColumnLeft");break;case"tworight":G("/PageLayout /TwoColumnRight")}v&&G("/PageMode /"+v),W.publish("putCatalog")},gt=function(){G("/Size "+(T+1)),G("/Root "+T+" 0 R"),G("/Info "+(T-1)+" 0 R")},mt=function(t,e){var n="string"==typeof e&&e.toLowerCase();if("string"==typeof t){var r=t.toLowerCase();s.hasOwnProperty(r)&&(t=s[r][0]/p,e=s[r][1]/p)}if(Array.isArray(t)&&(e=t[1],t=t[0]),n){switch(n.substr(0,1)){case"l":e>t&&(n="s");break;case"p":t>e&&(n="s")}"s"===n&&(g=t,t=e,e=g)}P=!0,R[++F]=[],D[F]={width:Number(t)||w,height:Number(e)||y},B[F]={},vt(F)},wt=function(){mt.apply(this,arguments),G(X(q*p)+" w"),G(C),0!==N&&G(N+" J"),0!==L&&G(L+" j"),W.publish("addPage",{pageNumber:F})},yt=function(t){t>0&&t<=F&&(R.splice(t,1),D.splice(t,1),F--,m>F&&(m=F),this.setPage(m))},vt=function(t){t>0&&t<=F&&(m=t,w=D[t].width,y=D[t].height)},bt=function(t,e){var n;switch(t=void 0!==t?t:E[d].fontName,e=void 0!==e?e:E[d].fontStyle,void 0!==t&&(t=t.toLowerCase()),t){case"sans-serif":case"verdana":case"arial":case"helvetica":t="helvetica";break;case"fixed":case"monospace":case"terminal":case"courier":t="courier";break;case"serif":case"cursive":case"fantasy":default:t="times"}try{n=O[t][e]}catch(t){}return n||(n=O.times[e],null==n&&(n=O.times.normal)),n},xt=function(){P=!1,T=2,M=0,j=[],I=[],z=[],W.publish("buildDocument"),G("%PDF-"+o),tt(),at(),ot(),J(),G("<<"),dt(),G(">>"),G("endobj"),J(),G("<<"),pt(),G(">>"),G("endobj");var t,e=M,n="0000000000";for(G("xref"),G("0 "+(T+1)),G(n+" 65535 f "),t=1;t<=T;t++){var r=I[t];G("function"==typeof r?(n+I[t]()).slice(-10)+" 00000 n ":(n+I[t]).slice(-10)+" 00000 n ")}return G("trailer"),G("<<"),gt(),G(">>"),G("startxref"),G(""+e),G("%%EOF"),P=!0,j.join("\n")},kt=function(t){var e="S";return"F"===t?e="f":"FD"===t||"DF"===t?e="B":"f"!==t&&"f*"!==t&&"B"!==t&&"B*"!==t||(e=t),e},_t=function(){for(var t=xt(),e=t.length,n=new ArrayBuffer(e),r=new Uint8Array(n);e--;)r[e]=t.charCodeAt(e);return n},Ct=function(){return new Blob([_t()],{type:"application/pdf"})},At=ut(function(t,n){var r="dataur"===(""+t).substr(0,6)?"data:application/pdf;base64,"+btoa(xt()):0;switch(t){case void 0:return xt();case"save":if(navigator.getUserMedia&&(void 0===e.URL||void 0===e.URL.createObjectURL))return H.output("dataurlnewwindow");i(Ct(),n),"function"==typeof i.unload&&e.setTimeout&&setTimeout(i.unload,911);break;case"arraybuffer":return _t();case"blob":return Ct();case"bloburi":case"bloburl":return e.URL&&e.URL.createObjectURL(Ct())||void 0;case"datauristring":case"dataurlstring":return r;case"dataurlnewwindow":var o=e.open(r);if(o||"undefined"==typeof safari)return o;case"datauri":case"dataurl":return e.document.location.href=r;default:throw new Error('Output type "'+t+'" is not supported.')}});switch(l){case"pt":p=1;break;case"mm":p=72/25.4000508;break;case"cm":p=72/2.54000508;break;case"in":p=72;break;case"px":p=96/72;break;case"pc":p=12;break;case"em":p=12;break;case"ex":p=6;break;default:throw"Invalid unit: "+l}H.internal={pdfEscape:ft,getStyle:kt,getFont:function(){return E[bt.apply(H,arguments)]},getFontSize:function(){return A},getLineHeight:function(){return A*S},write:function(t){G(1===arguments.length?t:Array.prototype.join.call(arguments," "))},getCoordinateString:function(t){return X(t*p)},getVerticalCoordinateString:function(t){return X((y-t)*p)},collections:{},newObject:J,newAdditionalObject:Q,newObjectDeferred:K,newObjectDeferredBegin:$,putStream:Z,events:W,scaleFactor:p,pageSize:{get width(){return w},get height(){return y}},output:function(t,e){return At(t,e)},getNumberOfPages:function(){return R.length-1},pages:R,out:G,f2:X,getPageInfo:function(t){var e=2*(t-1)+3;return{objId:e,pageNumber:t,pageContext:B[t]}},getCurrentPageInfo:function(){var t=2*(m-1)+3;return{objId:t,pageNumber:m,pageContext:B[m]}},getPDFVersion:function(){return o}},H.addPage=function(){return wt.apply(this,arguments),this},H.setPage=function(){return vt.apply(this,arguments),this},H.insertPage=function(t){return this.addPage(),this.movePage(m,t),this},H.movePage=function(t,e){if(t>e){for(var n=R[t],r=D[t],i=B[t],o=t;o>e;o--)R[o]=R[o-1],D[o]=D[o-1],B[o]=B[o-1];R[e]=n,D[e]=r,B[e]=i,this.setPage(e)}else if(t<e){for(var n=R[t],r=D[t],i=B[t],o=t;o<e;o++)R[o]=R[o+1],D[o]=D[o+1],B[o]=B[o+1];R[e]=n,D[e]=r,B[e]=i,this.setPage(e)}return this},H.deletePage=function(){return yt.apply(this,arguments),this},H.setDisplayMode=function(t,e,n){b=t,x=e,v=n;var r=[void 0,null,"UseNone","UseOutlines","UseThumbs","FullScreen"];if(r.indexOf(n)==-1)throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "'+n+'" is not recognized.');return this},H.text=function(t,e,n,r,i,o){function a(t){return t=t.split("\t").join(Array(f.TabLen||9).join(" ")),ft(t,r)}"number"==typeof t&&(g=n,n=e,e=t,t=g),"string"==typeof t&&(t=t.match(/[\n\r]/)?t.split(/\r\n|\r|\n/g):[t]),"string"==typeof i&&(o=i,i=null),"string"==typeof r&&(o=r,r=null),"number"==typeof r&&(i=r,r=null);var s,c="",l="Td";if(i){i*=Math.PI/180;var u=Math.cos(i),h=Math.sin(i);c=[X(u),X(h),X(h*-1),X(u),""].join(" "),l="Tm"}r=r||{},"noBOM"in r||(r.noBOM=!0),"autoencode"in r||(r.autoencode=!0);var m="",w=this.internal.getCurrentPageInfo().pageContext;if(!0===r.stroke?w.lastTextWasStroke!==!0&&(m="1 Tr\n",w.lastTextWasStroke=!0):(w.lastTextWasStroke&&(m="0 Tr\n"),w.lastTextWasStroke=!1),"undefined"==typeof this._runningPageHeight&&(this._runningPageHeight=0),"string"==typeof t)t=a(t);else{if("[object Array]"!==Object.prototype.toString.call(t))throw new Error('Type of text must be string or Array. "'+t+'" is not recognized.');for(var v=t.concat(),b=[],x=v.length;x--;)b.push(a(v.shift()));var k=Math.ceil((y-n-this._runningPageHeight)*p/(A*S));if(0<=k&&k<b.length+1,o){var C,q,T,P=A*S,I=t.map(function(t){return this.getStringUnitWidth(t)*A/p},this);if(T=Math.max.apply(Math,I),"center"===o)C=e-T/2,e-=I[0]/2;else{if("right"!==o)throw new Error('Unrecognized alignment option, use "center" or "right".');C=e-T,e-=I[0]}q=e,t=b[0];for(var E=1,x=b.length;E<x;E++){var O=T-I[E];"center"===o&&(O/=2),t+=") Tj\n"+(C-q+O)+" -"+P+" Td ("+b[E],q=C+O}}else t=b.join(") Tj\nT* (")}var F;return s||(F=X((y-n)*p)),G("BT\n/"+d+" "+A+" Tf\n"+A*S+" TL\n"+m+_+"\n"+c+X(e*p)+" "+F+" "+l+"\n("+t+") Tj\nET"),s&&this.text(s,e,n),this},H.lstext=function(t,e,n,r){console.warn("jsPDF.lstext is deprecated");for(var i=0,o=t.length;i<o;i++,e+=r)this.text(t[i],e,n);return this},H.line=function(t,e,n,r){return this.lines([[n-t,r-e]],t,e)},H.clip=function(){G("W"),G("S")},H.clip_fixed=function(t){G("evenodd"===t?"W*":"W"),G("n")},H.lines=function(t,e,n,r,i,o){var a,s,c,l,u,h,f,d,m,w,v;for("number"==typeof t&&(g=n,n=e,e=t,t=g),r=r||[1,1],G(V(e*p)+" "+V((y-n)*p)+" m "),a=r[0],s=r[1],l=t.length,w=e,v=n,c=0;c<l;c++)u=t[c],2===u.length?(w=u[0]*a+w,v=u[1]*s+v,G(V(w*p)+" "+V((y-v)*p)+" l")):(h=u[0]*a+w,f=u[1]*s+v,d=u[2]*a+w,m=u[3]*s+v,w=u[4]*a+w,v=u[5]*s+v,G(V(h*p)+" "+V((y-f)*p)+" "+V(d*p)+" "+V((y-m)*p)+" "+V(w*p)+" "+V((y-v)*p)+" c"));return o&&G(" h"),null!==i&&G(kt(i)),this},H.rect=function(t,e,n,r,i){kt(i);return G([X(t*p),X((y-e)*p),X(n*p),X(-r*p),"re"].join(" ")),null!==i&&G(kt(i)),this},H.triangle=function(t,e,n,r,i,o,a){return this.lines([[n-t,r-e],[i-n,o-r],[t-i,e-o]],t,e,[1,1],a,!0),this},H.roundedRect=function(t,e,n,r,i,o,a){var s=4/3*(Math.SQRT2-1);return this.lines([[n-2*i,0],[i*s,0,i,o-o*s,i,o],[0,r-2*o],[0,o*s,-(i*s),o,-i,o],[-n+2*i,0],[-(i*s),0,-i,-(o*s),-i,-o],[0,-r+2*o],[0,-(o*s),i*s,-o,i,-o]],t+i,e,[1,1],a),this},H.ellipse=function(t,e,n,r,i){var o=4/3*(Math.SQRT2-1)*n,a=4/3*(Math.SQRT2-1)*r;return G([X((t+n)*p),X((y-e)*p),"m",X((t+n)*p),X((y-(e-a))*p),X((t+o)*p),X((y-(e-r))*p),X(t*p),X((y-(e-r))*p),"c"].join(" ")),G([X((t-o)*p),X((y-(e-r))*p),X((t-n)*p),X((y-(e-a))*p),X((t-n)*p),X((y-e)*p),"c"].join(" ")),G([X((t-n)*p),X((y-(e+a))*p),X((t-o)*p),X((y-(e+r))*p),X(t*p),X((y-(e+r))*p),"c"].join(" ")),G([X((t+o)*p),X((y-(e+r))*p),X((t+n)*p),X((y-(e+a))*p),X((t+n)*p),X((y-e)*p),"c"].join(" ")),null!==i&&G(kt(i)),this},H.circle=function(t,e,n,r){return this.ellipse(t,e,n,n,r)},H.setProperties=function(t){for(var e in U)U.hasOwnProperty(e)&&t[e]&&(U[e]=t[e]);return this},H.setFontSize=function(t){return A=t,this},H.setFont=function(t,e){return d=bt(t,e),this},H.setFontStyle=H.setFontType=function(t){return d=bt(void 0,t),this},H.getFontList=function(){var t,e,n,r={};for(t in O)if(O.hasOwnProperty(t)){r[t]=n=[];for(e in O[t])O[t].hasOwnProperty(e)&&n.push(e)}return r},H.addFont=function(t,e,n){ct(t,e,n,"StandardEncoding")},H.setLineWidth=function(t){return G((t*p).toFixed(2)+" w"),this},H.setDrawColor=function(t,e,n,r){var i;return i=void 0===e||void 0===r&&t===e===n?"string"==typeof t?t+" G":X(t/255)+" G":void 0===r?"string"==typeof t?[t,e,n,"RG"].join(" "):[X(t/255),X(e/255),X(n/255),"RG"].join(" "):"string"==typeof t?[t,e,n,r,"K"].join(" "):[X(t),X(e),X(n),X(r),"K"].join(" "),G(i),this},H.setFillColor=function(e,n,r,i){var o;return void 0===n||void 0===i&&e===n===r?o="string"==typeof e?e+" g":X(e/255)+" g":void 0===i||"object"===("undefined"==typeof i?"undefined":t(i))?(o="string"==typeof e?[e,n,r,"rg"].join(" "):[X(e/255),X(n/255),X(r/255),"rg"].join(" "),i&&0===i.a&&(o=["255","255","255","rg"].join(" "))):o="string"==typeof e?[e,n,r,i,"k"].join(" "):[X(e),X(n),X(r),X(i),"k"].join(" "),G(o),this},H.setTextColor=function(t,e,n){if("string"==typeof t&&/^#[0-9A-Fa-f]{6}$/.test(t)){var r=parseInt(t.substr(1),16);t=r>>16&255,e=r>>8&255,n=255&r}return _=0===t&&0===e&&0===n||"undefined"==typeof e?V(t/255)+" g":[V(t/255),V(e/255),V(n/255),"rg"].join(" "),this},H.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2},H.setLineCap=function(t){var e=this.CapJoinStyles[t];if(void 0===e)throw new Error("Line cap style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return N=e,G(e+" J"),this},H.setLineJoin=function(t){var e=this.CapJoinStyles[t];if(void 0===e)throw new Error("Line join style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return L=e,G(e+" j"),this},H.output=At,H.save=function(t){H.output("save",t)};for(var St in r.API)r.API.hasOwnProperty(St)&&("events"===St&&r.API.events.length?!function(t,e){var n,r,i;for(i=e.length-1;i!==-1;i--)n=e[i][0],r=e[i][1],t.subscribe.apply(t,[n].concat("function"==typeof r?[r]:r))}(W,r.API.events):H[St]=r.API[St]);return lt(),d="F1",wt(u,c),W.publish("initialized"),H}var o="1.3",s={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};return r.API={events:[]},r.version="1.x-master","function"==typeof define&&define.amd?define("jsPDF",function(){return r}):"undefined"!=typeof module&&module.exports?module.exports=r:e.jsPDF=r,r}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||void 0));/**
 * jsPDF AcroForm Plugin
 * Copyright (c) 2016 Alexander Weidt, https://github.com/BiggA94
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
(window.AcroForm=function(t){var n=window.AcroForm;n.scale=function(t){return t*(r.internal.scaleFactor/1)},n.antiScale=function(t){return 1/r.internal.scaleFactor*t};var r={fields:[],xForms:[],acroFormDictionaryRoot:null,printedOut:!1,internal:null};e.API.acroformPlugin=r;var i=function(){for(var t in this.acroformPlugin.acroFormDictionaryRoot.Fields){var e=this.acroformPlugin.acroFormDictionaryRoot.Fields[t];e.hasAnnotation&&a.call(this,e)}},o=function(){if(this.acroformPlugin.acroFormDictionaryRoot)throw new Error("Exception while creating AcroformDictionary");this.acroformPlugin.acroFormDictionaryRoot=new n.AcroFormDictionary,this.acroformPlugin.internal=this.internal,this.acroformPlugin.acroFormDictionaryRoot._eventID=this.internal.events.subscribe("postPutResources",l),this.internal.events.subscribe("buildDocument",i),this.internal.events.subscribe("putCatalog",c),this.internal.events.subscribe("postPutPages",u)},a=function(t){var n={type:"reference",object:t};e.API.annotationPlugin.annotations[this.internal.getPageInfo(t.page).pageNumber].push(n)},s=function(t){this.acroformPlugin.printedOut&&(this.acroformPlugin.printedOut=!1,this.acroformPlugin.acroFormDictionaryRoot=null),this.acroformPlugin.acroFormDictionaryRoot||o.call(this),this.acroformPlugin.acroFormDictionaryRoot.Fields.push(t)},c=function(){"undefined"!=typeof this.acroformPlugin.acroFormDictionaryRoot?this.internal.write("/AcroForm "+this.acroformPlugin.acroFormDictionaryRoot.objId+" 0 R"):console.log("Root missing...")},l=function(){this.internal.events.unsubscribe(this.acroformPlugin.acroFormDictionaryRoot._eventID),delete this.acroformPlugin.acroFormDictionaryRoot._eventID,this.acroformPlugin.printedOut=!0},u=function(t){var e=!t;t||(this.internal.newObjectDeferredBegin(this.acroformPlugin.acroFormDictionaryRoot.objId),this.internal.out(this.acroformPlugin.acroFormDictionaryRoot.getString()));var t=t||this.acroformPlugin.acroFormDictionaryRoot.Kids;for(var r in t){var i=t[r],o=i.Rect;i.Rect&&(i.Rect=n.internal.calculateCoordinates.call(this,i.Rect)),this.internal.newObjectDeferredBegin(i.objId);var a="";if(a+=i.objId+" 0 obj\n",a+="<<\n"+i.getContent(),i.Rect=o,i.hasAppearanceStream&&!i.appearanceStreamContent){var s=n.internal.calculateAppearanceStream.call(this,i);a+="/AP << /N "+s+" >>\n",this.acroformPlugin.xForms.push(s)}if(i.appearanceStreamContent){a+="/AP << ";for(var c in i.appearanceStreamContent){var l=i.appearanceStreamContent[c];if(a+="/"+c+" ",a+="<< ",Object.keys(l).length>=1||Array.isArray(l))for(var r in l){var u=l[r];"function"==typeof u&&(u=u.call(this,i)),a+="/"+r+" "+u+" ",this.acroformPlugin.xForms.indexOf(u)>=0||this.acroformPlugin.xForms.push(u)}else{var u=l;"function"==typeof u&&(u=u.call(this,i)),a+="/"+r+" "+u+" \n",this.acroformPlugin.xForms.indexOf(u)>=0||this.acroformPlugin.xForms.push(u)}a+=" >>\n"}a+=">>\n"}a+=">>\nendobj\n",this.internal.out(a)}e&&h.call(this,this.acroformPlugin.xForms)},h=function(t){for(var e in t){var n=e,r=t[e];this.internal.newObjectDeferredBegin(r&&r.objId);var i="";i+=r?r.getString():"",this.internal.out(i),delete t[n]}};t.addField=function(t){return t instanceof n.TextField?d.call(this,t):t instanceof n.ChoiceField?p.call(this,t):t instanceof n.Button?f.call(this,t):t instanceof n.ChildClass?s.call(this,t):t&&s.call(this,t),t.page=this.acroformPlugin.internal.getCurrentPageInfo().pageNumber,this};var f=function(t){var t=t||new n.Field;t.FT="/Btn";var e=t.Ff||0;t.pushbutton&&(e=n.internal.setBitPosition(e,17),delete t.pushbutton),t.radio&&(e=n.internal.setBitPosition(e,16),delete t.radio),t.noToggleToOff&&(e=n.internal.setBitPosition(e,15)),t.Ff=e,s.call(this,t)},d=function(t){var t=t||new n.Field;t.FT="/Tx";var e=t.Ff||0;t.multiline&&(e=4096|e),t.password&&(e=8192|e),t.fileSelect&&(e|=1<<20),t.doNotSpellCheck&&(e|=1<<22),t.doNotScroll&&(e|=1<<23),t.Ff=t.Ff||e,s.call(this,t)},p=function(t){var e=t||new n.Field;e.FT="/Ch";var r=e.Ff||0;e.combo&&(r=n.internal.setBitPosition(r,18),delete e.combo),e.edit&&(r=n.internal.setBitPosition(r,19),delete e.edit),e.sort&&(r=n.internal.setBitPosition(r,20),delete e.sort),e.multiSelect&&this.internal.getPDFVersion()>=1.4&&(r=n.internal.setBitPosition(r,22),delete e.multiSelect),e.doNotSpellCheck&&this.internal.getPDFVersion()>=1.4&&(r=n.internal.setBitPosition(r,23),delete e.doNotSpellCheck),e.Ff=r,s.call(this,e)}})(e.API);var n=window.AcroForm;n.internal={},n.createFormXObject=function(t){var e=new n.FormXObject,r=n.Appearance.internal.getHeight(t)||0,i=n.Appearance.internal.getWidth(t)||0;return e.BBox=[0,0,i,r],e},n.Appearance={CheckBox:{createAppearanceStream:function(){var t={N:{On:n.Appearance.CheckBox.YesNormal},D:{On:n.Appearance.CheckBox.YesPushDown,Off:n.Appearance.CheckBox.OffPushDown}};return t},createMK:function(){return"<< /CA (3)>>"},YesPushDown:function(t){var e=n.createFormXObject(t),r="";t.Q=1;var i=n.internal.calculateX(t,"3","ZapfDingbats",50);return r+="0.749023 g\n             0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n             f\n             BMC\n             q\n             0 0 1 rg\n             /F13 "+i.fontSize+" Tf 0 g\n             BT\n",r+=i.text,r+="ET\n             Q\n             EMC\n",e.stream=r,e},YesNormal:function(t){var e=n.createFormXObject(t),r="";t.Q=1;var i=n.internal.calculateX(t,"3","ZapfDingbats",.9*n.Appearance.internal.getHeight(t));return r+="1 g\n0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\nf\nq\n0 0 1 rg\n0 0 "+(n.Appearance.internal.getWidth(t)-1)+" "+(n.Appearance.internal.getHeight(t)-1)+" re\nW\nn\n0 g\nBT\n/F13 "+i.fontSize+" Tf 0 g\n",r+=i.text,r+="ET\n             Q\n",e.stream=r,e},OffPushDown:function(t){var e=n.createFormXObject(t),r="";return r+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n",e.stream=r,e}},RadioButton:{Circle:{createAppearanceStream:function(t){var e={D:{Off:n.Appearance.RadioButton.Circle.OffPushDown},N:{}};return e.N[t]=n.Appearance.RadioButton.Circle.YesNormal,e.D[t]=n.Appearance.RadioButton.Circle.YesPushDown,e},createMK:function(){return"<< /CA (l)>>"},YesNormal:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4;i*=.9;var o=n.Appearance.internal.Bezier_C;return r+="q\n1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+i+" 0 m\n"+i+" "+i*o+" "+i*o+" "+i+" 0 "+i+" c\n-"+i*o+" "+i+" -"+i+" "+i*o+" -"+i+" 0 c\n-"+i+" -"+i*o+" -"+i*o+" -"+i+" 0 -"+i+" c\n"+i*o+" -"+i+" "+i+" -"+i*o+" "+i+" 0 c\nf\nQ\n",e.stream=r,e},YesPushDown:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4;i*=.9;var o=2*i,a=o*n.Appearance.internal.Bezier_C,s=i*n.Appearance.internal.Bezier_C;return r+="0.749023 g\n            q\n           1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+o+" 0 m\n"+o+" "+a+" "+a+" "+o+" 0 "+o+" c\n-"+a+" "+o+" -"+o+" "+a+" -"+o+" 0 c\n-"+o+" -"+a+" -"+a+" -"+o+" 0 -"+o+" c\n"+a+" -"+o+" "+o+" -"+a+" "+o+" 0 c\n            f\n            Q\n            0 g\n            q\n            1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+i+" 0 m\n"+i+" "+s+" "+s+" "+i+" 0 "+i+" c\n-"+s+" "+i+" -"+i+" "+s+" -"+i+" 0 c\n-"+i+" -"+s+" -"+s+" -"+i+" 0 -"+i+" c\n"+s+" -"+i+" "+i+" -"+s+" "+i+" 0 c\n            f\n            Q\n",e.stream=r,e},OffPushDown:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4;i*=.9;var o=2*i,a=o*n.Appearance.internal.Bezier_C;return r+="0.749023 g\n            q\n 1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+o+" 0 m\n"+o+" "+a+" "+a+" "+o+" 0 "+o+" c\n-"+a+" "+o+" -"+o+" "+a+" -"+o+" 0 c\n-"+o+" -"+a+" -"+a+" -"+o+" 0 -"+o+" c\n"+a+" -"+o+" "+o+" -"+a+" "+o+" 0 c\n            f\n            Q\n",e.stream=r,e}},Cross:{createAppearanceStream:function(t){var e={D:{Off:n.Appearance.RadioButton.Cross.OffPushDown},N:{}};return e.N[t]=n.Appearance.RadioButton.Cross.YesNormal,e.D[t]=n.Appearance.RadioButton.Cross.YesPushDown,e},createMK:function(){return"<< /CA (8)>>"},YesNormal:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.calculateCross(t);return r+="q\n            1 1 "+(n.Appearance.internal.getWidth(t)-2)+" "+(n.Appearance.internal.getHeight(t)-2)+" re\n            W\n            n\n            "+i.x1.x+" "+i.x1.y+" m\n            "+i.x2.x+" "+i.x2.y+" l\n            "+i.x4.x+" "+i.x4.y+" m\n            "+i.x3.x+" "+i.x3.y+" l\n            s\n            Q\n",e.stream=r,e},YesPushDown:function(t){var e=n.createFormXObject(t),r=n.Appearance.internal.calculateCross(t),i="";return i+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n            q\n            1 1 "+(n.Appearance.internal.getWidth(t)-2)+" "+(n.Appearance.internal.getHeight(t)-2)+" re\n            W\n            n\n            "+r.x1.x+" "+r.x1.y+" m\n            "+r.x2.x+" "+r.x2.y+" l\n            "+r.x4.x+" "+r.x4.y+" m\n            "+r.x3.x+" "+r.x3.y+" l\n            s\n            Q\n",e.stream=i,e},OffPushDown:function(t){var e=n.createFormXObject(t),r="";return r+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n",e.stream=r,e}}},createDefaultAppearanceStream:function(t){var e="";return e+="/Helv 0 Tf 0 g"}},n.Appearance.internal={Bezier_C:.551915024494,calculateCross:function(t){var e=function(t,e){return t>e?e:t},r=n.Appearance.internal.getWidth(t),i=n.Appearance.internal.getHeight(t),o=e(r,i),a={x1:{x:(r-o)/2,y:(i-o)/2+o},x2:{x:(r-o)/2+o,y:(i-o)/2},x3:{x:(r-o)/2,y:(i-o)/2},x4:{x:(r-o)/2+o,y:(i-o)/2+o}};return a}},n.Appearance.internal.getWidth=function(t){return t.Rect[2]},n.Appearance.internal.getHeight=function(t){return t.Rect[3]},n.internal.inherit=function(t,e){Object.create||function(t){var e=function(){};return e.prototype=t,new e};t.prototype=Object.create(e.prototype),t.prototype.constructor=t},n.internal.arrayToPdfArray=function(t){if(Array.isArray(t)){var e=" [";for(var n in t){var r=t[n].toString();e+=r,e+=n<t.length-1?" ":""}return e+="]"}},n.internal.toPdfString=function(t){return t=t||"",0!==t.indexOf("(")&&(t="("+t),")"!=t.substring(t.length-1)&&(t+="("),t},n.PDFObject=function(){var t;Object.defineProperty(this,"objId",{get:function(){return t||(this.internal?t=this.internal.newObjectDeferred():e.API.acroformPlugin.internal&&(t=e.API.acroformPlugin.internal.newObjectDeferred())),t||console.log("Couldn't create Object ID"),t},configurable:!1})},n.PDFObject.prototype.toString=function(){return this.objId+" 0 R"},n.PDFObject.prototype.getString=function(){var t=this.objId+" 0 obj\n<<",e=this.getContent();return t+=e+">>\n",this.stream&&(t+="stream\n",t+=this.stream,t+="endstream\n"),t+="endobj\n"},n.PDFObject.prototype.getContent=function(){var t=function(t){var e="",r=Object.keys(t).filter(function(t){return"content"!=t&&"appearanceStreamContent"!=t&&"_"!=t.substring(0,1)});for(var i in r){var o=r[i],a=t[o];a&&(e+=Array.isArray(a)?"/"+o+" "+n.internal.arrayToPdfArray(a)+"\n":a instanceof n.PDFObject?"/"+o+" "+a.objId+" 0 R\n":"/"+o+" "+a+"\n")}return e},e="";return e+=t(this)},n.FormXObject=function(){n.PDFObject.call(this),this.Type="/XObject",this.Subtype="/Form",this.FormType=1,this.BBox,this.Matrix,this.Resources="2 0 R",this.PieceInfo;var t;Object.defineProperty(this,"Length",{enumerable:!0,get:function(){return void 0!==t?t.length:0}}),Object.defineProperty(this,"stream",{enumerable:!1,set:function(e){t=e},get:function(){return t?t:null}})},n.internal.inherit(n.FormXObject,n.PDFObject),n.AcroFormDictionary=function(){n.PDFObject.call(this);var t=[];Object.defineProperty(this,"Kids",{enumerable:!1,configurable:!0,get:function(){return t.length>0?t:void 0}}),Object.defineProperty(this,"Fields",{enumerable:!0,configurable:!0,get:function(){return t}}),this.DA},n.internal.inherit(n.AcroFormDictionary,n.PDFObject),n.Field=function(){n.PDFObject.call(this);var t;Object.defineProperty(this,"Rect",{enumerable:!0,configurable:!1,get:function(){if(t){var e=t;return e}},set:function(e){t=e}});var e="";Object.defineProperty(this,"FT",{enumerable:!0,set:function(t){e=t},get:function(){return e}});var r;Object.defineProperty(this,"T",{enumerable:!0,configurable:!1,set:function(t){r=t},get:function(){if(!r||r.length<1){if(this instanceof n.ChildClass)return;return"(FieldObject"+n.Field.FieldNum++ +")"}return"("==r.substring(0,1)&&r.substring(r.length-1)?r:"("+r+")"}});var i;Object.defineProperty(this,"DA",{enumerable:!0,get:function(){if(i)return"("+i+")"},set:function(t){i=t}});var o;Object.defineProperty(this,"DV",{enumerable:!0,configurable:!0,get:function(){if(o)return o},set:function(t){o=t}}),Object.defineProperty(this,"Type",{enumerable:!0,get:function(){return this.hasAnnotation?"/Annot":null}}),Object.defineProperty(this,"Subtype",{enumerable:!0,get:function(){return this.hasAnnotation?"/Widget":null}}),this.BG,Object.defineProperty(this,"hasAnnotation",{enumerable:!1,get:function(){return!!(this.Rect||this.BC||this.BG)}}),Object.defineProperty(this,"hasAppearanceStream",{enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(this,"page",{enumerable:!1,configurable:!0,writable:!0})},n.Field.FieldNum=0,n.internal.inherit(n.Field,n.PDFObject),n.ChoiceField=function(){n.Field.call(this),this.FT="/Ch",this.Opt=[],this.V="()",this.TI=0,this.combo=!1,Object.defineProperty(this,"edit",{enumerable:!0,set:function(t){1==t?(this._edit=!0,this.combo=!0):this._edit=!1},get:function(){return!!this._edit&&this._edit},configurable:!1}),this.hasAppearanceStream=!0,Object.defineProperty(this,"V",{get:function(){n.internal.toPdfString()}})},n.internal.inherit(n.ChoiceField,n.Field),window.ChoiceField=n.ChoiceField,n.ListBox=function(){n.ChoiceField.call(this)},n.internal.inherit(n.ListBox,n.ChoiceField),window.ListBox=n.ListBox,n.ComboBox=function(){n.ListBox.call(this),this.combo=!0},n.internal.inherit(n.ComboBox,n.ListBox),window.ComboBox=n.ComboBox,n.EditBox=function(){n.ComboBox.call(this),this.edit=!0},n.internal.inherit(n.EditBox,n.ComboBox),window.EditBox=n.EditBox,n.Button=function(){n.Field.call(this),this.FT="/Btn"},n.internal.inherit(n.Button,n.Field),window.Button=n.Button,n.PushButton=function(){n.Button.call(this),this.pushbutton=!0},n.internal.inherit(n.PushButton,n.Button),window.PushButton=n.PushButton,n.RadioButton=function(){n.Button.call(this),this.radio=!0;var t=[];Object.defineProperty(this,"Kids",{enumerable:!0,get:function(){if(t.length>0)return t}}),Object.defineProperty(this,"__Kids",{get:function(){return t}});var e;Object.defineProperty(this,"noToggleToOff",{enumerable:!1,get:function(){return e},set:function(t){e=t}})},n.internal.inherit(n.RadioButton,n.Button),window.RadioButton=n.RadioButton,n.ChildClass=function(t,e){n.Field.call(this),this.Parent=t,this._AppearanceType=n.Appearance.RadioButton.Circle,this.appearanceStreamContent=this._AppearanceType.createAppearanceStream(e),this.F=n.internal.setBitPosition(this.F,3,1),this.MK=this._AppearanceType.createMK(),this.AS="/Off",this._Name=e},n.internal.inherit(n.ChildClass,n.Field),n.RadioButton.prototype.setAppearance=function(t){if(!("createAppearanceStream"in t&&"createMK"in t))return void console.log("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");for(var e in this.__Kids){var n=this.__Kids[e];n.appearanceStreamContent=t.createAppearanceStream(n._Name),n.MK=t.createMK()}},n.RadioButton.prototype.createOption=function(t){var r=this,i=(this.__Kids.length,new n.ChildClass(r,t));return this.__Kids.push(i),e.API.addField(i),i},n.CheckBox=function(){Button.call(this),this.appearanceStreamContent=n.Appearance.CheckBox.createAppearanceStream(),this.MK=n.Appearance.CheckBox.createMK(),this.AS="/On",this.V="/On"},n.internal.inherit(n.CheckBox,n.Button),window.CheckBox=n.CheckBox,n.TextField=function(){n.Field.call(this),this.DA=n.Appearance.createDefaultAppearanceStream(),this.F=4;var t;Object.defineProperty(this,"V",{get:function(){return t?"("+t+")":t},enumerable:!0,set:function(e){t=e}});var e;Object.defineProperty(this,"DV",{get:function(){return e?"("+e+")":e},enumerable:!0,set:function(t){e=t}});var r=!1;Object.defineProperty(this,"multiline",{enumerable:!1,get:function(){return r},set:function(t){r=t}});var i=!1;Object.defineProperty(this,"MaxLen",{enumerable:!0,get:function(){return i},set:function(t){i=t}}),Object.defineProperty(this,"hasAppearanceStream",{enumerable:!1,get:function(){return this.V||this.DV}})},n.internal.inherit(n.TextField,n.Field),window.TextField=n.TextField,n.PasswordField=function(){TextField.call(this),Object.defineProperty(this,"password",{value:!0,enumerable:!1,configurable:!1,writable:!1})},n.internal.inherit(n.PasswordField,n.TextField),window.PasswordField=n.PasswordField,n.internal.calculateFontSpace=function(t,e,r){var r=r||"helvetica",i=n.internal.calculateFontSpace.canvas||(n.internal.calculateFontSpace.canvas=document.createElement("canvas")),o=i.getContext("2d");o.save();var a=e+" "+r;o.font=a;var s=o.measureText(t);o.fontcolor="black";var o=i.getContext("2d");s.height=1.5*o.measureText("3").width,o.restore();s.width;return s},n.internal.calculateX=function(t,e,r,i){var i=i||12,r=r||"helvetica",o={text:"",fontSize:""};e="("==e.substr(0,1)?e.substr(1):e,e=")"==e.substr(e.length-1)?e.substr(0,e.length-1):e;var a=e.split(" "),s=i,c=2,l=2,u=n.Appearance.internal.getHeight(t)||0;u=u<0?-u:u;var h=n.Appearance.internal.getWidth(t)||0;h=h<0?-h:h;var f=function(t,e,i){if(t+1<a.length){var o=e+" "+a[t+1],s=n.internal.calculateFontSpace(o,i+"px",r).width,c=h-2*l;return s<=c}return!1};s++;t:for(;;){var e="";s--;var d=n.internal.calculateFontSpace("3",s+"px",r).height,p=t.multiline?u-s:(u-d)/2;p+=c;var g=-l,m=g,w=p,y=0,v=0,b=0;if(0==s){s=12,e="(...) Tj\n",e+="% Width of Text: "+n.internal.calculateFontSpace(e,"1px").width+", FieldWidth:"+h+"\n";break}b=n.internal.calculateFontSpace(a[0]+" ",s+"px",r).width;var x="",k=0;for(var _ in a){x+=a[_]+" ",x=" "==x.substr(x.length-1)?x.substr(0,x.length-1):x;var C=parseInt(_);b=n.internal.calculateFontSpace(x+" ",s+"px",r).width;var A=f(C,x,s),S=_>=a.length-1;if(!A||S){if(A||S){if(S)v=C;else if(t.multiline&&(d+c)*(k+2)+c>u)continue t}else{if(!t.multiline)continue t;if((d+c)*(k+2)+c>u)continue t;v=C}for(var q="",T=y;T<=v;T++)q+=a[T]+" ";switch(q=" "==q.substr(q.length-1)?q.substr(0,q.length-1):q,b=n.internal.calculateFontSpace(q,s+"px",r).width,t.Q){case 2:g=h-b-l;break;case 1:g=(h-b)/2;break;case 0:default:g=l}e+=g+" "+w+" Td\n",e+="("+q+") Tj\n",e+=-g+" 0 Td\n",w=-(s+c),m=g,b=0,y=v+1,k++,x=""}else x+=" "}break}return o.text=e,o.fontSize=s,o},n.internal.calculateAppearanceStream=function(t){if(t.appearanceStreamContent)return t.appearanceStreamContent;if(t.V||t.DV){var e="",r=t.V||t.DV,i=n.internal.calculateX(t,r);e+="/Tx BMC\nq\n/F1 "+i.fontSize+" Tf\n1 0 0 1 0 0 Tm\n",e+="BT\n",e+=i.text,e+="ET\n",e+="Q\nEMC\n";var o=new n.createFormXObject(t);o.stream=e;return o}},n.internal.calculateCoordinates=function(t,e,r,i){var o={};if(this.internal){var a=function(t){return t*this.internal.scaleFactor};Array.isArray(t)?(t[0]=n.scale(t[0]),t[1]=n.scale(t[1]),t[2]=n.scale(t[2]),t[3]=n.scale(t[3]),o.lowerLeft_X=t[0]||0,o.lowerLeft_Y=a.call(this,this.internal.pageSize.height)-t[3]-t[1]||0,o.upperRight_X=t[0]+t[2]||0,o.upperRight_Y=a.call(this,this.internal.pageSize.height)-t[1]||0):(t=n.scale(t),e=n.scale(e),r=n.scale(r),i=n.scale(i),o.lowerLeft_X=t||0,o.lowerLeft_Y=this.internal.pageSize.height-e||0,o.upperRight_X=t+r||0,o.upperRight_Y=this.internal.pageSize.height-e+i||0)}else Array.isArray(t)?(o.lowerLeft_X=t[0]||0,o.lowerLeft_Y=t[1]||0,o.upperRight_X=t[0]+t[2]||0,o.upperRight_Y=t[1]+t[3]||0):(o.lowerLeft_X=t||0,o.lowerLeft_Y=e||0,o.upperRight_X=t+r||0,o.upperRight_Y=e+i||0);return[o.lowerLeft_X,o.lowerLeft_Y,o.upperRight_X,o.upperRight_Y]},n.internal.calculateColor=function(t,e,n){var r=new Array(3);return r.r=0|t,r.g=0|e,r.b=0|n,r},n.internal.getBitPosition=function(t,e){t=t||0;var n=1;return n<<=e-1,t|n},n.internal.setBitPosition=function(t,e,n){t=t||0,n=n||1;var r=1;if(r<<=e-1,1==n)var t=t|r;else var t=t&~r;return t},/**
 * jsPDF addHTML PlugIn
 * Copyright (c) 2014 Diego Casorran
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){t.addHTML=function(t,e,n,r,i){if("undefined"==typeof html2canvas&&"undefined"==typeof rasterizeHTML)throw new Error("You need either https://github.com/niklasvh/html2canvas or https://github.com/cburgmer/rasterizeHTML.js");"number"!=typeof e&&(r=e,i=n),"function"==typeof r&&(i=r,r=null);var o=this.internal,a=o.scaleFactor,s=o.pageSize.width,c=o.pageSize.height;if(r=r||{},r.onrendered=function(t){e=parseInt(e)||0,n=parseInt(n)||0;var o=r.dim||{},l=o.h||0,u=o.w||Math.min(s,t.width/a)-e,h="JPEG";if(r.format&&(h=r.format),t.height>c&&r.pagesplit){var f=function(){for(var r=0;;){var o=document.createElement("canvas");o.width=Math.min(s*a,t.width),o.height=Math.min(c*a,t.height-r);var l=o.getContext("2d");l.drawImage(t,0,r,t.width,o.height,0,0,o.width,o.height);var f=[o,e,r?0:n,o.width/a,o.height/a,h,null,"SLOW"];if(this.addImage.apply(this,f),r+=o.height,r>=t.height)break;this.addPage()}i(u,r,null,f)}.bind(this);if("CANVAS"===t.nodeName){var d=new Image;d.onload=f,d.src=t.toDataURL("image/png"),t=d}else f()}else{var p=Math.random().toString(35),g=[t,e,n,u,l,h,p,"SLOW"];this.addImage.apply(this,g),i(u,l,p,g)}}.bind(this),"undefined"!=typeof html2canvas&&!r.rstz)return html2canvas(t,r);if("undefined"!=typeof rasterizeHTML){var l="drawDocument";return"string"==typeof t&&(l=/^http/.test(t)?"drawURL":"drawHTML"),r.width=r.width||s*a,rasterizeHTML[l](t,void 0,r).then(function(t){r.onrendered(t.image)},function(t){i(null,t)})}return null}}(e.API),/** @preserve
 * jsPDF addImage plugin
 * Copyright (c) 2012 Jason Siefken, https://github.com/siefkenj/
 *               2013 Chris Dowling, https://github.com/gingerchris
 *               2013 Trinh Ho, https://github.com/ineedfat
 *               2013 Edwin Alejandro Perez, https://github.com/eaparango
 *               2013 Norah Smith, https://github.com/burnburnrocket
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 James Robb, https://github.com/jamesbrobb
 *
 * 
 */
function(e){var n="addImage_",r=["jpeg","jpg","png"],i=function t(e){var n=this.internal.newObject(),r=this.internal.write,i=this.internal.putStream;if(e.n=n,r("<</Type /XObject"),r("/Subtype /Image"),r("/Width "+e.w),r("/Height "+e.h),e.cs===this.color_spaces.INDEXED?r("/ColorSpace [/Indexed /DeviceRGB "+(e.pal.length/3-1)+" "+("smask"in e?n+2:n+1)+" 0 R]"):(r("/ColorSpace /"+e.cs),e.cs===this.color_spaces.DEVICE_CMYK&&r("/Decode [1 0 1 0 1 0 1 0]")),r("/BitsPerComponent "+e.bpc),"f"in e&&r("/Filter /"+e.f),"dp"in e&&r("/DecodeParms <<"+e.dp+">>"),"trns"in e&&e.trns.constructor==Array){for(var o="",a=0,s=e.trns.length;a<s;a++)o+=e.trns[a]+" "+e.trns[a]+" ";r("/Mask ["+o+"]")}if("smask"in e&&r("/SMask "+(n+1)+" 0 R"),r("/Length "+e.data.length+">>"),i(e.data),r("endobj"),"smask"in e){var c="/Predictor "+e.p+" /Colors 1 /BitsPerComponent "+e.bpc+" /Columns "+e.w,l={w:e.w,h:e.h,cs:"DeviceGray",bpc:e.bpc,dp:c,data:e.smask};"f"in e&&(l.f=e.f),t.call(this,l)}e.cs===this.color_spaces.INDEXED&&(this.internal.newObject(),r("<< /Length "+e.pal.length+">>"),i(this.arrayBufferToBinaryString(new Uint8Array(e.pal))),r("endobj"))},o=function(){var t=this.internal.collections[n+"images"];for(var e in t)i.call(this,t[e])},a=function(){var t,e=this.internal.collections[n+"images"],r=this.internal.write;for(var i in e)t=e[i],r("/I"+t.i,t.n,"0","R")},s=function(t){return t&&"string"==typeof t&&(t=t.toUpperCase()),t in e.image_compression?t:e.image_compression.NONE},c=function(){var t=this.internal.collections[n+"images"];return t||(this.internal.collections[n+"images"]=t={},this.internal.events.subscribe("putResources",o),this.internal.events.subscribe("putXobjectDict",a)),t},l=function(t){var e=0;return t&&(e=Object.keys?Object.keys(t).length:function(t){var e=0;for(var n in t)t.hasOwnProperty(n)&&e++;return e}(t)),e},u=function(t){return"undefined"==typeof t||null===t},h=function(t){return"string"==typeof t&&e.sHashCode(t)},f=function(t){return r.indexOf(t)===-1},d=function(t){return"function"!=typeof e["process"+t.toUpperCase()]},p=function(e){return"object"===("undefined"==typeof e?"undefined":t(e))&&1===e.nodeType},g=function(e,n,r){if("IMG"===e.nodeName&&e.hasAttribute("src")){var i=""+e.getAttribute("src");if(!r&&0===i.indexOf("data:image/"))return i;!n&&/\.png(?:[?#].*)?$/i.test(i)&&(n="png")}if("CANVAS"===e.nodeName)var o=e;else{var o=document.createElement("canvas");o.width=e.clientWidth||e.width,o.height=e.clientHeight||e.height;var a=o.getContext("2d");if(!a)throw"addImage requires canvas to be supported by browser.";if(r){var s,c,l,u,h,f,d,p,g=Math.PI/180;"object"===("undefined"==typeof r?"undefined":t(r))&&(s=r.x,c=r.y,l=r.bg,r=r.angle),p=r*g,u=Math.abs(Math.cos(p)),h=Math.abs(Math.sin(p)),f=o.width,d=o.height,o.width=d*h+f*u,o.height=d*u+f*h,isNaN(s)&&(s=o.width/2),isNaN(c)&&(c=o.height/2),a.clearRect(0,0,o.width,o.height),a.fillStyle=l||"white",a.fillRect(0,0,o.width,o.height),a.save(),a.translate(s,c),a.rotate(p),a.drawImage(e,-(f/2),-(d/2)),a.rotate(-p),a.translate(-s,-c),a.restore()}else a.drawImage(e,0,0,o.width,o.height)}return o.toDataURL("png"==(""+n).toLowerCase()?"image/png":"image/jpeg")},m=function(t,e){var n;if(e)for(var r in e)if(t===e[r].alias){n=e[r];break}return n},w=function(t,e,n){return t||e||(t=-96,e=-96),t<0&&(t=-1*n.w*72/t/this.internal.scaleFactor),e<0&&(e=-1*n.h*72/e/this.internal.scaleFactor),0===t&&(t=e*n.w/n.h),0===e&&(e=t*n.h/n.w),[t,e]},y=function(t,e,n,r,i,o,a){var s=w.call(this,n,r,i),c=this.internal.getCoordinateString,l=this.internal.getVerticalCoordinateString;n=s[0],r=s[1],a[o]=i,this.internal.write("q",c(n),"0 0",c(r),c(t),l(e+r),"cm /I"+i.i,"Do Q")};e.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPARATION:"Separation",DEVICE_N:"DeviceN"},e.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"},e.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"},e.sHashCode=function(t){return Array.prototype.reduce&&t.split("").reduce(function(t,e){return t=(t<<5)-t+e.charCodeAt(0),t&t},0)},e.isString=function(t){return"string"==typeof t},e.extractInfoFromBase64DataURI=function(t){return/^data:([\w]+?\/([\w]+?));base64,(.+?)$/g.exec(t)},e.supportsArrayBuffer=function(){return"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array},e.isArrayBuffer=function(t){return!!this.supportsArrayBuffer()&&t instanceof ArrayBuffer},e.isArrayBufferView=function(t){return!!this.supportsArrayBuffer()&&("undefined"!=typeof Uint32Array&&(t instanceof Int8Array||t instanceof Uint8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))},e.binaryStringToUint8Array=function(t){for(var e=t.length,n=new Uint8Array(e),r=0;r<e;r++)n[r]=t.charCodeAt(r);return n},e.arrayBufferToBinaryString=function(t){this.isArrayBuffer(t)&&(t=new Uint8Array(t));for(var e="",n=t.byteLength,r=0;r<n;r++)e+=String.fromCharCode(t[r]);return e},e.arrayBufferToBase64=function(t){for(var e,n,r,i,o,a="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=new Uint8Array(t),l=c.byteLength,u=l%3,h=l-u,f=0;f<h;f+=3)o=c[f]<<16|c[f+1]<<8|c[f+2],e=(16515072&o)>>18,n=(258048&o)>>12,r=(4032&o)>>6,i=63&o,a+=s[e]+s[n]+s[r]+s[i];return 1==u?(o=c[h],e=(252&o)>>2,n=(3&o)<<4,a+=s[e]+s[n]+"=="):2==u&&(o=c[h]<<8|c[h+1],e=(64512&o)>>10,n=(1008&o)>>4,r=(15&o)<<2,a+=s[e]+s[n]+s[r]+"="),a},e.createImageInfo=function(t,e,n,r,i,o,a,s,c,l,u,h,f){var d={alias:s,w:e,h:n,cs:r,bpc:i,i:a,data:t};return o&&(d.f=o),c&&(d.dp=c),l&&(d.trns=l),u&&(d.pal=u),h&&(d.smask=h),f&&(d.p=f),d},e.addImage=function(e,n,i,o,a,w,v,b,x){if("string"!=typeof n){var k=w;w=a,a=o,o=i,i=n,n=k}if("object"===("undefined"==typeof e?"undefined":t(e))&&!p(e)&&"imageData"in e){var _=e;e=_.imageData,n=_.format||n,i=_.x||i||0,o=_.y||o||0,a=_.w||a,w=_.h||w,v=_.alias||v,b=_.compression||b,x=_.rotation||_.angle||x}if(isNaN(i)||isNaN(o))throw console.error("jsPDF.addImage: Invalid coordinates",arguments),new Error("Invalid coordinates passed to jsPDF.addImage");var C,A=c.call(this);if(!(C=m(e,A))){var S;if(p(e)&&(e=g(e,n,x)),u(v)&&(v=h(e)),!(C=m(v,A))){if(this.isString(e)){var q=this.extractInfoFromBase64DataURI(e);q?(n=q[2],e=atob(q[3])):137===e.charCodeAt(0)&&80===e.charCodeAt(1)&&78===e.charCodeAt(2)&&71===e.charCodeAt(3)&&(n="png")}if(n=(n||"JPEG").toLowerCase(),f(n))throw new Error("addImage currently only supports formats "+r+", not '"+n+"'");if(d(n))throw new Error("please ensure that the plugin for '"+n+"' support is added");if(this.supportsArrayBuffer()&&(e instanceof Uint8Array||(S=e,e=this.binaryStringToUint8Array(e))),C=this["process"+n.toUpperCase()](e,l(A),v,s(b),S),!C)throw new Error("An unkwown error occurred whilst processing the image")}}return y.call(this,i,o,a,w,C,C.i,A),this};var v=function(t){var e,n,r;if(255===!t.charCodeAt(0)||216===!t.charCodeAt(1)||255===!t.charCodeAt(2)||224===!t.charCodeAt(3)||!t.charCodeAt(6)==="J".charCodeAt(0)||!t.charCodeAt(7)==="F".charCodeAt(0)||!t.charCodeAt(8)==="I".charCodeAt(0)||!t.charCodeAt(9)==="F".charCodeAt(0)||0===!t.charCodeAt(10))throw new Error("getJpegSize requires a binary string jpeg file");for(var i=256*t.charCodeAt(4)+t.charCodeAt(5),o=4,a=t.length;o<a;){if(o+=i,255!==t.charCodeAt(o))throw new Error("getJpegSize could not find the size of the image");if(192===t.charCodeAt(o+1)||193===t.charCodeAt(o+1)||194===t.charCodeAt(o+1)||195===t.charCodeAt(o+1)||196===t.charCodeAt(o+1)||197===t.charCodeAt(o+1)||198===t.charCodeAt(o+1)||199===t.charCodeAt(o+1))return n=256*t.charCodeAt(o+5)+t.charCodeAt(o+6),e=256*t.charCodeAt(o+7)+t.charCodeAt(o+8),r=t.charCodeAt(o+9),[e,n,r];o+=2,i=256*t.charCodeAt(o)+t.charCodeAt(o+1)}},b=function(t){var e=t[0]<<8|t[1];if(65496!==e)throw new Error("Supplied data is not a JPEG");for(var n,r,i,o,a=t.length,s=(t[4]<<8)+t[5],c=4;c<a;){if(c+=s,n=x(t,c),s=(n[2]<<8)+n[3],(192===n[1]||194===n[1])&&255===n[0]&&s>7)return n=x(t,c+5),r=(n[2]<<8)+n[3],i=(n[0]<<8)+n[1],o=n[4],{width:r,height:i,numcomponents:o};c+=2}throw new Error("getJpegSizeFromBytes could not find the size of the image")},x=function(t,e){return t.subarray(e,e+5)};e.processJPEG=function(t,e,n,r,i){var o,a=this.color_spaces.DEVICE_RGB,s=this.decode.DCT_DECODE,c=8;return this.isString(t)?(o=v(t),this.createImageInfo(t,o[0],o[1],1==o[3]?this.color_spaces.DEVICE_GRAY:a,c,s,e,n)):(this.isArrayBuffer(t)&&(t=new Uint8Array(t)),this.isArrayBufferView(t)?(o=b(t),t=i||this.arrayBufferToBinaryString(t),this.createImageInfo(t,o.width,o.height,1==o.numcomponents?this.color_spaces.DEVICE_GRAY:a,c,s,e,n)):null)},e.processJPG=function(){return this.processJPEG.apply(this,arguments)}}(e.API),/**
 * jsPDF Annotations PlugIn
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var n={annotations:[],f2:function(t){return t.toFixed(2)},notEmpty:function(t){if("undefined"!=typeof t&&""!=t)return!0}};return e.API.annotationPlugin=n,e.API.events.push(["addPage",function(t){this.annotationPlugin.annotations[t.pageNumber]=[]}]),t.events.push(["putPage",function(t){for(var e=this.annotationPlugin.annotations[t.pageNumber],r=!1,i=0;i<e.length&&!r;i++){var o=e[i];switch(o.type){case"link":if(n.notEmpty(o.options.url)||n.notEmpty(o.options.pageNumber)){r=!0;break}case"reference":case"text":case"freetext":r=!0}}if(0!=r){this.internal.write("/Annots [");for(var a=this.annotationPlugin.f2,s=this.internal.scaleFactor,c=this.internal.pageSize.height,l=this.internal.getPageInfo(t.pageNumber),i=0;i<e.length;i++){var o=e[i];switch(o.type){case"reference":this.internal.write(" "+o.object.objId+" 0 R ");break;case"text":var u=this.internal.newAdditionalObject(),h=this.internal.newAdditionalObject(),f=o.title||"Note",d="/Rect ["+a(o.bounds.x*s)+" "+a(c-(o.bounds.y+o.bounds.h)*s)+" "+a((o.bounds.x+o.bounds.w)*s)+" "+a((c-o.bounds.y)*s)+"] ";y="<</Type /Annot /Subtype /Text "+d+"/Contents ("+o.contents+")",y+=" /Popup "+h.objId+" 0 R",y+=" /P "+l.objId+" 0 R",y+=" /T ("+f+") >>",u.content=y;var p=u.objId+" 0 R",g=30,d="/Rect ["+a((o.bounds.x+g)*s)+" "+a(c-(o.bounds.y+o.bounds.h)*s)+" "+a((o.bounds.x+o.bounds.w+g)*s)+" "+a((c-o.bounds.y)*s)+"] ";y="<</Type /Annot /Subtype /Popup "+d+" /Parent "+p,o.open&&(y+=" /Open true"),y+=" >>",h.content=y,this.internal.write(u.objId,"0 R",h.objId,"0 R");break;case"freetext":var d="/Rect ["+a(o.bounds.x*s)+" "+a((c-o.bounds.y)*s)+" "+a(o.bounds.x+o.bounds.w*s)+" "+a(c-(o.bounds.y+o.bounds.h)*s)+"] ",m=o.color||"#000000";y="<</Type /Annot /Subtype /FreeText "+d+"/Contents ("+o.contents+")",y+=" /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#"+m+")",y+=" /Border [0 0 0]",y+=" >>",this.internal.write(y);break;case"link":if(o.options.name){var w=this.annotations._nameMap[o.options.name];o.options.pageNumber=w.page,o.options.top=w.y}else o.options.top||(o.options.top=0);var d="/Rect ["+a(o.x*s)+" "+a((c-o.y)*s)+" "+a(o.x+o.w*s)+" "+a(c-(o.y+o.h)*s)+"] ",y="";if(o.options.url)y="<</Type /Annot /Subtype /Link "+d+"/Border [0 0 0] /A <</S /URI /URI ("+o.options.url+") >>";else if(o.options.pageNumber){var t=this.internal.getPageInfo(o.options.pageNumber);switch(y="<</Type /Annot /Subtype /Link "+d+"/Border [0 0 0] /Dest ["+t.objId+" 0 R",o.options.magFactor=o.options.magFactor||"XYZ",o.options.magFactor){case"Fit":y+=" /Fit]";break;case"FitH":y+=" /FitH "+o.options.top+"]";break;case"FitV":o.options.left=o.options.left||0,y+=" /FitV "+o.options.left+"]";break;case"XYZ":default:var v=a((c-o.options.top)*s);o.options.left=o.options.left||0,"undefined"==typeof o.options.zoom&&(o.options.zoom=0),y+=" /XYZ "+o.options.left+" "+v+" "+o.options.zoom+"]"}}""!=y&&(y+=" >>",this.internal.write(y))}}this.internal.write("]")}}]),t.createAnnotation=function(t){switch(t.type){case"link":this.link(t.bounds.x,t.bounds.y,t.bounds.w,t.bounds.h,t);break;case"text":case"freetext":this.annotationPlugin.annotations[this.internal.getCurrentPageInfo().pageNumber].push(t)}},t.link=function(t,e,n,r,i){this.annotationPlugin.annotations[this.internal.getCurrentPageInfo().pageNumber].push({x:t,y:e,w:n,h:r,options:i,type:"link"})},t.link=function(t,e,n,r,i){this.annotationPlugin.annotations[this.internal.getCurrentPageInfo().pageNumber].push({x:t,y:e,w:n,h:r,options:i,type:"link"})},t.textWithLink=function(t,e,n,r){var i=this.getTextWidth(t),o=this.internal.getLineHeight();return this.text(t,e,n),n+=.2*o,this.link(e,n-o,i,o,r),i},t.getTextWidth=function(t){var e=this.internal.getFontSize(),n=this.getStringUnitWidth(t)*e/this.internal.scaleFactor;return n},t.getLineHeight=function(){return this.internal.getLineHeight()},this}(e.API),function(t){t.autoPrint=function(){var t;return this.internal.events.subscribe("postPutResources",function(){t=this.internal.newObject(),this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj")}),this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+t+" 0 R")}),this}}(e.API),/**
 * jsPDF Canvas PlugIn
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){return t.events.push(["initialized",function(){this.canvas.pdf=this}]),t.canvas={getContext:function(t){return this.pdf.context2d._canvas=this,this.pdf.context2d},style:{}},Object.defineProperty(t.canvas,"width",{get:function(){return this._width},set:function(t){this._width=t,this.getContext("2d").pageWrapX=t+1}}),Object.defineProperty(t.canvas,"height",{get:function(){return this._height},set:function(t){this._height=t,this.getContext("2d").pageWrapY=t+1}}),this}(e.API),/** ====================================================================
 * jsPDF Cell plugin
 * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
 *               2013 Eduardo Menezes de Morais, eduardo.morais@usp.br
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Hall, james@parall.ax
 *               2014 Diego Casorran, https://github.com/diegocr
 *
 * 
 * ====================================================================
 */
function(t){var e,n,r,i,o=3,a=13,s={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},c=1,l=function(t,e,n,r,i){s={x:t,y:e,w:n,h:r,ln:i}},u=function(){return s},h={left:0,top:0,bottom:0};t.setHeaderFunction=function(t){i=t},t.getTextDimensions=function(t){e=this.internal.getFont().fontName,n=this.table_font_size||this.internal.getFontSize(),r=this.internal.getFont().fontStyle;var i,o,a=19.049976/25.4;o=document.createElement("font"),o.id="jsPDFCell";try{o.style.fontStyle=r}catch(t){o.style.fontWeight=r}o.style.fontName=e,o.style.fontSize=n+"pt";try{o.textContent=t}catch(e){o.innerText=t}return document.body.appendChild(o),i={w:(o.offsetWidth+1)*a,h:(o.offsetHeight+1)*a},document.body.removeChild(o),i},t.cellAddPage=function(){var t=this.margins||h;this.addPage(),l(t.left,t.top,void 0,void 0),c+=1},t.cellInitialize=function(){s={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},c=1},t.cell=function(t,e,n,r,i,s,c){var f=u(),d=!1;if(void 0!==f.ln)if(f.ln===s)t=f.x+f.w,e=f.y;else{var p=this.margins||h;f.y+f.h+r+a>=this.internal.pageSize.height-p.bottom&&(this.cellAddPage(),d=!0,this.printHeaders&&this.tableHeaderRow&&this.printHeaderRow(s,!0)),e=u().y+u().h,d&&(e=a+10)}if(void 0!==i[0])if(this.printingHeaderRow?this.rect(t,e,n,r,"FD"):this.rect(t,e,n,r),"right"===c){i instanceof Array||(i=[i]);for(var g=0;g<i.length;g++){var m=i[g],w=this.getStringUnitWidth(m)*this.internal.getFontSize();this.text(m,t+n-w-o,e+this.internal.getLineHeight()*(g+1))}}else this.text(i,t+o,e+this.internal.getLineHeight());return l(t,e,n,r,s),this},t.arrayMax=function(t,e){var n,r,i,o=t[0];for(n=0,r=t.length;n<r;n+=1)i=t[n],e?e(o,i)===-1&&(o=i):i>o&&(o=i);return o},t.table=function(e,n,r,i,o){if(!r)throw"No data for PDF table";var a,l,u,f,d,p,g,m,w,y,v=[],b=[],x={},k={},_=[],C=[],A=!1,S=!0,q=12,T=h;if(T.width=this.internal.pageSize.width,o&&(o.autoSize===!0&&(A=!0),o.printHeaders===!1&&(S=!1),o.fontSize&&(q=o.fontSize),o.css&&"undefined"!=typeof o.css["font-size"]&&(q=16*o.css["font-size"]),o.margins&&(T=o.margins)),this.lnMod=0,s={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},c=1,this.printHeaders=S,this.margins=T,this.setFontSize(q),this.table_font_size=q,void 0===i||null===i)v=Object.keys(r[0]);else if(i[0]&&"string"!=typeof i[0]){var P=19.049976/25.4;for(l=0,u=i.length;l<u;l+=1)a=i[l],v.push(a.name),b.push(a.prompt),k[a.name]=a.width*P}else v=i;if(A)for(y=function(t){return t[a]},l=0,u=v.length;l<u;l+=1){for(a=v[l],x[a]=r.map(y),_.push(this.getTextDimensions(b[l]||a).w),p=x[a],g=0,f=p.length;g<f;g+=1)d=p[g],_.push(this.getTextDimensions(d).w);k[a]=t.arrayMax(_),_=[]}if(S){var I=this.calculateLineHeight(v,k,b.length?b:v);for(l=0,u=v.length;l<u;l+=1)a=v[l],C.push([e,n,k[a],I,String(b.length?b[l]:a)]);this.setTableHeaderRow(C),this.printHeaderRow(1,!1)}for(l=0,u=r.length;l<u;l+=1){var I;for(m=r[l],I=this.calculateLineHeight(v,k,m),g=0,w=v.length;g<w;g+=1)a=v[g],this.cell(e,n,k[a],I,m[a],l+2,a.align)}return this.lastCellPos=s,this.table_x=e,this.table_y=n,this},t.calculateLineHeight=function(t,e,n){for(var r,i=0,a=0;a<t.length;a++){r=t[a],n[r]=this.splitTextToSize(String(n[r]),e[r]-o);var s=this.internal.getLineHeight()*n[r].length+o;s>i&&(i=s)}return i},t.setTableHeaderRow=function(t){this.tableHeaderRow=t},t.printHeaderRow=function(t,e){if(!this.tableHeaderRow)throw"Property tableHeaderRow does not exist.";var n,r,o,s;if(this.printingHeaderRow=!0,void 0!==i){var u=i(this,c);l(u[0],u[1],u[2],u[3],-1)}this.setFontStyle("bold");var h=[];for(o=0,s=this.tableHeaderRow.length;o<s;o+=1)this.setFillColor(200,200,200),n=this.tableHeaderRow[o],e&&(this.margins.top=a,n[1]=this.margins&&this.margins.top||0,h.push(n)),r=[].concat(n),this.cell.apply(this,r.concat(t));h.length>0&&this.setTableHeaderRow(h),this.setFontStyle("normal"),this.printingHeaderRow=!1}}(e.API),/**
 * jsPDF Context2D PlugIn Copyright (c) 2014 Steven Spungin (TwelveTone LLC) steven@twelvetone.tv
 *
 * Licensed under the MIT License. http://opensource.org/licenses/mit-license
 */
function(t){function e(){this._isStrokeTransparent=!1,this._strokeOpacity=1,this.strokeStyle="#000000",this.fillStyle="#000000",this._isFillTransparent=!1,this._fillOpacity=1,this.font="12pt times",this.textBaseline="alphabetic",this.textAlign="start",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this._transform=[1,0,0,1,0,0],this.globalCompositeOperation="normal",this.globalAlpha=1,this._clip_path=[],this.ignoreClearRect=!1,this.copy=function(t){this._isStrokeTransparent=t._isStrokeTransparent,this._strokeOpacity=t._strokeOpacity,this.strokeStyle=t.strokeStyle,this._isFillTransparent=t._isFillTransparent,this._fillOpacity=t._fillOpacity,this.fillStyle=t.fillStyle,this.font=t.font,this.lineWidth=t.lineWidth,this.lineJoin=t.lineJoin,this.lineCap=t.lineCap,this.textBaseline=t.textBaseline,this.textAlign=t.textAlign,this._fontSize=t._fontSize,this._transform=t._transform.slice(0),this.globalCompositeOperation=t.globalCompositeOperation,this.globalAlpha=t.globalAlpha,this._clip_path=t._clip_path.slice(0),this.ignoreClearRect=t.ignoreClearRect}}t.events.push(["initialized",function(){this.context2d.pdf=this,this.context2d.internal.pdf=this,this.context2d.ctx=new e,this.context2d.ctxStack=[],this.context2d.path=[]}]),t.context2d={pageWrapXEnabled:!1,pageWrapYEnabled:!1,pageWrapX:9999999,pageWrapY:9999999,ctx:new e,f2:function(t){return t.toFixed(2)},fillRect:function(t,e,n,r){if(!this._isFillTransparent()){t=this._wrapX(t),e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.pdf.rect(i.x,i.y,i.w,i.h,"f")}},strokeRect:function(t,e,n,r){if(!this._isStrokeTransparent()){t=this._wrapX(t),e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.pdf.rect(i.x,i.y,i.w,i.h,"s")}},clearRect:function(t,e,n,r){if(!this.ctx.ignoreClearRect){t=this._wrapX(t),e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.save(),this.setFillStyle("#ffffff"),this.pdf.rect(i.x,i.y,i.w,i.h,"f"),this.restore()}},save:function(){this.ctx._fontSize=this.pdf.internal.getFontSize();var t=new e;t.copy(this.ctx),this.ctxStack.push(this.ctx),this.ctx=t},restore:function(){this.ctx=this.ctxStack.pop(),this.setFillStyle(this.ctx.fillStyle),this.setStrokeStyle(this.ctx.strokeStyle),this.setFont(this.ctx.font),this.pdf.setFontSize(this.ctx._fontSize),this.setLineCap(this.ctx.lineCap),this.setLineWidth(this.ctx.lineWidth),this.setLineJoin(this.ctx.lineJoin)},rect:function(t,e,n,r){this.moveTo(t,e),this.lineTo(t+n,e),this.lineTo(t+n,e+r),this.lineTo(t,e+r),this.lineTo(t,e),this.closePath()},beginPath:function(){this.path=[]},closePath:function(){this.path.push({type:"close"})},_getRgba:function(t){var e={};if(this.internal.rxTransparent.test(t))e.r=0,e.g=0,e.b=0,e.a=0;else{var n=this.internal.rxRgb.exec(t);null!=n?(e.r=parseInt(n[1]),e.g=parseInt(n[2]),e.b=parseInt(n[3]),e.a=1):(n=this.internal.rxRgba.exec(t),null!=n?(e.r=parseInt(n[1]),e.g=parseInt(n[2]),e.b=parseInt(n[3]),e.a=parseFloat(n[4])):(e.a=1,"#"!=t.charAt(0)&&(t=o.colorNameToHex(t),t||(t="#000000")),4===t.length?(e.r=t.substring(1,2),e.r+=r,e.g=t.substring(2,3),e.g+=g,e.b=t.substring(3,4),e.b+=b):(e.r=t.substring(1,3),e.g=t.substring(3,5),e.b=t.substring(5,7)),e.r=parseInt(e.r,16),e.g=parseInt(e.g,16),e.b=parseInt(e.b,16)))}return e.style=t,e},setFillStyle:function(t){var e,n,r,i;if(this.internal.rxTransparent.test(t))e=0,n=0,r=0,i=0;else{var a=this.internal.rxRgb.exec(t);null!=a?(e=parseInt(a[1]),n=parseInt(a[2]),r=parseInt(a[3]),i=1):(a=this.internal.rxRgba.exec(t),null!=a?(e=parseInt(a[1]),n=parseInt(a[2]),r=parseInt(a[3]),i=parseFloat(a[4])):(i=1,"#"!=t.charAt(0)&&(t=o.colorNameToHex(t),t||(t="#000000")),4===t.length?(e=t.substring(1,2),e+=e,n=t.substring(2,3),n+=n,r=t.substring(3,4),r+=r):(e=t.substring(1,3),n=t.substring(3,5),r=t.substring(5,7)),e=parseInt(e,16),n=parseInt(n,16),r=parseInt(r,16)))}this.ctx.fillStyle=t,this.ctx._isFillTransparent=0==i,this.ctx._fillOpacity=i,this.pdf.setFillColor(e,n,r,{a:i}),this.pdf.setTextColor(e,n,r,{a:i})},setStrokeStyle:function(t){var e=this._getRgba(t);this.ctx.strokeStyle=e.style,this.ctx._isStrokeTransparent=0==e.a,this.ctx._strokeOpacity=e.a,0===e.a?this.pdf.setDrawColor(255,255,255):1===e.a?this.pdf.setDrawColor(e.r,e.g,e.b):this.pdf.setDrawColor(e.r,e.g,e.b)},fillText:function(t,e,n,r){if(!this._isFillTransparent()){e=this._wrapX(e),n=this._wrapY(n);var i=this._matrix_map_point(this.ctx._transform,[e,n]);e=i[0],n=i[1];var o=this._matrix_rotation(this.ctx._transform),a=57.2958*o;if(this.ctx._clip_path.length>0){var s;s=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage(),s.push("q");var c=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._fill(null,!0),this.ctx._clip_path=this.path,this.path=c}var l;if(l=this.pdf.hotfix&&this.pdf.hotfix.scale_text?this._getTransform()[0]:1,l<.01)this.pdf.text(t,e,this._getBaseline(n),null,a);else{var u=this.pdf.internal.getFontSize();this.pdf.setFontSize(u*l),this.pdf.text(t,e,this._getBaseline(n),null,a),this.pdf.setFontSize(u)}this.ctx._clip_path.length>0&&s.push("Q")}},strokeText:function(t,e,n,r){if(!this._isStrokeTransparent()){e=this._wrapX(e),n=this._wrapY(n);var i=this._matrix_map_point(this.ctx._transform,[e,n]);e=i[0],n=i[1];var o=this._matrix_rotation(this.ctx._transform),a=57.2958*o;if(this.ctx._clip_path.length>0){var s;s=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage(),s.push("q");var c=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._fill(null,!0),this.ctx._clip_path=this.path,this.path=c}var l;if(l=this.pdf.hotfix&&this.pdf.hotfix.scale_text?this._getTransform()[0]:1,1===l)this.pdf.text(t,e,this._getBaseline(n),{stroke:!0},a);else{var u=this.pdf.internal.getFontSize();this.pdf.setFontSize(u*l),this.pdf.text(t,e,this._getBaseline(n),{stroke:!0},a),this.pdf.setFontSize(u)}this.ctx._clip_path.length>0&&s.push("Q")}},setFont:function(t){this.ctx.font=t;var e=/\s*(\w+)\s+(\w+)\s+(\w+)\s+([\d\.]+)(px|pt|em)\s+(.*)?/;if(h=e.exec(t),null!=h){var n=h[1],r=(h[2],h[3]),i=h[4],o=h[5],a=h[6];i="px"===o?Math.floor(parseFloat(i)):"em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(i)),this.pdf.setFontSize(i),"bold"===r||"700"===r?this.pdf.setFontStyle("bold"):"italic"===n?this.pdf.setFontStyle("italic"):this.pdf.setFontStyle("normal");var s,c=a,l=c.toLowerCase().split(/\s*,\s*/);s=l.indexOf("arial")!=-1?"Arial":l.indexOf("verdana")!=-1?"Verdana":l.indexOf("helvetica")!=-1?"Helvetica":l.indexOf("sans-serif")!=-1?"sans-serif":l.indexOf("fixed")!=-1?"Fixed":l.indexOf("monospace")!=-1?"Monospace":l.indexOf("terminal")!=-1?"Terminal":l.indexOf("courier")!=-1?"Courier":l.indexOf("times")!=-1?"Times":l.indexOf("cursive")!=-1?"Cursive":l.indexOf("fantasy")!=-1?"Fantasy":(l.indexOf("serif")!=-1,"Serif");var u;u="bold"===r?"bold":"normal",this.pdf.setFont(s,u)}else{var e=/(\d+)(pt|px|em)\s+(\w+)\s*(\w+)?/,h=e.exec(t);if(null!=h){var f=h[1],c=(h[2],h[3]),u=h[4];u||(u="normal"),f="em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(f)),this.pdf.setFontSize(f),this.pdf.setFont(c,u)}}},setTextBaseline:function(t){this.ctx.textBaseline=t},getTextBaseline:function(){return this.ctx.textBaseline},setTextAlign:function(t){this.ctx.textAlign=t},getTextAlign:function(){return this.ctx.textAlign},setLineWidth:function(t){this.ctx.lineWidth=t,this.pdf.setLineWidth(t)},setLineCap:function(t){this.ctx.lineCap=t,this.pdf.setLineCap(t)},setLineJoin:function(t){this.ctx.lineJoin=t,this.pdf.setLineJoin(t)},moveTo:function(t,e){t=this._wrapX(t),e=this._wrapY(e);var n=this._matrix_map_point(this.ctx._transform,[t,e]);t=n[0],e=n[1];var r={type:"mt",x:t,y:e};this.path.push(r)},_wrapX:function(t){return this.pageWrapXEnabled?t%this.pageWrapX:t},_wrapY:function(t){return this.pageWrapYEnabled?(this._gotoPage(this._page(t)),(t-this.lastBreak)%this.pageWrapY):t},transform:function(t,e,n,r,i,o){this.ctx._transform=[t,e,n,r,i,o]},setTransform:function(t,e,n,r,i,o){this.ctx._transform=[t,e,n,r,i,o]},_getTransform:function(){return this.ctx._transform},lastBreak:0,pageBreaks:[],_page:function(t){if(this.pageWrapYEnabled){this.lastBreak=0;for(var e=0,n=0,r=0;r<this.pageBreaks.length;r++)if(t>=this.pageBreaks[r]){e++,0===this.lastBreak&&n++;var i=this.pageBreaks[r]-this.lastBreak;this.lastBreak=this.pageBreaks[r];var o=Math.floor(i/this.pageWrapY);n+=o}if(0===this.lastBreak){var o=Math.floor(t/this.pageWrapY)+1;n+=o}return n+e}return this.pdf.internal.getCurrentPageInfo().pageNumber},_gotoPage:function(t){},lineTo:function(t,e){t=this._wrapX(t),e=this._wrapY(e);var n=this._matrix_map_point(this.ctx._transform,[t,e]);t=n[0],e=n[1];var r={type:"lt",x:t,y:e};this.path.push(r)},bezierCurveTo:function(t,e,n,r,i,o){t=this._wrapX(t),e=this._wrapY(e),n=this._wrapX(n),r=this._wrapY(r),i=this._wrapX(i),o=this._wrapY(o);var a;a=this._matrix_map_point(this.ctx._transform,[i,o]),i=a[0],o=a[1],a=this._matrix_map_point(this.ctx._transform,[t,e]),t=a[0],e=a[1],a=this._matrix_map_point(this.ctx._transform,[n,r]),n=a[0],r=a[1];var s={type:"bct",x1:t,y1:e,x2:n,y2:r,x:i,y:o};this.path.push(s)},quadraticCurveTo:function(t,e,n,r){t=this._wrapX(t),e=this._wrapY(e),n=this._wrapX(n),r=this._wrapY(r);var i;i=this._matrix_map_point(this.ctx._transform,[n,r]),n=i[0],r=i[1],i=this._matrix_map_point(this.ctx._transform,[t,e]),t=i[0],e=i[1];var o={type:"qct",x1:t,y1:e,x:n,y:r};this.path.push(o)},arc:function(t,e,n,r,i,o){if(t=this._wrapX(t),e=this._wrapY(e),!this._matrix_is_identity(this.ctx._transform)){var a=this._matrix_map_point(this.ctx._transform,[t,e]);t=a[0],e=a[1];var s=this._matrix_map_point(this.ctx._transform,[0,0]),c=this._matrix_map_point(this.ctx._transform,[0,n]);n=Math.sqrt(Math.pow(c[0]-s[0],2)+Math.pow(c[1]-s[1],2))}var l={type:"arc",x:t,y:e,radius:n,startAngle:r,endAngle:i,anticlockwise:o};this.path.push(l)},drawImage:function(t,e,n,r,i,o,a,s,c){void 0!==o&&(e=o,n=a,r=s,i=c),e=this._wrapX(e),n=this._wrapY(n);var l,u=this._matrix_map_rect(this.ctx._transform,{x:e,y:n,w:r,h:i}),h=(this._matrix_map_rect(this.ctx._transform,{x:o,y:a,w:s,h:c}),/data:image\/(\w+).*/i),f=h.exec(t);l=null!=f?f[1]:"png",this.pdf.addImage(t,l,u.x,u.y,u.w,u.h)},_matrix_multiply:function(t,e){var n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],s=e[5],c=n*t[0]+r*t[2],l=i*t[0]+o*t[2],u=a*t[0]+s*t[2]+t[4];return r=n*t[1]+r*t[3],o=i*t[1]+o*t[3],s=a*t[1]+s*t[3]+t[5],n=c,i=l,a=u,[n,r,i,o,a,s]},_matrix_rotation:function(t){return Math.atan2(t[2],t[0])},_matrix_decompose:function(t){var e=t[0],n=t[1],r=t[2],i=t[3],o=Math.sqrt(e*e+n*n);e/=o,n/=o;var a=e*r+n*i;r-=e*a,i-=n*a;var s=Math.sqrt(r*r+i*i);return r/=s,i/=s,a/=s,e*i<n*r&&(e=-e,n=-n,a=-a,o=-o),{scale:[o,0,0,s,0,0],translate:[1,0,0,1,t[4],t[5]],rotate:[e,n,-n,e,0,0],skew:[1,0,a,1,0,0]}},_matrix_map_point:function(t,e){var n=t[0],r=t[1],i=t[2],o=t[3],a=t[4],s=t[5],c=e[0],l=e[1],u=c*n+l*i+a,h=c*r+l*o+s;return[u,h]},_matrix_map_point_obj:function(t,e){var n=this._matrix_map_point(t,[e.x,e.y]);return{x:n[0],y:n[1]}},_matrix_map_rect:function(t,e){var n=this._matrix_map_point(t,[e.x,e.y]),r=this._matrix_map_point(t,[e.x+e.w,e.y+e.h]);return{x:n[0],y:n[1],w:r[0]-n[0],h:r[1]-n[1]}},_matrix_is_identity:function(t){return 1==t[0]&&(0==t[1]&&(0==t[2]&&(1==t[3]&&(0==t[4]&&0==t[5]))))},rotate:function(t){var e=[Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0];this.ctx._transform=this._matrix_multiply(this.ctx._transform,e)},scale:function(t,e){var n=[t,0,0,e,0,0];this.ctx._transform=this._matrix_multiply(this.ctx._transform,n)},translate:function(t,e){var n=[1,0,0,1,t,e];this.ctx._transform=this._matrix_multiply(this.ctx._transform,n)},stroke:function(){if(this.ctx._clip_path.length>0){var t;t=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage(),t.push("q");var e=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._stroke(!0),this.ctx._clip_path=this.path,this.path=e,this._stroke(!1),t.push("Q")}else this._stroke(!1)},_stroke:function(t){if(t||!this._isStrokeTransparent()){for(var e=[],n=!1,r=this.path,i=0;i<r.length;i++){var o=r[i];switch(o.type){case"mt":e.push({start:o,deltas:[],abs:[]});break;case"lt":var a=[o.x-r[i-1].x,o.y-r[i-1].y];e[e.length-1].deltas.push(a),e[e.length-1].abs.push(o);break;case"bct":var a=[o.x1-r[i-1].x,o.y1-r[i-1].y,o.x2-r[i-1].x,o.y2-r[i-1].y,o.x-r[i-1].x,o.y-r[i-1].y];e[e.length-1].deltas.push(a);break;case"qct":var s=r[i-1].x+2/3*(o.x1-r[i-1].x),c=r[i-1].y+2/3*(o.y1-r[i-1].y),l=o.x+2/3*(o.x1-o.x),u=o.y+2/3*(o.y1-o.y),h=o.x,f=o.y,a=[s-r[i-1].x,c-r[i-1].y,l-r[i-1].x,u-r[i-1].y,h-r[i-1].x,f-r[i-1].y];e[e.length-1].deltas.push(a);break;case"arc":0==e.length&&e.push({start:{x:0,y:0},deltas:[],abs:[]}),e[e.length-1].arc=!0,e[e.length-1].abs.push(o);break;case"close":n=!0}}for(var i=0;i<e.length;i++){var d;if(d=i==e.length-1?"s":null,e[i].arc)for(var p=e[i].abs,g=0;g<p.length;g++){var m=p[g],w=360*m.startAngle/(2*Math.PI),y=360*m.endAngle/(2*Math.PI),v=m.x,b=m.y;this.internal.arc2(this,v,b,m.radius,w,y,m.anticlockwise,d,t)}else{var v=e[i].start.x,b=e[i].start.y;t?(this.pdf.lines(e[i].deltas,v,b,null,null),this.pdf.clip_fixed()):this.pdf.lines(e[i].deltas,v,b,null,d)}}}},_isFillTransparent:function(){return this.ctx._isFillTransparent||0==this.globalAlpha},_isStrokeTransparent:function(){return this.ctx._isStrokeTransparent||0==this.globalAlpha},fill:function(t){if(this.ctx._clip_path.length>0){var e;e=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage(),e.push("q");var n=this.path;this.path=this.ctx._clip_path,this.ctx._clip_path=[],this._fill(t,!0),this.ctx._clip_path=this.path,this.path=n,this._fill(t,!1),e.push("Q")}else this._fill(t,!1)},_fill:function(t,e){if(!this._isFillTransparent()){var r,i="function"==typeof this.pdf.internal.newObject2;r=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage();var o=[],a=window.outIntercept;if(i)switch(this.ctx.globalCompositeOperation){case"normal":case"source-over":break;case"destination-in":case"destination-out":var s=this.pdf.internal.newStreamObject(),c=this.pdf.internal.newObject2();c.push("<</Type /ExtGState"),c.push("/SMask <</S /Alpha /G "+s.objId+" 0 R>>"),c.push(">>");var l="MASK"+c.objId;this.pdf.internal.addGraphicsState(l,c.objId);var u="/"+l+" gs";r.splice(0,0,"q"),r.splice(1,0,u),r.push("Q"),window.outIntercept=s;break;default:var h="/"+this.pdf.internal.blendModeMap[this.ctx.globalCompositeOperation.toUpperCase()];h&&this.pdf.internal.out(h+" gs")}var f=this.ctx.globalAlpha;if(this.ctx._fillOpacity<1&&(f=this.ctx._fillOpacity),i){var d=this.pdf.internal.newObject2();d.push("<</Type /ExtGState"),d.push("/CA "+f),d.push("/ca "+f),d.push(">>");var l="GS_O_"+d.objId;this.pdf.internal.addGraphicsState(l,d.objId),this.pdf.internal.out("/"+l+" gs")}for(var p=this.path,g=0;g<p.length;g++){var m=p[g];switch(m.type){case"mt":o.push({start:m,deltas:[],abs:[]});break;case"lt":var w=[m.x-p[g-1].x,m.y-p[g-1].y];o[o.length-1].deltas.push(w),o[o.length-1].abs.push(m);break;case"bct":var w=[m.x1-p[g-1].x,m.y1-p[g-1].y,m.x2-p[g-1].x,m.y2-p[g-1].y,m.x-p[g-1].x,m.y-p[g-1].y];o[o.length-1].deltas.push(w);break;case"qct":var y=p[g-1].x+2/3*(m.x1-p[g-1].x),v=p[g-1].y+2/3*(m.y1-p[g-1].y),b=m.x+2/3*(m.x1-m.x),x=m.y+2/3*(m.y1-m.y),k=m.x,_=m.y,w=[y-p[g-1].x,v-p[g-1].y,b-p[g-1].x,x-p[g-1].y,k-p[g-1].x,_-p[g-1].y];o[o.length-1].deltas.push(w);break;case"arc":0===o.length&&o.push({deltas:[],abs:[]}),o[o.length-1].arc=!0,o[o.length-1].abs.push(m);break;case"close":o.push({close:!0})}}for(var g=0;g<o.length;g++){var C;if(g==o.length-1?(C="f","evenodd"===t&&(C+="*")):C=null,o[g].close)this.pdf.internal.out("h"),this.pdf.internal.out("f");else if(o[g].arc){o[g].start&&this.internal.move2(this,o[g].start.x,o[g].start.y);for(var A=o[g].abs,S=0;S<A.length;S++){var q=A[S];if("undefined"!=typeof q.startAngle){var T=360*q.startAngle/(2*Math.PI),P=360*q.endAngle/(2*Math.PI),I=q.x,E=q.y;if(0===S&&this.internal.move2(this,I,E),this.internal.arc2(this,I,E,q.radius,T,P,q.anticlockwise,null,e),S===A.length-1&&o[g].start){var I=o[g].start.x,E=o[g].start.y;this.internal.line2(n,I,E)}}else this.internal.line2(n,q.x,q.y)}}else{var I=o[g].start.x,E=o[g].start.y;e?(this.pdf.lines(o[g].deltas,I,E,null,null),this.pdf.clip_fixed()):this.pdf.lines(o[g].deltas,I,E,null,C)}}window.outIntercept=a}},pushMask:function(){var t="function"==typeof this.pdf.internal.newObject2;if(!t)return void console.log("jsPDF v2 not enabled");var e=this.pdf.internal.newStreamObject(),n=this.pdf.internal.newObject2();n.push("<</Type /ExtGState"),n.push("/SMask <</S /Alpha /G "+e.objId+" 0 R>>"),n.push(">>");var r="MASK"+n.objId;this.pdf.internal.addGraphicsState(r,n.objId);var i="/"+r+" gs";this.pdf.internal.out(i)},clip:function(){if(this.ctx._clip_path.length>0)for(var t=0;t<this.path.length;t++)this.ctx._clip_path.push(this.path[t]);else this.ctx._clip_path=this.path;this.path=[]},measureText:function(t){var e=this.pdf;return{getWidth:function(){var n=e.internal.getFontSize(),r=e.getStringUnitWidth(t)*n/e.internal.scaleFactor;return r*=1.3333},get width(){return this.getWidth(t)}}},_getBaseline:function(t){var e=parseInt(this.pdf.internal.getFontSize()),n=.25*e;switch(this.ctx.textBaseline){case"bottom":return t-n;case"top":return t+e;case"hanging":return t+e-n;case"middle":return t+e/2-n;case"ideographic":return t;case"alphabetic":default:return t}}};var n=t.context2d;return Object.defineProperty(n,"fillStyle",{set:function(t){this.setFillStyle(t)},get:function(){return this.ctx.fillStyle}}),Object.defineProperty(n,"strokeStyle",{set:function(t){this.setStrokeStyle(t)},get:function(){return this.ctx.strokeStyle}}),Object.defineProperty(n,"lineWidth",{set:function(t){this.setLineWidth(t)},get:function(){return this.ctx.lineWidth}}),Object.defineProperty(n,"lineCap",{set:function(t){this.setLineCap(t)},get:function(){return this.ctx.lineCap}}),Object.defineProperty(n,"lineJoin",{set:function(t){this.setLineJoin(t)},get:function(){return this.ctx.lineJoin}}),Object.defineProperty(n,"miterLimit",{set:function(t){this.ctx.miterLimit=t},get:function(){return this.ctx.miterLimit}}),Object.defineProperty(n,"textBaseline",{set:function(t){this.setTextBaseline(t)},get:function(){return this.getTextBaseline()}}),Object.defineProperty(n,"textAlign",{set:function(t){this.setTextAlign(t)},get:function(){return this.getTextAlign()}}),Object.defineProperty(n,"font",{set:function(t){this.setFont(t)},get:function(){return this.ctx.font}}),Object.defineProperty(n,"globalCompositeOperation",{set:function(t){this.ctx.globalCompositeOperation=t},get:function(){return this.ctx.globalCompositeOperation}}),Object.defineProperty(n,"globalAlpha",{set:function(t){this.ctx.globalAlpha=t},get:function(){return this.ctx.globalAlpha}}),Object.defineProperty(n,"ignoreClearRect",{set:function(t){this.ctx.ignoreClearRect=t},get:function(){return this.ctx.ignoreClearRect}}),n.internal={},n.internal.rxRgb=/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/,n.internal.rxRgba=/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/,n.internal.rxTransparent=/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/,n.internal.arc=function(t,e,n,r,i,o,a,s){for(var c=!0,l=this.pdf.internal.scaleFactor,u=this.pdf.internal.pageSize.height,h=this.pdf.internal.f2,f=i*(Math.PI/180),d=o*(Math.PI/180),p=this.createArc(r,f,d,a),g=0;g<p.length;g++){var m=p[g];c&&0===g?this.pdf.internal.out([h((m.x1+e)*l),h((u-(m.y1+n))*l),"m",h((m.x2+e)*l),h((u-(m.y2+n))*l),h((m.x3+e)*l),h((u-(m.y3+n))*l),h((m.x4+e)*l),h((u-(m.y4+n))*l),"c"].join(" ")):this.pdf.internal.out([h((m.x2+e)*l),h((u-(m.y2+n))*l),h((m.x3+e)*l),h((u-(m.y3+n))*l),h((m.x4+e)*l),h((u-(m.y4+n))*l),"c"].join(" ")),t._lastPoint={x:e,y:n}}null!==s&&this.pdf.internal.out(this.pdf.internal.getStyle(s))},n.internal.arc2=function(t,e,n,r,i,o,a,s,c){var l=e,u=n;c?(this.arc(t,l,u,r,i,o,a,null),this.pdf.clip_fixed()):this.arc(t,l,u,r,i,o,a,s)},n.internal.move2=function(t,e,n){var r=this.pdf.internal.scaleFactor,i=this.pdf.internal.pageSize.height,o=this.pdf.internal.f2;this.pdf.internal.out([o(e*r),o((i-n)*r),"m"].join(" ")),t._lastPoint={x:e,y:n}},n.internal.line2=function(t,e,n){var r=this.pdf.internal.scaleFactor,i=this.pdf.internal.pageSize.height,o=this.pdf.internal.f2,a={x:e,y:n};this.pdf.internal.out([o(a.x*r),o((i-a.y)*r),"l"].join(" ")),t._lastPoint=a},n.internal.createArc=function(t,e,n,r){var i=1e-5,o=2*Math.PI,a=Math.PI/2,s=e;for((s<o||s>o)&&(s%=o),s<0&&(s=o+s);e>n;)e-=o;var c=Math.abs(n-e);c<o&&r&&(c=o-c);for(var l=[],u=r?-1:1,h=s;c>i;){var f=u*Math.min(c,a),d=h+f;l.push(this.createSmallArc(t,h,d)),c-=Math.abs(d-h),h=d}return l},n.internal.getCurrentPage=function(){return this.pdf.internal.pages[this.pdf.internal.getCurrentPageInfo().pageNumber]},n.internal.createSmallArc=function(t,e,n){var r=(n-e)/2,i=t*Math.cos(r),o=t*Math.sin(r),a=i,s=-o,c=a*a+s*s,l=c+a*i+s*o,u=4/3*(Math.sqrt(2*c*l)-l)/(a*o-s*i),h=a-u*s,f=s+u*a,d=h,p=-f,g=r+e,m=Math.cos(g),w=Math.sin(g);return{x1:t*Math.cos(e),y1:t*Math.sin(e),x2:h*m-f*w,y2:h*w+f*m,x3:d*m-p*w,y3:d*w+p*m,x4:t*Math.cos(n),y4:t*Math.sin(n)}},this}(e.API),/** @preserve
 * jsPDF fromHTML plugin. BETA stage. API subject to change. Needs browser
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 Daniel Husar, https://github.com/danielhusar
 *               2014 Wolfgang Gassler, https://github.com/woolfg
 *               2014 Steven Spungin, https://github.com/flamenco
 *
 * 
 * ====================================================================
 */
function(e){var n,r,i,a,s,c,l,u,h,f,d,p,g,m,w,y,v,b,x,k;n=function(){function t(){}return function(e){return t.prototype=e,new t}}(),f=function(t){var e,n,r,i,o,a,s;for(n=0,r=t.length,e=void 0,i=!1,a=!1;!i&&n!==r;)e=t[n]=t[n].trimLeft(),e&&(i=!0),n++;for(n=r-1;r&&!a&&n!==-1;)e=t[n]=t[n].trimRight(),e&&(a=!0),n--;for(o=/\s+$/g,s=!0,n=0;n!==r;)"\u2028"!=t[n]&&(e=t[n].replace(/\s+/g," "),s&&(e=e.trimLeft()),e&&(s=o.test(e)),t[n]=e),n++;return t},d=function(t,e,n,r){return this.pdf=t,this.x=e,this.y=n,this.settings=r,this.watchFunctions=[],this.init(),this},p=function(t){var e,n,r;for(e=void 0,r=t.split(","),n=r.shift();!e&&n;)e=i[n.trim().toLowerCase()],n=r.shift();return e},g=function(t){t="auto"===t?"0px":t,t.indexOf("em")>-1&&!isNaN(Number(t.replace("em","")))&&(t=18.719*Number(t.replace("em",""))+"px"),t.indexOf("pt")>-1&&!isNaN(Number(t.replace("pt","")))&&(t=1.333*Number(t.replace("pt",""))+"px");var e,n,r;return n=void 0,e=16,(r=m[t])?r:(r={"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0}[{css_line_height_string:t}],r!==n?m[t]=r/e:(r=parseFloat(t))?m[t]=r/e:(r=t.match(/([\d\.]+)(px)/),3===r.length?m[t]=parseFloat(r[1])/e:m[t]=1))},h=function(t){var e,n,r;return r=function(t){var e;return e=function(t){return document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(t,null):t.currentStyle?t.currentStyle:t.style}(t),function(t){return t=t.replace(/-\D/g,function(t){return t.charAt(1).toUpperCase()}),e[t]}}(t),e={},n=void 0,e["font-family"]=p(r("font-family"))||"times",e["font-style"]=a[r("font-style")]||"normal",e["text-align"]=s[r("text-align")]||"left",n=c[r("font-weight")]||"normal","bold"===n&&("normal"===e["font-style"]?e["font-style"]=n:e["font-style"]=n+e["font-style"]),e["font-size"]=g(r("font-size"))||1,e["line-height"]=g(r("line-height"))||1,e.display="inline"===r("display")?"inline":"block",n="block"===e.display,e["margin-top"]=n&&g(r("margin-top"))||0,e["margin-bottom"]=n&&g(r("margin-bottom"))||0,e["padding-top"]=n&&g(r("padding-top"))||0,e["padding-bottom"]=n&&g(r("padding-bottom"))||0,e["margin-left"]=n&&g(r("margin-left"))||0,e["margin-right"]=n&&g(r("margin-right"))||0,e["padding-left"]=n&&g(r("padding-left"))||0,e["padding-right"]=n&&g(r("padding-right"))||0,e["page-break-before"]=r("page-break-before")||"auto",e.float=l[r("cssFloat")]||"none",e.clear=u[r("clear")]||"none",e.color=r("color"),e},w=function(t,e,n){var r,i,o,a,s;if(o=!1,i=void 0,a=void 0,s=void 0,r=n["#"+t.id])if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;if(r=n[t.nodeName],!o&&r)if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;return o},k=function(t,e){var n,r,i,o,a,s,c,l,u,h;for(n=[],r=[],i=0,h=t.rows[0].cells.length,l=t.clientWidth;i<h;)u=t.rows[0].cells[i],r[i]={name:u.textContent.toLowerCase().replace(/\s+/g,""),prompt:u.textContent.replace(/\r?\n/g,""),width:u.clientWidth/l*e.pdf.internal.pageSize.width},i++;for(i=1;i<t.rows.length;){for(s=t.rows[i],a={},o=0;o<s.cells.length;)a[r[o].name]=s.cells[o].textContent.replace(/\r?\n/g,""),o++;n.push(a),i++}return c={rows:n,headers:r}};var _={SCRIPT:1,STYLE:1,NOSCRIPT:1,OBJECT:1,EMBED:1,SELECT:1},C=1;r=function(e,i,o){var a,s,c,l,u,f,d,p,g;for(s=e.childNodes,a=void 0,c=h(e),u="block"===c.display,u&&(i.setBlockBoundary(),i.setBlockStyle(c)),d=19.049976/25.4,l=0,f=s.length;l<f;){if(a=s[l],"object"===("undefined"==typeof a?"undefined":t(a))){if(i.executeWatchFunctions(a),1===a.nodeType&&"HEADER"===a.nodeName){var m=a,v=i.pdf.margins_doc.top;i.pdf.internal.events.subscribe("addPage",function(t){i.y=v,r(m,i,o),i.pdf.margins_doc.top=i.y+10,i.y+=10},!1)}if(8===a.nodeType&&"#comment"===a.nodeName)~a.textContent.indexOf("ADD_PAGE")&&(i.pdf.addPage(),i.y=i.pdf.margins_doc.top);else if(1!==a.nodeType||_[a.nodeName])if(3===a.nodeType){var b=a.nodeValue;if(a.nodeValue&&"LI"===a.parentNode.nodeName)if("OL"===a.parentNode.parentNode.nodeName)b=C++ +". "+b;else{var x=c["font-size"],A=(3-.75*x)*i.pdf.internal.scaleFactor,S=.75*x*i.pdf.internal.scaleFactor,q=1.74*x/i.pdf.internal.scaleFactor;g=function(t,e){this.pdf.circle(t+A,e+S,q,"FD")}}16&a.ownerDocument.body.compareDocumentPosition(a)&&i.addText(b,c)}else"string"==typeof a&&i.addText(a,c);else{var T;if("IMG"===a.nodeName){var P=a.getAttribute("src");T=y[i.pdf.sHashCode(P)||P]}if(T){i.pdf.internal.pageSize.height-i.pdf.margins_doc.bottom<i.y+a.height&&i.y>i.pdf.margins_doc.top&&(i.pdf.addPage(),i.y=i.pdf.margins_doc.top,i.executeWatchFunctions(a));var I=h(a),E=i.x,O=12/i.pdf.internal.scaleFactor,F=(I["margin-left"]+I["padding-left"])*O,R=(I["margin-right"]+I["padding-right"])*O,B=(I["margin-top"]+I["padding-top"])*O,D=(I["margin-bottom"]+I["padding-bottom"])*O;E+=void 0!==I.float&&"right"===I.float?i.settings.width-a.width-R:F,i.pdf.addImage(T,E,i.y+B,a.width,a.height),T=void 0,"right"===I.float||"left"===I.float?(i.watchFunctions.push(function(t,e,n,r){return i.y>=e?(i.x+=t,i.settings.width+=n,!0):!!(r&&1===r.nodeType&&!_[r.nodeName]&&i.x+r.width>i.pdf.margins_doc.left+i.pdf.margins_doc.width)&&(i.x+=t,i.y=e,i.settings.width+=n,!0)}.bind(this,"left"===I.float?-a.width-F-R:0,i.y+a.height+B+D,a.width)),i.watchFunctions.push(function(t,e,n){return!(i.y<t&&e===i.pdf.internal.getNumberOfPages())||1===n.nodeType&&"both"===h(n).clear&&(i.y=t,!0)}.bind(this,i.y+a.height,i.pdf.internal.getNumberOfPages())),i.settings.width-=a.width+F+R,"left"===I.float&&(i.x+=a.width+F+R)):i.y+=a.height+B+D}else if("TABLE"===a.nodeName)p=k(a,i),i.y+=10,i.pdf.table(i.x,i.y,p.rows,p.headers,{autoSize:!1,printHeaders:o.printHeaders,margins:i.pdf.margins_doc,css:h(a)}),i.y=i.pdf.lastCellPos.y+i.pdf.lastCellPos.h+20;else if("OL"===a.nodeName||"UL"===a.nodeName)C=1,w(a,i,o)||r(a,i,o),i.y+=10;else if("LI"===a.nodeName){var j=i.x;i.x+=20/i.pdf.internal.scaleFactor,i.y+=3,w(a,i,o)||r(a,i,o),i.x=j}else"BR"===a.nodeName?(i.y+=c["font-size"]*i.pdf.internal.scaleFactor,i.addText("\u2028",n(c))):w(a,i,o)||r(a,i,o)}}l++}if(o.outY=i.y,u)return i.setBlockBoundary(g)},y={},v=function(t,e,n,r){function i(){e.pdf.internal.events.publish("imagesLoaded"),r(a)}function o(t,n,r){if(t){var o=new Image;a=++l,o.crossOrigin="",o.onerror=o.onload=function(){if(o.complete&&(0===o.src.indexOf("data:image/")&&(o.width=n||o.width||0,o.height=r||o.height||0),o.width+o.height)){var a=e.pdf.sHashCode(t)||t;y[a]=y[a]||o}--l||i()},o.src=t}}for(var a,s=t.getElementsByTagName("img"),c=s.length,l=0;c--;)o(s[c].getAttribute("src"),s[c].width,s[c].height);return l||i()},b=function(t,e,n){var i=t.getElementsByTagName("footer");if(i.length>0){i=i[0];var o=e.pdf.internal.write,a=e.y;e.pdf.internal.write=function(){},r(i,e,n);var s=Math.ceil(e.y-a)+5;e.y=a,e.pdf.internal.write=o,e.pdf.margins_doc.bottom+=s;for(var c=function(t){var o=void 0!==t?t.pageNumber:1,a=e.y;e.y=e.pdf.internal.pageSize.height-e.pdf.margins_doc.bottom,e.pdf.margins_doc.bottom-=s;for(var c=i.getElementsByTagName("span"),l=0;l<c.length;++l)(" "+c[l].className+" ").replace(/[\n\t]/g," ").indexOf(" pageCounter ")>-1&&(c[l].innerHTML=o),(" "+c[l].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&(c[l].innerHTML="###jsPDFVarTotalPages###");r(i,e,n),e.pdf.margins_doc.bottom+=s,e.y=a},l=i.getElementsByTagName("span"),u=0;u<l.length;++u)(" "+l[u].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&e.pdf.internal.events.subscribe("htmlRenderingFinished",e.pdf.putTotalPages.bind(e.pdf,"###jsPDFVarTotalPages###"),!0);e.pdf.internal.events.subscribe("addPage",c,!1),c(),_.FOOTER=1}},x=function(t,e,n,i,o,a){if(!e)return!1;"string"==typeof e||e.parentNode||(e=""+e.innerHTML),"string"==typeof e&&(e=function(t){var e,n,r,i;return r="jsPDFhtmlText"+Date.now().toString()+(1e3*Math.random()).toFixed(0),i="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;",n=document.createElement("div"),n.style.cssText=i,n.innerHTML='<iframe style="height:1px;width:1px" name="'+r+'" />',document.body.appendChild(n),e=window.frames[r],e.document.open(),e.document.writeln(t),e.document.close(),e.document.body}(e.replace(/<\/?script[^>]*?>/gi,"")));var s,c=new d(t,n,i,o);return v.call(this,e,c,o.elementHandlers,function(t){b(e,c,o.elementHandlers),r(e,c,o.elementHandlers),c.pdf.internal.events.publish("htmlRenderingFinished"),s=c.dispose(),"function"==typeof a?a(s):t&&console.error("jsPDF Warning: rendering issues? provide a callback to fromHTML!")}),s||{x:c.x,y:c.y}},d.prototype.init=function(){return this.paragraph={text:[],style:[]},this.pdf.internal.write("q")},d.prototype.dispose=function(){return this.pdf.internal.write("Q"),{x:this.x,y:this.y,ready:!0}},d.prototype.executeWatchFunctions=function(t){var e=!1,n=[];if(this.watchFunctions.length>0){for(var r=0;r<this.watchFunctions.length;++r)this.watchFunctions[r](t)===!0?e=!0:n.push(this.watchFunctions[r]);this.watchFunctions=n}return e},d.prototype.splitFragmentsIntoLines=function(t,e){var r,i,o,a,s,c,l,u,h,f,d,p,g,m,w;for(i=12,d=this.pdf.internal.scaleFactor,s={},o=void 0,f=void 0,a=void 0,c=void 0,w=void 0,h=void 0,u=void 0,l=void 0,p=[],g=[p],r=0,m=this.settings.width;t.length;)if(c=t.shift(),w=e.shift(),c)if(o=w["font-family"],f=w["font-style"],a=s[o+f],a||(a=this.pdf.internal.getFont(o,f).metadata.Unicode,s[o+f]=a),h={widths:a.widths,kerning:a.kerning,fontSize:w["font-size"]*i,textIndent:r},u=this.pdf.getStringUnitWidth(c,h)*h.fontSize/d,"\u2028"==c)p=[],g.push(p);else if(r+u>m){for(l=this.pdf.splitTextToSize(c,m,h),p.push([l.shift(),w]);l.length;)p=[[l.shift(),w]],g.push(p);r=this.pdf.getStringUnitWidth(p[0][0],h)*h.fontSize/d}else p.push([c,w]),r+=u;if(void 0!==w["text-align"]&&("center"===w["text-align"]||"right"===w["text-align"]||"justify"===w["text-align"]))for(var y=0;y<g.length;++y){var v=this.pdf.getStringUnitWidth(g[y][0][0],h)*h.fontSize/d;y>0&&(g[y][0][1]=n(g[y][0][1]));var b=m-v;if("right"===w["text-align"])g[y][0][1]["margin-left"]=b;else if("center"===w["text-align"])g[y][0][1]["margin-left"]=b/2;else if("justify"===w["text-align"]){var x=g[y][0][0].split(" ").length-1;g[y][0][1]["word-spacing"]=b/x,y===g.length-1&&(g[y][0][1]["word-spacing"]=0)}}return g},d.prototype.RenderTextFragment=function(t,e){var n,r,i;i=0,n=12,this.pdf.internal.pageSize.height-this.pdf.margins_doc.bottom<this.y+this.pdf.internal.getFontSize()&&(this.pdf.internal.write("ET","Q"),this.pdf.addPage(),this.y=this.pdf.margins_doc.top,this.pdf.internal.write("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),e.color,"Td"),i=Math.max(i,e["line-height"],e["font-size"]),this.pdf.internal.write(0,(-1*n*i).toFixed(2),"Td")),r=this.pdf.internal.getFont(e["font-family"],e["font-style"]);var o=this.getPdfColor(e.color);o!==this.lastTextColor&&(this.pdf.internal.write(o),this.lastTextColor=o),void 0!==e["word-spacing"]&&e["word-spacing"]>0&&this.pdf.internal.write(e["word-spacing"].toFixed(2),"Tw"),this.pdf.internal.write("/"+r.id,(n*e["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(t)+") Tj"),void 0!==e["word-spacing"]&&this.pdf.internal.write(0,"Tw")},d.prototype.getPdfColor=function(t){var e,n,r,i,a=/rgb\s*\(\s*(\d+),\s*(\d+),\s*(\d+\s*)\)/,s=a.exec(t);if(null!=s?(n=parseInt(s[1]),r=parseInt(s[2]),i=parseInt(s[3])):("#"!=t.charAt(0)&&(t=o.colorNameToHex(t),t||(t="#000000")),n=t.substring(1,3),n=parseInt(n,16),r=t.substring(3,5),r=parseInt(r,16),i=t.substring(5,7),i=parseInt(i,16)),"string"==typeof n&&/^#[0-9A-Fa-f]{6}$/.test(n)){var c=parseInt(n.substr(1),16);n=c>>16&255,r=c>>8&255,i=255&c}var l=this.f3;return e=0===n&&0===r&&0===i||"undefined"==typeof r?l(n/255)+" g":[l(n/255),l(r/255),l(i/255),"rg"].join(" ")},d.prototype.f3=function(t){return t.toFixed(3)},d.prototype.renderParagraph=function(t){var e,n,r,i,o,a,s,c,l,u,h,d,p,g,m;if(i=f(this.paragraph.text),g=this.paragraph.style,e=this.paragraph.blockstyle,p=this.paragraph.priorblockstyle||{},this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:e},i.join("").trim()){c=this.splitFragmentsIntoLines(i,g),s=void 0,l=void 0,n=12,r=n/this.pdf.internal.scaleFactor,this.priorMarginBottom=this.priorMarginBottom||0,d=(Math.max((e["margin-top"]||0)-this.priorMarginBottom,0)+(e["padding-top"]||0))*r,h=((e["margin-bottom"]||0)+(e["padding-bottom"]||0))*r,this.priorMarginBottom=e["margin-bottom"]||0,"always"===e["page-break-before"]&&(this.pdf.addPage(),this.y=0,d=((e["margin-top"]||0)+(e["padding-top"]||0))*r),u=this.pdf.internal.write,o=void 0,a=void 0,this.y+=d,u("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");for(var w=0;c.length;){for(s=c.shift(),l=0,o=0,a=s.length;o!==a;)s[o][0].trim()&&(l=Math.max(l,s[o][1]["line-height"],s[o][1]["font-size"]),m=7*s[o][1]["font-size"]),o++;var y=0,v=0;void 0!==s[0][1]["margin-left"]&&s[0][1]["margin-left"]>0&&(v=this.pdf.internal.getCoordinateString(s[0][1]["margin-left"]),y=v-w,w=v);var b=Math.max(e["margin-left"]||0,0)*r;for(u(y+b,(-1*n*l).toFixed(2),"Td"),o=0,a=s.length;o!==a;)s[o][0]&&this.RenderTextFragment(s[o][0],s[o][1]),o++;if(this.y+=l*r,this.executeWatchFunctions(s[0][1])&&c.length>0){var x=[],k=[];c.forEach(function(t){for(var e=0,n=t.length;e!==n;)t[e][0]&&(x.push(t[e][0]+" "),k.push(t[e][1])),++e}),c=this.splitFragmentsIntoLines(f(x),k),u("ET","Q"),u("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td")}}return t&&"function"==typeof t&&t.call(this,this.x-9,this.y-m/2),u("ET","Q"),this.y+=h}},d.prototype.setBlockBoundary=function(t){return this.renderParagraph(t)},d.prototype.setBlockStyle=function(t){return this.paragraph.blockstyle=t},d.prototype.addText=function(t,e){return this.paragraph.text.push(t),this.paragraph.style.push(e)},i={helvetica:"helvetica","sans-serif":"helvetica","times new roman":"times",serif:"times",times:"times",monospace:"courier",courier:"courier"},c={100:"normal",200:"normal",300:"normal",400:"normal",500:"bold",600:"bold",700:"bold",800:"bold",900:"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"},a={normal:"normal",italic:"italic",oblique:"italic"},s={left:"left",right:"right",center:"center",justify:"justify"},l={none:"none",right:"right",left:"left"},u={none:"none",both:"both"},m={normal:1},e.fromHTML=function(t,e,n,r,i,o){return this.margins_doc=o||{top:0,bottom:0},r||(r={}),r.elementHandlers||(r.elementHandlers={}),x(this,t,isNaN(e)?4:e,isNaN(n)?4:n,r,i)}}(e.API),/** ==================================================================== 
 * jsPDF JavaScript plugin
 * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
 * 
 * 
 * ====================================================================
 */
function(t){var e,n,r;t.addJS=function(t){return r=t,this.internal.events.subscribe("postPutResources",function(t){e=this.internal.newObject(),this.internal.write("<< /Names [(EmbeddedJS) "+(e+1)+" 0 R] >>","endobj"),n=this.internal.newObject(),this.internal.write("<< /S /JavaScript /JS (",r,") >>","endobj")}),this.internal.events.subscribe("putCatalog",function(){void 0!==e&&void 0!==n&&this.internal.write("/Names <</JavaScript "+e+" 0 R>>")}),this}}(e.API),/**
 * jsPDF Outline PlugIn
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){return t.events.push(["postPutResources",function(){var t=this,e=/^(\d+) 0 obj$/;if(this.outline.root.children.length>0)for(var n=t.outline.render().split(/\r\n/),r=0;r<n.length;r++){var i=n[r],o=e.exec(i);if(null!=o){var a=o[1];t.internal.newObjectDeferredBegin(a)}t.internal.write(i)}if(this.outline.createNamedDestinations){for(var s=this.internal.pages.length,c=[],r=0;r<s;r++){var l=t.internal.newObject();c.push(l);var u=t.internal.getPageInfo(r+1);t.internal.write("<< /D["+u.objId+" 0 R /XYZ null null null]>> endobj")}var h=t.internal.newObject();t.internal.write("<< /Names [ ");for(var r=0;r<c.length;r++)t.internal.write("(page_"+(r+1)+")"+c[r]+" 0 R");t.internal.write(" ] >>","endobj");t.internal.newObject();t.internal.write("<< /Dests "+h+" 0 R"),t.internal.write(">>","endobj")}}]),t.events.push(["putCatalog",function(){var t=this;t.outline.root.children.length>0&&(t.internal.write("/Outlines",this.outline.makeRef(this.outline.root)),this.outline.createNamedDestinations&&t.internal.write("/Names "+namesOid+" 0 R"))}]),t.events.push(["initialized",function(){var t=this;t.outline={createNamedDestinations:!1,root:{children:[]}};t.outline.add=function(t,e,n){var r={title:e,options:n,children:[]};return null==t&&(t=this.root),t.children.push(r),r},t.outline.render=function(){return this.ctx={},this.ctx.val="",this.ctx.pdf=t,this.genIds_r(this.root),this.renderRoot(this.root),this.renderItems(this.root),this.ctx.val},t.outline.genIds_r=function(e){e.id=t.internal.newObjectDeferred();for(var n=0;n<e.children.length;n++)this.genIds_r(e.children[n])},t.outline.renderRoot=function(t){this.objStart(t),this.line("/Type /Outlines"),t.children.length>0&&(this.line("/First "+this.makeRef(t.children[0])),this.line("/Last "+this.makeRef(t.children[t.children.length-1]))),this.line("/Count "+this.count_r({count:0},t)),this.objEnd()},t.outline.renderItems=function(e){for(var n=0;n<e.children.length;n++){var r=e.children[n];this.objStart(r),this.line("/Title "+this.makeString(r.title)),this.line("/Parent "+this.makeRef(e)),n>0&&this.line("/Prev "+this.makeRef(e.children[n-1])),n<e.children.length-1&&this.line("/Next "+this.makeRef(e.children[n+1])),r.children.length>0&&(this.line("/First "+this.makeRef(r.children[0])),this.line("/Last "+this.makeRef(r.children[r.children.length-1])));var i=this.count=this.count_r({count:0},r);if(i>0&&this.line("/Count "+i),r.options&&r.options.pageNumber){var o=t.internal.getPageInfo(r.options.pageNumber);this.line("/Dest ["+o.objId+" 0 R /XYZ 0 "+this.ctx.pdf.internal.pageSize.height+" 0]")}this.objEnd()}for(var n=0;n<e.children.length;n++){var r=e.children[n];this.renderItems(r)}},t.outline.line=function(t){this.ctx.val+=t+"\r\n"},t.outline.makeRef=function(t){return t.id+" 0 R"},t.outline.makeString=function(e){return"("+t.internal.pdfEscape(e)+")"},t.outline.objStart=function(t){this.ctx.val+="\r\n"+t.id+" 0 obj\r\n<<\r\n"},t.outline.objEnd=function(t){this.ctx.val+=">> \r\nendobj\r\n"},t.outline.count_r=function(t,e){for(var n=0;n<e.children.length;n++)t.count++,this.count_r(t,e.children[n]);return t.count}}]),this}(e.API),/**@preserve
 *  ====================================================================
 * jsPDF PNG PlugIn
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * 
 * ====================================================================
 */
function(t){var e=function(){return"function"!=typeof PNG||"function"!=typeof c},n=function(e){return e!==t.image_compression.NONE&&r()},r=function(){var t="function"==typeof a;if(!t)throw new Error("requires deflate.js for compression");return t},i=function(e,n,r,i){var c=5,u=f;switch(i){case t.image_compression.FAST:c=3,u=h;break;case t.image_compression.MEDIUM:c=6,u=d;break;case t.image_compression.SLOW:c=9,u=p}e=l(e,n,r,u);var g=new Uint8Array(o(c)),m=s(e),w=new a(c),y=w.append(e),v=w.flush(),b=g.length+y.length+v.length,x=new Uint8Array(b+4);return x.set(g),x.set(y,g.length),x.set(v,g.length+y.length),x[b++]=m>>>24&255,x[b++]=m>>>16&255,x[b++]=m>>>8&255,x[b++]=255&m,t.arrayBufferToBinaryString(x)},o=function(t,e){var n=8,r=Math.LOG2E*Math.log(32768)-8,i=r<<4|n,o=i<<8,a=Math.min(3,(e-1&255)>>1);return o|=a<<6,o|=0,o+=31-o%31,[i,255&o&255]},s=function(t,e){for(var n,r=1,i=65535&r,o=r>>>16&65535,a=t.length,s=0;a>0;){n=a>e?e:a,a-=n;do i+=t[s++],o+=i;while(--n);i%=65521,o%=65521}return(o<<16|i)>>>0},l=function(t,e,n,r){for(var i,o,a,s=t.length/e,c=new Uint8Array(t.length+s),l=m(),u=0;u<s;u++){if(a=u*e,i=t.subarray(a,a+e),r)c.set(r(i,n,o),a+u);else{for(var h=0,f=l.length,d=[];h<f;h++)d[h]=l[h](i,n,o);var p=w(d.concat());c.set(d[p],a+u)}o=i}return c},u=function(t,e,n){var r=Array.apply([],t);return r.unshift(0),r},h=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=1;o<a;o++)r=t[o-e]||0,i[o+1]=t[o]-r+256&255;return i},f=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=2;o<a;o++)r=n&&n[o]||0,i[o+1]=t[o]-r+256&255;return i},d=function(t,e,n){var r,i,o=[],a=0,s=t.length;for(o[0]=3;a<s;a++)r=t[a-e]||0,i=n&&n[a]||0,o[a+1]=t[a]+256-(r+i>>>1)&255;return o},p=function(t,e,n){var r,i,o,a,s=[],c=0,l=t.length;for(s[0]=4;c<l;c++)r=t[c-e]||0,i=n&&n[c]||0,o=n&&n[c-e]||0,a=g(r,i,o),s[c+1]=t[c]-a+256&255;return s},g=function(t,e,n){var r=t+e-n,i=Math.abs(r-t),o=Math.abs(r-e),a=Math.abs(r-n);return i<=o&&i<=a?t:o<=a?e:n},m=function(){return[u,h,f,d,p]},w=function(t){for(var e,n,r,i=0,o=t.length;i<o;)e=y(t[i].slice(1)),(e<n||!n)&&(n=e,r=i),i++;return r},y=function(t){for(var e=0,n=t.length,r=0;e<n;)r+=Math.abs(t[e++]);return r},v=function(e){var n;switch(e){case t.image_compression.FAST:n=11;break;case t.image_compression.MEDIUM:n=13;break;case t.image_compression.SLOW:n=14;break;default:n=12}return n};t.processPNG=function(t,r,o,a,s){var c,l,u,h,f,d,p=this.color_spaces.DEVICE_RGB,g=this.decode.FLATE_DECODE,m=8;if(this.isArrayBuffer(t)&&(t=new Uint8Array(t)),this.isArrayBufferView(t)){if(e())throw new Error("PNG support requires png.js and zlib.js");if(c=new PNG(t),t=c.imgData,m=c.bits,p=c.colorSpace,h=c.colors,[4,6].indexOf(c.colorType)!==-1){if(8===c.bits)for(var w,y,b=32==c.pixelBitlength?new Uint32Array(c.decodePixels().buffer):16==c.pixelBitlength?new Uint16Array(c.decodePixels().buffer):new Uint8Array(c.decodePixels().buffer),x=b.length,k=new Uint8Array(x*c.colors),_=new Uint8Array(x),C=c.pixelBitlength-c.bits,A=0,S=0;A<x;A++){for(w=b[A],y=0;y<C;)k[S++]=w>>>y&255,y+=c.bits;_[A]=w>>>y&255}if(16===c.bits){for(var w,b=new Uint32Array(c.decodePixels().buffer),x=b.length,k=new Uint8Array(x*(32/c.pixelBitlength)*c.colors),_=new Uint8Array(x*(32/c.pixelBitlength)),q=c.colors>1,A=0,S=0,T=0;A<x;)w=b[A++],k[S++]=w>>>0&255,q&&(k[S++]=w>>>16&255,w=b[A++],k[S++]=w>>>0&255),_[T++]=w>>>16&255;m=8}n(a)?(t=i(k,c.width*c.colors,c.colors,a),d=i(_,c.width,1,a)):(t=k,d=_,g=null)}if(3===c.colorType&&(p=this.color_spaces.INDEXED,f=c.palette,c.transparency.indexed)){for(var P=c.transparency.indexed,I=0,A=0,x=P.length;A<x;++A)I+=P[A];if(I/=255,I===x-1&&P.indexOf(0)!==-1)u=[P.indexOf(0)];else if(I!==x){for(var b=c.decodePixels(),_=new Uint8Array(b.length),A=0,x=b.length;A<x;A++)_[A]=P[b[A]];d=i(_,c.width,1)}}var E=v(a);return l=g===this.decode.FLATE_DECODE?"/Predictor "+E+" /Colors "+h+" /BitsPerComponent "+m+" /Columns "+c.width:"/Colors "+h+" /BitsPerComponent "+m+" /Columns "+c.width,(this.isArrayBuffer(t)||this.isArrayBufferView(t))&&(t=this.arrayBufferToBinaryString(t)),(d&&this.isArrayBuffer(d)||this.isArrayBufferView(d))&&(d=this.arrayBufferToBinaryString(d)),this.createImageInfo(t,c.width,c.height,p,m,g,r,o,l,u,f,d,E)}throw new Error("Unsupported PNG image data, try using JPEG instead.")}}(e.API),function(t){t.autoPrint=function(){var t;return this.internal.events.subscribe("postPutResources",function(){t=this.internal.newObject(),this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj")}),this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+t+" 0 R")}),this}}(e.API),/** @preserve
 * jsPDF split_text_to_size plugin - MIT license.
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *               2014 Diego Casorran, https://github.com/diegocr
 */
function(t){var e=t.getCharWidthsArray=function(t,e){e||(e={});var n,r,i,o=e.widths?e.widths:this.internal.getFont().metadata.Unicode.widths,a=o.fof?o.fof:1,s=e.kerning?e.kerning:this.internal.getFont().metadata.Unicode.kerning,c=s.fof?s.fof:1,l=0,u=o[0]||a,h=[];for(n=0,r=t.length;n<r;n++)i=t.charCodeAt(n),h.push((o[i]||u)/a+(s[i]&&s[i][l]||0)/c),l=i;return h},n=function(t){for(var e=t.length,n=0;e;)e--,n+=t[e];return n},r=t.getStringUnitWidth=function(t,r){return n(e.call(this,t,r))},i=function(t,e,n,r){for(var i=[],o=0,a=t.length,s=0;o!==a&&s+e[o]<n;)s+=e[o],o++;i.push(t.slice(0,o));var c=o;for(s=0;o!==a;)s+e[o]>r&&(i.push(t.slice(c,o)),s=0,c=o),s+=e[o],o++;return c!==o&&i.push(t.slice(c,o)),i},o=function(t,o,a){a||(a={});var s,c,l,u,h,f,d=[],p=[d],g=a.textIndent||0,m=0,w=0,y=t.split(" "),v=e(" ",a)[0];if(f=a.lineIndent===-1?y[0].length+2:a.lineIndent||0){var b=Array(f).join(" "),x=[];y.map(function(t){t=t.split(/\s*\n/),t.length>1?x=x.concat(t.map(function(t,e){return(e&&t.length?"\n":"")+t})):x.push(t[0])}),y=x,f=r(b,a)}for(l=0,u=y.length;l<u;l++){var k=0;if(s=y[l],f&&"\n"==s[0]&&(s=s.substr(1),k=1),c=e(s,a),w=n(c),g+m+w>o||k){if(w>o){for(h=i(s,c,o-(g+m),o),d.push(h.shift()),d=[h.pop()];h.length;)p.push([h.shift()]);w=n(c.slice(s.length-d[0].length))}else d=[s];p.push(d),g=w+f,m=v}else d.push(s),g+=m+w,m=v}if(f)var _=function(t,e){return(e?b:"")+t.join(" ")};else var _=function(t){return t.join(" ")};return p.map(_)};t.splitTextToSize=function(t,e,n){n||(n={});var r,i=n.fontSize||this.internal.getFontSize(),a=function(t){var e={0:1},n={};if(t.widths&&t.kerning)return{widths:t.widths,kerning:t.kerning};var r=this.internal.getFont(t.fontName,t.fontStyle),i="Unicode";return r.metadata[i]?{widths:r.metadata[i].widths||e,kerning:r.metadata[i].kerning||n}:{widths:e,kerning:n}}.call(this,n);r=Array.isArray(t)?t:t.split(/\r?\n/);var s=1*this.internal.scaleFactor*e/i;a.textIndent=n.textIndent?1*n.textIndent*this.internal.scaleFactor/i:0,a.lineIndent=n.lineIndent;var c,l,u=[];for(c=0,l=r.length;c<l;c++)u=u.concat(o(r[c],s,a));return u}}(e.API),/** @preserve 
jsPDF standard_fonts_metrics plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.
*/
function(t){var e=function(t){for(var e="0123456789abcdef",n="klmnopqrstuvwxyz",r={},i=0;i<n.length;i++)r[n[i]]=e[i];var o,a,s,c,l,u={},h=1,f=u,d=[],p="",g="",m=t.length-1;for(i=1;i!=m;)l=t[i],i+=1,"'"==l?a?(c=a.join(""),a=o):a=[]:a?a.push(l):"{"==l?(d.push([f,c]),f={},c=o):"}"==l?(s=d.pop(),s[0][s[1]]=f,c=o,f=s[0]):"-"==l?h=-1:c===o?r.hasOwnProperty(l)?(p+=r[l],c=parseInt(p,16)*h,h=1,p=""):p+=l:r.hasOwnProperty(l)?(g+=r[l],f[c]=parseInt(g,16)*h,h=1,c=o,g=""):g+=l;return u},n={codePages:["WinAnsiEncoding"],WinAnsiEncoding:e("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},r={Unicode:{Courier:n,"Courier-Bold":n,"Courier-BoldOblique":n,"Courier-Oblique":n,Helvetica:n,"Helvetica-Bold":n,"Helvetica-BoldOblique":n,"Helvetica-Oblique":n,"Times-Roman":n,"Times-Bold":n,"Times-BoldItalic":n,"Times-Italic":n}},i={Unicode:{"Courier-Oblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":e("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":e("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Helvetica:e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),"Courier-Bold":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":e("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":e("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};t.events.push(["addFont",function(t){var e,n,o,a="Unicode";e=i[a][t.PostScriptName],e&&(n=t.metadata[a]?t.metadata[a]:t.metadata[a]={},n.widths=e.widths,n.kerning=e.kerning),o=r[a][t.PostScriptName],o&&(n=t.metadata[a]?t.metadata[a]:t.metadata[a]={},n.encoding=o,o.codePages&&o.codePages.length&&(t.encoding=o.codePages[0]))}])}(e.API),/** @preserve
jsPDF SVG plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
*/
function(t){t.addSVG=function(t,e,n,r,i){function o(t,e){var n=e.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=t:n.appendChild(e.createTextNode(t)),e.getElementsByTagName("head")[0].appendChild(n)}function a(t){var e="childframe",n=t.createElement("iframe");return o(".jsPDF_sillysvg_iframe {display:none;position:absolute;}",t),n.name=e,n.setAttribute("width",0),n.setAttribute("height",0),n.setAttribute("frameborder","0"),n.setAttribute("scrolling","no"),n.setAttribute("seamless","seamless"),n.setAttribute("class","jsPDF_sillysvg_iframe"),t.body.appendChild(n),n}function s(t,e){var n=(e.contentWindow||e.contentDocument).document;return n.write(t),n.close(),n.getElementsByTagName("svg")[0]}function c(t){for(var e=parseFloat(t[1]),n=parseFloat(t[2]),r=[],i=3,o=t.length;i<o;)"c"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2]),parseFloat(t[i+3]),parseFloat(t[i+4]),parseFloat(t[i+5]),parseFloat(t[i+6])]),i+=7):"l"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2])]),i+=3):i+=1;return[e,n,r]}var l;if(e===l||n===l)throw new Error("addSVG needs values for 'x' and 'y'");var u=a(document),h=s(t,u),f=[1,1],d=parseFloat(h.getAttribute("width")),p=parseFloat(h.getAttribute("height"));d&&p&&(r&&i?f=[r/d,i/p]:r?f=[r/d,r/d]:i&&(f=[i/p,i/p]));var g,m,w,y,v=h.childNodes;for(g=0,m=v.length;g<m;g++)w=v[g],w.tagName&&"PATH"===w.tagName.toUpperCase()&&(y=c(w.getAttribute("d").split(" ")),y[0]=y[0]*f[0]+e,y[1]=y[1]*f[1]+n,this.lines.call(this,y[2],y[0],y[1],f));return this}}(e.API),/** ==================================================================== 
 * jsPDF total_pages plugin
 * Copyright (c) 2013 Eduardo Menezes de Morais, eduardo.morais@usp.br
 * 
 * 
 * ====================================================================
 */
function(t){t.putTotalPages=function(t){for(var e=new RegExp(t,"g"),n=1;n<=this.internal.getNumberOfPages();n++)for(var r=0;r<this.internal.pages[n].length;r++)this.internal.pages[n][r]=this.internal.pages[n][r].replace(e,this.internal.getNumberOfPages());return this}}(e.API),/** ==================================================================== 
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 * 
 * 
 * ====================================================================
 */
function(t){var e="",n="",r="";t.addMetadata=function(t,i){return n=i||"http://jspdf.default.namespaceuri/",e=t,this.internal.events.subscribe("postPutResources",function(){if(e){var t='<x:xmpmeta xmlns:x="adobe:ns:meta/">',i='<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="'+n+'"><jspdf:metadata>',o="</jspdf:metadata></rdf:Description></rdf:RDF>",a="</x:xmpmeta>",s=unescape(encodeURIComponent(t)),c=unescape(encodeURIComponent(i)),l=unescape(encodeURIComponent(e)),u=unescape(encodeURIComponent(o)),h=unescape(encodeURIComponent(a)),f=c.length+l.length+u.length+s.length+h.length;r=this.internal.newObject(),this.internal.write("<< /Type /Metadata /Subtype /XML /Length "+f+" >>"),this.internal.write("stream"),this.internal.write(s+c+l+u+h),this.internal.write("endstream"),this.internal.write("endobj")}else r=""}),this.internal.events.subscribe("putCatalog",function(){r&&this.internal.write("/Metadata "+r+" 0 R")}),this}}(e.API),function(t){if(t.URL=t.URL||t.webkitURL,t.Blob&&t.URL)try{return void new Blob}catch(t){}var e=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||function(t){var e=function(t){return Object.prototype.toString.call(t).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},r=function(t,e,n){this.data=t,this.size=t.length,this.type=e,this.encoding=n},i=n.prototype,o=r.prototype,a=t.FileReaderSync,s=function(t){this.code=this[this.name=t]},c="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),l=c.length,u=t.URL||t.webkitURL||t,h=u.createObjectURL,f=u.revokeObjectURL,d=u,p=t.btoa,g=t.atob,m=t.ArrayBuffer,w=t.Uint8Array,y=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(r.fake=o.fake=!0;l--;)s.prototype[c[l]]=l+1;return u.createObjectURL||(d=t.URL=function(t){var e,n=document.createElementNS("http://www.w3.org/1999/xhtml","a");return n.href=t,"origin"in n||("data:"===n.protocol.toLowerCase()?n.origin=null:(e=t.match(y),n.origin=e&&e[1])),n}),d.createObjectURL=function(t){var e,n=t.type;return null===n&&(n="application/octet-stream"),t instanceof r?(e="data:"+n,"base64"===t.encoding?e+";base64,"+t.data:"URI"===t.encoding?e+","+decodeURIComponent(t.data):p?e+";base64,"+p(t.data):e+","+encodeURIComponent(t.data)):h?h.call(u,t):void 0},d.revokeObjectURL=function(t){"data:"!==t.substring(0,5)&&f&&f.call(u,t)},i.append=function(t){var n=this.data;if(w&&(t instanceof m||t instanceof w)){for(var i="",o=new w(t),c=0,l=o.length;c<l;c++)i+=String.fromCharCode(o[c]);n.push(i)}else if("Blob"===e(t)||"File"===e(t)){if(!a)throw new s("NOT_READABLE_ERR");var u=new a;n.push(u.readAsBinaryString(t))}else t instanceof r?"base64"===t.encoding&&g?n.push(g(t.data)):"URI"===t.encoding?n.push(decodeURIComponent(t.data)):"raw"===t.encoding&&n.push(t.data):("string"!=typeof t&&(t+=""),n.push(unescape(encodeURIComponent(t))))},i.getBlob=function(t){return arguments.length||(t=null),new r(this.data.join(""),t,"raw")},i.toString=function(){return"[object BlobBuilder]"},o.slice=function(t,e,n){var i=arguments.length;return i<3&&(n=null),new r(this.data.slice(t,i>1?e:this.data.length),n,this.encoding)},o.toString=function(){return"[object Blob]"},o.close=function(){this.size=0,delete this.data},n}(t);t.Blob=function(t,n){var r=n?n.type||"":"",i=new e;if(t)for(var o=0,a=t.length;o<a;o++)Uint8Array&&t[o]instanceof Uint8Array?i.append(t[o].buffer):i.append(t[o]);var s=i.getBlob(r);return!s.slice&&s.webkitSlice&&(s.slice=s.webkitSlice),s};var n=Object.getPrototypeOf||function(t){return t.__proto__};t.Blob.prototype=n(new t.Blob)}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||(void 0).content||void 0);var i=i||function(t){if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var e=t.document,n=function(){return t.URL||t.webkitURL||t},r=e.createElementNS("http://www.w3.org/1999/xhtml","a"),i="download"in r,o=function(t){var e=new MouseEvent("click");t.dispatchEvent(e)},a=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),s=t.webkitRequestFileSystem,c=t.requestFileSystem||s||t.mozRequestFileSystem,l=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},u="application/octet-stream",h=0,f=500,d=function(e){var r=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};t.chrome?r():setTimeout(r,f)},p=function(t,e,n){e=[].concat(e);for(var r=e.length;r--;){var i=t["on"+e[r]];if("function"==typeof i)try{i.call(t,n||t)}catch(t){l(t)}}},g=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t},m=function(e,l,f){f||(e=g(e));var m,w,y,v=this,b=e.type,x=!1,k=function(){p(v,"writestart progress write writeend".split(" "))},_=function(){if(w&&a&&"undefined"!=typeof FileReader){var r=new FileReader;return r.onloadend=function(){var t=r.result;w.location.href="data:attachment/file"+t.slice(t.search(/[,;]/)),v.readyState=v.DONE,k()},r.readAsDataURL(e),void(v.readyState=v.INIT)}if(!x&&m||(m=n().createObjectURL(e)),w)w.location.href=m;else{var i=t.open(m,"_blank");void 0==i&&a&&(t.location.href=m)}v.readyState=v.DONE,k(),d(m)},C=function(t){return function(){if(v.readyState!==v.DONE)return t.apply(this,arguments)}},A={create:!0,exclusive:!1};return v.readyState=v.INIT,l||(l="download"),i?(m=n().createObjectURL(e),void setTimeout(function(){r.href=m,r.download=l,o(r),k(),d(m),v.readyState=v.DONE})):(t.chrome&&b&&b!==u&&(y=e.slice||e.webkitSlice,e=y.call(e,0,e.size,u),x=!0),s&&"download"!==l&&(l+=".download"),(b===u||s)&&(w=t),c?(h+=e.size,void c(t.TEMPORARY,h,C(function(t){t.root.getDirectory("saved",A,C(function(t){var n=function(){t.getFile(l,A,C(function(t){t.createWriter(C(function(n){n.onwriteend=function(e){w.location.href=t.toURL(),v.readyState=v.DONE,p(v,"writeend",e),d(t)},n.onerror=function(){var t=n.error;t.code!==t.ABORT_ERR&&_()},"writestart progress write abort".split(" ").forEach(function(t){n["on"+t]=v["on"+t]}),n.write(e),v.abort=function(){n.abort(),v.readyState=v.DONE},v.readyState=v.WRITING}),_)}),_)};t.getFile(l,{create:!1},C(function(t){t.remove(),n()}),C(function(t){t.code===t.NOT_FOUND_ERR?n():_()}))}),_)}),_)):void _())},w=m.prototype,y=function(t,e,n){return new m(t,e,n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return n||(t=g(t)),navigator.msSaveOrOpenBlob(t,e||"download")}:(w.abort=function(){var t=this;t.readyState=t.DONE,p(t,"abort")},w.readyState=w.INIT=0,w.WRITING=1,w.DONE=2,w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null,y)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||(void 0).content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=i:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return i}),/*
 * Copyright (c) 2012 chick307 <chick307@gmail.com>
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
void function(t,e){"object"==typeof module?module.exports=e():"function"==typeof define?define(e):t.adler32cs=e()}(e,function(){var t="function"==typeof ArrayBuffer&&"function"==typeof Uint8Array,e=null,n=function(){if(!t)return function(){return!1};try{var n={};"function"==typeof n.Buffer&&(e=n.Buffer)}catch(t){}return function(t){return t instanceof ArrayBuffer||null!==e&&t instanceof e}}(),r=function(){return null!==e?function(t){return new e(t,"utf8").toString("binary")}:function(t){return unescape(encodeURIComponent(t))}}(),i=65521,o=function(t,e){for(var n=65535&t,r=t>>>16,o=0,a=e.length;o<a;o++)n=(n+(255&e.charCodeAt(o)))%i,r=(r+n)%i;return(r<<16|n)>>>0},a=function(t,e){for(var n=65535&t,r=t>>>16,o=0,a=e.length;o<a;o++)n=(n+e[o])%i,r=(r+n)%i;return(r<<16|n)>>>0},s={},c=s.Adler32=function(){var e=function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(!isFinite(t=null==t?1:+t))throw new Error("First arguments needs to be a finite number.");this.checksum=t>>>0},i=e.prototype={};return i.constructor=e,e.from=function(t){return t.prototype=i,t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");this.checksum=o(1,t.toString())}),e.fromUtf8=function(t){return t.prototype=i,t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");var n=r(t.toString());this.checksum=o(1,n)}),t&&(e.fromBuffer=function(t){return t.prototype=i,t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(!n(t))throw new Error("First argument needs to be ArrayBuffer.");var r=new Uint8Array(t);return this.checksum=a(1,r)})),i.update=function(t){if(null==t)throw new Error("First argument needs to be a string.");return t=t.toString(),this.checksum=o(this.checksum,t)},i.updateUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=r(t.toString());return this.checksum=o(this.checksum,e)},t&&(i.updateBuffer=function(t){if(!n(t))throw new Error("First argument needs to be ArrayBuffer.");var e=new Uint8Array(t);return this.checksum=a(this.checksum,e)}),i.clone=function(){return new c(this.checksum)},e}();return s.from=function(t){if(null==t)throw new Error("First argument needs to be a string.");return o(1,t.toString())},s.fromUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=r(t.toString());return o(1,e)},t&&(s.fromBuffer=function(t){if(!n(t))throw new Error("First argument need to be ArrayBuffer.");var e=new Uint8Array(t);return a(1,e)}),s});/**
 * CssColors
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var o={};o._colorsTable={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},o.colorNameToHex=function(t){return t=t.toLowerCase(),"undefined"!=typeof this._colorsTable[t]&&this._colorsTable[t]};/*
 Deflate.js - https://github.com/gildas-lormeau/zip.js
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var a=function(t){function e(){function t(t){var e,n,i,o,a,c,l=r.dyn_tree,u=r.stat_desc.static_tree,h=r.stat_desc.extra_bits,f=r.stat_desc.extra_base,p=r.stat_desc.max_length,g=0;for(o=0;o<=s;o++)t.bl_count[o]=0;for(l[2*t.heap[t.heap_max]+1]=0,e=t.heap_max+1;e<d;e++)n=t.heap[e],o=l[2*l[2*n+1]+1]+1,o>p&&(o=p,g++),l[2*n+1]=o,n>r.max_code||(t.bl_count[o]++,a=0,n>=f&&(a=h[n-f]),c=l[2*n],t.opt_len+=c*(o+a),u&&(t.static_len+=c*(u[2*n+1]+a)));if(0!==g){do{for(o=p-1;0===t.bl_count[o];)o--;t.bl_count[o]--,t.bl_count[o+1]+=2,t.bl_count[p]--,g-=2}while(g>0);for(o=p;0!==o;o--)for(n=t.bl_count[o];0!==n;)i=t.heap[--e],i>r.max_code||(l[2*i+1]!=o&&(t.opt_len+=(o-l[2*i+1])*l[2*i],l[2*i+1]=o),n--)}}function e(t,e){var n=0;do n|=1&t,t>>>=1,n<<=1;while(--e>0);return n>>>1}function n(t,n,r){var i,o,a,c=[],l=0;for(i=1;i<=s;i++)c[i]=l=l+r[i-1]<<1;for(o=0;o<=n;o++)a=t[2*o+1],0!==a&&(t[2*o]=e(c[a]++,a))}var r=this;r.build_tree=function(e){var i,o,a,s=r.dyn_tree,c=r.stat_desc.static_tree,l=r.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=d,i=0;i<l;i++)0!==s[2*i]?(e.heap[++e.heap_len]=u=i,e.depth[i]=0):s[2*i+1]=0;for(;e.heap_len<2;)a=e.heap[++e.heap_len]=u<2?++u:0,s[2*a]=1,e.depth[a]=0,e.opt_len--,c&&(e.static_len-=c[2*a+1]);for(r.max_code=u,i=Math.floor(e.heap_len/2);i>=1;i--)e.pqdownheap(s,i);a=l;do i=e.heap[1],e.heap[1]=e.heap[e.heap_len--],e.pqdownheap(s,1),o=e.heap[1],e.heap[--e.heap_max]=i,e.heap[--e.heap_max]=o,s[2*a]=s[2*i]+s[2*o],e.depth[a]=Math.max(e.depth[i],e.depth[o])+1,s[2*i+1]=s[2*o+1]=a,e.heap[1]=a++,e.pqdownheap(s,1);while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1],t(e),n(s,r.max_code,e.bl_count)}}function n(t,e,n,r,i){var o=this;o.static_tree=t,o.extra_bits=e,o.extra_base=n,o.elems=r,o.max_length=i}function r(t,e,n,r,i){var o=this;o.good_length=t,o.max_lazy=e,o.nice_length=n,o.max_chain=r,o.func=i}function i(t,e,n,r){var i=t[2*e],o=t[2*n];return i<o||i==o&&r[e]<=r[n]}function o(){function t(){var t;for(It=2*St,Ot[Rt-1]=0,t=0;t<Rt-1;t++)Ot[t]=0;Yt=L[Gt].max_lazy,Qt=L[Gt].good_length,Kt=L[Gt].nice_length,Vt=L[Gt].max_chain,Ut=0,zt=0,Wt=0,Nt=Xt=tt-1,Mt=0,Ft=0}function r(){var t;for(t=0;t<f;t++)$t[2*t]=0;for(t=0;t<c;t++)Zt[2*t]=0;for(t=0;t<l;t++)te[2*t]=0;$t[2*p]=1,ee.opt_len=ee.static_len=0,se=le=0}function o(){ne.dyn_tree=$t,ne.stat_desc=n.static_l_desc,re.dyn_tree=Zt,re.stat_desc=n.static_d_desc,ie.dyn_tree=te,ie.stat_desc=n.static_bl_desc,he=0,fe=0,ue=8,r()}function a(t,e){var n,r,i=-1,o=t[1],a=0,s=7,c=4;for(0===o&&(s=138,c=3),t[2*(e+1)+1]=65535,n=0;n<=e;n++)r=o,o=t[2*(n+1)+1],++a<s&&r==o||(a<c?te[2*r]+=a:0!==r?(r!=i&&te[2*r]++,te[2*m]++):a<=10?te[2*w]++:te[2*y]++,a=0,i=r,0===o?(s=138,c=3):r==o?(s=6,c=3):(s=7,c=4))}function s(){var t;for(a($t,ne.max_code),a(Zt,re.max_code),ie.build_tree(ee),t=l-1;t>=3&&0===te[2*e.bl_order[t]+1];t--);return ee.opt_len+=3*(t+1)+5+5+4,t}function u(t){ee.pending_buf[ee.pending++]=t}function d(t){u(255&t),u(t>>>8&255)}function g(t){u(t>>8&255),u(255&t&255)}function R(t,e){var n,r=e;fe>v-r?(n=t,he|=n<<fe&65535,d(he),he=n>>>v-fe,fe+=r-v):(he|=t<<fe&65535,fe+=r)}function rt(t,e){var n=2*t;R(65535&e[n],65535&e[n+1])}function it(t,e){var n,r,i=-1,o=t[1],a=0,s=7,c=4;for(0===o&&(s=138,c=3),n=0;n<=e;n++)if(r=o,o=t[2*(n+1)+1],!(++a<s&&r==o)){if(a<c){do rt(r,te);while(0!==--a)}else 0!==r?(r!=i&&(rt(r,te),a--),rt(m,te),R(a-3,2)):a<=10?(rt(w,te),R(a-3,3)):(rt(y,te),R(a-11,7));a=0,i=r,0===o?(s=138,c=3):r==o?(s=6,c=3):(s=7,c=4)}}function ot(t,n,r){var i;for(R(t-257,5),R(n-1,5),R(r-4,4),i=0;i<r;i++)R(te[2*e.bl_order[i]+1],3);it($t,t-1),it(Zt,n-1)}function at(){16==fe?(d(he),he=0,fe=0):fe>=8&&(u(255&he),he>>>=8,fe-=8)}function st(){R($<<1,3),rt(p,n.static_ltree),at(),1+ue+10-fe<9&&(R($<<1,3),rt(p,n.static_ltree),at()),ue=7}function ct(t,n){var r,i,o;if(ee.pending_buf[ce+2*se]=t>>>8&255,ee.pending_buf[ce+2*se+1]=255&t,ee.pending_buf[oe+se]=255&n,se++,0===t?$t[2*n]++:(le++,t--,$t[2*(e._length_code[n]+h+1)]++,Zt[2*e.d_code(t)]++),0===(8191&se)&&Gt>2){for(r=8*se,i=Ut-zt,o=0;o<c;o++)r+=Zt[2*o]*(5+e.extra_dbits[o]);if(r>>>=3,le<Math.floor(se/2)&&r<Math.floor(i/2))return!0}return se==ae-1}function lt(t,n){var r,i,o,a,s=0;if(0!==se)do r=ee.pending_buf[ce+2*s]<<8&65280|255&ee.pending_buf[ce+2*s+1],i=255&ee.pending_buf[oe+s],s++,0===r?rt(i,t):(o=e._length_code[i],rt(o+h+1,t),a=e.extra_lbits[o],0!==a&&(i-=e.base_length[o],R(i,a)),r--,o=e.d_code(r),rt(o,n),a=e.extra_dbits[o],0!==a&&(r-=e.base_dist[o],R(r,a)));while(s<se);rt(p,t),ue=t[2*p+1]}function ut(){fe>8?d(he):fe>0&&u(255&he),he=0,fe=0}function ht(t,e,n){ut(),ue=8,n&&(d(e),d(~e)),ee.pending_buf.set(Pt.subarray(t,t+e),ee.pending),ee.pending+=e}function ft(t,e,n){R((K<<1)+(n?1:0),3),ht(t,e,!0)}function dt(t,e,i){var o,a,c=0;Gt>0?(ne.build_tree(ee),re.build_tree(ee),c=s(),o=ee.opt_len+3+7>>>3,a=ee.static_len+3+7>>>3,a<=o&&(o=a)):o=a=e+5,e+4<=o&&t!=-1?ft(t,e,i):a==o?(R(($<<1)+(i?1:0),3),lt(n.static_ltree,n.static_dtree)):(R((Z<<1)+(i?1:0),3),ot(ne.max_code+1,re.max_code+1,c+1),lt($t,Zt)),r(),i&&ut()}function pt(t){dt(zt>=0?zt:-1,Ut-zt,t),zt=Ut,xt.flush_pending()}function gt(){var t,e,n,r;do{if(r=It-Wt-Ut,0===r&&0===Ut&&0===Wt)r=St;else if(r==-1)r--;else if(Ut>=St+St-nt){Pt.set(Pt.subarray(St,St+St),0),Ht-=St,Ut-=St,zt-=St,t=Rt,n=t;do e=65535&Ot[--n],Ot[n]=e>=St?e-St:0;while(0!==--t);t=St,n=t;do e=65535&Et[--n],Et[n]=e>=St?e-St:0;while(0!==--t);r+=St}if(0===xt.avail_in)return;t=xt.read_buf(Pt,Ut+Wt,r),Wt+=t,Wt>=tt&&(Ft=255&Pt[Ut],Ft=(Ft<<jt^255&Pt[Ut+1])&Dt)}while(Wt<nt&&0!==xt.avail_in)}function mt(t){var e,n=65535;for(n>_t-5&&(n=_t-5);;){if(Wt<=1){if(gt(),0===Wt&&t==C)return U;if(0===Wt)break}if(Ut+=Wt,Wt=0,e=zt+n,(0===Ut||Ut>=e)&&(Wt=Ut-e,Ut=e,pt(!1),0===xt.avail_out))return U;if(Ut-zt>=St-nt&&(pt(!1),0===xt.avail_out))return U}return pt(t==q),0===xt.avail_out?t==q?W:U:t==q?X:H}function wt(t){var e,n,r=Vt,i=Ut,o=Xt,a=Ut>St-nt?Ut-(St-nt):0,s=Kt,c=Tt,l=Ut+et,u=Pt[i+o-1],h=Pt[i+o];Xt>=Qt&&(r>>=2),s>Wt&&(s=Wt);do if(e=t,Pt[e+o]==h&&Pt[e+o-1]==u&&Pt[e]==Pt[i]&&Pt[++e]==Pt[i+1]){i+=2,e++;do;while(Pt[++i]==Pt[++e]&&Pt[++i]==Pt[++e]&&Pt[++i]==Pt[++e]&&Pt[++i]==Pt[++e]&&Pt[++i]==Pt[++e]&&Pt[++i]==Pt[++e]&&Pt[++i]==Pt[++e]&&Pt[++i]==Pt[++e]&&i<l);if(n=et-(l-i),i=l-et,n>o){if(Ht=t,o=n,n>=s)break;u=Pt[i+o-1],h=Pt[i+o]}}while((t=65535&Et[t&c])>a&&0!==--r);return o<=Wt?o:Wt}function yt(t){for(var e,n=0;;){if(Wt<nt){if(gt(),Wt<nt&&t==C)return U;if(0===Wt)break}if(Wt>=tt&&(Ft=(Ft<<jt^255&Pt[Ut+(tt-1)])&Dt,n=65535&Ot[Ft],Et[Ut&Tt]=Ot[Ft],Ot[Ft]=Ut),0!==n&&(Ut-n&65535)<=St-nt&&Jt!=k&&(Nt=wt(n)),Nt>=tt)if(e=ct(Ut-Ht,Nt-tt),Wt-=Nt,Nt<=Yt&&Wt>=tt){Nt--;do Ut++,Ft=(Ft<<jt^255&Pt[Ut+(tt-1)])&Dt,n=65535&Ot[Ft],Et[Ut&Tt]=Ot[Ft],Ot[Ft]=Ut;while(0!==--Nt);Ut++}else Ut+=Nt,Nt=0,Ft=255&Pt[Ut],Ft=(Ft<<jt^255&Pt[Ut+1])&Dt;else e=ct(0,255&Pt[Ut]),Wt--,Ut++;if(e&&(pt(!1),0===xt.avail_out))return U}return pt(t==q),0===xt.avail_out?t==q?W:U:t==q?X:H}function vt(t){for(var e,n,r=0;;){if(Wt<nt){if(gt(),Wt<nt&&t==C)return U;if(0===Wt)break}if(Wt>=tt&&(Ft=(Ft<<jt^255&Pt[Ut+(tt-1)])&Dt,r=65535&Ot[Ft],Et[Ut&Tt]=Ot[Ft],Ot[Ft]=Ut),Xt=Nt,Lt=Ht,Nt=tt-1,0!==r&&Xt<Yt&&(Ut-r&65535)<=St-nt&&(Jt!=k&&(Nt=wt(r)),Nt<=5&&(Jt==x||Nt==tt&&Ut-Ht>4096)&&(Nt=tt-1)),Xt>=tt&&Nt<=Xt){n=Ut+Wt-tt,e=ct(Ut-1-Lt,Xt-tt),Wt-=Xt-1,Xt-=2;do++Ut<=n&&(Ft=(Ft<<jt^255&Pt[Ut+(tt-1)])&Dt,r=65535&Ot[Ft],Et[Ut&Tt]=Ot[Ft],Ot[Ft]=Ut);while(0!==--Xt);if(Mt=0,Nt=tt-1,Ut++,e&&(pt(!1),0===xt.avail_out))return U}else if(0!==Mt){if(e=ct(0,255&Pt[Ut-1]),e&&pt(!1),Ut++,Wt--,0===xt.avail_out)return U}else Mt=1,Ut++,Wt--}return 0!==Mt&&(e=ct(0,255&Pt[Ut-1]),Mt=0),pt(t==q),0===xt.avail_out?t==q?W:U:t==q?X:H}function bt(e){return e.total_in=e.total_out=0,e.msg=null,ee.pending=0,ee.pending_out=0,kt=G,At=C,o(),t(),T}var xt,kt,_t,Ct,At,St,qt,Tt,Pt,It,Et,Ot,Ft,Rt,Bt,Dt,jt,zt,Nt,Lt,Mt,Ut,Ht,Wt,Xt,Vt,Yt,Gt,Jt,Qt,Kt,$t,Zt,te,ee=this,ne=new e,re=new e,ie=new e;ee.depth=[];var oe,ae,se,ce,le,ue,he,fe;ee.bl_count=[],ee.heap=[],$t=[],Zt=[],te=[],ee.pqdownheap=function(t,e){for(var n=ee.heap,r=n[e],o=e<<1;o<=ee.heap_len&&(o<ee.heap_len&&i(t,n[o+1],n[o],ee.depth)&&o++,!i(t,r,n[o],ee.depth));)n[e]=n[o],e=o,o<<=1;n[e]=r},ee.deflateInit=function(t,e,n,r,i,o){return r||(r=Q),i||(i=D),o||(o=_),t.msg=null,e==b&&(e=6),i<1||i>B||r!=Q||n<9||n>15||e<0||e>9||o<0||o>k?E:(t.dstate=ee,qt=n,St=1<<qt,Tt=St-1,Bt=i+7,Rt=1<<Bt,Dt=Rt-1,jt=Math.floor((Bt+tt-1)/tt),Pt=new Uint8Array(2*St),Et=[],Ot=[],ae=1<<i+6,ee.pending_buf=new Uint8Array(4*ae),_t=4*ae,ce=Math.floor(ae/2),oe=3*ae,Gt=e,Jt=o,Ct=255&r,bt(t))},ee.deflateEnd=function(){return kt!=Y&&kt!=G&&kt!=J?E:(ee.pending_buf=null,Ot=null,Et=null,Pt=null,ee.dstate=null,kt==G?O:T)},ee.deflateParams=function(t,e,n){var r=T;return e==b&&(e=6),e<0||e>9||n<0||n>k?E:(L[Gt].func!=L[e].func&&0!==t.total_in&&(r=t.deflate(A)),Gt!=e&&(Gt=e,Yt=L[Gt].max_lazy,Qt=L[Gt].good_length,Kt=L[Gt].nice_length,Vt=L[Gt].max_chain),Jt=n,r)},ee.deflateSetDictionary=function(t,e,n){var r,i=n,o=0;if(!e||kt!=Y)return E;if(i<tt)return T;for(i>St-nt&&(i=St-nt,o=n-i),Pt.set(e.subarray(o,o+i),0),Ut=i,zt=i,Ft=255&Pt[0],Ft=(Ft<<jt^255&Pt[1])&Dt,r=0;r<=i-tt;r++)Ft=(Ft<<jt^255&Pt[r+(tt-1)])&Dt,Et[r&Tt]=Ot[Ft],Ot[Ft]=r;return T},ee.deflate=function(t,e){var n,r,i,o,a;if(e>q||e<0)return E;if(!t.next_out||!t.next_in&&0!==t.avail_in||kt==J&&e!=q)return t.msg=M[I-E],E;if(0===t.avail_out)return t.msg=M[I-F],F;if(xt=t,o=At,At=e,kt==Y&&(r=Q+(qt-8<<4)<<8,i=(Gt-1&255)>>1,i>3&&(i=3),r|=i<<6,0!==Ut&&(r|=V),r+=31-r%31,kt=G,g(r)),0!==ee.pending){if(xt.flush_pending(),0===xt.avail_out)return At=-1,T}else if(0===xt.avail_in&&e<=o&&e!=q)return xt.msg=M[I-F],F;if(kt==J&&0!==xt.avail_in)return t.msg=M[I-F],F;if(0!==xt.avail_in||0!==Wt||e!=C&&kt!=J){switch(a=-1,L[Gt].func){case j:a=mt(e);break;case z:a=yt(e);break;case N:a=vt(e)}if(a!=W&&a!=X||(kt=J),a==U||a==W)return 0===xt.avail_out&&(At=-1),T;if(a==H){if(e==A)st();else if(ft(0,0,!1),e==S)for(n=0;n<Rt;n++)Ot[n]=0;if(xt.flush_pending(),0===xt.avail_out)return At=-1,T}}return e!=q?T:P}}function a(){var t=this;t.next_in_index=0,t.next_out_index=0,t.avail_in=0,t.total_in=0,t.avail_out=0,t.total_out=0}var s=15,c=30,l=19,u=29,h=256,f=h+1+u,d=2*f+1,p=256,g=7,m=16,w=17,y=18,v=16,b=-1,x=1,k=2,_=0,C=0,A=1,S=3,q=4,T=0,P=1,I=2,E=-2,O=-3,F=-5,R=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];e._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28],e.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],e.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],e.d_code=function(t){return t<256?R[t]:R[256+(t>>>7)]},e.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],e.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],e.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],e.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],n.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8],n.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5],n.static_l_desc=new n(n.static_ltree,e.extra_lbits,h+1,f,s),n.static_d_desc=new n(n.static_dtree,e.extra_dbits,0,c,s),n.static_bl_desc=new n(null,e.extra_blbits,0,l,g);var B=9,D=8,j=0,z=1,N=2,L=[new r(0,0,0,0,j),new r(4,4,8,4,z),new r(4,5,16,8,z),new r(4,6,32,32,z),new r(4,4,16,16,N),new r(8,16,32,32,N),new r(8,16,128,128,N),new r(8,32,128,256,N),new r(32,128,258,1024,N),new r(32,258,258,4096,N)],M=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],U=0,H=1,W=2,X=3,V=32,Y=42,G=113,J=666,Q=8,K=0,$=1,Z=2,tt=3,et=258,nt=et+tt+1;return a.prototype={deflateInit:function(t,e){var n=this;return n.dstate=new o,e||(e=s),n.dstate.deflateInit(n,t,e)},deflate:function(t){var e=this;return e.dstate?e.dstate.deflate(e,t):E},deflateEnd:function(){var t=this;if(!t.dstate)return E;var e=t.dstate.deflateEnd();return t.dstate=null,e},deflateParams:function(t,e){var n=this;return n.dstate?n.dstate.deflateParams(n,t,e):E},deflateSetDictionary:function(t,e){var n=this;return n.dstate?n.dstate.deflateSetDictionary(n,t,e):E},read_buf:function(t,e,n){var r=this,i=r.avail_in;return i>n&&(i=n),0===i?0:(r.avail_in-=i,t.set(r.next_in.subarray(r.next_in_index,r.next_in_index+i),e),r.next_in_index+=i,r.total_in+=i,i)},flush_pending:function(){var t=this,e=t.dstate.pending;e>t.avail_out&&(e=t.avail_out),0!==e&&(t.next_out.set(t.dstate.pending_buf.subarray(t.dstate.pending_out,t.dstate.pending_out+e),t.next_out_index),t.next_out_index+=e,t.dstate.pending_out+=e,t.total_out+=e,t.avail_out-=e,t.dstate.pending-=e,0===t.dstate.pending&&(t.dstate.pending_out=0))}},function(t){var e=this,n=new a,r=512,i=C,o=new Uint8Array(r);"undefined"==typeof t&&(t=b),n.deflateInit(t),n.next_out=o,e.append=function(t,e){var a,s,c=[],l=0,u=0,h=0;if(t.length){n.next_in_index=0,n.next_in=t,n.avail_in=t.length;do{if(n.next_out_index=0,n.avail_out=r,a=n.deflate(i),a!=T)throw"deflating: "+n.msg;n.next_out_index&&(n.next_out_index==r?c.push(new Uint8Array(o)):c.push(new Uint8Array(o.subarray(0,n.next_out_index)))),h+=n.next_out_index,e&&n.next_in_index>0&&n.next_in_index!=l&&(e(n.next_in_index),l=n.next_in_index)}while(n.avail_in>0||0===n.avail_out);return s=new Uint8Array(h),c.forEach(function(t){s.set(t,u),u+=t.length}),s}},e.flush=function(){var t,e,i=[],a=0,s=0;do{if(n.next_out_index=0,n.avail_out=r,t=n.deflate(q),t!=P&&t!=T)throw"deflating: "+n.msg;r-n.avail_out>0&&i.push(new Uint8Array(o.subarray(0,n.next_out_index))),s+=n.next_out_index}while(n.avail_in>0||0===n.avail_out);return n.deflateEnd(),e=new Uint8Array(s),i.forEach(function(t){e.set(t,a),a+=t.length}),e}}}(void 0);/*
  html2canvas 0.5.0-beta3 <http://html2canvas.hertzen.com>
  Copyright (c) 2016 Niklas von Hertzen

  Released under  License
*/
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.html2canvas=t()}}(function(){var t;return function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n?n:t)},u,u.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,n,r){(function(e){!function(i){function o(t){throw RangeError(R[t])}function a(t,e){for(var n=t.length;n--;)t[n]=e(t[n]);return t}function s(t,e){return a(t.split(F),e).join(".")}function c(t){for(var e,n,r=[],i=0,o=t.length;i<o;)e=t.charCodeAt(i++),e>=55296&&e<=56319&&i<o?(n=t.charCodeAt(i++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),i--)):r.push(e);return r}function l(t){return a(t,function(t){var e="";return t>65535&&(t-=65536,e+=j(t>>>10&1023|55296),t=56320|1023&t),e+=j(t)}).join("")}function u(t){return t-48<10?t-22:t-65<26?t-65:t-97<26?t-97:_}function h(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function f(t,e,n){var r=0;for(t=n?D(t/q):t>>1,t+=D(t/e);t>B*A>>1;r+=_)t=D(t/B);return D(r+(B+1)*t/(t+S))}function d(t){var e,n,r,i,a,s,c,h,d,p,g=[],m=t.length,w=0,y=P,v=T;for(n=t.lastIndexOf(I),n<0&&(n=0),r=0;r<n;++r)t.charCodeAt(r)>=128&&o("not-basic"),g.push(t.charCodeAt(r));for(i=n>0?n+1:0;i<m;){for(a=w,s=1,c=_;i>=m&&o("invalid-input"),h=u(t.charCodeAt(i++)),(h>=_||h>D((k-w)/s))&&o("overflow"),w+=h*s,d=c<=v?C:c>=v+A?A:c-v,!(h<d);c+=_)p=_-d,s>D(k/p)&&o("overflow"),s*=p;e=g.length+1,v=f(w-a,e,0==a),D(w/e)>k-y&&o("overflow"),y+=D(w/e),w%=e,g.splice(w++,0,y)}return l(g)}function p(t){var e,n,r,i,a,s,l,u,d,p,g,m,w,y,v,b=[];for(t=c(t),m=t.length,e=P,n=0,a=T,s=0;s<m;++s)g=t[s],g<128&&b.push(j(g));for(r=i=b.length,i&&b.push(I);r<m;){for(l=k,s=0;s<m;++s)g=t[s],g>=e&&g<l&&(l=g);for(w=r+1,l-e>D((k-n)/w)&&o("overflow"),n+=(l-e)*w,e=l,s=0;s<m;++s)if(g=t[s],g<e&&++n>k&&o("overflow"),g==e){for(u=n,d=_;p=d<=a?C:d>=a+A?A:d-a,!(u<p);d+=_)v=u-p,y=_-p,b.push(j(h(p+v%y,0))),u=D(v/y);b.push(j(h(u,0))),a=f(n,w,r==i),n=0,++r}++n,++e}return b.join("")}function g(t){return s(t,function(t){return E.test(t)?d(t.slice(4).toLowerCase()):t})}function m(t){return s(t,function(t){return O.test(t)?"xn--"+p(t):t})}var w="object"==typeof r&&r,y="object"==typeof n&&n&&n.exports==w&&n,v="object"==typeof e&&e;v.global!==v&&v.window!==v||(i=v);var b,x,k=2147483647,_=36,C=1,A=26,S=38,q=700,T=72,P=128,I="-",E=/^xn--/,O=/[^ -~]/,F=/\x2E|\u3002|\uFF0E|\uFF61/g,R={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},B=_-C,D=Math.floor,j=String.fromCharCode;if(b={version:"1.2.4",ucs2:{decode:c,encode:l},decode:d,encode:p,toASCII:m,toUnicode:g},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return b});else if(w&&!w.nodeType)if(y)y.exports=b;else for(x in b)b.hasOwnProperty(x)&&(w[x]=b[x]);else i.punycode=b}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(t,e,n){function r(t,e,n){!t.defaultView||e===t.defaultView.pageXOffset&&n===t.defaultView.pageYOffset||t.defaultView.scrollTo(e,n)}function i(t,e){try{e&&(e.width=t.width,e.height=t.height,e.getContext("2d").putImageData(t.getContext("2d").getImageData(0,0,t.width,t.height),0,0))}catch(e){s("Unable to copy canvas content from",t,e)}}function o(t,e){for(var n=3===t.nodeType?document.createTextNode(t.nodeValue):t.cloneNode(!1),r=t.firstChild;r;)e!==!0&&1===r.nodeType&&"SCRIPT"===r.nodeName||n.appendChild(o(r,e)),r=r.nextSibling;return 1===t.nodeType&&(n._scrollTop=t.scrollTop,n._scrollLeft=t.scrollLeft,"CANVAS"===t.nodeName?i(t,n):"TEXTAREA"!==t.nodeName&&"SELECT"!==t.nodeName||(n.value=t.value)),n}function a(t){if(1===t.nodeType){t.scrollTop=t._scrollTop,t.scrollLeft=t._scrollLeft;for(var e=t.firstChild;e;)a(e),e=e.nextSibling}}var s=t("./log");e.exports=function(t,e,n,i,s,c,l){var u=o(t.documentElement,s.javascriptEnabled),h=e.createElement("iframe");return h.className="html2canvas-container",h.style.visibility="hidden",h.style.position="fixed",h.style.left="-10000px",h.style.top="0px",h.style.border="0",h.width=n,h.height=i,h.scrolling="no",e.body.appendChild(h),new Promise(function(e){var n=h.contentWindow.document;h.contentWindow.onload=h.onload=function(){var t=setInterval(function(){n.body.childNodes.length>0&&(a(n.documentElement),clearInterval(t),"view"===s.type&&(h.contentWindow.scrollTo(c,l),!/(iPad|iPhone|iPod)/g.test(navigator.userAgent)||h.contentWindow.scrollY===l&&h.contentWindow.scrollX===c||(n.documentElement.style.top=-l+"px",n.documentElement.style.left=-c+"px",n.documentElement.style.position="absolute")),e(h))},50)},n.open(),n.write("<!DOCTYPE html><html></html>"),r(t,c,l),n.replaceChild(n.adoptNode(u),n.documentElement),n.close()})}},{"./log":13}],3:[function(t,e,n){function r(t){this.r=0,this.g=0,this.b=0,this.a=null;this.fromArray(t)||this.namedColor(t)||this.rgb(t)||this.rgba(t)||this.hex6(t)||this.hex3(t)}r.prototype.darken=function(t){var e=1-t;return new r([Math.round(this.r*e),Math.round(this.g*e),Math.round(this.b*e),this.a])},r.prototype.isTransparent=function(){return 0===this.a},r.prototype.isBlack=function(){return 0===this.r&&0===this.g&&0===this.b},r.prototype.fromArray=function(t){return Array.isArray(t)&&(this.r=Math.min(t[0],255),this.g=Math.min(t[1],255),this.b=Math.min(t[2],255),t.length>3&&(this.a=t[3])),Array.isArray(t)};var i=/^#([a-f0-9]{3})$/i;r.prototype.hex3=function(t){var e=null;return null!==(e=t.match(i))&&(this.r=parseInt(e[1][0]+e[1][0],16),this.g=parseInt(e[1][1]+e[1][1],16),this.b=parseInt(e[1][2]+e[1][2],16)),null!==e};var o=/^#([a-f0-9]{6})$/i;r.prototype.hex6=function(t){var e=null;return null!==(e=t.match(o))&&(this.r=parseInt(e[1].substring(0,2),16),this.g=parseInt(e[1].substring(2,4),16),this.b=parseInt(e[1].substring(4,6),16)),null!==e};var a=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;r.prototype.rgb=function(t){var e=null;return null!==(e=t.match(a))&&(this.r=Number(e[1]),this.g=Number(e[2]),this.b=Number(e[3])),null!==e};var s=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;r.prototype.rgba=function(t){var e=null;return null!==(e=t.match(s))&&(this.r=Number(e[1]),this.g=Number(e[2]),this.b=Number(e[3]),this.a=Number(e[4])),null!==e},r.prototype.toString=function(){return null!==this.a&&1!==this.a?"rgba("+[this.r,this.g,this.b,this.a].join(",")+")":"rgb("+[this.r,this.g,this.b].join(",")+")"},r.prototype.namedColor=function(t){t=t.toLowerCase();var e=c[t];if(e)this.r=e[0],this.g=e[1],this.b=e[2];else if("transparent"===t)return this.r=this.g=this.b=this.a=0,!0;return!!e},r.prototype.isColor=!0;var c={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};e.exports=r},{}],4:[function(e,n,r){function i(t,e){var n=_++;if(e=e||{},e.logging&&(w.options.logging=!0,w.options.start=Date.now()),e.async="undefined"==typeof e.async||e.async,e.allowTaint="undefined"!=typeof e.allowTaint&&e.allowTaint,e.removeContainer="undefined"==typeof e.removeContainer||e.removeContainer,e.javascriptEnabled="undefined"!=typeof e.javascriptEnabled&&e.javascriptEnabled,e.imageTimeout="undefined"==typeof e.imageTimeout?1e4:e.imageTimeout,e.renderer="function"==typeof e.renderer?e.renderer:d,e.strict=!!e.strict,"string"==typeof t){if("string"!=typeof e.proxy)return Promise.reject("Proxy must be used when rendering url");var r=null!=e.width?e.width:window.innerWidth,i=null!=e.height?e.height:window.innerHeight;return b(h(t),e.proxy,document,r,i,e).then(function(t){return a(t.contentWindow.document.documentElement,t,e,r,i)})}var s=(void 0===t?[document.documentElement]:t.length?t:[t])[0];return s.setAttribute(k+n,n),o(s.ownerDocument,e,s.ownerDocument.defaultView.innerWidth,s.ownerDocument.defaultView.innerHeight,n).then(function(t){return"function"==typeof e.onrendered&&(w("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"),e.onrendered(t)),t})}function o(t,e,n,r,i){return v(t,t,n,r,e,t.defaultView.pageXOffset,t.defaultView.pageYOffset).then(function(o){w("Document cloned");var s=k+i,c="["+s+"='"+i+"']";t.querySelector(c).removeAttribute(s);var l=o.contentWindow,u=l.document.querySelector(c),h="function"==typeof e.onclone?Promise.resolve(e.onclone(l.document)):Promise.resolve(!0);return h.then(function(){return a(u,o,e,n,r)})})}function a(t,e,n,r,i){var o=e.contentWindow,a=new f(o.document),h=new p(n,a),d=x(t),m="view"===n.type?r:l(o.document),y="view"===n.type?i:u(o.document),v=new n.renderer(m,y,h,n,document),b=new g(t,v,a,h,n);return b.ready.then(function(){w("Finished rendering");var r;return r="view"===n.type?c(v.canvas,{width:v.canvas.width,height:v.canvas.height,top:0,left:0,x:0,y:0}):t===o.document.body||t===o.document.documentElement||null!=n.canvas?v.canvas:c(v.canvas,{width:null!=n.width?n.width:d.width,height:null!=n.height?n.height:d.height,top:d.top,left:d.left,x:0,y:0}),s(e,n),r})}function s(t,e){e.removeContainer&&(t.parentNode.removeChild(t),w("Cleaned up container"))}function c(t,e){var n=document.createElement("canvas"),r=Math.min(t.width-1,Math.max(0,e.left)),i=Math.min(t.width,Math.max(1,e.left+e.width)),o=Math.min(t.height-1,Math.max(0,e.top)),a=Math.min(t.height,Math.max(1,e.top+e.height));n.width=e.width,n.height=e.height;var s=i-r,c=a-o;return w("Cropping canvas at:","left:",e.left,"top:",e.top,"width:",s,"height:",c),w("Resulting crop with width",e.width,"and height",e.height,"with x",r,"and y",o),n.getContext("2d").drawImage(t,r,o,s,c,e.x,e.y,s,c),n}function l(t){return Math.max(Math.max(t.body.scrollWidth,t.documentElement.scrollWidth),Math.max(t.body.offsetWidth,t.documentElement.offsetWidth),Math.max(t.body.clientWidth,t.documentElement.clientWidth))}function u(t){return Math.max(Math.max(t.body.scrollHeight,t.documentElement.scrollHeight),Math.max(t.body.offsetHeight,t.documentElement.offsetHeight),Math.max(t.body.clientHeight,t.documentElement.clientHeight))}function h(t){var e=document.createElement("a");return e.href=t,e.href=e.href,e}var f=e("./support"),d=e("./renderers/canvas"),p=e("./imageloader"),g=e("./nodeparser"),m=e("./nodecontainer"),w=e("./log"),y=e("./utils"),v=e("./clone"),b=e("./proxy").loadUrlDocument,x=y.getBounds,k="data-html2canvas-node",_=0;i.CanvasRenderer=d,i.NodeContainer=m,i.log=w,i.utils=y;var C="undefined"==typeof document||"function"!=typeof Object.create||"function"!=typeof document.createElement("canvas").getContext?function(){return Promise.reject("No canvas support")}:i;n.exports=C,"function"==typeof t&&t.amd&&t("html2canvas",[],function(){return C})},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(t,e,n){function r(t){if(this.src=t,i("DummyImageContainer for",t),!this.promise||!this.image){i("Initiating DummyImageContainer"),r.prototype.image=new Image;var e=this.image;r.prototype.promise=new Promise(function(t,n){e.onload=t,e.onerror=n,e.src=o(),e.complete===!0&&t(e)})}}var i=t("./log"),o=t("./utils").smallImage;e.exports=r},{"./log":13,"./utils":26}],6:[function(t,e,n){function r(t,e){var n,r,o=document.createElement("div"),a=document.createElement("img"),s=document.createElement("span"),c="Hidden Text";o.style.visibility="hidden",o.style.fontFamily=t,o.style.fontSize=e,o.style.margin=0,o.style.padding=0,document.body.appendChild(o),a.src=i(),a.width=1,a.height=1,a.style.margin=0,a.style.padding=0,a.style.verticalAlign="baseline",s.style.fontFamily=t,s.style.fontSize=e,s.style.margin=0,s.style.padding=0,s.appendChild(document.createTextNode(c)),o.appendChild(s),o.appendChild(a),n=a.offsetTop-s.offsetTop+1,o.removeChild(s),o.appendChild(document.createTextNode(c)),o.style.lineHeight="normal",a.style.verticalAlign="super",r=a.offsetTop-o.offsetTop+1,document.body.removeChild(o),this.baseline=n,this.lineWidth=1,this.middle=r}var i=t("./utils").smallImage;e.exports=r},{"./utils":26}],7:[function(t,e,n){function r(){this.data={}}var i=t("./font");r.prototype.getMetrics=function(t,e){return void 0===this.data[t+"-"+e]&&(this.data[t+"-"+e]=new i(t,e)),this.data[t+"-"+e]},e.exports=r},{"./font":6}],8:[function(t,e,n){function r(e,n,r){this.image=null,this.src=e;var i=this,a=o(e);this.promise=(n?new Promise(function(t){"about:blank"===e.contentWindow.document.URL||null==e.contentWindow.document.documentElement?e.contentWindow.onload=e.onload=function(){t(e)}:t(e)}):this.proxyLoad(r.proxy,a,r)).then(function(e){var n=t("./core");return n(e.contentWindow.document.documentElement,{type:"view",width:e.width,height:e.height,proxy:r.proxy,javascriptEnabled:r.javascriptEnabled,removeContainer:r.removeContainer,allowTaint:r.allowTaint,imageTimeout:r.imageTimeout/2})}).then(function(t){return i.image=t})}var i=t("./utils"),o=i.getBounds,a=t("./proxy").loadUrlDocument;r.prototype.proxyLoad=function(t,e,n){var r=this.src;return a(r.src,t,r.ownerDocument,e.width,e.height,n)},e.exports=r},{"./core":4,"./proxy":16,"./utils":26}],9:[function(t,e,n){function r(t){this.src=t.value,this.colorStops=[],this.type=null,this.x0=.5,this.y0=.5,this.x1=.5,this.y1=.5,this.promise=Promise.resolve(!0)}r.TYPES={LINEAR:1,RADIAL:2},r.REGEXP_COLORSTOP=/^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i,e.exports=r},{}],10:[function(t,e,n){function r(t,e){this.src=t,this.image=new Image;var n=this;this.tainted=null,this.promise=new Promise(function(r,i){n.image.onload=r,n.image.onerror=i,e&&(n.image.crossOrigin="anonymous"),n.image.src=t,n.image.complete===!0&&r(n.image)})}e.exports=r},{}],11:[function(t,e,n){function r(t,e){this.link=null,this.options=t,this.support=e,this.origin=this.getOrigin(window.location.href)}var i=t("./log"),o=t("./imagecontainer"),a=t("./dummyimagecontainer"),s=t("./proxyimagecontainer"),c=t("./framecontainer"),l=t("./svgcontainer"),u=t("./svgnodecontainer"),h=t("./lineargradientcontainer"),f=t("./webkitgradientcontainer"),d=t("./utils").bind;r.prototype.findImages=function(t){var e=[];return t.reduce(function(t,e){switch(e.node.nodeName){case"IMG":return t.concat([{args:[e.node.src],method:"url"}]);case"svg":case"IFRAME":return t.concat([{args:[e.node],method:e.node.nodeName}])}return t},[]).forEach(this.addImage(e,this.loadImage),this),e},r.prototype.findBackgroundImage=function(t,e){return e.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(t,this.loadImage),this),t},r.prototype.addImage=function(t,e){return function(n){n.args.forEach(function(r){this.imageExists(t,r)||(t.splice(0,0,e.call(this,n)),i("Added image #"+t.length,"string"==typeof r?r.substring(0,100):r))},this)}},r.prototype.hasImageBackground=function(t){return"none"!==t.method},r.prototype.loadImage=function(t){if("url"===t.method){var e=t.args[0];return!this.isSVG(e)||this.support.svg||this.options.allowTaint?e.match(/data:image\/.*;base64,/i)?new o(e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),!1):this.isSameOrigin(e)||this.options.allowTaint===!0||this.isSVG(e)?new o(e,!1):this.support.cors&&!this.options.allowTaint&&this.options.useCORS?new o(e,!0):this.options.proxy?new s(e,this.options.proxy):new a(e):new l(e)}return"linear-gradient"===t.method?new h(t):"gradient"===t.method?new f(t):"svg"===t.method?new u(t.args[0],this.support.svg):"IFRAME"===t.method?new c(t.args[0],this.isSameOrigin(t.args[0].src),this.options):new a(t)},r.prototype.isSVG=function(t){return"svg"===t.substring(t.length-3).toLowerCase()||l.prototype.isInline(t)},r.prototype.imageExists=function(t,e){return t.some(function(t){return t.src===e})},r.prototype.isSameOrigin=function(t){return this.getOrigin(t)===this.origin},r.prototype.getOrigin=function(t){var e=this.link||(this.link=document.createElement("a"));return e.href=t,e.href=e.href,e.protocol+e.hostname+e.port},r.prototype.getPromise=function(t){return this.timeout(t,this.options.imageTimeout).catch(function(){var e=new a(t.src);return e.promise.then(function(e){t.image=e})})},r.prototype.get=function(t){var e=null;return this.images.some(function(n){return(e=n).src===t})?e:null},r.prototype.fetch=function(t){return this.images=t.reduce(d(this.findBackgroundImage,this),this.findImages(t)),this.images.forEach(function(t,e){t.promise.then(function(){i("Succesfully loaded image #"+(e+1),t)},function(n){i("Failed loading image #"+(e+1),t,n)})}),this.ready=Promise.all(this.images.map(this.getPromise,this)),i("Finished searching images"),this},r.prototype.timeout=function(t,e){var n,r=Promise.race([t.promise,new Promise(function(r,o){n=setTimeout(function(){i("Timed out loading image",t),o(t)},e)})]).then(function(t){return clearTimeout(n),t});return r.catch(function(){clearTimeout(n)}),r},e.exports=r},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(t,e,n){function r(t){i.apply(this,arguments),this.type=i.TYPES.LINEAR;var e=r.REGEXP_DIRECTION.test(t.args[0])||!i.REGEXP_COLORSTOP.test(t.args[0]);e?t.args[0].split(/\s+/).reverse().forEach(function(t,e){switch(t){case"left":this.x0=0,this.x1=1;break;case"top":this.y0=0,this.y1=1;break;case"right":this.x0=1,this.x1=0;break;case"bottom":this.y0=1,this.y1=0;break;case"to":var n=this.y0,r=this.x0;this.y0=this.y1,this.x0=this.x1,this.x1=r,this.y1=n;break;case"center":break;default:var i=.01*parseFloat(t,10);if(isNaN(i))break;0===e?(this.y0=i,this.y1=1-this.y0):(this.x0=i,this.x1=1-this.x0)}},this):(this.y0=0,this.y1=1),this.colorStops=t.args.slice(e?1:0).map(function(t){var e=t.match(i.REGEXP_COLORSTOP),n=+e[2],r=0===n?"%":e[3];return{color:new o(e[1]),stop:"%"===r?n/100:null}}),null===this.colorStops[0].stop&&(this.colorStops[0].stop=0),null===this.colorStops[this.colorStops.length-1].stop&&(this.colorStops[this.colorStops.length-1].stop=1),this.colorStops.forEach(function(t,e){null===t.stop&&this.colorStops.slice(e).some(function(n,r){return null!==n.stop&&(t.stop=(n.stop-this.colorStops[e-1].stop)/(r+1)+this.colorStops[e-1].stop,!0)},this)},this)}var i=t("./gradientcontainer"),o=t("./color");r.prototype=Object.create(i.prototype),r.REGEXP_DIRECTION=/^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i,e.exports=r},{"./color":3,"./gradientcontainer":9}],13:[function(t,e,n){var r=function(){r.options.logging&&window.console&&window.console.log&&Function.prototype.bind.call(window.console.log,window.console).apply(window.console,[Date.now()-r.options.start+"ms","html2canvas:"].concat([].slice.call(arguments,0)))};r.options={logging:!1},e.exports=r},{}],14:[function(t,e,n){function r(t,e){this.node=t,this.parent=e,this.stack=null,this.bounds=null,this.borders=null,this.clip=[],this.backgroundClip=[],this.offsetBounds=null,this.visible=null,this.computedStyles=null,this.colors={},this.styles={},this.backgroundImages=null,this.transformData=null,this.transformMatrix=null,this.isPseudoElement=!1,this.opacity=null}function i(t){var e=t.options[t.selectedIndex||0];return e?e.text||"":""}function o(t){if(t&&"matrix"===t[1])return t[2].split(",").map(function(t){return parseFloat(t.trim())});if(t&&"matrix3d"===t[1]){var e=t[2].split(",").map(function(t){return parseFloat(t.trim())});return[e[0],e[1],e[4],e[5],e[12],e[13]]}}function a(t){return t.toString().indexOf("%")!==-1}function s(t){return t.replace("px","")}function c(t){return parseFloat(t)}var l=t("./color"),u=t("./utils"),h=u.getBounds,f=u.parseBackgrounds,d=u.offsetBounds;r.prototype.cloneTo=function(t){t.visible=this.visible,t.borders=this.borders,t.bounds=this.bounds,t.clip=this.clip,t.backgroundClip=this.backgroundClip,t.computedStyles=this.computedStyles,t.styles=this.styles,t.backgroundImages=this.backgroundImages,t.opacity=this.opacity},r.prototype.getOpacity=function(){return null===this.opacity?this.opacity=this.cssFloat("opacity"):this.opacity},r.prototype.assignStack=function(t){this.stack=t,t.children.push(this)},r.prototype.isElementVisible=function(){return this.node.nodeType===Node.TEXT_NODE?this.parent.visible:"none"!==this.css("display")&&"hidden"!==this.css("visibility")&&!this.node.hasAttribute("data-html2canvas-ignore")&&("INPUT"!==this.node.nodeName||"hidden"!==this.node.getAttribute("type"))},r.prototype.css=function(t){return this.computedStyles||(this.computedStyles=this.isPseudoElement?this.parent.computedStyle(this.before?":before":":after"):this.computedStyle(null)),this.styles[t]||(this.styles[t]=this.computedStyles[t])},r.prototype.prefixedCss=function(t){var e=["webkit","moz","ms","o"],n=this.css(t);return void 0===n&&e.some(function(e){return n=this.css(e+t.substr(0,1).toUpperCase()+t.substr(1)),void 0!==n},this),void 0===n?null:n},r.prototype.computedStyle=function(t){return this.node.ownerDocument.defaultView.getComputedStyle(this.node,t)},r.prototype.cssInt=function(t){var e=parseInt(this.css(t),10);return isNaN(e)?0:e},r.prototype.color=function(t){return this.colors[t]||(this.colors[t]=new l(this.css(t)))},r.prototype.cssFloat=function(t){var e=parseFloat(this.css(t));return isNaN(e)?0:e},r.prototype.fontWeight=function(){var t=this.css("fontWeight");switch(parseInt(t,10)){case 401:t="bold";break;case 400:t="normal"}return t},r.prototype.parseClip=function(){var t=this.css("clip").match(this.CLIP);return t?{top:parseInt(t[1],10),right:parseInt(t[2],10),bottom:parseInt(t[3],10),left:parseInt(t[4],10)}:null},r.prototype.parseBackgroundImages=function(){return this.backgroundImages||(this.backgroundImages=f(this.css("backgroundImage")))},r.prototype.cssList=function(t,e){var n=(this.css(t)||"").split(",");return n=n[e||0]||n[0]||"auto",n=n.trim().split(" "),1===n.length&&(n=[n[0],a(n[0])?"auto":n[0]]),n},r.prototype.parseBackgroundSize=function(t,e,n){var r,i,o=this.cssList("backgroundSize",n);if(a(o[0]))r=t.width*parseFloat(o[0])/100;else{if(/contain|cover/.test(o[0])){var s=t.width/t.height,c=e.width/e.height;return s<c^"contain"===o[0]?{width:t.height*c,height:t.height}:{width:t.width,height:t.width/c}}r=parseInt(o[0],10)}return i="auto"===o[0]&&"auto"===o[1]?e.height:"auto"===o[1]?r/e.width*e.height:a(o[1])?t.height*parseFloat(o[1])/100:parseInt(o[1],10),"auto"===o[0]&&(r=i/e.height*e.width),{width:r,height:i}},r.prototype.parseBackgroundPosition=function(t,e,n,r){var i,o,s=this.cssList("backgroundPosition",n);return i=a(s[0])?(t.width-(r||e).width)*(parseFloat(s[0])/100):parseInt(s[0],10),o="auto"===s[1]?i/e.width*e.height:a(s[1])?(t.height-(r||e).height)*parseFloat(s[1])/100:parseInt(s[1],10),"auto"===s[0]&&(i=o/e.height*e.width),{left:i,top:o}},r.prototype.parseBackgroundRepeat=function(t){return this.cssList("backgroundRepeat",t)[0]},r.prototype.parseTextShadows=function(){var t=this.css("textShadow"),e=[];if(t&&"none"!==t)for(var n=t.match(this.TEXT_SHADOW_PROPERTY),r=0;n&&r<n.length;r++){var i=n[r].match(this.TEXT_SHADOW_VALUES);e.push({color:new l(i[0]),offsetX:i[1]?parseFloat(i[1].replace("px","")):0,offsetY:i[2]?parseFloat(i[2].replace("px","")):0,blur:i[3]?i[3].replace("px",""):0})}return e},r.prototype.parseTransform=function(){if(!this.transformData)if(this.hasTransform()){var t=this.parseBounds(),e=this.prefixedCss("transformOrigin").split(" ").map(s).map(c);e[0]+=t.left,e[1]+=t.top,this.transformData={origin:e,matrix:this.parseTransformMatrix()}}else this.transformData={origin:[0,0],matrix:[1,0,0,1,0,0]};return this.transformData},r.prototype.parseTransformMatrix=function(){if(!this.transformMatrix){var t=this.prefixedCss("transform"),e=t?o(t.match(this.MATRIX_PROPERTY)):null;this.transformMatrix=e?e:[1,0,0,1,0,0]}return this.transformMatrix},r.prototype.parseBounds=function(){return this.bounds||(this.bounds=this.hasTransform()?d(this.node):h(this.node))},r.prototype.hasTransform=function(){return"1,0,0,1,0,0"!==this.parseTransformMatrix().join(",")||this.parent&&this.parent.hasTransform()},r.prototype.getValue=function(){var t=this.node.value||"";return"SELECT"===this.node.tagName?t=i(this.node):"password"===this.node.type&&(t=Array(t.length+1).join("•")),0===t.length?this.node.placeholder||"":t},r.prototype.MATRIX_PROPERTY=/(matrix|matrix3d)\((.+)\)/,r.prototype.TEXT_SHADOW_PROPERTY=/((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,r.prototype.TEXT_SHADOW_VALUES=/(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g,r.prototype.CLIP=/^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/,e.exports=r},{"./color":3,"./utils":26}],15:[function(t,e,n){function r(t,e,n,r,i){L("Starting NodeParser"),this.renderer=e,this.options=i,this.range=null,this.support=n,this.renderQueue=[],this.stack=new Y(!0,1,t.ownerDocument,null);var o=new U(t,null);if(i.background&&e.rectangle(0,0,e.width,e.height,new V(i.background)),t===t.ownerDocument.documentElement){var a=new U(o.color("backgroundColor").isTransparent()?t.ownerDocument.body:t.ownerDocument.documentElement,null);e.rectangle(0,0,e.width,e.height,a.color("backgroundColor"))}o.visibile=o.isElementVisible(),this.createPseudoHideStyles(t.ownerDocument),this.disableAnimations(t.ownerDocument),this.nodes=B([o].concat(this.getChildren(o)).filter(function(t){return t.visible=t.isElementVisible()}).map(this.getPseudoElements,this)),this.fontMetrics=new X,L("Fetched nodes, total:",this.nodes.length),L("Calculate overflow clips"),this.calculateOverflowClips(),L("Start fetching images"),this.images=r.fetch(this.nodes.filter(q)),this.ready=this.images.ready.then(J(function(){return L("Images loaded, starting parsing"),L("Creating stacking contexts"),this.createStackingContexts(),L("Sorting stacking contexts"),this.sortStackingContexts(this.stack),this.parse(this.stack),L("Render queue created with "+this.renderQueue.length+" items"),new Promise(J(function(t){i.async?"function"==typeof i.async?i.async.call(this,this.renderQueue,t):this.renderQueue.length>0?(this.renderIndex=0,this.asyncRenderer(this.renderQueue,t)):t():(this.renderQueue.forEach(this.paint,this),t())},this))},this))}function i(t){return t.parent&&t.parent.clip.length}function o(t){return t.replace(/(\-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})}function a(){}function s(t,e,n,r){return t.map(function(i,o){if(i.width>0){var a=e.left,s=e.top,c=e.width,l=e.height-t[2].width;switch(o){case 0:l=t[0].width,i.args=h({c1:[a,s],c2:[a+c,s],c3:[a+c-t[1].width,s+l],c4:[a+t[3].width,s+l]},r[0],r[1],n.topLeftOuter,n.topLeftInner,n.topRightOuter,n.topRightInner);break;case 1:a=e.left+e.width-t[1].width,c=t[1].width,i.args=h({c1:[a+c,s],c2:[a+c,s+l+t[2].width],c3:[a,s+l],c4:[a,s+t[0].width]},r[1],r[2],n.topRightOuter,n.topRightInner,n.bottomRightOuter,n.bottomRightInner);break;case 2:s=s+e.height-t[2].width,l=t[2].width,i.args=h({c1:[a+c,s+l],c2:[a,s+l],c3:[a+t[3].width,s],c4:[a+c-t[3].width,s]},r[2],r[3],n.bottomRightOuter,n.bottomRightInner,n.bottomLeftOuter,n.bottomLeftInner);break;case 3:c=t[3].width,i.args=h({c1:[a,s+l+t[2].width],c2:[a,s],c3:[a+c,s+t[0].width],c4:[a+c,s+l]},r[3],r[0],n.bottomLeftOuter,n.bottomLeftInner,n.topLeftOuter,n.topLeftInner)}}return i})}function c(t,e,n,r){var i=4*((Math.sqrt(2)-1)/3),o=n*i,a=r*i,s=t+n,c=e+r;return{topLeft:u({x:t,y:c},{x:t,y:c-a},{x:s-o,y:e},{x:s,y:e}),topRight:u({x:t,y:e},{x:t+o,y:e},{x:s,y:c-a},{x:s,y:c}),bottomRight:u({x:s,y:e},{x:s,y:e+a},{x:t+o,y:c},{x:t,y:c}),bottomLeft:u({x:s,y:c},{x:s-o,y:c},{x:t,y:e+a},{x:t,y:e})}}function l(t,e,n){var r=t.left,i=t.top,o=t.width,a=t.height,s=e[0][0]<o/2?e[0][0]:o/2,l=e[0][1]<a/2?e[0][1]:a/2,u=e[1][0]<o/2?e[1][0]:o/2,h=e[1][1]<a/2?e[1][1]:a/2,f=e[2][0]<o/2?e[2][0]:o/2,d=e[2][1]<a/2?e[2][1]:a/2,p=e[3][0]<o/2?e[3][0]:o/2,g=e[3][1]<a/2?e[3][1]:a/2,m=o-u,w=a-d,y=o-f,v=a-g;return{topLeftOuter:c(r,i,s,l).topLeft.subdivide(.5),topLeftInner:c(r+n[3].width,i+n[0].width,Math.max(0,s-n[3].width),Math.max(0,l-n[0].width)).topLeft.subdivide(.5),topRightOuter:c(r+m,i,u,h).topRight.subdivide(.5),topRightInner:c(r+Math.min(m,o+n[3].width),i+n[0].width,m>o+n[3].width?0:u-n[3].width,h-n[0].width).topRight.subdivide(.5),bottomRightOuter:c(r+y,i+w,f,d).bottomRight.subdivide(.5),bottomRightInner:c(r+Math.min(y,o-n[3].width),i+Math.min(w,a+n[0].width),Math.max(0,f-n[1].width),d-n[2].width).bottomRight.subdivide(.5),bottomLeftOuter:c(r,i+v,p,g).bottomLeft.subdivide(.5),
bottomLeftInner:c(r+n[3].width,i+v,Math.max(0,p-n[3].width),g-n[2].width).bottomLeft.subdivide(.5)}}function u(t,e,n,r){var i=function(t,e,n){return{x:t.x+(e.x-t.x)*n,y:t.y+(e.y-t.y)*n}};return{start:t,startControl:e,endControl:n,end:r,subdivide:function(o){var a=i(t,e,o),s=i(e,n,o),c=i(n,r,o),l=i(a,s,o),h=i(s,c,o),f=i(l,h,o);return[u(t,a,l,f),u(f,h,c,r)]},curveTo:function(t){t.push(["bezierCurve",e.x,e.y,n.x,n.y,r.x,r.y])},curveToReversed:function(r){r.push(["bezierCurve",n.x,n.y,e.x,e.y,t.x,t.y])}}}function h(t,e,n,r,i,o,a){var s=[];return e[0]>0||e[1]>0?(s.push(["line",r[1].start.x,r[1].start.y]),r[1].curveTo(s)):s.push(["line",t.c1[0],t.c1[1]]),n[0]>0||n[1]>0?(s.push(["line",o[0].start.x,o[0].start.y]),o[0].curveTo(s),s.push(["line",a[0].end.x,a[0].end.y]),a[0].curveToReversed(s)):(s.push(["line",t.c2[0],t.c2[1]]),s.push(["line",t.c3[0],t.c3[1]])),e[0]>0||e[1]>0?(s.push(["line",i[1].end.x,i[1].end.y]),i[1].curveToReversed(s)):s.push(["line",t.c4[0],t.c4[1]]),s}function f(t,e,n,r,i,o,a){e[0]>0||e[1]>0?(t.push(["line",r[0].start.x,r[0].start.y]),r[0].curveTo(t),r[1].curveTo(t)):t.push(["line",o,a]),(n[0]>0||n[1]>0)&&t.push(["line",i[0].start.x,i[0].start.y])}function d(t){return t.cssInt("zIndex")<0}function p(t){return t.cssInt("zIndex")>0}function g(t){return 0===t.cssInt("zIndex")}function m(t){return["inline","inline-block","inline-table"].indexOf(t.css("display"))!==-1}function w(t){return t instanceof Y}function y(t){return t.node.data.trim().length>0}function v(t){return/^(normal|none|0px)$/.test(t.parent.css("letterSpacing"))}function b(t){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(e){var n=t.css("border"+e+"Radius"),r=n.split(" ");return r.length<=1&&(r[1]=r[0]),r.map(O)})}function x(t){return t.nodeType===Node.TEXT_NODE||t.nodeType===Node.ELEMENT_NODE}function k(t){var e=t.css("position"),n=["absolute","relative","fixed"].indexOf(e)!==-1?t.css("zIndex"):"auto";return"auto"!==n}function _(t){return"static"!==t.css("position")}function C(t){return"none"!==t.css("float")}function A(t){return["inline-block","inline-table"].indexOf(t.css("display"))!==-1}function S(t){var e=this;return function(){return!t.apply(e,arguments)}}function q(t){return t.node.nodeType===Node.ELEMENT_NODE}function T(t){return t.isPseudoElement===!0}function P(t){return t.node.nodeType===Node.TEXT_NODE}function I(t){return function(e,n){return e.cssInt("zIndex")+t.indexOf(e)/t.length-(n.cssInt("zIndex")+t.indexOf(n)/t.length)}}function E(t){return t.getOpacity()<1}function O(t){return parseInt(t,10)}function F(t){return t.width}function R(t){return t.node.nodeType!==Node.ELEMENT_NODE||["SCRIPT","HEAD","TITLE","OBJECT","BR","OPTION"].indexOf(t.node.nodeName)===-1}function B(t){return[].concat.apply([],t)}function D(t){var e=t.substr(0,1);return e===t.substr(t.length-1)&&e.match(/'|"/)?t.substr(1,t.length-2):t}function j(t){for(var e,n=[],r=0,i=!1;t.length;)z(t[r])===i?(e=t.splice(0,r),e.length&&n.push(M.ucs2.encode(e)),i=!i,r=0):r++,r>=t.length&&(e=t.splice(0,r),e.length&&n.push(M.ucs2.encode(e)));return n}function z(t){return[32,13,10,9,45].indexOf(t)!==-1}function N(t){return/[^\u0000-\u00ff]/.test(t)}var L=t("./log"),M=t("punycode"),U=t("./nodecontainer"),H=t("./textcontainer"),W=t("./pseudoelementcontainer"),X=t("./fontmetrics"),V=t("./color"),Y=t("./stackingcontext"),G=t("./utils"),J=G.bind,Q=G.getBounds,K=G.parseBackgrounds,$=G.offsetBounds;r.prototype.calculateOverflowClips=function(){this.nodes.forEach(function(t){if(q(t)){T(t)&&t.appendToDOM(),t.borders=this.parseBorders(t);var e="hidden"===t.css("overflow")?[t.borders.clip]:[],n=t.parseClip();n&&["absolute","fixed"].indexOf(t.css("position"))!==-1&&e.push([["rect",t.bounds.left+n.left,t.bounds.top+n.top,n.right-n.left,n.bottom-n.top]]),t.clip=i(t)?t.parent.clip.concat(e):e,t.backgroundClip="hidden"!==t.css("overflow")?t.clip.concat([t.borders.clip]):t.clip,T(t)&&t.cleanDOM()}else P(t)&&(t.clip=i(t)?t.parent.clip:[]);T(t)||(t.bounds=null)},this)},r.prototype.asyncRenderer=function(t,e,n){n=n||Date.now(),this.paint(t[this.renderIndex++]),t.length===this.renderIndex?e():n+20>Date.now()?this.asyncRenderer(t,e,n):setTimeout(J(function(){this.asyncRenderer(t,e)},this),0)},r.prototype.createPseudoHideStyles=function(t){this.createStyles(t,"."+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+':before { content: "" !important; display: none !important; }.'+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER+':after { content: "" !important; display: none !important; }')},r.prototype.disableAnimations=function(t){this.createStyles(t,"* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")},r.prototype.createStyles=function(t,e){var n=t.createElement("style");n.innerHTML=e,t.body.appendChild(n)},r.prototype.getPseudoElements=function(t){var e=[[t]];if(t.node.nodeType===Node.ELEMENT_NODE){var n=this.getPseudoElement(t,":before"),r=this.getPseudoElement(t,":after");n&&e.push(n),r&&e.push(r)}return B(e)},r.prototype.getPseudoElement=function(t,e){var n=t.computedStyle(e);if(!n||!n.content||"none"===n.content||"-moz-alt-content"===n.content||"none"===n.display)return null;for(var r=D(n.content),i="url"===r.substr(0,3),a=document.createElement(i?"img":"html2canvaspseudoelement"),s=new W(a,t,e),c=n.length-1;c>=0;c--){var l=o(n.item(c));a.style[l]=n[l]}if(a.className=W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+" "+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER,i)return a.src=K(r)[0].args[0],[s];var u=document.createTextNode(r);return a.appendChild(u),[s,new H(u,s)]},r.prototype.getChildren=function(t){return B([].filter.call(t.node.childNodes,x).map(function(e){var n=[e.nodeType===Node.TEXT_NODE?new H(e,t):new U(e,t)].filter(R);return e.nodeType===Node.ELEMENT_NODE&&n.length&&"TEXTAREA"!==e.tagName?n[0].isElementVisible()?n.concat(this.getChildren(n[0])):[]:n},this))},r.prototype.newStackingContext=function(t,e){var n=new Y(e,t.getOpacity(),t.node,t.parent);t.cloneTo(n);var r=e?n.getParentStack(this):n.parent.stack;r.contexts.push(n),t.stack=n},r.prototype.createStackingContexts=function(){this.nodes.forEach(function(t){q(t)&&(this.isRootElement(t)||E(t)||k(t)||this.isBodyWithTransparentRoot(t)||t.hasTransform())?this.newStackingContext(t,!0):q(t)&&(_(t)&&g(t)||A(t)||C(t))?this.newStackingContext(t,!1):t.assignStack(t.parent.stack)},this)},r.prototype.isBodyWithTransparentRoot=function(t){return"BODY"===t.node.nodeName&&t.parent.color("backgroundColor").isTransparent()},r.prototype.isRootElement=function(t){return null===t.parent},r.prototype.sortStackingContexts=function(t){t.contexts.sort(I(t.contexts.slice(0))),t.contexts.forEach(this.sortStackingContexts,this)},r.prototype.parseTextBounds=function(t){return function(e,n,r){if("none"!==t.parent.css("textDecoration").substr(0,4)||0!==e.trim().length){if(this.support.rangeBounds&&!t.parent.hasTransform()){var i=r.slice(0,n).join("").length;return this.getRangeBounds(t.node,i,e.length)}if(t.node&&"string"==typeof t.node.data){var o=t.node.splitText(e.length),a=this.getWrapperBounds(t.node,t.parent.hasTransform());return t.node=o,a}}else this.support.rangeBounds&&!t.parent.hasTransform()||(t.node=t.node.splitText(e.length));return{}}},r.prototype.getWrapperBounds=function(t,e){var n=t.ownerDocument.createElement("html2canvaswrapper"),r=t.parentNode,i=t.cloneNode(!0);n.appendChild(t.cloneNode(!0)),r.replaceChild(n,t);var o=e?$(n):Q(n);return r.replaceChild(i,n),o},r.prototype.getRangeBounds=function(t,e,n){var r=this.range||(this.range=t.ownerDocument.createRange());return r.setStart(t,e),r.setEnd(t,e+n),r.getBoundingClientRect()},r.prototype.parse=function(t){var e=t.contexts.filter(d),n=t.children.filter(q),r=n.filter(S(C)),i=r.filter(S(_)).filter(S(m)),o=n.filter(S(_)).filter(C),s=r.filter(S(_)).filter(m),c=t.contexts.concat(r.filter(_)).filter(g),l=t.children.filter(P).filter(y),u=t.contexts.filter(p);e.concat(i).concat(o).concat(s).concat(c).concat(l).concat(u).forEach(function(t){this.renderQueue.push(t),w(t)&&(this.parse(t),this.renderQueue.push(new a))},this)},r.prototype.paint=function(t){try{t instanceof a?this.renderer.ctx.restore():P(t)?(T(t.parent)&&t.parent.appendToDOM(),this.paintText(t),T(t.parent)&&t.parent.cleanDOM()):this.paintNode(t)}catch(t){if(L(t),this.options.strict)throw t}},r.prototype.paintNode=function(t){w(t)&&(this.renderer.setOpacity(t.opacity),this.renderer.ctx.save(),t.hasTransform()&&this.renderer.setTransform(t.parseTransform())),"INPUT"===t.node.nodeName&&"checkbox"===t.node.type?this.paintCheckbox(t):"INPUT"===t.node.nodeName&&"radio"===t.node.type?this.paintRadio(t):this.paintElement(t)},r.prototype.paintElement=function(t){var e=t.parseBounds();this.renderer.clip(t.backgroundClip,function(){this.renderer.renderBackground(t,e,t.borders.borders.map(F))},this),this.renderer.clip(t.clip,function(){this.renderer.renderBorders(t.borders.borders)},this),this.renderer.clip(t.backgroundClip,function(){switch(t.node.nodeName){case"svg":case"IFRAME":var n=this.images.get(t.node);n?this.renderer.renderImage(t,e,t.borders,n):L("Error loading <"+t.node.nodeName+">",t.node);break;case"IMG":var r=this.images.get(t.node.src);r?this.renderer.renderImage(t,e,t.borders,r):L("Error loading <img>",t.node.src);break;case"CANVAS":this.renderer.renderImage(t,e,t.borders,{image:t.node});break;case"SELECT":case"INPUT":case"TEXTAREA":this.paintFormValue(t)}},this)},r.prototype.paintCheckbox=function(t){var e=t.parseBounds(),n=Math.min(e.width,e.height),r={width:n-1,height:n-1,top:e.top,left:e.left},i=[3,3],o=[i,i,i,i],a=[1,1,1,1].map(function(t){return{color:new V("#A5A5A5"),width:t}}),c=l(r,o,a);this.renderer.clip(t.backgroundClip,function(){this.renderer.rectangle(r.left+1,r.top+1,r.width-2,r.height-2,new V("#DEDEDE")),this.renderer.renderBorders(s(a,r,c,o)),t.node.checked&&(this.renderer.font(new V("#424242"),"normal","normal","bold",n-3+"px","arial"),this.renderer.text("✔",r.left+n/6,r.top+n-1))},this)},r.prototype.paintRadio=function(t){var e=t.parseBounds(),n=Math.min(e.width,e.height)-2;this.renderer.clip(t.backgroundClip,function(){this.renderer.circleStroke(e.left+1,e.top+1,n,new V("#DEDEDE"),1,new V("#A5A5A5")),t.node.checked&&this.renderer.circle(Math.ceil(e.left+n/4)+1,Math.ceil(e.top+n/4)+1,Math.floor(n/2),new V("#424242"))},this)},r.prototype.paintFormValue=function(t){var e=t.getValue();if(e.length>0){var n=t.node.ownerDocument,r=n.createElement("html2canvaswrapper"),i=["lineHeight","textAlign","fontFamily","fontWeight","fontSize","color","paddingLeft","paddingTop","paddingRight","paddingBottom","width","height","borderLeftStyle","borderTopStyle","borderLeftWidth","borderTopWidth","boxSizing","whiteSpace","wordWrap"];i.forEach(function(e){try{r.style[e]=t.css(e)}catch(t){L("html2canvas: Parse: Exception caught in renderFormValue: "+t.message)}});var o=t.parseBounds();r.style.position="fixed",r.style.left=o.left+"px",r.style.top=o.top+"px",r.textContent=e,n.body.appendChild(r),this.paintText(new H(r.firstChild,t)),n.body.removeChild(r)}},r.prototype.paintText=function(t){t.applyTextTransform();var e=M.ucs2.decode(t.node.data),n=this.options.letterRendering&&!v(t)||N(t.node.data)?e.map(function(t){return M.ucs2.encode([t])}):j(e),r=t.parent.fontWeight(),i=t.parent.css("fontSize"),o=t.parent.css("fontFamily"),a=t.parent.parseTextShadows();this.renderer.font(t.parent.color("color"),t.parent.css("fontStyle"),t.parent.css("fontVariant"),r,i,o),a.length?this.renderer.fontShadow(a[0].color,a[0].offsetX,a[0].offsetY,a[0].blur):this.renderer.clearShadow(),this.renderer.clip(t.parent.clip,function(){n.map(this.parseTextBounds(t),this).forEach(function(e,r){e&&(this.renderer.text(n[r],e.left,e.bottom),this.renderTextDecoration(t.parent,e,this.fontMetrics.getMetrics(o,i)))},this)},this)},r.prototype.renderTextDecoration=function(t,e,n){switch(t.css("textDecoration").split(" ")[0]){case"underline":this.renderer.rectangle(e.left,Math.round(e.top+n.baseline+n.lineWidth),e.width,1,t.color("color"));break;case"overline":this.renderer.rectangle(e.left,Math.round(e.top),e.width,1,t.color("color"));break;case"line-through":this.renderer.rectangle(e.left,Math.ceil(e.top+n.middle+n.lineWidth),e.width,1,t.color("color"))}};var Z={inset:[["darken",.6],["darken",.1],["darken",.1],["darken",.6]]};r.prototype.parseBorders=function(t){var e=t.parseBounds(),n=b(t),r=["Top","Right","Bottom","Left"].map(function(e,n){var r=t.css("border"+e+"Style"),i=t.color("border"+e+"Color");"inset"===r&&i.isBlack()&&(i=new V([255,255,255,i.a]));var o=Z[r]?Z[r][n]:null;return{width:t.cssInt("border"+e+"Width"),color:o?i[o[0]](o[1]):i,args:null}}),i=l(e,n,r);return{clip:this.parseBackgroundClip(t,i,r,n,e),borders:s(r,e,i,n)}},r.prototype.parseBackgroundClip=function(t,e,n,r,i){var o=t.css("backgroundClip"),a=[];switch(o){case"content-box":case"padding-box":f(a,r[0],r[1],e.topLeftInner,e.topRightInner,i.left+n[3].width,i.top+n[0].width),f(a,r[1],r[2],e.topRightInner,e.bottomRightInner,i.left+i.width-n[1].width,i.top+n[0].width),f(a,r[2],r[3],e.bottomRightInner,e.bottomLeftInner,i.left+i.width-n[1].width,i.top+i.height-n[2].width),f(a,r[3],r[0],e.bottomLeftInner,e.topLeftInner,i.left+n[3].width,i.top+i.height-n[2].width);break;default:f(a,r[0],r[1],e.topLeftOuter,e.topRightOuter,i.left,i.top),f(a,r[1],r[2],e.topRightOuter,e.bottomRightOuter,i.left+i.width,i.top),f(a,r[2],r[3],e.bottomRightOuter,e.bottomLeftOuter,i.left+i.width,i.top+i.height),f(a,r[3],r[0],e.bottomLeftOuter,e.topLeftOuter,i.left,i.top+i.height)}return a},e.exports=r},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,punycode:1}],16:[function(t,e,n){function r(t,e,n){var r="withCredentials"in new XMLHttpRequest;if(!e)return Promise.reject("No proxy configured");var i=a(r),c=s(e,t,i);return r?u(c):o(n,c,i).then(function(t){return p(t.content)})}function i(t,e,n){var r="crossOrigin"in new Image,i=a(r),c=s(e,t,i);return r?Promise.resolve(c):o(n,c,i).then(function(t){return"data:"+t.type+";base64,"+t.content})}function o(t,e,n){return new Promise(function(r,i){var o=t.createElement("script"),a=function(){delete window.html2canvas.proxy[n],t.body.removeChild(o)};window.html2canvas.proxy[n]=function(t){a(),r(t)},o.src=e,o.onerror=function(t){a(),i(t)},t.body.appendChild(o)})}function a(t){return t?"":"html2canvas_"+Date.now()+"_"+ ++g+"_"+Math.round(1e5*Math.random())}function s(t,e,n){return t+"?url="+encodeURIComponent(e)+(n.length?"&callback=html2canvas.proxy."+n:"")}function c(t){return function(e){var n,r=new DOMParser;try{n=r.parseFromString(e,"text/html")}catch(t){f("DOMParser not supported, falling back to createHTMLDocument"),n=document.implementation.createHTMLDocument("");try{n.open(),n.write(e),n.close()}catch(t){f("createHTMLDocument write not supported, falling back to document.body.innerHTML"),n.body.innerHTML=e}}var i=n.querySelector("base");if(!i||!i.href.host){var o=n.createElement("base");o.href=t,n.head.insertBefore(o,n.head.firstChild)}return n}}function l(t,e,n,i,o,a){return new r(t,e,window.document).then(c(t)).then(function(t){return d(t,n,i,o,a,0,0)})}var u=t("./xhr"),h=t("./utils"),f=t("./log"),d=t("./clone"),p=h.decode64,g=0;n.Proxy=r,n.ProxyURL=i,n.loadUrlDocument=l},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(t,e,n){function r(t,e){var n=document.createElement("a");n.href=t,t=n.href,this.src=t,this.image=new Image;var r=this;this.promise=new Promise(function(n,o){r.image.crossOrigin="Anonymous",r.image.onload=n,r.image.onerror=o,new i(t,e,document).then(function(t){r.image.src=t}).catch(o)})}var i=t("./proxy").ProxyURL;e.exports=r},{"./proxy":16}],18:[function(t,e,n){function r(t,e,n){i.call(this,t,e),this.isPseudoElement=!0,this.before=":before"===n}var i=t("./nodecontainer");r.prototype.cloneTo=function(t){r.prototype.cloneTo.call(this,t),t.isPseudoElement=!0,t.before=this.before},r.prototype=Object.create(i.prototype),r.prototype.appendToDOM=function(){this.before?this.parent.node.insertBefore(this.node,this.parent.node.firstChild):this.parent.node.appendChild(this.node),this.parent.node.className+=" "+this.getHideClass()},r.prototype.cleanDOM=function(){this.node.parentNode.removeChild(this.node),this.parent.node.className=this.parent.node.className.replace(this.getHideClass(),"")},r.prototype.getHideClass=function(){return this["PSEUDO_HIDE_ELEMENT_CLASS_"+(this.before?"BEFORE":"AFTER")]},r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE="___html2canvas___pseudoelement_before",r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER="___html2canvas___pseudoelement_after",e.exports=r},{"./nodecontainer":14}],19:[function(t,e,n){function r(t,e,n,r,i){this.width=t,this.height=e,this.images=n,this.options=r,this.document=i}var i=t("./log");r.prototype.renderImage=function(t,e,n,r){var i=t.cssInt("paddingLeft"),o=t.cssInt("paddingTop"),a=t.cssInt("paddingRight"),s=t.cssInt("paddingBottom"),c=n.borders,l=e.width-(c[1].width+c[3].width+i+a),u=e.height-(c[0].width+c[2].width+o+s);this.drawImage(r,0,0,r.image.width||l,r.image.height||u,e.left+i+c[3].width,e.top+o+c[0].width,l,u)},r.prototype.renderBackground=function(t,e,n){e.height>0&&e.width>0&&(this.renderBackgroundColor(t,e),this.renderBackgroundImage(t,e,n))},r.prototype.renderBackgroundColor=function(t,e){var n=t.color("backgroundColor");n.isTransparent()||this.rectangle(e.left,e.top,e.width,e.height,n)},r.prototype.renderBorders=function(t){t.forEach(this.renderBorder,this)},r.prototype.renderBorder=function(t){t.color.isTransparent()||null===t.args||this.drawShape(t.args,t.color)},r.prototype.renderBackgroundImage=function(t,e,n){var r=t.parseBackgroundImages();r.reverse().forEach(function(r,o,a){switch(r.method){case"url":var s=this.images.get(r.args[0]);s?this.renderBackgroundRepeating(t,e,s,a.length-(o+1),n):i("Error loading background-image",r.args[0]);break;case"linear-gradient":case"gradient":var c=this.images.get(r.value);c?this.renderBackgroundGradient(c,e,n):i("Error loading background-image",r.args[0]);break;case"none":break;default:i("Unknown background-image type",r.args[0])}},this)},r.prototype.renderBackgroundRepeating=function(t,e,n,r,i){var o=t.parseBackgroundSize(e,n.image,r),a=t.parseBackgroundPosition(e,n.image,r,o),s=t.parseBackgroundRepeat(r);switch(s){case"repeat-x":case"repeat no-repeat":this.backgroundRepeatShape(n,a,o,e,e.left+i[3],e.top+a.top+i[0],99999,o.height,i);break;case"repeat-y":case"no-repeat repeat":this.backgroundRepeatShape(n,a,o,e,e.left+a.left+i[3],e.top+i[0],o.width,99999,i);break;case"no-repeat":this.backgroundRepeatShape(n,a,o,e,e.left+a.left+i[3],e.top+a.top+i[0],o.width,o.height,i);break;default:this.renderBackgroundRepeat(n,a,o,{top:e.top,left:e.left},i[3],i[0])}},e.exports=r},{"./log":13}],20:[function(t,e,n){function r(t,e){o.apply(this,arguments),this.canvas=this.options.canvas||this.document.createElement("canvas"),this.options.canvas||(this.canvas.width=t,this.canvas.height=e),this.ctx=this.canvas.getContext("2d"),this.taintCtx=this.document.createElement("canvas").getContext("2d"),this.ctx.textBaseline="bottom",this.variables={},s("Initialized CanvasRenderer with size",t,"x",e)}function i(t){return t.length>0}var o=t("../renderer"),a=t("../lineargradientcontainer"),s=t("../log");r.prototype=Object.create(o.prototype),r.prototype.setFillStyle=function(t){return this.ctx.fillStyle="object"==typeof t&&t.isColor?t.toString():t,this.ctx},r.prototype.rectangle=function(t,e,n,r,i){this.setFillStyle(i).fillRect(t,e,n,r)},r.prototype.circle=function(t,e,n,r){this.setFillStyle(r),this.ctx.beginPath(),this.ctx.arc(t+n/2,e+n/2,n/2,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill()},r.prototype.circleStroke=function(t,e,n,r,i,o){this.circle(t,e,n,r),this.ctx.strokeStyle=o.toString(),this.ctx.stroke()},r.prototype.drawShape=function(t,e){this.shape(t),this.setFillStyle(e).fill()},r.prototype.taints=function(t){if(null===t.tainted){this.taintCtx.drawImage(t.image,0,0);try{this.taintCtx.getImageData(0,0,1,1),t.tainted=!1}catch(e){this.taintCtx=document.createElement("canvas").getContext("2d"),t.tainted=!0}}return t.tainted},r.prototype.drawImage=function(t,e,n,r,i,o,a,s,c){this.taints(t)&&!this.options.allowTaint||this.ctx.drawImage(t.image,e,n,r,i,o,a,s,c)},r.prototype.clip=function(t,e,n){this.ctx.save(),t.filter(i).forEach(function(t){this.shape(t).clip()},this),e.call(n),this.ctx.restore()},r.prototype.shape=function(t){return this.ctx.beginPath(),t.forEach(function(t,e){"rect"===t[0]?this.ctx.rect.apply(this.ctx,t.slice(1)):this.ctx[0===e?"moveTo":t[0]+"To"].apply(this.ctx,t.slice(1))},this),this.ctx.closePath(),this.ctx},r.prototype.font=function(t,e,n,r,i,o){this.setFillStyle(t).font=[e,n,r,i,o].join(" ").split(",")[0]},r.prototype.fontShadow=function(t,e,n,r){this.setVariable("shadowColor",t.toString()).setVariable("shadowOffsetY",e).setVariable("shadowOffsetX",n).setVariable("shadowBlur",r)},r.prototype.clearShadow=function(){this.setVariable("shadowColor","rgba(0,0,0,0)")},r.prototype.setOpacity=function(t){this.ctx.globalAlpha=t},r.prototype.setTransform=function(t){this.ctx.translate(t.origin[0],t.origin[1]),this.ctx.transform.apply(this.ctx,t.matrix),this.ctx.translate(-t.origin[0],-t.origin[1])},r.prototype.setVariable=function(t,e){return this.variables[t]!==e&&(this.variables[t]=this.ctx[t]=e),this},r.prototype.text=function(t,e,n){this.ctx.fillText(t,e,n)},r.prototype.backgroundRepeatShape=function(t,e,n,r,i,o,a,s,c){var l=[["line",Math.round(i),Math.round(o)],["line",Math.round(i+a),Math.round(o)],["line",Math.round(i+a),Math.round(s+o)],["line",Math.round(i),Math.round(s+o)]];this.clip([l],function(){this.renderBackgroundRepeat(t,e,n,r,c[3],c[0])},this)},r.prototype.renderBackgroundRepeat=function(t,e,n,r,i,o){var a=Math.round(r.left+e.left+i),s=Math.round(r.top+e.top+o);this.setFillStyle(this.ctx.createPattern(this.resizeImage(t,n),"repeat")),this.ctx.translate(a,s),this.ctx.fill(),this.ctx.translate(-a,-s)},r.prototype.renderBackgroundGradient=function(t,e){if(t instanceof a){var n=this.ctx.createLinearGradient(e.left+e.width*t.x0,e.top+e.height*t.y0,e.left+e.width*t.x1,e.top+e.height*t.y1);t.colorStops.forEach(function(t){n.addColorStop(t.stop,t.color.toString())}),this.rectangle(e.left,e.top,e.width,e.height,n)}},r.prototype.resizeImage=function(t,e){var n=t.image;if(n.width===e.width&&n.height===e.height)return n;var r,i=document.createElement("canvas");return i.width=e.width,i.height=e.height,r=i.getContext("2d"),r.drawImage(n,0,0,n.width,n.height,0,0,e.width,e.height),i},e.exports=r},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(t,e,n){function r(t,e,n,r){i.call(this,n,r),this.ownStacking=t,this.contexts=[],this.children=[],this.opacity=(this.parent?this.parent.stack.opacity:1)*e}var i=t("./nodecontainer");r.prototype=Object.create(i.prototype),r.prototype.getParentStack=function(t){var e=this.parent?this.parent.stack:null;return e?e.ownStacking?e:e.getParentStack(t):t.stack},e.exports=r},{"./nodecontainer":14}],22:[function(t,e,n){function r(t){this.rangeBounds=this.testRangeBounds(t),this.cors=this.testCORS(),this.svg=this.testSVG()}r.prototype.testRangeBounds=function(t){var e,n,r,i,o=!1;return t.createRange&&(e=t.createRange(),e.getBoundingClientRect&&(n=t.createElement("boundtest"),n.style.height="123px",n.style.display="block",t.body.appendChild(n),e.selectNode(n),r=e.getBoundingClientRect(),i=r.height,123===i&&(o=!0),t.body.removeChild(n))),o},r.prototype.testCORS=function(){return"undefined"!=typeof(new Image).crossOrigin},r.prototype.testSVG=function(){var t=new Image,e=document.createElement("canvas"),n=e.getContext("2d");t.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{n.drawImage(t,0,0),e.toDataURL()}catch(t){return!1}return!0},e.exports=r},{}],23:[function(t,e,n){function r(t){this.src=t,this.image=null;var e=this;this.promise=this.hasFabric().then(function(){return e.isInline(t)?Promise.resolve(e.inlineFormatting(t)):i(t)}).then(function(t){return new Promise(function(n){window.html2canvas.svg.fabric.loadSVGFromString(t,e.createCanvas.call(e,n))})})}var i=t("./xhr"),o=t("./utils").decode64;r.prototype.hasFabric=function(){return window.html2canvas.svg&&window.html2canvas.svg.fabric?Promise.resolve():Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))},r.prototype.inlineFormatting=function(t){return/^data:image\/svg\+xml;base64,/.test(t)?this.decode64(this.removeContentType(t)):this.removeContentType(t)},r.prototype.removeContentType=function(t){return t.replace(/^data:image\/svg\+xml(;base64)?,/,"")},r.prototype.isInline=function(t){return/^data:image\/svg\+xml/i.test(t)},r.prototype.createCanvas=function(t){var e=this;return function(n,r){var i=new window.html2canvas.svg.fabric.StaticCanvas("c");e.image=i.lowerCanvasEl,i.setWidth(r.width).setHeight(r.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(n,r)).renderAll(),t(i.lowerCanvasEl)}},r.prototype.decode64=function(t){return"function"==typeof window.atob?window.atob(t):o(t)},e.exports=r},{"./utils":26,"./xhr":28}],24:[function(t,e,n){function r(t,e){this.src=t,this.image=null;var n=this;this.promise=e?new Promise(function(e,r){n.image=new Image,n.image.onload=e,n.image.onerror=r,n.image.src="data:image/svg+xml,"+(new XMLSerializer).serializeToString(t),n.image.complete===!0&&e(n.image)}):this.hasFabric().then(function(){return new Promise(function(e){window.html2canvas.svg.fabric.parseSVGDocument(t,n.createCanvas.call(n,e))})})}var i=t("./svgcontainer");r.prototype=Object.create(i.prototype),e.exports=r},{"./svgcontainer":23}],25:[function(t,e,n){function r(t,e){o.call(this,t,e)}function i(t,e,n){if(t.length>0)return e+n.toUpperCase()}var o=t("./nodecontainer");r.prototype=Object.create(o.prototype),r.prototype.applyTextTransform=function(){this.node.data=this.transform(this.parent.css("textTransform"))},r.prototype.transform=function(t){var e=this.node.data;switch(t){case"lowercase":return e.toLowerCase();case"capitalize":return e.replace(/(^|\s|:|-|\(|\))([a-z])/g,i);case"uppercase":return e.toUpperCase();default:return e}},e.exports=r},{"./nodecontainer":14}],26:[function(t,e,n){n.smallImage=function(){return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},n.bind=function(t,e){return function(){return t.apply(e,arguments)}},/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
n.decode64=function(t){var e,n,r,i,o,a,s,c,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=t.length,h="";for(e=0;e<u;e+=4)n=l.indexOf(t[e]),r=l.indexOf(t[e+1]),i=l.indexOf(t[e+2]),o=l.indexOf(t[e+3]),a=n<<2|r>>4,s=(15&r)<<4|i>>2,c=(3&i)<<6|o,h+=64===i?String.fromCharCode(a):64===o||o===-1?String.fromCharCode(a,s):String.fromCharCode(a,s,c);return h},n.getBounds=function(t){if(t.getBoundingClientRect){var e=t.getBoundingClientRect(),n=null==t.offsetWidth?e.width:t.offsetWidth;return{top:e.top,bottom:e.bottom||e.top+e.height,right:e.left+n,left:e.left,width:n,height:null==t.offsetHeight?e.height:t.offsetHeight}}return{}},n.offsetBounds=function(t){var e=t.offsetParent?n.offsetBounds(t.offsetParent):{top:0,left:0};return{top:t.offsetTop+e.top,bottom:t.offsetTop+t.offsetHeight+e.top,right:t.offsetLeft+e.left+t.offsetWidth,left:t.offsetLeft+e.left,width:t.offsetWidth,height:t.offsetHeight}},n.parseBackgrounds=function(t){var e,n,r,i,o,a,s,c=" \r\n\t",l=[],u=0,h=0,f=function(){e&&('"'===n.substr(0,1)&&(n=n.substr(1,n.length-2)),n&&s.push(n),"-"===e.substr(0,1)&&(i=e.indexOf("-",1)+1)>0&&(r=e.substr(0,i),e=e.substr(i)),l.push({prefix:r,method:e.toLowerCase(),value:o,args:s,image:null})),s=[],e=r=n=o=""};return s=[],e=r=n=o="",t.split("").forEach(function(t){if(!(0===u&&c.indexOf(t)>-1)){switch(t){case'"':a?a===t&&(a=null):a=t;break;case"(":if(a)break;if(0===u)return u=1,void(o+=t);h++;break;case")":if(a)break;if(1===u){if(0===h)return u=0,o+=t,void f();h--}break;case",":if(a)break;if(0===u)return void f();if(1===u&&0===h&&!e.match(/^url$/i))return s.push(n),n="",void(o+=t)}o+=t,0===u?e+=t:n+=t}}),f(),l}},{}],27:[function(t,e,n){function r(t){i.apply(this,arguments),this.type="linear"===t.args[0]?i.TYPES.LINEAR:i.TYPES.RADIAL}var i=t("./gradientcontainer");r.prototype=Object.create(i.prototype),e.exports=r},{"./gradientcontainer":9}],28:[function(t,e,n){function r(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t),r.onload=function(){200===r.status?e(r.responseText):n(new Error(r.statusText))},r.onerror=function(){n(new Error("Network Error"))},r.send()})}e.exports=r},{}]},{},[4])(4)}),/*
# PNG.js
# Copyright (c) 2011 Devon Govett
# MIT LICENSE
# 
# 
*/
function(t){var e;e=function(){function e(t){var e,n,r,i,o,a,s,c,l,u,h,f,d,p,g;for(this.data=t,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.animation=null,this.text={},a=null;;){switch(e=this.readUInt32(),u=function(){var t,e;for(e=[],s=t=0;t<4;s=++t)e.push(String.fromCharCode(this.data[this.pos++]));return e}.call(this).join("")){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};break;case"PLTE":this.palette=this.read(e);break;case"fcTL":a&&this.animation.frames.push(a),this.pos+=4,a={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()},o=this.readUInt16(),i=this.readUInt16()||100,a.delay=1e3*o/i,a.disposeOp=this.data[this.pos++],a.blendOp=this.data[this.pos++],a.data=[];break;case"IDAT":case"fdAT":for("fdAT"===u&&(this.pos+=4,e-=4),t=(null!=a?a.data:void 0)||this.imgData,s=d=0;0<=e?d<e:d>e;s=0<=e?++d:--d)t.push(this.data[this.pos++]);break;case"tRNS":switch(this.transparency={},this.colorType){case 3:if(r=this.palette.length/3,this.transparency.indexed=this.read(e),this.transparency.indexed.length>r)throw new Error("More transparent colors than palette size");if(h=r-this.transparency.indexed.length,h>0)for(s=p=0;0<=h?p<h:p>h;s=0<=h?++p:--p)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(e)[0];break;case 2:this.transparency.rgb=this.read(e)}break;case"tEXt":f=this.read(e),c=f.indexOf(0),l=String.fromCharCode.apply(String,f.slice(0,c)),this.text[l]=String.fromCharCode.apply(String,f.slice(c+1));break;case"IEND":return a&&this.animation.frames.push(a),this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}.call(this),this.hasAlphaChannel=4===(g=this.colorType)||6===g,n=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*n,this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}.call(this),void(this.imgData=new Uint8Array(this.imgData));default:this.pos+=e}if(this.pos+=4,this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}var n,r,i,o,a,s,l,u;e.load=function(t,n,r){var i;return"function"==typeof n&&(r=n),i=new XMLHttpRequest,i.open("GET",t,!0),i.responseType="arraybuffer",i.onload=function(){var t,o;return t=new Uint8Array(i.response||i.mozResponseArrayBuffer),o=new e(t),"function"==typeof(null!=n?n.getContext:void 0)&&o.render(n),"function"==typeof r?r(o):void 0},i.send(null)},o=0,i=1,a=2,r=0,n=1,e.prototype.read=function(t){var e,n,r;for(r=[],e=n=0;0<=t?n<t:n>t;e=0<=t?++n:--n)r.push(this.data[this.pos++]);return r},e.prototype.readUInt32=function(){var t,e,n,r;return t=this.data[this.pos++]<<24,e=this.data[this.pos++]<<16,n=this.data[this.pos++]<<8,r=this.data[this.pos++],t|e|n|r},e.prototype.readUInt16=function(){var t,e;return t=this.data[this.pos++]<<8,e=this.data[this.pos++],t|e},e.prototype.decodePixels=function(t){var e,n,r,i,o,a,s,l,u,h,f,d,p,g,m,w,y,v,b,x,k,_,C;if(null==t&&(t=this.imgData),0===t.length)return new Uint8Array(0);for(t=new c(t),t=t.getBytes(),d=this.pixelBitlength/8,w=d*this.width,p=new Uint8Array(w*this.height),a=t.length,m=0,g=0,n=0;g<a;){switch(t[g++]){case 0:for(i=b=0;b<w;i=b+=1)p[n++]=t[g++];break;case 1:for(i=x=0;x<w;i=x+=1)e=t[g++],o=i<d?0:p[n-d],p[n++]=(e+o)%256;break;case 2:for(i=k=0;k<w;i=k+=1)e=t[g++],r=(i-i%d)/d,y=m&&p[(m-1)*w+r*d+i%d],p[n++]=(y+e)%256;break;case 3:for(i=_=0;_<w;i=_+=1)e=t[g++],r=(i-i%d)/d,o=i<d?0:p[n-d],y=m&&p[(m-1)*w+r*d+i%d],p[n++]=(e+Math.floor((o+y)/2))%256;break;case 4:for(i=C=0;C<w;i=C+=1)e=t[g++],r=(i-i%d)/d,o=i<d?0:p[n-d],0===m?y=v=0:(y=p[(m-1)*w+r*d+i%d],v=r&&p[(m-1)*w+(r-1)*d+i%d]),s=o+y-v,l=Math.abs(s-o),h=Math.abs(s-y),f=Math.abs(s-v),u=l<=h&&l<=f?o:h<=f?y:v,p[n++]=(e+u)%256;break;default:throw new Error("Invalid filter algorithm: "+t[g-1])}m++}return p},e.prototype.decodePalette=function(){var t,e,n,r,i,o,a,s,c,l;for(r=this.palette,a=this.transparency.indexed||[],o=new Uint8Array((a.length||0)+r.length),i=0,n=r.length,t=0,e=s=0,c=r.length;s<c;e=s+=3)o[i++]=r[e],o[i++]=r[e+1],o[i++]=r[e+2],o[i++]=null!=(l=a[t++])?l:255;return o},e.prototype.copyToImageData=function(t,e){var n,r,i,o,a,s,c,l,u,h,f;if(r=this.colors,u=null,n=this.hasAlphaChannel,this.palette.length&&(u=null!=(f=this._decodedPalette)?f:this._decodedPalette=this.decodePalette(),r=4,n=!0),i=t.data||t,l=i.length,a=u||e,o=s=0,1===r)for(;o<l;)c=u?4*e[o/4]:s,h=a[c++],i[o++]=h,i[o++]=h,i[o++]=h,i[o++]=n?a[c++]:255,s=c;else for(;o<l;)c=u?4*e[o/4]:s,i[o++]=a[c++],i[o++]=a[c++],i[o++]=a[c++],i[o++]=n?a[c++]:255,s=c},e.prototype.decode=function(){var t;return t=new Uint8Array(this.width*this.height*4),this.copyToImageData(t,this.decodePixels()),t};try{l=t.document.createElement("canvas"),u=l.getContext("2d")}catch(t){return-1}return s=function(t){var e;return u.width=t.width,u.height=t.height,u.clearRect(0,0,t.width,t.height),u.putImageData(t,0,0),e=new Image,e.src=l.toDataURL(),e},e.prototype.decodeFrames=function(t){var e,n,r,i,o,a,c,l;if(this.animation){for(c=this.animation.frames,l=[],n=o=0,a=c.length;o<a;n=++o)e=c[n],r=t.createImageData(e.width,e.height),i=this.decodePixels(new Uint8Array(e.data)),this.copyToImageData(r,i),e.imageData=r,l.push(e.image=s(r));return l}},e.prototype.renderFrame=function(t,e){var n,o,s;return o=this.animation.frames,n=o[e],s=o[e-1],0===e&&t.clearRect(0,0,this.width,this.height),(null!=s?s.disposeOp:void 0)===i?t.clearRect(s.xOffset,s.yOffset,s.width,s.height):(null!=s?s.disposeOp:void 0)===a&&t.putImageData(s.imageData,s.xOffset,s.yOffset),n.blendOp===r&&t.clearRect(n.xOffset,n.yOffset,n.width,n.height),t.drawImage(n.image,n.xOffset,n.yOffset)},e.prototype.animate=function(t){var e,n,r,i,o,a,s=this;return n=0,a=this.animation,i=a.numFrames,r=a.frames,o=a.numPlays,(e=function(){var a,c;if(a=n++%i,c=r[a],s.renderFrame(t,a),i>1&&n/i<o)return s.animation._timeout=setTimeout(e,c.delay)})()},e.prototype.stopAnimation=function(){var t;return clearTimeout(null!=(t=this.animation)?t._timeout:void 0)},e.prototype.render=function(t){var e,n;return t._png&&t._png.stopAnimation(),t._png=this,t.width=this.width,t.height=this.height,e=t.getContext("2d"),this.animation?(this.decodeFrames(e),this.animate(e)):(n=e.createImageData(this.width,this.height),this.copyToImageData(n,this.decodePixels()),e.putImageData(n,0,0))},e}(),t.PNG=e}("undefined"!=typeof window&&window||void 0);/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * 
 */
var s=function(){function t(){this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=null}return t.prototype={ensureBuffer:function(t){var e=this.buffer,n=e?e.byteLength:0;if(t<n)return e;for(var r=512;r<t;)r<<=1;for(var i=new Uint8Array(r),o=0;o<n;++o)i[o]=e[o];return this.buffer=i},getByte:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return this.buffer[this.pos++]},getBytes:function(t){var e=this.pos;if(t){this.ensureBuffer(e+t);for(var n=e+t;!this.eof&&this.bufferLength<n;)this.readBlock();var r=this.bufferLength;n>r&&(n=r)}else{for(;!this.eof;)this.readBlock();var n=this.bufferLength}return this.pos=n,this.buffer.subarray(e,n)},lookChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return String.fromCharCode(this.buffer[this.pos])},getChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return String.fromCharCode(this.buffer[this.pos++])},makeSubStream:function(t,e,n){for(var r=t+e;this.bufferLength<=r&&!this.eof;)this.readBlock();return new Stream(this.buffer,t,e,n)},skip:function(t){t||(t=1),this.pos+=t},reset:function(){this.pos=0}},t}(),c=function(){function t(t){throw new Error(t)}function e(e){var n=0,r=e[n++],i=e[n++];r!=-1&&i!=-1||t("Invalid header in flate stream"),8!=(15&r)&&t("Unknown compression method in flate stream"),((r<<8)+i)%31!=0&&t("Bad FCHECK in flate stream"),32&i&&t("FDICT bit set in flate stream"),this.bytes=e,this.bytesPos=n,this.codeSize=0,this.codeBuf=0,s.call(this)}if("undefined"!=typeof Uint32Array){var n=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),r=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),i=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),o=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],a=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];return e.prototype=Object.create(s.prototype),e.prototype.getBits=function(e){for(var n,r=this.codeSize,i=this.codeBuf,o=this.bytes,a=this.bytesPos;r<e;)"undefined"==typeof(n=o[a++])&&t("Bad encoding in flate stream"),i|=n<<r,r+=8;return n=i&(1<<e)-1,this.codeBuf=i>>e,this.codeSize=r-=e,this.bytesPos=a,n},e.prototype.getCode=function(e){for(var n=e[0],r=e[1],i=this.codeSize,o=this.codeBuf,a=this.bytes,s=this.bytesPos;i<r;){var c;"undefined"==typeof(c=a[s++])&&t("Bad encoding in flate stream"),o|=c<<i,i+=8}var l=n[o&(1<<r)-1],u=l>>16,h=65535&l;return(0==i||i<u||0==u)&&t("Bad encoding in flate stream"),this.codeBuf=o>>u,this.codeSize=i-u,this.bytesPos=s,h},e.prototype.generateHuffmanTable=function(t){for(var e=t.length,n=0,r=0;r<e;++r)t[r]>n&&(n=t[r]);for(var i=1<<n,o=new Uint32Array(i),a=1,s=0,c=2;a<=n;++a,s<<=1,c<<=1)for(var l=0;l<e;++l)if(t[l]==a){for(var u=0,h=s,r=0;r<a;++r)u=u<<1|1&h,h>>=1;for(var r=u;r<i;r+=c)o[r]=a<<16|l;++s}return[o,n]},e.prototype.readBlock=function(){function e(t,e,n,r,i){for(var o=t.getBits(n)+r;o-- >0;)e[_++]=i}var s=this.getBits(3);if(1&s&&(this.eof=!0),s>>=1,0==s){var c,l=this.bytes,u=this.bytesPos;"undefined"==typeof(c=l[u++])&&t("Bad block header in flate stream");var h=c;"undefined"==typeof(c=l[u++])&&t("Bad block header in flate stream"),h|=c<<8,"undefined"==typeof(c=l[u++])&&t("Bad block header in flate stream");var f=c;"undefined"==typeof(c=l[u++])&&t("Bad block header in flate stream"),f|=c<<8,f!=(65535&~h)&&t("Bad uncompressed block length in flate stream"),this.codeBuf=0,this.codeSize=0;var d=this.bufferLength,p=this.ensureBuffer(d+h),g=d+h;this.bufferLength=g;for(var m=d;m<g;++m){if("undefined"==typeof(c=l[u++])){this.eof=!0;break}p[m]=c}return void(this.bytesPos=u)}var w,y;if(1==s)w=o,y=a;else if(2==s){for(var v=this.getBits(5)+257,b=this.getBits(5)+1,x=this.getBits(4)+4,k=Array(n.length),_=0;_<x;)k[n[_++]]=this.getBits(3);for(var C=this.generateHuffmanTable(k),A=0,_=0,S=v+b,q=new Array(S);_<S;){var T=this.getCode(C);16==T?e(this,q,2,3,A):17==T?e(this,q,3,3,A=0):18==T?e(this,q,7,11,A=0):q[_++]=A=T}w=this.generateHuffmanTable(q.slice(0,v)),y=this.generateHuffmanTable(q.slice(v,S))}else t("Unknown block type in flate stream");for(var p=this.buffer,P=p?p.length:0,I=this.bufferLength;;){var E=this.getCode(w);if(E<256)I+1>=P&&(p=this.ensureBuffer(I+1),P=p.length),p[I++]=E;else{if(256==E)return void(this.bufferLength=I);E-=257,E=r[E];var O=E>>16;O>0&&(O=this.getBits(O));var A=(65535&E)+O;E=this.getCode(y),E=i[E],O=E>>16,O>0&&(O=this.getBits(O));var F=(65535&E)+O;I+A>=P&&(p=this.ensureBuffer(I+A),P=p.length);for(var R=0;R<A;++R,++I)p[I]=p[I-F]}}},e}}();return function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";"undefined"==typeof t.btoa&&(t.btoa=function(t){var n,r,i,o,a,s,c,l,u=0,h=0,f="",d=[];if(!t)return t;do n=t.charCodeAt(u++),r=t.charCodeAt(u++),i=t.charCodeAt(u++),l=n<<16|r<<8|i,o=l>>18&63,a=l>>12&63,s=l>>6&63,c=63&l,d[h++]=e.charAt(o)+e.charAt(a)+e.charAt(s)+e.charAt(c);while(u<t.length);f=d.join("");var p=t.length%3;return(p?f.slice(0,p-3):f)+"===".slice(p||3)}),"undefined"==typeof t.atob&&(t.atob=function(t){var n,r,i,o,a,s,c,l,u=0,h=0,f="",d=[];if(!t)return t;t+="";do o=e.indexOf(t.charAt(u++)),a=e.indexOf(t.charAt(u++)),s=e.indexOf(t.charAt(u++)),c=e.indexOf(t.charAt(u++)),l=o<<18|a<<12|s<<6|c,n=l>>16&255,r=l>>8&255,i=255&l,64==s?d[h++]=String.fromCharCode(n):64==c?d[h++]=String.fromCharCode(n,r):d[h++]=String.fromCharCode(n,r,i);while(u<t.length);return f=d.join("")}),Array.prototype.map||(Array.prototype.map=function(t){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;for(var e=Object(this),n=e.length>>>0,r=new Array(n),i=arguments.length>1?arguments[1]:void 0,o=0;o<n;o++)o in e&&(r[o]=t.call(i,e[o],o,e));return r}),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;for(var n=Object(this),r=n.length>>>0,i=0;i<r;i++)i in n&&t.call(e,n[i],i,n)}),Object.keys||(Object.keys=function(){var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if("object"!=typeof i&&("function"!=typeof i||null===i))throw new TypeError;var o,a,s=[];for(o in i)t.call(i,o)&&s.push(o);if(e)for(a=0;a<r;a++)t.call(i,n[a])&&s.push(n[a]);return s}}()),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.trimLeft||(String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}),String.prototype.trimRight||(String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")})}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||void 0),e});
/**
 * jsPDF AutoTable plugin v2.0.14
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 *
 * @preserve
 */
"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}(function(API){"use strict";var FONT_ROW_RATIO=1.15;var doc,cursor,settings,pageCount,table;var defaultStyles={cellPadding:5,fontSize:10,font:"helvetica",lineColor:200,lineWidth:.1,fontStyle:"normal",overflow:"ellipsize",fillColor:255,textColor:20,halign:"left",valign:"top",fillStyle:"F",rowHeight:20,columnWidth:"auto"};var themes={striped:{table:{fillColor:255,textColor:80,fontStyle:"normal",fillStyle:"F"},header:{textColor:255,fillColor:[41,128,185],rowHeight:23,fontStyle:"bold"},body:{},alternateRow:{fillColor:245}},grid:{table:{fillColor:255,textColor:80,fontStyle:"normal",lineWidth:.1,fillStyle:"DF"},header:{textColor:255,fillColor:[26,188,156],rowHeight:23,fillStyle:"F",fontStyle:"bold"},body:{},alternateRow:{}},plain:{header:{fontStyle:"bold"}}};var defaultOptions=function defaultOptions(){return{theme:"striped",styles:{},headerStyles:{},bodyStyles:{},alternateRowStyles:{},columnStyles:{},startY:false,margin:40,pageBreak:"auto",tableWidth:"auto",createdHeaderCell:function createdHeaderCell(cell,data){},createdCell:function createdCell(cell,data){},drawHeaderRow:function drawHeaderRow(row,data){},drawRow:function drawRow(row,data){},drawHeaderCell:function drawHeaderCell(cell,data){},drawCell:function drawCell(cell,data){},beforePageContent:function beforePageContent(data){},afterPageContent:function afterPageContent(data){}}};API.autoTable=function(headers,data,options){doc=this;settings=initOptions(options||{});pageCount=1;cursor={y:settings.startY===false?settings.margin.top:settings.startY};var userStyles={textColor:30,fontSize:doc.internal.getFontSize(),fontStyle:doc.internal.getFont().fontStyle};createModels(headers,data);calculateWidths();var firstRowHeight=table.rows[0]&&settings.pageBreak==="auto"?table.rows[0].height:0;var minTableBottomPos=settings.startY+settings.margin.bottom+table.headerRow.height+firstRowHeight;if(settings.pageBreak==="avoid"){minTableBottomPos+=table.height}if(settings.pageBreak==="always"&&settings.startY!==false||settings.startY!==false&&minTableBottomPos>doc.internal.pageSize.height){doc.addPage();cursor.y=settings.margin.top}applyStyles(userStyles);settings.beforePageContent(hooksData());if(settings.drawHeaderRow(table.headerRow,hooksData({row:table.headerRow}))!==false){printRow(table.headerRow,settings.drawHeaderCell)}applyStyles(userStyles);printRows();settings.afterPageContent(hooksData());applyStyles(userStyles);return this};API.autoTableEndPosY=function(){if(typeof cursor==="undefined"||typeof cursor.y==="undefined"){return 0}return cursor.y};API.autoTableHtmlToJson=function(table){var data=[],headers=[],header=table.rows[0],tableRow,rowData,i,j;for(i=0;i<header.cells.length;i++){headers.push(typeof header.cells[i]!=="undefined"?header.cells[i].textContent:"")}for(i=1;i<table.rows.length;i++){tableRow=table.rows[i];rowData=[];for(j=0;j<header.cells.length;j++){rowData.push(typeof tableRow.cells[j]!=="undefined"?tableRow.cells[j].textContent:"")}data.push(rowData)}return{columns:headers,data:data,rows:data}};API.autoTableText=function(text,x,y,styles){if(typeof x!=="number"||typeof y!=="number"){console.error("The x and y parameters are required. Missing for the text: ",text)}var fontSize=doc.internal.getFontSize()/doc.internal.scaleFactor;var lineHeightProportion=FONT_ROW_RATIO;var splitRegex=/\r\n|\r|\n/g;var splittedText=null;var lineCount=1;if(styles.valign==="middle"||styles.valign==="bottom"||styles.halign==="center"||styles.halign==="right"){splittedText=typeof text==="string"?text.split(splitRegex):text;lineCount=splittedText.length||1}y+=fontSize*(2-lineHeightProportion);if(styles.valign==="middle")y-=lineCount/2*fontSize;else if(styles.valign==="bottom")y-=lineCount*fontSize;if(styles.halign==="center"||styles.halign==="right"){var alignSize=fontSize;if(styles.halign==="center")alignSize*=.5;if(lineCount>=1){for(var iLine=0;iLine<splittedText.length;iLine++){doc.text(splittedText[iLine],x-doc.getStringUnitWidth(splittedText[iLine])*alignSize,y);y+=fontSize}return doc}x-=doc.getStringUnitWidth(text)*alignSize}doc.text(text,x,y);return doc};function initOptions(userOptions){var settings=extend(defaultOptions(),userOptions);if(typeof settings.extendWidth!=="undefined"){settings.tableWidth=settings.extendWidth?"auto":"wrap";console.error("Use of deprecated option: extendWidth, use tableWidth instead.")}if(typeof settings.margins!=="undefined"){if(typeof settings.margin==="undefined")settings.margin=settings.margins;console.error("Use of deprecated option: margins, use margin instead.")}[["padding","cellPadding"],["lineHeight","rowHeight"],"fontSize","overflow"].forEach(function(o){var deprecatedOption=typeof o==="string"?o:o[0];var style=typeof o==="string"?o:o[1];if(typeof settings[deprecatedOption]!=="undefined"){if(typeof settings.styles[style]==="undefined"){settings.styles[style]=settings[deprecatedOption]}console.error("Use of deprecated option: "+deprecatedOption+", use the style "+style+" instead.")}});var marginSetting=settings.margin;settings.margin={};if(typeof marginSetting.horizontal==="number"){marginSetting.right=marginSetting.horizontal;marginSetting.left=marginSetting.horizontal}if(typeof marginSetting.vertical==="number"){marginSetting.top=marginSetting.vertical;marginSetting.bottom=marginSetting.vertical}["top","right","bottom","left"].forEach(function(side,i){if(typeof marginSetting==="number"){settings.margin[side]=marginSetting}else{var key=Array.isArray(marginSetting)?i:side;settings.margin[side]=typeof marginSetting[key]==="number"?marginSetting[key]:40}});return settings}function createModels(inputHeaders,inputData){table=new Table;table.x=settings.margin.left;var splitRegex=/\r\n|\r|\n/g;var headerRow=new Row(inputHeaders);headerRow.index=-1;var themeStyles=extend(defaultStyles,themes[settings.theme].table,themes[settings.theme].header);headerRow.styles=extend(themeStyles,settings.styles,settings.headerStyles);inputHeaders.forEach(function(rawColumn,dataKey){if(typeof rawColumn==="object"){dataKey=typeof rawColumn.dataKey!=="undefined"?rawColumn.dataKey:rawColumn.key}if(typeof rawColumn.width!=="undefined"){console.error("Use of deprecated option: column.width, use column.styles.columnWidth instead.")}var col=new Column(dataKey);col.styles=settings.columnStyles[col.dataKey]||{};table.columns.push(col);var cell=new Cell;cell.raw=typeof rawColumn==="object"?rawColumn.title:rawColumn;cell.styles=headerRow.styles;cell.text=""+cell.raw;cell.contentWidth=cell.styles.cellPadding*2+getStringWidth(cell.text,cell.styles);cell.text=cell.text.split(splitRegex);headerRow.cells[dataKey]=cell;settings.createdHeaderCell(cell,{column:col,row:headerRow,settings:settings})});table.headerRow=headerRow;inputData.forEach(function(rawRow,i){var row=new Row(rawRow);var isAlternate=i%2===0;var themeStyles=extend(defaultStyles,themes[settings.theme].table,isAlternate?themes[settings.theme].alternateRow:{});var userStyles=extend(settings.styles,settings.bodyStyles,isAlternate?settings.alternateRowStyles:{});row.styles=extend(themeStyles,userStyles);row.index=i;table.columns.forEach(function(column){var cell=new Cell;cell.raw=rawRow[column.dataKey];cell.styles=extend(row.styles,column.styles);cell.text=typeof cell.raw!=="undefined"?""+cell.raw:"";row.cells[column.dataKey]=cell;settings.createdCell(cell,hooksData({column:column,row:row}));cell.contentWidth=cell.styles.cellPadding*2+getStringWidth(cell.text,cell.styles);cell.text=cell.text.split(splitRegex)});table.rows.push(row)})}function calculateWidths(){var tableContentWidth=0;table.columns.forEach(function(column){column.contentWidth=table.headerRow.cells[column.dataKey].contentWidth;table.rows.forEach(function(row){var cellWidth=row.cells[column.dataKey].contentWidth;if(cellWidth>column.contentWidth){column.contentWidth=cellWidth}});column.width=column.contentWidth;tableContentWidth+=column.contentWidth});table.contentWidth=tableContentWidth;var maxTableWidth=doc.internal.pageSize.width-settings.margin.left-settings.margin.right;var preferredTableWidth=maxTableWidth;if(typeof settings.tableWidth==="number"){preferredTableWidth=settings.tableWidth}else if(settings.tableWidth==="wrap"){preferredTableWidth=table.contentWidth}table.width=preferredTableWidth<maxTableWidth?preferredTableWidth:maxTableWidth;var dynamicColumns=[];var dynamicColumnsContentWidth=0;var fairWidth=table.width/table.columns.length;var staticWidth=0;table.columns.forEach(function(column){var colStyles=extend(defaultStyles,themes[settings.theme].table,settings.styles,column.styles);if(colStyles.columnWidth==="wrap"){column.width=column.contentWidth}else if(typeof colStyles.columnWidth==="number"){column.width=colStyles.columnWidth}else if(colStyles.columnWidth==="auto"||true){if(column.contentWidth<=fairWidth&&table.contentWidth>table.width){column.width=column.contentWidth}else{dynamicColumns.push(column);dynamicColumnsContentWidth+=column.contentWidth;column.width=0}}staticWidth+=column.width});distributeWidth(dynamicColumns,staticWidth,dynamicColumnsContentWidth,fairWidth);table.height=0;var all=table.rows.concat(table.headerRow);all.forEach(function(row,i){var lineBreakCount=0;var cursorX=table.x;table.columns.forEach(function(col){var cell=row.cells[col.dataKey];col.x=cursorX;applyStyles(cell.styles);var textSpace=col.width-cell.styles.cellPadding*2;if(cell.styles.overflow==="linebreak"){cell.text=doc.splitTextToSize(cell.text,textSpace+1,{fontSize:cell.styles.fontSize})}else if(cell.styles.overflow==="ellipsize"){cell.text=ellipsize(cell.text,textSpace,cell.styles)}else if(cell.styles.overflow==="visible"){}else if(cell.styles.overflow==="hidden"){cell.text=ellipsize(cell.text,textSpace,cell.styles,"")}else if(typeof cell.styles.overflow==="function"){cell.text=cell.styles.overflow(cell.text,textSpace)}else{console.error("Unrecognized overflow type: "+cell.styles.overflow)}var count=Array.isArray(cell.text)?cell.text.length-1:0;if(count>lineBreakCount){lineBreakCount=count}cursorX+=col.width});row.heightStyle=row.styles.rowHeight;row.height=row.heightStyle+lineBreakCount*row.styles.fontSize*FONT_ROW_RATIO;table.height+=row.height})}function distributeWidth(dynamicColumns,staticWidth,dynamicColumnsContentWidth,fairWidth){var extraWidth=table.width-staticWidth-dynamicColumnsContentWidth;for(var i=0;i<dynamicColumns.length;i++){var col=dynamicColumns[i];var ratio=col.contentWidth/dynamicColumnsContentWidth;var isNoneDynamic=col.contentWidth+extraWidth*ratio<fairWidth;if(extraWidth<0&&isNoneDynamic){dynamicColumns.splice(i,1);dynamicColumnsContentWidth-=col.contentWidth;col.width=fairWidth;staticWidth+=col.width;distributeWidth(dynamicColumns,staticWidth,dynamicColumnsContentWidth,fairWidth);break}else{col.width=col.contentWidth+extraWidth*ratio}}}function printRows(){table.rows.forEach(function(row,i){if(isNewPage(row.height)){var samePageThreshold=3;addPage()}row.y=cursor.y;if(settings.drawRow(row,hooksData({row:row}))!==false){printRow(row,settings.drawCell)}})}function addPage(){settings.afterPageContent(hooksData());doc.addPage();pageCount++;cursor={x:settings.margin.left,y:settings.margin.top};settings.beforePageContent(hooksData());if(settings.drawHeaderRow(table.headerRow,hooksData({row:table.headerRow}))!==false){printRow(table.headerRow,settings.drawHeaderCell)}}function isNewPage(rowHeight){var afterRowPos=cursor.y+rowHeight+settings.margin.bottom;return afterRowPos>=doc.internal.pageSize.height}function printRow(row,hookHandler){for(var i=0;i<table.columns.length;i++){var column=table.columns[i];var cell=row.cells[column.dataKey];if(!cell){continue}applyStyles(cell.styles);cell.x=column.x;cell.y=cursor.y;cell.height=row.height;cell.width=column.width;if(cell.styles.valign==="top"){cell.textPos.y=cursor.y+cell.styles.cellPadding}else if(cell.styles.valign==="bottom"){cell.textPos.y=cursor.y+row.height-cell.styles.cellPadding}else{cell.textPos.y=cursor.y+row.height/2}if(cell.styles.halign==="right"){cell.textPos.x=cell.x+cell.width-cell.styles.cellPadding}else if(cell.styles.halign==="center"){cell.textPos.x=cell.x+cell.width/2}else{cell.textPos.x=cell.x+cell.styles.cellPadding}var data=hooksData({column:column,row:row});if(hookHandler(cell,data)!==false){doc.rect(cell.x,cell.y,cell.width,cell.height,cell.styles.fillStyle);doc.autoTableText(cell.text,cell.textPos.x,cell.textPos.y,{halign:cell.styles.halign,valign:cell.styles.valign})}}cursor.y+=row.height}function applyStyles(styles){var arr=[{func:doc.setFillColor,value:styles.fillColor},{func:doc.setTextColor,value:styles.textColor},{func:doc.setFontStyle,value:styles.fontStyle},{func:doc.setDrawColor,value:styles.lineColor},{func:doc.setLineWidth,value:styles.lineWidth},{func:doc.setFont,value:styles.font},{func:doc.setFontSize,value:styles.fontSize}];arr.forEach(function(obj){if(typeof obj.value!=="undefined"){if(obj.value.constructor===Array){obj.func.apply(this,obj.value)}else{obj.func(obj.value)}}})}function hooksData(additionalData){additionalData=additionalData||{};var data={pageCount:pageCount,settings:settings,table:table,cursor:cursor};for(var prop in additionalData){if(additionalData.hasOwnProperty(prop)){data[prop]=additionalData[prop]}}return data}function ellipsize(text,width,styles,ellipsizeStr){ellipsizeStr=typeof ellipsizeStr!=="undefined"?ellipsizeStr:"...";if(Array.isArray(text)){text.forEach(function(str,i){text[i]=ellipsize(str,width,styles,ellipsizeStr)});return text}if(width>=getStringWidth(text,styles)){return text}while(width<getStringWidth(text+ellipsizeStr,styles)){if(text.length<2){break}text=text.substring(0,text.length-1)}return text.trim()+ellipsizeStr}function getStringWidth(text,styles){applyStyles(styles);var w=doc.getStringUnitWidth(text);return w*styles.fontSize}function extend(defaults){var extended={};var prop;for(prop in defaults){if(defaults.hasOwnProperty(prop)){extended[prop]=defaults[prop]}}for(var i=1;i<arguments.length;i++){var options=arguments[i];for(prop in options){if(options.hasOwnProperty(prop)){if(typeof options[prop]==="object"&&!Array.isArray(options[prop])){extended[prop]=options[prop]}else{extended[prop]=options[prop]}}}}return extended}})(jsPDF.API);var Table=function Table(){_classCallCheck(this,Table);this.height=0;this.width=0;this.x=0;this.y=0;this.contentWidth=0;this.rows=[];this.columns=[];this.headerRow=null;this.settings={}};var Row=function Row(raw){_classCallCheck(this,Row);this.raw=raw||{};this.index=0;this.styles={};this.cells={};this.height=0;this.y=0};var Cell=function Cell(raw){_classCallCheck(this,Cell);this.raw=raw;this.styles={};this.text="";this.contentWidth=0;this.textPos={};this.height=0;this.width=0;this.x=0;this.y=0};var Column=function Column(dataKey){_classCallCheck(this,Column);this.dataKey=dataKey;this.options={};this.styles={};this.contentWidth=0;this.width=0;this.x=0};
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = global || self, factory(global.jQuery));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.0',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol() == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var v8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return v8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	/**
	 * @author vincent loh <vincent.ml@gmail.com>
	 * @update J Manuel Corona <jmcg92@gmail.com>
	 * @update zhixin wen <wenzhixin2010@gmail.com>
	 */

	var Utils = $.fn.bootstrapTable.utils;
	$.extend($.fn.bootstrapTable.defaults, {
	  stickyHeader: false,
	  stickyHeaderOffsetY: 0,
	  stickyHeaderOffsetLeft: 0,
	  stickyHeaderOffsetRight: 0
	});

	$.BootstrapTable =
	/*#__PURE__*/
	function (_$$BootstrapTable) {
	  _inherits(_class, _$$BootstrapTable);

	  function _class() {
	    _classCallCheck(this, _class);

	    return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
	  }

	  _createClass(_class, [{
	    key: "initHeader",
	    value: function initHeader() {
	      var _get2,
	          _this = this;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      (_get2 = _get(_getPrototypeOf(_class.prototype), "initHeader", this)).call.apply(_get2, [this].concat(args));

	      if (!this.options.stickyHeader) {
	        return;
	      }

	      this.$el.before('<div class="sticky-header-container"></div>');
	      this.$el.before('<div class="sticky_anchor_begin"></div>');
	      this.$el.after('<div class="sticky_anchor_end"></div>');
	      this.$header.addClass('sticky-header'); // clone header just once, to be used as sticky header
	      // deep clone header, using source header affects tbody>td width

	      this.$stickyContainer = this.$tableBody.find('.sticky-header-container');
	      this.$stickyBegin = this.$tableBody.find('.sticky_anchor_begin');
	      this.$stickyEnd = this.$tableBody.find('.sticky_anchor_end');
	      this.$stickyHeader = this.$header.clone(true, true); // render sticky on window scroll or resize

	      $(window).off('resize.sticky-header-table').on('resize.sticky-header-table', function () {
	        return _this.renderStickyHeader();
	      });
	      $(window).off('scroll.sticky-header-table').on('scroll.sticky-header-table', function () {
	        return _this.renderStickyHeader();
	      });
	      this.$tableBody.off('scroll').on('scroll', function () {
	        return _this.matchPositionX();
	      });
	    }
	  }, {
	    key: "onColumnSearch",
	    value: function onColumnSearch(_ref) {
	      var currentTarget = _ref.currentTarget,
	          keyCode = _ref.keyCode;

	      _get(_getPrototypeOf(_class.prototype), "onColumnSearch", this).call(this, {
	        currentTarget: currentTarget,
	        keyCode: keyCode
	      });

	      this.renderStickyHeader();
	    }
	  }, {
	    key: "resetView",
	    value: function resetView() {
	      var _get3,
	          _this2 = this;

	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      (_get3 = _get(_getPrototypeOf(_class.prototype), "resetView", this)).call.apply(_get3, [this].concat(args));

	      $('.bootstrap-table.fullscreen').off('scroll').on('scroll', function () {
	        return _this2.renderStickyHeader();
	      });
	    }
	  }, {
	    key: "renderStickyHeader",
	    value: function renderStickyHeader() {
	      var _this3 = this;

	      var that = this;
	      this.$stickyHeader = this.$header.clone(true, true);

	      if (this.options.filterControl) {
	        $(this.$stickyHeader).off('keyup change mouseup').on('keyup change mouse', function (e) {
	          var $target = $(e.target);
	          var value = $target.val();
	          var field = $target.parents('th').data('field');
	          var $coreTh = that.$header.find('th[data-field="' + field + '"]');

	          if ($target.is('input')) {
	            $coreTh.find('input').val(value);
	          } else if ($target.is('select')) {
	            var $select = $coreTh.find('select');
	            $select.find('option[selected]').removeAttr('selected');
	            $select.find('option[value="' + value + '"]').attr('selected', true);
	          }

	          that.triggerSearch();
	        });
	      }

	      var top = $(window).scrollTop(); // top anchor scroll position, minus header height

	      var start = this.$stickyBegin.offset().top - this.options.stickyHeaderOffsetY; // bottom anchor scroll position, minus header height, minus sticky height

	      var end = this.$stickyEnd.offset().top - this.options.stickyHeaderOffsetY - this.$header.height(); // show sticky when top anchor touches header, and when bottom anchor not exceeded

	      if (top > start && top <= end) {
	        // ensure clone and source column widths are the same
	        this.$stickyHeader.find('tr:eq(0)').find('th').each(function (index, el) {
	          $(el).css('min-width', _this3.$header.find('tr:eq(0)').find('th').eq(index).css('width'));
	        }); // match bootstrap table style

	        this.$stickyContainer.show().addClass('fix-sticky fixed-table-container'); // stick it in position

	        var stickyHeaderOffsetLeft = this.options.stickyHeaderOffsetLeft;
	        var stickyHeaderOffsetRight = this.options.stickyHeaderOffsetRight;

	        if (this.$el.closest('.bootstrap-table').hasClass('fullscreen')) {
	          stickyHeaderOffsetLeft = 0;
	          stickyHeaderOffsetRight = 0;
	        }

	        this.$stickyContainer.css('top', "".concat(this.options.stickyHeaderOffsetY));
	        this.$stickyContainer.css('left', "".concat(stickyHeaderOffsetLeft));
	        this.$stickyContainer.css('right', "".concat(stickyHeaderOffsetRight)); // create scrollable container for header

	        this.$stickyTable = $('<table/>');
	        this.$stickyTable.addClass(this.options.classes); // append cloned header to dom

	        this.$stickyContainer.html(this.$stickyTable.append(this.$stickyHeader)); // match clone and source header positions when left-right scroll

	        this.matchPositionX();
	      } else {
	        this.$stickyContainer.removeClass('fix-sticky').hide();
	      }
	    }
	  }, {
	    key: "matchPositionX",
	    value: function matchPositionX() {
	      this.$stickyContainer.scrollLeft(this.$tableBody.scrollLeft());
	    }
	  }]);

	  return _class;
	}($.BootstrapTable);

})));

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = global || self, factory(global.jQuery));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.0',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol() == 'symbol';

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	if (!useSymbolAsUid) {
	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var v8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return v8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
	  [].filter.call({ length: -1, 0: 1 }, function (it) { throw it; });
	});

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD$1 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$2 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$2(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$2(false)
	};

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.github.io/ecma262/#sec-object.entries
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var SPECIES$2 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$2] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0)) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, { REPLACE_KEEPS_$0: REPLACE_KEEPS_$0 });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	// `SameValue` abstract operation
	// https://tc39.github.io/ecma262/#sec-samevalue
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	// @@search logic
	fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible(this);
	      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
	      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative(nativeSearch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regexpExecAbstract(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$4 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$4(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$4(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$4(3)
	};

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var forcedStringTrimMethod = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim
	_export({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
	    return;
	  }

	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	/**
	 * @author: aperez <aperez@datadec.es>
	 * @version: v2.0.0
	 *
	 * @update Dennis Hernández <http://djhvscf.github.io/Blog>
	 * @update zhixin wen <wenzhixin2010@gmail.com>
	 */

	var Utils = $.fn.bootstrapTable.utils;
	var bootstrap = {
	  bootstrap3: {
	    icons: {
	      advancedSearchIcon: 'glyphicon-chevron-down'
	    },
	    html: {
	      modal: "\n        <div id=\"avdSearchModal_%s\"  class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n          <div class=\"modal-dialog modal-xs\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h4 class=\"modal-title\">%s</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body modal-body-custom\">\n                <div class=\"container-fluid\" id=\"avdSearchModalContent_%s\"\n                  style=\"padding-right: 0px; padding-left: 0px;\" >\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" id=\"btnCloseAvd_%s\" class=\"btn btn-%s\">%s</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      "
	    }
	  },
	  bootstrap4: {
	    icons: {
	      advancedSearchIcon: 'fa-chevron-down'
	    },
	    html: {
	      modal: "\n        <div id=\"avdSearchModal_%s\"  class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n          <div class=\"modal-dialog modal-xs\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h4 class=\"modal-title\">%s</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body modal-body-custom\">\n                <div class=\"container-fluid\" id=\"avdSearchModalContent_%s\"\n                  style=\"padding-right: 0px; padding-left: 0px;\" >\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" id=\"btnCloseAvd_%s\" class=\"btn btn-%s\">%s</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      "
	    }
	  },
	  bulma: {
	    icons: {
	      advancedSearchIcon: 'fa-chevron-down'
	    },
	    html: {
	      modal: "\n        <div class=\"modal\" id=\"avdSearchModal_%s\">\n          <div class=\"modal-background\"></div>\n          <div class=\"modal-card\">\n            <header class=\"modal-card-head\">\n              <p class=\"modal-card-title\">%s</p>\n              <button class=\"delete\" aria-label=\"close\"></button>\n            </header>\n            <section class=\"modal-card-body\" id=\"avdSearchModalContent_%s\"></section>\n            <footer class=\"modal-card-foot\">\n              <button class=\"button\" id=\"btnCloseAvd_%s\" data-close=\"btn btn-%s\">%s</button>\n            </footer>\n          </div>\n        </div>\n      "
	    }
	  },
	  foundation: {
	    icons: {
	      advancedSearchIcon: 'fa-chevron-down'
	    },
	    html: {
	      modal: "\n        <div class=\"reveal\" id=\"avdSearchModal_%s\" data-reveal>\n          <h1>%s</h1>\n          <div id=\"avdSearchModalContent_%s\">\n          \n          </div>\n          <button class=\"close-button\" data-close aria-label=\"Close modal\" type=\"button\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          \n          <button id=\"btnCloseAvd_%s\" class=\"%s\" type=\"button\">%s</button>\n        </div>\n      "
	    }
	  },
	  materialize: {
	    icons: {
	      advancedSearchIcon: 'expand_more'
	    },
	    html: {
	      modal: "\n        <div id=\"avdSearchModal_%s\" class=\"modal\">\n          <div class=\"modal-content\">\n            <h4>%s</h4>\n            <div id=\"avdSearchModalContent_%s\">\n            \n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a href=\"javascript:void(0)\"\" id=\"btnCloseAvd_%s\" class=\"modal-close waves-effect waves-green btn-flat %s\">%s</a>\n          </div>\n        </div>\n      "
	    }
	  },
	  semantic: {
	    icons: {
	      advancedSearchIcon: 'fa-chevron-down'
	    },
	    html: {
	      modal: "\n        <div class=\"ui modal\" id=\"avdSearchModal_%s\">\n          <i class=\"close icon\"></i>\n          <div class=\"header\">\n            %s\n          </div>\n          <div class=\"image content ui form\" id=\"avdSearchModalContent_%s\"></div>\n          <div class=\"actions\">\n            <div id=\"btnCloseAvd_%s\" class=\"ui black deny button %s\">%s</div>\n          </div>\n        </div>\n      "
	    }
	  }
	}[$.fn.bootstrapTable.theme];
	$.extend($.fn.bootstrapTable.defaults, {
	  advancedSearch: false,
	  idForm: 'advancedSearch',
	  actionForm: '',
	  idTable: undefined,
	  onColumnAdvancedSearch: function onColumnAdvancedSearch(field, text) {
	    return false;
	  }
	});
	$.extend($.fn.bootstrapTable.defaults.icons, {
	  advancedSearchIcon: bootstrap.icons.advancedSearchIcon
	});
	$.extend($.fn.bootstrapTable.Constructor.EVENTS, {
	  'column-advanced-search.bs.table': 'onColumnAdvancedSearch'
	});
	$.extend($.fn.bootstrapTable.locales, {
	  formatAdvancedSearch: function formatAdvancedSearch() {
	    return 'Advanced search';
	  },
	  formatAdvancedCloseButton: function formatAdvancedCloseButton() {
	    return 'Close';
	  }
	});
	$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

	$.BootstrapTable =
	/*#__PURE__*/
	function (_$$BootstrapTable) {
	  _inherits(_class, _$$BootstrapTable);

	  function _class() {
	    _classCallCheck(this, _class);

	    return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
	  }

	  _createClass(_class, [{
	    key: "initToolbar",
	    value: function initToolbar() {
	      var _this = this;

	      var o = this.options;
	      this.showToolbar = this.showToolbar || o.search && o.advancedSearch && o.idTable;

	      _get(_getPrototypeOf(_class.prototype), "initToolbar", this).call(this);

	      if (!o.search || !o.advancedSearch || !o.idTable) {
	        return;
	      }

	      this.$toolbar.find('>.columns').append("\n      <button class=\"".concat(this.constants.buttonsClass, " \"\n        type=\"button\"\n        name=\"advancedSearch\"\n        aria-label=\"advanced search\"\n        title=\"").concat(o.formatAdvancedSearch(), "\">\n        ").concat(this.options.showButtonIcons ? Utils.sprintf(this.constants.html.icon, o.iconsPrefix, o.icons.advancedSearchIcon) : '', "\n        ").concat(this.options.showButtonText ? this.options.formatAdvancedSearch() : '', "\n      </button>\n    "));
	      this.$toolbar.find('button[name="advancedSearch"]').off('click').on('click', function () {
	        return _this.showAvdSearch();
	      });
	    }
	  }, {
	    key: "showAvdSearch",
	    value: function showAvdSearch() {
	      var _this2 = this;

	      var o = this.options;
	      var modalSelector = '#avdSearchModal_' + o.idTable;

	      if ($(modalSelector).length <= 0) {
	        $('body').append(Utils.sprintf(bootstrap.html.modal, o.idTable, o.formatAdvancedSearch(), o.idTable, o.idTable, o.buttonsClass, o.formatAdvancedCloseButton()));
	        var timeoutId = 0;
	        $("#avdSearchModalContent_".concat(o.idTable)).append(this.createFormAvd().join(''));
	        $("#".concat(o.idForm)).off('keyup blur', 'input').on('keyup blur', 'input', function (e) {
	          if (o.sidePagination === 'server') {
	            _this2.onColumnAdvancedSearch(e);
	          } else {
	            clearTimeout(timeoutId);
	            timeoutId = setTimeout(function () {
	              _this2.onColumnAdvancedSearch(e);
	            }, o.searchTimeOut);
	          }
	        });
	        $("#btnCloseAvd_".concat(o.idTable)).click(function () {
	          return _this2.hideModal();
	        });

	        if ($.fn.bootstrapTable.theme === 'bulma') {
	          $(modalSelector).find('.delete').off('click').on('click', function () {
	            return _this2.hideModal();
	          });
	        }

	        this.showModal();
	      } else {
	        this.showModal();
	      }
	    }
	  }, {
	    key: "showModal",
	    value: function showModal() {
	      var modalSelector = '#avdSearchModal_' + this.options.idTable;

	      if ($.inArray($.fn.bootstrapTable.theme, ['bootstrap3', 'bootstrap4']) !== -1) {
	        $(modalSelector).modal();
	      } else if ($.fn.bootstrapTable.theme === 'bulma') {
	        $(modalSelector).toggleClass('is-active');
	      } else if ($.fn.bootstrapTable.theme === 'foundation') {
	        if (!this.toolbarModal) {
	          // eslint-disable-next-line no-undef
	          this.toolbarModal = new Foundation.Reveal($(modalSelector));
	        }

	        this.toolbarModal.open();
	      } else if ($.fn.bootstrapTable.theme === 'materialize') {
	        $(modalSelector).modal();
	        $(modalSelector).modal('open');
	      } else if ($.fn.bootstrapTable.theme === 'semantic') {
	        $(modalSelector).modal('show');
	      }
	    }
	  }, {
	    key: "hideModal",
	    value: function hideModal() {
	      var $closeModalButton = $("#avdSearchModal_".concat(this.options.idTable));
	      var modalSelector = '#avdSearchModal_' + this.options.idTable;

	      if ($.inArray($.fn.bootstrapTable.theme, ['bootstrap3', 'bootstrap4']) !== -1) {
	        $closeModalButton.modal('hide');
	      } else if ($.fn.bootstrapTable.theme === 'bulma') {
	        $('html').toggleClass('is-clipped');
	        $(modalSelector).toggleClass('is-active');
	      } else if ($.fn.bootstrapTable.theme === 'foundation') {
	        this.toolbarModal.close();
	      } else if ($.fn.bootstrapTable.theme === 'materialize') {
	        $(modalSelector).modal('open');
	      } else if ($.fn.bootstrapTable.theme === 'semantic') {
	        $(modalSelector).modal('close');
	      }

	      if (this.options.sidePagination === 'server') {
	        this.options.pageNumber = 1;
	        this.updatePagination();
	        this.trigger('column-advanced-search', this.filterColumnsPartial);
	      }
	    }
	  }, {
	    key: "createFormAvd",
	    value: function createFormAvd() {
	      var o = this.options;
	      var html = ["<form class=\"form-horizontal\" id=\"".concat(o.idForm, "\" action=\"").concat(o.actionForm, "\">")];
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var column = _step.value;

	          if (!column.checkbox && column.visible && column.searchable) {
	            html.push("\n          <div class=\"form-group row\">\n            <label class=\"col-sm-4 control-label\">".concat(column.title, "</label>\n            <div class=\"col-sm-6\">\n              <input type=\"text\" class=\"form-control ").concat(this.constants.classes.input, "\" name=\"").concat(column.field, "\" placeholder=\"").concat(column.title, "\" id=\"").concat(column.field, "\">\n            </div>\n          </div>\n        "));
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return != null) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      html.push('</form>');
	      return html;
	    }
	  }, {
	    key: "initSearch",
	    value: function initSearch() {
	      var _this3 = this;

	      _get(_getPrototypeOf(_class.prototype), "initSearch", this).call(this);

	      if (!this.options.advancedSearch || this.options.sidePagination === 'server') {
	        return;
	      }

	      var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;
	      this.data = fp ? this.data.filter(function (item, i) {
	        for (var _i = 0, _Object$entries = Object.entries(fp); _i < _Object$entries.length; _i++) {
	          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
	              key = _Object$entries$_i[0],
	              v = _Object$entries$_i[1];

	          var fval = v.toLowerCase();
	          var value = item[key];

	          var index = _this3.header.fields.indexOf(key);

	          value = Utils.calculateObjectValue(_this3.header, _this3.header.formatters[index], [value, item, i], value);

	          if (!(index !== -1 && (typeof value === 'string' || typeof value === 'number') && "".concat(value).toLowerCase().includes(fval))) {
	            return false;
	          }
	        }

	        return true;
	      }) : this.data;
	    }
	  }, {
	    key: "onColumnAdvancedSearch",
	    value: function onColumnAdvancedSearch(e) {
	      var text = $.trim($(e.currentTarget).val());
	      var $field = $(e.currentTarget)[0].id;

	      if ($.isEmptyObject(this.filterColumnsPartial)) {
	        this.filterColumnsPartial = {};
	      }

	      if (text) {
	        this.filterColumnsPartial[$field] = text;
	      } else {
	        delete this.filterColumnsPartial[$field];
	      }

	      if (this.options.sidePagination !== 'server') {
	        this.options.pageNumber = 1;
	        this.onSearch(e);
	        this.updatePagination();
	        this.trigger('column-advanced-search', $field, text);
	      }
	    }
	  }]);

	  return _class;
	}($.BootstrapTable);

})));
