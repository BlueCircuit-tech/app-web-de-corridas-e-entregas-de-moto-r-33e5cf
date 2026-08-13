import React from 'react'

export default function App(): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rota-preto">
      <div className="text-center">
        <h1 className="font-display text-5xl text-rota-vermelho tracking-wider">
          ROTA EXPRESS
        </h1>
        <p className="font-body text-rota-cinzaTexto text-lg mt-2">
          Entregas rápidas e seguras
        </p>
        <div className="mt-6 flex items-center justify-center gap-1">
          <span className="inline-block w-2 h-2 bg-rota-vermelho rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="inline-block w-2 h-2 bg-rota-vermelho rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="inline-block w-2 h-2 bg-rota-vermelho rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
