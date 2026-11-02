---
title: Lua入门知识（未写完）
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
## 前情提要
本文章是我将近期学习的lua语法整理并分享。主要是复习用，也可以学习入门，由于我不想从0开始解释什么是变量，什么是函数，所以阅读本文章，**可能需要有一定编程基础**。   
这篇文章可能会有纰漏，欢迎大家批评指出。目前博客没有开放评论区，麻烦发送邮箱至  **jinzi0619@163.com** 。或者在"https://github.com/xingchen-jin/Firefly" 。底下留言，本人实在是太懒狗了，喵。    

## HelloWorld

让我们开始把，首先是学习编程的固定节目，输出"你好，世界"，大家可以先看看下面的代码
```
str = "你好，世界！"
print("Hello, World!");     -- Hello, World!
print(str)                -- 你好，世界！
```
不知道大家看出来没有，代码有奇怪的地方。只有第二行有";"。没错，但是这样写是合法的，对于lua，一条语句末尾可以选择加不加";"。这都是没有问题的。但是，我还是推荐统一点比较好。我是选择不加分号的。   

第一行 `str = "你好，世界！";` 这是在给str变量赋值。对于lua，不需要在语句开头前严格声明变量类型。  

- 注：如果中文字符串输出乱码，把编码格式该为GB2312，一般就能解决问题。
## lua数据类型
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

## 注释
-- 单行注释
--[[  
多行  
注释  
]]
## 运算符
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
