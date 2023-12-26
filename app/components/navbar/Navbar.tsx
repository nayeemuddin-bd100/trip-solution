"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
	currentUser?: User | null
}
const Navbar = ({ currentUser }: NavbarProps) => {

	return (
		<div className="fixed w-full bg-white z-10  ">
			<div className="border-b-[1px] py-2">
				<Container>
					<div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
		</div>
	);
};

export default Navbar;
