# 单例模式

单例是只能被实例化一次，并且可以全局访问的类。这个*单一实例*可以在我们的应用程序中共享，这使得单例非常适合管理应用程序中的全局状态。

> 单例模式同时解决了两个问题， 所以违反了单一职责原则：
>
> - `保证一个类只有一个实例`。 为什么会有人想要控制一个类所拥有的实例数量？ 最常见的原因是控制某些共享资源 （例如数据库或文件） 的访问权限。
>   它的运作方式是这样的： 如果你创建了一个对象， 同时过一会儿后你决定再创建一个新对象， 此时你会获得之前已创建的对象， 而不是一个新对象。
>   注意， 普通构造函数无法实现上述行为， 因为构造函数的设计决定了它必须总是返回一个新对象。
> - `为该实例提供一个全局访问节点`。 还记得你 （好吧， 其实是我自己） 用过的那些存储重要对象的全局变量吗？ 它们在使用上十分方便， 但同时也非常不安全， 因为任何代码都有可能覆盖掉那些变量的内容， 从而引发程序崩溃。
>   和全局变量一样， 单例模式也允许在程序的任何地方访问特定对象。 但是它可以保护该实例不被其他代码覆盖。
>   还有一点： 你不会希望解决同一个问题的代码分散在程序各处的。 因此更好的方式是将其放在同一个类中， 特别是当其他代码已经依赖这个类时更应该如此。

首先，让我们看看使用 ES2015 类的单例是什么样子的。在这个例子中，我们将构建一个 `Counter` 类，它具有：

- 一个 `getInstance` 方法，返回实例的值
- 一个 `getCount` 方法，返回 `counter` 变量的当前值
- 一个 `increment` 方法，将 `counter` 的值增加一
- 一个 `decrement` 方法，将 `counter` 的值减少一

```js
let counter = 0
class Counter {
  getInstance() { return this }
  getCount() { return counter }
  increment() { return ++counter }
  decrement() { return --counter }
}
```

然而，这个类不符合单例的标准！单例应该只能被**实例化一次**。目前，我们可以创建多个 `Counter` 类的实例。

```js
let counter = 0

class Counter {
  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const counter1 = new Counter()
const counter2 = new Counter()

console.log(counter1.getInstance() === counter2.getInstance()) // false
```

通过调用 `new` 方法两次，我们将 `counter1` 和 `counter2` 设置为不同的实例。`counter1` 和 `counter2` 上的 `getInstance` 方法返回的值实际上是不同实例的引用：它们并不完全相等！

让我们确保 `Counter` 类只能创建**一个**实例。

一种确保只能创建一个实例的方法是创建一个名为 `instance` 的变量。在 `Counter` 的构造函数中，当创建新实例时，我们可以将 `instance` 设置为实例的引用。通过检查 `instance` 变量是否已有值，我们可以防止新的实例化。如果已有值，说明实例已经存在。这种情况不应该发生：应该抛出一个错误来通知用户。

```js
let instance
let counter = 0

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const counter1 = new Counter()
const counter2 = new Counter()
// Error: You can only create one instance!
```

完美！我们不能再创建多个实例了。

让我们从 `counter.js` 文件中导出 `Counter` 实例。但在此之前，我们应该冻结该实例。`Object.freeze` 方法确保使用该单例的代码不能修改它。冻结实例上的属性不能被添加或修改，从而减少了意外覆盖单例值的风险。

```js
let instance
let counter = 0

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())
export default singletonCounter
```

---

让我们看看一个实现了 `Counter` 示例的应用程序。我们有以下文件：

- `counter.js`：包含 `Counter` 类，并导出一个 **`Counter` 实例** 作为默认导出
- `index.js`：加载 `redButton.js` 和 `blueButton.js` 模块
- `redButton.js`：导入 `Counter`，并将 `Counter` 的 `increment` 方法添加为 **红色** 按钮的事件监听器，并通过调用 `getCount` 方法记录 `counter` 的当前值
- `blueButton.js`：导入 `Counter`，并将 `Counter` 的 `increment` 方法添加为 **蓝色** 按钮的事件监听器，并通过调用 `getCount` 方法记录 `counter` 的当前值

`blueButton.js` 和 `redButton.js` 都从 `counter.js` 导入了**相同的实例**。这个实例在两个文件中都被导入为 **`Counter`**。

::: code-group

```html [index.html]
<!doctype html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <link href="./styles.css" rel="stylesheet" />
  </head>

  <body>
    <div id="app"></div>
    <button id="red">Red button</button>
    <button id="blue">Blue button</button>
    <script src="./index.js"></script>
  </body>
</html>
```

```css [styles.css]
html,
body {
  margin: 0px;
  background-color: #1e2027;
}

.App {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Avenir Next';
}

button {
  padding: 1em;
  margin: 10px;

  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  color: white;
  font-family: 'Avenir';
  font-size: 1em;

  font-weight: bolder;
}

#blue {
  background: -webkit-linear-gradient(to right, #00c6ff, #0072ff);
  background: linear-gradient(to right, #00c6ff, #0072ff);
}

#red {
  background: -webkit-linear-gradient(to right, #ef473a, #cb2d3e);
  background: linear-gradient(to right, #ef473a, #cb2d3e);
}
```

```js [index.js]
import './redButton'
import './blueButton'

console.log('Click on either of the buttons 🚀!')
```

```js [counter.js]
let instance
let counter = 0

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())
export default singletonCounter
```

```js [blueButton.js]
import Counter from './counter'

const button = document.getElementById('blue')
button.addEventListener('click', () => {
  Counter.increment()
  console.log('Counter total: ', Counter.getCount())
})
```

```js [redButton.js]
import Counter from './counter'

const button = document.getElementById('red')
button.addEventListener('click', () => {
  Counter.increment()
  console.log('Counter total: ', Counter.getCount())
})
```

:::

当我们在 `redButton.js` 或 `blueButton.js` 中调用 `increment` 方法时，`Counter` 实例上的 `counter` 属性值在两个文件中都会更新。无论我们点击红色按钮还是蓝色按钮：相同的值在所有实例中共享。这就是为什么即使我们在不同的文件中调用该方法，计数器仍然每次增加一。

---

### 权衡

将实例化限制为仅*一个*实例可能会节省大量内存空间。我们不需要每次都为新实例设置内存，只需为那个在整个应用程序中引用的实例设置内存。然而，单例实际上被认为是一种**反模式**，在 JavaScript 中可以（或.._应该_）避免使用。

在许多编程语言中，如 Java 或 C++，我们不能像在 JavaScript 中那样直接创建对象。在那些面向对象的编程语言中，我们需要创建一个类，该类创建一个对象。创建的对象具有类实例的值，就像 JavaScript 示例中的 `instance` 值一样。

然而，上述示例中的类实现实际上是多余的。由于我们可以在 JavaScript 中直接创建对象，我们可以简单地使用常规对象来实现相同的结果。让我们看看使用单例的一些缺点！

#### 使用常规对象

让我们使用之前看到的相同示例。然而这次，`counter` 只是一个包含以下内容的对象：

- 一个 `count` 属性
- 一个 `increment` 方法，将 `count` 的值增加一
- 一个 `decrement` 方法，将 `count` 的值减少一

::: code-group

```html [index.html]
<!doctype html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <link href="./styles.css" rel="stylesheet" />
  </head>

  <body>
    <div id="app"></div>
    <button id="red">Red button</button>
    <button id="blue">Blue button!</button>
    <script src="./index.js"></script>
  </body>
</html>
```

```css [styles.css]
html,
body {
  margin: 0px;
  background-color: #1e2027;
}

button {
  padding: 1em;
  margin: 10px;

  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  color: white;
  font-family: 'Avenir';
  font-size: 1em;

  font-weight: bolder;
}

#blue {
  background: -webkit-linear-gradient(to right, #00c6ff, #0072ff);
  background: linear-gradient(to right, #00c6ff, #0072ff);
}

#red {
  background: -webkit-linear-gradient(to right, #ef473a, #cb2d3e);
  background: linear-gradient(to right, #ef473a, #cb2d3e);
}
```

```js [index.js]
import './redButton'
import './blueButton'

console.log('Click on either of the buttons 🚀!')
```

```js [counter.js]
let count = 0

const counter = {
  increment() {
    return ++count
  },
  decrement() {
    return --count
  }
}

Object.freeze(counter)
export { counter }
```

```js [blueButton.js]
import { counter } from './counter'

const button = document.getElementById('blue')
button.addEventListener('click', () => {
  console.log('Counter total: ', counter.increment())
})
```

```js [redButton.js]
import { counter } from './counter'

const button = document.getElementById('red')
button.addEventListener('click', () => {
  console.log('Counter total: ', counter.increment())
})
```

:::

由于对象是通过引用传递的，`redButton.js` 和 `blueButton.js` 都导入了相同 `counter` 对象的引用。在这些文件中的任何一个中修改 `count` 的值都会修改 `counter` 上的值，这在两个文件中都是可见的。

#### 全局行为

单例实例应该能够在整个应用程序中被引用。全局变量本质上表现出相同的行为：由于全局变量在全局作用域中可用，我们可以在整个应用程序中访问这些变量。

通常认为使用全局变量是一个糟糕的设计决策。全局作用域污染可能会导致意外覆盖全局变量的值，从而导致许多意外行为。

在 ES2015 中，创建全局变量相当罕见。新的 `let` 和 `const` 关键字通过将用这两个关键字声明的变量保持在块级作用域内，防止开发人员意外污染全局作用域。JavaScript 中的新 `module` 系统使得创建全局可访问的值变得更容易，而不会污染全局作用域，因为可以从模块中 `export` 值，并在其他文件中 `import` 这些值。

然而，单例的常见用例是在整个应用程序中拥有某种**全局状态**。让代码库的多个部分依赖于相同的可变对象可能会导致意外行为。

通常，代码库的某些部分会修改全局状态中的值，而其他部分则会使用这些数据。在这种情况下，执行顺序很重要：我们不希望在没有数据可供使用时（还没有）意外地先使用数据！随着应用程序的增长，并且有数十个组件相互依赖，理解数据流可能会变得非常棘手。
