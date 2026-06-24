const { z } = require("zod");

const expertBody = z.object({
  name: z.string().trim().min(2).max(80),
  specialties: z.array(z.string().trim().min(2).max(40)).min(1).max(8),
  languages: z.array(z.string().trim().min(2).max(40)).min(1).max(8),
  rating: z.coerce.number().min(0).max(5).optional(),
  orders: z.coerce.number().int().min(0).optional(),
  experienceYears: z.coerce.number().int().min(0).max(80).optional(),
  ratePerMinute: z.coerce.number().min(0).max(5000).optional(),
  availability: z.enum(["chat", "call", "both"]).optional(),
  isOnline: z.boolean().optional()
});

const createExpertSchema = z.object({ body: expertBody, params: z.object({}).optional(), query: z.object({}).optional() });
const updateExpertSchema = z.object({ body: expertBody.partial(), params: z.object({ id: z.string().length(24) }), query: z.object({}).optional() });

module.exports = { createExpertSchema, updateExpertSchema };
