import { JournalEntry } from '@prisma/client';

export const EntryCard = (props: { entry: JournalEntry }) => {
  const { createdAt, content } = props.entry;
  return (
    <div>
      <p>{content}</p>
    </div>
  );
};
