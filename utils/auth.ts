import { auth } from '@clerk/nextjs';
import { prisma } from '@/utils/db';

export const getUserByClerkId = async () => {
  const { userId } = auth();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    include: {
      entries: true,
    },
  });
  return user;
};
