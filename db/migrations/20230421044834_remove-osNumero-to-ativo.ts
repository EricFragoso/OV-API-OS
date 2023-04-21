import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('ativo', (table) => {
    table.dropColumn('osNumero');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('ativo', (table) => {
    table.text('osNumero').after('qr').index();
  })
}