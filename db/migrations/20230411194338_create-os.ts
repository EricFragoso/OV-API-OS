import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('os', (table) => {
    table.uuid('id').primary;
    table.text('numero').index().notNullable();
    table.text('cliente').notNullable();
    table.text('infoCliente');
    table.text('demandante');
    table.text('cnpj').notNullable();
    table.text('telefone');
    table.date('data');
    table.timestamp('hora');
    table.text('ocorrencia');
    table.text('prioridade');
    table.text('cidade');
    table.text('motivo');
    table.text('tipoAtendimento');
    table.text('colaborador').index().notNullable();
    table.dateTime('inicio');
    table.dateTime('finalizacao');
    table.text('solucao');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('os');
}