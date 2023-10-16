"use server"

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs"

class UserNotFoundErr extends Error {}
export async function GetFormStats() {
    const user = currentUser ();
    if (!user) {
        throw new UserNotFoundErr ();
    }
    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true,
        }

    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;
   let submissionsRate =  0;
   
   if (visits > 0){
    submissionsRate = (submissions / visits) * 100;
   }
   const bounceRate = 100 - submissionsRate;
   return {
    visits,
    submissions,
    submissionsRate,
    bounceRate,
  };
    
}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
      throw new Error("form not valid");
    }
    const user = await currentUser();
    if(!user){
        throw new UserNotFoundErr();
    }

    const {name, description} = data;

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description,
          },
    })

    if (!form) {
        throw new Error("something went wrong while creating form");
    }
    return form.id
}
 export async function GetForms() {
    const user =  await currentUser();
    if(!user){
        throw new UserNotFoundErr();
    }
    return await prisma.form.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
 }
 export async function GetFormById(id: number) {
    const user = await currentUser();
    if (!user) {
      throw new UserNotFoundErr();
    }
  
    return await prisma.form.findUnique({
      where: {
        userId: user.id,
        id,
      },
    });
  }