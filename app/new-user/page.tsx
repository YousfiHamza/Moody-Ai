import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createUser = async () => {
  const user = await currentUser();

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!match && user) {
    await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        clerkId: user.id,
      },
    });
  }

  redirect('/journal');
};

const NewUser = async () => {
  await createUser();
  return (
    <div>
      <h1>Boom ... !</h1>
    </div>
  );
};

export default NewUser;
