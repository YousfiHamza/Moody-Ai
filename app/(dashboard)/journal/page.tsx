import { getUserByClerkId } from '@/utils/auth';

import EntryCard from '@/components/modules/EntryCard';
import { NewEntryCard } from '@/components/modules/NewEntryCard';
import Link from 'next/link';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = user.entries;
  return entries;
};

const Journal = async () => {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-6">
      <h1 className="mb-8 text-3xl">Welcome To Your Journal !</h1>
      <div className="gap- grid grid-cols-3 p-8">
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
