import { z } from "zod";

export const taskSchema = z.object({
  // title: z.string({
  //   required_error:'el titulo debe contener texto'
  // }).min(6,{
  //     message:'el titulo debe tener al menos 6 caracateres'
  //   }),
  description: z.string({
    required_error:'debe contener una descripcion'
  }).min(6,{
      message:'la descripcion debe tener al menos 6 caracateres'
    }),
})