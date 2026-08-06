---
title: Animator
published: 2026-08-06
pinned: false
description: Unity相关知识
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

---
## 动画状态转换
在不同动画状态间可以设置不同的转换（Transition），同一对状态间可以设置多个转换。
有勾选Solo优先转换不考虑其他转换，Mute永远不执行。

- hasExitTime：默认勾选，经过某段时间进行转换。
- ExitTime：开始转换时间（比例值）
- Fixed Duration:设置过渡时间单位（s或%）
- Transition Offest:进入下一个动画状态的偏移量。
- Interruption Source:表示哪些转换可以打断当前转换。

## 动画状态转换条件（Conditions）
执行动画转换需要满足ExitTime和Conditions两个条件。 
conditions可以和参数关联，设置转换条件。可以通过脚本修改参数做到动画转换的控制。 
- 多条条件之间关系为逻辑与。  
- 而Transtions之间的条件关系为逻辑或。 
当设置Trigger为条件时，要注意若当前的条件开始未被执行，则trigger一直处于激活状态。   

## Interruption动画过渡打断

![](Pasted%20image%2020260806170033.png)
当Interruption Source设置为**current State**，那么当前的转换就可以被部分同样的出发点出发的状态转换，为什么是部分，因为当勾选Oredered Interruption时，当前转换只能被优先级更高的打断。  
![](Pasted%20image%2020260806170152.png)
选中出发状态，Transitions排序越靠上优先级越高。

当选为**next State**时，oredered被禁选。这时可以被终点状态出发的任何状态打断。  
当多个转换被激活，优先执行优先级高的转换。

**除此之外**
- Current State Then Next State:   当前状态优先，同时考虑下一状态。
- Next State Then Current State：下一状态优先，同时考虑当前状态。























