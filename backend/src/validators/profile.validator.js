const { z } = require("zod");

const birthDataSchema = z.object({
  dob: z.coerce.date(),
  tob: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must use HH:mm 24-hour format"),
  pob: z.string().trim().min(2).max(120)
});

const profileSchema = z.object({
  body: birthDataSchema,
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

module.exports = { birthDataSchema, profileSchema };
