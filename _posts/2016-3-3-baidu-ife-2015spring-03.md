---
layout: post

title: 百度IFE2015编码挑战总结-JavaScript作用域

date: 2016-03-03

categories: blog

tags: [总结,IFE,JS]

description: 百度前端技术学院学习笔记
---

## JavaScript作用域学习笔记

> ”JavaScript中的函数运行在它们被定义的作用域里，而不是它们被执行的作用域里。”  --《JavaScript权威指南》

### 函数申明与函数表达式

下面这段代码展示了函数申明与函数表达式的区别

<pre>
<code>
//函数声明:
function add(a, b){
	return a + b;
}
//以下皆是函数表达式:
var add =  function (a, b){
	dosomething();
}

//immediately executed function(立即执行函数)
(function (){
	dosomething();
})();

return function (){
	dosomething();
};

//命名函数表达式（Named function expression）
var add = function foo(a, b){
	dosomething();
}
</code>
</pre>		

JavaScript是有预编译过程的，在JS执行一段代码前，都会首先处理函数声明与var关键字,而函数表达式会在执行过程中才计算。

<pre>
<code>
alert(typeof firstFn);//function
function firstFn(){
	console.log('xx');
}
alert(typeof secondFn);//undefined
var secondFn = function (){
	console.log('xx');
}
</code>
</pre>

正是因为存在预编译阶段会将函数声明提前，因此在执行到<code>alert(typeof firstFn);</code>时，才能正确的弹出"function"，而函数表达式是不会被提前的，因此第二个alert会弹出"undefined"。

#### Function构造器

function构造器一般不常用，其形式如下：

<pre>
<code>
var addFn = new Function('a', 'b', 'return a + b;');
console.log(addFn(3, 5));//8
var printFn = Function ('console.log("hello");');
printFn();//hello
</code>
</pre>	

function构造器的作用域与一般的函数声明或函数表达式也有不同

<pre>
<code>
//在function构造器中创建的变量仍然是局部变量
Function('var testnum = 10');
console.log(testnum);//testnum is not defined

//Function构造器中可以拿到全局变量，却拿不到外层的局部变量
var a = 'xx';
(function (){
	var b = 'yy';
	Function('console.log(a);console.log(b);')(); //xx, b is not defined
})();
</code>
</pre>

### 作用域与作用域链

作用域就是变量与函数的可访问范围，可分为全局作用域与局部作用域。

#### 全局作用域

在代码中任何地方都能访问的对象拥有全局作用域。

1. 在最外层函数或最外层函数外面定义的变量拥有全局作用域

2. 所有未定义直接赋值的变量拥有全局作用域

3. 所有window对象的属性拥有全局作用域

#### 局部作用域

局部作用域一般只能在固定的代码段内可访问，如在函数内部定义的变量就为局部变量，在函数外无法访问。

#### JavaScript没有块作用域

页面布局：<code>body</code>下四个button按钮

<pre>
<code>
//希望点任意一个按钮都会打印出相对应的下标
var inputArr = document.getElementsByTagName("input");
for (var i = 0, len = inputArr.length; i < len; i ++) {
	inputArr[i].onclick = function (){
		console.log(i);//4
	}
}
console.log(i);//4
</code>
</pre>

由于没有块作用域，变量<code>i</code>在<code>for</code>循环结束后依旧可以访问，因此不论点那个按钮都只会打印出4

解决方案有很多，这里只列举一种

<pre>
<code>
var inputArr = document.getElementsByTagName("input");
for (var i = 0, len = inputArr.length; i < len; i ++) {
	(function (i){
		inputArr[i].onclick = function (){
			console.log(i);//对应下标 0，1，2，3
		}
	})(i);
}
console.log(i);//4
</code>
</pre>

#### 作用域链

在 JavaScript 中，函数也是对象，实际上，JavaScript 里一切都是对象。函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供 JavaScript 引擎访问的内部属性。其中一个内部属性是 [[Scope]]，由 ECMA-262 标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问。

1. 在函数创建时，它的作用域链中会填入一个全局对象，该全局对象包含了所有全局变量。

2. 函数执行时会创建一个称为“运行期上下文(execution context)”的内部对象，运行期上下文定义了函数执行时的环境。每个运行期上下文都有自己的作用域链，用于标识符解析，当运行期上下文被创建时，而它的作用域链初始化为当前运行函数的[[Scope]]所包含的对象。

3. 这些值按照它们出现在函数中的顺序被复制到运行期上下文的作用域链中。它们共同组成了一个新的对象，叫“活动对象(activation object)”，该对象包含了函数的所有局部变量、命名参数、参数集合以及this，然后此对象会被推入作用域链的前端。

4. 当运行期上下文被销毁，活动对象也随之销毁。

在函数执行过程中，每遇到一个变量，都会经历一次标识符解析过程以决定从哪里获取和存储数据。该过程从作用域链头部，也就是从活动对象开始搜索，查找同名的标识符，如果找到了就使用这个标识符对应的变量，如果没找到继续搜索作用域链中的下一个对象，如果搜索完所有对象都未找到，则认为该标识符未定义。函数执行过程中，每个标识符都要经历这样的搜索过程。

参考文章[JavaScript 开发进阶：理解 JavaScript 作用域和作用域链](http://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html)