---
layout: post

title: 百度IFE2015编码挑战总结-2

date: 2016-03-02

categories: blog

tags: [总结,IFE,AJAX,HTTP]

description: 百度前端技术学院学习笔记
---

### task002知识总结 续

#### Ajax学习笔记

任务要求

<pre>
<code>
//学习Ajax，并尝试自己封装一个Ajax方法
function ajax(url, options) {
    // your implement
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
</code>
</pre>

 HTTP相关知识

1. HTTP是计算机通过网络进行通信的规则

2. HTTP是一种无状态的协议(不建立持久的连接，服务端不保留连接的相关信息,浏览器发出请求和服务器返回响应是一个没有记忆的过程)

3. 一个完整的【HTTP请求】过程有7个步骤：

	1.建立TCP连接

	2.Web浏览器向Web服务器发送请求命令

	3.Web浏览器发送请求头信息

	4.Web服务器应答

	5.Web服务器发送应答头信息

	6.Web服务器向浏览器发送数据

	7.Web服务器关闭TCP连接

HTTP请求

1. HTTP请求的方法或动作，POST或GET

2. 正在请求的URL

3. 请求头，包含一些客户端环境信息，身份验证信息等

4. 请求体(请求正文)，包含要发送的一些字符串信息,表单信息等等

GET:一般用于信息的获取，使用URL传递参数，对发送信息的数量也有限制，一般在2000字符！默认方式，一般用于查询、获取操作,不是很安全，任何人可见，信息都显示在URL中

POST：一般用于修改服务器上的资源，对所发送的数量无限制。一般用于发送表单数据，新建，修改，删除等操作，要安全一些，不在URL中显示，对其他人不显示。

【幂等】:一个操作任意多次执行所产生的影响均与一次执行的影响相同。GET请求就是一种幂等操作。

HTTP响应一般由3部分组成

1. 一个数字或文字组成的状态码，用来显示请求是成功还是失败

2. 响应头，和请求头一样包含许多有用信息，如服务器类型、日期时间、内容类型和长度等

3. 响应体，即响应正文//响应头和响应体之间有空行

HTTP状态码

	1XX:信息类，表示收到Web浏览器请求，正在进一步处理中

	2XX:成功，表示用户请求被正确接收

	3XX:重定向，表示请求没有成功，客户必须采取进一步动作

	4XX:客户端错误，表示客户端提交的请求有错误，例如：404 NOT Found,意味着请求中所引用的文档不存在

	5XX:服务器错误，表示服务器不能完成对请求的处理，如：500

Ajax相关知识有点多，就不列出来了，推荐阅读[AJAX教程 W3C](http://www.w3school.com.cn/ajax/index.asp)

代码思路

1. 获取XMLHttpRequest对象，确定请求类型，默认GET

2. 处理data属性，变成一个能在POST时使用的字符串

3. 发送请求，判断请求类型，若为GET则直接使用<code>send()</code>方法，否则先执行<code>setRequestHeader()</code>方法，再执行<code>send(string)</code>

4. 判断是否请求成功，并执行相应方法

代码实现

<pre>
<code>
function ajax(url, options) {
    // your implement
    //获取XMLHttpRequest对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    
    //处理type（请求类型）
    options.type = options.type || "GET";
    
    //处理需要POST的值
    var postData = ''; //需要post的值
    
    if (typeof options.data === 'object') {
    		for (var i in options.data) {
    			postData += i + "=" + options.data[i] + "&";
    		}
    }
    
    //发送请求
    xhr.open(options.type, url, true);
    if (options.type === "GET") {
    		xhr.send();
    } else {
    		xhr.setRequestHeader('Content-type', 'application/x-www-from-urlencoded');
    		xhr.send(postData);
    }
    
    //readyState
    xhr.onreadystatechange = function (){
    		if (xhr.readyState === 4) { //如果请求已经完成
    			if (xhr.status === 200) { //响应已就绪
    				if (options.onsuccess) {
    					options.onsuccess();
    				}
    			} else {
    				if (options.onfailed) {
    					options.onfailed();
    				}
    			}
    		}
    }
}
</code>
</pre>

在最后编写<code>readyState</code>块时发现<code>if</code>多层嵌套时会使代码可读性变得比较差，如果各位有什么好的解决方案可以留言，非常感谢⌒(*＾-゜)v 

* * *

相关博客

[百度IFE2015编码挑战总结-1](http://xxthink.com/blog/2016/03/01/baidu-ife-2015spring-01/)
