import { useState } from 'react';
import SelecaoDePerfil from './screens/SelecaoDePerfil';
import LoginCadastro from './screens/LoginCadastro';
import SolicitarCorridaEntregaCliente from './screens/SolicitarCorridaEntregaCliente';
import AcompanhamentoDoTrajetoCliente from './screens/AcompanhamentoDoTrajetoCliente';
import NovosPedidosMotorista from './screens/NovosPedidosMotorista';
import CorridaEmAndamentoMotorista from './screens/CorridaEmAndamentoMotorista';

export type Tela =
  | 'selecao'
  | 'login'
  | 'cliente-solicitar'
  | 'cliente-acompanhar'
  | 'motorista-pedidos'
  | 'motorista-andamento';

export type Perfil = 'cliente' | 'motorista' | null;

const ROTAS: { id: Tela; label: string; icone: string; grupo: 'cliente' | 'motorista' | 'geral' }[] = [
  { id: 'selecao', label: 'Início', icone: '🏠', grupo: 'geral' },
  { id: 'cliente-solicitar', label: 'Solicitar', icone: '📦', grupo: 'cliente' },
  { id: 'cliente-acompanhar', label: 'Acompanhar', icone: '📍', grupo: 'cliente' },
  { id: 'motorista-pedidos', label: 'Pedidos', icone: '🔔', grupo: 'motorista' },
  { id: 'motorista-andamento', label: 'Em rota', icone: '🏍️', grupo: 'motorista' },
  { id: 'login', label: 'Conta', icone: '👤', grupo: 'geral' },
];

export default function App() {
  const [tela, setTela] = useState<Tela>('selecao');
  const [perfil, setPerfil] = useState<Perfil>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const irPara = (proxima: Tela) => {
    setTela(proxima);
    setMenuAberto(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const escolherPerfil = (p: 'cliente' | 'motorista') => {
    setPerfil(p);
    if (p === 'cliente') irPara('login');
    else irPara('login');
  };

  const abasVisiveis = ROTAS.filter((r) => {
    if (r.grupo === 'geral') return true;
    if (perfil === null) return false;
    return r.grupo === perfil;
  });

  const renderTela = () => {
    switch (tela) {
      case 'selecao':
        return <SelecaoDePerfil onEscolher={escolherPerfil} />;
      case 'login':
        return (
          <LoginCadastro
            perfil={perfil}
            onEntrar={() =>
              irPara(perfil === 'motorista' ? 'motorista-pedidos' : 'cliente-solicitar')
            }
            onVoltar={() => irPara('selecao')}
          />
        );
      case 'cliente-solicitar':
        return (
          <SolicitarCorridaEntregaCliente
            onSolicitar={() => irPara('cliente-acompanhar')}
            onSair={() => {
              setPerfil(null);
              irPara('selecao');
            }}
          />
        );
      case 'cliente-acompanhar':
        return (
          <AcompanhamentoDoTrajetoCliente
            onVoltar={() => irPara('cliente-solicitar')}
            onSair={() => {
              setPerfil(null);
              irPara('selecao');
            }}
          />
        );
      case 'motorista-pedidos':
        return (
          <NovosPedidosMotorista
            onAceitar={() => irPara('motorista-andamento')}
            onSair={() => {
              setPerfil(null);
              irPara('selecao');
            }}
          />
        );
      case 'motorista-andamento':
        return (
          <CorridaEmAndamentoMotorista
            onFinalizar={() => irPara('motorista-pedidos')}
            onSair={() => {
              setPerfil(null);
              irPara('selecao');
            }}
          />
        );
      default:
        return <SelecaoDePerfil onEscolher={escolherPerfil} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-red-700 via-red-600 to-red-700 border-b-4 border-yellow-400 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMenuAberto((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 -ml-2 rounded-lg hover:bg-red-800/50 transition"
            aria-label="Abrir menu"
          >
            <span className={`block w-6 h-0.5 bg-yellow-300 transition-transform ${menuAberto ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-yellow-300 transition-opacity ${menuAberto ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-yellow-300 transition-transform ${menuAberto ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          <button
            onClick={() => irPara('selecao')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-950 border-2 border-yellow-400 flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <span className="text-xl">🏍️</span>
            </div>
            <div className="text-left leading-tight">
              <div className="font-black text-lg tracking-wide text-yellow-300">
                ROTA EXPRESS
              </div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-200">
                Entregas rápidas e seguras
              </div>
            </div>
          </button>

          <div className="flex items-center gap-2">
            {perfil && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-neutral-950/40 border border-yellow-400/40 text-yellow-300 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {perfil === 'cliente' ? 'CLIENTE' : 'MOTORISTA'}
              </span>
            )}
          </div>
        </div>

        {/* Menu lateral (mobile) */}
        {menuAberto && (
          <nav className="md:hidden border-t border-red-800/60 bg-red-900/95 backdrop-blur">
            <ul className="max-w-5xl mx-auto px-2 py-2 grid grid-cols-2 gap-1">
              {abasVisiveis.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => irPara(r.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                      tela === r.id
                        ? 'bg-yellow-400 text-neutral-950'
                        : 'text-neutral-100 hover:bg-red-800/70'
                    }`}
                  >
                    <span className="text-base">{r.icone}</span>
                    {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Conteúdo */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 pb-28 md:pb-8">
        {renderTela()}
      </main>

      {/* Barra inferior (mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-neutral-900 border-t-2 border-yellow-400 shadow-2xl">
        <ul className="grid grid-cols-5 max-w-5xl mx-auto">
          {abasVisiveis.slice(0, 5).map((r) => {
            const ativo = tela === r.id;
            return (
              <li key={r.id}>
                <button
                  onClick={() => irPara(r.id)}
                  className={`w-full flex flex-col items-center justify-center gap-0.5 py-2.5 transition ${
                    ativo ? 'text-yellow-400' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span
                    className={`text-xl leading-none transition-transform ${
                      ativo ? 'scale-110' : ''
                    }`}
                  >
                    {r.icone}
                  </span>
                  <span className={`text-[10px] font-bold ${ativo ? 'text-yellow-300' : ''}`}>
                    {r.label}
                  </span>
                  {ativo && (
                    <span className="absolute bottom-0 w-8 h-1 bg-yellow-400 rounded-t-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer desktop */}
      <footer className="hidden md:block border-t border-neutral-800 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Rota Express — Entregas rápidas e seguras
          </div>
          <div className="flex items-center gap-3">
            {ROTAS.filter((r) => r.grupo === 'geral' || (perfil && r.grupo === perfil)).map(
              (r) => (
                <button
                  key={r.id}
                  onClick={() => irPara(r.id)}
                  className={`px-3 py-1.5 rounded-full border transition ${
                    tela === r.id
                      ? 'border-yellow-400 text-yellow-300'
                      : 'border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  {r.icone} {r.label}
                </button>
              ),
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
