import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function imagesRoutes(app: FastifyInstance) {
  app.get('/', async () => {

    const tables = await knex('images').select('*')

    return tables;
  })

  app.post('/', async (request, reply) => {

    const createImagesBodySchema = z.object({
      ativo: z.string(),
      os: z.string(),
      favorita: z.boolean(),
      path: z.string(),
    })

    const { ativo, os, favorita, path} = createImagesBodySchema.parse(request.body,)

    await knex('images').insert({
      id: randomUUID(),
      ativo, 
      os, 
      favorita, 
      path
    })

    return reply.status(201).send("Imagem registrado com sucesso!");
  })

  app.get('/os/:os', async (request) => {

    const getImagesParamsSchema = z.object({
      os: z.string()
    })

    const { os } = getImagesParamsSchema.parse(request.params)

    const images = await knex('images').where('os', os)

    return {
      images
    }
  })

  app.get('/favorite/:ativo', async (request) => {

    const getImagesParamsSchema = z.object({
      ativo: z.string()
    })

    const { ativo } = getImagesParamsSchema.parse(request.params)

    const image = await knex('images').where({ativo: ativo, favorita:true})

    return {
      image
    }
  })
}
