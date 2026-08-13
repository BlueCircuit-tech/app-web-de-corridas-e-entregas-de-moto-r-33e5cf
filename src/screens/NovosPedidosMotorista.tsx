import { useState } from 'react'
import { pedidos, Pedido } from '../dados'

export default function NovosPedidosMotorista({ irPara }: { irPara: (tela: string) => void }) {
  const [disponivel, setDisponivel] = useState(true)
  const [listaPedidos, setListaPedidos] = useState<Pedido[]>(
    pedidos.filter(p => p.status === 'pendente')
  )
  const [aceitoRecente, setAceitoRecente] = useState<string | null>(null)

  const aceitarPedido = (id: string) => {
    setListaPedidos(prev => prev.filter(p => p.id !== id))
    setAceitoRecente(id)
    setTimeout(() => {
      irPara('CorridaEmAndamentoMotorista')
    }, 600)
  }

  const recusarPedido = (id: string) => {
    setListaPedidos(prev => prev.filter(p => p.id !== id))
  }

  const pedidosPendentes = listaPedidos
  const horaAtual = new Date()
  const horaStr = horaAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* Header */}
      <header className="bg-red-600 px-4 pt-4 pb-3 shadow-lg">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => irPara('SelecaoDePerfil')}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Voltar"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight">Rota Express</h1>
              <p className="text-[11px] text-red-100 font-medium -mt-0.5">Entregas rápidas e seguras</p>
            </div>
          </div>
          <button
            onClick={() => irPara('SelecaoDePerfil')}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Sair"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-4 pb-8">
        {/* Motorista Info Bar */}
        <div className="flex items-center gap-3 mb-4 bg-neutral-900 border border-neutral-800 rounded-xl p-3">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="Ricardo Mendes"
            className="w-11 h-11 rounded-full object-cover border-2 border-red-600"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Ricardo Mendes</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-yellow-400 font-medium flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8
              </span>
              <span className="text-[11px] text-neutral-500">·</span>
              <span className="text-[11px] text-neutral-400">342 corridas</span>
              <span className="text-[11px] text-neutral-500">·</span>
              <span className="text-[11px] text-neutral-400">Honda CG 160 Fan</span>
            </div>
          </div>
        </div>

        {/* Toggle Disponibilidade */}
        <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${disponivel ? 'bg-green-600/20' : 'bg-neutral-800'}`}>
              <svg className={`w-5 h-5 ${disponivel ? 'text-green-400' : 'text-neutral-500'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {disponivel ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                )}
              </svg>
            </div>
            <div>
              <p className={`text-sm font-semibold ${disponivel ? 'text-green-400' : 'text-neutral-400'}`}>
                {disponivel ? 'Online — Disponível' : 'Offline — Ausente'}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {disponivel ? 'Recebendo pedidos' : 'Não está recebendo pedidos'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDisponivel(!disponivel)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${disponivel ? 'bg-green-600' : 'bg-neutral-700'}`}
            role="switch"
            aria-checked={disponivel}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${disponivel ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Notification Toast */}
        {aceitoRecente && (
          <div className="mb-4 bg-green-600/20 border border-green-600/40 text-green-400 rounded-xl px-4 py-3 text-sm font-medium text-center animate-pulse">
            ✓ Pedido aceito! Redirecionando para a corrida...
          </div>
        )}

        {/* Seção Pedidos Novos */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">
            Novos Pedidos
          </h2>
          {pedidosPendentes.length > 0 && (
            <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              {pedidosPendentes.length} {pedidosPendentes.length === 1 ? 'disponível' : 'disponíveis'}
            </span>
          )}
        </div>

        {/* Lista de pedidos ou estado vazio */}
        {!disponivel ? (
          <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
              </svg>
            </div>
            <p className="text-neutral-400 text-sm font-medium">Você está offline</p>
            <p className="text-neutral-600 text-xs mt-1">Ative o toggle para receber pedidos</p>
          </div>
        ) : pedidosPendentes.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 013 21V12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <p className="text-neutral-400 text-sm font-medium">Nenhum pedido novo</p>
            <p className="text-neutral-600 text-xs mt-1">Aguarde, novos pedidos aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pedidosPendentes.map(pedido => (
              <div
                key={pedido.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors"
              >
                {/* Tipo e valor */}
                <div className="bg-neutral-800/60 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${
                      pedido.tipo === 'corrida'
                        ? 'bg-red-600/20 text-red-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {pedido.tipo === 'corrida' ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                      )}
                      {pedido.tipo === 'corrida' ? 'Corrida' : 'Entrega'}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {new Date(pedido.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">
                      R$ {pedido.valor.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      {pedido.pagamento === 'pix' ? 'PIX' : pedido.pagamento === 'cartao' ? 'Cartão' : 'Dinheiro'}
                    </p>
                  </div>
                </div>

                {/* Rota */}
                <div className="px-4 py-3.5">
                  <div className="flex gap-3">
                    {/* Linha vertical da rota */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-green-300 mt-0.5" />
                      <div className="w-0.5 h-10 bg-neutral-700 my-1 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <svg className="w-3 h-3 text-neutral-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                          </svg>
                        </div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-red-300" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div>
                        <p className="text-[10px] text-green-400 font-semibold uppercase tracking-wide mb-0.5">Origem</p>
                        <p className="text-sm text-white font-medium leading-tight">{pedido.origem.rua}, {pedido.origem.numero}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">{pedido.origem.bairro} — {pedido.origem.cidade}</p>
                        {pedido.origem.referencia && (
                          <p className="text-[11px] text-neutral-500 mt-0.5">Ref: {pedido.origem.referencia}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] text-red-400 font-semibold uppercase tracking-wide mb-0.5">Destino</p>
                        <p className="text-sm text-white font-medium leading-tight">{pedido.destino.rua}, {pedido.destino.numero}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">{pedido.destino.bairro} — {pedido.destino.cidade}</p>
                        {pedido.destino.referencia && (
                          <p className="text-[11px] text-neutral-500 mt-0.5">Ref: {pedido.destino.referencia}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalhes e ações */}
                <div className="border-t border-neutral-800 px-4 py-3">
                  {/* Info row */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span className="text-xs font-medium">{pedido.distanciaKm} km</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium">~{pedido.tempoEstimadoMin} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="text-xs font-medium">{pedido.clienteNome}</span>
                    </div>
                  </div>

                  {/* Descrição para entregas */}
                  {pedido.descricao && (
                    <div className="bg-neutral-800/60 rounded-lg px-3 py-2 mb-3">
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        <span className="text-neutral-500 font-medium">Descrição do item:</span> {pedido.descricao}
                      </p>
                    </div>
                  )}

                  {/* Botões de ação */}
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => recusarPedido(pedido.id)}
                      className="flex-1 py-2.5 rounded-xl border-2 border-neutral-700 text-neutral-300 text-sm font-bold hover:bg-neutral-800 hover:border-neutral-600 active:scale-[0.97] transition-all"
                    >
                      Recusar
                    </button>
                    <button
                      onClick={() => aceitarPedido(pedido.id)}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-500 active:scale-[0.97] transition-all shadow-lg shadow-red-600/20"
                    >
                      Aceitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}