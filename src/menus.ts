import { socials } from "./consts";

export const mainMenu = [
	{ url: "/blog/", label: "My Feed", icon: "Newspaper" },
	{ url: "/speaking/", label: "Speaking", icon: "Calendar" },
	{ url: "/projects/", label: "Projects", icon: "FolderOpen" },
	{ url: "/games/", label: "Games", icon: "Gamepad2" },
	{ url: "/about/", label: "About Me", icon: "User" },
	{ url: socials.github, label: "GitHub", icon: "Github" },
	{ url: "/404/", label: "404", icon: "Ghost" },
];

export const footerMenu = [
	{ url: "/blog/", label: "My Feed" },
	{ url: "/speaking/", label: "Speaking" },
	{ url: "/projects/", label: "Projects" },
	{ url: "/about/", label: "About Me" },
];
