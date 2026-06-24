const { z } = require("zod");
const { birthDataSchema } = require("./profile.validator");

const signParamSchema = z.object({
  params: z.object({
    sign: z.string().min(2).max(20)
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
});

const compatibilityParamSchema = z.object({
  params: z.object({
    sign1: z.string().min(2).max(20),
    sign2: z.string().min(2).max(20)
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
});

const calculateAstrologySchema = z.object({
  body: birthDataSchema,
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const personalizedPredictionSchema = z.object({
  body: z.object({
    zodiacSign: z.string().min(2).max(20),
    moonSign: z.string().min(2).max(20).optional(),
    nakshatra: z.string().min(2).max(40).optional(),
    mood: z.string().max(40).optional(),
    relationshipStatus: z.string().max(40).optional(),
    focusArea: z.enum(["general", "love", "career", "finance", "health"]).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const blogQuerySchema = z.object({
  params: z.object({
    sign: z.string().min(2).max(20)
  }),
  body: z.object({}).optional(),
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional()
  })
});

module.exports = {
  signParamSchema,
  compatibilityParamSchema,
  calculateAstrologySchema,
  personalizedPredictionSchema,
  blogQuerySchema
};
