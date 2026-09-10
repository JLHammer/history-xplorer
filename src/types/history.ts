import { z } from "zod";

export const historyLinkSchema = z.object({
  title: z.string(),
  link: z.string(),
});

export const historyEntrySchema = z.object({
  year: z.string(),
  text: z.string().nullable(),
  html: z.string(),
  links: z.array(historyLinkSchema),
});

export const historyResponseSchema = z.object({
  date: z.string(),
  url: z.string(),
  data: z.object({
    Events: z.array(historyEntrySchema),
    Births: z.array(historyEntrySchema),
    Deaths: z.array(historyEntrySchema),
  }),
});

export type HistoryLink = z.infer<typeof historyLinkSchema>;
export type HistoryEntry = z.infer<typeof historyEntrySchema>;
export type HistoryResponse = z.infer<typeof historyResponseSchema>;
