---
layout: post

title: ES6从入门到放弃-Promise

date: 2016-06-21

categories: blog

tags: [ES6,JS]

description: ES6中的Promise
---

## 异步编程

最近在搞vue、webpack和gulp这些东西，都快忘记我还有个博客了……这次我们直接讲ES6中的Promise，先来看看我在项目中遇到的问题：执行一个异步操作，在该操作完成后再执行下一个异步操作，如此反复。

用代码描述大概是这样的

	let aQuestionFun = () => {
		setTimeout(() => {
			console.log('first');
			setTimeout(() => {
				console.log('second');
				setTimeout(() => {
					console.log('third');
				}, 500);
			}, 1000);
		}, 2000);
	}

仅仅三次回调，代码就形成了一个金字塔的形状，如果这里逻辑再复杂一些就会变成传说中的回调地狱。

如果你看不懂上面代码中```() => {}```这种写法，说明你还不了解ES6的箭头函数，不过没关系，如果你愿意花几分钟看看[MDN 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)文档，你将很快学会使用它。

### 用Promise解决问题

在解决问题之前，我们先来看看什么是Promise。Promise对象多用于异步计算，一个Promise对象代表着一个还未完成，但预期将来会完成的操作。

Promise对象有以下几种状态：

+ fulfilled：成功的操作
+ rejected：失败的操作
+ pending：初始状态，既不是fulfilled也不是rejected

> pending状态的promise对象既可转换为带着一个成功值的fulfilled状态，也可变为带着一个失败信息的rejected状态。当状态发生转换时，promise.then绑定的方法（函数句柄）就会被调用。(当绑定方法时，如果 promise对象已经处于 fulfilled 或 rejected状态，那么相应的方法将会被立刻调用，所以在异步操作的完成情况和它的绑定方法之间不存在竞争条件。

语法：

	new Promise(function(resolve, reject) { ... });

参数```resolve```用在处理执行成功的场景，参数```reject```则用在处理执行失败的场景。一旦我们的操作完成即可调用这些函数。

更多Promise相关的描述及方法可以在[MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)中看到，如果你是Promise的新朋友，那最好先去看看。

基于以上对Promise的理解，我们开始解决问题：

首先，我们使用Promise执行一次异步操作并回调，代码是这个样子的：

	let logFirst = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('first');
				resolve();
			}, 2000);
		});
	}
	
	logFirst()
		.then(() => { console.log('second'); })
		.then(() => { console.log('last'); });
	
	//console
	//	first
	//	second
	//	last

我们通过```Promise.prototype.then()```方法，用非常优雅的链式调用解决了回调的问题，但如果我想让second在first被打印出来的一秒后再被打印呢？

	let logFirst = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('first');
				resolve();
			}, 2000);
		});
	}
	
	logFirst()
		.then(() => {
			new Promise((resolve, reject) => {
				setTimeout(() => {
					console.log('second');
					resolve();
				});
			}).then(() => {
				console.log('last');
			});
		});
	
	//console
	//	first
	//	second
	//	last

等等，好像又开始出现三角的感觉了，这肯定不是我们想要的，也不是Promise想要的，那问题出在哪里呢？又如何解决呢？

我们将目光拉回之前的一段代码

	logFirst()
		.then(() => { console.log('second'); })
		.then(() => { console.log('last'); });

我们来梳理一下这段代码，首先```logFirst()```会返回一个Promise对象，该对象拥有原型方法```then()```，因此我们调用了```then()```方法，打印出了字符串second，然后我们又调用了```then()```方法，这说明第一个```then()```方法返回了一个Promise对象，这个返回的Promise是一个怎样的Promise呢？这个Promise对象能否被我们自己return出去的Promise对象替代呢？

让我们来改造一下刚才这段函数

	logFirst()
		.then(() => {
			console.log('second'); 
			return 'xx';
		})
		.then((msg) => {
			console.log('last', msg);
		});
	
	//console
	//	first
	//	second
	//	last xx

我们发现，上一个```then()```方法的回调函数```onFulfilled()```的返回值被当做下一个```then()```方法的回调函数```onFulfilled()```的传入参数，那如果我返回一个Primise对象呢？

其实```onFulfilled()```函数的返回值可以有两种情况，如果返回普通的值，那么```then()```方法会返回一个默认的Promise的变量，并直接由pending状态转化为fulfilled状态，使得then方法的```onFulfilled()```函数被触发，并将这个普通的值当做其参数传入。

而如果```onFulfilled()```回调函数返回一个Promise对象，那这个Promise对象将成为```then()```方法的返回值。

总结一下，就是```then()```方法的返回值取决于其回调函数```onFulfilled()```的返回值，如果```onFulfilled()```返回一个Promise对象，那这个Promise对象将被当做```then()```方法的返回值，否则将会返回一个默认的Promise对象。

最后附上改良后的代码

	let log = (msg, time) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log(msg);
				resolve();
			}, time);
		});
	}
	
	log('first', 2000)
		.then(() => { return log('second', 1000); })
		.then(() => { log('last', 500); });

至此，我们终于可以优雅的解决回调嵌套问题啦~