import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import  prisma  from '@/app/libs/prismadb';
import { User } from "@prisma/client";

interface IParams {
  listingId?: string
}

export const POST = async (request: Request, { params} : {params: IParams}) => {
  
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    NextResponse.error()
  }

  const { listingId } = params
  
  if(!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(currentUser?.favoriteIds || [])];

  favoriteIds.push(listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser?.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}


export const DELETE = async (request: Request, { params} : {params: IParams}) => {

  const currentUser = await getCurrentUser()

  if(!currentUser) {
    NextResponse.error()
  }

  const { listingId } = params

  if(!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(currentUser?.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser?.id
    },

    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}