import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('historico', (table) => {
    table.uuid('id').primary;
    table.text('ativo').index().notNullable();
    table.text('servicos');
    table.text('reposicao');
    table.text('laudo');
    table.text('estado_conservacao');
    table.timestamp('proximo_atendimento');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('historico');
}

