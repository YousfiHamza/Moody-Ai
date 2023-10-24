import { getUserByClerkId } from '@/utils/auth';

import { Editor } from '@/components/modules/Editor';
import { prisma } from '@/utils/db';
import { EntryProps } from '@/components/modules/EntryCard/types';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id: +id,
      userId: user.id,
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};

const SingleJournalEntry = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const entry: EntryProps | null = await getEntry(id);

  if (!entry?.analysis) return null;

  return (
    <div className="h-full bg-zinc-400/10 p-6">
      {entry && <Editor entry={entry} />}
    </div>
  );
};

export default SingleJournalEntry;
