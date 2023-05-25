import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('preos', (table) => {
        table.uuid('id').primary;
        table.text('numeroAtivo').notNullable();
        table.text('cnpj').notNullable();
        table.text('ocorrencia');
        table.text('prioridade');
        table.text('motivo');
        table.text('tipoAtendimento');
        table.text('colaborador').index().notNullable();
        table.dateTime('inicio');
        table.dateTime('finalizacao');
        table.text('solucao');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      })

}

export async function down(knex: Knex): Promise<void>{
    await knex.schema.dropTable('preos');
   
}

