import { getUserByClerkId } from '@/utils/auth';

import { Editor } from '@/components/modules/Editor';
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

  const analysisData = [
    {
      name: 'Sumary',
      value: '',
    },
    {
      name: 'Subject',
      value: '',
    },
    {
      name: 'Mood',
      value: '',
    },
    {
      name: 'isNegative',
      value: 'False',
    },
  ];

  return (
    <div className="grid h-full grid-cols-3 gap-3 bg-zinc-400/10 p-6">
      {entry && (
        <div className="col-span-2">
          <Editor entry={entry} />
        </div>
      )}
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl font-bold">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-t border-black/10 px-2 py-2"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleJournalEntry;
