import { prisma } from "../../utilities/databaseHandler";

export async function findAllUsers() {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findUserBy(field:Field, query: string) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      [field]: query
    },
    include: {
      training: true,
      emergencyContact: true
    }
  });
}

import type { Field, Order } from "../../utilities/types";
export async function sortUsersBy(field:Field, order:Order = "desc") {
  return await prisma.user.findMany({
    orderBy: {
      [field]: order
    }
  })
}