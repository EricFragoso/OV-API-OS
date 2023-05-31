import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "crypto";

export async function preOsRoutes(app: FastifyInstance) {

  //Rota de criação de PREOS
  app.post('/', async (request, reply) => {

    const createPreOsBodySchema = z.object({
      numeroAtivo: z.string(),
      cnpj: z.string(),
      ocorrencia: z.string(),
      prioridade: z.string(),
      motivo: z.string(),
      tipoAtendimento: z.string(),
      colaborador: z.string(),
      inicio: z.string(),
      finalizacao: z.string(),
      solucao: z.string(),
      sincronizada:z.boolean(),
    })

    const { numeroAtivo, cnpj, ocorrencia, prioridade, motivo, tipoAtendimento,
      colaborador, inicio, finalizacao, solucao,sincronizada} = createPreOsBodySchema.parse(request.body,)

    await knex('preos').insert({
      id: randomUUID(),
      numeroAtivo,
      cnpj,
      ocorrencia,
      prioridade,
      motivo,
      tipoAtendimento,
      colaborador,
      inicio,
      finalizacao,
      solucao,
      sincronizada
    })

    return reply.status(201).send("Pre-O.S. registrada com sucesso!");
  })

  //Rota de busca de todas as OS
  app.get('/', async () => {

    const preos = await knex('preos').select()

    return {
      preos
    }
  })

  //retorna imagem da os
  app.get('/:id', async (request) => {

    const getPreosParamsSchema = z.object({
      id: z.string()
    })

    const { id } = getPreosParamsSchema.parse(request.params)

    const preos = await knex('id').where('id', id)

    return {
      preos
    }
  })

  app.put('/:id', async (request, reply) => {

    const getPreosParamsSchema = z.object({
      id: z.string()
    })

    const { id } = getPreosParamsSchema.parse(request.params)

    console.log(`chegou o id ${id}`)
    const preos = await knex('preos').where({
      id: id
    })

    console.log("Sincronizou pre os")

    return reply.status(204).send("Pré OS sincronizada");
  })


  //Rota de busca de apenas uma OS
  app.delete('/', async (request, reply) => {

     await knex('preos').del()

     return reply.status(201).send("Todas as Pre-O.S. foram excluidas");
  })

}

