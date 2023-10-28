import Link from 'next/link';

import EntryCard from '@/components/modules/EntryCard';
import { NewEntryCard } from '@/components/modules/NewEntryCard';
import Question from '@/components/modules/Question';

import { prisma } from '@/utils/db';
import { getUserByClerkId } from '@/utils/auth';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });

  return entries || [];
};

const Journal = async () => {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-6">
      <h1 className="mb-8 text-3xl">Welcome To Your Journal !</h1>
      <Question />
      <div className="grid grid-cols-3 gap-4 py-8">
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
