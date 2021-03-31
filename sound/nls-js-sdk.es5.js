/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */


var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _eventemitter3_3_1_2_eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

/**
 * tokenGetter 类型守卫
 * @param value 待判断的值
 */
function isTokenGetter(value) {
    return typeof value !== 'string';
}

/**
 * 自定义错误信息
 */
var NLSErrorType;
(function (NLSErrorType) {
    /** 未知错误 */
    NLSErrorType[NLSErrorType["UnknowError"] = -1] = "UnknowError";
    /** 录音错误 */
    NLSErrorType[NLSErrorType["RecordError"] = 10] = "RecordError";
    /** Android 低版本 */
    NLSErrorType[NLSErrorType["PoolAndroid"] = 11] = "PoolAndroid";
    /** 不支持 AudioContext */
    NLSErrorType[NLSErrorType["NoAudioContext"] = 12] = "NoAudioContext";
    /** 不支持 MediaDevices */
    NLSErrorType[NLSErrorType["NoMediaDevices"] = 13] = "NoMediaDevices";
    /** 不安全的环境 */
    NLSErrorType[NLSErrorType["NoSSL"] = 14] = "NoSSL";
    /** 网关消息格式错误 */
    NLSErrorType[NLSErrorType["DataFormatError"] = 15] = "DataFormatError";
    /** 未知指令 */
    NLSErrorType[NLSErrorType["UnkownCommand"] = 16] = "UnkownCommand";
    /** 任务中 */
    NLSErrorType[NLSErrorType["TaskBusy"] = 17] = "TaskBusy";
    /** 重连次数过多 */
    NLSErrorType[NLSErrorType["ReconnectOverTimes"] = 18] = "ReconnectOverTimes";
    /** 缺少必要参数 */
    NLSErrorType[NLSErrorType["LostParam"] = 19] = "LostParam";
    /** 不支持 WebAssembly */
    NLSErrorType[NLSErrorType["NoWebAssembly"] = 20] = "NoWebAssembly";
    /** WS 初始化失败，可能 ws 连接有问题 */
    NLSErrorType[NLSErrorType["WSInitError"] = 21] = "WSInitError";
})(NLSErrorType || (NLSErrorType = {}));
var NLSError = /** @class */ (function (_super) {
    __extends(NLSError, _super);
    /**
     * 错误类
     * @param err 错误信息
     * @param code 错误码
     */
    function NLSError(err, code) {
        var _this = _super.call(this, "[NLS Error] " + err) || this;
        /** 错误码 */
        _this.code = NLSErrorType.UnknowError;
        _this.code = code;
        return _this;
    }
    return NLSError;
}(Error));

/**
 * url 添加参数
 * @param url 待添加参数的 url
 * @param key 参数键
 * @param value 参数值
 * @return 添加参数后的 url
 */
function addParam(url, key, value) {
    var urlWithoutHash = url.split('#')[0];
    var val = encodeURIComponent(value);
    if (urlWithoutHash.indexOf('?') > -1) {
        var p = new RegExp("(\\?|&)" + key + "=[^&]*");
        if (p.test(urlWithoutHash)) {
            urlWithoutHash = urlWithoutHash.replace(p, "$1" + key + "=" + val);
        }
        else {
            urlWithoutHash = urlWithoutHash + "&" + key + "=" + val;
        }
    }
    else {
        urlWithoutHash = urlWithoutHash + "?" + key + "=" + encodeURIComponent(val);
    }
    return urlWithoutHash;
}

var WS = /** @class */ (function () {
    /**
     * 构造函数
     */
    function WS(_a) {
        var 
        /** 网关地址 */
        server = _a.server, 
        /** 鉴权用的 accessToken */
        token = _a.token;
        /** error handler */
        this.onErrorHandler = function () { };
        this.server = server;
        this.token = token;
        this.socket = new WebSocket(addParam(this.server, 'token', this.token));
        this.socket.binaryType = 'arraybuffer';
    }
    /**
     * 发送数据
     * @param message 数据内容
     */
    WS.prototype.send = function (message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    };
    /**
     * 关闭连接
     */
    WS.prototype.close = function () {
        if (this.socket &&
            (this.socket.readyState !== WebSocket.CLOSED || this.socket.readyState !== WebSocket.CLOSING)) {
            this.socket.close();
        }
    };
    Object.defineProperty(WS.prototype, "onOpen", {
        /**
         * 设置建立连接回调函数
         * @param handler 建立连接回调函数
         */
        set: function (handler) {
            if (this.socket) {
                this.socket.onopen = handler;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WS.prototype, "onMessage", {
        /**
         * 设置正常消息处理回调函数
         * @param handler 正常消息处理回调函数
         */
        set: function (handler) {
            var _this = this;
            if (this.socket) {
                this.socket.onmessage = function (message) {
                    if (message && message.data) {
                        if (message.data instanceof ArrayBuffer) {
                            // 语音流
                            handler(message.data, true);
                        }
                        else {
                            // 文本消息
                            var dataObj = void 0;
                            try {
                                dataObj = JSON.parse(message.data);
                            }
                            catch (e) {
                                _this.onErrorHandler(message, '消息格式错误', NLSErrorType.DataFormatError);
                            }
                            if (dataObj) {
                                handler(dataObj, false);
                            }
                        }
                    }
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WS.prototype, "onError", {
        /**
         * 设置错误消息处理回调函数
         * @param handler 错误消息处理回调函数
         */
        set: function (handler) {
            if (this.socket) {
                this.onErrorHandler = handler;
                this.socket.onerror = function (message) {
                    handler(message, '连接失败。请确保 accessToken 有效并且网络正常。');
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WS.prototype, "onClose", {
        /**
         * 设置链接关闭回调函数
         * @param handler 链接关闭回调函数
         */
        set: function (handler) {
            var _this = this;
            if (this.socket) {
                this.socket.onclose = function (message) {
                    _this.socket = null;
                    handler(message);
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    return WS;
}());

/**
 * uuid 生成函数
 * @private
 * @param len uuid 长度
 * @param radix uuid 字符表长度
 * @return uuid
 */
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [];
    var i;
    radix = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    }
    else {
        // rfc4122, version 4 form
        var r = void 0;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
/**
 * 随机生成 32 位 UUID
 * @return UUID
 */
function getUUID() {
    return uuid(32, 16).toLocaleLowerCase();
}

/**
 * 事件类型
 */
var NlsEventType = /** @class */ (function () {
    function NlsEventType() {
        /** 任务失败 */
        this.TaskFailed = 'TaskFailed';
    }
    return NlsEventType;
}());
/**
 * 公共事件
 */
var NlsEvent = /** @class */ (function () {
    function NlsEvent() {
        /** 命名空间 */
        this.namespace = 'Default';
        /** 消息类型 */
        this.type = new NlsEventType();
    }
    /**
     * 判断消息类型
     * @param type 公共事件类型
     * @param msg 待判断的事件消息
     * @return 判断结果
     */
    NlsEvent.prototype.isEvent = function (type, msg) {
        // if (msg.header.namespace !== this.namespace) {
        //   return false;
        // }
        if (msg.header.name === type) {
            return true;
        }
        return false;
    };
    return NlsEvent;
}());

/**
 * 消息基类
 */
var NlsMessage = /** @class */ (function () {
    /**
     * 构造函数
     * @param header 消息头
     * @param payload 消息内容
     * @param context 上下文
     */
    function NlsMessage(header, payload, context) {
        if (payload === void 0) { payload = null; }
        if (context === void 0) { context = null; }
        this.header = header;
        this.payload = payload;
        this.context = context;
    }
    /**
     * 消息序列化
     * @return 序列化后的字符串
     */
    NlsMessage.prototype.serialize = function () {
        var msg = {
            header: this.header,
        };
        if (this.payload) {
            msg.payload = this.payload;
        }
        if (this.context) {
            msg.context = this.context;
        }
        return JSON.stringify(msg);
    };
    return NlsMessage;
}());

/**
 * 事件消息
 */
var NlsEventMessage = /** @class */ (function (_super) {
    __extends(NlsEventMessage, _super);
    /**
     * 事件消息
     * @param header 事件消息头
     * @param payload 事件消息内容
     */
    function NlsEventMessage(header, payload) {
        if (payload === void 0) { payload = null; }
        return _super.call(this, header, payload) || this;
    }
    return NlsEventMessage;
}(NlsMessage));

/**
 * 日志模块
 */
var Log = /** @class */ (function () {
    function Log() {
        /** 是否为 debug 模式 */
        this.isDebug = false;
    }
    Log.prototype.getTag = function (tag) {
        if (tag === void 0) { tag = 'Debug'; }
        return "[NLS " + tag + " " + new Date().toISOString() + "]";
    };
    /**
     * 设置 debug 模式
     */
    Log.prototype.setDebug = function (isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        this.isDebug = isDebug;
        if (isDebug) {
            this.log('开启调试');
        }
    };
    /**
     * 打印日志
     * @param msg 日志信息
     */
    Log.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (this.isDebug) {
            console.log.apply(console, [this.getTag()].concat(msg));
        }
    };
    /**
     * 打印警告
     * @param warn
     */
    Log.prototype.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        console.warn.apply(console, [this.getTag('Warning')].concat(msg));
    };
    /**
     * 打印错误
     * @param error
     */
    Log.prototype.error = function () {
        var err = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            err[_i] = arguments[_i];
        }
        console.error.apply(console, [this.getTag('Error')].concat(err));
    };
    return Log;
}());
var Log$1 = new Log;

/**
 * 回调事件名
 */
var NlsHandlerEventType = /** @class */ (function () {
    function NlsHandlerEventType() {
        /** 错误信息 */
        this.error = 'error';
        /** 关闭消息 */
        this.closed = 'closed';
        /** 未知消息 */
        this.unknow = 'unknow';
        /** 重连 */
        this.reconnect = 'reconnect';
    }
    return NlsHandlerEventType;
}());

/**
 * 语音功能基础类
 */
var Speech = /** @class */ (function () {
    /**
     * 构造函数
     */
    function Speech(_a) {
        var 
        /** 应用 appkey */
        appkey = _a.appkey, 
        /** 网关地址 */
        server = _a.server, 
        /** 设备 id */
        deviceId = _a.deviceId, 
        /** token 配置 */
        accessToken = _a.accessToken, 
        /** @deprecated token 获取函数 */
        getAccessToken = _a.getAccessToken;
        var _this = this;
        /** WebSocket 处理模块 */
        this.ws = null;
        /**
         * 创建连接
         * @param token accessToken
         */
        this.createWS = function (token) {
            Log$1.log('取到 token，准备连接');
            try {
                _this.ws = new WS({
                    server: _this.server,
                    token: token,
                });
                _this.ws.onOpen = _this.onConnected.bind(_this);
                _this.ws.onMessage = _this.onData.bind(_this);
                _this.ws.onError = _this.onError.bind(_this);
                _this.ws.onClose = _this.onDisConnect.bind(_this);
            }
            catch (err) {
                // ws 初始化失败
                _this.onError(err, err.message, NLSErrorType.WSInitError);
            }
        };
        this.appkey = appkey;
        this.server = server;
        this.deviceId = deviceId;
        this.taskId = getUUID();
        this.accessToken = accessToken;
        this.getAccessToken = getAccessToken;
        this.event = new NlsEvent();
        this.handler = new NlsHandlerEventType();
        this.eventBus = new _eventemitter3_3_1_2_eventemitter3();
    }
    /**
     * 设置回调函数
     * @param event 事件名
     * @param handler 事件处理函数
     */
    Speech.prototype.on = function (event, handler) {
        Log$1.log('设置回调函数', event);
        this.eventBus.on(event, handler);
    };
    /**
     * 移除回调函数
     * @param event 事件名
     * @param handler 事件处理函数
     */
    Speech.prototype.off = function (event, handler) {
        Log$1.log('移除回调函数', event);
        this.eventBus.off(event, handler);
    };
    /**
     * 新建 session
     */
    Speech.prototype.startSession = function () {
        this.taskId = getUUID();
    };
    /**
     * 连接网关
     */
    Speech.prototype.connectService = function () {
        // 重建 session
        Log$1.log('重建 session');
        this.startSession();
        if (this.accessToken) {
            if (isTokenGetter(this.accessToken)) {
                this
                    .accessToken()
                    .then(this.createWS)
                    .catch(function (e) {
                    throw e;
                });
            }
            else {
                this.createWS(this.accessToken);
            }
        }
        else if (this.getAccessToken) {
            // 兼容老方法调用
            Log$1.warn('推荐使用 accessToken 替代 getAccessToken 配置 client');
            this.getAccessToken(this.createWS);
        }
        else {
            Log$1.warn('未配置 accessToken');
        }
    };
    /**
     * 断开网关
     */
    Speech.prototype.closeService = function () {
        Log$1.log('关闭连接');
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    };
    /**
     * 发送指令消息
     * @param message 指令消息
     */
    Speech.prototype.sendMessage = function (message) {
        if (this.ws) {
            this.ws.send(message.serialize());
        }
    };
    /**
     * 发送语音流
     * @param message 语音数据包
     */
    Speech.prototype.sendAudio = function (message) {
        if (this.ws) {
            this.ws.send(message.package());
        }
    };
    /**
     * 连接成功
     */
    Speech.prototype.onConnected = function () {
        Log$1.log('连接成功');
    };
    /**
     * 收到数据
     * @param message 消息内容
     * @param isArrayBuffer 是否为语音流消息
     */
    Speech.prototype.onData = function (message, isArrayBuffer) {
        if (isArrayBuffer === void 0) { isArrayBuffer = false; }
        if (!isArrayBuffer) {
            var msg = new NlsEventMessage(message.header, message.payload);
            // 连接失败
            if (this.event.isEvent(this.event.type.TaskFailed, msg)) {
                this.onError(message, msg.header.status_text, msg.header.status);
                return;
            }
            // 未知消息
            Log$1.warn('----- 👇 未识别消息 -----');
            Log$1.log(msg);
            this.eventBus.emit(this.handler.unknow, msg);
        }
    };
    /**
     * 收到错误
     * @param error 错误内容
     * @param detail 错误详情
     * @param code 错误码，-1 为未知错误码
     */
    Speech.prototype.onError = function (error, detail, code) {
        if (detail === void 0) { detail = '连接错误'; }
        if (code === void 0) { code = NLSErrorType.UnknowError; }
        Log$1.error('Error Event', error, code, detail);
        var err = new NLSError(detail, code);
        this.eventBus.emit(this.handler.error, err, err.message, err.code);
    };
    /**
     * 断开连接
     * @param ev 关闭消息
     */
    Speech.prototype.onDisConnect = function (ev) {
        Log$1.log('连接已断开', 'Close Event', ev);
        this.eventBus.emit(this.handler.closed, ev);
    };
    return Speech;
}());

/**
 * 指令消息
 */
var NlsCommandMessage = /** @class */ (function (_super) {
    __extends(NlsCommandMessage, _super);
    /**
     * 构造函数
     * @param header 指令消息头
     * @param payload 指令消息内容
     * @param context 上下文
     */
    function NlsCommandMessage(header, payload, context) {
        return _super.call(this, header, payload, context) || this;
    }
    return NlsCommandMessage;
}(NlsMessage));

/**
 * 指令类型
 */
var NlsCommandType = /** @class */ (function () {
    function NlsCommandType() {
    }
    return NlsCommandType;
}());
/**
 * 识别指令
 */
var NlsCommand = /** @class */ (function () {
    /**
     * 构造函数
     */
    function NlsCommand(_a) {
        var 
        /** 设备 id */
        deviceId = _a.deviceId, 
        /** 任务 id */
        taskId = _a.taskId, 
        /** 应用 appkey */
        appkey = _a.appkey;
        /** 命名空间 */
        this.namespace = 'Default';
        this.deviceId = deviceId;
        this.taskId = taskId;
        this.appkey = appkey;
    }
    return NlsCommand;
}());

// 下划线转换驼峰
// 驼峰转换下划线
var hump2Line = function (name) {
    return name.replace(/([A-Z])/g, function (match, p1) { return "_" + p1.toLowerCase(); });
};

// 识别支持参数
var recognitionParams = [{
        // 采样率
        key: 'sampleRate',
        type: 'number',
    }, {
        // 格式
        key: 'format',
        type: 'string',
    }, {
        // 热词
        key: 'vocabulary',
        type: 'object',
    }, {
        // 泛热词ID
        key: 'vocabularyId',
        type: 'string',
    }, {
        // 定制类热词
        key: 'classVocabularyId',
        type: 'object',
    }, {
        // 模型
        key: 'model',
        type: 'string',
    }, {
        // 定制模型
        key: 'customizationId',
        type: 'string',
    }, {
        // 声学模型
        key: 'alsAmId',
        type: 'string',
    }, {
        // 中间识别
        key: 'enableIntermediateResult',
        type: 'boolean',
    }, {
        // 添加标点
        key: 'enablePunctuationPrediction',
        type: 'boolean',
    }, {
        // 文本规整
        key: 'enableInverseTextNormalization',
        type: 'boolean',
    }, {
        // 语义断句
        key: 'enableSemanticSentenceDetection',
        type: 'boolean',
    }, {
        // 语音检测
        key: 'enableVoiceDetection',
        type: 'boolean',
    }, {
        // 允许的最大开始静音，需先设置 enableVoiceDetection
        key: 'maxStartSilence',
        type: 'number',
    }, {
        // 允许的最大结束静音，需先设置 enableVoiceDetection
        key: 'maxEndSilence',
        type: 'number',
    }, {
        // 输出更多识别结果信息
        key: 'enableRichResult',
        type: 'boolean',
    }, {
        // 自定义分段分隔符
        key: 'segmterStr',
        type: 'string',
    }, {
        // 允许返回的 alternate 结果数量
        key: 'maxAlternates',
        type: 'number',
    }, {
        // 是否开启转写文本后处理
        key: 'enableUnifyPost',
        type: 'boolean',
    }, {
        // 统一后处理使用的模型
        key: 'unifyPostModelName',
        type: 'string',
    }, {
        // 是否开启顺滑
        key: 'disfluency',
        type: 'boolean',
    }, {
        // 超时时间，单位毫秒
        key: 'timeoutMillis',
        type: 'number',
    }];

/**
 * 实时识别指令类型
 */
var RecognitionCommandType = /** @class */ (function (_super) {
    __extends(RecognitionCommandType, _super);
    function RecognitionCommandType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 开始识别 */
        _this.StartRecognition = 'StartTranscription';
        /** 停止识别 */
        _this.StopRecognition = 'StopTranscription';
        return _this;
    }
    return RecognitionCommandType;
}(NlsCommandType));
/**
 * 实时识别指令
 */
var RecognitionCommand = /** @class */ (function (_super) {
    __extends(RecognitionCommand, _super);
    /**
     * 构造函数
     */
    function RecognitionCommand(_a) {
        var 
        /** 设备 id */
        deviceId = _a.deviceId, 
        /** 任务 id */
        taskId = _a.taskId, 
        /** 应用 appkey */
        appkey = _a.appkey, 
        /** 识别实例 */
        instance = _a.instance, 
        /** 配置格式化钩子 */
        optionsFormat = _a.optionsFormat, 
        /** 自定义命令钩子 */
        parseCommand = _a.parseCommand;
        var _this = _super.call(this, {
            deviceId: deviceId,
            taskId: taskId,
            appkey: appkey,
        }) || this;
        /** @override 命名空间 */
        _this.namespace = 'SpeechTranscriber';
        /** 指令类型 */
        _this.type = new RecognitionCommandType();
        _this.instance = instance;
        _this.optionsFormat = optionsFormat;
        _this.parseCommand = parseCommand;
        return _this;
    }
    /**
     * 解析配置参数
     * @param extra 需要解析的参数
     * @param settings 默认配置
     * @return 解析后的参数
     */
    RecognitionCommand.prototype.parseOptions = function (extra, settings) {
        if (settings === void 0) { settings = {}; }
        var config = Object.assign({}, settings);
        // 热词 [老，推荐使用 vocabulary] deprecated
        if (typeof extra.hotWords === 'object') {
            Log$1.warn('hotWords 参数不再被支持，推荐使用 vocabulary');
            config.vocabulary = extra.hotWords;
        }
        // 参数配置转化
        recognitionParams.forEach(function (_paramItem) {
            // number
            if (_paramItem.type === 'number'
                && typeof extra[_paramItem.key] === 'number') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
            // string
            if (_paramItem.type === 'string'
                && typeof extra[_paramItem.key] === 'string'
                && extra[_paramItem.key] !== '') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
            // object
            if (_paramItem.type === 'object'
                && typeof extra[_paramItem.key] === 'object') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
            // boolean
            if (_paramItem.type === 'boolean' && typeof extra[_paramItem.key] === 'boolean') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
        });
        // 获取钩子配置
        if (this.optionsFormat) {
            config = this.optionsFormat(extra, config);
        }
        return config;
    };
    /**
     * 获取指令消息
     * @param command 实时识别指令类型
     * @param extra 指令的额外参数
     * @return 指令消息
     */
    RecognitionCommand.prototype.getCommand = function (command, extra) {
        switch (command) {
            // 开始识别
            case this.type.StartRecognition:
                var config = this.parseOptions(extra || {});
                return new NlsCommandMessage({
                    task_id: this.taskId,
                    message_id: getUUID(),
                    namespace: this.namespace,
                    name: this.type.StartRecognition,
                    appkey: this.appkey,
                }, config, {
                    device: {
                        uuid: this.deviceId,
                    },
                });
            // 结束识别
            case this.type.StopRecognition:
                return new NlsCommandMessage({
                    task_id: this.taskId,
                    message_id: getUUID(),
                    namespace: this.namespace,
                    name: this.type.StopRecognition,
                    appkey: this.appkey,
                }, null, {
                    device: {
                        uuid: this.deviceId,
                    },
                });
            default:
                // 获取自定义命令
                if (this.parseCommand) {
                    var customCommand = this.parseCommand(command, extra, this.instance);
                    if (customCommand) {
                        return new NlsCommandMessage({
                            task_id: this.taskId,
                            message_id: getUUID(),
                            namespace: this.namespace,
                            name: customCommand.name,
                            appkey: this.appkey,
                        }, customCommand.data, {
                            device: {
                                uuid: this.deviceId,
                            },
                        });
                    }
                }
                // 未知指令
                throw new NLSError("undefined command: " + command, NLSErrorType.UnkownCommand);
        }
    };
    return RecognitionCommand;
}(NlsCommand));

/**
 * 实时识别事件类型
 */
var RecognitionEventType = /** @class */ (function (_super) {
    __extends(RecognitionEventType, _super);
    function RecognitionEventType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 识别开始 */
        _this.RecognitionStarted = 'TranscriptionStarted';
        /** 服务端检测到了一句话的开始 */
        _this.SentenceBegin = 'SentenceBegin';
        /** 中间识别结果 */
        _this.RecognitionResultChanged = 'TranscriptionResultChanged';
        /** 服务端检测到了一句话的结束 */
        _this.SentenceEnd = 'SentenceEnd';
        /** 结束识别 */
        _this.RecognitionCompleted = 'TranscriptionCompleted';
        return _this;
    }
    return RecognitionEventType;
}(NlsEventType));
/**
 * 实时识别事件
 */
var RecognitionEvent = /** @class */ (function (_super) {
    __extends(RecognitionEvent, _super);
    function RecognitionEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @override 命名空间 */
        _this.namespace = 'SpeechTranscriber';
        /** @override 消息类型 */
        _this.type = new RecognitionEventType();
        return _this;
    }
    return RecognitionEvent;
}(NlsEvent));

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    extendStatics$1(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/** 音频类型 */
var AudioType;
(function (AudioType) {
    /** pcm */
    AudioType["PCM"] = "";
    /** .wav */
    AudioType["WAV"] = "wav";
})(AudioType || (AudioType = {}));
/** 音频原始类 */
var Audio = /** @class */ (function () {
    /** constructor */
    function Audio(_a) {
        var _b = _a === void 0 ? {} : _a, 
        /** 音频类型 */
        _c = _b.type, 
        /** 音频类型 */
        type = _c === void 0 ? AudioType.PCM : _c, 
        /** 音轨数 */
        _d = _b.channels, 
        /** 音轨数 */
        channels = _d === void 0 ? 1 : _d, 
        /** 采样率 */
        _e = _b.sampleRate, 
        /** 采样率 */
        sampleRate = _e === void 0 ? 16000 : _e, 
        /** 每个样本的位数 */
        _f = _b.bitsPerSample, 
        /** 每个样本的位数 */
        bitsPerSample = _f === void 0 ? 16 : _f;
        this.type = type;
        this.channels = channels;
        this.sampleRate = sampleRate;
        this.bitsPerSample = bitsPerSample;
    }
    return Audio;
}());

var global$1$1 = (typeof global$1 !== "undefined" ? global$1 :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}

// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active && !(this instanceof domain.Domain)) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1$1.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read$$1 (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read$$1(arr, i + j) !== read$$1(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write$$1 (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

var _bufferEs6_4_9_3_bufferEs6 = /*#__PURE__*/Object.freeze({
    INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
    kMaxLength: _kMaxLength,
    Buffer: Buffer,
    SlowBuffer: SlowBuffer,
    isBuffer: isBuffer
});

var inherits;
if (typeof Object.create === 'function'){
  inherits = function inherits(ctor, superCtor) {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$1 = inherits;

var formatRegExp = /%[sdj%]/g;
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
}

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
function deprecate(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global$1$1.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
}

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray$1(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray$1(ar) {
  return Array.isArray(ar);
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg == null;
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

function isUndefined(arg) {
  return arg === void 0;
}

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isFunction(arg) {
  return typeof arg === 'function';
}

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

function isBuffer$1(maybeBuf) {
  return isBuffer(maybeBuf);
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
function log() {
  console.log('%s - %s', timestamp(), format.apply(null, arguments));
}

function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var util = {
  inherits: inherits$1,
  _extend: _extend,
  log: log,
  isBuffer: isBuffer$1,
  isPrimitive: isPrimitive,
  isFunction: isFunction,
  isError: isError,
  isDate: isDate,
  isObject: isObject,
  isRegExp: isRegExp,
  isUndefined: isUndefined,
  isSymbol: isSymbol,
  isString: isString,
  isNumber: isNumber,
  isNullOrUndefined: isNullOrUndefined,
  isNull: isNull,
  isBoolean: isBoolean,
  isArray: isArray$1,
  inspect: inspect,
  deprecate: deprecate,
  format: format,
  debuglog: debuglog
};

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return Buffer.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = Buffer.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _safeBuffer_5_1_2_safeBuffer = createCommonjsModule$1(function (module, exports) {
/* eslint-disable node/no-deprecated-api */

var Buffer = _bufferEs6_4_9_3_bufferEs6.Buffer;

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = _bufferEs6_4_9_3_bufferEs6;
} else {
  // Copy properties from require('buffer')
  copyProps(_bufferEs6_4_9_3_bufferEs6, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size);
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }
  return buf
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return _bufferEs6_4_9_3_bufferEs6.SlowBuffer(size)
};
});
var _safeBuffer_5_1_2_safeBuffer_1 = _safeBuffer_5_1_2_safeBuffer.Buffer;

/*<replacement>*/

var Buffer$1 = _safeBuffer_5_1_2_safeBuffer.Buffer;
/*</replacement>*/

var isEncoding = Buffer$1.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
}
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer$1.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
var StringDecoder_1 = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer$1.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

Readable.ReadableState = ReadableState;

var debug = debuglog('stream');
inherits$1(Readable, EventEmitter);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
}
function listenerCount$1 (emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    this.decoder = new StringDecoder_1(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  EventEmitter.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = Buffer.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  this._readableState.decoder = new StringDecoder_1(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false);

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && src.listeners('data').length) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var _i = 0; _i < len; _i++) {
      dests[_i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1) return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = EventEmitter.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

// A bit simpler than readable streams.
Writable.WritableState = WritableState;
inherits$1(Writable, EventEmitter);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Object.defineProperty(this, 'buffer', {
    get: deprecate(function () {
      return this.getBuffer();
    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
  });
  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function writableStateGetBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
function Writable(options) {

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  EventEmitter.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  nextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) nextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
        nextTick(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}

inherits$1(Duplex, Readable);

var keys = Object.keys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

// a transform stream is a readable/writable stream where you do
inherits$1(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er) {
      done(stream, er);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('Not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er) {
  if (er) return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

inherits$1(PassThrough, Transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

inherits$1(Stream, EventEmitter);
Stream.Readable = Readable;
Stream.Writable = Writable;
Stream.Duplex = Duplex;
Stream.Transform = Transform;
Stream.PassThrough = PassThrough;

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EventEmitter.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EventEmitter.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

var clone_1 = createCommonjsModule$1(function (module) {
var clone = (function() {

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
*/
function clone(parent, circular, depth, prototype) {
  var filter;
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    filter = circular.filter;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth == 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (module.exports) {
  module.exports = clone;
}
});

var _defaults_1_0_3_defaults = function(options, defaults) {
  options = options || {};

  Object.keys(defaults).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = clone_1(defaults[key]);
    }
  });

  return options;
};

var toString$1 = Object.prototype.toString;

var isModern = (
  typeof Buffer.alloc === 'function' &&
  typeof Buffer.allocUnsafe === 'function' &&
  typeof Buffer.from === 'function'
);

function isArrayBuffer (input) {
  return toString$1.call(input).slice(8, -1) === 'ArrayBuffer'
}

function fromArrayBuffer$1 (obj, byteOffset, length) {
  byteOffset >>>= 0;

  var maxLength = obj.byteLength - byteOffset;

  if (maxLength < 0) {
    throw new RangeError("'offset' is out of bounds")
  }

  if (length === undefined) {
    length = maxLength;
  } else {
    length >>>= 0;

    if (length > maxLength) {
      throw new RangeError("'length' is out of bounds")
    }
  }

  return isModern
    ? Buffer.from(obj.slice(byteOffset, byteOffset + length))
    : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)))
}

function fromString$1 (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  return isModern
    ? Buffer.from(string, encoding)
    : new Buffer(string, encoding)
}

function bufferFrom (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer$1(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString$1(value, encodingOrOffset)
  }

  return isModern
    ? Buffer.from(value)
    : new Buffer(value)
}

var _bufferFrom_1_1_1_bufferFrom = bufferFrom;

var Transform$1 = Stream.Transform;


// some versions of the buffer browser lib don't support Buffer.from (such as the one included by the current version of express-browserify)


/**
 * Transforms Buffers or AudioBuffers into a binary stream of l16 (raw wav) audio, downsampling in the process.
 *
 * The watson speech-to-text service works on 16kHz and internally downsamples audio received at higher samplerates.
 * WebAudio is usually 44.1kHz or 48kHz, so downsampling here reduces bandwidth usage by ~2/3.
 *
 * Format event + stream can be combined with https://www.npmjs.com/package/wav to generate a wav file with a proper header
 *
 * Todo: support multi-channel audio (for use with <audio>/<video> elements) - will require interleaving audio channels
 *
 * @param {Object} options
 * @constructor
 */
function WebAudioL16Stream(options) {
  options = this.options = _defaults_1_0_3_defaults(options, {
    sourceSampleRate: 48000,
    targetSampleRate: 16000,
    downsample: true
  });

  Transform$1.call(this, options);

  this.bufferUnusedSamples = [];

  if (options.objectMode || options.writableObjectMode) {
    this._transform = this.handleFirstAudioBuffer;
  } else {
    this._transform = this.transformBuffer;
    nextTick(this.emitFormat.bind(this));
  }
}
util.inherits(WebAudioL16Stream, Transform$1);

WebAudioL16Stream.prototype.emitFormat = function emitFormat() {
  this.emit('format', {
    channels: 1,
    bitDepth: 16,
    sampleRate: this.options.downsample ? this.options.targetSampleRate : this.options.sourceSampleRate,
    signed: true,
    float: false
  });
};

/**
 * Downsamples WebAudio to 16 kHz.
 *
 * Browsers can downsample WebAudio natively with OfflineAudioContext's but it was designed for non-streaming use and
 * requires a new context for each AudioBuffer. Firefox can handle this, but chrome (v47) crashes after a few minutes.
 * So, we'll do it in JS for now.
 *
 * This really belongs in it's own stream, but there's no way to create new AudioBuffer instances from JS, so its
 * fairly coupled to the wav conversion code.
 *
 * @param  {AudioBuffer} bufferNewSamples Microphone/MediaElement audio chunk
 * @return {Float32Array} 'audio/l16' chunk
 */
WebAudioL16Stream.prototype.downsample = function downsample(bufferNewSamples) {
  var buffer = null;
  var newSamples = bufferNewSamples.length;
  var unusedSamples = this.bufferUnusedSamples.length;
  var i;
  var offset;

  if (unusedSamples > 0) {
    buffer = new Float32Array(unusedSamples + newSamples);
    for (i = 0; i < unusedSamples; ++i) {
      buffer[i] = this.bufferUnusedSamples[i];
    }
    for (i = 0; i < newSamples; ++i) {
      buffer[unusedSamples + i] = bufferNewSamples[i];
    }
  } else {
    buffer = bufferNewSamples;
  }

  // Downsampling and low-pass filter:
  // Input audio is typically 44.1kHz or 48kHz, this downsamples it to 16kHz.
  // It uses a FIR (finite impulse response) Filter to remove (or, at least attinuate)
  // audio frequencies > ~8kHz because sampled audio cannot accurately represent
  // frequiencies greater than half of the sample rate.
  // (Human voice tops out at < 4kHz, so nothing important is lost for transcription.)
  // See http://dsp.stackexchange.com/a/37475/26392 for a good explination of this code.
  var filter = [
    -0.037935,
    -0.00089024,
    0.040173,
    0.019989,
    0.0047792,
    -0.058675,
    -0.056487,
    -0.0040653,
    0.14527,
    0.26927,
    0.33913,
    0.26927,
    0.14527,
    -0.0040653,
    -0.056487,
    -0.058675,
    0.0047792,
    0.019989,
    0.040173,
    -0.00089024,
    -0.037935
  ];
  var samplingRateRatio = this.options.sourceSampleRate / this.options.targetSampleRate;
  var nOutputSamples = Math.floor((buffer.length - filter.length) / samplingRateRatio) + 1;
  var outputBuffer = new Float32Array(nOutputSamples);

  for (i = 0; i < outputBuffer.length; i++) {
    offset = Math.round(samplingRateRatio * i);
    var sample = 0;
    for (var j = 0; j < filter.length; ++j) {
      sample += buffer[offset + j] * filter[j];
    }
    outputBuffer[i] = sample;
  }

  var indexSampleAfterLastUsed = Math.round(samplingRateRatio * i);
  var remaining = buffer.length - indexSampleAfterLastUsed;
  if (remaining > 0) {
    this.bufferUnusedSamples = new Float32Array(remaining);
    for (i = 0; i < remaining; ++i) {
      this.bufferUnusedSamples[i] = buffer[indexSampleAfterLastUsed + i];
    }
  } else {
    this.bufferUnusedSamples = new Float32Array(0);
  }

  return outputBuffer;
};

/**
 * Accepts a Float32Array of audio data and converts it to a Buffer of l16 audio data (raw wav)
 *
 * Explanation for the math: The raw values captured from the Web Audio API are
 * in 32-bit Floating Point, between -1 and 1 (per the specification).
 * The values for 16-bit PCM range between -32768 and +32767 (16-bit signed integer).
 * Filter & combine samples to reduce frequency, then multiply to by 0x7FFF (32767) to convert.
 * Store in little endian.
 *
 * @param {Float32Array} input
 * @return {Buffer}
 */
WebAudioL16Stream.prototype.floatTo16BitPCM = function(input) {
  var output = new DataView(new ArrayBuffer(input.length * 2)); // length is in bytes (8-bit), so *2 to get 16-bit length
  for (var i = 0; i < input.length; i++) {
    var multiplier = input[i] < 0 ? 0x8000 : 0x7fff; // 16-bit signed range is -32768 to 32767
    output.setInt16(i * 2, (input[i] * multiplier) | 0, true); // index, value ("| 0" = convert to 32-bit int, round towards 0), littleEndian.
  }
  return _bufferFrom_1_1_1_bufferFrom(output.buffer);
};

/**
 * Does some one-time setup to grab sampleRate and emit format, then sets _transform to the actual audio buffer handler and calls it.
 * @param {AudioBuffer} audioBuffer
 * @param {String} encoding
 * @param {Function} next
 */
WebAudioL16Stream.prototype.handleFirstAudioBuffer = function handleFirstAudioBuffer(audioBuffer, encoding, next) {
  this.options.sourceSampleRate = audioBuffer.sampleRate;
  this.emitFormat();
  this._transform = this.transformAudioBuffer;
  this._transform(audioBuffer, encoding, next);
};

/**
 * Accepts an AudioBuffer (for objectMode), then downsamples to 16000 and converts to a 16-bit pcm
 *
 * @param {AudioBuffer} audioBuffer
 * @param {String} encoding
 * @param {Function} next
 */
WebAudioL16Stream.prototype.transformAudioBuffer = function(audioBuffer, encoding, next) {
  var source = audioBuffer.getChannelData(0);
  if (this.options.downsample) {
    source = this.downsample(source);
  }
  this.push(this.floatTo16BitPCM(source));
  next();
};

/**
 * Accepts a Buffer (for binary mode), then downsamples to 16000 and converts to a 16-bit pcm
 *
 * @param {Buffer} nodebuffer
 * @param {String} encoding
 * @param {Function} next
 */
WebAudioL16Stream.prototype.transformBuffer = function(nodebuffer, encoding, next) {
  var source = new Float32Array(nodebuffer.buffer);
  if (this.options.downsample) {
    source = this.downsample(source);
  }
  this.push(this.floatTo16BitPCM(source));
  next();
};
// new Float32Array(nodebuffer.buffer)

var _webAudioResampler_1_0_3_webAudioResampler = WebAudioL16Stream;

/**
 * PCM 编码类型
 */
var PCMEncodingType;
(function (PCMEncodingType) {
    /** 8 bit int */
    PCMEncodingType["PCMEncodingType8BitInt"] = "8bitInt";
    /** 16 bit int */
    PCMEncodingType["PCMEncodingType16BitInt"] = "16bitInt";
    /** 32 bit int */
    PCMEncodingType["PCMEncodingType32BitInt"] = "32bitInt";
    /** 32 bit float */
    PCMEncodingType["PCMEncodingType32BitFloat"] = "32bitFloat";
})(PCMEncodingType || (PCMEncodingType = {}));
/**
 * 获取 PCM 最大值
 * @private
 * @param type 编码类型
 * @return 最大值
 */
function getPCMMaxValue(type) {
    switch (type) {
        case PCMEncodingType.PCMEncodingType8BitInt:
            return 128;
        case PCMEncodingType.PCMEncodingType32BitInt:
            return 2147483648;
        case PCMEncodingType.PCMEncodingType32BitFloat:
            return 1;
        case PCMEncodingType.PCMEncodingType16BitInt:
        default:
            return 32768;
    }
}
/**
 * 获取 PCM 数组类型
 * @private
 * @param buffer PCM 数据
 * @param type 编码类型
 * @return 数组类型
 */
function getPCMTypedArray(buffer, type) {
    switch (type) {
        case PCMEncodingType.PCMEncodingType8BitInt:
            return new Int8Array(buffer);
        case PCMEncodingType.PCMEncodingType32BitInt:
            return new Int32Array(buffer);
        case PCMEncodingType.PCMEncodingType32BitFloat:
            return new Float32Array(buffer);
        case PCMEncodingType.PCMEncodingType16BitInt:
        default:
            return new Int16Array(buffer);
    }
}

/**
 * PCM 数据转换为 AudioBuffer 可播放数据
 * @param buffer pcm arrayBuffer
 * @param context 音频上下午
 * @return 添加头部后的 wav arrayBuffer
 */
var pcm2audio = function (buffer, context, _a) {
    var _b = _a === void 0 ? {} : _a, 
    /** 编码格式 */
    _c = _b.encoding, 
    /** 编码格式 */
    encoding = _c === void 0 ? PCMEncodingType.PCMEncodingType16BitInt : _c, 
    /** 声道数 */
    _d = _b.channels, 
    /** 声道数 */
    channels = _d === void 0 ? 1 : _d, 
    /** 采样率 */
    _e = _b.sampleRate, 
    /** 采样率 */
    sampleRate = _e === void 0 ? 16000 : _e;
    // 原始采样数据
    var originSamples = getPCMTypedArray(buffer, encoding);
    // 转化成 32 float 后的采样数据
    var samples = new Float32Array(originSamples.length);
    for (var i = 0; i < originSamples.length; i++) {
        samples[i] = originSamples[i] / getPCMMaxValue(encoding);
    }
    // 生成 audio buffer
    var len = samples.length / channels;
    var audioBuffer = context.createBuffer(channels, len, sampleRate);
    for (var channel = 0; channel < channels; channel++) {
        var audioData = audioBuffer.getChannelData(channel);
        for (var i = 0, offset = channel; i < len; i++, offset += channels) {
            audioData[i] = samples[offset];
        }
    }
    return audioBuffer;
};

/** PCM 类型文件 */
var PCM = /** @class */ (function (_super) {
    __extends$1(PCM, _super);
    /** constructor */
    function PCM(_a) {
        var _b = _a === void 0 ? {} : _a, 
        /** 音轨数 */
        _c = _b.channels, 
        /** 音轨数 */
        channels = _c === void 0 ? 1 : _c, 
        /** 采样率 */
        _d = _b.sampleRate, 
        /** 采样率 */
        sampleRate = _d === void 0 ? 16000 : _d, 
        /** 每个样本的位数 */
        _e = _b.bitsPerSample, 
        /** 每个样本的位数 */
        bitsPerSample = _e === void 0 ? 16 : _e, 
        /** 音频内容 */
        _f = _b.content, 
        /** 音频内容 */
        content = _f === void 0 ? new ArrayBuffer(0) : _f;
        var _this = _super.call(this, {
            type: AudioType.PCM,
            channels: channels,
            sampleRate: sampleRate,
            bitsPerSample: bitsPerSample
        }) || this;
        _this.content = content;
        return _this;
    }
    /**
     * 降采样至 16kHz
     * 降采样会丢失多声道信息，只保留单声道
     */
    PCM.prototype.downSampleL16 = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.sampleRate > 16000) {
                var audioBuffer = _this.getAudioBuffer();
                var l16stream = new _webAudioResampler_1_0_3_webAudioResampler({
                    objectMode: true,
                    sourceSampleRate: _this.sampleRate
                });
                l16stream.on('data', function (resampler) {
                    _this.sampleRate = 16000;
                    _this.content = resampler.buffer;
                    resolve(true);
                });
                l16stream._transform(audioBuffer);
            }
            else {
                // else 8kHz 16kHz 不操作
                resolve(true);
            }
        });
    };
    PCM.prototype.getEncodeType = function () {
        var encodingType = PCMEncodingType.PCMEncodingType16BitInt;
        if (this.bitsPerSample === 8) {
            encodingType = PCMEncodingType.PCMEncodingType8BitInt;
        }
        else if (this.bitsPerSample === 16) {
            encodingType = PCMEncodingType.PCMEncodingType16BitInt;
        }
        else if (this.bitsPerSample === 32) {
            encodingType = PCMEncodingType.PCMEncodingType32BitInt;
        }
        else {
            throw new Error('不支持的格式类型');
        }
        // TODO
        // else if (this.bitsPerSample === 32) {
        //   encodingType = PCMEncodingType.PCMEncodingType32BitFloat;
        // }
        return encodingType;
    };
    PCM.prototype.getAudioBuffer = function () {
        return pcm2audio(this.content, new (window.AudioContext || window.webkitAudioContext)(), {
            channels: this.channels,
            sampleRate: this.sampleRate,
            encoding: this.getEncodeType()
        });
    };
    PCM.prototype.getBlob = function () {
        return new Blob([this.content], {
            type: 'audio/pcm'
        });
    };
    return PCM;
}(Audio));

/**
 * Creates a new Uint8Array based on two different ArrayBuffers
 * @param buffer1 The first buffer.
 * @param buffer2 The second buffer.
 * @return The new ArrayBuffer created out of the two.
 */
function appendBuffer(buffer1, buffer2) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
}
/**
 * view write string
 * @param view
 * @param offset
 * @param str
 */
function writeString(view, offset, str) {
    for (var i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}

/** WAV 类型文件 */
var WAV = /** @class */ (function (_super) {
    __extends$1(WAV, _super);
    /** constructor */
    function WAV(_a) {
        var _b = _a === void 0 ? {} : _a, 
        /** 音轨数 */
        _c = _b.channels, 
        /** 音轨数 */
        channels = _c === void 0 ? 1 : _c, 
        /** 采样率 */
        _d = _b.sampleRate, 
        /** 采样率 */
        sampleRate = _d === void 0 ? 16000 : _d, 
        /** 每个样本的位数 */
        _e = _b.bitsPerSample, 
        /** 每个样本的位数 */
        bitsPerSample = _e === void 0 ? 16 : _e, 
        /** 音频内容 */
        _f = _b.content, 
        /** 音频内容 */
        content = _f === void 0 ? new ArrayBuffer(0) : _f;
        var _this = _super.call(this, {
            type: AudioType.WAV,
            channels: channels,
            sampleRate: sampleRate,
            bitsPerSample: bitsPerSample
        }) || this;
        _this.content = content;
        return _this;
    }
    /** 读取 wav 头部 */
    WAV.readHeader = function (chunk) {
        var view = new DataView(chunk);
        var channels = view.getUint16(22, true);
        var sampleRate = view.getUint32(24, true);
        var bitsPerSample = view.getUint16(34, true);
        return {
            // 音频信息
            sampleRate: sampleRate,
            channels: channels,
            bitsPerSample: bitsPerSample
        };
    };
    /** 写入 wav 头部 */
    WAV.writeHeader = function (chunk, _a) {
        var _b = _a.channels, channels = _b === void 0 ? 1 : _b, _c = _a.sampleRate, sampleRate = _c === void 0 ? 16000 : _c;
        var len = chunk.byteLength;
        var headBuffer = new ArrayBuffer(44);
        var view = new DataView(headBuffer);
        /* RIFF identifier */
        writeString(view, 0, 'RIFF');
        /* RIFF chunk length */
        view.setUint32(4, 36 + len, true);
        /* RIFF type */
        writeString(view, 8, 'WAVE');
        /* format chunk identifier */
        writeString(view, 12, 'fmt ');
        /* format chunk length */
        view.setUint32(16, 16, true);
        /* sample format (raw PCM) */
        view.setUint16(20, 1, true);
        /* channel count */
        view.setUint16(22, channels, true);
        /* sample rate */
        view.setUint32(24, sampleRate, true);
        /* byte rate (sample rate * block align) */
        view.setUint32(28, sampleRate * 4, true);
        /* block align (channel count * bytes per sample) */
        view.setUint16(32, channels * 2, true);
        /* bits per sample */
        view.setUint16(34, 16, true);
        /* data chunk identifier */
        writeString(view, 36, 'data');
        /* data chunk length */
        view.setUint32(40, len, true);
        return appendBuffer(view.buffer, chunk);
    };
    WAV.prototype.getBlob = function () {
        return new Blob([this.content], {
            type: 'audio/wav'
        });
    };
    return WAV;
}(Audio));

/**
 * 降采样 16k
 */
var ResamplerL16 = /** @class */ (function () {
    function ResamplerL16(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, 
        // 原始采样率
        _c = _b.sourceSampleRate, 
        // 原始采样率
        sourceSampleRate = _c === void 0 ? 44100 : _c, 
        // 目标采样率
        _d = _b.targetSampleRate, 
        // 目标采样率
        targetSampleRate = _d === void 0 ? 16000 : _d, 
        // 降采样回调
        _e = _b.onReSample, 
        // 降采样回调
        onReSample = _e === void 0 ? function () { } : _e;
        this.onData = function (resampler) {
            _this.onReSampleHandle(resampler);
        };
        this.downSample = function (audioBuffer) {
            _this.l16stream.write(audioBuffer);
        };
        this.l16stream = new _webAudioResampler_1_0_3_webAudioResampler({
            objectMode: true,
            sourceSampleRate: sourceSampleRate,
            targetSampleRate: targetSampleRate
        });
        this.l16stream.on('data', this.onData);
        this.onReSampleHandle = onReSample;
    }
    return ResamplerL16;
}());

// 获取浏览器类型
var getBrowser = function () {
    // var userAgent = window.navigator.userAgent; // 取得浏览器的userAgent字符串
    var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36";
    var isOpera = userAgent.indexOf('Opera') > -1;
    if (isOpera) {
        return 'Opera';
    } // 判断是否Opera浏览器
    if (userAgent.indexOf('Firefox') > -1) {
        return 'FF';
    } // 判断是否Firefox浏览器
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome';
    }
    if (userAgent.indexOf('Safari') > -1) {
        return 'Safari';
    } // 判断是否Safari浏览器
    if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        return 'IE';
    } // 判断是否IE浏览器
};

var isSafari = getBrowser() === 'Safari';
/**
 * PCM 播放器
 */
var Player = /** @class */ (function () {
    /**
     * 构造函数
     */
    function Player(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, 
        /** 是否自动播放 */
        _c = _b.autoplay, 
        /** 是否自动播放 */
        autoplay = _c === void 0 ? true : _c, 
        /** 编码格式 */
        _d = _b.encoding, 
        /** 编码格式 */
        encoding = _d === void 0 ? PCMEncodingType.PCMEncodingType16BitInt : _d, 
        /** 采样率 */
        _e = _b.sampleRate, 
        /** 采样率 */
        sampleRate = _e === void 0 ? 16000 : _e, 
        /** 声道数 */
        _f = _b.channels, 
        /** 声道数 */
        channels = _f === void 0 ? 1 : _f, 
        /** flush time，单位 ms，读取缓冲的时间间隔，大小一般和语音片段播放长度有关系 */
        _g = _b.flushTime, 
        /** flush time，单位 ms，读取缓冲的时间间隔，大小一般和语音片段播放长度有关系 */
        flushTime = _g === void 0 ? 200 : _g, 
        /** 播放器第一次有数据，可以播放 */
        _h = _b.onReady, 
        /** 播放器第一次有数据，可以播放 */
        onReady = _h === void 0 ? function () { } : _h, 
        /** 开始播放 */
        _j = _b.onPlay, 
        /** 开始播放 */
        onPlay = _j === void 0 ? function () { } : _j, 
        /** 播放暂停回调 */
        _k = _b.onPause, 
        /** 播放暂停回调 */
        onPause = _k === void 0 ? function () { } : _k, 
        /** 播放停止回调 */
        _l = _b.onStop, 
        /** 播放停止回调 */
        onStop = _l === void 0 ? function () { } : _l;
        /** 音频缓存 */
        this.cache = [];
        /** 音频临时缓冲 */
        this.pending = new Uint8Array().buffer;
        /** 示波器 */
        // private oscilloscope: Oscilloscope
        /** 播放定时器的 Timer */
        this.playingTimer = 0;
        /** flush 定时器的 Timer */
        this.flushTimer = 0;
        /** safari下检测onend */
        this.stopCheck = 0;
        /** 音频总时长 */
        this.duration = 0;
        /** 播放器是否可以播放 */
        this.isReady = false;
        /** 是否缓冲结束 */
        this.isFeedEnd = false;
        /** 下一次播放时间 */
        this.nextPlayTime = 0;
        /** 是否正在播放 */
        this.isPlaying = false;
        /** 是否暂停 */
        this.isPause = false;
        /** source 节点列表 */
        this.sourceList = [];
        /**
         * 开始播放
         */
        this.firstPlay = function () {
            _this.isPlaying = true;
            _this.flush();
            cancelAnimationFrame(_this.playingTimer);
            // this.onPlaying()
            _this.onPlay();
        };
        /**
         * 读取缓冲
         */
        this.flush = function () {
            // 没有数据，但是还没结束缓冲
            if (!_this.pending.byteLength) {
                if (!_this.isFeedEnd) {
                    // 直接启动下一次读取
                    _this.flushTimer = window.setTimeout(_this.flush, _this.flushTime);
                }
                return;
            }
            // 是否为最后一个节点
            var isLastPart = _this.isFeedEnd;
            // 以下为耗时操作，状态变量放上面先读取好
            // 生成 audio buffer
            var audioBuffer = pcm2audio(_this.pending, _this.context, {
                channels: _this.channels,
                sampleRate: _this.sampleRate,
                encoding: _this.encoding
            });
            // 播放解析的音频数据
            _this.playBuffer(audioBuffer, isLastPart);
            // 清空缓冲区
            _this.cache.push(audioBuffer);
            _this.pending = new Uint8Array().buffer;
            if (!isLastPart) {
                // 继续启动下一次读取
                _this.flushTimer = window.setTimeout(_this.flush, _this.flushTime);
            }
        };
        /**
         * 停止播放
         */
        this.stop = function () {
            if (!_this.isPlaying && !_this.isPause) {
                return;
            }
            if (isSafari) {
                window.clearInterval(_this.stopCheck);
            }
            _this.duration = 0;
            cancelAnimationFrame(_this.playingTimer);
            clearTimeout(_this.flushTimer);
            _this.isPlaying = false;
            _this.isPause = false;
            if (_this.context.state !== 'closed') {
                _this.context.suspend();
            }
            _this.onStop();
        };
        /**
         * 缓冲结束
         */
        this.finish = function () {
            _this.isFeedEnd = true;
            if (_this.pending.byteLength <= 0 && _this.sourceList.length > 0) {
                // 缓冲区已全部被读取，添加 onEnd 检查
                _this.checkEnd();
            }
        };
        this.autoplay = autoplay;
        this.encoding = encoding;
        this.sampleRate = sampleRate;
        this.channels = channels;
        this.flushTime = flushTime;
        // this.onPlaying = this.onPlaying
        this.stop = this.stop;
        this.flush = this.flush;
        this.finish = this.finish;
        this.firstPlay = this.firstPlay;
        this.onReady = onReady;
        this.onPlay = onPlay;
        this.onPause = onPause;
        this.onStop = onStop;
        this.duration = 0;
        // 创建上下文
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createGain();
        this.source.connect(this.context.destination);
        // 播放空节点，让 audio context 先跑起来
        this.playSilence();
    }
    /**
     * 新建音频上下文
     */
    Player.prototype.reCreateContext = function () {
        // 关闭老的 context
        if (this.context && this.context.state !== 'closed') {
            this.context.close().catch(function (e) {
                console.log(e);
            });
        }
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.nextPlayTime = 0;
        this.source = this.context.createGain();
        this.source.connect(this.context.destination);
    };
    /**
     * 播放空声音节点
     * 解决 iOS 无法自动播放的问题
     */
    Player.prototype.playSilence = function () {
        var gainNode = this.context.createGain();
        // 当前时间设置音量为 0
        gainNode.gain.setValueAtTime(0, this.context.currentTime);
        gainNode.connect(this.context.destination);
        var oscillator = this.context.createOscillator();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + 1);
    };
    /**
     * 播放音频
     * @param buffer 音频内容
     * @param isLastPart 是否为最后一个节点
     */
    Player.prototype.playBuffer = function (buffer, isLastPart) {
        if (isLastPart === void 0) { isLastPart = false; }
        if (this.context.state === 'closed') {
            // 已经被关闭
            return;
        }
        if (this.nextPlayTime < this.context.currentTime) {
            this.nextPlayTime = this.context.currentTime;
        }
        var source = this.context.createBufferSource();
        source.buffer = buffer;
        this.duration += buffer.duration;
        source.connect(this.source);
        source.start(this.nextPlayTime);
        this.sourceList.push(source);
        if (isLastPart) {
            this.checkEnd();
        }
        this.nextPlayTime += buffer.duration;
    };
    /**
     * 播放结束检查
     */
    Player.prototype.checkEnd = function () {
        var _this = this;
        if (isSafari) {
            // 解决诡异的safari下的问题，source.onended不执行的问题
            window.clearInterval(this.stopCheck);
            var startTime_1 = Date.now();
            this.stopCheck = window.setInterval(function () {
                if (_this.isPause) {
                    startTime_1 += 200;
                }
                var now = Date.now();
                var playTime = now - startTime_1;
                if (_this.duration * 1000 < playTime) {
                    _this.stop();
                }
            }, 200);
        }
        else {
            var source = this.sourceList[this.sourceList.length - 1];
            source.onended = this.stop;
        }
    };
    /**
     * 播放
     */
    Player.prototype.play = function () {
        var _this = this;
        if (this.isReady && !this.isPlaying) {
            // 可以播放
            if (this.isPause) {
                // 继续播放
                this.context.resume().then(function () {
                    _this.isPlaying = true;
                    _this.isPause = false;
                    _this.onPlay();
                });
            }
            else if (this.cache.length <= 0) {
                // 第一次播放
                this.firstPlay();
            }
            else {
                // 重新播放
                this.reCreateContext();
                this.cache.forEach(function (buffer, index) {
                    _this.playBuffer(buffer, index === _this.cache.length - 1);
                });
                this.firstPlay();
            }
        }
    };
    /**
     * 暂停
     */
    Player.prototype.pause = function () {
        var _this = this;
        if (this.isPlaying) {
            this.context.suspend().then(function () {
                _this.isPlaying = false;
                _this.isPause = true;
                cancelAnimationFrame(_this.playingTimer);
                _this.onPause();
            });
        }
    };
    /**
     * 销毁播放器
     */
    Player.prototype.destroy = function () {
        this.stop();
        if (this.context.state !== 'closed') {
            this.context.close();
        }
    };
    /**
     * 添加缓冲
     * @param buffer 语音流
     */
    Player.prototype.feed = function (buffer) {
        this.pending = appendBuffer(this.pending, buffer);
        // 已经有数据，可以播放
        if (!this.isReady) {
            this.isReady = true;
            this.onReady();
        }
        // 有数据后，如果还没启动播放，开始自动播放
        if (this.autoplay && !this.isPlaying && !this.isPause) {
            this.play();
        }
    };
    return Player;
}());

/**
 * 录音机
 */
var Recorder = /** @class */ (function () {
    /**
     * 构造函数
     */
    function Recorder(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, 
        /** deviceId，指定输入设备 */
        deviceId = _b.deviceId, 
        /** 采样率 */
        sampleRate = _b.sampleRate, 
        /** 成功获取权限 */
        _c = _b.onGetPermission, 
        /** 成功获取权限 */
        onGetPermission = _c === void 0 ? function () { } : _c, 
        /** 录音数据回调函数（频率会比录音状态慢，会缓冲一段） */
        _d = _b.onData, 
        /** 录音数据回调函数（频率会比录音状态慢，会缓冲一段） */
        onData = _d === void 0 ? function () { } : _d, 
        /** 录音错误回调函数 */
        _e = _b.onError, 
        /** 录音错误回调函数 */
        onError = _e === void 0 ? function () { } : _e;
        /** 是否正在录音 */
        this.recording = false;
        /** 上下文是否已被使用 */
        this.contextUsed = false;
        /**
         * audio process 处理函数
         */
        this.processHandler = function (ev) {
            var inputBuffer = ev.inputBuffer;
            _this.onDataHandler(inputBuffer);
        };
        this.sampleRate = sampleRate;
        var opts = {};
        if (this.sampleRate) {
            opts.sampleRate = this.sampleRate;
        }
        this.context = new (window.AudioContext || window.webkitAudioContext)(opts);
        this.deviceId = deviceId;
        this.onGetPermission = onGetPermission;
        this.onDataHandler = onData;
        this.onErrorHandler = onError;
    }
    /**
     * 重建上下文
     */
    Recorder.prototype.reCreateContext = function () {
        var opts = {};
        if (this.sampleRate) {
            opts.sampleRate = this.sampleRate;
        }
        // 关闭老的 context
        if (this.context && this.context.state !== 'closed') {
            this.context.close().catch(function (e) {
                console.log(e);
            });
        }
        this.context = new (window.AudioContext || window.webkitAudioContext)(opts);
    };
    /**
     * 开始录音
     */
    Recorder.prototype.start = function () {
        var _this = this;
        if (this.recording) {
            return;
        }
        if (this.contextUsed) {
            this.reCreateContext();
        }
        this.contextUsed = true;
        var success = this.handleSuccess.bind(this);
        var failture = function (err) {
            _this.onErrorHandler(err);
        };
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                audio: this.deviceId ? { deviceId: this.deviceId } : true
            })
                .then(success)
                .catch(failture);
        }
        else if (navigator.webkitGetUserMedia) {
            navigator.webkitGetUserMedia({
                audio: this.deviceId ? { deviceId: this.deviceId } : true
            }, success, failture);
        }
    };
    /**
     * 停止录音
     */
    Recorder.prototype.stop = function () {
        if (this.recording) {
            this.recording = false;
            // 停止媒体流
            if (this.mediaStream) {
                this.mediaStream.getTracks().forEach(function (_track) {
                    _track.stop();
                });
                this.mediaStream = undefined;
            }
            // 拔下输入源
            if (this.originSource && this.gainNode && this.scriptProcessor) {
                try {
                    this.originSource.disconnect(this.gainNode);
                    this.gainNode.disconnect();
                    this.scriptProcessor.disconnect();
                }
                catch (e) {
                    // 重复调用 diconnect，可能重复 stop
                }
            }
        }
        // 关闭 context
        if (this.context && this.context.state !== 'closed') {
            this.context.close().catch(function (e) {
                console.log(e);
            });
        }
    };
    /**
     * 设置音量增益大小
     * @param val 最小值约-3.4，最大约3.4
     */
    Recorder.prototype.setGain = function (val) {
        if (this.gainNode) {
            this.gainNode.gain.value = val;
        }
    };
    /**
     * WebRTC 录音结果处理函数
     * @param stream 录音流
     */
    Recorder.prototype.handleSuccess = function (stream) {
        this.mediaStream = stream;
        this.originSource = this.context.createMediaStreamSource(stream);
        this.gainNode = this.context.createGain();
        this.source = this.gainNode; // 对外结点
        this.scriptProcessor = this.context.createScriptProcessor(4096, 1, 1);
        this.scriptProcessor.onaudioprocess = this.processHandler;
        // 成功获取权限
        this.onGetPermission(stream);
        // onGetPermission 外部执行识别，录音被停止
        if (this.context.state === 'closed') {
            return;
        }
        this.recording = true;
        this.originSource.connect(this.gainNode);
        this.gainNode.connect(this.scriptProcessor);
        this.scriptProcessor.connect(this.context.destination);
    };
    return Recorder;
}());

/**
 * 磁带录音机（需指定输入）
 */
var TapeRecorder = /** @class */ (function () {
    /**
     * 构造函数
     */
    function TapeRecorder(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, 
        /** 输入类型为 audio 时，需要指定 tap */
        _c = _b.tape, 
        /** 输入类型为 audio 时，需要指定 tap */
        tape = _c === void 0 ? null : _c, 
        /** 采样率 */
        sampleRate = _b.sampleRate, 
        /** 即将播放 */
        _d = _b.onStart, 
        /** 即将播放 */
        onStart = _d === void 0 ? function () { } : _d, 
        /** 录音数据回调函数（频率会比录音状态慢，会缓冲一段） */
        _e = _b.onData, 
        /** 录音数据回调函数（频率会比录音状态慢，会缓冲一段） */
        onData = _e === void 0 ? function () { } : _e, 
        /** 结束播放 */
        _f = _b.onStop, 
        /** 结束播放 */
        onStop = _f === void 0 ? function () { } : _f, 
        /** 录音错误回调函数 */
        _g = _b.onError, 
        /** 录音错误回调函数 */
        onError = _g === void 0 ? function () { } : _g;
        /** 播放状态 */
        this.isPlaying = false;
        /** 是否需要 ready 后自动播放 */
        this.needAutoPlay = false;
        /** 是否能播放 */
        this.isCanPlay = false;
        /** tap 关闭标识 */
        this.tapStopping = false;
        this.tapTimer = 0;
        this.canPlayHandle = function () {
            _this.isCanPlay = true;
            if (_this.needAutoPlay) {
                _this.needAutoPlay = false;
                // 自动开始
                _this.start();
            }
        };
        /**
         * 初始化 audio 节点
         */
        this.initAudioConnect = function () {
            // reset
            if (_this.originSource && _this.gainNode && _this.scriptProcessor) {
                // 拔下输入源
                _this.originSource.disconnect(_this.gainNode);
                _this.gainNode.disconnect();
                _this.scriptProcessor.disconnect();
            }
            try {
                var captureStream = _this.tape.captureStream();
                _this.originSource = _this.context.createMediaStreamSource(captureStream);
                _this.gainNode = _this.context.createGain();
                _this.source = _this.gainNode; // 对外结点
                _this.scriptProcessor = _this.context.createScriptProcessor(4096, 1, 1);
                _this.scriptProcessor.onaudioprocess = _this.processHandler;
                _this.originSource.connect(_this.gainNode);
                _this.gainNode.connect(_this.scriptProcessor);
                _this.scriptProcessor.connect(_this.context.destination);
            }
            catch (e) {
                _this.onErrorHandler(e);
            }
        };
        /**
         * audio process 处理函数
         */
        this.processHandler = function (ev) {
            if (_this.tape && !_this.tape.paused) {
                var inputBuffer = ev.inputBuffer;
                _this.onDataHandler(inputBuffer);
            }
        };
        /**
         * 开始录音
         */
        this.start = function () {
            // 关闭锁
            if (_this.tapStopping) {
                clearTimeout(_this.tapTimer);
                _this.tapStopping = false;
                return;
            }
            if (!_this.isCanPlay) {
                // 还不能播放，等 canplay 事件后自动播放
                _this.needAutoPlay = true;
                return;
            }
            _this.needAutoPlay = false;
            if (_this.isPlaying) {
                _this.onStopHandler();
            }
            _this.isPlaying = true;
            _this.initAudioConnect();
            _this.onStartHandler();
            _this.context.resume().catch(function (e) {
                console.log(e);
            });
        };
        /**
         * 延时停止
         */
        this.delayStop = function () {
            clearTimeout(_this.tapTimer);
            _this.tapStopping = true;
            _this.tapTimer = window.setTimeout(function () {
                _this.tapStopping = false;
                _this.stop();
            }, 100);
        };
        /**
         * 停止录音
         */
        this.stop = function () {
            if (_this.isPlaying) {
                _this.isPlaying = false;
                _this.onStopHandler();
            }
            _this.context.suspend().catch(function (e) {
                console.log(e);
            });
        };
        /**
         * 音频退出
         */
        this.abort = function () {
            _this.isCanPlay = false;
            _this.stop();
        };
        this.sampleRate = sampleRate;
        var opts = {};
        if (this.sampleRate) {
            opts.sampleRate = this.sampleRate;
        }
        this.context = new (window.AudioContext || window.webkitAudioContext)(opts);
        this.tape = tape;
        this.onStartHandler = onStart;
        this.onDataHandler = onData;
        this.onStopHandler = onStop;
        this.onErrorHandler = onError;
        // 绑定输入
        this.bindTape();
    }
    /**
     * 销毁 TapRecorder 前主动调用，用来取消绑定事件
     */
    TapeRecorder.prototype.destroy = function () {
        this.stop();
        // 拔下输入源
        if (this.originSource && this.gainNode && this.scriptProcessor) {
            try {
                this.originSource.disconnect(this.gainNode);
                this.gainNode.disconnect();
                this.scriptProcessor.disconnect();
            }
            catch (e) {
                // 重复调用 diconnect，可能重复 stop
            }
        }
        // 关闭 context
        if (this.context && this.context.state !== 'closed') {
            this.context.close().catch(function (e) {
                console.log(e);
            });
        }
        if (this.tape) {
            this.tape.removeEventListener('play', this.start);
            this.tape.removeEventListener('pause', this.stop);
            this.tape.removeEventListener('ended', this.stop);
            this.tape.removeEventListener('abort', this.stop);
            this.tape.removeEventListener('canplay', this.canPlayHandle);
        }
    };
    /**
     * 设置音量增益大小
     * @param val 最小值约-3.4，最大约3.4
     */
    TapeRecorder.prototype.setGain = function (val) {
        if (this.gainNode) {
            this.gainNode.gain.value = val;
        }
    };
    /**
     * 绑定输入
     */
    TapeRecorder.prototype.bindTape = function () {
        if (!this.tape)
            return;
        this.tape.addEventListener('play', this.start);
        this.tape.addEventListener('pause', this.delayStop);
        this.tape.addEventListener('ended', this.stop);
        this.tape.addEventListener('abort', this.abort);
        this.tape.addEventListener('canplay', this.canPlayHandle);
    };
    return TapeRecorder;
}());

/**
 * 语音数据包
 */
var NlsAudioPack = /** @class */ (function () {
    /**
     * 构造函数
     * @param chunk 语音数据 buffer
     */
    function NlsAudioPack(chunk) {
        this.chunk = chunk;
    }
    /**
     * 转化为语音流
     * @return 二进制包
     */
    NlsAudioPack.prototype.package = function () {
        return new Blob([this.chunk], {
            type: 'audio/pcm',
        });
    };
    return NlsAudioPack;
}());

var resampler_min = createCommonjsModule(function (module) {
module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n});},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var a in e)t.d(n,a,function(r){return e[r]}.bind(null,a));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){function n(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var a=function(){var e=this;this.init=function(){return new Promise((function(r,t){if(!e.originalSampleRate){var n=new(window.AudioContext||window.webkitAudioContext),a=n.sampleRate;n.close(),e.originalSampleRate=a;}e.worker=new Worker(e.workerUrl),e.messageHandler=function(t){switch(t.data.message){case"ready":r();break;case"page":e.onDataHandler(t.data.page);break;case"done":e.messageHandler&&(e.worker&&e.worker.removeEventListener("message",e.messageHandler),e.messageHandler=null);}},e.worker.addEventListener("message",e.messageHandler),e.worker.postMessage({command:"init",originalSampleRate:e.originalSampleRate,encoderSampleRate:e.sampleRate,resampleQuality:10});}))},this.feed=function(r){e.worker&&e.worker.postMessage({command:"encode",buffers:r});},this.destroy=function(){e.worker&&(e.worker.postMessage({command:"done"}),e.worker.postMessage({command:"close"}));};};r.default=function e(r,t,o){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=i.originalSampleRate;n(this,e),a.call(this),this.workerUrl=r,this.onDataHandler=o,this.sampleRate=t,this.originalSampleRate=s;};}]);
});

var Resampler = unwrapExports(resampler_min);

/**
 * 实时识别回调事件名
 */
var RecognitionHandlerEventType = /** @class */ (function (_super) {
    __extends(RecognitionHandlerEventType, _super);
    function RecognitionHandlerEventType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 开始识别 */
        _this.started = 'started';
        /** 检测到了一句话的开始 */
        _this.sentenceBegin = 'sentenceBegin';
        /** 中间识别结果 */
        _this.sentenceChanged = 'sentenceChanged';
        /** 检测到了一句话的结束 */
        _this.sentenceEnd = 'sentenceEnd';
        /** 结束识别 */
        _this.completed = 'completed';
        /** 识别数据传输 */
        _this.dating = 'dating';
        return _this;
    }
    return RecognitionHandlerEventType;
}(NlsHandlerEventType));

/**
 * 探测级别
 */
var DetectorLevel;
(function (DetectorLevel) {
    /**
     * mediaDevices、https（除以上还包含大于 level 0 的所有级别）
     */
    DetectorLevel[DetectorLevel["DetectorLevel0"] = 0] = "DetectorLevel0";
    /**
     * AudioContext（除以上还包含大于 level 1 的所有级别）
     */
    DetectorLevel[DetectorLevel["DetectorLevel1"] = 1] = "DetectorLevel1";
    /**
     * 系统支持度。（移动端存在支持 API，但是功能不正常的情况，手动排除掉）
     */
    DetectorLevel[DetectorLevel["DetectorLevel2"] = 2] = "DetectorLevel2";
})(DetectorLevel || (DetectorLevel = {}));
/**
 * 浏览器环境探测
 * 判断环境是否支持 SDK 运行
 * @param level 探测级别
 */
function detector(level) {
    if (level === void 0) { level = DetectorLevel.DetectorLevel0; }
    // level 2
    if (level <= DetectorLevel.DetectorLevel2) {
        // Android version < 7
        var version = getAndroidVersion();
        if (version !== null && version < 7) {
            throw new NLSError('Android 版本无法正常运行语音 SDK，请使用 Android 7.0 及以上版本访问', NLSErrorType.PoolAndroid);
        }
    }
    // level 1
    if (level <= DetectorLevel.DetectorLevel1) {
        // AudioContext
        // if (!(window.AudioContext || window.webkitAudioContext)) {
        //     throw new NLSError('该浏览器不支持 AudioContext', NLSErrorType.NoAudioContext);
        // }
    }
    // level 0
    if (level <= DetectorLevel.DetectorLevel0) {
        // 是否是不安全的环境
        // 不安全环境可能无法使用麦克风，导致 API 录制音频失败
        // getUserMedia() no longer works on insecure origins.
        // To use this feature, you should consider switching your application to a secure origin,
        // such as HTTPS. See https://goo.gl/rStTGz for more details.
        if (location.protocol === 'http:') {
            var host = location.host.split(':')[0];
            if (host !== 'localhost'
                && host !== '127.0.0.1') {
                throw new NLSError('请使用 ssl 协议保证环境安全，比如："https:"', NLSErrorType.NoSSL);
            }
        }
        // mediaDevices
        if (!((navigator.webkitGetUserMedia) ||
            (navigator.mediaDevices && navigator.mediaDevices.getUserMedia))) {
            throw new NLSError('该浏览器不支持 mediaDevices', NLSErrorType.NoMediaDevices);
        }
        // // webassembly
        // if (!(window as any).WebAssembly) {
        //   throw new NLSError('该浏览器不支持 WebAssembly', NLSErrorType.NoWebAssembly);
        // }
    }
}
/**
 * 获取 Android 版本号
 * @return Android 版本号
 */
function getAndroidVersion() {
    // var ua = navigator.userAgent.toLowerCase();
    var ua = "mozilla/5.0 (macintosh; intel mac os x 11_2_2) applewebkit/537.36 (khtml, like gecko) chrome/89.0.4389.90 safari/537.36"
    var version = null;
    if (ua.indexOf('android') > 0) {
        var reg = /android [\d._]+/gi;
        var vInfo = ua.match(reg);
        // 得到版本号4.2.2
        var versionStr = (vInfo + '')
            .replace(/[^0-9|_.]/ig, '')
            .replace(/_/ig, '.');
        // 得到版本号第一位
        version = parseInt(versionStr.split('.')[0], 10);
    }
    return version;
}
/**
 * 获取浏览器类型
 */
function getBrowser$1() {
    // var userAgent = window.navigator.userAgent; // 取得浏览器的userAgent字符串
    var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"

    var isOpera = userAgent.indexOf('Opera') > -1;
    if (isOpera) {
        return 'Opera';
    } // 判断是否Opera浏览器
    if (userAgent.indexOf('Firefox') > -1) {
        return 'FF';
    } // 判断是否Firefox浏览器
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome';
    }
    if (userAgent.indexOf('Safari') > -1) {
        return 'Safari';
    } // 判断是否Safari浏览器
    if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        return 'IE';
    } // 判断是否IE浏览器
}
/**
 * 判断浏览器音频采集是否支持指定采样率
 */
function isSampleRateMediaSupport() {
    var detectSampleRate = 16000;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        var context = new AudioContext({
            sampleRate: detectSampleRate,
        });
        context.close();
        return context.sampleRate === detectSampleRate;
    }
    return false;
}
/**
 * 判断浏览器音频采集是否支持 WebAssembly
 */
function isWebAssemblySupport() {
    // webassembly
    if (!window.WebAssembly) {
        return false;
    }
    return true;
}

/**
 * 实时识别
 */
var Recognition = /** @class */ (function (_super) {
    __extends(Recognition, _super);
    /**
     * 构造函数
     * @param options 配置参数
     */
    function Recognition(_a, options) {
        var 
        /** 应用 appkey */
        appkey = _a.appkey, 
        /** 网关地址 */
        server = _a.server, 
        /** 设备 id */
        deviceId = _a.deviceId, 
        /** token 配置 */
        accessToken = _a.accessToken, 
        /** @deprecated token 获取函数 */
        getAccessToken = _a.getAccessToken, 
        /** 流程插件 */
        plugin = _a.plugin;
        var _this = _super.call(this, {
            appkey: appkey,
            server: server,
            deviceId: deviceId,
            accessToken: accessToken,
            getAccessToken: getAccessToken,
        }) || this;
        /** 配置参数 */
        _this.options = {
            type: 'mic',
            sampleRate: 16000,
        };
        /** 录音工具 */
        _this.recorder = null;
        /** 可以接受语音流 */
        _this.isReady = false;
        /** 降采样模块 */
        _this.resampler = null;
        /** 关闭锁，发送关闭消息，到收到结束 close socket 之间有一段时间，锁住待关闭完后再继续处理 */
        _this.closingLock = false;
        /** 是否正在识别，事件状态，重连时补齐事件用 */
        _this.isRecognizing = false;
        _this.recognizingIndex = -1;
        _this.recognizingResult = '';
        /** 最大重连次数 */
        _this.maxReConnectTimes = 5;
        /** 重连剩余次数 */
        _this.reconnectTimesLast = _this.maxReConnectTimes;
        /** 语音队列 */
        _this.chuckQueue = null;
        /** 能否重连 */
        _this.canReconnect = true;
        /** 高级浏览器环境判断 */
        _this.highLevelBrowser = false; // 可以支持直接指定采样率录制
        /** 低级浏览器环境判断 */
        _this.lowLevelBrowser = false; // 不支持 WebAssembly 来降采样
        /**
         * 设置识别状态
         * @param isIng 是否正在进行
         * @param index 索引
         * @param result 结果
         */
        _this.setRecognizingStatus = function (isIng, index, result) {
            _this.isRecognizing = isIng;
            _this.recognizingIndex = index || -1;
            _this.recognizingResult = result || '';
        };
        /**
         * 初始化环境
         * @param callback 初始化完毕回调函数
         */
        _this.initEnv = function () {
            if (_this.resamplerClang) {
                return _this.resamplerClang.init();
            }
            else {
                return Promise.resolve();
            }
        };
        /**
         * 发送开始识别指令（网关连上后自动调用开始）
         */
        _this.sendStartMessage = function () {
            // 发送开始识别指令
            Log$1.log('发送开始识别指令，本次 taskId ', _this.taskId);
            if (_this.command) {
                var formatSettings = {
                    format: 'pcm',
                };
                // 自定义启动参数
                var customOptions = _this.getPlugin().defaultOptions || {};
                _this.sendMessage(_this.command.getCommand(_this.command.type.StartRecognition, __assign({}, _this.options, formatSettings, customOptions)));
            }
        };
        /**
         * 发送停止识别指令
         */
        _this.sendStopMessage = function () {
            if (!_this.isReady) {
                return;
            }
            // 发送停止识别指令
            Log$1.log('发送停止识别指令');
            _this.isReady = false;
            _this.closingLock = true;
            if (_this.command) {
                _this.sendMessage(_this.command.getCommand(_this.command.type.StopRecognition));
            }
        };
        /**
         * 录音数据回调
         * @param AudioBuffer 语音数据 audioBuffer
         */
        _this.onRecordData = function (audioBuffer) {
            if (_this.highLevelBrowser) {
                // 支持直接指定采样率
                var buffer = audioBuffer.getChannelData(0);
                _this.onRecordL16Data(_this.floatTo16BitPCM(buffer));
            }
            else {
                if (_this.resamplerClang) {
                    // 使用 clang 模块降采样
                    var buffers = [];
                    for (var i = 0; i < audioBuffer.numberOfChannels; i++) {
                        buffers[i] = audioBuffer.getChannelData(i);
                    }
                    _this.resamplerClang.feed(buffers);
                }
                else {
                    // 初始化 resampler
                    if (_this.resampler === null) {
                        _this.resampler = new ResamplerL16({
                            sourceSampleRate: audioBuffer.sampleRate,
                            targetSampleRate: _this.options.sampleRate,
                            onReSample: _this.onRecordL16Data,
                        });
                    }
                    // 降采样
                    _this.resampler.downSample(audioBuffer);
                }
            }
        };
        /**
         * to 16bit
         */
        _this.floatTo16BitPCM = function (buffer) {
            var inPut16 = new DataView(new ArrayBuffer(buffer.length * 2));
            for (var i = 0; i < buffer.length; i++) {
                // 16-bit signed range is -32768 to 32767
                var multiplier = buffer[i] < 0 ? 0x8000 : 0x7fff;
                // index, value ("| 0" = convert to 32-bit int, round towards 0), littleEndian.
                inPut16.setInt16(i * 2, (buffer[i] * multiplier) | 0, true);
            }
            var chunk = new Uint8Array(inPut16.buffer.byteLength);
            chunk.set(new Uint8Array(inPut16.buffer), 0);
            return chunk;
        };
        /**
         * 目标采样数据回调
         * @param Uint8Array 语音数据 chunk
         */
        _this.onRecordL16Data = function (chunk) {
            if (_this.isReady) {
                // 检查队列
                if (_this.chuckQueue) {
                    if (_this.chuckQueue.byteLength > 6500) {
                        Log$1.log("\u961F\u5217\u4E2D\u6709\u8BED\u97F3\u6D41\u6570\u636E\uFF0C\u5927\u5C0F\u8FC7\u5927\uFF08" + _this.chuckQueue.byteLength + "B\uFF09\uFF0C\u820D\u5F03");
                    }
                    else {
                        Log$1.log('队列中有语音流数据，合并数据');
                        var buffer = appendBuffer(_this.chuckQueue.buffer, chunk.buffer);
                        chunk = new Uint8Array(buffer);
                    }
                    // 清除队列
                    _this.chuckQueue = null;
                }
                // 发送语音流
                // Log.log('>>> 发送语音流');
                _this.sendAudio(new NlsAudioPack(chunk));
                // 回调给外部
                _this.eventBus.emit(_this.handler.dating, chunk.buffer);
            }
            else if (_this.canQueue()) {
                Log$1.log('链接未 ready，语音流进队列');
                if (_this.chuckQueue) {
                    var buffer = appendBuffer(_this.chuckQueue.buffer, chunk.buffer);
                    _this.chuckQueue = new Uint8Array(buffer);
                }
                else {
                    _this.chuckQueue = chunk;
                }
            }
        };
        /**
         * 录音错误回调
         * @param err 错误信息
         */
        _this.onRecordError = function (err) {
            Log$1.error(err);
            var error = new NLSError('获取录音权限失败，无法使用语音识别功能', NLSErrorType.RecordError);
            Log$1.error('录音错误', error);
            _this.eventBus.emit(_this.handler.error, error, error.message, error.code);
            throw error;
        };
        _this.highLevelBrowser = isSampleRateMediaSupport();
        _this.lowLevelBrowser = !isWebAssemblySupport();
        if (plugin) {
            Log$1.log('加载插件');
            _this.plugin = plugin;
        }
        if (_this.plugin && _this.plugin.setup) {
            // call setup hook
            _this.plugin.setup();
        }
        Log$1.log('SDK 配置', options);
        _this.options = Object.assign(_this.options, options || {});
        if (_this.options.enableReConnect === false) {
            Log$1.log('关闭重连');
            _this.maxReConnectTimes = 0;
            _this.reconnectTimesLast = _this.maxReConnectTimes;
        }
        _this.event = new RecognitionEvent();
        _this.handler = new RecognitionHandlerEventType();
        // 自定义事件
        _this.setupEvent();
        // 自定义函数
        _this.setupMethods();
        if (!_this.highLevelBrowser
            && !_this.lowLevelBrowser
            && _this.options.resamplerWorker) {
            // 指定了 resampler worker，使用 pcm clang 降采样模块
            Log$1.log('加载降采样 clang');
            _this.resamplerClang = new Resampler(_this.options.resamplerWorker, _this.options.sampleRate || 16000, _this.onRecordL16Data, {});
        }
        return _this;
    }
    /** 获取 plugin */
    Recognition.prototype.getPlugin = function () {
        return this.plugin || {};
    };
    /** 自定义 setup event */
    Recognition.prototype.setupEvent = function () {
        // setup event namespace
        var customNamespace = this.getPlugin().namespace;
        if (customNamespace) {
            this.event.namespace = customNamespace;
        }
        // setup event type
        var customEvent = this.getPlugin().event;
        if (customEvent) {
            if (customEvent.RecognitionStarted) {
                this.event.type.RecognitionStarted = customEvent.RecognitionStarted;
            }
            if (customEvent.RecognitionResultChanged) {
                this.event.type.RecognitionResultChanged = customEvent.RecognitionResultChanged;
            }
            if (customEvent.RecognitionCompleted) {
                this.event.type.RecognitionCompleted = customEvent.RecognitionCompleted;
            }
            if (customEvent.SentenceBegin) {
                this.event.type.SentenceBegin = customEvent.SentenceBegin;
            }
            if (customEvent.SentenceEnd) {
                this.event.type.SentenceEnd = customEvent.SentenceEnd;
            }
        }
    };
    /** 自定义 setup command */
    Recognition.prototype.setupCommand = function () {
        // setup command namespace
        var customNamespace = this.getPlugin().namespace;
        if (customNamespace && this.command) {
            this.command.namespace = customNamespace;
        }
        // setup command type
        var customCommand = this.getPlugin().command;
        if (customCommand && this.command) {
            if (customCommand.StartRecognition) {
                this.command.type.StartRecognition = customCommand.StartRecognition;
            }
            if (customCommand.StopRecognition) {
                this.command.type.StopRecognition = customCommand.StopRecognition;
            }
        }
    };
    /** 自定义 setup methods */
    Recognition.prototype.setupMethods = function () {
        var _this = this;
        // setup methods type
        var customMethods = this.getPlugin().methods;
        if (customMethods) {
            Object
                .keys(customMethods)
                .forEach((function (fnName) {
                var fn = customMethods[fnName];
                _this[fnName] = function () {
                    var args = Array.prototype.slice.apply(arguments);
                    args.push(this);
                    fn.apply(this, args);
                };
            }));
        }
    };
    /**
     * 原始数据类型可排队
     */
    Recognition.prototype.canQueue = function () {
        return true;
    };
    /**
     * 初始化 command
     */
    Recognition.prototype.initCommand = function () {
        this.command = new RecognitionCommand({
            deviceId: this.deviceId,
            taskId: this.taskId,
            appkey: this.appkey,
            optionsFormat: this.getPlugin().optionsFormat,
            parseCommand: this.getPlugin().parseCommand,
            instance: this,
        });
        // 自定义指令
        this.setupCommand();
    };
    /**
     * 开始识别
     */
    Recognition.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var input;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // 环境初始化
                    return [4 /*yield*/, this.initEnv()];
                    case 1:
                        // 环境初始化
                        _a.sent();
                        // 清除队列
                        this.chuckQueue = null;
                        // 重置重连标示
                        this.canReconnect = true;
                        if (this.options.type === 'audio') {
                            if (!(this.options.input instanceof HTMLMediaElement)) {
                                throw new NLSError('audio 模式 input 不能为空，必须要为 HTMLMediaElement 类型', NLSErrorType.LostParam);
                            }
                            // audio 输入源
                            this.recorder = new TapeRecorder({
                                tape: this.options.input,
                                sampleRate: this.options.sampleRate,
                                onData: this.onRecordData,
                                onError: this.onRecordError,
                                onStart: function () {
                                    // 存储 audioNode 对象
                                    if (_this.recorder && _this.recorder.source) {
                                        Log$1.log('输出 audio 自定义对象', _this.recorder.source, _this.recorder.context);
                                        _this.audioNode = _this.recorder.source;
                                        _this.audioContext = _this.recorder.context;
                                    }
                                    // 开始连接
                                    Log$1.log('接入 audio 源');
                                    if (_this.closingLock) {
                                        _this.closingLockDelayPoll = function () { return _this.connectService(); };
                                    }
                                    else {
                                        _this.connectService();
                                    }
                                    // 初始化 command
                                    _this.initCommand();
                                },
                                onStop: function () {
                                    // 结束连接
                                    Log$1.log('停止接入 audio 源');
                                    _this.sendStopMessage();
                                },
                            });
                        }
                        else {
                            input = typeof this.options.input === 'string' ?
                                this.options.input :
                                undefined;
                            // mic 输入源
                            this.recorder = new Recorder({
                                deviceId: input,
                                sampleRate: this.options.sampleRate,
                                onGetPermission: function () {
                                    // 存储 audioNode 对象
                                    if (_this.recorder && _this.recorder.source) {
                                        Log$1.log('输出 audio 自定义对象', _this.recorder.source, _this.recorder.context);
                                        _this.audioNode = _this.recorder.source;
                                        _this.audioContext = _this.recorder.context;
                                    }
                                    // 开始连接
                                    _this.connectService();
                                    // 初始化 command
                                    _this.initCommand();
                                },
                                onData: this.onRecordData,
                                onError: this.onRecordError,
                            });
                            // 开始录音
                            Log$1.log('开始录音');
                            this.recorder.start();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 结束识别
     */
    Recognition.prototype.stop = function () {
        // 停止录音，这里也停止一次，防止消息回不来，外部又不能手动停
        if (this.recorder instanceof Recorder) {
            Log$1.log('停止录音');
            this.recorder.stop();
        }
        if (this.recorder instanceof TapeRecorder) {
            Log$1.log('停止 Audio 绑定');
            this.recorder.destroy();
        }
        if (this.resamplerClang) {
            Log$1.log('停止 Resampler Worker');
            this.resamplerClang.destroy();
        }
        // 发送停止识别指令
        this.sendStopMessage();
    };
    /**
     * 设置音量增益大小
     * @param val 最小值约-3.4，最大约3.4
     */
    Recognition.prototype.setGain = function (val) {
        if (this.recorder) {
            this.recorder.setGain(val);
        }
    };
    /**
     * 中途断开重连
     */
    Recognition.prototype.restart = function (code, msg) {
        var _this = this;
        if (code === void 0) { code = -1; }
        if (msg === void 0) { msg = '未知原因'; }
        Log$1.log('尝试重连...剩余次数', this.reconnectTimesLast, "[" + code + "] " + msg);
        this.eventBus.emit(this.handler.reconnect, code, msg, this.reconnectTimesLast);
        // 自定义 session update
        if (this.plugin && this.plugin.sessionReset) {
            this.plugin.sessionReset(this);
        }
        //  补充缺失的识别返回结果
        if (this.isRecognizing) {
            var msg_1 = {
                header: {
                    task_id: this.taskId,
                },
                payload: {
                    index: this.recognizingIndex,
                    result: this.recognizingResult,
                    _isReconnect: true,
                },
            };
            Log$1.log("\u3010\u8BC6\u522B\u3011\u3010\u91CD\u8FDE\u6D88\u606F\u8865\u9F50\u3011\u7B2C " + msg_1.payload.index + " \u53E5\u8BDD\u7ED3\u675F:", msg_1.payload.result);
            this.eventBus.emit(this.handler.sentenceEnd, msg_1.payload.index, msg_1.payload.result, msg_1.header.task_id, msg_1);
            this.setRecognizingStatus(false);
        }
        // 尝试重连
        if (this.reconnectTimesLast > 0) {
            setTimeout(function () {
                _this.reconnectTimesLast -= 1;
                _this.connectService();
                // 初始化 command
                _this.initCommand();
            }, 100);
        }
        else {
            // 重连尝试次数过多，抛出错误
            Log$1.log('重连尝试次数过多，抛出错误', code);
            this.onError(new ErrorEvent(msg), msg, code);
            this.reconnectTimesLast = this.maxReConnectTimes;
        }
    };
    /**
     * 成功建连
     */
    Recognition.prototype.onConnected = function () {
        _super.prototype.onConnected.call(this);
        // 开始识别
        this.sendStartMessage();
    };
    /**
     * 收到事件消息
     * @param message 事件消息原始数据
     */
    Recognition.prototype.onData = function (message) {
        var msg = new NlsEventMessage(message.header, message.payload);
        // 处理自定义事件
        if (this.plugin && this.plugin.eventReceived) {
            var isContinue = this.plugin.eventReceived(msg, this);
            if (!isContinue) {
                return;
            }
        }
        // 开始识别
        if (this.event.isEvent(this.event.type.RecognitionStarted, msg)) {
            Log$1.log('开始识别');
            this.isReady = true;
            // 重置重连标示
            this.canReconnect = true;
            this.reconnectTimesLast = this.maxReConnectTimes;
            this.eventBus.emit(this.handler.started, msg.header.task_id, msg);
            return;
        }
        // 检测到了一句话的开始
        if (this.event.isEvent(this.event.type.SentenceBegin, msg)) {
            Log$1.log("\u7B2C " + msg.payload.index + " \u53E5\u8BDD\u5F00\u59CB");
            // 记录状态
            this.setRecognizingStatus(true, msg.payload.index);
            this.eventBus.emit(this.handler.sentenceBegin, msg.payload.index, msg.header.task_id, msg);
            return;
        }
        // 中间识别
        if (this.event.isEvent(this.event.type.RecognitionResultChanged, msg)) {
            Log$1.log("\u4E2D\u95F4\u8BC6\u522B\uFF0C\u7B2C " + msg.payload.index + " \u53E5\u8BDD\u6536\u5230\u7ED3\u679C: " + msg.payload.result + "\n", "  \u3010task_id\u3011: " + msg.header.task_id + "\n");
            // 记录状态
            this.setRecognizingStatus(true, msg.payload.index, msg.payload.result);
            this.eventBus.emit(this.handler.sentenceChanged, msg.payload.index, msg.payload.result, msg.header.task_id, msg);
            return;
        }
        // 检测到了一句话的结束
        if (this.event.isEvent(this.event.type.SentenceEnd, msg)) {
            Log$1.log("\u3010\u8BC6\u522B\u3011\u7B2C " + msg.payload.index + " \u53E5\u8BDD\u7ED3\u675F: " + msg.payload.result + "\n", "  \u3010task_id\u3011: " + msg.header.task_id + "\n");
            // 记录状态
            this.setRecognizingStatus(false);
            this.eventBus.emit(this.handler.sentenceEnd, msg.payload.index, msg.payload.result, msg.header.task_id, msg);
            return;
        }
        // 结束识别
        if (this.event.isEvent(this.event.type.RecognitionCompleted, msg)) {
            Log$1.log('结束识别');
            this.isReady = false;
            this.eventBus.emit(this.handler.completed, msg.header.task_id, msg);
            // 停止录音
            if (this.recorder instanceof Recorder) {
                this.recorder.stop();
            }
            // 断开连接
            this.closeService();
            this.closingLock = false;
            // 检查延迟处理事件
            if (this.closingLockDelayPoll) {
                this.closingLockDelayPoll();
                this.closingLockDelayPoll = undefined;
            }
            return;
        }
        _super.prototype.onData.call(this, message);
    };
    /**
     * 收到错误消息
     * @param error 错误消息原始数据
     * @param detail 错误详情
     * @param code 错误码
     */
    Recognition.prototype.onError = function (error, detail, code) {
        // 停止当前识别
        this.isReady = false;
        if (code === undefined && !this.isReady) {
            if (this.canReconnect) {
                Log$1.log('无状态码连接断开', '准备重连');
                this.restart();
            }
        }
        else {
            this.canReconnect = false;
            this.stop();
            _super.prototype.onError.call(this, error, detail, code);
        }
    };
    /**
     * 断开连接
     * @param ev 关闭消息
     */
    Recognition.prototype.onDisConnect = function (ev) {
        // 1006 异常断开，chrome 70 1006 断网断开还会返回 1000
        // 1006 是服务端主动断开，但是返回错误的情况下，服务端也会断开
        // 异常断开指服务端未返回错误，但是又断开 ws 链接的情况
        if ((ev.code === 1006 || ev.code === 1000) && this.isReady) {
            // 此时 ws 已经断开，收不到 stoped 事件，所以不需要 stop，直接重启 ws
            ev._isReconnect = true;
            // 停止当前识别
            this.isReady = false;
            Log$1.log(ev.code, '连接断开', '准备重连');
            this.restart(ev.code, '连接断开');
            return;
        }
        _super.prototype.onDisConnect.call(this, ev);
    };
    return Recognition;
}(Speech));

// 人机交互支持参数
var rapidFixrecognitionParams = [{
        // 打卡词级别信息
        key: 'enableWordLevelResults',
        type: 'boolean',
    }, {
        // 采样率
        key: 'sampleRate',
        type: 'number',
    }, {
        // 格式
        key: 'format',
        type: 'string',
    }, {
        // 热词
        key: 'vocabulary',
        type: 'object',
    }, {
        // 泛热词ID
        key: 'vocabularyId',
        type: 'string',
    }, {
        // 定制类热词
        key: 'classVocabularyId',
        type: 'object',
    }, {
        // 模型
        key: 'model',
        type: 'string',
    }, {
        // 定制模型
        key: 'customizationId',
        type: 'string',
    }, {
        // 声学模型
        key: 'alsAmId',
        type: 'string',
    }, {
        // 中间识别
        key: 'enableIntermediateResult',
        type: 'boolean',
    }, {
        // 添加标点
        key: 'enablePunctuationPrediction',
        type: 'boolean',
    }, {
        // 文本规整
        key: 'enableInverseTextNormalization',
        type: 'boolean',
    }, {
        // 语义断句
        key: 'enableSemanticSentenceDetection',
        type: 'boolean',
    }, {
        // 语音检测
        key: 'enableVoiceDetection',
        type: 'boolean',
    }, {
        // 允许的最大开始静音，需先设置 enableVoiceDetection
        key: 'maxStartSilence',
        type: 'number',
    }, {
        // 允许的最大结束静音，需先设置 enableVoiceDetection
        key: 'maxEndSilence',
        type: 'number',
    }, {
        // 输出更多识别结果信息
        key: 'enableRichResult',
        type: 'boolean',
    }, {
        // 自定义分段分隔符
        key: 'segmterStr',
        type: 'string',
    }, {
        // 允许返回的 alternate 结果数量
        key: 'maxAlternates',
        type: 'number',
    }, {
        // 是否开启转写文本后处理
        key: 'enableUnifyPost',
        type: 'boolean',
    }, {
        // 统一后处理使用的模型
        key: 'unifyPostModelName',
        type: 'string',
    }, {
        // 是否开启顺滑
        key: 'disfluency',
        type: 'boolean',
    }, {
        // 超时时间，单位毫秒
        key: 'timeoutMillis',
        type: 'number',
    }];

/**
 * 实时识别指令类型
 */
var RapidFixRecognitionCommandType = /** @class */ (function (_super) {
    __extends(RapidFixRecognitionCommandType, _super);
    function RapidFixRecognitionCommandType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 开始识别 */
        _this.StartTask = 'StartTask';
        /** 停止识别 */
        _this.StopTask = 'StopTask';
        return _this;
    }
    return RapidFixRecognitionCommandType;
}(NlsCommandType));
/**
 * 实时识别指令
 */
var RapidFixRecognitionCommand = /** @class */ (function (_super) {
    __extends(RapidFixRecognitionCommand, _super);
    /**
     * 构造函数
     */
    function RapidFixRecognitionCommand(_a) {
        var 
        /** 设备 id */
        deviceId = _a.deviceId, 
        /** 任务 id */
        taskId = _a.taskId, 
        /** 应用 appkey */
        appkey = _a.appkey, 
        /** 识别实例 */
        instance = _a.instance, 
        /** 配置格式化钩子 */
        optionsFormat = _a.optionsFormat, 
        /** 自定义命令钩子 */
        parseCommand = _a.parseCommand;
        var _this = _super.call(this, {
            deviceId: deviceId,
            taskId: taskId,
            appkey: appkey,
        }) || this;
        /** @override 命名空间 */
        _this.namespace = 'RapidFixSpeechRecognizer';
        /** 指令类型 */
        _this.type = new RapidFixRecognitionCommandType();
        _this.instance = instance;
        _this.optionsFormat = optionsFormat;
        _this.parseCommand = parseCommand;
        return _this;
    }
    /**
     * 解析配置参数
     * @param extra 需要解析的参数
     * @param settings 默认配置
     * @return 解析后的参数
     */
    RapidFixRecognitionCommand.prototype.parseOptions = function (extra, settings) {
        if (settings === void 0) { settings = {}; }
        var config = Object.assign({}, settings);
        // 热词 [老，推荐使用 vocabulary] deprecated
        if (typeof extra.hotWords === 'object') {
            Log$1.warn('hotWords 参数不再被支持，推荐使用 vocabulary');
            config.vocabulary = extra.hotWords;
        }
        // 参数配置转化
        rapidFixrecognitionParams.forEach(function (_paramItem) {
            // number
            if (_paramItem.type === 'number'
                && typeof extra[_paramItem.key] === 'number') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
            // string
            if (_paramItem.type === 'string'
                && typeof extra[_paramItem.key] === 'string'
                && extra[_paramItem.key] !== '') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
            // object
            if (_paramItem.type === 'object'
                && typeof extra[_paramItem.key] === 'object') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
            // boolean
            if (_paramItem.type === 'boolean' && typeof extra[_paramItem.key] === 'boolean') {
                config[hump2Line(_paramItem.key)] = extra[_paramItem.key];
            }
        });
        // 获取钩子配置
        if (this.optionsFormat) {
            config = this.optionsFormat(extra, config);
        }
        return config;
    };
    /**
     * 获取指令消息
     * @param command 实时识别指令类型
     * @param extra 指令的额外参数
     * @return 指令消息
     */
    RapidFixRecognitionCommand.prototype.getCommand = function (command, extra) {
        switch (command) {
            // 开始识别
            case this.type.StartTask:
                var config = this.parseOptions(extra || {});
                return new NlsCommandMessage({
                    task_id: this.taskId,
                    message_id: getUUID(),
                    namespace: this.namespace,
                    name: this.type.StartTask,
                    appkey: this.appkey,
                }, config, {
                    device: {
                        uuid: this.deviceId,
                    },
                });
            // 结束识别
            case this.type.StopTask:
                return new NlsCommandMessage({
                    task_id: this.taskId,
                    message_id: getUUID(),
                    namespace: this.namespace,
                    name: this.type.StopTask,
                    appkey: this.appkey,
                }, null, {
                    device: {
                        uuid: this.deviceId,
                    },
                });
            default:
                // 获取自定义命令
                if (this.parseCommand) {
                    var customCommand = this.parseCommand(command, extra, this.instance);
                    if (customCommand) {
                        return new NlsCommandMessage({
                            task_id: this.taskId,
                            message_id: getUUID(),
                            namespace: this.namespace,
                            name: customCommand.name,
                            appkey: this.appkey,
                        }, customCommand.data, {
                            device: {
                                uuid: this.deviceId,
                            },
                        });
                    }
                }
                // 未知指令
                throw new NLSError("undefined command: " + command, NLSErrorType.UnkownCommand);
        }
    };
    return RapidFixRecognitionCommand;
}(NlsCommand));

/**
 * 实时识别事件类型
 */
var RapidFixRecognitionEventType = /** @class */ (function (_super) {
    __extends(RapidFixRecognitionEventType, _super);
    function RapidFixRecognitionEventType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 识别开始 */
        _this.TaskStarted = 'TaskStarted';
        /** 中间识别结果 */
        _this.ResultChanged = 'ResultChanged';
        /** 结束识别 */
        _this.TaskCompleted = 'TaskCompleted';
        return _this;
    }
    return RapidFixRecognitionEventType;
}(NlsEventType));
/**
 * 实时识别事件
 */
var RecognitionEvent$1 = /** @class */ (function (_super) {
    __extends(RecognitionEvent, _super);
    function RecognitionEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @override 命名空间 */
        _this.namespace = 'RapidFixSpeechRecognizer';
        /** @override 消息类型 */
        _this.type = new RapidFixRecognitionEventType();
        return _this;
    }
    return RecognitionEvent;
}(NlsEvent));

/**
 * 实时识别回调事件名
 */
var RapidFixRecognitionHandlerEventType = /** @class */ (function (_super) {
    __extends(RapidFixRecognitionHandlerEventType, _super);
    function RapidFixRecognitionHandlerEventType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 开始识别 */
        _this.started = 'started';
        /** 中间识别结果 */
        _this.resultChanged = 'resultChanged';
        /** 结束识别 */
        _this.completed = 'completed';
        /** 识别数据传输 */
        _this.dating = 'dating';
        return _this;
    }
    return RapidFixRecognitionHandlerEventType;
}(NlsHandlerEventType));

/**
 * 人机协作
 */
var RapidFixRecognition = /** @class */ (function (_super) {
    __extends(RapidFixRecognition, _super);
    /**
     * 构造函数
     * @param options 配置参数
     */
    function RapidFixRecognition(_a, options) {
        var 
        /** 应用 appkey */
        appkey = _a.appkey, 
        /** 网关地址 */
        server = _a.server, 
        /** 设备 id */
        deviceId = _a.deviceId, 
        /** token 配置 */
        accessToken = _a.accessToken, 
        /** @deprecated token 获取函数 */
        getAccessToken = _a.getAccessToken, 
        /** 流程插件 */
        plugin = _a.plugin;
        var _this = _super.call(this, {
            appkey: appkey,
            server: server,
            deviceId: deviceId,
            accessToken: accessToken,
            getAccessToken: getAccessToken,
        }) || this;
        /** 配置参数 */
        _this.options = {
            type: 'mic',
            sampleRate: 16000,
        };
        /** 录音工具 */
        _this.recorder = null;
        /** 可以接受语音流 */
        _this.isReady = false;
        /** 降采样模块 */
        _this.resampler = null;
        /** 关闭锁，发送关闭消息，到收到结束 close socket 之间有一段时间，锁住待关闭完后再继续处理 */
        _this.closingLock = false;
        /** 最大重连次数 */
        _this.maxReConnectTimes = 5;
        /** 重连剩余次数 */
        _this.reconnectTimesLast = _this.maxReConnectTimes;
        /** 语音队列 */
        _this.chuckQueue = null;
        /** 能否重连 */
        _this.canReconnect = true;
        /** 高级浏览器环境判断 */
        _this.highLevelBrowser = false; // 可以支持直接指定采样率录制
        /** 低级浏览器环境判断 */
        _this.lowLevelBrowser = false; // 不支持 WebAssembly 来降采样
        /**
         * 初始化环境
         * @param callback 初始化完毕回调函数
         */
        _this.initEnv = function () {
            if (_this.resamplerClang) {
                return _this.resamplerClang.init();
            }
            else {
                return Promise.resolve();
            }
        };
        /**
         * 发送开始识别指令（网关连上后自动调用开始）
         */
        _this.sendStartMessage = function () {
            // 发送开始识别指令
            Log$1.log('发送开始识别指令，本次 taskId ', _this.taskId);
            if (_this.command) {
                var formatSettings = {
                    format: 'pcm',
                };
                // 自定义启动参数
                var customOptions = _this.getPlugin().defaultOptions || {};
                _this.sendMessage(_this.command.getCommand(_this.command.type.StartTask, __assign({}, _this.options, formatSettings, customOptions)));
            }
        };
        /**
         * 发送停止识别指令
         */
        _this.sendStopMessage = function () {
            if (!_this.isReady) {
                return;
            }
            // 发送停止识别指令
            Log$1.log('发送停止识别指令');
            _this.isReady = false;
            _this.closingLock = true;
            if (_this.command) {
                _this.sendMessage(_this.command.getCommand(_this.command.type.StopTask));
            }
        };
        /**
         * 录音数据回调
         * @param AudioBuffer 语音数据 audioBuffer
         */
        _this.onRecordData = function (audioBuffer) {
            if (_this.highLevelBrowser) {
                // 支持直接指定采样率
                var buffer = audioBuffer.getChannelData(0);
                _this.onRecordL16Data(_this.floatTo16BitPCM(buffer));
            }
            else {
                if (_this.resamplerClang) {
                    // 使用 clang 模块降采样
                    var buffers = [];
                    for (var i = 0; i < audioBuffer.numberOfChannels; i++) {
                        buffers[i] = audioBuffer.getChannelData(i);
                    }
                    _this.resamplerClang.feed(buffers);
                }
                else {
                    // 初始化 resampler
                    if (_this.resampler === null) {
                        _this.resampler = new ResamplerL16({
                            sourceSampleRate: audioBuffer.sampleRate,
                            targetSampleRate: _this.options.sampleRate,
                            onReSample: _this.onRecordL16Data,
                        });
                    }
                    // 降采样
                    _this.resampler.downSample(audioBuffer);
                }
            }
        };
        /**
         * to 16bit
         */
        _this.floatTo16BitPCM = function (buffer) {
            var inPut16 = new DataView(new ArrayBuffer(buffer.length * 2));
            for (var i = 0; i < buffer.length; i++) {
                // 16-bit signed range is -32768 to 32767
                var multiplier = buffer[i] < 0 ? 0x8000 : 0x7fff;
                // index, value ("| 0" = convert to 32-bit int, round towards 0), littleEndian.
                inPut16.setInt16(i * 2, (buffer[i] * multiplier) | 0, true);
            }
            var chunk = new Uint8Array(inPut16.buffer.byteLength);
            chunk.set(new Uint8Array(inPut16.buffer), 0);
            return chunk;
        };
        /**
         * 目标采样数据回调
         * @param Uint8Array 语音数据 chunk
         */
        _this.onRecordL16Data = function (chunk) {
            if (_this.isReady) {
                // 检查队列
                if (_this.chuckQueue) {
                    if (_this.chuckQueue.byteLength > 6500) {
                        Log$1.log("\u961F\u5217\u4E2D\u6709\u8BED\u97F3\u6D41\u6570\u636E\uFF0C\u5927\u5C0F\u8FC7\u5927\uFF08" + _this.chuckQueue.byteLength + "B\uFF09\uFF0C\u820D\u5F03");
                    }
                    else {
                        Log$1.log('队列中有语音流数据，合并数据');
                        var buffer = appendBuffer(_this.chuckQueue.buffer, chunk.buffer);
                        chunk = new Uint8Array(buffer);
                    }
                    // 清除队列
                    _this.chuckQueue = null;
                }
                // 发送语音流
                // Log.log('>>> 发送语音流');
                _this.sendAudio(new NlsAudioPack(chunk));
                // 回调给外部
                _this.eventBus.emit(_this.handler.dating, chunk.buffer);
            }
            else if (_this.canQueue()) {
                Log$1.log('链接未 ready，语音流进队列');
                if (_this.chuckQueue) {
                    var buffer = appendBuffer(_this.chuckQueue.buffer, chunk.buffer);
                    _this.chuckQueue = new Uint8Array(buffer);
                }
                else {
                    _this.chuckQueue = chunk;
                }
            }
        };
        /**
         * 录音错误回调
         * @param err 错误信息
         */
        _this.onRecordError = function (err) {
            Log$1.error(err);
            var error = new NLSError('获取录音权限失败，无法使用语音识别功能', NLSErrorType.RecordError);
            Log$1.error('录音错误', error);
            _this.eventBus.emit(_this.handler.error, error, error.message, error.code);
            throw error;
        };
        _this.highLevelBrowser = isSampleRateMediaSupport();
        _this.lowLevelBrowser = !isWebAssemblySupport();
        if (plugin) {
            Log$1.log('加载插件');
            _this.plugin = plugin;
        }
        if (_this.plugin && _this.plugin.setup) {
            // call setup hook
            _this.plugin.setup();
        }
        Log$1.log('SDK 配置', options);
        _this.options = Object.assign(_this.options, options || {});
        if (_this.options.enableReConnect === false) {
            Log$1.log('关闭重连');
            _this.maxReConnectTimes = 0;
            _this.reconnectTimesLast = _this.maxReConnectTimes;
        }
        _this.event = new RecognitionEvent$1();
        _this.handler = new RapidFixRecognitionHandlerEventType();
        // 自定义事件
        _this.setupEvent();
        // 自定义函数
        _this.setupMethods();
        if (!_this.highLevelBrowser
            && !_this.lowLevelBrowser
            && _this.options.resamplerWorker) {
            // 指定了 resampler worker，使用 pcm clang 降采样模块
            Log$1.log('加载降采样 clang');
            _this.resamplerClang = new Resampler(_this.options.resamplerWorker, _this.options.sampleRate || 16000, _this.onRecordL16Data, {});
        }
        return _this;
    }
    /** 获取 plugin */
    RapidFixRecognition.prototype.getPlugin = function () {
        return this.plugin || {};
    };
    /** 自定义 setup event */
    RapidFixRecognition.prototype.setupEvent = function () {
        // setup event namespace
        var customNamespace = this.getPlugin().namespace;
        if (customNamespace) {
            this.event.namespace = customNamespace;
        }
        // setup event type
        var customEvent = this.getPlugin().event;
        if (customEvent) {
            if (customEvent.TaskStarted) {
                this.event.type.TaskStarted = customEvent.TaskStarted;
            }
            if (customEvent.ResultChanged) {
                this.event.type.ResultChanged = customEvent.ResultChanged;
            }
            if (customEvent.TaskCompleted) {
                this.event.type.TaskCompleted = customEvent.TaskCompleted;
            }
        }
    };
    /** 自定义 setup command */
    RapidFixRecognition.prototype.setupCommand = function () {
        // setup command namespace
        var customNamespace = this.getPlugin().namespace;
        if (customNamespace && this.command) {
            this.command.namespace = customNamespace;
        }
        // setup command type
        var customCommand = this.getPlugin().command;
        if (customCommand && this.command) {
            if (customCommand.StartTask) {
                this.command.type.StartTask = customCommand.StartTask;
            }
            if (customCommand.StopTask) {
                this.command.type.StopTask = customCommand.StopTask;
            }
        }
    };
    /** 自定义 setup methods */
    RapidFixRecognition.prototype.setupMethods = function () {
        var _this = this;
        // setup methods type
        var customMethods = this.getPlugin().methods;
        if (customMethods) {
            Object
                .keys(customMethods)
                .forEach((function (fnName) {
                var fn = customMethods[fnName];
                _this[fnName] = function () {
                    var args = Array.prototype.slice.apply(arguments);
                    args.push(this);
                    fn.apply(this, args);
                };
            }));
        }
    };
    /**
     * 原始数据类型可排队
     */
    RapidFixRecognition.prototype.canQueue = function () {
        return true;
    };
    /**
     * 初始化 command
     */
    RapidFixRecognition.prototype.initCommand = function () {
        this.command = new RapidFixRecognitionCommand({
            deviceId: this.deviceId,
            taskId: this.taskId,
            appkey: this.appkey,
            optionsFormat: this.getPlugin().optionsFormat,
            parseCommand: this.getPlugin().parseCommand,
            instance: this,
        });
        // 自定义指令
        this.setupCommand();
    };
    /**
     * 开始识别
     */
    RapidFixRecognition.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var input;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // 环境初始化
                    return [4 /*yield*/, this.initEnv()];
                    case 1:
                        // 环境初始化
                        _a.sent();
                        // 清除队列
                        this.chuckQueue = null;
                        // 重置重连标示
                        this.canReconnect = true;
                        if (this.options.type === 'audio') {
                            if (!(this.options.input instanceof HTMLMediaElement)) {
                                throw new NLSError('audio 模式 input 不能为空，必须要为 HTMLMediaElement 类型', NLSErrorType.LostParam);
                            }
                            // audio 输入源
                            this.recorder = new TapeRecorder({
                                tape: this.options.input,
                                sampleRate: this.options.sampleRate,
                                onData: this.onRecordData,
                                onError: this.onRecordError,
                                onStart: function () {
                                    // 存储 audioNode 对象
                                    if (_this.recorder && _this.recorder.source) {
                                        Log$1.log('输出 audio 自定义对象', _this.recorder.source, _this.recorder.context);
                                        _this.audioNode = _this.recorder.source;
                                        _this.audioContext = _this.recorder.context;
                                    }
                                    // 开始连接
                                    Log$1.log('接入 audio 源');
                                    if (_this.closingLock) {
                                        _this.closingLockDelayPoll = function () { return _this.connectService(); };
                                    }
                                    else {
                                        _this.connectService();
                                    }
                                    // 初始化 command
                                    _this.initCommand();
                                },
                                onStop: function () {
                                    // 结束连接
                                    Log$1.log('停止接入 audio 源');
                                    _this.sendStopMessage();
                                },
                            });
                        }
                        else {
                            input = typeof this.options.input === 'string' ?
                                this.options.input :
                                undefined;
                            // mic 输入源
                            this.recorder = new Recorder({
                                deviceId: input,
                                sampleRate: this.options.sampleRate,
                                onGetPermission: function () {
                                    // 存储 audioNode 对象
                                    if (_this.recorder && _this.recorder.source) {
                                        Log$1.log('输出 audio 自定义对象', _this.recorder.source, _this.recorder.context);
                                        _this.audioNode = _this.recorder.source;
                                        _this.audioContext = _this.recorder.context;
                                    }
                                    // 开始连接
                                    _this.connectService();
                                    // 初始化 command
                                    _this.initCommand();
                                },
                                onData: this.onRecordData,
                                onError: this.onRecordError,
                            });
                            // 开始录音
                            Log$1.log('开始录音');
                            this.recorder.start();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 结束识别
     */
    RapidFixRecognition.prototype.stop = function () {
        // 停止录音，这里也停止一次，防止消息回不来，外部又不能手动停
        if (this.recorder instanceof Recorder) {
            Log$1.log('停止录音');
            this.recorder.stop();
        }
        if (this.recorder instanceof TapeRecorder) {
            Log$1.log('停止 Audio 绑定');
            this.recorder.destroy();
        }
        if (this.resamplerClang) {
            Log$1.log('停止 Resampler Worker');
            this.resamplerClang.destroy();
        }
        // 发送停止识别指令
        this.sendStopMessage();
    };
    /**
     * 设置音量增益大小
     * @param val 最小值约-3.4，最大约3.4
     */
    RapidFixRecognition.prototype.setGain = function (val) {
        if (this.recorder) {
            this.recorder.setGain(val);
        }
    };
    /**
     * 中途断开重连
     */
    RapidFixRecognition.prototype.restart = function (code, msg) {
        var _this = this;
        if (code === void 0) { code = -1; }
        if (msg === void 0) { msg = '未知原因'; }
        Log$1.log('尝试重连...剩余次数', this.reconnectTimesLast, "[" + code + "] " + msg);
        this.eventBus.emit(this.handler.reconnect, code, msg, this.reconnectTimesLast);
        // 自定义 session update
        if (this.plugin && this.plugin.sessionReset) {
            this.plugin.sessionReset(this);
        }
        // 尝试重连
        if (this.reconnectTimesLast > 0) {
            setTimeout(function () {
                _this.reconnectTimesLast -= 1;
                _this.connectService();
                // 初始化 command
                _this.initCommand();
            }, 100);
        }
        else {
            // 重连尝试次数过多，抛出错误
            Log$1.log('重连尝试次数过多，抛出错误', code);
            this.onError(new ErrorEvent(msg), msg, code);
            this.reconnectTimesLast = this.maxReConnectTimes;
        }
    };
    /**
     * 成功建连
     */
    RapidFixRecognition.prototype.onConnected = function () {
        _super.prototype.onConnected.call(this);
        // 开始识别
        this.sendStartMessage();
    };
    /**
     * 收到事件消息
     * @param message 事件消息原始数据
     */
    RapidFixRecognition.prototype.onData = function (message) {
        var msg = new NlsEventMessage(message.header, message.payload);
        // 处理自定义事件
        if (this.plugin && this.plugin.eventReceived) {
            var isContinue = this.plugin.eventReceived(msg, this);
            if (!isContinue) {
                return;
            }
        }
        // 开始识别
        if (this.event.isEvent(this.event.type.TaskStarted, msg)) {
            Log$1.log('开始识别');
            this.isReady = true;
            // 重置重连标示
            this.canReconnect = true;
            this.reconnectTimesLast = this.maxReConnectTimes;
            this.eventBus.emit(this.handler.started, msg.header.task_id, msg);
            return;
        }
        // 中间识别
        if (this.event.isEvent(this.event.type.ResultChanged, msg)) {
            Log$1.log("\u4E2D\u95F4\u8BC6\u522B\uFF0C\u6536\u5230\u7ED3\u679C: \n\n        " + (msg.payload.sentence_end_result ? msg.payload.sentence_end_result.text : '<empty>') + "|\n        " + (msg.payload.constant_partial_result ? msg.payload.constant_partial_result.text : '<empty>') + "|\n        " + (msg.payload.variable_partial_result ? msg.payload.variable_partial_result.text : '<empty>') + "\n", "  \u3010task_id\u3011: " + msg.header.task_id + "\n");
            this.eventBus.emit(this.handler.resultChanged, msg.payload, msg.header.task_id, msg);
            return;
        }
        // 结束识别
        if (this.event.isEvent(this.event.type.TaskCompleted, msg)) {
            Log$1.log('结束识别');
            this.isReady = false;
            this.eventBus.emit(this.handler.completed, msg.header.task_id, msg);
            // 停止录音
            if (this.recorder instanceof Recorder) {
                this.recorder.stop();
            }
            // 断开连接
            this.closeService();
            this.closingLock = false;
            // 检查延迟处理事件
            if (this.closingLockDelayPoll) {
                this.closingLockDelayPoll();
                this.closingLockDelayPoll = undefined;
            }
            return;
        }
        _super.prototype.onData.call(this, message);
    };
    /**
     * 收到错误消息
     * @param error 错误消息原始数据
     * @param detail 错误详情
     * @param code 错误码
     */
    RapidFixRecognition.prototype.onError = function (error, detail, code) {
        // 停止当前识别
        this.isReady = false;
        if (code === undefined && !this.isReady) {
            if (this.canReconnect) {
                Log$1.log('无状态码连接断开', '准备重连');
                this.restart();
            }
        }
        else {
            this.canReconnect = false;
            this.stop();
            _super.prototype.onError.call(this, error, detail, code);
        }
    };
    /**
     * 断开连接
     * @param ev 关闭消息
     */
    RapidFixRecognition.prototype.onDisConnect = function (ev) {
        // 1006 异常断开，chrome 70 1006 断网断开还会返回 1000
        // 1006 是服务端主动断开，但是返回错误的情况下，服务端也会断开
        // 异常断开指服务端未返回错误，但是又断开 ws 链接的情况
        if ((ev.code === 1006 || ev.code === 1000) && this.isReady) {
            // 此时 ws 已经断开，收不到 stoped 事件，所以不需要 stop，直接重启 ws
            ev._isReconnect = true;
            // 停止当前识别
            this.isReady = false;
            Log$1.log(ev.code, '连接断开', '准备重连');
            this.restart(ev.code, '连接断开');
            return;
        }
        _super.prototype.onDisConnect.call(this, ev);
    };
    return RapidFixRecognition;
}(Speech));

/**
 * 语音合成指令类型
 */
var SynthesisCommandType = /** @class */ (function (_super) {
    __extends(SynthesisCommandType, _super);
    function SynthesisCommandType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 开始合成 */
        _this.StartSynthesis = 'StartSynthesis';
        return _this;
    }
    return SynthesisCommandType;
}(NlsCommandType));
/**
 * 语音合成指令
 */
var SynthesisCommand = /** @class */ (function (_super) {
    __extends(SynthesisCommand, _super);
    function SynthesisCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 命名空间 */
        _this.namespace = 'SpeechSynthesizer';
        /** 指令类型 */
        _this.type = new SynthesisCommandType();
        return _this;
    }
    /**
     * 获取指令消息
     * @param command 语音合成指令类型
     * @param extra 指令的额外参数
     * @return 指令消息
     */
    SynthesisCommand.prototype.getCommand = function (command, extra) {
        switch (command) {
            // 开始合成
            case this.type.StartSynthesis:
                return new NlsCommandMessage({
                    task_id: this.taskId,
                    message_id: getUUID(),
                    namespace: this.namespace,
                    name: this.type.StartSynthesis,
                    appkey: this.appkey,
                }, {
                    text: typeof extra.text === 'string' ? extra.text : '',
                    voice: typeof extra.voice === 'string'
                        ? extra.voice
                        : 'aiqi',
                    format: 'mp3',
                    sample_rate: extra.sampleRate,
                    volume: typeof extra.volume === 'number' ? extra.volume : 50,
                    speech_rate: typeof extra.speechRate === 'number' ? extra.speechRate : 0,
                    pitch_rate: typeof extra.pitchRate === 'number' ? extra.pitchRate : 0,
                    enable_subtitle: typeof extra.enableSubtitle === 'boolean'
                        ? extra.enableSubtitle
                        : undefined,
                }, {
                    device: {
                        uuid: this.deviceId,
                    },
                });
            default:
                throw new NLSError("undefined command: " + command, NLSErrorType.UnkownCommand);
        }
    };
    return SynthesisCommand;
}(NlsCommand));

/**
 * 语音合成事件类型
 */
var SynthesisEventType = /** @class */ (function (_super) {
    __extends(SynthesisEventType, _super);
    function SynthesisEventType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 合成结束 */
        _this.SynthesisCompleted = 'SynthesisCompleted';
        /** 播放结束 */
        _this.SynthesisPlayEnded = 'SynthesisPlayEnded';
        /** MetaInfo 事件 */
        _this.SynthesisMetaInfo = 'MetaInfo';
        return _this;
    }
    return SynthesisEventType;
}(NlsEventType));
/**
 * 语音合成事件
 */
var SynthesisEvent = /** @class */ (function (_super) {
    __extends(SynthesisEvent, _super);
    function SynthesisEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @override 命名空间 */
        _this.namespace = 'SpeechSynthesizer';
        /** @override 消息类型 */
        _this.type = new SynthesisEventType();
        return _this;
    }
    return SynthesisEvent;
}(NlsEvent));

/**
 * 语音合成回调事件名
 */
var SynthesisHandlerEventType = /** @class */ (function (_super) {
    __extends(SynthesisHandlerEventType, _super);
    function SynthesisHandlerEventType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 合成完毕 */
        _this.completed = 'completed';
        /** 可以播放，此状态在合成完毕前就会触发 */
        _this.ready = 'ready';
        /** 开始播放 */
        _this.play = 'play';
        /** 播放暂停 */
        _this.paused = 'paused';
        /** 播放停止 */
        _this.stoped = 'stoped';
        /** MetaInfo 信息 */
        _this.metainfo = 'metainfo';
        /** 合成数据传输 */
        _this.dating = 'dating';
        return _this;
    }
    return SynthesisHandlerEventType;
}(NlsHandlerEventType));

// Safari下createBuffer只支持22.5k以上的采样率
var defaultSampleRate = getBrowser$1() === 'Safari' ? 24000 : 16000;
/**
 * 语音合成
 */
var Synthesis = /** @class */ (function (_super) {
    __extends(Synthesis, _super);
    /**
     * 构造函数
     * @param options 配置参数
     */
    function Synthesis(_a, options) {
        var 
        /** 应用 appkey */
        appkey = _a.appkey, 
        /** 网关地址 */
        server = _a.server, 
        /** 设备 id */
        deviceId = _a.deviceId, 
        /** token 配置 */
        accessToken = _a.accessToken, 
        /** @deprecated token 获取函数 */
        getAccessToken = _a.getAccessToken;
        var _this = _super.call(this, {
            appkey: appkey,
            server: server,
            deviceId: deviceId,
            accessToken: accessToken,
            getAccessToken: getAccessToken,
        }) || this;
        /** 配置参数 */
        _this.options = {
            autoplay: true,
            voice: 'aiqi',
            volume: 50,
            speechRate: 0,
            pitchRate: 0,
        };
        /**
         * 可以播放
         */
        _this.onPlayReady = function () {
            Log$1.log('已经可以开始播放合成结果');
            _this.eventBus.emit(_this.handler.ready, _this.taskId);
        };
        /**
         * 开始播放
         */
        _this.onPlay = function () {
            // 存储 audioNode 对象
            if (_this.player && _this.player.source) {
                Log$1.log('输出 audio 自定义对象', _this.player.source, _this.player.context);
                _this.audioNode = _this.player.source;
                _this.audioContext = _this.player.context;
            }
            _this.eventBus.emit(_this.handler.play, _this.taskId);
        };
        /**
         * 播放暂停
         */
        _this.onPlayPause = function () {
            Log$1.log('播放器已经暂停');
            _this.eventBus.emit(_this.handler.paused, _this.taskId);
        };
        /**
         * 播放停止
         */
        _this.onPlayStop = function () {
            Log$1.log('播放器已经停止');
            _this.eventBus.emit(_this.handler.stoped, _this.taskId);
        };
        _this.options = Object.assign(_this.options, options || {});
        _this.event = new SynthesisEvent();
        _this.handler = new SynthesisHandlerEventType();
        return _this;
    }
    /**
     * 发送开始识别指令（网关连上后自动调用开始）
     */
    Synthesis.prototype.sendStartMessage = function () {
        // 发送开始合成指令
        Log$1.log('发送开始识别指令，合成文本为：', this.text);
        if (this.command) {
            this.sendMessage(this.command.getCommand(this.command.type.StartSynthesis, __assign({ text: this.text, sampleRate: defaultSampleRate }, this.options)));
        }
    };
    /**
     * 成功建连
     */
    Synthesis.prototype.onConnected = function () {
        _super.prototype.onConnected.call(this);
        // 开始合成
        this.sendStartMessage();
    };
    /**
     * 开始合成（iOS 下会有自动播放限制，如果自动播放，此方法需要在用户主动点击事件内，否则会静音）
     * @param text 需要合成语音的文字
     */
    Synthesis.prototype.start = function (text) {
        // 重建 session
        this.startSession();
        this.text = text;
        this.command = new SynthesisCommand({
            deviceId: this.deviceId,
            taskId: this.taskId,
            appkey: this.appkey,
        });
        var autoplay = this.options.autoplay === false ? false : true;
        if (autoplay) {
            Log$1.log('当前播放设置为自动播放，将在收到合成结果后开始播放');
        }
        else {
            Log$1.log('当前播放设置为手动播放');
        }
        // this.player = new Player({
        //     autoplay: autoplay,
        //     onReady: this.onPlayReady,
        //     onPlay: this.onPlay,
        //     onPause: this.onPlayPause,
        //     onStop: this.onPlayStop,
        //     sampleRate: defaultSampleRate,
        // });
        // 开始连接
        this.connectService();
    };
    /**
     * 开始播放（iOS 下会有自动播放限制，此方法需要在用户主动点击事件内，否则会静音）
     */
    Synthesis.prototype.play = function () {
        if (this.player) {
            Log$1.log('播放器播放');
            this.player.play();
        }
    };
    /**
     * 暂停播放
     */
    Synthesis.prototype.pause = function () {
        if (this.player) {
            Log$1.log('播放器暂停');
            this.player.pause();
        }
    };
    /**
     * 重置播放状态，从头开始播放
     */
    Synthesis.prototype.reset = function () {
        if (this.player) {
            Log$1.log('播放器回到播放起点');
            this.player.stop();
        }
    };
    /**
     * 停止合成，会终止当前未合成完毕的语音合成任务（如果需要重新播放，调用 reset）
     */
    Synthesis.prototype.stop = function () {
        Log$1.log('停止合成');
        // 合成完毕
        this.eventBus.emit(this.handler.completed, this.taskId);
        // 停止播放
        if (this.player) {
            this.player.destroy();
        }
        // 断开连接
        this.closeService();
    };
    /**
     * 收到事件消息
     * @param message 事件消息原始数据
     */
    Synthesis.prototype.onData = function (message, isArrayBuffer) {
        if (isArrayBuffer) {
            Log$1.log('<<< 收到合成结果');
            var buffer = message;
            if (this.player) {
                this.player.feed(buffer);
            }
            // 回调给外部
            this.eventBus.emit(this.handler.dating, buffer);
        }
        else {
            var msg = new NlsEventMessage(message.header, message.payload);
            // 合成完毕
            if (this.event.isEvent(this.event.type.SynthesisCompleted, msg)) {
                Log$1.log('合成完毕');
                // 已输入完所有 chunk
                if (this.player) {
                    this.player.finish();
                }
                this.eventBus.emit(this.handler.completed, msg.header.task_id, msg);
                // 断开连接
                this.closeService();
                return;
            }
            else if (this.event.isEvent(this.event.type.SynthesisMetaInfo, msg)) {
                Log$1.log('收到 MetaInfo');
                this.eventBus.emit(this.handler.metainfo, msg.payload, msg.header.task_id, msg);
                return;
            }
        }
        _super.prototype.onData.call(this, message, isArrayBuffer);
    };
    /**
     * 收到错误消息
     * @param error 错误消息原始数据
     * @param detail 错误详情
     * @param code 错误码
     */
    Synthesis.prototype.onError = function (error, detail, code) {
        // 停止当前合成
        this.stop();
        _super.prototype.onError.call(this, error, detail, code);
    };
    return Synthesis;
}(Speech));

/**
 * 获取 deviceId
 * @return UUID
 */
function getDeviceId() {
    // var deviceIdKey = 'nls_uuid';
    // var item = localStorage.getItem(deviceIdKey);
    // if (!item) {
    //     item = "uu" + getUUID();
    //     localStorage.setItem(deviceIdKey, item);
    // }
    // return item;
    return 0;
}

/**
 * 语音 SDK 客户端
 */
var NlsClient = /** @class */ (function () {
    /**
     * 构造函数
     */
    function NlsClient(_a) {
        var 
        /** 语音应用 appkey */
        appkey = _a.appkey, 
        /** 网关地址，可以自定义。默认公有云线上地址：wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1 */
        _b = _a.server, 
        /** 网关地址，可以自定义。默认公有云线上地址：wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1 */
        server = _b === void 0 ? 'wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1' : _b, 
        /** 设备 id */
        _c = _a.deviceId, 
        /** 设备 id */
        deviceId = _c === void 0 ? getDeviceId() : _c, 
        /** token 设置，支持字符串或者获取函数，获取函数的方式为动态调用，每次需要使用 token 时，会通过获取函数获取最新 token */
        accessToken = _a.accessToken, 
        /** @deprecated 推荐使用 accessToken。token 获取函数，每次需要使用 token 时，会通过获取函数获取最新 token */
        getAccessToken = _a.getAccessToken, 
        /** 是否开启 debug 模式 */
        _d = _a.debug, 
        /** 是否开启 debug 模式 */
        debug = _d === void 0 ? false : _d, 
        /** 是否开启测试模式 */
        _e = _a.isTestEnv, 
        /** 是否开启测试模式 */
        isTestEnv = _e === void 0 ? false : _e;
        this.appkey = appkey;
        this.server = server;
        this.deviceId = deviceId;
        this.accessToken = accessToken;
        this.getAccessToken = getAccessToken;
        this.isTestEnv = isTestEnv;
        // 设置调试模式
        Log$1.setDebug(debug);
        Log$1.log("\u5E94\u7528ID: " + appkey + "\uFF0C\u7F51\u5173\u5730\u5740: " + server);
    }
    /**
     * 初始化实时语音识别
     * @param options 配置参数
     * @param plugin 待加载的插件
     * @return 实时识别实例
     */
    NlsClient.prototype.initRecognition = function (options, plugin) {
        if (!this.isTestEnv) {
            detector(DetectorLevel.DetectorLevel0);
        }
        var client = new Recognition({
            appkey: this.appkey,
            server: this.server,
            deviceId: this.deviceId,
            accessToken: this.accessToken,
            getAccessToken: this.getAccessToken,
            plugin: plugin,
        }, options);
        return client;
    };
    /**
     * 初始化实时语音识别 v2
     * @param options 配置参数
     * @param plugin 待加载的插件
     * @return 实时识别实例
     */
    NlsClient.prototype.initRapidFixRecognition = function (options, plugin) {
        if (!this.isTestEnv) {
            detector(DetectorLevel.DetectorLevel0);
        }
        var client = new RapidFixRecognition({
            appkey: this.appkey,
            server: this.server,
            deviceId: this.deviceId,
            accessToken: this.accessToken,
            getAccessToken: this.getAccessToken,
            plugin: plugin,
        }, options);
        return client;
    };
    /**
     * 初始化合成语音
     * @param options 配置参数
     * @return 语音合成实例
     */
    NlsClient.prototype.initSynthesis = function (options) {
        if (!this.isTestEnv) {
            detector(DetectorLevel.DetectorLevel1);
        }
        var client = new Synthesis({
            appkey: this.appkey,
            server: this.server,
            deviceId: this.deviceId,
            accessToken: this.accessToken,
            getAccessToken: this.getAccessToken,
        }, options);
        return client;
    };
    /**
     * 当前环境是否支持 SDK 所有功能正常运行
     * @return 是否支持
     */
    NlsClient.prototype.isSupport = function () {
        try {
            detector(DetectorLevel.DetectorLevel0);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    /**
     * 当前环境是否支持 ASR（语音识别）正常运行
     * @return 是否支持
     */
    NlsClient.prototype.isSupportASR = function () {
        try {
            detector(DetectorLevel.DetectorLevel0);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    /**
     * 当前环境是否支持 TTS（语音合成）正常运行
     * @return 是否支持
     */
    NlsClient.prototype.isSupportTTS = function () {
        try {
            detector(DetectorLevel.DetectorLevel1);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return NlsClient;
}());

module.exports = NlsClient;
// module.exports = { Log$1 as Log, NlsEventMessage, Recognition, RapidFixRecognition, Synthesis };
//# sourceMappingURL=nls-js-sdk.es5.js.map
