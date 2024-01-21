"use client";
import { Reservation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
	reservations: Reservation[];
	currentUser?: User | null;
}

const ReservationsClient = ({
	reservations,
	currentUser,
}: ReservationsClientProps) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		async (id: string) => {
			setDeletingId(id);

			try {
				await axios.delete(`/api/reservations/${id}`);
				toast.success("Reservation cancelled");
				setDeletingId("");
				router.refresh();
			} catch (error: any) {
				toast.error("Something went wrong.");
			}
		},
		[router]
	);

	return (
		<Container>
			<Heading title="Reservations" subtitle="Bookings on your properties" />

			<div className=" mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel guest reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default ReservationsClient;
