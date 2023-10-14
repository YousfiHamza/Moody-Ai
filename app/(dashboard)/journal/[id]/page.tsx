import { getUserByClerkId } from '@/utils/auth';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = user.entries;
  return entries;
};

const SingleJournalEntry = async () => {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-6">hello from journal entry</div>
  );
};

export default SingleJournalEntry;
