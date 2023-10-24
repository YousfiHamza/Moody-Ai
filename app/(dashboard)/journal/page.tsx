import { getUserByClerkId } from '@/utils/auth';

import EntryCard from '@/components/modules/EntryCard';
import { NewEntryCard } from '@/components/modules/NewEntryCard';
import Link from 'next/link';
import { analyze } from '@/utils/ai';
import { prisma } from '@/utils/db';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return entries || [];
};

const Journal = async () => {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-6">
      <h1 className="mb-8 text-3xl">Welcome To Your Journal !</h1>
      <div className="grid grid-cols-3 gap-4 p-8">
        <NewEntryCard />
        {entries.map(entry => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Journal;
