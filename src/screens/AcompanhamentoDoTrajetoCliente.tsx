export default function AcompanhamentoDoTrajetoCliente({ irPara }: { irPara: (tela: string) => void }) {
  const pedido = pedidos.find(p => p.id === 'ped-002')!
  const motorista = motoristas.find(m => m.id === pedido.motoristaId)!
  const trajeto = trajetosAtivos[pedido.id]

  const formatarTempo = (minutos: number) => {
    const h = Math.floor(minutos / 60)
    const m = minutos % 60
    return h > 0 ? `${h}h ${m}min` : `${m} min`
  }

  const tempoRestante = Math.round(pedido.tempoEstimadoMin * (1 - (trajeto?.progresso ?? 0) / 100))

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="bg-black px-4 py-3 flex items-center justify-between border-b border-red-600/30 shrink-0">
        <button onClick={() => irPara('SolicitarCorridaEntregaCliente')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4l-8 8 8 8"/></svg>
        </button>
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" fill="#DC2626" />
            <text x="20" y="25" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">M</text>
          </svg>
          <span className="font-bold text-lg tracking-tight">Rota Express</span>
        </div>
        <button onClick={() => irPara('SelecaoDePerfil')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h6M4 10h6M4 16h6M14 4h2M14 10h2M14 16h2"/></svg>
        </button>
      </header>

      {/* ===== MAPA SIMULADO ===== */}
      <div className="relative bg-gray-900 shrink-0" style={{ height: '340px' }}>
        <canvas id="mapaCanvas" className="w-full h-full" />

        {/* Overlay: Rua animada */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice">
            {/* Ruas */}
            <line x1="0" y1="100" x2="400" y2="100" stroke="#374151" strokeWidth="12" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#374151" strokeWidth="14" />
            <line x1="0" y1="290" x2="400" y2="290" stroke="#374151" strokeWidth="10" />
            <line x1="100" y1="0" x2="100" y2="340" stroke="#374151" strokeWidth="12" />
            <line x1="220" y1="0" x2="220" y2="340" stroke="#374151" strokeWidth="10" />
            <line x1="330" y1="0" x2="330" y2="340" stroke="#374151" strokeWidth="14" />
            {/* Diagonal */}
            <line x1="50" y1="340" x2="380" y2="60" stroke="#374151" strokeWidth="10" />

            {/* Linha do trajeto (destacada) */}
            <line x1="100" y1="200" x2="220" y2="100" stroke="#DC2626" strokeWidth="4" strokeDasharray="8 4" className="animate-pulse" />

            {/* Ponto origem */}
            <circle cx="100" cy="200" r="10" fill="#16A34A" />
            <text x="100" y="185" textAnchor="middle" fill="#16A34A" fontSize="9" fontWeight="bold">A</text>

            {/* Ponto destino */}
            <circle cx="220" cy="100" r="10" fill="#DC2626" />
            <text x="220" y="85" textAnchor="middle" fill="#DC2626" fontSize="9" fontWeight="bold">B</text>

            {/* Posição da moto (animada) */}
            <g className="moto-marker">
              <circle cx="160" cy="150" r="14" fill="#DC2626" opacity="0.3">
                <animate attributeName="r" values="14;22;14" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <g transform="translate(160, 150)">
                <circle r="10" fill="#DC2626" />
                <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10">🏍</text>
              </g>
            </g>

            {/* Rótulos de ruas */}
            <text x="120" y="98" fill="#6B7280" fontSize="7">Av. Paulista</text>
            <text x="230" y="198" fill="#6B7280" fontSize="7">R. Augusta</text>
            <text x="335" y="98" fill="#6B7280" fontSize="7">Consolação</text>
          </svg>
        </div>

        {/* Badge de progresso */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-red-600/30">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-gray-300">Progresso</span>
          </div>
          <div className="w-48 h-2 bg-gray-700 rounded-full mt-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000" style={{ width: `${trajeto?.progresso ?? 0}%` }} />
          </div>
          <span className="text-xs text-red-400 font-semibold mt-0.5 block">{trajeto?.progresso ?? 0}%</span>
        </div>

        {/* ETA flutuante */}
        <div className="absolute top-4 right-4 bg-red-600 rounded-xl px-4 py-2 shadow-lg shadow-red-600/30">
          <p className="text-xs text-red-200">Chegada em</p>
          <p className="text-2xl font-bold">{formatarTempo(tempoRestante)}</p>
        </div>

        {/* Badge status */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-red-600/30 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center shrink-0">
              <svg width="20" height="20" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"><path d="M4 10l4 4 8-8"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-400">Motorista a caminho</p>
              <p className="text-xs text-gray-400">Ricardo está indo buscar você</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Card do Motorista */}
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img src={motorista.foto} alt={motorista.nome} className="w-16 h-16 rounded-full object-cover border-2 border-red-600" />
              <span className="absolute -bottom-0.5 -right-0.5 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-gray-900">
                {motorista.status === 'disponivel' ? 'ON' : motorista.status === 'ocupado' ? 'OC' : 'OFF'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base truncate">{motorista.nome}</h3>
              <p className="text-sm text-gray-400">{motorista.modeloMoto}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-yellow-400">
                  ★ {motorista.avaliacao}
                </span>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-400">{motorista.corridasRealizadas} corridas</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button className="w-11 h-11 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 active:scale-95 transition-all shadow-lg shadow-green-600/20" aria-label="Ligar para motorista">
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M3 3h3l1.5 3.5L7 11l2.5-1.5L10 14h3v3h-3l-1-1.5-3 2.5-2.5-1-2-4.5-1 3.5H1V6l2.5-1.5L6 1.5 8 3z"/></svg>
              </button>
              <button className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 active:scale-95 transition-all border border-gray-700" aria-label="Enviar mensagem">
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M2 4h14v10H2zM5 7l4 3 4-3"/></svg>
              </button>
            </div>
          </div>
          {/* Placa da moto */}
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-gray-800 text-gray-300 text-xs font-mono px-3 py-1 rounded-md border border-gray-700">
              {motorista.placaMoto}
            </span>
            <span className="text-xs text-gray-500">CNH {motorista.cnh}</span>
          </div>
        </div>

        {/* Rota: Origem → Destino */}
        <div className="px-4 py-4">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Rota da Corrida</h4>

          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-green-500 to-red-500" />

            {/* Origem */}
            <div className="flex gap-3 mb-4">
              <div className="w-[36px] h-[36px] bg-green-600 rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg shadow-green-600/30">
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="8" cy="6" r="2.5"/><path d="M8 2v2M3 18l2-5 3 2 2-4 2 3 2-2 2 3"/></svg>
              </div>
              <div className="flex-1 bg-gray-900 rounded-xl p-3 border border-gray-800">
                <p className="text-xs text-green-400 font-semibold mb-0.5">ORIGEM</p>
                <p className="text-sm font-medium">{pedido.origem.rua}, {pedido.origem.numero}</p>
                <p className="text-xs text-gray-400">{pedido.origem.bairro} — {pedido.origem.cidade}</p>
                {pedido.origem.referencia && (
                  <p className="text-xs text-gray-500 mt-1">📍 {pedido.origem.referencia}</p>
                )}
              </div>
            </div>

            {/* Destino */}
            <div className="flex gap-3">
              <div className="w-[36px] h-[36px] bg-red-600 rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg shadow-red-600/30">
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z"/></svg>
              </div>
              <div className="flex-1 bg-gray-900 rounded-xl p-3 border border-gray-800">
                <p className="text-xs text-red-400 font-semibold mb-0.5">DESTINO</p>
                <p className="text-sm font-medium">{pedido.destino.rua}, {pedido.destino.numero}</p>
                <p className="text-xs text-gray-400">{pedido.destino.bairro} — {pedido.destino.cidade}</p>
                {pedido.destino.referencia && (
                  <p className="text-xs text-gray-500 mt-1">📍 {pedido.destino.referencia}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes da corrida */}
        <div className="px-4 py-2">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Detalhes do Pedido</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-white">{pedido.distanciaKm} km</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Distância</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-white">{tempoRestante} min</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Chegada</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-red-400">R$ {pedido.valor.toFixed(2).replace('.', ',')}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Valor</p>
              </div>
            </div>

            {/* Tipo do pedido */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pedido.tipo === 'corrida' ? 'bg-blue-600/20 text-blue-400' : 'bg-orange-600/20 text-orange-400'}`}>
                {pedido.tipo === 'corrida' ? '🏍 Corrida' : '📦 Entrega'}
              </span>
              <span className="text-xs text-gray-500 capitalize">{pedido.pagamento === 'pix' ? '💳 Pix' : pedido.pagamento === 'cartao' ? '💳 Cartão' : '💵 Dinheiro'}</span>
              <span className="text-xs text-gray-500 ml-auto">#{pedido.id.toUpperCase()}</span>
            </div>

            {/* Descrição da entrega */}
            {pedido.descricao && (
              <div className="mt-3 p-3 bg-orange-600/10 border border-orange-600/20 rounded-xl">
                <p className="text-xs text-orange-300 font-semibold mb-1">📋 Detalhes da entrega</p>
                <p className="text-sm text-gray-300">{pedido.descricao}</p>
              </div>
            )}
          </div>
        </div>

        {/* Atualizações do trajeto */}
        <div className="px-4 py-2">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Atualizações</h4>
            <div className="space-y-3">
              {(trajeto?.atualizacoes ?? []).map((atualizacao, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <p className="text-sm text-gray-300">{atualizacao}</p>
                </div>
              ))}
              {i => [0, 1, 2].map(idx => (
                <div key={idx} className="flex items-start gap-3 opacity-0 animate-pulse" style={{ animationDelay: `${idx * 0.3}s` }}>
                  <div className="w-2 h-2 rounded-full bg-gray-600 mt-1.5 shrink-0" />
                  <div className="h-3 bg-gray-800 rounded w-48" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="px-4 pt-2 pb-4 space-y-3">
          <button className="w-full py-3.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-600/20 flex items-center justify-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 3h3l1.5 3.5L7 11l2.5-1.5L10 14h3v3h-3l-1-1.5-3 2.5-2.5-1-2-4.5-1 3.5H1V6l2.5-1.5L6 1.5 8 3z"/></svg>
            Contatar Motorista
          </button>
          <button
            onClick={() => {
              const idx = pedidos.findIndex(p => p.id === pedido.id)
              if (idx >= 0) pedidos[idx] = { ...pedidos[idx], status: 'cancelado' }
              irPara('SelecaoDePerfil')
            }}
            className="w-full py-3.5 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-gray-300 font-semibold rounded-xl transition-colors border border-gray-700"
          >
            Cancelar Corrida
          </button>
        </div>
      </div>
    </div>
  )
}