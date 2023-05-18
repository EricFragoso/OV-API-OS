import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function imagesRoutes(app: FastifyInstance) {
  
  //retorna todas as imagens cadastradas
  app.get('/', async () => {

    const tables = await knex('images').select('*')

    return tables;
  })

  //cria a imagem e salva o path
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

  //retorna imagem da os
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

  //retorna imagem favorita do ativo
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

  app.put('/:ativo/:image', async (request) => {

    const getImagesParamsSchema = z.object({
      ativo: z.string(),
      image: z.string()
    })

    const { ativo, image } = getImagesParamsSchema.parse(request.params)

    await knex('images').where({ativo: ativo, favorita:true}).update({favorita:false})
    console.log("Desfavoritou imagem favorita atual")

    await knex('images').where({id: image}).update({favorita:true})
    console.log(`favoritou imagem ${image} `)
    
    const novaFavorita = await knex('images').where({ativo: ativo, favorita:true})

    return {
      novaFavorita
    }
  })
}
