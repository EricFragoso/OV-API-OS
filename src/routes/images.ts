import { FastifyInstance } from "fastify";
import { knex } from "../database";

export async function imagesRoutes(app: FastifyInstance) {
  app.get('/', async () => {

    const tables = await knex('images').select('*')

    return tables;
  })
}
