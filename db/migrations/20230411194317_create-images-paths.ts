import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('images', (table) => {
    table.uuid('id').primary;
    table.text('ativo').index().notNullable();
    table.text('os').index().notNullable();
    table.text('path');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('images');
}

