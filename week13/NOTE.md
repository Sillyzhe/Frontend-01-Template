
## Map
Map对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。  

### Objects和maps的比较

Objects和Maps都允许你按键存取一个值、删除值、检测一个键是否绑定了值。不过Maps和Objects有一些重要的区别，在下列情况里使用Map会是更好的选择：

|  |Map|Object|
|----|----|----|
|包含的键|Map默认情况不包含任何键。只包含显式插入的键|一个Object有一个原型，原型链上的键名有可能和自身对象上设置的键名产生冲突|
|键的类型|一个Map的键可以是任意值，包括函数、对象或任意基本类型|一个Object的键必须是一个String或是Symbol|
|键的顺序|Map中的key是有序的。因此，迭代的时候，一个Map对象以插入的顺序返回键值|一个Object的键是无序的|
|Size|Map的键值对个数可以轻易地通过size属性获取|Object的键值对个数只能手动计算|
|迭代|Map是iterable的，所以可以直接被迭代|迭代一个Object需要以某种方式获取它的键然后才能迭代|
|性能|在频繁增删键值对的场景下表现更好|在频繁添加和删除键值对的场景下未作出优化|

### 属性
#### Map.length
属性length的值为0。  
想要计算一个Map中的条目数量，使用Map.prototype.size

#### get Map[@@species]
本构造函数用于创建派生对象

#### Map.prototype
表示Map构造器的原型。允许添加属性从而应用于所有的Map对象

### Map实例
所有的Map对象实例都会继承Map.prototype
**属性**
-    -    -
#### Map.prototype.constructor
返回一个函数，它创建了实例的原型。默认是Map函数

#### Map.prototype.size
返回Map对象的键/值对的数量

**方法**
-  -  -

#### Map.prototype.clear()
移除Map对象的所有键/值对

#### Map.prototype.delete(key)
如果Map对象中存在该元素，则移除它并返回true；否则如果该元素不存在则返回flase。随后调用Map.prototype.has(key)将返回false。

#### Map.prototype.entries()
返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的[key,value]数组。

#### Map.prototype.forEach(callbackFn[,thisArg])
按插入顺序，为Map对象里的每一个键值对调用一次callbackFn函数。如果forEach提供了thisArg，它将在每次回调中作为this值。

#### Map.prototype.get(key)
返回键对应的值，如果不存在，则返回undefined

#### Map.prototype.has(key)
返回一个布尔值，表示Map实例是否包含键对应的值

#### Map.prototype.keys()
返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的键

#### Map.prototype.set(key,value)
设置Map对象中键的值。返回该Map对象

#### Map.prototype.values()
返回一个新的Interator对象，它按插入顺序包含了Map对象中每个元素的值

#### Map.prototype[@@iterator]
返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的[key,value]数组


## Set
Set对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用

-  -  -
### 简述
Set对象是值的集合，你可以按照插入的顺序迭代它的元素。Set中的元素只会出现一次，即Set中的元素是唯一的。
-  -  -
### Constructor
#### Set()
创建一个新的Set对象

-  -  -
### 静态属性
#### get Set[@@species]
构造函数用来创建派生对象

-  -  -
### 实例属性
#### Set.prototype.size
返回Set对象中的值的个数
-  -  -

### 实例方法
#### Set.prototype.add(value)
在Set对象尾部添加一个元素。返回该Set对象

#### Set.prototype.clear()
移除Set对象内的所有元素

#### Set.prototype.delete(value)
移除Set中与这个值相等的元素，返回Set.prototype.has(value)在这个操作前会返回的值（即如果该元素存在，返回true,否则返回false）。Set.prototype.has(value)在此后会返回false。

#### Set.prototype.entries()
返回一个新的迭代器对象，该对象包含Set对象中安插入顺序排列的所有元素的值的[value,value]数组。为了使这个方法和Map对象保持相似，每个值的键和值相等。

#### Set.prototype.forEach(callbackFn[,this.Arg])
按照插入顺序，为Set对象中的每一个值调用一次callBackFn。如果提供了thisArg参数，回调中的this会是这个参数

#### Set.prototype.has(value)
返回一个布尔值，表示该值在Set中存在与否

#### Set.prototype.keys()
与values()方法相同，返回一个新的迭代器对象，该对象包含Set对象中按插入顺序排列的所有元素的值。

#### Set.prototype.values()
返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排流的所有元素的值

#### Set.prototype[@@iterator]()
返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值

