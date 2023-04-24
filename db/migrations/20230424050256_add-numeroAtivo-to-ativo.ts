import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('ativo', (table) => {
    table.text('numeroAtivo').after('id').index();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('ativo', (table) => {
    table.dropColumn('numeroAtivo');

  })
}