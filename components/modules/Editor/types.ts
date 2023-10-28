import { JournalEntry, Analysis } from '@prisma/client';

export type EditorProps = {
  entry: JournalEntry & {
    analysis: Analysis | null;
  };
};
