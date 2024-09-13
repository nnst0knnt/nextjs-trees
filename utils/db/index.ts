/**
 * @see https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobal {
  prisma?: PrismaClient;
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const global: CustomNodeJsGlobal;

if (process.env.NODE_ENV !== "production") {
  global.prisma = global.prisma ?? prismaClientSingleton();
} else {
  global.prisma = prismaClientSingleton();
}

export const db = global.prisma;
