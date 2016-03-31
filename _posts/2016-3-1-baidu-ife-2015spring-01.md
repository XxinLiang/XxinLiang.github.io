---
layout: post

title: 百度IFE2015编码挑战总结-1

date: 2016-03-01

categories: blog

tags: [总结,IFE,JS]

description: 百度前端技术学院学习笔记
---

## 百度IFE

百度 Web 前端技术学院（Baidu Institute of Front-End Technology 简称 IFE）是一个由百度 EFE 团队、百度人力资源部校园招聘组联合出品的、面向在校大学生的前端培训组织，借助百度大量优秀的前端工程师以及丰富的前端知识积累，帮助大学生们更加高效、系统地学习 Web 前端技术。

因为最近想系统性的总结一下之前学过的知识，准备参加2016年春季百度IFE，所以先做做之前两季的编程挑战的热热身，这个系列博客是我在编程过程中总结的一些知识。

### task001知识总结

task001是面向零基础学员以及我这种菜鸟的，任务都比较简单。大部分知识点都在[HTML与CSS阶段总结](/blog/2016/01/07/html-css/)中提到过，在这里就不再重复。

在任务6中，有这样一个问题

>有的圆角矩形是复杂图案，无法直接用border-radius，请在不使用border-radius的情况下实现一个可复用的高度和宽度都自适应的圆角矩形 

在题目规定了不能使用border-radius的情况下需要制作一个圆角矩形，我想到的方法有两种：

1. 使用HTML标签+CSS2来模拟圆角

	这种方法代码比较乱，且使用场景少，感兴趣的同学可以去搜索搜索。

2. CSS滑动门

	个人认为滑动门是在不使用border-radius的情况下最好的解决方案。

### task002知识总结

#### 为什么将&lt;script&gt;放在&lt;/body&gt;前？

当浏览器解析到&lt;script&gt;标签时，浏览器会停止解析后面的内容，优先下载此脚本并执行。如果将&lt;script&gt;标签放在&lt;head&gt;中，由于&lt;body&gt;标签未被加载，页面没被渲染，直到JS代码完全执行完前，用户看到的页面都是空白，因此最好将&lt;script&gt;标签放在&lt;/body&gt;前。

更多可阅读[JavaScript的性能优化：加载和执行](http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html)。

#### 判断数据类型

任务要求

<pre>
<code>
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
}
</code>
</pre>

刚看到这个题，我天真的认为一个<code>typeof</code>就可以解决这个问题，然而得到的答案是一个object，在小失望后，立刻对这个问题产生了兴趣：）

首先我们来看<code>typeof</code>，<code>typeof</code>运算符可以将类型信息当作字符串返回，其返回值有六种：number、string、boolean、object、function、undefined。因此<code>typeof</code>是满足不了我的需求的。这时候我们可以使用<code>instanceof</code>操作符。

<pre>
<code>
var myArr = [];
console.log(myArr instanceof Array);//true
var myObj = {};
console.log(myObj instanceof Array);//false
</code>
</pre>

看来<code>instanceof</code>已经帮我们解决了这个问题。关于<code>instanceof</code>更详细的内容，可阅读[JavaScript instanceof 运算符深入剖析](http://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/)。

在解决了这个问题后，我又在网上发现了其他的解决方法，如得到对象的字符串表示，之后用'[object Array]'与此字符串进行对比

<pre>
<code>
function isArray(arr){
	
	return Object.prototype.toString.call(arr) === '[object Array]';
}
</code>
</pre>

以及一个更简单的

<pre>
<code>
function isArray(arr){
	
	return Array.isArray(arr);
}
</code>
</pre>

<code>isArray()</code>方法详细可见[MDN参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)。

第二个任务要求

<pre>
<code>
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
}
</code>
</pre>

判断是否为函数可以直接使用<code>	typeof</code>,也可以类似Array那样去判断

<pre>
<code>
function isFunction(fn){
	
	return Object.prototype.toString.call(fn) === '[object Function]';
}
</code>
</pre>

#### 值类型与引用类型

任务要求

<pre>
<code>
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
}
</code>
</pre>

+ 值类型 

	声明一个值类型变量，编译器会在栈区分配一个空间，这个空间对应着该值类型变量，空间里存储的就是该变量的值。JavaScript中原始值类型包括：undefined，null，boolean，number，string。

+ 引用类型

	引用类型的实例是分配在堆区的，而栈区中的值则是该实例的内存分配地址的指针，即该指针指向堆区中的实例。JavaScript中引用类型主要指对象（包括数组与函数）。

关于JS对象的相关知识，可查看[MDN JavaScript指南 使用对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)。

在了解了值类型与引用类型的区别以及对象的相关知识后，我们还需要看一下深度克隆与其相对应的浅克隆的区别。

由于引用类型存放在栈区中的是指针，因此将一个引用类型直接赋值给另一个引用类型时，会出现修改其中一个，另一个也发生改变的情况，这就是浅克隆，而深度克隆则是需要所有的元素或属性均完全克隆，并于原引用类型完全独立。

了解了以上几点后，我们可以整理一下解决这个问题的思路：

1. 判断传入的参数为对象或是数组，并创建相应的数据类型
2. 枚举
3. 使用<code>hasOwnProperty()</code>方法排除继承的属性（此步骤参考[javascript克隆对象深度介绍](http://www.jb51.net/article/32015.htm)）
4. 判断当前属性是否为引用类型，若是，则递归赋值，若不是，则直接赋值
5. return

我的代码实现

<pre>
<code>
function cloneObject(obj){
	
	var o = obj.constructor  === Array ? [] : {};
	for (var i in obj) {
		
		if (obj.hasOwnProperty(i)) {
			o[i] = typeof obj[i] === 'object' ? cloneObject(obj[i]) : obj[i];
		}
	}
	return o;
}

//测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};

var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);//2
console.log(abObj.b.b1[0]);//Hello

console.log(tarObj.a);//1     
console.log(tarObj.b.b1[0]);//hello
</code>
</pre>

#### 数组去重

任务要求与代码实现

<pre>
<code>
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var resultArr = [];
    for (var i in arr) { //遍历原数组
    		if (resultArr.indexOf(arr[i]) == -1) { //如果新数组中不存在该元素
    			resultArr.push(arr[i]); //将该元素加入新数组
    		}
    }
    return resultArr;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for (var i in arr) {
		fn(arr[i],i);
    }
}
</code>
</pre>	

Array对象相关知识可查阅[Array MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

#### 正则表达式

任务要求与代码实现

<pre>
<code>
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
function trim(str) {
    // your implement
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
}
</code>
</pre>

正则表达式是被用来匹配字符串中的字符组合的模式。在JavaScript中，正则表达式也是对象。正则表达式相关知识可阅读[正则表达式 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)。

代码思路

去除字符串头部与尾部的空白字符，用<code>\s+</code>就可以解决。

邮箱按照一般格式来处理，需要注意的是后缀可能会有多个，如com.cn等。

判断手机号需考虑区号，如中国：+86，区号最多4位，而手机号为7-11位。

代码实现

<pre>
<code>
function trim(str) {
    // your implement
    return str.replace(/^\s+|\s+$/g,'');
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    return emailStr.test(/^\w+@\[0-9a-z]+(\.[a-z]{2,4}){1,3}$/);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    return phone.test(/^(\+\d{1,4})?\d{7,11}$/);
}
</code>
</pre>	

#### DOM

任务要求

<pre>
<code>
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
}
// your implement
</code>
</pre>

解决思路与代码实现

<pre>
<code>
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
     var classArr = element.className.replace(/\s+/g,',').split(',');//将原来的每个类名单独取出来存放在数组中
     var isNoRepeat = true; //假设类名没有重复
     for (var i in classArr) {
     	if (classArr[i] === newClassName) {
     		isNoRepeat = false; //如过新类名在原来类名中存在，则改为false
     	}
     }
     if (isNoRepeat) {
     	element.className += ' ' + newClassName; //如果没有重复，就将新类名添加在最后面
     }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    var newClassName = '';
    var classArr = element.className.replace(/\s+/g,',').split(',');//将原来的每个类名单独取出来存放在数组中
	for (var i in classArr) { //遍历
		if (classArr[i] != oldClassName) { //如果不和想删除的类名相同
     		newClassName += classArr[i] + ' '; //将其添加为原来的
     	}
    }
	element.className = newClassName;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
	return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var resultObj = {
    		x : 0,
    		y : 0
    };
    do{
    		resultObj.x += parseInt(element.offsetTop);
    		resultObj.y += parseInt(element.offsetLeft);
    		element = element.parentNode;
    }while(element !== document); //如果父节点不是document就不断累加
    	
    	return resultObj;
}
</code>
</pre>

之后在网上看到了更简洁的<code>removeClass()</code>,使用构造函数构造动态的正则表达式，代码如下

<pre>
<code>
function removeClass(element, oldClassName) {
    var originClassName = element.className; //获取原先的样式类
    var pattern = new RegExp("\\b" + oldClassName + "\\b"); //使用构造函数构造动态的正则表达式
    console.log(pattern);
    element.className = originClassName.replace(pattern, '');
}
</code>
</pre>

* * *

相关博客

[百度IFE2015编码挑战总结-2](http://xxthink.com/blog/2016/03/02/baidu-ife-2015spring-02/)
