'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';

const Question = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const question = event.currentTarget.question.value;

    const { data } = await askQuestion(question);

    setAnswer(data);

    setLoading(false);
    setQuestion('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          name="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="mr-2 rounded-md border border-gray-300 p-2 text-lg"
          disabled={loading}
          placeholder="Ask a question..."
        />
        <button
          disabled={loading}
          type="submit"
          className="rounded-md bg-blue-400 px-4 py-2"
        >
          Ask
        </button>
      </form>
      {loading && <p className="py-2 font-semibold">Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  );
};

export default Question;
