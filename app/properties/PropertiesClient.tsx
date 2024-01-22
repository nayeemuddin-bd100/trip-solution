"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
	listings: Listing[];
	currentUser?: User | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onDelete = useCallback(
		async (id: string) => {
			setDeletingId(id);

			try {
				await axios.delete(`/api/listings/${id}`);
				toast.success("Property deleted");
				router.refresh();
				setDeletingId("");
			} catch (error: any) {
				toast.error(error?.response?.data?.error);
			}
		},
		[router]
	);

	return (
		<Container>
			<Heading title="Properties" subtitle="List of your properties" />
			<div className=" mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing: any) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onDelete}
						disabled={deletingId === listing.id}
						actionLabel="Delete property"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default PropertiesClient;
