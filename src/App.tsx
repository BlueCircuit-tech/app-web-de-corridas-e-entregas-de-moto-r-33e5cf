function App() {
  return (
    <div className="min-h-screen bg-rota-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="mx-auto"
          >
            <circle cx="32" cy="32" r="30" fill="#DC2626" />
            <path
              d="M38 20c-1.5 0-2.8.5-3.8 1.3L28 26h-6v6h4l4 6H42l-4-6h2c2.2 0 4-1.8 4-4v-4c0-3.3-2.7-6-6-6h-2zm-2 4h2c.6 0 1 .4 1 1s-.4 1-1 1h-2v-2z"
              fill="#0F0F0F"
            />
            <circle cx="22" cy="42" r="5" fill="#0F0F0F" />
            <circle cx="44" cy="42" r="5" fill="#0F0F0F" />
            <path
              d="M20 38h20v4H20z"
              fill="#F3F4F6"
            />
          </svg>
        </div>
        <p className="font-display text-4xl text-white tracking-wider">ROTA EXPRESS</p>
        <p className="text-rota-red text-sm font-medium mt-1">Entregas rápidas e seguras</p>
        <div className="mt-6 flex items-center gap-2 text-rota-gray-light text-sm">
          <svg className="animate-spin h-4 w-4 text-rota-red" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          carregando
        </div>
      </div>
    </div>
  )
}

export default App
