import React from 'react';

// A logo simples estilizada inline (substitua pelo SVG oficial quando disponível)
const LogoMoto = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-label="Logo Rota Express">
    <circle cx="40" cy="40" r="40" fill="#101010" />
    <g>
      <rect x="18" y="46" width="18" height="7" rx="3.5" fill="#fff"/>
      <rect x="44" y="46" width="18" height="7" rx="3.5" fill="#fff"/>
      <rect x="28" y="36" width="24" height="12" rx="6" fill="#E10600"/>
      <rect x="36" y="32" width="8" height="8" rx="4" fill="#fff"/>
      <rect x="34" y="30" width="12" height="5" rx="2.5" fill="#222" />
    </g>
  </svg>
);

const bgMain = 'bg-[#0E0E0E]';
const vermelho = '#E10600';

export default function SelecaoDePerfil() {
  return (
    <div
      className={
        `${bgMain} min-h-screen w-full flex flex-col items-center justify-between pt-8 pb-6 px-3 sm:px-0`
      }
      style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
    >
      {/* Cabeçalho e Logo */}
      <header className="flex flex-col items-center">
        <LogoMoto />
        <h1
          className="text-2xl font-black tracking-wide mt-3 text-white text-center"
          style={{ letterSpacing: 0.5 }}
        >
          Rota <span className="text-[#E10600]">Express</span>
        </h1>
        <div className="text-base text-gray-200 italic mt-1 text-center">
          Entregas rápidas e seguras
        </div>
      </header>
      {/* Seleção de Perfil */}
      <main className="flex flex-col flex-1 w-full max-w-sm items-center justify-center gap-8">
        <div className="mt-10 w-full flex flex-col gap-6">
          <button
            className="w-full py-5 rounded-xl bg-[#E10600] text-white font-bold text-lg shadow-md hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#E10600]/60 transition-all duration-150"
            type="button"
            tabIndex={0}
            aria-label="Sou Cliente"
            // onClick={() => ...} // Navegação feita em App.tsx
          >
            Sou Cliente
          </button>
          <button
            className="w-full py-5 rounded-xl border-2 border-[#E10600] text-[#E10600] bg-black font-bold text-lg shadow-md hover:bg-[#191919] focus:outline-none focus:ring-2 focus:ring-[#E10600]/60 transition-all duration-150"
            type="button"
            tabIndex={0}
            aria-label="Sou Motorista"
            // onClick={() => ...}
          >
            Sou Motorista
          </button>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="w-full flex flex-col items-center text-gray-400 text-xs mt-8">
        <span className="select-none">&copy; 2024 Rota Express</span>
        <span className="text-[#E10600] font-semibold mt-1 tracking-wide">Sua rota, nossa entrega.</span>
      </footer>
    </div>
  );
}
