import { getUserByClerkId } from '@/utils/auth';

import { Editor } from '@/components/modules/Editor';
import { prisma } from '@/utils/db';

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
  const entry = await getEntry(id);

  if (!entry?.analysis) return null;

  return (
    <div className="grid h-full grid-cols-3 gap-3 bg-zinc-400/10 p-6">
      {entry && (
        <div className="col-span-2">
          <Editor entry={entry} />
        </div>
      )}
    </div>
  );
};

export default SingleJournalEntry;
