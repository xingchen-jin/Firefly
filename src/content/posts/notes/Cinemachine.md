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
image: ./images/VIS_SD_e25b.avif
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
