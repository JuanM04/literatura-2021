import { z } from "zod"

export const ensayoMetadataSchema = z.object({
  titulo: z.string().nonempty(),
  autor: z.object({
    nombre: z.string().nonempty(),
    instagram: z
      .string()
      .regex(/^[A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?$/),
  }),
  cabezera: z.object({
    src: z.string().nonempty(),
    alt: z.string().optional(),
    omitir: z.boolean().default(false),
  }),
})

export type EnsayoMetadata = z.infer<typeof ensayoMetadataSchema>
