import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
	listingId: string;
	currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {

				if (hasFavorite) {
					await axios.delete(`/api/favorites/${listingId}`);
					router.refresh();
					toast.success("Remove from favorites");
				} else {
					await axios.post(`/api/favorites/${listingId}`);
					router.refresh();
					toast.success("Added to favorites");
				}
			} catch (error) {
				toast.error("Something went wrong");
			}
		},
		[currentUser, hasFavorite, listingId, loginModal, router]
	);

	return {
		hasFavorite,
		toggleFavorite,
	};
};

export default useFavorite;
