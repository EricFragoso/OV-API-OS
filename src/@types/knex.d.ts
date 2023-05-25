//eslint-disable-next-line
import { knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    os: {
      id: string
      numero: string
      ativoNumero: string
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
      status?: string
      created_at: string
    }
    ativo: {
      id: string
      numeroAtivo: string
      qr: string
      cliente: string
      BTU?: string
      anoFabricacao?: string
      produto?: string
      contrato?: string
      created_at?: string
    }
    historico: {
      id: string
      ativo: string
      atendentes: string
      servicos?: string
      reposicao?: string
      laudo?: string
      geoloc?: string
      estado_conservacao?: string
      proximo_atendimento?: string
      created_at: string
    }
    images: {
      id: string
      ativo: string
      os: string
      favorita: boolean
      path?: string
      created_at: string
    }
    preos: {
      id: string
      numerAtivo: string
      cnpj: string
      ocorrencia?: string
      prioridade?: string
      motivo?: string
      tipoAtendimento?: string
      colaborador: string
      inicio?: string
      finalizacao?: string
      solucao?: string
      created_at: string
    }
  }
}