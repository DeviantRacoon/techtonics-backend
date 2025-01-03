import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma

async function executeTransaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
  try {
    return await prisma.$transaction(async (tx) => {
      return await fn(tx);
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error; 
  }
}

async function initializeDB() {
  await prisma.$connect()
  await prisma.$disconnect()
}

export { initializeDB, executeTransaction }