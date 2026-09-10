import { z } from "zod";

export const historyLinkSchema = z.object({
  title: z.string(),
  link: z.string(),
});

export const historyEntrySchema = z.object({
  // Free-form: "1969", "45 BC", "214/15", and on a few dates a whole leaked
  // entry. Constraining this rejects the entire response, so interpretation is
  // left to parseEntryYear instead.
  year: z.string(),
  // Documented as a string, but a handful of entries per date send null
  text: z.string().nullable(),
  html: z.string(),
  links: z.array(historyLinkSchema),
});

export const historyResponseSchema = z.object({
  date: z.string(),
  url: z.string(), // wikipedia page
  data: z.object({
    Events: z.array(historyEntrySchema),
    Births: z.array(historyEntrySchema),
    Deaths: z.array(historyEntrySchema),
  }),
});

export type HistoryLink = z.infer<typeof historyLinkSchema>;
export type HistoryEntry = z.infer<typeof historyEntrySchema>;
export type HistoryResponse = z.infer<typeof historyResponseSchema>;
