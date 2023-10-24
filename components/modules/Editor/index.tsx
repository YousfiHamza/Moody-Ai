'use client';

import { useState } from 'react';
import { useAutosave } from 'react-autosave';

import { updateEntry } from '@/utils/api';
import Spinner from './Spinner';
import { EditorProps } from './types';

export const Editor = ({ entry }: EditorProps) => {
  const [text, setText] = useState(entry.content);
  const [currentEntry, setEntry] = useState(entry);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const [isSaving, setIsSaving] = useState(false);

  console.log('entry : ', entry);

  useAutosave({
    data: text,
    onSave: async _text => {
      if (_text === currentEntry?.content) return;
      setIsSaving(true);

      const data = await updateEntry(entry.id, _text);
      console.log('data : ', data);
      setAnalysis(data.analysis);
      setEntry(data);
      setIsSaving(false);
    },
  });

  if (!currentEntry?.analysis) return null;

  const { mood, subject, sentimentScore, summary, negative, color } = analysis!;

  const analysisData = [
    {
      name: 'Sumary',
      value: summary,
    },
    {
      name: 'Subject',
      value: subject,
    },
    {
      name: 'Mood',
      value: mood,
    },
    {
      name: 'Sentiment Score',
      value: sentimentScore,
    },
    {
      name: 'Negative',
      value: negative ? 'True' : 'False',
    },
  ];

  return (
    <div className="relative grid h-full w-full grid-cols-3 gap-0">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <Spinner />
        ) : (
          <div className="h-[16px] w-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="h-full w-full p-8 text-xl"
        />
      </div>
      <div className="border-l border-black/10">
        <div
          className="px-6 py-10"
          style={{ background: color ? color : '#000' }}
        >
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
