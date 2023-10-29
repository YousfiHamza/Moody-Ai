import HistoryChart from '@/components/modules/HistoryChart';

import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore;
  }, 0);
  const average = total / analyses.length;
  return { analyses, average };
};

const HistoryPage = async () => {
  const { analyses, average } = await getData();
  return (
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="mb-4 text-2xl">{`Avg. Sentiment: ${average}`}</h1>
      </div>
      <div className="h-full w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default HistoryPage;
