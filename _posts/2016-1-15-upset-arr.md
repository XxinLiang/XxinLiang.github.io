---
layout: post

title: 无序就是美-谈数组打乱算法

date: 2016-01-15

categories: blog

tags: [JS,算法]

description: 打乱数组的一些算法
---

### 打乱数组！

最近做了一个小游戏——找颜色，如下图所示

<div alien="center">
	<img src="http://7xpxpr.com1.z0.glb.clouddn.com/findcolor.png" alt="" width="155px" height="280px">
</div>

可以在[xxthink.com/demo/FindColor](http://xxthink.com/demo/FindColor)上尽情玩耍，如果你够闲的话:)

现在让我们将目光移到游戏最下方那五个颜色各异的字上，每次点击它们中的任意一个，都会随机变换它们的位置与颜色，这让我第一时间想到了数组，只要打乱数组中各元素的位置，就能够实现这个功能。

### 算法实现

#### 最初算法

我们想要打乱一个数组中的元素，可以随机从数组中抽出一个元素，将该元素存放在另一个数组中，如此反复，直到原数组中的每个元素都被拎过去。

详细算法如下：

<pre>
<code>
function upset(array){
	var resultArr = [];
	var i = 0, len = array.length, n = len;
	//i用来记录随机产生的数，n用来做循环判断
	while (n){
	i = Math.floor(Math.random() * len);
		//随机产生一个下标
		if (i in array) {
			//如果这个元素还存在于数组中
			resultArr.push(array[i]);
			delete array[i];
			//delete 操作只会将数组元素的值删除，但不影响数组长度，删除后原来位置的值会变为undefined
			n --;
		}
	}
	return resultArr;
}
</code>
</pre>

这个算法就是每次产生一个下标，并判断这个下标对应的元素是否还存在，如果存在，就将它拎到准备好的数组中，并通过delete将其在原数组中删除，且不影响原数组其他元素的位置。但这个算法存在一个逻辑问题，由于i是随机产生的，可能会循环中不断出现已经被处理过的元素下标，且未处理元素越少，i是已经出现过的元素下标的可能性就越高，理论上存在一种可能，这个函数永远运行不完。

#### 改进算法

我们要解决上面算法可能产生的问题，只需要通过Array对象的splice()方法将随机到的元素拎出去，并将数组长度减一，这样就可以保证每次随机到的下标对应的元素都未经过处理。

详细算法如下：

<pre>
<code>
function upset(array) {
	var resultArr = [];
	//存放乱序后的数组
	var n = array.length;
	//循环次数
	var i;
	//记录随机产生下标
	while (n) {
		i = Math.floor(Math.random() * n--);
		//随机产生一个下标 
		resultArr.push(array.splice(i, 1)[0]);
		//将i下标下的元素移除，数组长度-1，并赋值给新数组。splice()函数会返回包含被删除项目的新数组。
	}
	return resultArr;
}
</code>
</pre>

这个算法可以解决重复处理的情况，但是算法较为复杂，我们还能进一步优化。

#### 优化算法

<pre>
<code>
function upset(array) {
	var len = array.length,
	temp = 0,
	i = 0;
	while (len) {
		i = Math.floor(Math.random() * len --);
		temp = array[len];
		array[len] = array[i];
		array[i] = temp;
	}
	return array;
}
</code>
</pre>

最后的算法最高效，也最好理解，用中间变量temp做暂存，将随机到的下标元素放在数组最后一个，并将数组长度减一，用来保护之前随机到的元素不会在之后被替换。
