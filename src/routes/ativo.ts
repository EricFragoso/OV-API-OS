import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function ativoRoutes(app: FastifyInstance) {
  //Rota de criação de Ativo
  app.post('/', async (request, reply) => {

    const createAtivoBodySchema = z.object({
      numeroAtivo: z.string(),
      qr: z.string(),
      cliente: z.string(),
      BTU: z.string(),
      anoFabricacao: z.string(),
      produto: z.string(),
      contrato: z.string(),
    })

    const { numeroAtivo, qr, cliente, BTU, anoFabricacao, produto,
      contrato } = createAtivoBodySchema.parse(request.body,)

    await knex('ativo').insert({
      id: randomUUID(),
      numeroAtivo,
      qr,
      cliente,
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
  app.get('/:qr', async (request) => {

    const getOsParamsSchema = z.object({
      qr: z.string()
    })

    const { qr } = getOsParamsSchema.parse(request.params)

    const ativo = await knex('ativo').where('qr', qr)

    return {
      ativo
    }
  })

  app.get('/numero/:numero', async (request) => {

    const getOsParamsSchema = z.object({
      numero: z.string()
    })

    const { numero } = getOsParamsSchema.parse(request.params)

    const ativo = await knex('ativo').where('numeroAtivo', numero)

    return {
      ativo
    }
  })
}
