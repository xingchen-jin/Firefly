---
title: Cinemachine
published: 2026-08-11
pinned: false
description: Unity相关知识
tags:
  - 笔记
  - Unity
category: 知识分享
draft: false
image: ./images/pixiv_notes_01.jpg
---
## Cinemachine Brain

绑在主相机上，读取虚拟相机共同控制主相机。  
### 基本属性
- Live Camera（only read）：当前在使用的虚拟相机的Transform，定位虚拟相机
- Live Blend（only read）：当前虚拟相机切换的过程，会显示从哪转换到哪
- Show Debug Text:  勾选后可以在game视窗中看见属性1和2.
- Show Camera Fustum: 勾选后在场景显示相机的视锥体
- Ignore Time Scale: 控制相机行为是否受时间缩放行为影响
- World Up Override: 默认情况下，“上方”是世界坐标系的y轴，如果相机在旋转过程中相机的y轴与“上方”夹角大于90度，unity会自动调整视角，使之小于90度。
- Update Method: 相机更新的的同步，与生命周期哪个环节同步，可以是物理引擎或渲染同步，
	- Smart Update：根据实际情况，自动选择同步
	- Manual Update：自己编写代码同步
- Blend Update Method: 相机间切换行为的同步设置，只能选择物理引擎和渲染
- Default Blend: 默认的相机的切换模式，可以选择Custom自定义曲线
- Custom Blends: 可以建立资源文件，针对不同的相机切换定制不同的切换模式
- Events：相机事件，在切换时调用（我不太确定具体出发时间）

## Virtual Camera

虚拟相机的本质是相机的配置文件，在不同使用场景提供不同的配置。应该避免在运行时，对单个虚拟相机做过多的修改
### 基本属性
- Status：状态分为三种:Live(激活)，Standby（未被使用但在运行），Disabled（禁用）；可以点击Sole立即激活
- Game Window Guides:显示虚拟相机的一些提示信息
- Save During Play：保存运行时的修改信息
- Priority:优先级，Cinemachine Brain会使用优先级高的（Timeline中无任何作用）
- **Follow：跟随该物体移动
- **Look At：跟随该物体转动
- StandbyUpdate：当相机处于待机状态时，相机的刷新方式，其中Round Robin为轮替刷新，大概每一帧选一个相机刷新
- Lens（None）：
	- Vertical FOV：视野角度
	- Near Clip Plane：近裁剪平面，小于该数值的对象不进行渲染
	- Far Clip Plane: 远裁剪平面，大于该数值的对象不进行渲染
	- Dutch：斜角镜头角度
	- Advanced
		- Mode Override：可以选择相机的渲染模式，正交，透视，物理，选择后Lens会提供不同的接口。**注：这个选项会修改Canera的真实属性，且不会自动复原在相机不用时
- Transition：虚拟相机切换时的属性设置
	- Blend Hint：相机的切换行为的空间特征
		- None：对角度位置做差值，线性切换
		- Spherical Position：以LookAt为球心做球形的切换
		- Cylindrical Position：以LookAt为中心做圆柱形的切换，水平做圆型，垂直做线性
		- Screen Space Aim When Targets Differ:两方Lookat目标不一致时，在位置上会根据世界坐标系下做线性切换，在角度上根据两个相机构成的屏幕空间的夹角间做切换
	- Inherit Position：表示相机被激活时不让相机移动到虚拟相机位置，而是虚拟相机移动到相机位置
- Body:与Follow关联
- Aim:与LookAt关联
- Noise：为相机添加晃动效果
- Extensions：可以添加一些额外的功能，比如相机碰撞检测

## Body
### Transpoer
虚拟相机将在某个固定的偏移或距离上跟随目标移动。
- Follow Offest：跟随的偏移量
- Binding Mode：锁定的设置
	- Lock To Target On Assign:锁定自己和目标距离，锁定在On Assign的时候，只要是非游戏状态下，follow有对象，就会一直处于On  Assign状态，在游戏状态需要重新指定Follow对象，才会是On Assign状态（重新激活相机也是）
	- World Space：锁定在世界坐标下
	- Lock To Target With World Up：虚拟相机可以绕Follow对象，沿世界坐标系下的Y轴旋转
- Damping：相机移动的阻尼大小
### Orbital Transposer 环绕相机
选中这个模式会看见一个红色圆环，相机的跟随会限制在红色圆环内，也就是绕环运动
- Follow Offest：跟随偏移，Y圆环高度，Z圆环半径，X相机在圆环切线方向的偏移
- Rencter To Target Heading:相机自动回到Heading方向的后方
- Heading：可以设置Bias进行偏移，PositionDelta是根据目标上一帧的位移决定在什么位置，也就是目标运动方向，Velocity跟PositionDelta，但它用的是刚体速度，没有则自动用PositionDelta
- X Axis：
	- Value：虚拟相机在圆环的位置
	- Value Range：在圆环运动范围
	- Speed：转速设置
	- Accel Time:转速从0到最大的时间
	- Decel Time：从最大归零的时间
	- Input Axis Value：当前输入值，Invert可以方向操作
	- 
## Framing Transposer
当我们屏幕与相机关系相对固定时采用
- Target Movement Only:不受阻尼影响立即旋转
## 3rd
可以水平直线移动相机，十分适合射击游戏的瞄准，或其他右肩视角和左肩视角的转换。




## Aim
### Same As Follow Target
与目标角度保持一致

### Composer
打开Game Window guides可以具体观察
- Tracked Object Offest:在对象位置的基础上做一定偏移，可以打开Game Window guides观察，此时黄点位置就是目前瞄准的位置。
- Lookahead
	- Lookahead Time：预测一定时间后的位置进行偏移
	- Lookahead Smoothing：可以让预测算法更加平滑
- Dead Zone：显示透明区域，在该区域内就不会转动
	- Screen X/Y：确定中心位置
	- Dead Zone Weidth/Height:长和宽
 - Soft Zone：显示蓝色区域，在该区域内，相机会通过转动使黄点到达Dead Zone 
 - 红色区域是黄点绝对不会落入的区域
 - Center On Active：勾选后在相机启用时会把目标放在屏幕正中央，否则会放在最近的Dead Zone的边缘的位置
 -
## State Driven Camera状态驱动相机

Animated Target：动画状态目标
