import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

export const POST = async () => {
  const user = await getUserByClerkId();
  const newEntry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Tell me, how was your day ;) ...',
    },
  });

  const analysis = await analyze(newEntry.content);

  await prisma.analysis.create({
    data: {
      entryId: newEntry.id,
      ...analysis!,
    },
  });

  revalidatePath('/journal');

  return NextResponse.json({ data: newEntry });
};
