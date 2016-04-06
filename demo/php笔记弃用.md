### PHP基础语法

这篇笔记记录一些PHP中最基础的语法，包括PHP标记、变量、数据类型、运算符、流程控制、数组、字符串等知识点。其中每一个知识点都只是停留在怎么用的程度上，没有继续深入，但如果你有至少一门编程语言基础，想要快速上手PHP的话，这篇博客也许会让你满意的。

#### PHP标记

PHP标记有四种，分别为

```
<?php echo "hello world"; ?>
<? echo "hello world"; ?>//短标记
<script language="php">echo “hello world”</script>
<% echo "hello world"; %>  //asp风格
```

其中使用短标记与asp风格需要修改php.ini的配置文件。

#### 变量

PHP与JS都属于弱类型语言，变量以$开头，后面直接跟变量名，可别跟对小括号。变量名区分大小写。

##### 变量的赋值

PHP的赋值分为值赋值与引用赋值，引用赋值就是传址。

```
$var_1 = 'hello';
$var_2 = &$var_1; //引用赋值
```

引用赋值时别忘记那个&符号哦。

##### 变量的变量

这个东西比较6，直接上代码，慢慢体会

```
$var_1 = "hello";
$$var_1 = "world";
echo $var_1;     //输出hello
echo $hello;      //输出world
echo ${$var_1} //输出world
```

即可以将变量的值当作变量名来用。

##### 超全局变量

php提供了很多有用预定于的变量，用于提供大量与环境有关的信息。打印/输出超全局变量:<code>parent_r($\_SERVER)</code>

+ $\_SERVER 服务器变量，该全局变量包含着服务器和客户端配置及当前请求环境的有关信息

+ $\_GET 该变量包含使用GET方法传递的参数的有关信息，用法<code>$id = $\_GET['id'];</code>

+ $\_POST 该变量包含使用POST方法传递的参数的有关信息，用法<code>$username = $\_POST['username'];</code>

+ $\_REQUEST 该变量记录着通过各种输入方法传递给脚本的变量，如GET POST，但不推荐使用，因为它慢且不安全

+ $\_COOKIE cookie变量数组

+ $\_SESSION 会话变量数组

+ $\_FILES 与上传文件有关的变量数组

+ $\_ENV 环境变量数组

+ $GLOBALS 所有全局变量数组    

#### 常量

常量分为内置常量与自定义常量，通常常量名总是为大写，可以使用define()函数定义常量。常量是全局的。

```
define('PI', 3.1415926);
```

+ 内置常量

    - PHP_OS PHP所在操作系统的名称

    - PHP_VERSION 当前php的版本号

+ 魔术常量

    - \__LINE__ 文件中的当前行号

    - \__FILE__ 文件的完整路径和文件名

	- \__FUNCTION__ 函数名称

	- \__CLASS__	类的名称

	- \__METHOD__ 类的方法名

#### 数据类型

+ 标准数据类型

- 字符串

字符串有三种定义方式：单引号，双引号以及定界符(heredoc)

单引号字符串中出现的变量不会被变量的值替代

双引号中的变量会被变量值替代，如果遇到$符，解析器会尽可能多地取得后面的字符以组成一个合法的变量名,如果想明确的指定名字的束，用花括号把变量名括起来

定界符

```
$str = <<<EOD
Example of string
using heredoc syntax.
EOD;
echo $str;
```

在PHP定界符中的任何特殊字符 都不需要转义

PHP定界符中的PHP变量会被正常的用其值来替换

结束标识符所在的行不能包含任何其它字符，这意味着该标识符不能被缩进，在分号之前之后都不能有任何空格或制表符

- 整型(integer)

- 浮点型(float, double)

- 布尔型(bool)

+ 复合数据类型

- 数组

- 对象

+ 特殊数据类型

- 资源

```
$txt = fopen("test.txt", "r");
```

- null

没有设置为任何预定义的变量

明确的赋值为null

使用函数unset()清除

#### 类型相关

因为php对于类型定义非常的松散，所以有时会根据引用变量的环境，将变量自动转换为最适合的类型。除此之外，还有许多类型相关的函数

+ gettype() 返回变量的类型，共有8个可能的值 string、integer、float、boolean、array、object、null、unknow    
+ is_type() 查看变量是否属于某个类型，是返回TRUE，否返回FALSE

```
$arr = array(5);
echo is_array($arr);

$num = 2;
echo is_int($num);
```

+ var_dump() 获取变量的值和类型的详细信息

#### 运算符

PHP的运算符与JS的运算符基本一致，分为

+ 算数运算符 + - * / %

+ 赋值运算符 ＝ +＝ -＝ \*＝ /＝ %= 以及拼接运算符 .＝

+ 字符串运算 不同于JS的+，PHP是用 . 来做字符串拼接的

+ 递增递减运算符 即 ++ \-\-

+ 逻辑运算符 与 && 或 \|\| 非 !

+ 比较运算符 与JS一致，大于、小于、不等于、全等于等

+ 三元运算符

#### 流程控制

与其他语言流程控制基本相同，有以下几种

+ if语句

+ Switch语句

+ While语句

+ do...while语句

+ for循环

+ foreach循环

    foreach循环用来遍历数组，每次循环都将指针后移一位

```
//语法格式1：
foreach (array_expr as $value) {
	//statements
}
//语法格式2：
foreach(array_expr as $key=>$value){
	//statements
}
```

+ 跳出循环

    - break

    - continue

#### 数组

数组可以理解为有序的（键-值)对组成的数据值的集合，根据索引值的不同数组分为：索引数组和关联数组

```
//索引数组
$strs = array("hello", "world");
//关联数组
$week = array("a" => "星期一", "b" => "星期二");
```

##### 数组的基本操作

+ 直接赋值

```
$fruits[] = "apple";
$languages["en"] = "english";
```

+ range() 建立一个包含指定范围单元的数组

+ unset() 释放给定的变量

+ print_r() 打印数组

+ count() 取得数组大小

+ in_array() 检查数组中是否包含某个值

##### 数组排序

+ sort()、rsort() 对数组进行升序和降序

+ ksort()、krsort() 对数组按索引进行升序或降序, 并保持索引关系

##### 数组字符串转换

+ explode() 返回由字符串组成的数组

```
$str = "1,2,3,4,5,6";
$arr = explode(',', $str);
print_r($arr);
//Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 [5] => 6 )
```

+ implode() 将数组元素连接成字符串

```
$arr = array('a','b', 'c', 'd');
$str = implode('|', $arr);
echo $str;
//a|b|c|d
```

##### 字符串

查找与替换

+ strpos()

    int strpos(string haystack, mixed needle [, int offset])

    strpos()函数在 haystack 中以区分大小写的方式找到 needle 第一次出现的位置;如果没有找到则返回FALSE;可选参数offset 指定开始查找的位置。

```
echo strpos("Hello world!","wo");
//6
```

+ stripos()

    stripos()与strpos()功能相同，只是查找时不区别大小写

+ str_replace()

    mixed str_replace(mixed search, mixed replace, mixed subject [, int &count])

    str_replace()函数在subject中以区分大小写的方式搜索 search ，用replace替换找到的所有内容; 如果没有找到search，则subject保持不变;如果定义了可选参数 count 则只替换subject中count个search。

```
$str = "test@@gmail.com";
$email = str_replace("@", "(at)", $str, $i);
echo $email;
//test(at)(at)gmail.com
echo "替换数：$i";
//替换数：2
```

+ str_ireplace()

    str_ireplace()与str_replace()功能相同，只是不区分大小写

截取字符串

+ substr()

    string substr(string string, int start [, int length])

    从start位置取出length长度的字符，字符串位置开始值为零；如果没有指定length，那么默认一直到字符串末尾

```
echo substr("Hello world", 6);
//world
echo substr("hello world", 6, 3);
//wor
```

+ strstr()

    string strstr(string haystack, string needle)

    strstr() 函数搜索一个字符串在另一个字符串中的第一次出现。该函数返回字符串的其余部分（从匹配点）。如果未找到所搜索的字符串，则返回false

```
echo strstr("Hello world!","wor");
//world!
```

+ stristr()

    stristr()与strstr()功能相同，只是不区分大小写

删除字符串

+ ltrim()

    string ltrim(string str [, string charlist])

    ltrim 函数删除字符串左侧空格或其他预定义字符

+ rtrim()

    string rtrim(string str [, string charlist])

    rtrim 函数删除字符串右侧空格或其他预定义字符

+ trim()

    trim 函数删除字符串两侧空格或其他预定义字符

##### 其他处理函数

+ strlen() 获取字符串长度

```
$str = "xxthink";
echo strlen($str);
//7
```
+ strtolower() 将字符串转换为小写字母

```
$str = "XXTHINK";
echo strtolower($str);
//xxthink
```
+ strtoupper() 将字符串转换为大写字母

```
$str = "你好啊 xx";
echo strtoupper($str);
//你好啊 XX
```
+ strrev() 反转字符串

```
$str = "hello world";
echo strrev($str);
//dlrow olleh
```

+ strip_tags() 删除字符串中HTML XML PHP 标签

```
$str = "test <a href=\"http://www.xxthink.com\">xx</a>";
echo strip_tags($str);
```

+ htmlspecialchars() 函数把一些预定义的字符转换为HTML实体

```
$str = "<p> 这是一个段落 </p>";
echo htmlspecialchars($str);
//<p> 这是一个段落 </p>
```
