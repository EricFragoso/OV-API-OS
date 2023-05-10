import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('images', (table) => {
    table.boolean('favorita').after('path').index();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('images', (table) => {
    table.dropColumn('favorita');

  })
}