import { z } from 'zod'

export const createQuestSchema = z.object({
  title: z
    .string()
    .min(1, 'Quest title is required')
    .max(100, 'Title must be under 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be under 500 characters')
    .optional(),
  category: z.enum(['study', 'coding', 'fitness', 'reading', 'creativity', 'social', 'habit', 'other']),
  difficulty: z.enum(['easy', 'medium', 'hard', 'legendary']),
  due_date: z.string().optional(),
})

export type CreateQuestInput = z.infer<typeof createQuestSchema>
