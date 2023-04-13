import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ativo', (table) => {
    table.uuid('id').primary;
    table.text('qr').notNullable();
    table.text('cliente').index().notNullable();
    table.text('status');
    table.text('BTU');
    table.date('anoFabricacao');
    table.text('produto');
    table.text('contrato');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ativo');
}

