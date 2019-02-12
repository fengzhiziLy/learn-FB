### 模板字符串

> 一种字符串的新的表现形式,解决了一些痛点

+ 痛点1：字符串和变量拼接

```js
var s = " a " + s1 + " b " + s2;
var s = ` a ${ s1 } b ${ s2 } `;      // 减少了错误几率
```

+ 痛点2：字符串换行

```js
var s = "<div><p>1</p><p>2</p><p>3</p></div>";
var s = `<div>
          <p>1</p>
          <p>${s1}</p>
          <p>${s2}</p>
        </div>`
```

### 解构赋值

#### 对象解构赋值

```js
var obj = { name: 'abc', age: 18 }
let { name } = obj;   // 创建了一个变量name，值=obj.name
console.log(name);    // abc
let { age } = obj;
console.log(age);     // 18

var obj2 = { names: 'fengzi', height: 180, grade: 23 };
let { names, height, grade } = obj2;
console.log(names, height, grade);
```

> 解构赋值的意义所在

```js
function fn(option) {
  // option.width
  // option.height
}
fn({
  width: 100,
  height: 100,
  age: 23
})

function fn2({ width, height, age }) {
  // 创建了width,height,age三个局部变量，值来自于实参
}
fn2({
  width: 100,
  height: 100,
  age: 23
})
```

> 解构赋值的其他用法

```js
var obj = { name: 'fengzi', age: 23 };
var { name:objName } = obj;
console.log(objName);
var { name:objName2, age:objAge2 } = obj;
console.log(objName2, objAge2);
// 创建一个新的变量objName,值=obj.name
```

```js
var a = 3;
var c = 10;
var b = { a, c };  // b对象有一个a属性，a属性的值，来自于a变量
console.log(b);   // {a: 3, c: 10}
```

### 函数的扩展

#### rest参数

```js
function fn () {
  // arguments是函数内部的一个局部变量
  // arguments.length表示函数的实参的个数
  console.log(arguments.length);
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
fn(1, 3, 5)          // 3
// fn("a", "b", "c", "d", "e")   // 5
```

> es6箭头函数内部不能使用arguments  ---> rest参数

```js
function q (...args) {
  // ...args ---> 产生了一个变量，这个变量是一个数组，数组里面包含了这个函数调用时传递的所有实参
  console.log(args);
  // 验证args是不是数组
  console.log(args instanceof Array);   // true
  console.log(Object.prototype.toString.call(args));  // [object Array]
  console.log(Array.isArray(args));     // true
}
q(1, 3, 5)
```

#### 箭头函数

> 用于替换匿名函数

```js
// 无参数
div.onclick = function () {}
div.onclick = () => {}

// 有一个参数的匿名函数
var fn = function (name) {
  console.log(name)
}
var fn = name => {
  console.log(name)
}

// 有多个参数
var q = function (name, age) {}
var q = (name, age) => {}
```

+ 箭头函数和普通函数有哪些不同

  1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

  ```js
    var p = {
      age: 18,
      run: () => {
        // 匿名函数不具有独立的作用域
        setTimeout(() => {
          console.log(this);    // this-->window
        }, 1000)
      },
      say: function () {
        setTimeout(() => {
          console.log(this);    // this-->p
        }, 1000)
      },
      eat() {
        console.log(this);      // this-->p
        setTimeout(() => {
          console.log(this);    // this-->p
        }, 1000)
      }
    }
    p.run()
    p.say()
    p.eat()
  ```

  2. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

  3. 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`rest`参数代替。

  4. (不常用)不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数。 generator函数现在经常用`async`替代

### 判断数据类型

+ `typeof`
  - typeof只能判断：数字、字符串、布尔值、undefined、函数
+ `Object.prototype.toString.call()`
  - 5--------------'[object Number]'    
  - "abc"----------'[object String]'    
  - true-----------'[object Boolean]'   
  - null-----------'[object Null]'      
  - undefined------'[object Undefined]'
  - [1, 3, 5]------'[object Array]'     
  - function(){}---'[object Function]'  
  - new Date()-----'[object Date]'      
  - /abc/----------'[object RegExp]'    

### 对象的扩展

> `Object.assign()`就是进行对象的浅拷贝

```js
var source = { age: 18, className: '3年2班' }
var newObj = Object.assign({}, source)
console.log(newObj)
newObj == source // false
var newObj2 = {}
Object.assign(newObj2, source)
```

> 对象扩展运算符

```js
var car = { brand: "BMW", price: "368000", length: "3米" }
// 克隆一个与car完全一样的对象
var car2 = { ...car }
console.log(car2);
console.log(car == car2);  // false
var car3 = { ...car, length: "4米" }
console.log(car3);
var car4 = { ...car, type: "SUV" }
console.log(car4);

var s1 = [1, 3, 5, 7, 8];
var s2 = [ ...s1 ];
console.log(s2);
```
