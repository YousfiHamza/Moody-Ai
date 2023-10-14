import { getUserByClerkId } from '@/utils/auth';

import { Editor } from '@/components/modules/Editor';
import { JournalEntry } from '@prisma/client';
import { prisma } from '@/utils/db';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: { id: +id },
  });
  return entry;
};

const SingleJournalEntry = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const entry = await getEntry(id);

  return (
    <div className="h-full bg-zinc-400/10 p-6">
      {entry && <Editor entry={entry} />}
    </div>
  );
};

export default SingleJournalEntry;
