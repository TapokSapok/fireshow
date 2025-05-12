import { z } from 'zod';

export const formReqSchema = z.object({
	name: z.string(),
	surname: z.string(),
	patronymic: z.string(),
	phoneNumber: z.string().optional(),
	email: z.string().optional(),
});
