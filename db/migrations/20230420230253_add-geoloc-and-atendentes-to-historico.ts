import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('historico', (table) => {
    table.text('geoloc').after('laudo');
    table.text('atendentes').after('ativo');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('historico', (table) => {
    table.dropColumn('geoloc');
    table.dropColumn('atendentes');
  })
}

