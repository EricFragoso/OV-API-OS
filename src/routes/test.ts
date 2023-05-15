import { FastifyInstance } from "fastify";
import { knex } from "../database";


export async function testRoutes(app: FastifyInstance) {


  //Rota de busca de todas as OS
  app.get('/', async () => {

    const test = await knex('knex_migrations').select()

    return {
      test
    }
  })

  
}
