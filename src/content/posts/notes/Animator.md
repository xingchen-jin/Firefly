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
## Animator的属性
- Controller：动画控制器
- Avatar：骨骼绑定
- ApplyRootMotion：是否开启rootMotion
- Update Mode：刷新模式，重新计算每个骨骼节点，
	- normal：与帧率同步（Update（））
	- Animate Physics：与物理引擎同步（FixeUpdate（））
	- Unscaied Time：忽略时间标尺TimeScale，其他与Normal一样
- Culling Mode：剔除模式，当某个物体不被摄像机看到如何处理
	- Always Animate： 不进行剔除
	- Cull Update Transform：会剔除Ik之类的操作
	- Cull Completely：完全停止动画

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

![](images/Pasted%20image%2020260806170033.png)
当Interruption Source设置为**current State**，那么当前的转换就可以被部分同样的出发点出发的状态转换，为什么是部分，因为当勾选Oredered Interruption时，当前转换只能被优先级更高的打断。  
![](images/Pasted%20image%2020260806170152.png)
选中出发状态，Transitions排序越靠上优先级越高。

当选为**next State**时，oredered被禁选。这时可以被终点状态出发的任何状态打断。  
当多个转换被激活，优先执行优先级高的转换。

**除此之外**
- Current State Then Next State:   当前状态优先，同时考虑下一状态。
- Next State Then Current State：下一状态优先，同时考虑当前状态。
## 角色移动动画时会出现的两个问题
- 移动速度与动画播放速度不匹配
- 角色出现滑步（个人认为是因为角色的位移与骨骼运动不匹配导致的）
解决这两个问题就分别要用到混合树和rootMotion了。
## 单变量混合树（1D BlendTree)

当我们移动角色时需要切换多个动画片段，这时就可以用到混合树（BlendTree）来进行过渡。
混合树可以右键直接创建。  

在混合树的inspector窗口可以在motion添加动画片段栏位，这些动画的切换时通过变量平滑控制的。
- Blend Type：混合树类型控制
- parameter：参数选择
- 在1D的示意图中，横轴时参数的值，纵轴则是动画片段在blend tree的权重。
- 不同权重动画可以进行混合播放
- **动画片段管理面板**
  + Motion：具体动画
  + Threshold:动画切换阈值
  + speed:动画播放速度
  + 最后一列位是否镜像动画
## rootMotion
rootmotion会通过相对运动来移动游戏对象。
在Animator组件勾选ApplyRootMotion，可以让角色在每次循环播放动画片段不返回起点而是接着运动。
这样就可以让动画片段控制角色移动，这时角色速度受动画判断播放速度控制。
注：root motion会考虑角色的scale
#### Generic
在Generic中Unity会通过指定根骨骼来应用root motion
- Bake Into Poss:相关Transform当作动画而不是root motion来处理。若变化较大会有红灯提示。**勾选后游戏对象不会跟着移动，反之则会跟着移动**。所以有时像碰撞检测异常可能时着原因。
![](images/Pasted%20image%2020260807200542.png)

- Based Upon：对于Generic，可以选择Root Node Rotation（Generic）或Original，前者是让动画朝向由角色的根骨骼（unity会计算，一般不准）决定，后者是由动画本来朝向决定，由美术在制作动画时设定好
- Offest:偏移量

#### Humanoid
在Humanoid总由于使用Avator系统，动画文件不再包含对具体骨骼的描述，所以不能指定根骨骼来应用root motion。
unity为了解决着问题，通过分析骨骼结构，计算出模型的重心center of mass（又称body transform），unity又会通过重心在水平平面的投影，作为根节点，被称为root transform;
RootMotion会把动画文件中描述的Root Transform的坐标和角度值，转换为相对位移和相对转角，并以此来移动游戏对象。

![](images/Pasted%20image%2020260807193639.png)


-  Based Upon：Body Orientation/Center of Mass，计算出的重心作为朝向，一般不太准。
				Feet：用脚部骨骼
## Root Motion 和 Blend Tree
在Inspector中可以使用Compute Thresholds根据动画片段设置阈值，可以自动算出移动速度的平均值。注意这里的阈值是针对原本的骨骼的，而不同骨骼角色使用动画，移动速度会有所区别。
**那么如何控制角色的移动速度呢？**
可以在使用animator.speed/=animator.humanScale,就可以让同一个状态机下不同角色的移动速度保持一致。不过最好是把1/animator.humanScale的值传给multiplayer,只改变移动时的动画播放速度。

若想修改速度，把动画播放速度设置为目标速度/阈值，把阈值设为目标速度，但实际上速度可能并不是恒定的，而是上下波动，这是因为rootMotion的移动速度本来就不一定匀速。

我们可以把animator的速度给予rb组件，注意若把y分量上的赋值，人物会在下落时速度恒定一个很低的值，因为rb速度不断被重置，所以y分量上的不赋值就解决了。但是如果受到水平分量上的力又会出现同样的问题。

## Animation Layer和Avatar Mask实现动画组合
在Animator面板中可以创建多个Layer,在Layer可以点击齿轮就行设置
![](images/Pasted%20image%2020260808220819.png)
 
- Weight:权重，0则是不使用
- Mask：动画蒙板，禁用Avator部位或骨骼
- Blennding：可以选择覆盖Override或添加Additive（混合），选择Additive时该层级对应的avatar mask上必须有实际的动画curve才能添加。
- Sync：同步，选中后可以选择当前层级与哪个层级保持一致
- IK Pass：是否可以IK操作

### 角色疲劳感制作
可以使用Additive模式加设置权重的方式添加疲劳感。
创建一个Layer作为疲劳层级，添加疲劳动画，添加模板（一般禁用四肢，为了在疲劳下四肢也能移动），然后再脚本中修改权重（animator.SetLayerWeight（））来达到逐渐疲劳的效果。

### Sync和Timing做受伤状态

当我们制作例如受伤状态，需要把一整套的受伤动画代替原有的动画，可以把新的Layer里复制一整套原有的层级，但随着开发，原有会有变化。
这时可以用Sync同步，无论被同步如何改变，同步方都可以保持一致。而同步只是同步状态和状态间的转换关系，不会同步内部状态信息。比如这时后让一个空Layer同步原Layer，里面的动画片段都是空的。这样可以让新的Layer放入不同的动画表示进入了新的状态，比如受伤。你可以让角色处于受伤状态就行行走之类的操作，而不用手动设置新的转态转换是如何转换的。
**但是不同的动画片段的时长不一定相同** 
所以Unity会缩放就行同步的Layer里的时长，默认与被同步Layer里的一致。 
**Timing（只能在Overrid下使用）**     
Timing可以让同步层级与被同步层级共同决定动画时长。而权重决定时长更靠近哪个，当同步Layer的权重为1，则完全听同步的，如果为0.5则取平均时长，0则完全听被同步的。

## Rigging配合IK
### 使用步骤
- 1，**先导入Rigging Animation**
- 2，选中角色物体的Animator可以，点击Rig Setup,创建Rig Builder组件
	- 点击Bone Render SetUp可以绘制骨骼（供在场景的点击）
- 3，创建空子物体添加Rig组件，再传给Rig Builder，这样就可以管理Rig了
-  4，在Rig下新加子物体添加Two Bone Ik Constraint组件作为约束
	-  这个组件就是旋转Root和Mid两根骨骼，把Tip尽量放入Target上
	- Hint：指定手肘关节位置防止扭曲
	- Maintain Target Offest：是否保留tip与target原有差异
## 遇到问题
-  **不能在playMode下移动target，将Animator中片段均选择为WriteDefault问题解决**
- 





















