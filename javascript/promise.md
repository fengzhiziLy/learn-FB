## promise

> 为什么要有promise：解决回调地狱的问题

### 回调地狱

```js
$.get("/getUser", function (res) {
  $.get("/getUserDetail", function () {
    $.get("/getCart", function () {
      $.get("/getBooks", function () {
        // ...
      })
    })
  })
})
// node开发，读取文件、开发服务器、接受一个请求、请求路径
```

### promise基本用法

```js
// 把异步函数封装在一个promise对象中
function fn () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('hello');
      // 异步逻辑到这里已经执行完毕了
      // 就可以告诉外界，可以执行其他操作了
      // 如何告诉外界呢
      resolve()
    }, 1000)
  })
}
// 调用了这个函数，执行了异步函数
// fn()
// 并不知道这个异步操作什么时候结束
fn().then(res => {
  // 执行到下一步
  console.log("下一步");
  fn().then(res => {
    console.log("执行第二步");
  })
})
// hello 下一步 hello 执行第二步
```

### promise如何解决回调地狱

```js
function f1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('第一步');
      // 异步逻辑已经执行完,可以认为resolve是一个标记，这个标记表示这里的异步操作执行完毕
      resolve();
    }, 1000)
  })
}
function f2() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('第二步');
      resolve();
    }, 1000)
  })
}
f1().then(res => {
  // 返回一个promise对象
  return f2()
}).then(res => {
  setTimeout(() => {
    console.log('完成');
  }, 1000)
})
```

### Promise传参

```js
function getUser() {
  return new Promise(resolve => {
    $.get("/getUser", res => {
      // res表示从服务器中接受到的数据
      // 把数据传入到下一步操作中
      // 告诉外界本次的异步操作已经完毕了
      resolve(res)
    })
  })
}
getUser().then(res => {
  // res就表示上一个异步操作的返回的参数值：从服务器中获取的数据
})
```

### Promise错误处理

```js
function getBooks() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/getBooks',
      success(res) {
        // 成功获取数据
        resolve(res)
      },
      error(resError) {  // res表示错误信息
        // 如果失败，执行error方法
        reject(resError)
      }
    })
  })
}
// 第一种错误的处理方式
getBooks().then(res => {
  // res 表示请求成功时获取到的数据
}, resError => {
  console.log(resError)
})
// 第二种错误的处理方式
getBooks().then(res => {
  // res 表示请求成功时获取到的数据
}).catch(res => {
  // 这里也可以获取到错误信息
})
```

> 第二种方式的强大之处在于：

1. 不仅仅可以捕获到reject传递的参数
2. 还可以捕获到：成功的回调中发生的错误

## async

> 其实是一个promise的语法糖

```js
function f1 () {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('hello')
      resolve()
    }, 1000)
  })
}
// f1().then(res => {
//   console.log('第二步')
// })
// async的实现
(async function() {
  // 这里的异步操作执行完毕其实就是resolve
  await f1()
  console.log('第二步')
  await f1()
  await f1()
  console.log('第三步')
})()
console.log('world')
```

### async处理返回值

```js
function q() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello')
    }, 1000)
  })
}
(async function() {
  const res = await q()
  console.log('第一次：', res)
  const res2 = await q()
  console.log('第二次：', res2)
  const res3 = await q()
  console.log('第三次：', res3)
})()
```

### async错误处理

```js
function q() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('hello')
    }, 1000)
  })
}
(async function() {
  try {
    let res = await q()
    console.log(res)
  } catch(e) {
    console.log(1);
  }
})()
```

> await可以有返回值，这个返回值表示promise操作成功的返回值

+ 如果await里面执行的异步操作发生了reject或者发生了错误，只能使用`try...catch`来进行错误处理

## class

### 定义一个类

```js
function Person (name, age) {
  this.name = name
  this.age = age
}
var p1 = new Person()
class Person {
  // 构造方法
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
```

### 类的方法

```js
class Student {
  constructor (age) {
    this.age = age
  }
  run () {
    console.log(`${this.age} running`);
  }
}
var s1 = new Student(18)
```

### 类的继承

```js
class Person {
  constructor (name) {
    this.name = name
  }
}
class Student extends Person {
  constructor (name, grade) {
    // 必须调用父类构造方法，否则就会报错
    super(name); // 调用父类构造方法
    this.grade = grade;
  }
}
```
