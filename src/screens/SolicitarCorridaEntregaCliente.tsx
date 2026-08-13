import { useState } from 'react'
import { enderecosExemplo, type Endereco, type Pedido, pedidos, motoristas, type Motorista } from '../dados'

export default function SolicitarCorridaEntregaCliente({ irPara }: { irPara: (tela: string) => void }) {
  const [tipoServico, setTipoServico] = useState<'corrida' | 'entrega'>('corrida')
  const [origem, setOrigem] = useState<Endereco>(enderecosExemplo.vilaMarianaA)
  const [destino, setDestino] = useState<Endereco>(enderecosExemplo.moemaAvBoi)
  const [pagamento, setPagamento] = useState<'pix' | 'cartao' | 'dinheiro'>('pix')
  const [descricao, setDescricao] = useState('')
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)
  const [mostrarOrigem, setMostrarOrigem] = useState(false)
  const [mostrarDestino, setMostrarDestino] = useState(false)

  const chaveDistancia: Record<string, number> = {
    'vilaMarianaA-moemaAvBoi': 5.8,
    'vilaMarianaA-pinheirosAvFaria': 8.2,
    'vilaMarianaA-consolacaoPaulista': 4.1,
    'vilaMarianaA-santanaAvCasa': 15.6,
    'vilaMarianaA-tatuapeA': 9.3,
    'vilaMarianaA-butantaAv': 11.2,
    'vilaMarianaA-liberdadeRua': 3.8,
    'moemaAvBoi-pinheirosAvFaria': 10.5,
    'moemaAvBoi-consolacaoPaulista': 7.2,
    'moemaAvBoi-santanaAvCasa': 14.1,
    'moemaAvBoi-tatuapeA': 8.0,
    'moemaAvBoi-butantaAv': 12.8,
    'moemaAvBoi-liberdadeRua': 6.5,
    'pinheirosAvFaria-consolacaoPaulista': 3.5,
    'pinheirosAvFaria-santanaAvCasa': 12.3,
    'pinheirosAvFaria-tatuapeA': 6.1,
    'pinheirosAvFaria-butantaAv': 4.2,
    'pinheirosAvFaria-liberdadeRua': 8.9,
    'consolacaoPaulista-santanaAvCasa': 11.0,
    'consolacaoPaulista-tatuapeA': 5.5,
    'consolacaoPaulista-butantaAv': 6.8,
    'consolacaoPaulista-liberdadeRua': 2.3,
    'santanaAvCasa-tatuapeA': 7.8,
    'santanaAvCasa-butantaAv': 14.5,
    'santanaAvCasa-liberdadeRua': 10.2,
    'tatuapeA-butantaAv': 8.6,
    'tatuapeA-liberdadeRua': 6.0,
    'butantaAv-liberdadeRua': 7.3,
  }

  const chave = `${Object.keys(enderecosExemplo).find(k => enderecosExemplo[k] === origem) || ''}-${Object.keys(enderecosExemplo).find(k => enderecosExemplo[k] === destino) || ''}`
  const chaveReversa = `${Object.keys(enderecosExemplo).find(k => enderecosExemplo[k] === destino) || ''}-${Object.keys(enderecosExemplo).find(k => enderecosExemplo[k] === origem) || ''}`
  const distancia = chaveDistancia[chave] || chaveDistancia[chaveReversa] || 5.0
  const tempoEstimado = Math.round(distancia * 3 + (Math.random() * 3))
  const tarifaBase = tipoServico === 'corrida' ? 6.0 : 8.0
  const valorPorKm = tipoServico === 'corrida' ? 2.8 : 3.5
  const valorEstimado = tarifaBase + valorPorKm * distancia
  const motoristaDisponivel: Motorista | undefined = motoristas.find(m => m.status === 'disponivel')

  const handleConfirmar = () => {
    if (origem === destino) return
    setPedidoConfirmado(true)
    setTimeout(() => {
      irPara('AcompanhamentoDoTrajetoCliente')
    }, 2000)
  }

  const enderecosEntrada = Object.entries(enderecosExemplo)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
      {/* ===== HEADER ===== */}
      <header className="bg-black border-b border-red-600 px-4 py-3 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => irPara('SelecaoDePerfil')} className="p-2 -ml-2 hover:bg-zinc-800 rounded-lg transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M19.5 5.5L18 4l-1.5 1.5L15 3l-1.5 1.5L12 1 10.5 4.5 9 3 7.5 4.5 6 3 4.5 4.5 3 3 1.5 4.5 3 6 1.5 7.5 3 9l1.5 1.5L6 12l1.5 1.5L9 15l1.5-1.5L12 18l1.5-1.5L15 15l1.5 1.5L18 12l1.5-1.5L21 10.5 19.5 9l1.5-1.5L21 6zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight leading-tight">Rota Express</h1>
            <p className="text-[10px] text-red-500 font-medium tracking-wide uppercase leading-tight">Entregas rápidas e seguras</p>
          </div>
        </div>
      </header>

      {/* ===== SELETOR DE TIPO ===== */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-zinc-900 rounded-xl p-1 flex border border-zinc-800">
          <button
            onClick={() => setTipoServico('corrida')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              tipoServico === 'corrida'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 2L4 7v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-5z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Corrida
          </button>
          <button
            onClick={() => setTipoServico('entrega')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              tipoServico === 'entrega'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="1" y="7" width="15" height="13" rx="2" />
              <path d="M16 10l4-2v8l-4-2" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="18" cy="19" r="2" />
            </svg>
            Entrega
          </button>
        </div>
      </div>

      {/* ===== CAMPOS DE ENDEREÇO ===== */}
      <div className="px-4 py-3 space-y-3">
        {/* ORIGEM */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3">
            <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-500/20 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mb-0.5">Origem</p>
              <p className="text-sm text-zinc-200 truncate">{origem.rua}, {origem.numero} — {origem.bairro}</p>
            </div>
            <button onClick={() => { setMostrarOrigem(!mostrarOrigem); setMostrarDestino(false) }} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M11 5h10M11 9h7M11 13h4M3 17l3.5 3.5L3 24" />
              </svg>
            </button>
          </div>
          {mostrarOrigem && (
            <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded-xl max-h-40 overflow-y-auto">
              {enderecosEntrada.map(([chave, end]) => (
                <button
                  key={chave}
                  onClick={() => { setOrigem(end); setMostrarOrigem(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-0 ${origem === end ? 'bg-red-600/10 text-red-400' : 'text-zinc-300'}`}
                >
                  {end.rua}, {end.numero} — {end.bairro}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LINHA CONECTORA */}
        <div className="flex items-center gap-2 pl-1.5">
          <div className="w-px h-6 bg-zinc-700 ml-[5px]" />
          <div className="flex-1 border-t-2 border-dashed border-zinc-700" />
        </div>

        {/* DESTINO */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3">
            <div className="w-3 h-3 rounded-full bg-red-600 ring-4 ring-red-600/20 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mb-0.5">Destino</p>
              <p className="text-sm text-zinc-200 truncate">{destino.rua}, {destino.numero} — {destino.bairro}</p>
            </div>
            <button onClick={() => { setMostrarDestino(!mostrarDestino); setMostrarOrigem(false) }} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M11 5h10M11 9h7M11 13h4M3 17l3.5 3.5L3 24" />
              </svg>
            </button>
          </div>
          {mostrarDestino && (
            <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded-xl max-h-40 overflow-y-auto">
              {enderecosEntrada.map(([chave, end]) => (
                <button
                  key={chave}
                  onClick={() => { setDestino(end); setMostrarDestino(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-0 ${destino === end ? 'bg-red-600/10 text-red-400' : 'text-zinc-300'}`}
                >
                  {end.rua}, {end.numero} — {end.bairro}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== MAPA SIMULADO ===== */}
      <div className="px-4 py-2">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative" style={{ height: '160px' }}>
          {/* Grid de fundo simulando ruas */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-[30%] left-0 right-0 h-px bg-zinc-500" />
            <div className="absolute top-[60%] left-0 right-0 h-px bg-zinc-500" />
            <div className="absolute top-[15%] left-0 right-0 h-px bg-zinc-600" />
            <div className="absolute top-[80%] left-0 right-0 h-px bg-zinc-600" />
            <div className="absolute left-[25%] top-0 bottom-0 w-px bg-zinc-500" />
            <div className="absolute left-[55%] top-0 bottom-0 w-px bg-zinc-500" />
            <div className="absolute left-[80%] top-0 bottom-0 w-px bg-zinc-600" />
          </div>
          {/* Rota tracejada */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160">
            <path
              d="M 50 120 C 80 110, 100 60, 140 80 S 200 40, 230 50 S 270 30, 280 45"
              fill="none"
              stroke="#DC2626"
              strokeWidth="3"
              strokeDasharray="8 4"
              className="animate-pulse"
            />
          </svg>
          {/* Ponto de origem */}
          <div className="absolute left-[14%] top-[72%] flex flex-col items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-[9px] bg-black/80 text-green-400 px-1.5 py-0.5 rounded mt-1 font-medium">Origem</span>
          </div>
          {/* Ponto de destino */}
          <div className="absolute right-[8%] top-[24%] flex flex-col items-center">
            <div className="w-5 h-5 bg-red-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-[9px] bg-black/80 text-red-400 px-1.5 py-0.5 rounded mt-1 font-medium">Destino</span>
          </div>
          {/* Motocicleta no caminho */}
          <div className="absolute left-[48%] top-[46%] bg-red-600/90 text-white text-[8px] px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M19.5 5.5L18 4l-1.5 1.5L15 3l-1.5 1.5L12 1 10.5 4.5 9 3 7.5 4.5 6 3 4.5 4.5 3 3 1.5 4.5 3 6 1.5 7.5 3 9l1.5 1.5L6 12l1.5 1.5L9 15l1.5-1.5L12 18l1.5-1.5L15 15l1.5 1.5L18 12l1.5-1.5L21 10.5 19.5 9l1.5-1.5L21 6zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
            </svg>
            A caminho
          </div>
        </div>
      </div>

      {/* ===== ESTIMATIVA ===== */}
      <div className="px-4 py-2">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-3">Estimativa da corrida</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#DC2626" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-white">{tempoEstimado} min</p>
                <p className="text-[10px] text-zinc-500">tempo estimado</p>
              </div>
            </div>
            <div className="w-px h-8 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#DC2626" strokeWidth={2}>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-white">{distancia.toFixed(1)} km</p>
                <p className="text-[10px] text-zinc-500">distância</p>
              </div>
            </div>
            <div className="w-px h-8 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600/10 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16A34A" strokeWidth={2}>
                  <path d="M12 2v20M2 12h20" />
                  <path d="M2 7l10 5 10-5" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-green-400">R$ {valorEstimado.toFixed(2).replace('.', ',')}</p>
                <p className="text-[10px] text-zinc-500">estimativa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DESCRIÇÃO (só para entrega) ===== */}
      {tipoServico === 'entrega' && (
        <div className="px-4 py-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-2">Descrição do pacote</p>
            <textarea
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Ex: Pacote com documentos, tamanho 30x20x10cm, cuidado frágil..."
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none"
              rows={2}
            />
          </div>
        </div>
      )}

      {/* ===== FORMA DE PAGAMENTO ===== */}
      <div className="px-4 py-2">
        <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-2">Forma de pagamento</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: 'pix' as const, label: 'PIX', icone: '📱', cor: 'border-green-600/50 bg-green-600/5' },
            { key: 'cartao' as const, label: 'Cartão', icone: '💳', cor: 'border-blue-600/50 bg-blue-600/5' },
            { key: 'dinheiro' as const, label: 'Dinheiro', icone: '💵', cor: 'border-yellow-600/50 bg-yellow-600/5' },
          ]).map(op => (
            <button
              key={op.key}
              onClick={() => setPagamento(op.key)}
              className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-1 ${pagamento === op.key ? op.cor + ' ring-2 ring-red-600' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}
            >
              <span className="text-lg">{op.icone}</span>
              <span className={pagamento === op.key ? 'text-white' : 'text-zinc-400'}>{op.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ===== MOTORISTA DISPONÍVEL ===== */}
      {motoristaDisponivel && !pedidoConfirmado && (
        <div className="px-4 py-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
            <img
              src={motoristaDisponivel.foto}
              alt={motoristaDisponivel.nome}
              className="w-11 h-11 rounded-full object-cover border-2 border-red-600/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{motoristaDisponivel.nome}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-yellow-400">★ {motoristaDisponivel.avaliacao}</span>
                <span className="text-[10px] text-zinc-600">|</span>
                <span className="text-[10px] text-zinc-400">{motoristaDisponivel.corridasRealizadas} corridas</span>
                <span className="text-[10px] text-zinc-600">|</span>
                <span className="text-[10px] text-zinc-400">{motoristaDisponivel.modeloMoto}</span>
              </div>
            </div>
            <span className="text-[10px] font-medium text-green-400 bg-green-600/10 px-2 py-1 rounded-full">Online</span>
          </div>
        </div>
      )}

      {/* ===== BOTÃO CONFIRMAR / OVERLAY ===== */}
      {pedidoConfirmado ? (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 px-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white text-center">Pedido confirmado!</h2>
          <p className="text-sm text-zinc-400 text-center mt-2">Procurando motorista próximo...</p>
          {motoristaDisponivel && (
            <p className="text-sm text-red-400 font-medium mt-1">{motoristaDisponivel.nome} está a caminho</p>
          )}
          <div className="mt-6 w-full max-w-xs bg-zinc-900 border border-zinc-700 rounded-xl p-4">
            <p className="text-xs text-zinc-400 mb-1">Origem</p>
            <p className="text-sm text-white">{origem.rua}, {origem.numero} — {origem.bairro}</p>
            <p className="text-xs text-zinc-500 mt-1">{origem.referencia}</p>
            <p className="text-xs text-zinc-400 mt-3 mb-1">Destino</p>
            <p className="text-sm text-white">{destino.rua}, {destino.numero} — {destino.bairro}</p>
            <p className="text-xs text-zinc-500 mt-1">{destino.referencia}</p>
            <p className="text-xs text-zinc-400 mt-3 mb-1">Valor estimado</p>
            <p className="text-lg font-bold text-green-400">R$ {valorEstimado.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4 pb-8">
          <button
            onClick={handleConfirmar}
            disabled={origem === destino}
            className={`w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all flex items-center justify-center gap-2 ${
              origem === destino
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 active:scale-[0.98]'
            }`}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 12l5 5L20 7" />
            </svg>
            {origem === destino ? 'Selecione destinos diferentes' : `Solicitar ${tipoServico === 'corrida' ? 'Corrida' : 'Entrega'} — R$ ${valorEstimado.toFixed(2).replace('.', ',')}`}
          </button>
          <p className="text-[10px] text-zinc-600 text-center mt-2">Ao confirmar, um motorista será notificado automaticamente</p>
        </div>
      )}
    </div>
  )
}
