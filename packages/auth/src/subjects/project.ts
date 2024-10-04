import {z} from 'zod'

export const projectSubject = z.tuple([
  z.union([
    z.literal('manage'), 
    z.literal('create'), 
    z.literal('get'), 
    z.literal('delete'), 
    z.literal('update')
  ]),
    z.literal('Projects')
])

export type ProjectSubject = z.infer<typeof projectSubject>