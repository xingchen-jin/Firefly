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
 - function：方法
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

