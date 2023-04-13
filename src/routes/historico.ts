import { FastifyInstance } from "fastify";
import { knex } from "../database";

export async function historicoRoutes(app: FastifyInstance) {
  app.get('/', async () => {

    const tables = await knex('historico').select('*')

    return tables;
  })
}
