/*第一部分-获取所有的Realm*/

var setOld = new Set();
var queueOld = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
];

while (queueOld.length) {
    let currentOld;
    currentOld = queueOld.shift();
    if (setOld.has(currentOld)) {
        continue
    }
    setOld.add(currentOld);
    for (let p of Object.getOwnPropertyNames(currentOld)) {
        var property = Object.getOwnPropertyDescriptor(currentOld, p)

        if (property.hasOwnProperty("value") && property.value instanceof Object) {
            queueOld.push(property.value);
        }
        if (property.hasOwnProperty("getter")) {
            queueOld.push(property.getter);
        }
        if (property.hasOwnProperty("setter")) {
            queueOld.push(property.setter);
        }
    }
}

/*所有Realm里的对象*/
// g6.antv.vision


var globalProperties = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"
]
let set = new Set()
let setArray=new Set()
var queue = [];
for (var p of globalProperties) {
    queue.push({
        path: [p],
        object: this[p]
    })
}

let current;
let obj={}
while (queue.length) {
    current = queue.shift()
    console.log(current.path.join('.'))
    if (set.has(current.object)) {
        continue
    }
    if(setArray.has(current.path.join('.'))){
      continue
    }
    setArray.add(current.path.join('.'))
    set.add(current.object);
    let proto = Object.getPrototypeOf(current.object);
    if (proto) {
        queue.push({
            path: current.path.concat(["__proto__"]),
            object: proto
        })
    }
    for (let p of Object.getOwnPropertyNames(current.object)) {
        var property = Object.getOwnPropertyDescriptor(current.object, p);
        if (property.hasOwnProperty("value") && (property.value != null && (typeof property.value == 'object' || typeof property.value == 'function')) && property.value instanceof Object) {
            queue.push({
                path: current.path.concat([p]),
                object: property.value
            })
        }
        if (property.hasOwnProperty("get") && typeof property.get == 'function') {
            queue.push({
                path: current.path.concat([p]),
                object: property.get
            })
        }
        if (property.hasOwnProperty("set") && typeof property.set == 'function') {
            queue.push({
                path: current.path.concat([p]),
                object: property.set
            })
        }
    }
}