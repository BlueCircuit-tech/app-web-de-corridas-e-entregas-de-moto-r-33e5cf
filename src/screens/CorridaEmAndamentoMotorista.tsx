export default function CorridaEmAndamentoMotorista({ irPara }: { irPara: (tela: string) => void }) {
  const { pedidos, motoristas, trajetosAtivos } = require('../dados')

  const pedido = pedidos.find((p: any) => p.status === 'em_andamento')
  const motorista = motoristas.find((m: any) => m.id === pedido?.motoristaId)
  const trajeto = pedido ? trajetosAtivos[pedido.id] : null

  const [statusCorrida, setStatusCorrida] = React.useState<'indo_buscar' | 'chegou_origem' | 'em_rota' | 'chegou_destino'>('indo_buscar')
  const [painelInfo, setPainelInfo] = React.useState<'cliente' | 'entrega' | 'rota'>('rota')

  if (!pedido || !motorista) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-neutral-400 text-lg">Nenhuma corrida em andamento no momento.</p>
          <button
            onClick={() => irPara('NovosPedidosMotorista')}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-base transition-colors"
          >
            Ver Novos Pedidos
          </button>
        </div>
      </div>
    )
  }

  const tipoLabel = pedido.tipo === 'corrida' ? 'Corrida' : 'Entrega'
  const pagamentoLabel = pedido.pagamento === 'pix' ? 'PIX' : pedido.pagamento === 'cartao' ? 'Cartão' : 'Dinheiro'
  const horaPedido = new Date(pedido.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const handleCheguei = () => {
    setStatusCorrida('chegou_origem')
  }
  const handleIniciar = () => {
    setStatusCorrida('em_rota')
  }
  const handleFinalizar = () => {
    setStatusCorrida('chegou_destino')
  }

  const progressoMapa = statusCorrida === 'indo_buscar' ? 0 : statusCorrida === 'chegou_origem' ? 25 : statusCorrida === 'em_rota' ? 65 : 100

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col max-w-md mx-auto">
      {}
      <header className="bg-black px-4 py-3 flex items-center justify-between flex-shrink-0">
        <button
          onClick={() => irPara('NovosPedidosMotorista')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-red-600" viewBox="0 0 48 48" fill="currentColor">
            <circle cx="24" cy="24" r="22" fill="currentColor" />
            <path d="M24 8c-2 4-6 8-10 12 4 2 8 4 10 8 2-4 6-6 10-8-4-4-8-8-10-12z" fill="white" />
            <circle cx="24" cy="30" r="3" fill="currentColor" />
          </svg>
          <span className="text-white font-bold text-lg tracking-tight">Rota Express</span>
        </div>
        <div className="w-10" />
      </header>

      {}
      <div className="bg-red-600 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span className="text-white font-bold text-sm uppercase tracking-wider">
            {statusCorrida === 'indo_buscar' && 'A caminho do passageiro'}
            {statusCorrida === 'chegou_origem' && 'Aguardando no local'}
            {statusCorrida === 'em_rota' && 'Em rota para o destino'}
            {statusCorrida === 'chegou_destino' && 'Chegou ao destino'}
          </span>
        </div>
        <span className="text-white/80 text-xs font-semibold">#{pedido.id}</span>
      </div>

      {}
      <div className="relative bg-neutral-800 h-52 flex-shrink-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          {}
          <rect width="400" height="200" fill="#1c1917" />

          {}
          <g opacity="0.15">
            <line x1="0" y1="40" x2="400" y2="40" stroke="#57534e" strokeWidth="2" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="#57534e" strokeWidth="2" />
            <line x1="0" y1="120" x2="400" y2="120" stroke="#57534e" strokeWidth="2" />
            <line x1="0" y1="160" x2="400" y2="160" stroke="#57534e" strokeWidth="2" />
            <line x1="60" y1="0" x2="60" y2="200" stroke="#57534e" strokeWidth="2" />
            <line x1="140" y1="0" x2="140" y2="200" stroke="#57534e" strokeWidth="2" />
            <line x1="220" y1="0" x2="220" y2="200" stroke="#57534e" strokeWidth="2" />
            <line x1="300" y1="0" x2="300" y2="200" stroke="#57534e" strokeWidth="2" />
          </g>

          {}
          <text x="155" y="32" fill="#57534e" fontSize="7" fontFamily="Arial, sans-serif">Av. Paulista</text>
          <text x="115" y="112" fill="#57534e" fontSize="7" fontFamily="Arial, sans-serif">Rua Vergueiro</text>
          <text x="245" y="152" fill="#57534e" fontSize="7" fontFamily="Arial, sans-serif">Av. Ibirapuera</text>
          <text x="25" y="62" fill="#57534e" fontSize="6" fontFamily="Arial, sans-serif">Rua Domingos de Morais</text>

          {}
          <rect x="100" y="80" width="16" height="6" rx="1" fill="#292524" />
          <rect x="240" y="45" width="14" height="5" rx="1" fill="#292524" />
          <rect x="330" y="90" width="18" height="6" rx="1" fill="#292524" />
          <rect x="60" y="130" width="14" height="5" rx="1" fill="#292524" />

          {}
          {statusCorrida === 'indo_buscar' || statusCorrida === 'chegou_origem' ? (
            <g>
              {}
              <path d="M 50 170 Q 120 140 180 110" fill="none" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 4" />
              {}
              <polygon points="48,172 44,165 54,165" fill="#dc2626" />
              {}
              <circle cx="180" cy="110" r="10" fill="#16a34a" stroke="white" strokeWidth="2" />
              <text x="176" y="114" fill="white" fontSize="10" fontWeight="bold">O</text>
            </g>
          ) : statusCorrida === 'em_rota' ? (
            <g>
              {}
              <path d="M 50 170 Q 120 140 180 110 Q 240 80 300 50" fill="none" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 4" />
              {}
              <polygon points="190,106 184,99 194,99" fill="#dc2626" />
              {}
              <circle cx="180" cy="110" r="8" fill="#16a34a" stroke="white" strokeWidth="2" />
              <text x="177" y="113" fill="white" fontSize="9" fontWeight="bold">O</text>
              {}
              <circle cx="300" cy="50" r="10" fill="#dc2626" stroke="white" strokeWidth="2" />
              <text x="296" y="54" fill="white" fontSize="10" fontWeight="bold">D</text>
            </g>
          ) : (
            <g>
              {}
              <path d="M 50 170 Q 120 140 180 110 Q 240 80 300 50" fill="none" stroke="#16a34a" strokeWidth="4" />
              {}
              <circle cx="300" cy="50" r="12" fill="#16a34a" stroke="white" strokeWidth="2.5" />
              <text x="294" y="55" fill="white" fontSize="12" fontWeight="bold">✓</text>
              {}
              <circle cx="180" cy="110" r="8" fill="#16a34a" stroke="white" strokeWidth="2" opacity="0.6" />
              <text x="177" y="113" fill="white" fontSize="9" fontWeight="bold" opacity="0.6">O</text>
            </g>
          )}

          {}
          <circle cx="50" cy="170" r="8" fill="#dc2626" stroke="white" strokeWidth="2" />
          <text x="45" y="174" fill="white" fontSize="10" fontWeight="bold">M</text>

          {}
          <rect x="30" y="172" width="50" height="22" rx="4" fill="#0c0a09" opacity="0.85" />
          <text x="35" y="183" fill="#fca5a5" fontSize="6" fontFamily="Arial, sans-serif">Você</text>
          <text x="35" y="191" fill="#a8a29e" fontSize="5" fontFamily="Arial, sans-serif">Av. Paulista</text>
        </svg>

        {}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="text-white text-xs font-semibold">Progresso: {progressoMapa}%</span>
        </div>

        {}
        {statusCorrida === 'indo_buscar' && (
          <div className="absolute bottom-3 left-3 right-3 bg-green-600/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243A8 8 0 1117.657 16.657z" />
              <circle cx="12" cy="11" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-white text-xs font-semibold">Siga até o endereço de origem para buscar o passageiro</span>
          </div>
        )}

        {statusCorrida === 'em_rota' && (
          <div className="absolute bottom-3 left-3 right-3 bg-red-600/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-white text-xs font-semibold">Siga até o endereço de destino com o passageiro</span>
          </div>
        )}
      </div>

      {}
      <div className="bg-neutral-800 px-4 py-3 flex-shrink-0">
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => setPainelInfo('rota')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              painelInfo === 'rota' ? 'bg-red-600 text-white' : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600'
            }`}
          >
            Rota
          </button>
          <button
            onClick={() => setPainelInfo(pedido.tipo === 'corrida' ? 'cliente' : 'entrega')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              painelInfo !== 'rota' ? 'bg-red-600 text-white' : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600'
            }`}
          >
            {pedido.tipo === 'corrida' ? 'Passageiro' : 'Entrega'}
          </button>
          <button
            onClick={() => setPainelInfo('cliente')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              painelInfo === 'cliente' && pedido.tipo === 'corrida' ? 'bg-red-600 text-white' : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600'
            }`}
          >
            Dados
          </button>
        </div>
      </div>

      {}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {painelInfo === 'rota' && (
          <>
            {}
            <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-green-300 flex-shrink-0" />
                  <div className="w-0.5 h-10 bg-neutral-600 my-0.5" />
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-red-300 flex-shrink-0" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Origem</p>
                    <p className="text-white text-sm font-semibold leading-tight">{pedido.origem.rua}, {pedido.origem.numero}</p>
                    <p className="text-neutral-400 text-xs">{pedido.origem.bairro} — {pedido.origem.cidade}</p>
                    {pedido.origem.referencia && (
                      <p className="text-neutral-500 text-xs mt-0.5">Ref: {pedido.origem.referencia}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Destino</p>
                    <p className="text-white text-sm font-semibold leading-tight">{pedido.destino.rua}, {pedido.destino.numero}</p>
                    <p className="text-neutral-400 text-xs">{pedido.destino.bairro} — {pedido.destino.cidade}</p>
                    {pedido.destino.referencia && (
                      <p className="text-neutral-500 text-xs mt-0.5">Ref: {pedido.destino.referencia}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
              <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold mb-3">Informações da Corrida</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-white text-lg font-bold">{pedido.distanciaKm} km</p>
                  <p className="text-neutral-500 text-[10px] uppercase">Distância</p>
                </div>
                <div className="text-center border-x border-neutral-700">
                  <p className="text-white text-lg font-bold">{pedido.tempoEstimadoMin} min</p>
                  <p className="text-neutral-500 text-[10px] uppercase">Tempo estimado</p>
                </div>
                <div className="text-center">
                  <p className="text-green-400 text-lg font-bold">R$ {pedido.valor.toFixed(2).replace('.', ',')}</p>
                  <p className="text-neutral-500 text-[10px] uppercase">Valor</p>
                </div>
              </div>
            </div>
          </>
        )}

        {painelInfo === 'cliente' && (
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
            <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold mb-3">Dados do Passageiro</p>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`https://i.pravatar.cc/150?img=${pedido.clienteId === 'cli-001' ? 44 : pedido.clienteId === 'cli-002' ? 33 : pedido.clienteId === 'cli-003' ? 47 : 38}`}
                alt={pedido.clienteNome}
                className="w-14 h-14 rounded-full object-cover border-2 border-red-600"
              />
              <div>
                <p className="text-white text-base font-bold">{pedido.clienteNome}</p>
                <p className="text-neutral-400 text-xs">{pedido.clienteId === 'cli-001' ? '(11) 99876-5432' : pedido.clienteId === 'cli-002' ? '(11) 98765-1234' : pedido.clienteId === 'cli-003' ? '(11) 97654-2345' : '(11) 96543-3456'}</p>
              </div>
            </div>

            {pedido.tipo === 'corrida' ? (
              <>
                <div className="space-y-2">
                  <div className="bg-neutral-700/50 rounded-lg px-3 py-2">
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Tipo de corrida</p>
                    <p className="text-white text-sm font-semibold capitalize">{tipoLabel}</p>
                  </div>
                  <div className="bg-neutral-700/50 rounded-lg px-3 py-2">
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Pagamento</p>
                    <p className="text-white text-sm font-semibold">{pagamentoLabel}</p>
                  </div>
                  <div className="bg-neutral-700/50 rounded-lg px-3 py-2">
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Solicitado às</p>
                    <p className="text-white text-sm font-semibold">{horaPedido}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="bg-neutral-700/50 rounded-lg px-3 py-2">
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Tipo</p>
                    <p className="text-white text-sm font-semibold">Entrega</p>
                  </div>
                  <div className="bg-neutral-700/50 rounded-lg px-3 py-2">
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Descrição do item</p>
                    <p className="text-white text-sm font-semibold">{pedido.descricao || 'Sem descrição'}</p>
                  </div>
                  <div className="bg-neutral-700/50 rounded-lg px-3 py-2">
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Pagamento</p>
                    <p className="text-white text-sm font-semibold">{pagamentoLabel}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {}
        {trajeto && trajeto.atualizacoes.length > 0 && (
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
            <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold mb-3">Atualizações</p>
            <div className="space-y-2.5">
              {trajeto.atualizacoes.map((atualizacao: string, i: number) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <p className="text-neutral-300 text-xs">{atualizacao}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {}
      <div className="bg-black px-4 py-4 flex-shrink-0 border-t border-neutral-800 space-y-3">
        {}
        <div className="flex items-center justify-between bg-neutral-800 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={motorista.foto}
              alt={motorista.nome}
              className="w-11 h-11 rounded-full object-cover border-2 border-red-600"
            />
            <div>
              <p className="text-white text-sm font-bold">{motorista.nome}</p>
              <p className="text-neutral-400 text-xs">{motorista.modeloMoto} · {motorista.placaMoto}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-yellow-400 text-sm font-bold">{motorista.avaliacao}</span>
            <span className="text-neutral-500 text-xs ml-0.5">({motorista.corridasRealizadas})</span>
          </div>
        </div>

        {}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-neutral-800 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-white text-xs font-medium truncate">
              {statusCorrida === 'indo_buscar' ? 'Ligar para passageiro' : 'Ligar para cliente'}
            </span>
          </div>
          <div className="flex-1 bg-neutral-800 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-4.272C3.512 14.183 3 12.9 3 11.5 3 5.701 7.03 2 12 2s9 3.701 9 9.5z" />
            </svg>
            <span className="text-white text-xs font-medium truncate">Mensagem</span>
          </div>
        </div>

        {}
        <div className="space-y-2">
          {statusCorrida === 'indo_buscar' && (
            <button
              onClick={handleCheguei}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243A8 8 0 1117.657 16.657z" />
                <circle cx="12" cy="11" r="1.5" fill="currentColor" />
              </svg>
              Cheguei na Origem
            </button>
          )}

          {statusCorrida === 'chegou_origem' && (
            <button
              onClick={handleIniciar}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Iniciar Corrida
            </button>
          )}

          {statusCorrida === 'em_rota' && (
            <button
              onClick={handleFinalizar}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Finalizar Corrida
            </button>
          )}

          {statusCorrida === 'chegou_destino' && (
            <div className="space-y-2">
              <div className="bg-green-600/20 border border-green-500 rounded-xl px-4 py-4 text-center">
                <svg className="w-12 h-12 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-400 font-bold text-base">Corrida Finalizada!</p>
                <p className="text-green-400/70 text-xs mt-1">Valor recebido: R$ {pedido.valor.toFixed(2).replace('.', ',')}</p>
              </div>
              <button
                onClick={() => irPara('NovosPedidosMotorista')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-colors"
              >
                Ver Novos Pedidos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}