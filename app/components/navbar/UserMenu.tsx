"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import RegisterModal from './../modal/RegisterModal';
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
	currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const toggleOpen = () => {
		setIsOpen((value) => !value);
	};

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					onClick={() => {}}
				>
					Your Trip Solution
				</div>

				<div
					onClick={() => toggleOpen()}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
				</div>

				<div className="hidden md:block">
					<Avatar src={currentUser?.image} />
				</div>
			</div>

			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					{currentUser ? (
						<div>
							<MenuItem onClick={() => {}} label="My Trips" />
							<MenuItem onClick={() => {}} label="My Favorites" />
							<MenuItem onClick={() => {}} label="My Reservation" />
							<MenuItem onClick={() => {}} label="My Properties" />
							<MenuItem onClick={() => { }} label="My Home" />
							<hr/>
							<MenuItem onClick={() => signOut()} label="Logout" />
						</div>
					) : (
						<div>
							<MenuItem onClick={loginModal.onOpen} label="Login" />
							<MenuItem onClick={registerModal.onOpen} label="Sign up" />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default UserMenu;
