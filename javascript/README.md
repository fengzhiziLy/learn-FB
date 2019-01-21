## 数据类型

+ 基本数据类型---值类型：（数字、字符串、布尔值、null、undefined）
+ 复杂数据类型---引用类型： 对象
  - 数组
  - 函数
  - 正则表达式
  - Date

## 对象

### 构造函数的执行过程

`var p1 = new Person()`
+ 1.创建一个对象（这个对象称之为Person构造函数的实例）- `_p1`
+ 2.创建一个内部对象，`this`，将this指向该实例（`_p1`）
+ 3.执行函数内部的代码，其中，操作`this`的部分就是操作了该实例`_p1`
+ 4.返回值:
    * a.如果函数没有返回值(没有return语句),那么就会返回构造函数的实例(`p1`)
    * b.如果函数返回了一个基本数据类型的值，那么本次构造函数的返回值就是该实例(`_p1`)
    * c.如果函数返回了一个复杂数据类型的值，那么本次构造函数的返回值就是该值

```js
function fn2() {
    return 'abc'
}
var f2 = new fn2()      // f2是fn2构造函数的实例

function fn3() {
    return [1, 2, 3]
}
var f3 = new fn3();     // 返回值为[1, 2, 3]
```

> 为什么要理解构造函数的返回值

`String`是内置函数

+ `String()`
+ `new String()`

```js
function Person () {
  return '123';
}
var person = new Person()
console.log(person instanceof Person);

function Programmer () {
  return [1, 3, 5]
}
var pro = new Programmer()
console.log(pro instanceof Programmer);  // false
console.log(pro instanceof Array);       // true
```

### 继承

#### 继承的实现方式

> 原型链继承

```js
function Dog () {

}
var d1 = new Dog()
Dog.prototype.say = function () {
  console.log('wang');
}
// 原型链继承
```

```js
function Cat (name) {
  this.name = name
}
var tom = new Cat('汤姆')
Cat.prototype.say = function () {}
// 问题
Cat.prototype.s1 = function () {}
Cat.prototype.s2 = function () {}
Cat.prototype.s3 = function () {}
// 确实会使tom拥有了方法，但是代码冗余
// 改良版
Cat.prototype = {
  a1: function () {},
  a2: function () {},
  a3: function () {}
}
console.log(tom.s1) // f () {}
console.log(tom.a1) // undefined
// 原因：tom对象在创建的时候已经有了一个确定的原型对象，就是旧的Cat.prototype
// 由于Cat.prototype后面被重新赋值，但是tom对象的原型没有改变，所以并不能访问到新原型对象中的a1-a3方法
// 解决方法：
// 先改变原型，再创建对象
function Tiger () {

}
Tiger.prototype = {
  a: function () {},
  b: function () {}
}
var tiget = new Tiger();
console.log(tiget.a)  // f () {}
console.log(tiget.b)  // f () {}

Person.prototype = {
  constructor: Person,  // ✨
  say: function () {
    console.log('hello')
  },
  run: function () {
    console.log('run')
  }
}
```

+ 注意点：
+ a. 一般情况下，先改变原型对象，再创建对象
+ b. 一般情况下，对于新原型，会添加一个`constructor`属性，从而不破坏原有的原型对象的结构

> 拷贝继承（混入继承）

+ 场景：想使用某个对象中的属性，但是又不能直接修改它，就可以创建一个该对象的拷贝
+ 实际应用：
  - `jquery: $.extend`: 编写jquery插件的

```js
var o1 = { age: 2 }
var o2 = o1
o2.age = 18
// 此时o1.age也被修改了
```

```js
var o3 = { gender: '男', grade: '高三', group: '五组', name: '张三' }
var o4 = { gender: '男', grade: '高三', group: '五组', name: '李四' }
// 使用拷贝继承
// 创建一个o3对象的拷贝 for...in
var o4a = {}
for (var key in o3) {
  var value = o3[key]
  o4a[key] = value
}
// 修改克隆对象
o4a.name = '李四';
```

+ 浅拷贝和深拷贝
  - 浅拷贝只是拷贝一层属性，没有内部对象
  - 深拷贝利用了递归的原理，将对象的若干层属性拷贝出来

`Object.assign()`也是浅拷贝的一种实现方式

**封装拷贝继承函数**

```js
function extend (source, target) {
  for(var key in source) {
    var value = source[key]
    target[key] = value
  }
}
var o3 = { gender: '男', grade: '高三', group: '五组', name: '张三' };
var o4 = {};
extend(o3, o4);
o4.name = '李四';
console.log(o4);
```

**es6中的**扩展运算符**拷贝继承**

```js
var source = { name: 'fengzhizi', age: 15 }
var target = { ...source }
var target2 = { ...source, age: 18 }
```

> 原型式继承

+ 场景：
  - 创建一个纯洁的对象：对象什么属性都没有
  - 创建一个继承自某个父对象的子对象
+ 使用方式
  - 空对象：`Object.create(null)`

```js
var o1 = { say: function () {} }
var o2 = Object.create(null)

var parent = { gender: '男', age: 20 }
var student = Object.create(parent)
// student.__proto__ === parent
```

> 借用构造函数实现继承

+ 场景：适用于两种构造函数之间逻辑有相似的情况
+ 原理：函数的`call`,`apply`调用方式

```js
function Animal (name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}
function Person (name, age, gender, say) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.say = function () {}
}
```

**以上代码借用构造函数实现**

```js
function Animal (name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}
function Person (name, age, gender, say) {
  // Animal.call(this, name, age, gender)
  Animal.apply(this, [name, age, gender])
  this.say = say
}
var p1 = new Person('fengzhizi', 18, '男', function () {})
```

+ 局限性：父类构造函数代码必须完全适用于子类构造函数

### 原型链

+ **根本：继承**
  - 属性：对象中几乎都有一个`__proto__`属性，指向它的父对象
  - `Object.create(null)`创建的对象就没有
  - 可以实现让该对象访问到父对象中的相关属性
+ **根对象：`Object.prototype`**

```js
function Person () {}
var p  = new Person()
p.__proto__ === Person.prototype  // true
p.__proto__.__proto__ === Object.prototype // true
```

### 闭包

#### 变量作用域

+ 变量作用域： 就是一个变量可以使用的范围
+ 全局作用域
+ 通过函数创建一个独立的作用域

#### 作用域链

+ 意义：查找变量（确定变量来自哪里，变量是否可以访问）

```js
function fn(callback) {
  var age = 18;
  callback();
}
fn(function () {
  console.log(age);  // undefined
  var age = 15;
  // 1. 查找当前作用域：没有
  // 2. 查找上一级作用域： 全局作用域
  // 看上一级作用域，不是看函数在哪里调用，而是看函数在哪里编写----词法作用域
})
```

### 闭包的问题

```html
<body>
  <div>111</div>
  <div>222</div>
  <div>333</div>
  <div>444</div>
  <div>555</div>
</body>
<script type="text/javascript">
  var divs = document.getElementsByTagName('div')
  for (var i = 0; i < divs.length; i++) {
    const element = divs[i]
    element.onclick = function () {
      console.log(i); // 打印出5个5
    }
  }
  // 解决办法
  for (var i = 0; i < divs.length; i++) {
    const element = divs[i]
    element.onclick = (function (j) {
      return function () {
        console.log(j);
      }
    })(i)
  }
</script>
```

```js
function fn () {
  var a = 5;
  return function () {
    a++;
    console.log(a);
  }
}
var f1 = fn();  // f1指向匿名函数
f1();           // 6
f1();           // 7
f1();           // 8
```

**代码执行到`var f1 = fn()`，返回匿名函数**

**一般函数执行完毕后，变量就会释放**

**JS引擎发现匿名函数要使用a变量，所以a变量并不能得到释放，而是把a变量放在匿名函数可以访问到的地方**

**a变量存在于f1可以访问到的地方，此时a变量只能被f1访问**

```js
function fn () {
  var a = 5;
  return function () {
    a++;
    console.log(a);
  }
}
var f1 = fn();
f1();         // 6
var f2 = fn();
f2();         // 6
// 又一次执行了fn()，又初始化了一个新的a变量，a=5;
// 并且把新的a变量放在了f2可以访问到的地方
var f3 = fn();
f3();         // 6
```

```js
function q () {
  var a = {}
  return a;
}
var r1 = q();
var r2 = q();
console.log(r1 === r2);     // false

function p () {
  var a = {}
  return function () {
    return a;
  }
}
var t1 = p(); // 创建一个新的a对象，把a对象放在t1可以访问到的地方
var o1 = t1();
var o2 = t1();
console.log(o1 === o2);     // true
var t2 = p();
var o3 = t2();
console.log(o1 === o3);     // false
```

```js
// 模块化思想
var s = (function song () {
  var leastPrice = 1000;
  var total = 0;
  return {
    buy: function (price) {
      total += price
    },
    pay: function () {
      if (total < leastPrice) {
        console.log('请继续');
      } else {
        console.log('欢迎');
      }
    },
    editPrice: function (id, price) {
      if (id === 888) {
        leastPrice = price;
        console.log('最低消费');
      } else {
        console.log('权限不足');
      }
    }
  }
})()
// 修改leastPrice
```

#### 闭包内存释放

```js
function f1 () {
  var a = 5;
  return function () {
    a++;
    console.log(a);
  }
}
var q1 = f1();
// 要想释放q1里面保存的a,只能通过释放q1
q1 = null; // q1 = undefined
```

### 对象的属性查找规则

// -->1、首先查看本身有没有length属性
// -->2、如果本身没有该属性，那么去它的原型对象中查找
// -->3、如果原型对象中没有，那么就去原型对象的原型对象中查找，最终一直找到根对象（Object.prototype）
// -->4、最终都没有找到的话，我们认为该对象并没有该属性，如果获取该属性的值：undefined

### 函数的4种调用方式

**`ES6之前`函数内部的this是由该函数的调用方式决定的**

**函数内部的this与大小写、书写位置无关**

+ 1. 函数调用

```js
var age = 18;
var p = {
  age: 15,
  say: function () {
    console.log(this.age);
  }
}
var s1 = p.say;
s1()
```

+ 2. 方法调用

```js
var age = 18;
var p = {
  age: 15,
  say: function () {
    console.log(this.age);
  }
}
p.say();
```

+ 3. new调用(构造函数)

```js
var age = 18;
var p = {
  age: 15,
  say: function () {
    console.log(this.age);
  }
}
new p.say();
```

+ 4. 上下文方式(call、apply、bind)

```js
var length = 20;
function f1 () {
  console.log(this.length)
}
f1.call([1, 3, 5])
f1.apply(this)
f1.call(5)
```

##### call方法的第一个参数

+ 如果是一个对象类型，那么函数内部的this指向该对象
+ 如果是undefined/null，那么函数内部的this指向window
+ 如果是数字---> this: 对应的Number构造函数的实例
+ 如果是字符串--> this: 对应的String构造函数的实例
+ 如果是布尔值--> this: 对应的Boolean构造函数的实例

##### call和apply的异同

- call和apply都可以改变函数内部this的指向
- 传参的形式不同

```js
function toString (a, b, c) {
  console.log(a + " " + b + " " + c);
}
toString.call(null, 1, 3, 5);
toString.apply(null, [1, 3, 5]);
```
