// ============================================================
// ROTA EXPRESS — Dados de exemplo (domínio do app de corridas)
// ============================================================

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
  referencia?: string;
}

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  foto: string;
  enderecoFavorito?: Endereco;
  avaliacaoMedia: number;
  totalCorridas: number;
}

export interface Motorista {
  id: string;
  nome: string;
  telefone: string;
  cnh: string;
  foto: string;
  moto: {
    modelo: string;
    placa: string;
    cor: string;
    ano: number;
  };
  disponivel: boolean;
  emCorrida: boolean;
  localizacaoAtual: {
    lat: number;
    lng: number;
  };
  avaliacaoMedia: number;
  totalCorridas: number;
  faturamentoMes: number;
}

export type TipoServico = 'corrida' | 'entrega';

export type StatusCorrida =
  | 'solicitada'
  | 'buscar_motorista'
  | 'motorista_encontrado'
  | 'a_caminho'
  | 'aguardando_entrega'
  | 'em_andamento'
  | 'concluida'
  | 'cancelada';

export interface ItemEntrega {
  descricao: string;
  quantidade: number;
  peso?: string;
  dimensoes?: string;
  fragil?: boolean;
}

export interface Corrida {
  id: string;
  tipo: TipoServico;
  clienteId: string;
  motoristaId?: string;
  origem: Endereco;
  destino: Endereco;
  itensEntrega?: ItemEntrega[];
  status: StatusCorrida;
  valorEstimado: number;
  valorFinal?: number;
  formaPagamento: 'pix' | 'dinheiro' | 'cartao';
  observacoes?: string;
  distanciaKm: number;
  tempoEstimadoMin: number;
  criadaEm: string;
  iniciadaEm?: string;
  finalizadaEm?: string;
  canceladaEm?: string;
  motivoCancelamento?: string;
}

// -------------------------------------------------------
// ENDEREÇOS DE EXEMPLO (São Paulo — SP)
// -------------------------------------------------------

export const enderecos: Record<string, Endereco> = {
  centro1: {
    rua: 'Rua Augusta',
    numero: '1500',
    bairro: 'Consolação',
    cidade: 'São Paulo',
    cep: '01304-001',
    referencia: 'Próximo ao metrô Consolação',
  },
  centro2: {
    rua: 'Av. Paulista',
    numero: '1000',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    cep: '01310-100',
    referencia: 'Edifício Roberto Simonsen',
  },
  zonaSul1: {
    rua: 'Rua Oscar Freire',
    numero: '230',
    bairro: 'Jardins',
    cidade: 'São Paulo',
    cep: '01426-001',
  },
  zonaSul2: {
    rua: 'Av. Santo Amaro',
    numero: '4500',
    bairro: 'Brooklin',
    cidade: 'São Paulo',
    cep: '04702-002',
    referencia: 'Shopping Morumbi',
  },
  zonaLeste1: {
    rua: 'Rua Tuiuti',
    numero: '789',
    bairro: 'Brás',
    cidade: 'São Paulo',
    cep: '03009-000',
  },
  zonaOeste1: {
    rua: 'Rua Cardoso de Almeida',
    numero: '320',
    bairro: 'Perdizes',
    cidade: 'São Paulo',
    cep: '05013-000',
  },
  zonaNorte1: {
    rua: 'Av. Cruzeiro do Sul',
    numero: '1800',
    bairro: 'Santana',
    cidade: 'São Paulo',
    cep: '02031-000',
    referencia: 'Próximo ao Shopping Center Norte',
  },
  zonaNorte2: {
    rua: 'Rua Voluntários da Pátria',
    numero: '560',
    bairro: 'Santana',
    cidade: 'São Paulo',
    cep: '02011-000',
  },
  morumbi: {
    rua: 'Av. Giovanni Gronchi',
    numero: '5800',
    bairro: 'Vila Andrade',
    cidade: 'São Paulo',
    cep: '05721-800',
    referencia: 'Portão 3 — Condomínio Morumbi',
  },
  butanta: {
    rua: 'Av. Corifeu de Azevedo Marques',
    numero: '110',
    bairro: 'Butantã',
    cidade: 'São Paulo',
    cep: '05581-000',
    referencia: 'USP — Portaria Principal',
  },
  tatuape: {
    rua: 'Rua Tatuapé',
    numero: '910',
    bairro: 'Tatuapé',
    cidade: 'São Paulo',
    cep: '03084-000',
  },
  moema: {
    rua: 'Alameda dos Nhocarás',
    numero: '450',
    bairro: 'Moema',
    cidade: 'São Paulo',
    cep: '04089-011',
  },
}

// -------------------------------------------------------
// CLIENTES
// -------------------------------------------------------

export const clientes: Cliente[] = [
  {
    id: 'cli-001',
    nome: 'Mariana Costa Silva',
    telefone: '(11) 98765-4321',
    email: 'mariana.silva@email.com',
    foto: 'https://i.pravatar.cc/150?u=mariana',
    enderecoFavorito: enderecos.centro1,
    avaliacaoMedia: 4.8,
    totalCorridas: 34,
  },
  {
    id: 'cli-002',
    nome: 'Carlos Eduardo Oliveira',
    telefone: '(11) 97654-3210',
    email: 'carlos.oliveira@email.com',
    foto: 'https://i.pravatar.cc/150?u=carlos',
    enderecoFavorito: enderecos.zonaSul2,
    avaliacaoMedia: 4.5,
    totalCorridas: 12,
  },
  {
    id: 'cli-003',
    nome: 'Fernanda Lima Pereira',
    telefone: '(11) 96543-2109',
    email: 'fernanda.lima@email.com',
    foto: 'https://i.pravatar.cc/150?u=fernanda',
    enderecoFavorito: enderecos.moema,
    avaliacaoMedia: 5.0,
    totalCorridas: 8,
  },
  {
    id: 'cli-004',
    nome: 'João Pedro Santos',
    telefone: '(11) 95432-1098',
    email: 'joao.santos@email.com',
    foto: 'https://i.pravatar.cc/150?u=joao',
    enderecoFavorito: enderecos.zonaNorte1,
    avaliacaoMedia: 4.2,
    totalCorridas: 21,
  },
]

// -------------------------------------------------------
// MOTORISTAS
// -------------------------------------------------------

export const motoristas: Motorista[] = [
  {
    id: 'mot-001',
    nome: 'Ricardo Almeida Souza',
    telefone: '(11) 99888-7766',
    cnh: '12345678901',
    foto: 'https://i.pravatar.cc/150?u=ricardo',
    moto: {
      modelo: 'Honda CG 160 Titan',
      placa: 'BRA2E19',
      cor: 'Vermelha',
      ano: 2022,
    },
    disponivel: true,
    emCorrida: false,
    localizacaoAtual: { lat: -23.5613, lng: -46.6560 },
    avaliacaoMedia: 4.9,
    totalCorridas: 127,
    faturamentoMes: 4850.0,
  },
  {
    id: 'mot-002',
    nome: 'Diego Fernandes Rocha',
    telefone: '(11) 98777-6655',
    cnh: '98765432100',
    foto: 'https://i.pravatar.cc/150?u=diego',
    moto: {
      modelo: 'Yamaha Fazer FZ15',
      placa: 'FGH3I45',
      cor: 'Preta',
      ano: 2023,
    },
    disponivel: false,
    emCorrida: true,
    localizacaoAtual: { lat: -23.5889, lng: -46.6822 },
    avaliacaoMedia: 4.6,
    totalCorridas: 83,
    faturamentoMes: 3620.0,
  },
  {
    id: 'mot-003',
    nome: 'Paulo Henrique Dias',
    telefone: '(11) 97666-5544',
    cnh: '45678912300',
    foto: 'https://i.pravatar.cc/150?u=paulo',
    moto: {
      modelo: 'Honda Biz 125',
      placa: 'JKL4M56',
      cor: 'Branca',
      ano: 2021,
    },
    disponivel: true,
    emCorrida: false,
    localizacaoAtual: { lat: -23.5342, lng: -46.6498 },
    avaliacaoMedia: 4.7,
    totalCorridas: 210,
    faturamentoMes: 7200.0,
  },
  {
    id: 'mot-004',
    nome: 'Lucas Vinícius Barros',
    telefone: '(11) 96555-4433',
    cnh: '32165498711',
    foto: 'https://i.pravatar.cc/150?u=lucas',
    moto: {
      modelo: 'Honda Pop 110i',
      placa: 'MNO5P67',
      cor: 'Azul',
      ano: 2024,
    },
    disponivel: true,
    emCorrida: false,
    localizacaoAtual: { lat: -23.5489, lng: -46.6389 },
    avaliacaoMedia: 4.3,
    totalCorridas: 15,
    faturamentoMes: 980.0,
  },
]

// -------------------------------------------------------
// CORRIDAS (histórico + em andamento)
// -------------------------------------------------------

export const corridas: Corrida[] = [
  {
    id: 'cor-001',
    tipo: 'corrida',
    clienteId: 'cli-001',
    motoristaId: 'mot-001',
    origem: enderecos.butanta,
    destino: enderecos.zonaSul1,
    status: 'em_andamento',
    valorEstimado: 28.5,
    formaPagamento: 'pix',
    distanciaKm: 8.3,
    tempoEstimadoMin: 22,
    criadaEm: '2025-01-15T14:32:00',
    iniciadaEm: '2025-01-15T14:35:00',
  },
  {
    id: 'cor-002',
    tipo: 'entrega',
    clienteId: 'cli-002',
    motoristaId: 'mot-002',
    origem: enderecos.centro1,
    destino: enderecos.zonaNorte1,
    itensEntrega: [
      {
        descricao: 'Documentos empresariais',
        quantidade: 1,
        peso: '500g',
        dimensoes: '30x20x5cm',
        fragil: false,
      },
    ],
    status: 'a_caminho',
    valorEstimado: 35.0,
    valorFinal: 35.0,
    formaPagamento: 'cartao',
    observacoes: 'Deixar com a recepção',
    distanciaKm: 11.5,
    tempoEstimadoMin: 30,
    criadaEm: '2025-01-15T13:10:00',
    iniciadaEm: '2025-01-15T13:15:00',
  },
  {
    id: 'cor-003',
    tipo: 'corrida',
    clienteId: 'cli-003',
    origem: enderecos.moema,
    destino: enderecos.centro2,
    status: 'solicitada',
    valorEstimado: 42.0,
    formaPagamento: 'dinheiro',
    distanciaKm: 14.2,
    tempoEstimadoMin: 35,
    criadaEm: '2025-01-15T15:00:00',
  },
  {
    id: 'cor-004',
    tipo: 'entrega',
    clienteId: 'cli-004',
    motoristaId: 'mot-001',
    origem: enderecos.zonaLeste1,
    destino: enderecos.morumbi,
    itensEntrega: [
      {
        descricao: 'Caixa com peças de computador',
        quantidade: 1,
        peso: '5kg',
        dimensoes: '50x40x30cm',
        fragil: true,
      },
      {
        descricao: 'Manual do usuário',
        quantidade: 2,
        peso: '200g cada',
      },
    ],
    status: 'concluida',
    valorEstimado: 55.0,
    valorFinal: 55.0,
    formaPagamento: 'pix',
    observacoes: 'Cuidado com peças frágeis',
    distanciaKm: 22.7,
    tempoEstimadoMin: 55,
    criadaEm: '2025-01-15T09:00:00',
    iniciadaEm: '2025-01-15T09:08:00',
    finalizadaEm: '2025-01-15T09:55:00',
  },
  {
    id: 'cor-005',
    tipo: 'corrida',
    clienteId: 'cli-001',
    origem: enderecos.zonaSul2,
    destino: enderecos.zonaOeste1,
    status: 'cancelada',
    valorEstimado: 38.0,
    formaPagamento: 'cartao',
    distanciaKm: 16.8,
    tempoEstimadoMin: 40,
    criadaEm: '2025-01-15T11:20:00',
    canceladaEm: '2025-01-15T11:22:00',
    motivoCancelamento: 'Cliente desistiu — encontrou outra opção',
  },
  {
    id: 'cor-006',
    tipo: 'entrega',
    clienteId: 'cli-002',
    motoristaId: 'mot-003',
    origem: enderecos.zonaNorte2,
    destino: enderecos.tatuape,
    itensEntrega: [
      {
        descricao: 'Flores — arranjo de rosas',
        quantidade: 1,
        peso: '1kg',
        fragil: true,
      },
    ],
    status: 'aguardando_entrega',
    valorEstimado: 25.0,
    valorFinal: 25.0,
    formaPagamento: 'pix',
    observacoes: 'Entregar até 17h — aniversário',
    distanciaKm: 9.4,
    tempoEstimadoMin: 25,
    criadaEm: '2025-01-15T12:00:00',
    iniciadaEm: '2025-01-15T12:05:00',
  },
  {
    id: 'cor-007',
    tipo: 'corrida',
    clienteId: 'cli-003',
    origem: enderecos.centro1,
    destino: enderecos.morumbi,
    status: 'motorista_encontrado',
    valorEstimado: 45.0,
    formaPagamento: 'pix',
    distanciaKm: 18.1,
    tempoEstimadoMin: 42,
    criadaEm: '2025-01-15T15:05:00',
  },
]

// -------------------------------------------------------
// HELPERS DE FORMATAÇÃO
// -------------------------------------------------------

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatarDataHora(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatarCEP(cep: string): string {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

// -------------------------------------------------------
// LOOKUPS CONVENIENCE
// -------------------------------------------------------

export function buscarCliente(id: string): Cliente | undefined {
  return clientes.find(c => c.id === id)
}

export function buscarMotorista(id: string): Motorista | undefined {
  return motoristas.find(m => m.id === id)
}

export function buscarCorrida(id: string): Corrida | undefined {
  return corridas.find(c => c.id === id)
}

export function corridasPorMotorista(id: string): Corrida[] {
  return corridas.filter(c => c.motoristaId === id)
}

export function corridasPorCliente(id: string): Corrida[] {
  return corridas.filter(c => c.clienteId === id)
}
