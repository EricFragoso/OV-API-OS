//eslint-disable-next-line
import { knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    os: {
      id: string
      numero: string
      cliente: string
      infoCliente?: string
      demandante?: string
      cnpj: string
      telefone?: string
      data?: string
      hora?: string
      ocorrencia?: string
      prioridade?: string
      cidade?: string
      motivo?: string
      tipoAtendimento?: string
      colaborador: string
      inicio?: string
      finalizacao?: string
      solucao?: string
      created_at: string
    }
    ativo: {
      id: string
      qr: string
      cliente: string
      status?: string
      BTU?: string
      anoFabricacao?: string
      produto?: string
      contrato?: string
      created_at?: string
    }
    historico: {
      id: string
      ativo: string
      servicos?: string
      reposicao?: string
      laudo?: string
      estado_conservacao?: string
      proximo_atendimento?: string
      created_at: string
    }
    images: {
      id: string
      ativo: string
      os: string
      path?: string
      created_at: string
    }
  }

}