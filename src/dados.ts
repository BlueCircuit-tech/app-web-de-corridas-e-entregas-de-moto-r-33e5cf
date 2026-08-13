// ============================================================
// DADOS DE EXEMPLO — Rota Express
// Domínio: Corridas e entregas de moto em São Paulo/SP
// ============================================================

export interface Endereco {
  rua: string
  numero: string
  bairro: string
  cidade: string
  complemento?: string
  referencia?: string
}

export interface Motorista {
  id: string
  nome: string
  foto: string
  cnh: string
  placaMoto: string
  modeloMoto: string
  avaliacao: number
  corridasRealizadas: number
  status: 'disponivel' | 'ocupado' | 'offline'
  telefone: string
}

export interface Cliente {
  id: string
  nome: string
  telefone: string
  email: string
  enderecoFavorito?: Endereco
}

export interface Pedido {
  id: string
  clienteId: string
  clienteNome: string
  tipo: 'corrida' | 'entrega'
  origem: Endereco
  destino: Endereco
  valor: number
  status: 'pendente' | 'aceito' | 'em_andamento' | 'concluido' | 'cancelado'
  motoristaId?: string
  motoristaNome?: string
  descricao?: string
  createdAt: string
  distanciaKm: number
  tempoEstimadoMin: number
  pagamento: 'pix' | 'cartao' | 'dinheiro'
}

export interface Trajeto {
  pontos: { lat: number; lng: number; label: string }[]
  status: 'aguardando' | 'iniciado' | 'em_rota' | 'chegou_origem' | 'chegou_destino'
  progresso: number
  atualizacoes: string[]
}

// ---------- ENDEREÇOS COERENTES COM SÃO PAULO ----------

export const enderecosExemplo: Record<string, Endereco> = {
  moemaAvBoi: {
    rua: 'Av. Ibirapuera',
    numero: '3100',
    bairro: 'Moema',
    cidade: 'São Paulo',
    complemento: 'Edifício Ibirapuera Tower, bloco B, apto 1201',
    referencia: 'Próximo ao Shopping Ibirapuera',
  },
  vilaMarianaA: {
    rua: 'Rua Domingos de Morais',
    numero: '2564',
    bairro: 'Vila Mariana',
    cidade: 'São Paulo',
    complemento: 'Casa 3',
    referencia: 'Esquina com Rua Sena Madureira',
  },
  pinheirosAvFaria: {
    rua: 'Av. Brigadeiro Faria Lima',
    numero: '4232',
    bairro: 'Pinheiros',
    cidade: 'São Paulo',
    complemento: 'Conjunto 812',
    referencia: 'Edifício Faria Lima Business Center',
  },
  consolacaoPaulista: {
    rua: 'Av. Paulista',
    numero: '1578',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    complemento: '8º andar, sala 15',
    referencia: 'Próximo à estação Consolação do metrô',
  },
  santanaAvCasa: {
    rua: 'Av. Cruzeiro do Sul',
    numero: '1800',
    bairro: 'Santana',
    cidade: 'São Paulo',
    complemento: '',
    referencia: 'Em frente à Casa de Pedra',
  },
  tatuapeA: {
    rua: 'Rua Tuiuti',
    numero: '955',
    bairro: 'Tatuapé',
    cidade: 'São Paulo',
    complemento: 'Cobertura duplex',
    referencia: 'Próximo ao Shopping Metrô Tatuapé',
  },
  butantaAv: {
    rua: 'Av. Corifeu de Azevedo Marques',
    numero: '3995',
    bairro: 'Butantã',
    cidade: 'São Paulo',
    complemento: 'Bloco C',
    referencia: 'Próximo ao CEUB São Paulo',
  },
  liberdadeRua: {
    rua: 'Rua da Glória',
    numero: '322',
    bairro: 'Liberdade',
    cidade: 'São Paulo',
    complemento: 'Loja 7',
    referencia: 'Próximo à estação Liberdade do metrô',
  },
}

// ---------- MOTORISTAS ----------

export const motoristas: Motorista[] = [
  {
    id: 'mot-001',
    nome: 'Ricardo Mendes',
    foto: 'https://i.pravatar.cc/150?img=11',
    cnh: 'SP-12.345.678',
    placaMoto: 'BRA-2E19',
    modeloMoto: 'Honda CG 160 Fan',
    avaliacao: 4.8,
    corridasRealizadas: 342,
    status: 'disponivel',
    telefone: '(11) 98765-4321',
  },
  {
    id: 'mot-002',
    nome: 'Fernanda Oliveira',
    foto: 'https://i.pravatar.cc/150?img=5',
    cnh: 'SP-23.456.789',
    placaMoto: 'BRA-5F32',
    modeloMoto: 'Yamaha NEO 125',
    avaliacao: 4.9,
    corridasRealizadas: 218,
    status: 'disponivel',
    telefone: '(11) 97654-3210',
  },
  {
    id: 'mot-003',
    nome: 'Carlos Eduardo Rocha',
    foto: 'https://i.pravatar.cc/150?img=12',
    cnh: 'SP-34.567.890',
    placaMoto: 'BRA-7G44',
    modeloMoto: 'Honda Biz 125',
    avaliacao: 4.6,
    corridasRealizadas: 156,
    status: 'ocupado',
    telefone: '(11) 96543-2109',
  },
  {
    id: 'mot-004',
    nome: 'Juliana Santos',
    foto: 'https://i.pravatar.cc/150?img=9',
    cnh: 'SP-45.678.901',
    placaMoto: 'BRA-1H55',
    modeloMoto: 'Suzuki Yes 125',
    avaliacao: 4.7,
    corridasRealizadas: 289,
    status: 'offline',
    telefone: '(11) 95432-1098',
  },
  {
    id: 'mot-005',
    nome: 'André Luiz Pereira',
    foto: 'https://i.pravatar.cc/150?img=15',
    cnh: 'SP-56.789.012',
    placaMoto: 'BRA-3J66',
    modeloMoto: 'Honda CG 160 Start',
    avaliacao: 4.5,
    corridasRealizadas: 97,
    status: 'disponivel',
    telefone: '(11) 94321-0987',
  },
]

// ---------- CLIENTES ----------

export const clientes: Cliente[] = [
  {
    id: 'cli-001',
    nome: 'Mariana Costa',
    telefone: '(11) 99876-5432',
    email: 'mariana.costa@email.com',
    enderecoFavorito: enderecosExemplo.moemaAvBoi,
  },
  {
    id: 'cli-002',
    nome: 'Paulo Henrique Silva',
    telefone: '(11) 98765-1234',
    email: 'paulo.silva@email.com',
    enderecoFavorito: enderecosExemplo.consolacaoPaulista,
  },
  {
    id: 'cli-003',
    nome: 'Fernanda Lima',
    telefone: '(11) 97654-2345',
    email: 'fernanda.lima@email.com',
    enderecoFavorito: enderecosExemplo.pinheirosAvFaria,
  },
  {
    id: 'cli-004',
    nome: 'Roberto Almeida',
    telefone: '(11) 96543-3456',
    email: 'roberto.almeida@email.com',
  },
]

// ---------- PEDIDOS (CORRIDAS E ENTREGAS) ----------

export const pedidos: Pedido[] = [
  {
    id: 'ped-001',
    clienteId: 'cli-001',
    clienteNome: 'Mariana Costa',
    tipo: 'corrida',
    origem: enderecosExemplo.vilaMarianaA,
    destino: enderecosExemplo.moemaAvBoi,
    valor: 22.5,
    status: 'aceito',
    motoristaId: 'mot-001',
    motoristaNome: 'Ricardo Mendes',
    createdAt: '2025-07-14T09:15:00',
    distanciaKm: 5.8,
    tempoEstimadoMin: 18,
    pagamento: 'pix',
  },
  {
    id: 'ped-002',
    clienteId: 'cli-002',
    clienteNome: 'Paulo Henrique Silva',
    tipo: 'entrega',
    origem: enderecosExemplo.consolacaoPaulista,
    destino: enderecosExemplo.tatuapeA,
    valor: 34.9,
    status: 'em_andamento',
    motoristaId: 'mot-003',
    motoristaNome: 'Carlos Eduardo Rocha',
    descricao: 'Pacote com documentos — tamanho 30x20x10cm, cuidado frágil',
    createdAt: '2025-07-14T10:42:00',
    distanciaKm: 9.3,
    tempoEstimadoMin: 28,
    pagamento: 'cartao',
  },
  {
    id: 'ped-003',
    clienteId: 'cli-003',
    clienteNome: 'Fernanda Lima',
    tipo: 'corrida',
    origem: enderecosExemplo.pinheirosAvFaria,
    destino: enderecosExemplo.butantaAv,
    valor: 18.0,
    status: 'pendente',
    createdAt: '2025-07-14T11:05:00',
    distanciaKm: 7.1,
    tempoEstimadoMin: 22,
    pagamento: 'dinheiro',
  },
  {
    id: 'ped-004',
    clienteId: 'cli-004',
    clienteNome: 'Roberto Almeida',
    tipo: 'entrega',
    origem: enderecosExemplo.liberdadeRua,
    destino: enderecosExemplo.santanaAvCasa,
    valor: 28.75,
    status: 'pendente',
    descricao: 'Caixa de presente — 40x30x20cm, não virar',
    createdAt: '2025-07-14T11:20:00',
    distanciaKm: 12.5,
    tempoEstimadoMin: 35,
    pagamento: 'pix',
  },
  {
    id: 'ped-005',
    clienteId: 'cli-001',
    clienteNome: 'Mariana Costa',
    tipo: 'corrida',
    origem: enderecosExemplo.moemaAvBoi,
    destino: enderecosExemplo.vilaMarianaA,
    valor: 22.5,
    status: 'concluido',
    motoristaId: 'mot-002',
    motoristaNome: 'Fernanda Oliveira',
    createdAt: '2025-07-14T08:00:00',
    distanciaKm: 5.8,
    tempoEstimadoMin: 18,
    pagamento: 'pix',
  },
  {
    id: 'ped-006',
    clienteId: 'cli-002',
    clienteNome: 'Paulo Henrique Silva',
    tipo: 'corrida',
    origem: enderecosExemplo.tatuapeA,
    destino: enderecosExemplo.consolacaoPaulista,
    valor: 30.0,
    status: 'concluido',
    motoristaId: 'mot-001',
    motoristaNome: 'Ricardo Mendes',
    createdAt: '2025-07-13T19:30:00',
    distanciaKm: 9.3,
    tempoEstimadoMin: 28,
    pagamento: 'cartao',
  },
  {
    id: 'ped-007',
    clienteId: 'cli-003',
    clienteNome: 'Fernanda Lima',
    tipo: 'corrida',
    origem: enderecosExemplo.butantaAv,
    destino: enderecosExemplo.pinheirosAvFaria,
    valor: 18.0,
    status: 'cancelado',
    createdAt: '2025-07-13T17:10:00',
    distanciaKm: 7.1,
    tempoEstimadoMin: 22,
    pagamento: 'dinheiro',
  },
]

// ---------- TRAJETOS ATIVOS ----------

export const trajetosAtivos: Record<string, Trajeto> = {
  'ped-002': {
    pontos: [
      { lat: -23.5680, lng: -46.6698, label: 'Origem: Consolação, Av. Paulista 1578' },
      { lat: -23.5850, lng: -46.5710, label: 'Parada intermediária: Rua Tuiuti, Tatuapé' },
      { lat: -23.5990, lng: -46.5480, label: 'Destino: Tatuapé, Rua Tuiuti 955' },
    ],
    status: 'em_rota',
    progresso: 65,
    atualizacoes: [
      'Pedido aceito por Carlos Eduardo',
      'Motorista a caminho do endereço de coleta',
      'Pacote coletado — a caminho do destino',
      'Chegando ao destino em aproximadamente 10 minutos',
    ],
  },
}

// ---------- BAIRROS POPULARES PARA AUTOCOMPLETAR ----------

export const bairrosSP: string[] = [
  'Moema', 'Vila Mariana', 'Pinheiros', 'Consolação', 'Bela Vista',
  'Santana', 'Tatuapé', 'Butantã', 'Liberdade', 'Perdizes',
  'Jardins', 'Cambuci', 'Brás', 'República', 'Lapa',
  'Alto de Pinheiros', 'Saúde', 'Cursino', 'Aclimação', 'Cambuci',
  'Vila Olímpia', 'Itaim Bibi', 'Brooklin', 'Morumbi', 'Santo Amaro',
]

// ---------- MENSAGEM DE STATUS ----------

export const statusLabels: Record<string, string> = {
  pendente: 'Pendente',
  aceito: 'Aceito',
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
}

// ---------- ESTATÍSTICAS PARA O PAINEL ADMIN ----------

export const estatisticasAdmin = {
  corridasHoje: 14,
  corridasMes: 218,
  faturamentoHoje: 486.75,
  faturamentoMes: 7420.50,
  motoristasAtivos: 3,
  motoristasTotal: 5,
  clientesAtivos: 27,
  pedidosPendentes: 2,
  pedidosEmAndamento: 1,
  avaliacaoMedia: 4.7,
}
