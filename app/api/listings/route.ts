import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import  prisma  from '@/app/libs/prismadb';


export const POST = async (request:Request) => {

  const currentUser = await getCurrentUser();
  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, description, imageSrc, category, roomCount, guestCount, bathroomCount, location, price } = body
  
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing);
  

}