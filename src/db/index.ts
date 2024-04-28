import { PrismaClient } from "@/db/prisma";
export { type Prisma } from "@/db/prisma";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
    log: ["info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
