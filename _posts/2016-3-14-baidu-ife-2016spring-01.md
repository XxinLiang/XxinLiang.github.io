---
layout: post

title: 百度IFE2016编码挑战总结-01

date: 2016-03-14

categories: blog

tags: [总结,IFE,HTML,CSS]

description: 百度前端技术学院学习笔记
---

## 2016IFE开始啦

今年的IFE终于开始啦，第一时间报的名，等了这么久，期间队友换了一个又一个，终于在今天找齐了靠谱的队友，组成了我们萌萌的团队SUNSHINE（这个队名的锅队长表示他背了），希望大家都能加油，期待我们一起从IFE毕业。

### task001

task001主要是帮助我们了解、认识、学习、掌握HTML以及CSS的，因此都不算特别难，不过重要的知识点也不少。其中第1，2，5三个任务比较基础，就不在此总结知识点了。

#### task001_3 三栏式布局

任务描述

+ 使用HTML与CSS按照[示例图（点击查看）](http://7xrp04.com1.z0.glb.clouddn.com/task_1_3_1.png)实现三栏式布局。

+ 左右两栏宽度固定，中间一栏根据父元素宽度填充满，最外面的框应理解为浏览器。背景色为 #eee 区域的高度取决于三个子元素中最高的高度。

我的代码实现

HTML结构（主要）


	<main class="main-wrap">
	    <!--团队logo及名称展示-->
	    <div class="logo-wrap">
	        ……
	    </div>
	    <!--个人logo展示-->
	    <div class="team-wrap">
	        ……
	    </div>
	    <!--团队文字介绍-->
	    <div class="text-wrap">
	        ……
	    </div>
	</main>


CSS样式（主要）

<pre><code>
.main-wrap {
	min-width: 520px;
}
.logo-wrap {
	float: left;
	width: 160px;
}
.team-logo {
	float: left;
	width: 80px;
}
.text-wrap {
	margin-left: 220px;
	margin-right: 140px;
}
</code></pre>

[演示demo](http://xxthink.com/baidu-ife/task/task001/task001_3/index.html)

这种方法采用的浮动布局，左右定好宽度并且分别进行左、右浮动，中间列不定宽度，会自动插入到中间。该方法的优点是简单，只需要调整一下结构，就可以完成任务要求，但是缺点也不少，要将中间的div放在最后，而且当页面缩小后会发生层叠现象，不过解决这个问题也不麻烦，只要给最外层div加一个min-width就行了。

第二种方法是margin负值法，首先需要中间的主体放在结构最前面，而且需要一个容器，容器左浮动，宽度100%。左右栏同样左浮动，左边设置负的margin为100%，刚好在父级的左侧，而右侧需要设置自己的margin值为负的自身宽度，这种方法是浮动与负的margin值的结合，代码相对复杂，不容易上手，且同样需要结构去配合，最重要的是多出一个div就跟要我的命一样好吗。

我的代码实现

HTML结构（主要）


	<div class="main-content">
        <div class="main"></div>
	</div>
	<div class="left"></div>
	<div class="right"></div>


CSS样式（主要）

<pre><code>
html,
body,
.main-content {
	height: 100%;
}		
.main-content {
	width: 100%;
	float: left;
}
.main {
	height: 100%;
	margin: 0 180px;
	background-color: #ccc;
}
.left,
.right {
	float: left;
	width: 160px;
	height: 100%;
	background-color: #999;
}
.left {
	margin-left: -100%;
}
.right {
	margin-left: -160px;
}
</code></pre>

[演示demo](http://xxthing.com/demo/three.html)

第三种方法依靠绝对定位，首先左右栏绝对定位，中间使用margin撑开距离，最容易理解，结构也很随意，可任意调整，但是当屏幕宽度足够小时，如果中间部分（main）有内容或最小宽度时，会发生层叠，解决方法依然可以采用给公共父级添加最小宽度。

我的代码实现

HTML结构（主要）


	<div class="left"></div>
	<div class="main"></div>
	<div class="right"></div>


CSS样式（主要）

<pre><code>
html,
body {
	margin: 0;
	height: 100%;
}
.left,
.right {
	position: absolute;
	top: 0;
	width: 160px;
	height: 100%;
	background-color: #ccc;
}
.left {
	left: 0;
}
.right {
	right: 0;
}
.main {
	height: 100%;
	margin: 0 180px;
	background-color: #999;
}
</code></pre>		

[演示demo](http://xxthing.com/demo/three-absolute.html)

#### task001_4 定位与居中问题

任务描述

+ 实现如[示例图（点击就送）](http://7xrp04.com1.z0.glb.clouddn.com/task_1_4_1.png)的效果

+ 灰色元素水平垂直居中，有两个四分之一圆位于其左上角和右下角。

块元素居中的方法我知道的有三种

+ 固定margin法

	居中元素相对父级定位，<code>position:absolute; top:50%; left:50%; margin-top: - 0.5 * 高度; margin-left: - 0.5 * 宽度</code>，这种方法一般用在宽高固定，永不会变的场景中，否则每次改变宽高时都需要改变margin的值。

+ transform法

	该方法是上一个方法的改进，当宽高改变时依然可以居中，核心代码为<code>position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);</code>。

+ 父级flex法

	这个方法是从居中元素的父级下手，给其父级添加样式<code>display: flex; align-items: center; justify-content: center;</code>从而达到内部元素的居中。

我用的第三种方法解决的这个问题，附上[demo](http://xxthink.com/baidu-ife/task/task001/task001_4/index.html)

#### task001_6 通过HTML及CSS模拟报纸排版

任务描述

+ 参考[设计稿](http://7xrp04.com1.z0.glb.clouddn.com/task_1_6_2.jpg)，实现页面开发，要求实现效果与样例基本一致。

+ 页面宽度固定

这个任务知识点比较零碎，直接附上[我做的页面](http://xxthink.com/baidu-ife/task/task001/task001_6/index.html)

做这个任务让我知道了一个黑科技<code>font-variant: small-caps;</code>，这个神奇的属性可以将所有的小写字母转化为小型的大写字母，可以完美的解决嵌套后下划线不同粗细的问题，推荐你也快去用用: )

做这个任务时要考虑一些兼容性问题以及遵守正确的嵌套规则，所以标签可能不够语意化，速度也较之前慢了很多，虽然代码还存在很多问题，不过学到了挺多东西还是很开心啊，哈哈哈。

#### task001_7 实现常见的技术产品官网的页面架构及样式布局

任务描述

+ 通过HTML及CSS实现设计，[效果图](http://7xrp04.com1.z0.glb.clouddn.com/task_1_7_2.jpg)

这个任务考察的是整个页面的布局，以及标签的语意化和css的精简度，在兼容性方面有做考虑，比较重要的就是大背景图的样式以及html的正确嵌套吧，下面附上我的[demo](http://xxthink.com/baidu-ife/task/task001/task001_7/index.html)

在做这个页面时用到了LESS，但是只用了变量与嵌套，稍稍用了一点混合，看来要好好学学LESS啦。

#### task001_8 响应式网格（栅格化）布局

任务描述

使用HTML与CSS实现类似[BootStrap的响应式12栏网格布局](http://7xrp04.com1.z0.glb.clouddn.com/task_1_8_1.png)，根据屏幕宽度，元素占的栏数不同

说实话我不喜欢BootStrap，所以一开始做这个题我是不愿意的，但是后来又自己琢磨了一下，发现这个题还是蛮有意思的，首先要运用媒体查询，其次还需要考虑盒模型的问题，这个我想到两种解决方案，一种是<code>box-sizing: border-box;</code>，另一种就是我用的<code>calc以及outline</code>，calc函数可以用在任何一个需要<length>的地方，有了calc()，就可以通过计算来决定一个对象的大小和形状，详细请看[calc MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)，而outline则是为了解决边框的问题，当然，如果没有边框就可以不用outline啦，下面是我的CSS代码

CSS样式（核心）

    .row:before, .row:after {
        content: "";
        display: table;
    }
    .row:after {
        clear: both;
    }
    [class*='col-'] {
	    float: left;
        height: 50px;
        margin: 10px;
        outline: 1px solid #ccc;
        background-color: rgba(86, 61, 124, .15);
    }
    @media (min-width: 769px) {
        .col-md-1 {
            width: calc(8.33333333% - 20px);
        }
        ......
    }
    @media (max-width: 768px) {
        .col-sm-1 {
            width: calc(8.33333333% - 20px);
        }
	    ......
    }

放上我的[代码演示](http://xxthink.com/baidu-ife/task/task001/task001_8/index.html)


更新于2016-03-20 8:35 未完
