import React, { useState } from 'react';
import { enderecos, clientes } from '../dados';

// Mapeamento para simular o mapa e localização, usando coordenadas dos motoristas/endereços
const enderecoOptions = Object.entries(enderecos).map(([key, endereco]) => ({
  key,
  label: `${endereco.rua}, ${endereco.numero} — ${endereco.bairro}`,
  endereco,
}));

const clienteAtual = clientes[0]; // Mariana Costa Silva — simulação usuário logado

function calcularDistanciaKm(origem: any, destino: any) {
  // Aproximação fictícia baseada nos endereços do exemplo
  // No real, seria API de mapas; aqui, regra fixa para protótipo
  if (origem === destino) return 1;
  return Math.abs(enderecoOptions.findIndex(e => e.endereco === origem) - enderecoOptions.findIndex(e => e.endereco === destino)) * 3 + 3;
}

function calcularValor(distanciaKm: number, tipo: 'corrida' | 'entrega') {
  // Corrida: R$3/km, Entrega: R$3,80/km + R$6 taxa
  if (tipo === 'corrida') return +(distanciaKm * 3).toFixed(2);
  return +(distanciaKm * 3.8 + 6).toFixed(2);
}

function calcularTempo(distanciaKm: number) {
  // 3min inicial + 2min/km
  return Math.round(3 + distanciaKm * 2);
}

export default function SolicitarCorridaEntregaCliente() {
  const [tipoServico, setTipoServico] = useState<'corrida' | 'entrega'>('corrida');
  const [origemKey, setOrigemKey] = useState(clienteAtual.enderecoFavorito ? enderecoOptions.find(e => e.endereco === clienteAtual.enderecoFavorito)?.key : enderecoOptions[0].key);
  const [destinoKey, setDestinoKey] = useState('centro2');
  const [itensEntrega, setItensEntrega] = useState([{ descricao: '', quantidade: 1, fragil: false }]);
  const [observacoes, setObservacoes] = useState('');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const origemEndereco = enderecos[origemKey];
  const destinoEndereco = enderecos[destinoKey];
  const distanciaKm = calcularDistanciaKm(origemEndereco, destinoEndereco);
  const valorEstimado = calcularValor(distanciaKm, tipoServico);
  const tempoEstimadoMin = calcularTempo(distanciaKm);

  // Para entrega: só exibe campos se está selecionado
  function handleItemDescChange(idx: number, value: string) {
    const novo = [...itensEntrega];
    novo[idx].descricao = value;
    setItensEntrega(novo);
  }
  function handleItemQtdChange(idx: number, value: number) {
    const novo = [...itensEntrega];
    novo[idx].quantidade = value;
    setItensEntrega(novo);
  }
  function handleFragilChange(idx: number, value: boolean) {
    const novo = [...itensEntrega];
    novo[idx].fragil = value;
    setItensEntrega(novo);
  }
  function addNovoItem() {
    setItensEntrega([...itensEntrega, { descricao: '', quantidade: 1, fragil: false }]);
  }
  function removeItem(idx: number) {
    setItensEntrega(itensEntrega.filter((_, i) => i !== idx));
  }

  function confirmarPedido(e: React.FormEvent) {
    e.preventDefault();
    setPedidoConfirmado(true);
    setTimeout(() => setPedidoConfirmado(false), 3800); // feedback temporário
  }

  // Estilo Rota Express: fundo escuro (preto), contrastes vermelhos/motocicleta, sem dashboard genérico
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-8">
      {/* Cabeçalho */}
      <header className="w-full max-w-md px-6 pt-8 flex flex-col items-center">
        <img src="/logo-rota-express.png" alt="Rota Express" className="h-14 mb-2" style={{filter: 'drop-shadow(0 0 3px #E21C21)'}} />
        <div className="font-bold text-2xl tracking-wide">Solicitar Corrida ou Entrega</div>
        <div className="text-xs text-gray-300 mt-1">Entregas rápidas e seguras</div>
      </header>

      <form className="w-full max-w-md bg-neutral-900 rounded-xl shadow-md mt-6 p-4 flex flex-col gap-5" onSubmit={confirmarPedido}>
        {/* Mapa simbólico */}
        <div className="relative h-40 w-full rounded-md overflow-hidden bg-gray-800 border border-red-700">
          <div className="absolute inset-0 flex justify-center items-center">
            <svg width="85%" viewBox="0 0 480 180" fill="none">
              {/* Simulação de "mapa" com rotas entre pontos */}
              <rect x="20" y="10" width="440" height="160" rx="10" fill="#232325" stroke="#E21C21" strokeWidth="2" />
              {/* Pontos: origem/destino */}
              <circle cx="65" cy="90" r="13" fill="#E21C21" stroke="#fff" strokeWidth="2" />
              <circle cx="400" cy="90" r="13" fill="#fff" stroke="#E21C21" strokeWidth="2" />
              {/* Linha entre os pontos */}
              <path d="M78 90 Q240 10, 387 90" stroke="#E21C21" strokeWidth="4" fill="none" />
              <text x="65" y="82" fontSize="13" fill="#fff" fontFamily="Arial" textAnchor="middle">Origem</text>
              <text x="400" y="82" fontSize="13" fill="#E21C21" fontFamily="Arial" textAnchor="middle">Destino</text>
              {/* Moto símbolo */}
              <g>
                <rect x="245" y="68" width="32" height="17" rx="4" fill="#E21C21" stroke="#fff" strokeWidth="1.5" />
                <circle cx="247" cy="85" r="9" fill="#282929" stroke="#E21C21" strokeWidth="3" />
                <circle cx="273" cy="85" r="9" fill="#282929" stroke="#E21C21" strokeWidth="3" />
                <rect x="257" y="62" width="17" height="6" rx="2" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>

        {/* Seletor: Corrida / Entrega */}
        <div className="flex justify-between items-center">
          <label className="font-medium text-sm">Tipo de Serviço:</label>
          <div className="flex gap-3">
            <button type="button" onClick={() => setTipoServico('corrida')} className={`${tipoServico === 'corrida' ? 'bg-red-700 text-white' : 'bg-neutral-700 text-gray-300'} rounded-full px-4 py-1 font-semibold text-sm transition-all`}>Corrida</button>
            <button type="button" onClick={() => setTipoServico('entrega')} className={`${tipoServico === 'entrega' ? 'bg-red-700 text-white' : 'bg-neutral-700 text-gray-300'} rounded-full px-4 py-1 font-semibold text-sm transition-all`}>Entrega</button>
          </div>
        </div>

        {/* Origem e Destino */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold mb-0">Origem:</label>
          <select value={origemKey} onChange={e => setOrigemKey(e.target.value)} className="bg-neutral-700 text-white px-4 py-2 rounded-md text-sm outline-none">
            {enderecoOptions.map(opt => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold mb-0">Destino:</label>
          <select value={destinoKey} onChange={e => setDestinoKey(e.target.value)} className="bg-neutral-700 text-white px-4 py-2 rounded-md text-sm outline-none">
            {enderecoOptions.map(opt => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Campos de entrega (se entrega) */}
        {tipoServico === 'entrega' && (
          <div className="bg-neutral-800 rounded-lg p-3 border border-red-700 mt-2">
            <div className="text-sm font-semibold mb-2">Itens da Entrega:</div>
            {itensEntrega.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-1 mb-2">
                <input
                  type="text"
                  value={item.descricao}
                  onChange={e => handleItemDescChange(idx, e.target.value)}
                  placeholder={`Descrição do item #${idx+1}`}
                  className="bg-neutral-700 text-white px-3 py-1.5 rounded-md text-sm w-full mr-2"
                  required
                />
                <input
                  type="number"
                  min={1}
                  value={item.quantidade}
                  onChange={e => handleItemQtdChange(idx, Math.max(1, Number(e.target.value)))}
                  className="bg-neutral-700 text-white px-2 py-1 rounded-md text-sm w-16"
                  style={{marginLeft: 4}}
                  required
                  title="Quantidade"
                />
                <label className="flex items-center text-xs ml-3">
                  <input
                    type="checkbox"
                    checked={item.fragil}
                    onChange={e => handleFragilChange(idx, e.target.checked)}
                    className="accent-red-700 mr-1"
                  />
                  Frágil
                </label>
                <button type="button" onClick={() => removeItem(idx)} className="ml-2 text-xs text-red-400 font-medium hover:underline" disabled={itensEntrega.length === 1}>Remover</button>
              </div>
            ))}
            <button type="button" onClick={addNovoItem} className="mt-1 px-3 py-1 bg-neutral-700 text-white rounded-full text-xs hover:bg-red-700 transition-all">+ Adicionar outro item</button>
            <label className="block text-xs mt-3 font-medium">Observações:</label>
            <textarea
              rows={2}
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              placeholder="Instruções especiais (opcional)"
              className="bg-neutral-700 text-white w-full px-3 py-2 rounded-md text-xs mt-1"
            />
          </div>
        )}

        {/* Estimativa */}
        <div className="bg-black border border-red-700 rounded-lg p-3 flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-300">Valor estimado</div>
            <div className="font-bold text-xl text-red-600">R$ {valorEstimado.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-300 text-right">Tempo estimado</div>
            <div className="font-semibold text-lg">{tempoEstimadoMin} min</div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-3 rounded-lg text-lg font-bold tracking-wide bg-red-700 hover:bg-red-600 focus:bg-red-800 text-white shadow-lg transition-all disabled:bg-neutral-700 disabled:opacity-80"
          disabled={origemKey === destinoKey || pedidoConfirmado}
        >
          {pedidoConfirmado ? 'Aguarde...' : `Confirmar Pedido de ${tipoServico === 'corrida' ? 'Corrida' : 'Entrega'}`}
        </button>
        {origemKey === destinoKey && (
          <div className="text-xs text-red-500 font-medium">Origem e destino devem ser diferentes.</div>
        )}
        {pedidoConfirmado && (
          <div className="text-sm text-green-400 mt-1 text-center font-semibold animate-pulse">Pedido enviado! Um motorista será localizado.</div>
        )}
      </form>

      {/* Simulação do rodapé/perfil */}
      <footer className="w-full max-w-md mt-5 px-6 flex items-center gap-3">
        <img src={clienteAtual.foto} alt={clienteAtual.nome} className="h-11 w-11 rounded-full border-2 border-red-700" />
        <div className="flex-1">
          <div className="font-bold text-sm">{clienteAtual.nome}</div>
          <div className="text-xs text-gray-400">✆ {clienteAtual.telefone}</div>
        </div>
        <div className="flex flex-col items-end text-xs text-gray-400">
          <div>Corridas: <span className="text-white font-semibold">{clienteAtual.totalCorridas}</span></div>
          <div>Avaliação: <span className="text-yellow-400 font-semibold">{clienteAtual.avaliacaoMedia.toFixed(1)}</span></div>
        </div>
      </footer>
    </div>
  );
}
