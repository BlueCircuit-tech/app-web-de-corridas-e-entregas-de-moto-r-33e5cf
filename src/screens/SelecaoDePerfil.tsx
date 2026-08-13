import React from "react"

const LOGO_URL = "https://raw.githubusercontent.com/abhibot-prototipos/rota-express-assets/main/logo-moto-rota-express.png" // substitua ou ajuste se mudar a URL

export default function SelecaoDePerfil({ irPara }: { irPara: (tela: string) => void }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white font-sans">
      {/* Cabeçalho Visual com logo e slogan */}
      <header className="flex flex-col items-center mt-8 mb-4">
        <div
          className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-red-700 shadow-md mb-4"
        >
          <img
            src={LOGO_URL}
            alt="Logo Rota Express"
            className="w-24 h-24 object-contain"
            draggable={false}
          />
        </div>
        <h1
          className="text-3xl font-bold tracking-tight text-red-600 drop-shadow-md mb-2"
          style={{fontFamily: 'Arial Black, Arial, sans-serif'}}
        >
          Rota Express
        </h1>
        <span className="text-white text-base font-medium tracking-wide px-4 py-1 rounded-full bg-red-700/80 shadow inline-block mb-0.5">
          Entregas rápidas e seguras
        </span>
      </header>

      {/* Escolha de Perfil */}
      <main className="flex flex-col flex-1 items-center px-4 max-w-md mx-auto w-full">
        <h2 className="text-lg font-semibold text-white mb-6 text-center tracking-wide">
          Como deseja usar o Rota Express?
        </h2>
        <div className="w-full flex flex-col gap-5">
          {/* BOTÃO CLIENTE */}
          <button
            onClick={() => irPara('SolicitarCorridaEntregaCliente')}
            className="group bg-white/95 border-2 border-red-700 hover:bg-red-600 hover:text-white hover:border-white transition font-bold text-black text-xl rounded-2xl py-5 shadow-lg flex flex-col items-center justify-center gap-1 outline-none focus-visible:ring-4 ring-red-400"
            style={{minHeight: 90}}
            aria-label="Solicitar corrida ou entrega como cliente"
          >
            <span className="inline-flex items-center gap-2">
              <svg className="w-8 h-8 text-red-700 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14c-5.333 0-8 1.333-8 4v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1c0-2.667-2.667-4-8-4Z"/></svg>
              Sou <span className="text-red-700 group-hover:text-white">Cliente</span>
            </span>
            <span className="block text-base font-normal text-neutral-700 group-hover:text-white mt-1">
              Solicitar corrida ou entrega agora
            </span>
          </button>

          {/* BOTÃO MOTORISTA */}
          <button
            onClick={() => irPara('NovosPedidosMotorista')}
            className="group bg-black border-2 border-red-700 hover:bg-red-600 hover:border-white text-white font-bold text-xl rounded-2xl py-5 shadow-lg flex flex-col items-center gap-1 outline-none focus-visible:ring-4 ring-red-400 transition"
            style={{minHeight: 90}}
            aria-label="Entrar como motorista para receber pedidos"
          >
            <span className="inline-flex items-center gap-2">
              <svg className="w-8 h-8 text-red-700 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.5 6.5 10h.8a6 6 0 0 1 11.38-2m-9.88 2H11m7.5 6.5v-2a2 2 0 0 0-2-2H8.83a2 2 0 0 0-1.96 1.59L6.5 18a2 2 0 0 0 1.96 2.41h.08a2 2 0 0 0 1.95-1.59L11.5 16h2l.15.82a2 2 0 0 0 1.95 1.59h.08A2 2 0 0 0 17.5 18l.19-1.86a2 2 0 0 0-2-2.14h-.03a2 2 0 0 0-2 2.14L13 18"/></svg>
              Sou <span className="text-red-600 group-hover:text-white">Motorista</span>
            </span>
            <span className="block text-base font-normal text-neutral-200 group-hover:text-white mt-1">
              Receber e aceitar pedidos de corrida ou entrega
            </span>
          </button>
        </div>
      </main>

      {/* Rodapé institucional */}
      <footer className="py-7 text-sm flex flex-col items-center text-neutral-400">
        <span className="font-semibold text-white">
          São Paulo/SP &bull; 2025
        </span>
        <span>Versão protótipo &mdash; para demonstração comercial</span>
      </footer>
    </div>
  )
}
