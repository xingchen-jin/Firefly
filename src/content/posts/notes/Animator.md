---
title: Unity暑期学习经历分享
published: 2026-08-01
pinned: false
description: 分享学习经历
tags:
  - 笔记
  - Unity
category: 知识分享
draft: false
image: ./images/VIS_SD_e25b.avif
---

## 动画状态的基本属性

Tag：设定标签，在代码中可以统一管理

Motion：动画判断/动画树

Speed：播放速度（不能在代码中修改）

Multiplier:可以选择设定的变量，实际播放速度时与speed乘积（从而可以用脚本修改速度）

**额外知识**：如setFloat（）可以传入哈希值；而哈希值就是通过哈希函数把输入转换成固定的输出，于是可以做到不比较输入本身，而是比较哈希值来确定输入内容。哈希要解决的比较核心的问题就是哈希冲突，这里不过多介绍。
[Hash（散列函数）_百度百科](https://baike.baidu.com/item/HASH/390310)

常见哈希算法：MD5，SHA-256等

由于整型比字符串进行比较性能更优，unity提供了Animator.StringToHash(string s)  
来进行将字符串变为哈希值。

Motion Time：播放动画片段特定时间点[0,1]

Mirror:镜像动画（只对人形有用）

Cycle Offest：刚开始播放时的偏移[0,1]


## Foot IK
IK即反向动力学，对应正向动力学FK。FK正向的从起点寻找目标，IK从目标反推起点。  
- FK：由骨骼的根节点到末梢节点一次计算器旋转位置和缩放来决定每一块骨骼的最终位置。
- IK：反过来计算，比如角色想先确定手和脚位置，然后再由最终位置，反向计算父节点的旋转和缩放
而动画状态这里的Foot IK是利用IK的一种动画矫正机制。
略微调整脚步骨骼位置至相对应的IK Goal（初始的，手动调整IK Goal不会影响FootIk，需要设置权重才能靠近修改后的）  
SetIKPositionWeight(AvatarIKGoal.RightFoot,1f) 调整右脚IK权重为1          
SetIKPosition（） 调整IKGoal位置。  

## WriteDefault

Unity的Animator会在OnEnable时，记录当前若干属性，若某一属性再动画曲线中未被修改则会用，默认值来覆盖
可以参考的blogs：
- [Unity的Write Defaults->从一个例子谈起 - Esfog - 博客园](https://www.cnblogs.com/Esfog/p/Unity_WriteDefaults.html)
- [Write Defaults的作用-CSDN博客](https://blog.csdn.net/yjy99yjy999/article/details/82730948)
- [[Unity] AnimatorStates中的write defaults详解-CSDN博客](https://blog.csdn.net/rickshaozhiheng/article/details/77838379)
























