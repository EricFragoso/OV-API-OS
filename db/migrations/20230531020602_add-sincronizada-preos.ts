import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('preos', (table) => {
    table.boolean('sincronizada').after('solucao');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('preos', (table) => {
    table.dropColumn('sincronizada');
  })
}
