'use client';

import { useState } from 'react';
import { useAutosave } from 'react-autosave';

import { updateEntry } from '@/utils/api';
import LoadingSVG from '@/public/icons/loading.svg';
import { EditorProps } from './types';

export const Editor = (props: EditorProps) => {
  const { entry } = props;

  const [value, setValue] = useState(entry.content);
  const [loading, setIsLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async _value => {
      setIsLoading(true);
      const update = await updateEntry(entry.id, _value);
      console.log(update);
      setIsLoading(false);
    },
  });

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {loading && <>... Saving !</>}
      <textarea
        className="w-auto p-8 text-xl"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};
