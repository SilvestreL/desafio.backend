import { z } from 'zod';

export const filtroBoletosSchema = z.object({
  relatorio: z
    .string()
    .optional()
    .transform((val) => val === '' ? undefined : val)
    .refine((val) => val === undefined || val === '1', {
      message: 'O valor de relatorio deve ser "1" se fornecido.',
    }),
  nome: z.string().optional(),
  valor_inicial: z
    .string()
    .optional()
    .transform((val) => val === '' ? undefined : val)
    .refine((val) => val === undefined || !isNaN(Number(val)), {
      message: 'valor_inicial deve ser um número.',
    }),
  valor_final: z
    .string()
    .optional()
    .transform((val) => val === '' ? undefined : val)
    .refine((val) => val === undefined || !isNaN(Number(val)), {
      message: 'valor_final deve ser um número.',
    }),
  id_lote: z.string().optional(),
});