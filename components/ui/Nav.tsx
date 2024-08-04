import { ReactNode } from 'react';
import DialogDemo from '@/components/radix/Dialog';
import PopoverDemo from '@/components/radix/PopoverDemo';
import NavItem from '@/components/ui/NavItem';
import AccountNavItem from '@/components/ui/AccountNavItem';

import { SiTwitter } from 'react-icons/si';
import {
	HiOutlineHome,
	HiHashtag,
	HiOutlineBell,
	HiOutlineEnvelope,
	HiOutlineBookmark,
	HiOutlineUser,
} from 'react-icons/hi2';

interface NavLinkItem {
	href: string;
	text: string;
	icon?: ReactNode;
}

const items: NavLinkItem[] = [
	{
		href: '/home',
		text: 'Home',
		icon: <HiOutlineHome className="w-6 h-6" />,
	},
	{
		href: '/explore',
		text: 'Explore',
		icon: <HiHashtag className="w-6 h-6" />,
	},
	{
		href: '/notifications',
		text: 'Notifications',
		icon: <HiOutlineBell className="w-6 h-6" />,
	},
	{
		href: '/messages',
		text: 'Messages',
		icon: <HiOutlineEnvelope className="w-6 h-6" />,
	},
	{
		href: '/bookmarks',
		text: 'Bookmarks',
		icon: <HiOutlineBookmark className="w-6 h-6" />,
	},
	{
		href: '/profile',
		text: 'Profile',
		icon: <HiOutlineUser className="w-6 h-6" />,
	},
];

const Nav = () => (
	<header className="hidden sm:flex w-24 xl:col-span-2">
		<div className="">
			<div className="flex flex-col flex-1">
				<NavItem href="https://unlimitpotential.com" width="inline" size="default">
			 
	
				</NavItem>
				{items.map(({ href, text, icon }, i) => (
					<div
						key={`header-${i}`}
						// value={`item-${i + 1}`}
						className="rounded-lg focus:outline-none overflow-hidden"
					>
					 
					</div>
				))}
				<PopoverDemo />
				<DialogDemo />
			</div>
			<div>
			<a href="https://unlimitpotential.com">	© 2023 Unlimited Now</a>

			</div>
		</div>
	</header>
);

export default Nav;