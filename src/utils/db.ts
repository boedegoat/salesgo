import { PrismaClient } from "@prisma/client";

// @ts-ignore
const db: PrismaClient = global.db || new PrismaClient();

// @ts-ignore
if (process.env.NODE_ENV !== "production") global.db = db;

export default db;
