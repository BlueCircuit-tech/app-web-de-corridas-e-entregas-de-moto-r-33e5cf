import { useState, useMemo } from 'react';
import { motoristas, clientes, corridas, enderecos } from '../dados';
import type { Corrida } from '../dados';

// ------------------------------------------------------------------
// Dados mockados de solicitações pendentes simulando pedidos que
// chegam em tempo real para o motorista logado (mot-001 / Ricardo)
// ------------------------------------------------------------------
const SOLICITACOES_INICIAIS: Corrida[] = [
  {
    id: 'sol-001',
    tipo: 'corrida',
    clienteId: 'cli-002',
    origem: enderecos.centro2,
    destino: enderecos.zonaSul2,
    status: 'solicitada',
    valorEstimado: 18.5,
    formaPagamento: 'pix',
    distanciaKm: 7.8,
    tempoEstimadoMin: 18,
    criadaEm: new Date(Date.now() - 2 * 60_000).toISOString(),
  },
  {
    id: 'sol-002',
    tipo: 'entrega',
    clienteId: 'cli-003',
    origem: enderecos.zonaNorte1,
    destino: enderecos.butanta,
    itensEntrega: [
      { descricao: 'Presente aniversário — caixa de som', quantidade: 1, peso: '1,5kg', dimensoes: '35x25x15cm', fragil: true },
    ],
    status: 'solicitada',
    valorEstimado: 34.0,
    formaPagamento: 'cartao',
    observacoes: 'Cuidado, item frágil. Tocar interfone 204.',
    distanciaKm: 9.6,
    tempoEstimadoMin: 25,
    criadaEm: new Date(Date.now() - 5 * 60_000).toISOString(),
  },
  {
    id: 'sol-003',
    tipo: 'corrida',
    clienteId: 'cli-004',
    origem: enderecos.moema,
    destino: enderecos.centro1,
    status: 'solicitada',
    valorEstimado: 38.0,
    formaPagamento: 'dinheiro',
    distanciaKm: 12.4,
    tempoEstimadoMin: 32,
    criadaEm: new Date(Date.now() - 8 * 60_000).toISOString(),
  },
];

// ------------------------------------------------------------------
// Tipos auxiliares locais (quando não há interface exportada de dados.ts)
// ------------------------------------------------------------------
type TipoServicoLocal = 'corrida' | 'entrega';

// ------------------------------------------------------------------
// Componente
// ------------------------------------------------------------------
export default function NovosPedidosMotorista() {
  const motorista = motoristas.find((m) => m.id === 'mot-001') ?? motoristas[0];
  const [online, setOnline] = useState<boolean>(motorista.disponivel);
  const [solicitacoes, setSolicitacoes] = useState<Corrida[]>(SOLICITACOES_INICIAIS);
  const [recusadas, setRecusadas] = useState<string[]>([]);
  const [aceitaId, setAceitaId] = useState<string | null>(null);

  // Pedidos realmente visíveis (exclui recusados nesta sessão)
  const pedidosVisiveis = useMemo(
    () => solicitacoes.filter((s) => !recusadas.includes(s.id)),
    [solicitacoes, recusadas],
  );

  // --------------------------------------------------------------
  // Ações
  // --------------------------------------------------------------
  const aceitarCorrida = (id: string) => {
    setAceitaId(id);
    // Simula envio para servidor e transição para tela de corrida
    setTimeout(() => {
      setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
      setAceitaId(null);
    }, 800);
  };

  const recusarCorrida = (id: string) => {
    setRecusadas((prev) => [...prev, id]);
  };

  // --------------------------------------------------------------
  // Helpers de UI
  // --------------------------------------------------------------
  const tempoDesdeCriacao = (criadaEm: string): string => {
    const diffMs = Date.now() - new Date(criadaEm).getTime();
    const min = Math.floor(diffMs / 60_000);
    if (min < 1) return 'agora';
    if (min === 1) return 'há 1 min';
    return `há ${min} min`;
  };

  const fmtMoeda = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const labelsPagamento: Record<string, string> = {
    pix: 'Pix',
    dinheiro: 'Dinheiro',
    cartao: 'Cartão',
  };

  const iconesPagamento: Record<string, string> = {
    pix: '📱',
    dinheiro: '💵',
    cartao: '💳',
  };

  // --------------------------------------------------------------
  // Layout
  // --------------------------------------------------------------
  return (
    <div className="h-screen w-full max-w-md mx-auto flex flex-col bg-neutral-50">
      {/* ======================================================== */}
      {/* CABEÇALHO — preto com detalhe vermelho                      */}
      {/* ======================================================== */}
      <header className="bg-black flex-shrink-0">
        {/* Barra vermelha fina no topo */}
        <div className="h-1 bg-red-600" />

        <div className="px-4 pt-4 pb-3">
          {/* Linha 1: logo + toggle */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              {/* Ícone da moto SVG */}
              <svg width="38" height="38" viewBox="0 0 48 48" fill="none" className="flex-shrink-0">
                <circle cx="14" cy="34" r="8" stroke="#DC2626" strokeWidth="2.5" fill="none" />
                <circle cx="34" cy="34" r="8" stroke="#DC2626" strokeWidth="2.5" fill="none" />
                <path d="M14 26 L20 18 L28 14 L36 18 L34 26" stroke="#DC2626" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                <path d="M28 14 L30 10 L34 12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="34" cy="10" r="2.5" fill="#DC2626" />
                <path d="M20 18 L22 14 L26 16 L28 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div>
                <h1 className="text-white text-lg font-black tracking-tight leading-none">
                  ROTA EXPRESS
                </h1>
                <p className="text-neutral-400 text-[10px] tracking-wider uppercase mt-0.5">
                  Entregas rápidas e seguras
                </p>
              </div>
            </div>

            {/* Toggle Online/Offline */}
            <button
              onClick={() => setOnline((o) => !o)}
              className={`relative inline-flex h-7 w-[54px] items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${online ? 'bg-green-500' : 'bg-neutral-600'}`}
              aria-label={online ? 'Ficar offline' : 'Ficar online'}
              aria-pressed={online}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${online ? 'translate-x-[27px]' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* Linha 2: nome do motorista + status */}
          <div className="flex items-center gap-2.5 bg-neutral-900 rounded-xl px-3.5 py-2.5">
            <img
              src={motorista.foto}
              alt={motorista.nome}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-red-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{motorista.nome}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-neutral-400 text-xs">
                  {motorista.moto.modelo} · {motorista.moto.placa}
                </span>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${online ? 'bg-green-500/15 text-green-400' : 'bg-neutral-700 text-neutral-400'}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-green-400 animate-pulse' : 'bg-neutral-500'}`}
              />
              {online ? 'Online' : 'Offline'}
            </div>
          </div>

          {/* Aviso quando offline */}
          {!online && (
            <div className="mt-3 bg-neutral-800 rounded-lg px-3.5 py-2.5 flex items-center gap-2">
              <span className="text-lg">📴</span>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Você está <strong className="text-neutral-100">offline</strong>. Ative o toggle para receber corridas e entregas.
              </p>
            </div>
          )}
        </div>
      </header>

      {/* ======================================================== */}
      {/* CONTEÚDO — lista de pedidos ou estado vazio               */}
      {/* ======================================================== */}
      <main className="flex-1 overflow-y-auto pb-4">
        {/* Título da seção */}
        {online && (
          <div className="px-4 pt-3 pb-2 flex items-baseline justify-between">
            <h2 className="text-neutral-900 text-sm font-bold uppercase tracking-wider">
              Novos Pedidos
            </h2>
            <span className="text-red-600 text-xs font-bold">
              {pedidosVisiveis.length} {pedidosVisiveis.length === 1 ? 'disponível' : 'disponíveis'}
            </span>
          </div>
        )}

        {!online ? (
          /* ---------- Estado offline: corridas em andamento ---------- */
          <div className="px-4 space-y-3">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
              <div className="bg-red-600 px-4 py-2.5 flex items-center justify-between">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Corrida em Andamento</span>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">EM ANDAMENTO</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={clientes[0].foto}
                    alt={clientes[0].nome}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{clientes[0].nome}</p>
                    <p className="text-xs text-neutral-500">★ {clientes[0].avaliacaoMedia} · {clientes[0].totalCorridas} corridas</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div className="w-0.5 h-8 bg-neutral-200 my-0.5" />
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div>
                        <p className="text-[11px] text-neutral-400 uppercase font-semibold">Origem</p>
                        <p className="text-sm text-neutral-800 font-medium">Rua Giovanni Gronchi, 5800 — Vila Andrade</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-neutral-400 uppercase font-semibold">Destino</p>
                        <p className="text-sm text-neutral-800 font-medium">Rua Oscar Freire, 230 — Jardins</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500">📏 8,3 km</span>
                    <span className="text-xs text-neutral-500">⏱ ~22 min</span>
                  </div>
                  <span className="text-green-600 font-bold text-sm">R$ 28,50</span>
                </div>
                <button className="w-full bg-neutral-900 text-white text-sm font-bold py-3 rounded-xl active:scale-[0.98] transition-transform">
                  Ver Rota em Tempo Real
                </button>
              </div>
            </div>
            <p className="text-center text-neutral-400 text-xs pb-1">
              Ao ficar online, novos pedidos aparecerão aqui automaticamente
            </p>
          </div>
        ) : pedidosVisiveis.length === 0 ? (
          /* ---------- Estado vazio online ---------- */
          <div className="flex flex-col items-center justify-center px-8 py-16">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <p className="text-neutral-600 font-semibold text-base mb-1">Nenhum pedido no momento</p>
            <p className="text-neutral-400 text-sm text-center leading-relaxed">
              Fique atento! Os pedidos aparecem aqui automaticamente quando clientes solicitam corridas ou entregas na sua região.
            </p>
          </div>
        ) : (
          /* ---------- Lista de pedidos ---------- */
          <div className="px-4 space-y-3">
            {pedidosVisiveis.map((sol) => {
              const cliente = clientes.find((c) => c.id === sol.clienteId);
              const nomeCliente = cliente?.nome ?? 'Cliente';
              const avaliacao = cliente?.avaliacaoMedia ?? 0;
              const totalCorridas = cliente?.totalCorridas ?? 0;
              const isCorrida = sol.tipo === 'corrida';
              const isAccepting = aceitaId === sol.id;
              const foiRecusado = recusadas.includes(sol.id);

              return (
                <div
                  key={sol.id}
                  className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-500 ${foiRecusado ? 'opacity-0 translate-x-8 h-0 border-0 p-0' : 'border-neutral-100'}`}
                >
                  {/* --- Faixa superior vermelha --- */}
                  <div className="bg-red-600 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{isCorrida ? '🏍️' : '📦'}</span>
                      <span className="text-white text-xs font-bold uppercase tracking-wider">
                        {isCorrida ? 'Corrida' : 'Entrega'}
                      </span>
                    </div>
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {tempoDesdeCriacao(sol.criadaEm)}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* --- Cliente --- */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cliente?.foto}
                        alt={nomeCliente}
                        className="w-9 h-9 rounded-full object-cover bg-neutral-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 truncate">
                          {nomeCliente}
                        </p>
                        <p className="text-xs text-neutral-500">
                          ★ {avaliacao} · {totalCorridas} {totalCorridas === 1 ? 'corrida' : 'corridas'}
                        </p>
                      </div>
                    </div>

                    {/* --- Rota: origem → destino --- */}
                    <div className="space-y-0">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center pt-0.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-100 flex-shrink-0" />
                          <div className="w-px h-10 bg-neutral-200 my-1" />
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-100 flex-shrink-0" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <p className="text-[10px] text-neutral-400 uppercase font-bold mb-0.5">Origem</p>
                            <p className="text-sm text-neutral-800 font-medium leading-snug">
                              {sol.origem.rua}, {sol.origem.numero}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {sol.origem.bairro} · {sol.origem.cidade}
                            </p>
                            {sol.origem.referencia && (
                              <p className="text-xs text-neutral-400 italic mt-0.5">
                                📌 {sol.origem.referencia}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] text-neutral-400 uppercase font-bold mb-0.5">Destino</p>
                            <p className="text-sm text-neutral-800 font-medium leading-snug">
                              {sol.destino.rua}, {sol.destino.numero}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {sol.destino.bairro} · {sol.destino.cidade}
                            </p>
                            {sol.destino.referencia && (
                              <p className="text-xs text-neutral-400 italic mt-0.5">
                                📌 {sol.destino.referencia}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- Itens de entrega (se aplicável) --- */}
                    {!isCorrida && sol.itensEntrega && sol.itensEntrega.length > 0 && (
                      <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
                        <p className="text-[10px] text-orange-700 uppercase font-bold mb-1.5">📦 Itens para transportar</p>
                        {sol.itensEntrega.map((item, i) => (
                          <div key={i} className="text-xs text-orange-900/80">
                            • {item.descricao} {item.quantidade > 1 ? `(x${item.quantidade})` : ''}
                            {item.peso && <span className="text-orange-600 ml-1">· {item.peso}</span>}
                            {item.fragil && <span className="text-red-600 font-semibold ml-1">· Frágil!</span>}
                          </div>
                        ))}
                        {sol.observacoes && (
                          <p className="text-xs text-orange-700 mt-1.5 italic">
                            💬 {sol.observacoes}
                          </p>
                        )}
                      </div>
                    )}

                    {isCorrida && sol.observacoes && (
                      <div className="bg-neutral-50 border border-neutral-100 rounded-xl px-3 py-2">
                        <p className="text-xs text-neutral-600 italic">💬 {sol.observacoes}</p>
                      </div>
                    )}

                    {/* --- Método de pagamento --- */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{iconesPagamento[sol.formaPagamento]}</span>
                      <span className="text-xs text-neutral-500 font-medium">
                        {labelsPagamento[sol.formaPagamento]}
                      </span>
                    </div>

                    {/* --- Rodapé do card: distância, tempo, valor e ações --- */}
                    <div className="pt-3 border-t border-neutral-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                              <path d="M12 6v6l4 2" />
                            </svg>
                            <span className="text-xs text-neutral-500 font-medium">
                              {sol.tempoEstimadoMin} min
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                            <span className="text-xs text-neutral-500 font-medium">
                              {sol.distanciaKm.toFixed(1).replace('.', ',')} km
                            </span>
                          </div>
                        </div>
                        <span className="text-green-600 font-black text-xl tracking-tight">
                          {fmtMoeda(sol.valorEstimado)}
                        </span>
                      </div>

                      {/* Botões Aceitar / Recusar */}
                      {!isAccepting ? (
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => recusarCorrida(sol.id)}
                            className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-bold py-3 rounded-xl active:scale-[0.97] transition-all"
                          >
                            Recusar
                          </button>
                          <button
                            onClick={() => aceitarCorrida(sol.id)}
                            className="flex-[2] bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-red-600/25 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Aceitar Corrida
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="text-white text-sm font-semibold">Confirmando...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
