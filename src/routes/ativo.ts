import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function ativoRoutes(app: FastifyInstance) {
  //Rota de criação de Ativo
  app.post('/', async (request, reply) => {

    const createAtivoBodySchema = z.object({
      qr: z.string(),
      cliente: z.string(),
      status: z.string(),
      BTU: z.string(),
      anoFabricacao: z.string(),
      produto: z.string(),
      contrato: z.string(),
    })

    const { qr, cliente, status, BTU, anoFabricacao, produto,
      contrato } = createAtivoBodySchema.parse(request.body,)

    await knex('ativo').insert({
      id: randomUUID(),
      qr,
      cliente,
      status,
      BTU,
      anoFabricacao,
      produto,
      contrato
    })

    return reply.status(201).send("Ativo registrado com sucesso!");
  })

  //Rota de busca de todas as OS
  app.get('/', async () => {

    const ativo = await knex('ativo').select()

    return {
      ativo
    }
  })

  //Rota de busca de todas as do colaborador
  app.get('/ativo/:qr', async (request) => {

    const getOsParamsSchema = z.object({
      qr: z.string()
    })

    const { qr } = getOsParamsSchema.parse(request.params)

    const ativo = await knex('ativo').where('qr', qr)

    return {
      ativo
    }
  })
}
