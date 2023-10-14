'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const NewEntryCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNewEntry = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
    console.log('data : ', data);
  };

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="relative px-4 py-5 sm:p-6">
        <span className="rotate-1 text-3xl" onClick={handleNewEntry}>
          {' '}
          + New Entry
        </span>
        {loading && <div></div>}
      </div>
    </div>
  );
};
