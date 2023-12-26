import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import  prisma  from '@/app/libs/prismadb';


export const POST = async (request: Request) => {

	try {
		const { name, email, password } = await request.json();
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message });
	} 
};
