const getURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(getURL('/api/journal'), {
      method: 'POST',
    }),
  );
  if (res.ok) {
    const { data } = await res.json();
    return data;
  }
};

export const updateEntry = async (id: number, content: string) => {
  const res = await fetch(
    new Request(getURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),
  );

  if (res.ok) {
    const { data } = await res.json();
    return data;
  }
};
