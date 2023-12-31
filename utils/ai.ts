import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { Document } from 'langchain/document';
import { z } from 'zod';
import { loadQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

export type QAEntryType = {
  id: number;
  createdAt: Date;
  content: string;
};

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).',
      ),
    summary: z
      .string()
      .describe(
        'quick summary of the entire entry. this summary should not exceeded 100 letters. ',
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.',
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
  }),
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (prompt: string) => {
  const input = await getPrompt(prompt);
  const openai = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await openai.call(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const qa = async (question: string, entries: QAEntryType[]) => {
  const docs = entries.map(
    entry =>
      new Document({
        pageContent: entry.content,
        metadata: {
          id: entry.id,
          createdAt: entry.createdAt,
        },
      }),
  );

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });

  const chain = loadQAChain(model);

  const embeddings = new OpenAIEmbeddings(); // OpenAI embeddings

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings); // vectors store

  const relevantDocs = await store.similaritySearch(question); // relevant questions close to the one asked according to the vectors store that's based on OPENAI embeddings

  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return res.text;
};
