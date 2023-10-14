import { JournalEntry, Analysis } from '@prisma/client';

export type EntryProps = JournalEntry & {
  analysis?: Analysis;
};
