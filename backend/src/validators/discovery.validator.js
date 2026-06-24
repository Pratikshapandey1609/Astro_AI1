const { z } = require("zod");

const astrologerQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    specialty: z.string().min(2).max(30).optional(),
    availability: z.enum(["chat", "call"]).optional()
  })
});

const panchangQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({ location: z.string().min(2).max(100).optional() })
});

const remedyParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ sign: z.string().min(2).max(20) }),
  query: z.object({}).optional()
});

const rashiDashboardSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ sign: z.string().min(2).max(20) }),
  query: z.object({ location: z.string().min(2).max(100).optional() })
});

const chartbotSchema = z.object({
  body: z.object({
    message: z.string().trim().min(2).max(500),
    zodiacSign: z.string().min(2).max(20).optional(),
    moonSign: z.string().min(2).max(20).optional(),
    mood: z.string().min(2).max(40).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

module.exports = { astrologerQuerySchema, panchangQuerySchema, remedyParamSchema, rashiDashboardSchema, chartbotSchema };
