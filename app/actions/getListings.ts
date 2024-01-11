export const getListing = async () => {
	try {
		const listings = await prisma?.listing.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return listings;
	} catch (error: any) {
		throw new Error(error);
	}
};
