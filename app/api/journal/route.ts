import { NextResponse } from 'next/server';

import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { update } from '@/utils/actions';

export const POST = async () => {
  const user = await getUserByClerkId();
  const newEntry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Tell me, how was your day ;) ...',
    },
  });

  const analysis = await analyze(newEntry.content);

  if (analysis)
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: newEntry.id,
        ...analysis,
      },
    });

  update(['/journal', '/history']);

  return NextResponse.json({ data: newEntry });
};
