import React, { useState } from 'react';
import { corridas, motoristas, clientes } from '../dados';

function formatarEndereco(endereco: any) {
  return (
    <span>
      {endereco.rua}, {endereco.numero}<br />
      {endereco.bairro}, {endereco.cidade}<br />
      CEP: {endereco.cep}
      {endereco.referencia ? <><br /><span className="text-xs text-neutral-400">Referência: {endereco.referencia}</span></> : null}
    </span>
  );
}

function formatStatus(status: string) {
  switch (status) {
    case 'a_caminho': return 'A caminho do cliente';
    case 'aguardando_entrega': return 'Aguardando entrega';
    case 'em_andamento': return 'Corrida em andamento';
    default: return status;
  }
}

function formatarPagamento(forma: string) {
  if (forma === 'pix') return 'Pix';
  if (forma === 'dinheiro') return 'Dinheiro';
  if (forma === 'cartao') return 'Cartão';
  return forma;
}

function formatarValor(v: number | undefined) {
  return v ? `R$ ${v.toFixed(2).replace('.', ',')}` : '-';
}

const MAP_IMG_URL = 'https://maps.googleapis.com/maps/api/staticmap?size=600x270&scale=2&maptype=roadmap&markers=color:red%7Clabel:A%7C-23.5613,-46.6560&markers=color:green%7Clabel:B%7C-23.5669,-46.6782&key=SEM_API_KEY_REAL';

export default function CorridaEmAndamentoMotorista() {
  // Busca uma corrida em que o motorista esteja em andamento
  const motorista = motoristas.find(m => m.id === 'mot-001'); // Simulando Ricardo Almeida Souza
  const corrida = corridas.find(c => c.motoristaId === motorista?.id && (c.status === 'em_andamento' || c.status === 'a_caminho' || c.status === 'aguardando_entrega'));
  const cliente = clientes.find(cl => cl.id === corrida?.clienteId);

  // Simulação do status interativo
  // 'a_caminho' -> 'aguardando_entrega'/'em_andamento' -> 'concluida'
  const [status, setStatus] = useState(corrida?.status || '');

  const proximoStatus = () => {
    if (status === 'a_caminho') setStatus(corrida?.tipo === 'entrega' ? 'aguardando_entrega' : 'em_andamento');
    else if (status === 'aguardando_entrega' || status === 'em_andamento') setStatus('concluida');
  };

  const botaoPrincipal = () => {
    if (status === 'a_caminho') return { label: 'Cheguei', action: proximoStatus, cor: 'bg-red-600' };
    if (status === 'aguardando_entrega') return { label: 'Iniciar entrega', action: proximoStatus, cor: 'bg-red-600' };
    if (status === 'em_andamento') return { label: 'Finalizar corrida', action: proximoStatus, cor: 'bg-black' };
    return null;
  };

  if (!motorista || !corrida || !cliente) {
    return (
      <div className="min-h-screen bg-neutral-900 p-4 flex flex-col items-center justify-center">
        <img src="/logo-rota-express.svg" alt="Rota Express" className="w-28 mb-3 opacity-80" />
        <h2 className="text-xl text-white font-bold mb-2">Corrida em andamento</h2>
        <p className="text-neutral-400 mb-4">Nenhuma corrida em progresso.</p>
      </div>
    );
  }

  // Montagem manual do mapa/fake: marca origem e destino
  const origem = corrida.origem;
  const destino = corrida.destino;

  // Ícones (SVG inline)
  const IconMoto = (
    <svg viewBox="0 0 32 32" width={24} height={24} fill="none"><circle cx="8" cy="25" r="4" fill="#d90429" /><circle cx="24" cy="25" r="4" fill="#d90429"/><rect x="12" y="14" width="10" height="4" fill="#222"/><path d="M12 18l-2 3" stroke="#d90429" strokeWidth="2"/><path d="M22 14l3-6" stroke="#222" strokeWidth="2"/><rect x="17" y="10" width="4" height="5" fill="#d90429"/></svg>
  );

  return (
    <div className="min-h-screen bg-neutral-900 pb-4 flex flex-col">
      {/* Cabeçalho */}
      <header className="flex items-center px-4 py-3 border-b border-neutral-800 bg-black">
        <img src="/logo-rota-express.svg" alt="Rota Express" className="w-9 h-9 mr-3" />
        <div>
          <h1 className="text-lg text-white font-bold leading-tight">Corrida em andamento</h1>
          <span className="text-xs text-red-600 font-semibold">Entregas rápidas e seguras</span>
        </div>
        <span className="ml-auto px-3 py-1 rounded text-xs bg-neutral-800 text-white font-semibold uppercase">Motorista</span>
      </header>

      <div className="flex-1 flex flex-col gap-4 p-4 max-w-lg w-full mx-auto ">
        {/* Mapa fake */}
        <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-800">
          <div className="relative h-[180px] flex items-center bg-neutral-800 justify-center">
            {/* Marca de Origem (verde) e Destino (vermelha) e linha fake */}
            <svg viewBox="0 0 320 180" width="100%" height="100%" className="absolute top-0 left-0 w-full h-full">
              <line x1="60" y1="60" x2="260" y2="120" stroke="#d90429" strokeDasharray="6 6" strokeWidth="3" />
              <circle cx="60" cy="60" r="13" fill="#22c55e" stroke="white" strokeWidth="3" />
              <circle cx="260" cy="120" r="13" fill="#d90429" stroke="white" strokeWidth="3" />
              {/* Moto no percurso (ponto móvel fake) */}
              <circle cx={status === 'a_caminho' ? 110 : 182} cy={status === 'a_caminho' ? 72 : 96} r="10" fill="#d90429" stroke="#fff" strokeWidth="2" />
            </svg>
            <span className="absolute left-10 top-7 text-xs bg-black bg-opacity-70 px-2 rounded text-white">Origem</span>
            <span className="absolute right-10 bottom-7 text-xs bg-black bg-opacity-70 px-2 rounded text-white">Destino</span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{IconMoto}</span>
          </div>
        </div>

        {/* Status e cliente */}
        <div className="flex gap-3 items-center">
          <img src={cliente.foto} alt={cliente.nome} className="w-12 h-12 rounded-full border-2 border-red-600 shadow" />
          <div className="flex-1 min-w-0">
            <div className="flex gap-1 items-center">
              <span className="text-white font-semibold text-base truncate">{cliente.nome}</span>
              <span className="bg-red-900 text-red-200 text-xs font-semibold px-2 py-0.5 ml-2 rounded">{corrida.tipo === 'corrida' ? 'Passageiro' : 'Entrega'}</span>
            </div>
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              ★ <span>{cliente.avaliacaoMedia.toFixed(1)}</span> &bull; <span>{cliente.totalCorridas} corridas</span>
            </span>
            <span className="text-xs text-red-500 font-bold uppercase block mt-1">{formatStatus(status)}</span>
          </div>
        </div>
        {/* Endereços */}
        <div className="bg-neutral-800 rounded-xl p-3 flex flex-col gap-2 text-white">
          <div>
            <span className="text-xs text-neutral-400">Origem</span><br />
            <span className="font-semibold">{formatarEndereco(origem)}</span>
          </div>
          <div>
            <span className="text-xs text-neutral-400">Destino</span><br />
            <span className="font-semibold">{formatarEndereco(destino)}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-neutral-800 rounded-xl p-2">
            <div className="text-xs text-neutral-400">Distância</div>
            <div className="text-white font-bold text-base">{corrida.distanciaKm} km</div>
          </div>
          <div className="bg-neutral-800 rounded-xl p-2">
            <div className="text-xs text-neutral-400">Tempo Est.</div>
            <div className="text-white font-bold text-base">{corrida.tempoEstimadoMin} min</div>
          </div>
          <div className="bg-neutral-800 rounded-xl p-2">
            <div className="text-xs text-neutral-400">Pagamento</div>
            <div className="text-white font-bold text-base">{formatarPagamento(corrida.formaPagamento)}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-neutral-400 text-xs">Valor estimado</div>
          <div className="text-xl text-white font-bold">{formatarValor(corrida.valorEstimado)}</div>
        </div>
        {corrida.observacoes && (
          <div className="bg-neutral-800 rounded-xl p-2 text-neutral-100 text-sm">
            <span className="text-xs text-neutral-400">Observações:</span> {corrida.observacoes}
          </div>
        )}
        {/* Botões de ação */}
        <div className="flex gap-3 mt-2">
          {botaoPrincipal() && status !== 'concluida' && (
            <button type="button" onClick={botaoPrincipal()?.action} className={`w-full h-12 rounded-lg font-semibold text-lg ${botaoPrincipal()?.cor} text-white transition hover:opacity-90 duration-200`}>
              {botaoPrincipal()?.label}
            </button>
          )}
          {status === 'concluida' && (
            <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold w-full text-center">Corrida finalizada</span>
          )}
        </div>
      </div>
    </div>
  );
}
