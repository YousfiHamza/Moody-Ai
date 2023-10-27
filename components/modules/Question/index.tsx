'use client';

import { useState } from 'react';

const Question = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // perform actions

    setLoading(false);
    setQuestion('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="rounded-md border border-gray-300 p-2 text-lg"
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
      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  );
};

export default Question;
