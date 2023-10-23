import { getUserByClerkId } from '@/utils/auth';

import EntryCard from '@/components/modules/EntryCard';
import { NewEntryCard } from '@/components/modules/NewEntryCard';
import Link from 'next/link';
import { analyze } from '@/utils/ai';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = user.entries;

  await analyze(
    "i think today was okeay, i've found a nice and calm coffe shop but their products are expensive!",
  );
  return entries;
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
