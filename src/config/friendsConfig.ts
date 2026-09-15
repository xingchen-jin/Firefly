import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "Amiya_desi",
		imgurl:
			"https://blog.sayori.org/assets/profile/avatar-sayori-optimized.jpg",
		desc: "miya_desi 参上！这里是 Amiya_desi 的博客！看到我摸鱼可以提醒我要学习了！ 我期待数据能拟合出我，帮我解决那些我一个人想不明白的东西，所以我要把这些都记录下来",
		siteurl: "https://blog.sayori.org",
		tags: ["Blog"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "chaomeng",
		imgurl: "https://chaomeng.space/images/avatar.jpg",
		desc: "个人Blog，没事做点记录",
		siteurl: "https://chaomeng.space/",
		tags: ["blog"],
		weight: 9,
		enabled: true,
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
