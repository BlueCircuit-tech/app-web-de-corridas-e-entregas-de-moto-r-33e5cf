import React from 'react';
import { corridas, motoristas, clientes } from '../dados';

// Ícone simples SVG moto
function MotoIcon({ className = '', cor = '#EE1D23' }: { className?: string; cor?: string }) {
  return (
    <svg width="42" height="36" viewBox="0 0 42 36" fill="none" className={className} aria-label="Moto" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="27" r="7" fill="#222" stroke={cor} strokeWidth="3"/>
      <circle cx="32" cy="27" r="7" fill="#222" stroke={cor} strokeWidth="3"/>
      <rect x="9" y="19" width="21" height="5" rx="2" fill={cor} />
      <rect x="20" y="10" width="7" height="11" rx="2.5" fill={cor} />
      <rect x="17" y="8" width="3" height="10" rx="1.5" fill="#222" />
      <rect x="24" y="2" width="3" height="7" rx="1.5" fill={cor} />
    </svg>
  );
}

// Ícone de localização origem/destino
function Pin({ color = '#EE1D23', className = '' }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={24} height={24} className={className} aria-label="Ponto">
      <path d="M12 2C7.62 2 4 5.38 4 9.5c0 5.08 7.02 11.91 7.32 12.19.38.35.98.35 1.36 0 .3-.28 7.32-7.11 7.32-12.19C20 5.38 16.38 2 12 2Z" fill={color} />
      <circle cx="12" cy="9.5" r="3" fill="#fff" />
    </svg>
  );
}

// Simula "mapa" estático de São Paulo (apenas layout visual estático para protótipo)
function MapaCorrida({ origem, destino, motoristaCoord, status }: {
  origem: { lat: number; lng: number },
  destino: { lat: number; lng: number },
  motoristaCoord: { lat: number; lng: number },
  status: string
}) {
  // Para o mapa fake, convertendo os dados para pontos aproximados em um SVG
  // Amplitude para caber tudo normalmente:
  // - lat: -23.60 a -23.50 (linha vertical), lng: -46.69 a -46.63 (linha horizontal)
  // Área São Paulo como 320px x 230px
  const toXY = (lat: number, lng: number) => {
    const minLat = -23.60, maxLat = -23.50;
    const minLng = -46.69, maxLng = -46.63;
    const x = ((lng - minLng) / (maxLng - minLng)) * 320;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 230;
    return { x, y };
  };
  const pOrigem = toXY(origem.lat, origem.lng);
  const pDestino = toXY(destino.lat, destino.lng);
  const pMoto = toXY(motoristaCoord.lat, motoristaCoord.lng);

  return (
    <div className="relative mx-auto mt-2 w-full max-w-[340px] aspect-[32/23] bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      {/* Área do "mapa" fake */}
      <svg width="320" height="230" viewBox="0 0 320 230" className="w-full h-full" style={{background:'linear-gradient(to right, #191919 60%, #232323)'}}>
        {/* Linhas */}
        {/* Origem -> Moto */}
        <line x1={pOrigem.x} y1={pOrigem.y} x2={pMoto.x} y2={pMoto.y} stroke="#EE1D23" strokeDasharray="4 4" strokeWidth="3" opacity={0.7}/>
        {/* Moto -> Destino */}
        <line x1={pMoto.x} y1={pMoto.y} x2={pDestino.x} y2={pDestino.y} stroke="#EE1D23" strokeWidth="3" />
        {/* Pontos */}
        {/* Origem */}
        <Pin color="#F59E42" className="origin-point"/>
        <circle cx={pOrigem.x} cy={pOrigem.y} r="14" fill="#262626" />
        <g transform={`translate(${pOrigem.x - 12},${pOrigem.y - 24})`}>
          <Pin color="#F59E42" />
        </g>
        {/* Destino */}
        <g transform={`translate(${pDestino.x - 12},${pDestino.y - 24})`}>
          <Pin color="#fff" />
        </g>
        {/* Moto (Motorista) */}
        <g transform={`translate(${pMoto.x - 21},${pMoto.y - 18})`}>
          <MotoIcon />
        </g>
      </svg>
      <span className="absolute left-3 top-2 text-xs font-bold text-[#F59E42] bg-black/60 px-2 py-0.5 rounded">Origem</span>
      <span className="absolute right-3 bottom-2 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded">Destino</span>
      {status === 'em_andamento' && (
        <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#EE1D23] text-white text-xs px-2 py-0.5 rounded-md shadow">Moto a caminho</span>
      )}
    </div>
  );
}

function infoEnderecoFormatado(e: any) {
  // Rua, número — bairro
  let s = `${e.rua}, ${e.numero} — ${e.bairro}`;
  if (e.referencia) s += ` (Ref.: ${e.referencia})`;
  return s;
}

// Status amigável pt-BR
const statusLabel: Record<string, string> = {
  'solicitada': 'Aguardando motorista...',
  'buscar_motorista': 'Buscando motorista...',
  'motorista_encontrado': 'Motorista encontrado',
  'a_caminho': 'Moto indo ao local',
  'aguardando_entrega': 'Aguardando entrega',
  'em_andamento': 'Em andamento',
  'concluida': 'Concluída',
  'cancelada': 'Cancelada',
};

// Formatação tempo estimado (min -> tipo '22 min' ou '< 1 min')
function formatTempoEstimado(min: number|undefined) {
  if (min == null) return '--';
  if (min < 1) return '< 1 min';
  return `${Math.round(min)} min`;
}

// Buscando dados reais de uma corrida EM ANDAMENTO para Mariana Costa Silva (cli-001)
const corridaEmAndamento = corridas.find(cor => cor.status === 'em_andamento' && cor.clienteId === 'cli-001');

// Casos de estado vazio
const motorista = corridaEmAndamento && corridaEmAndamento.motoristaId
  ? motoristas.find(m => m.id === corridaEmAndamento.motoristaId)
  : undefined;
const cliente = corridaEmAndamento ? clientes.find(c => c.id === corridaEmAndamento.clienteId) : undefined;

export default function AcompanhamentoDoTrajetoCliente() {
  if (!corridaEmAndamento || !motorista || !cliente) {
    // Corrida não encontrada ou sem motorista
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <MotoIcon cor="#EE1D23" className="mb-4" />
        <h2 className="text-lg font-bold text-[#EE1D23] mb-2">Nenhuma corrida em andamento</h2>
        <p className="text-base text-white/80 mb-6">Assim que você solicitar uma corrida, o acompanhamento aparecerá aqui.</p>
        <button className="px-6 py-2 rounded bg-[#EE1D23] text-white text-base font-bold">Solicitar Corrida</button>
      </main>
    );
  }

  // "Fingindo" localização fixa para o mapa (apenas layout; não é real)
  // Origem e Destino tem apenas endereço (sem lat/lng de verdade), então simulamos:
  function pickLatLng(endereco: any, fallback: { lat: number; lng: number }): { lat: number; lng: number } {
    // Alguns endereços de exemplo equivalem a pontos já usados
    // Usa lat/lng do motorista caso endereço não tenha
    if (endereco.rua === 'Av. Corifeu de Azevedo Marques') return { lat: -23.5649, lng: -46.7145 };
    if (endereco.rua === 'Rua Oscar Freire') return { lat: -23.5614, lng: -46.6679 };
    return fallback;
  }
  const origemLL = pickLatLng(corridaEmAndamento.origem, motorista.localizacaoAtual);
  const destinoLL = pickLatLng(corridaEmAndamento.destino, {
    lat: origemLL.lat + 0.013,
    lng: origemLL.lng + 0.02,
  });

  return (
    <main className="min-h-screen bg-black pb-6 font-sans flex flex-col items-center px-0">
      {/* Cabeçalho superior */}
      <header className="w-full flex items-center gap-2 px-4 pt-5 pb-2 bg-black border-b border-[#1b1b1c]">
        <MotoIcon cor="#EE1D23" className="w-8 h-7 mr-2" />
        <span className="text-2xl font-extrabold tracking-tight text-[#EE1D23]">Rota Express</span>
        <span className="ml-2 text-xs text-white/70 font-medium">Entregas rápidas e seguras</span>
      </header>

      {/* Status corrida */}
      <section className="w-full max-w-md flex flex-col items-center pt-5 pb-2">
        <span className="inline-block px-3 py-0.5 rounded-full bg-[#1b1b1c] border border-[#EE1D23] text-[#EE1D23] font-bold text-xs uppercase mb-2 tracking-wide">
          {corridaEmAndamento.tipo === 'entrega' ? 'Entrega' : 'Corrida'} em andamento
        </span>
        <span className="text-base text-white font-medium mb-1">{statusLabel[corridaEmAndamento.status]}</span>
        <span className="text-sm text-white/60">Tempo estimado: <b className="text-[#F59E42]">{formatTempoEstimado(corridaEmAndamento.tempoEstimadoMin)}</b></span>
      </section>

      {/* Mapa Rastreamento */}
      <section className="w-full flex flex-col items-center px-2 mt-4">
        <MapaCorrida
          origem={origemLL}
          destino={destinoLL}
          motoristaCoord={motorista.localizacaoAtual}
          status={corridaEmAndamento.status}
        />
      </section>

      {/* Detalhes motorista e rota */}
      <section className="w-full max-w-md px-2 mt-5">
        <div className="flex gap-2 p-3 rounded-lg bg-[#18181b] border border-[#302024] items-center">
          <img src={motorista.foto} alt={motorista.nome} className="w-14 h-14 rounded-full border-2 border-[#EE1D23] object-cover" />
          <div className="flex-1">
            <div className="text-white font-bold text-lg leading-tight flex items-center gap-1">
              {motorista.nome}
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-normal bg-black border border-[#EE1D23] text-[#EE1D23]">Motorista</span>
            </div>
            <div className="text-white/80 text-sm flex items-center gap-2">
              <span>Moto: {motorista.moto.modelo} ({motorista.moto.placa})</span>
            </div>
            <div className="text-white/60 text-xs flex items-center gap-3 mt-1">
              <span>Cor: <span style={{color: motorista.moto.cor.toLowerCase() === 'vermelha' ? '#EE1D23' : '#fff'}}>{motorista.moto.cor}</span></span>
              <span>Ano: {motorista.moto.ano}</span>
              <span className="flex gap-1 items-center">★ {motorista.avaliacaoMedia.toFixed(1)} ({motorista.totalCorridas} corridas)</span>
            </div>
          </div>
          <a href={`tel:${motorista.telefone.replace(/\D/g,"")}`} className="ml-2 px-3 py-1 bg-[#EE1D23] rounded text-white font-semibold text-xs hover:bg-[#ca191e] transition">Ligar</a>
        </div>
        {/* Rota */}
        <div className="mt-4 bg-[#18181b] border border-[#302024] rounded-lg p-3 text-white gap-3 flex flex-col">
          <div className="flex items-start gap-2">
            <Pin color="#F59E42" className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <span className="font-bold">Origem:</span> <span className="text-white/80">{infoEnderecoFormatado(corridaEmAndamento.origem)}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Pin color="#fff" className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <span className="font-bold">Destino:</span> <span className="text-white/80">{infoEnderecoFormatado(corridaEmAndamento.destino)}</span>
            </div>
          </div>
          <div className="flex gap-10 mt-2 text-sm">
            <div>
              <span className="font-semibold text-[#EE1D23]">{corridaEmAndamento.distanciaKm.toFixed(1)} km</span> <span className="text-white/70">de percurso</span>
            </div>
            <div>
              <span className="font-semibold text-[#F59E42]">
                R$ {corridaEmAndamento.valorEstimado.toFixed(2).replace('.', ',')}
              </span> <span className="text-white/70">estimado</span>
            </div>
          </div>
        </div>
      </section>
      {/* Dica / info */}
      <div className="w-full max-w-md text-center text-xs text-white/60 mt-8 px-2">
        Fique atento! Você pode acompanhar o trajeto da sua moto aqui em tempo real.<br/>
        Para sua segurança, todos os motoristas são verificados pela Rota Express.
      </div>
    </main>
  );
}
