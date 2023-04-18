import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('os', (table) => {
    table.text('status').after('solucao').index();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('os', (table) => {
    table.dropColumn('status');
  })
}

