---
title: Lua入门（更新中）
published: 2026-11-02
pinned: false
description: Unity相关知识
tags:
  - 笔记
  - Unity
  - Lua
category: 知识分享
draft: false
image: ./images/Lua01_Cover.avif
---
## 一，前情提要
本文章是我将近期学习的lua语法整理并分享。主要是复习用，也可以学习入门，由于我不想从0开始解释什么是变量，什么是函数，所以阅读本文章，**可能需要有一定编程基础**。   
这篇文章可能会有纰漏，欢迎大家批评指出。目前博客没有开放评论区，麻烦发送邮箱至  **jinzi0619@163.com** 。或者在"https://github.com/xingchen-jin/Firefly" 。底下留言，本人实在是太懒狗了，喵。    

## 二，HelloWorld

让我们开始吧，首先是学习编程的固定节目，输出"你好，世界"，大家可以先看看下面的代码
```
str = "你好，世界！"
print("Hello, World!");     -- Hello, World!
print(str)                -- 你好，世界！
```
不知道大家看出来没有，代码有奇怪的地方。只有第二行有";"。没错，但是这样写是合法的，对于lua，一条语句末尾可以选择加不加";"。这都是没有问题的。但是，我还是推荐统一点比较好。我是选择不加分号的。   

第一行 `str = "你好，世界！";` 这是在给str变量赋值。对于lua，不需要在语句开头前严格声明变量类型。  

- 注：如果中文字符串输出**乱码**，这大概率是系统终端不支持UTF-8编码导致
- 解决方法1:  把编码格式改为GB2312,但是可能造成他人协作上的不便。  
- 解决方法2：将Windows系统的默认编码调整为UTF-8。但可能影响某些旧版软件的运行和使用。  

## 三，lua数据类型
 在lua中，有以下数据类型：
 - nil : 表示无效值（在条件表达式相当于false）
 - boolean：布尔值
 - number：表示双精度类型的实浮点数，所有的数值都是number
 - string：字符串，用双引号或单引号表示。lua里 没有char
 复杂类型：
 - function：函数
 - userdata：表示任意存储在变量中的C数据结构
 - thread：表示独立线程，用于执行协同程序
 - table：表

## 四，注释
-- 单行注释
--[[  
多行  
注释  
]]
## 五，运算符
#### 算术运算符
有 + - *  / % ^  // 
没有自增自减 ++ -- 

^符号可能有点陌生，它是乘幂运算符，比如5 ^ 2 结果是25  
//符号是整除运算符，5//2 输出结果 2
-号如果单独放在变量/常量前，代表负号，比如 -A就是A的相反数  

#### 条件运算符
``> < >= <= == ~=``

#### 逻辑运算符
``and  or  not``
lua中 也遵循逻辑运算的 “短路” 规则
```
print( true and false)  -- false

print( true and true)   -- true

print( false and true)  -- false,不进行and后的判断，直接返回结果

  

print( true or false)  -- true ，不进行or后的判断，直接返回结果

print( false or false)  -- false

  
print( not true)  -- false
```

## 六，字符串相关
#### 获取长度
``print(#s)``输出字符串s的长度，一个汉字占3个长度，一个英文字符 占1个长度  
- 注: 本质上#是来获取字节序列长度的，所以对于汉字，可能在不同编码下所占长度不同。比如最常见的UTF-8编码是3字节，而GB2312编码是2字节。  
- 因为这个特性，#来获取长度，可能造成不便。  
#### 字符串多行打印
```
--lua中也是支持转义字符的

print("游戏是\n第九艺术") --游戏是
                        --第九艺术

s = [[今天
天气
真好呀
我们去散步吧
]]

print(s)    --今天
            --天气
            --真好呀
            --我们去散步吧             
```
#### 字符串拼接
字符串拼接 通过“ **..**”
``print( "123" .. "456" )``输出123456
也可以拼接number  

同时，lua字符串还有个函数**string.format()**用于格式化字符串。  
比如
```
print(string.format("再见，%d", 2026)) -- 再见，2026

--%d :与数字拼接

--%a：与任何字符拼接

--%s：与字符配对
```

#### 转字符串

使用**tostring()**

#### 字符串提供的一些公共方法

```lua
str = "abCdefgCd"
--小写转大写的方法
print(string.upper(str))
--大写转小写
print(string.lower(str))
--翻转字符串
print(string.reverse(str))
--字符串索引查找
print(string.find(str, "Cde"))
--截取字符串
print(string.sub(str, 3, 4))
--字符串重复
print(string.rep(str, 2))
--字符串修改
print(string.gsub(str, "Cd", "**"))
  
--字符转 ASCII码
a = string.byte("Lua", 1)
print(a)
--ASCII码 转字符
print(string.char(a))
```

## 条件分支
lua的条件分支逻辑和主流的高级语言区别不大，记住格式即可。 
- 注：lua中没有switch语法
#### 单分支
格式为，条件为true时进入分支   
```lua
if 条件 then 
	分支
end 
```
#### 多分支
多分支在单分支基础上，多了elseif 和else
```lua
if 条件 then 
	分支1
elseif 条件 then
	分支2
elseif 条件 then
	分支3
else
	分支
end 
```
当所有都不满足时进入else  

## 循环
#### for循环

**for循环，包含结尾**

```lua
for i =2,5 do --默认递增 i会默认+1,从2输出到5

    print(i)

end

for i =1,5,2 do --如果要自定义增量 直接逗号后面写

    print(i)

end

for i =5,1,-1 do --如果要自定义增量 直接逗号后面写

    print(i)

end

```
#### while循环
```lua
while num < 5 do   --满足条件进入循环体

    print(num)

    num = num + 1

end
```

#### repeat(do - while)最特殊
格式为
```lua
repeat 
	循环体
until 条件
```

```lua
--例子
repeat

    print(num)

    num = num + 1

until num > 5 --满足条件跳出 结束条件
```
 **必定循环一次，满足条件则退出**

## 函数（function）
在lua中，函数和数字，字符串一样，是一个数据类型，一种值。  
函数的作用是让代码方便复用的。在使用上可以把一个常用的程序段作为函数，用到的时候调用。  
现在让我们看看lua中函数长什么样吧。  
#### 无参无返回
```lua
function F1()
    print("无参无返回函数")
end
print(type(F1))   --function
F1()   --调用函数，输出无参无返回函数 
```
函数类型是function。  
而上面的格式其实是lua的语法糖，这种格式更接近主流使用的高级语言风格。  
现在让我们看看第二种格式。  

```lua
F2 = function()
	print("无参无返回函数)
end
F2()
```
第二种格式有点类似C#中的委托和事件，将匿名函数作为变量存起来。   
函数是一种变量，第一种格式其实会被翻译成``F1 = function() ... end``    
还有一点需要注意的是，尽管我们两种方式的输出结果一致。但这两种声明方式，却并非等价。请保持耐心，先让我讲讲其他内容，再继续说明。  

#### 有参有返回
```lua
function F3(a)
	return a, "123", true
end
temp, temp2, temp3, temp4 = F3("1")
print(temp)    --1
print(temp2)   --123
print(temp3)   --true
print(temp4)   --nil
```
lua函数可以有多个返回值，我们可以用多个变量，去接收。
- 当接收数量大于返回数量，多的会直接复制nil 。
- 当接收数量小于返回数量，缺失的部分会直接舍弃。  

#### 变长参数
```lua
function F4( ... )
	--变长参数使用 用一个表存起来
	arg = {...}
	--遍历表
	for i=1,#arg do
		print(arg[i])
	end
end
F4(1,"123",true,4,5,6)  --依次打印传入参数
```
我们还没有讲到表，不过这里可以看作一个数组。  

#### 函数嵌套与闭包

我们可以通过一个函数返回一个函数的方式实现函数嵌套。

``` lua
function F5()
	return function()
		print(123);
	end
end
f6 = F5()
f6() --123
```

上面的步骤是这样的：首先 F5 会返回一个匿名函数，我们用变量 f6 接收，然后再调用这个返回的函数，最后打印 123。

而**闭包**是在这个基础上，**利用了“延长外部变量生命周期”的机制**。  
我们现在听到闭包，可能会一头雾水，其实不用害怕，闭包其实并不复杂，我们先来看一个例子：

```lua

function F6(x)
	-- 延长传入参数的生命周期
	return function(y)
		return x + y
	end
end
f7 = F6(10)
print(f7(5)) -- 15
```

我们在调用 F6 时传入了参数 10，返回的函数**捕获（记住）** 了这个参数。也就是说，实际上返回的函数，内部已经**绑定了当时 `x = 10` 的状态**。所以当我们调用 `f7(5)` 时，相当于执行了 `10 + 5`。

#### 变量生命周期
**在lua中，我们默认声明的变量都是全局变量**,这跟很多其他的高级语言有着显著区别，其他往往会默认私有或可继承变量。
而声明局部变量，需要在变量前加上local关键字。
举个例子，
```lua
function F8()
	local a = 1
	b = 2
end
F8()
print(a) --nil
print(b) --2
```

#### 两种函数声明方式的区别（坑点!!!）
现在我们回到讲无参函数时，提到的两种声明方式。  
他们**最核心的区别**是，在 **`local` 局部变量下的递归行为**

##### 写法 A：局部函数声明

```lua
i = 0

local function F1()
    i = i + 1   --这里为避免溢出,提供了一个终止条件
    if i > 5 then
        return
    end
    print("F1") -- 输出 "F1"
    F1() -- ✅ 合法，可以正常递归调用自己
end
F1()
```

**原理**：Lua 在解析 `local function F1` 时，会**先声明变量 `F1`，然后再赋值函数体**。所以在函数内部可以访问到 `F1` 自身。

##### 写法 B：局部变量赋值匿名函数
```lua
i=0
local F2 = function()
    i = i + 1   --这里为避免溢出,提供了一个终止条件
    if i > 5 then
        return
    end
    print("F2")
    F2() -- ❌ 会报错：attempt to call a nil value (global 'F2')
end
```

**原理**：Lua 在解析 `local F2 = ...` 时，会**先计算右侧的表达式，再赋值给左侧**。在执行到 `function()` 内部时，外部的 `F2` 还是 `nil`，所以会报错。如果非要这么写递归，必须提前声明：
```lua
local F2
i = 0
F2 = function()
    i = i + 1   --这里为避免溢出,提供了一个终止条件
    if i > 5 then
        return
    end
    print("F2") -- 输出 "F2"    
    F2() -- ✅ 此时正常
end
F2() -- 输出 "F2" 并尝试递归调用自己
```
- **注意**：在自己实践时，最好新开一个文件，因为这些函数可能已经声明过。

## 表(table)
在lua中，大多数复杂类型都是table  
我们可以用table表示一个数组，一个字典，甚至是一个类。  
