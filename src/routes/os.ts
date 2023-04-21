import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "crypto";

export async function osRoutes(app: FastifyInstance) {

  //Rota de criação de OS
  app.post('/', async (request, reply) => {

    const createOsBodySchema = z.object({
      numero: z.string(),
      ativoNumero: z.string(),
      cliente: z.string(),
      infoCliente: z.string(),
      demandante: z.string(),
      cnpj: z.string(),
      telefone: z.string(),
      data: z.string(),
      hora: z.string(),
      ocorrencia: z.string(),
      prioridade: z.string(),
      cidade: z.string(),
      motivo: z.string(),
      tipoAtendimento: z.string(),
      colaborador: z.string(),
      inicio: z.string(),
      finalizacao: z.string(),
      solucao: z.string(),
      status: z.string(),
    })

    const { numero, ativoNumero, cliente, infoCliente, demandante, cnpj, telefone,
      data, hora, ocorrencia, prioridade, cidade, motivo, tipoAtendimento,
      colaborador, inicio, finalizacao, solucao, status } = createOsBodySchema.parse(request.body,)

    await knex('os').insert({
      id: randomUUID(),
      numero,
      ativoNumero,
      cliente,
      infoCliente,
      demandante,
      cnpj,
      telefone,
      data,
      hora,
      ocorrencia,
      prioridade,
      cidade,
      motivo,
      tipoAtendimento,
      colaborador,
      inicio,
      finalizacao,
      solucao,
      status,
    })

    return reply.status(201).send("O.S. registrada com sucesso!");
  })

  //atualiza OS
  app.put('/', async (request, reply) => {

    const updateOsBodySchema = z.object({
      numero: z.string(),
      inicio: z.string(),
      finalizacao: z.string(),
      solucao: z.string(),
      status: z.string(),
    })

    const { numero, inicio, finalizacao, solucao, status } = updateOsBodySchema.parse(request.body,)

    await knex('os').where('numero', numero).update({
      inicio,
      finalizacao,
      solucao,
      status
    })

    return reply.status(200).send(`O.S. ${numero} -> Atualizada com sucesso!`);
  })


  //Rota de busca de todas as OS
  app.get('/', async () => {

    const os = await knex('os').select()

    return {
      os
    }
  })

  //Rota de busca de apenas uma OS
  app.get('/:numero', async (request) => {

    const getOsParamsSchema = z.object({
      numero: z.string()
    })

    const { numero } = getOsParamsSchema.parse(request.params)

    const os = await knex('os').where('numero', numero).first()

    return os;
  })

  //Rota de busca de todas as do colaborador
  app.get('/colaborador/:id', async (request) => {

    const getOsParamsSchema = z.object({
      id: z.string()
    })

    const { id } = getOsParamsSchema.parse(request.params)

    const os = await knex('os').where('colaborador', id)

    return os;
  })
}

