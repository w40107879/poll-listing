import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error('DB connect error');
}
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const action = params?.action;
  if (
    action === 'deleteMany' &&
    Object.keys(params.args).length === 0 &&
    process.env.DATABASE_URL !== 'mysql://root:root@localhost:3306/tests'
  ) {
    throw new Error('Delete all rows from live database is not permitted');
  }
  return next(params);
});

export default prisma;
