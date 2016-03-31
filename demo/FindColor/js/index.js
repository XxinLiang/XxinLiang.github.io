function getID(id) {
	return document.getElementById(id);
}

var time = getID("time");
var result = getID("result");
var mainFont = getID("mainColor");
var divCont = getID("uselect");
var fontArr = divCont.getElementsByTagName("div");

var randFontArr = ["蓝", "红", "黄", "绿", "黑"];
var randColorArr = ["blue", "red", "yellow", "green", "black"];
var judge = [
	["blue", "蓝"],
	["red", "红"],
	["yellow", "黄"],
	["green", "绿"],
	["black", "黑"]
];

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
		//将i下标下的元素移除 并赋值给新数组 splice()函数会返回包含被删除项目的新数组
	}
	return resultArr;
}

//var textArr = upset(randColorArr);
//console.log(textArr);

function allReset() {
	randFontArr = upset(randFontArr);
	randColorArr = upset(randColorArr);

	mainFont.innerHTML = randFontArr[Math.floor(Math.random() * 5)];
	mainFont.style.color = randColorArr[Math.floor(Math.random() * 5)];

	for (var i = 0; i < fontArr.length; i++) {
		fontArr[i].innerHTML = randFontArr[i];
		fontArr[i].style.color = randColorArr[i];
	}

}
allReset();

var countNum = 0;

function judgeArr(array) {
	for (var i = 0; i < judge.length; i++) {
		//			console.log(judge[i]);
		if (array.toString() == judge[i].toString()) {
			countNum++;
			break;
		}
	}
	
	result.innerHTML = countNum;
}

//	var textArr = ["black", "黑"];
//	console.log(textArr);
//	console.log(judge[4]);
//	console.log(textArr.toString() == judge[4].toString()?true:false);
//	judgeArr(textArr);
//	console.log(countNum);
var timer = null;

function CountDown(){
	var intTime = 20;
	timer = setInterval(function (){
		time.innerHTML =  (time.innerHTML - 0.1).toFixed(1); 
		 intTime = parseInt(time.innerHTML);
		 	console.log(intTime);
		 if (time.innerHTML == "0.0") {
		 	time.innerHTML = "0";
			clearInterval(timer);
			if (countNum > 15) {
				confirm(countNum + "分，你这么牛逼咋不上天呢？再来一盘？");
				location.reload(true);
			} else if (countNum > 8){
				confirm(countNum + "分，666666666,再来一盘？");
				location.reload(true);
			}else{
				confirm(countNum + "分，菜狗,再来一盘？");
				location.reload(true);
			}
		}
	},100);
}



for (var i = 0; i < fontArr.length; i ++) {
	
	fontArr[i].onclick = function (){
		var uFont = this.innerHTML;
		var mColor = mainFont.style.color;
		var uSele = [mColor, uFont].toString();
//		console.log(uSele);
		judgeArr(uSele);
		console.log(countNum);
		if (countNum == 1) {
			clearInterval(timer);
			CountDown();
		}
		if (countNum >= 1) {
			allReset();
		}
		
	}
	
}