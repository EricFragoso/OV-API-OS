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
    })

    const { numeroAtivo, cnpj, ocorrencia, prioridade, motivo, tipoAtendimento,
      colaborador, inicio, finalizacao, solucao} = createPreOsBodySchema.parse(request.body,)

    await knex('preos').insert({
      id: randomUUID(),
      numeroAtivo
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

  //Rota de busca de apenas uma OS
  app.delete('/', async (request, reply) => {

     await knex('preos').del()

     return reply.status(201).send("Todas as Pre-O.S. foram excluidas");
  })

}

