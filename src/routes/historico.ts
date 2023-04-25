import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function historicoRoutes(app: FastifyInstance) {
  app.get('/', async () => {

    const tables = await knex('historico').select('*')

    return tables;
  })

  app.post('/', async (request, reply) => {

    const createHistoricoBodySchema = z.object({
      ativo: z.string(),
      atendentes: z.string(),
      servicos: z.string(),
      reposicao: z.string(),
      laudo: z.string(),
      geoloc: z.string(),
      estado_conservacao: z.string(),
      proximo_atendimento: z.string(),
    })

    const { ativo, atendentes, servicos, reposicao, laudo, geoloc,
      estado_conservacao, proximo_atendimento } = createHistoricoBodySchema.parse(request.body,)

    await knex('historico').insert({
      id: randomUUID(),
      ativo,
      atendentes,
      servicos,
      reposicao,
      laudo,
      geoloc,
      estado_conservacao,
      proximo_atendimento
    })

    return reply.status(201).send("Histórico registrado com sucesso!");
  })

  app.get('/:numero', async (request) => {

    const getOsParamsSchema = z.object({
      numero: z.string()
    })

    const { numero } = getOsParamsSchema.parse(request.params)

    const ativo = await knex('historico').where('ativo', numero)

    return {
      ativo
    }
  })
}


