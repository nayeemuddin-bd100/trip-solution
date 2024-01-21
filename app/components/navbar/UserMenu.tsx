"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import useLoginModal from "@/app/hooks/useLoginModal";import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

interface UserMenuProps {
	currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {

	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false);
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const rentModal = useRentModal()

	const toggleOpen = () => {
		setIsOpen((value) => !value);
	};

	
	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen()
		}

		rentModal.onOpen()
	},[currentUser,loginModal,rentModal])

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full bg-neutral-200 hover:bg-neutral-300 transition cursor-pointer"
					onClick={onRent}
				>
					Trip-Solution Your Home
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
							<MenuItem onClick={() => {router.push('/trips')}} label="My Trips" />
							<MenuItem onClick={() => {}} label="My Favorites" />
							<MenuItem onClick={() => {}} label="My Reservation" />
							<MenuItem onClick={() => {}} label="My Properties" />
							<MenuItem onClick={rentModal.onOpen} label="My Home" />
							<hr />
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
