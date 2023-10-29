import { NextResponse } from 'next/server';

import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { analyze } from '@/utils/ai';
import { update } from '@/utils/actions';

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId();
  const { content } = await req.json();
  const updateEntry = await prisma.journalEntry.update({
    where: {
      userId: user.id,
      id: params.id,
    },
    data: {
      content,
    },
  });

  const updatedAnalysis = await analyze(updateEntry.content);

  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updateEntry.id,
    },
    update: {
      ...updatedAnalysis,
    },
    create: {
      userId: user.id,
      entryId: updateEntry.id,
      ...updatedAnalysis!,
    },
  });

  update(['/journal']);

  const data = { ...updateEntry, analysis: savedAnalysis };

  return NextResponse.json({ data });
};
