import { useState } from 'react'
import { dadosMotoristas, dadosClientes, cidades } from '../dados'

export default function LoginCadastro() {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [perfil, setPerfil] = useState<'cliente' | 'motorista'>('cliente')

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const [placa, setPlaca] = useState('')
  const [marca, setMarca] = useState('')
  const [modeloMoto, setModeloMoto] = useState('')
  const [ano, setAno] = useState('')
  const [corMoto, setCorMoto] = useState('')
  const [cidade, setCidade] = useState('')

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '')
    if (numeros.length <= 2) return `(${numeros}`
    if (numeros.length <= 7) return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`
    return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7,11)}`
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(formatarTelefone(e.target.value))
  }

  const validarCadastro = (): boolean => {
    setErro('')
    setSucesso('')

    if (!nome.trim() || nome.trim().length < 3) {
      setErro('Informe seu nome completo.')
      return false
    }

    const telefoneNumeros = telefone.replace(/\D/g, '')
    if (telefoneNumeros.length < 10) {
      setErro('Informe um telefone válido com DDD.')
      return false
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErro('Informe um e-mail válido.')
      return false
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return false
    }

    if (modo === 'cadastro' && senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return false
    }

    if (perfil === 'motorista' && modo === 'cadastro') {
      if (!placa.trim()) {
        setErro('Informe a placa da moto.')
        return false
      }
      if (!marca.trim()) {
        setErro('Informe a marca da moto.')
        return false
      }
      if (!modeloMoto.trim()) {
        setErro('Informe o modelo da moto.')
        return false
      }
      if (!cidade) {
        setErro('Selecione a cidade de atuação.')
        return false
      }
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarCadastro()) return

    const dadosUsuario = {
      nome: nome.trim(),
      telefone,
      email: email.trim().toLowerCase(),
      perfil,
      ...(perfil === 'motorista' && modo === 'cadastro' && {
        veiculo: { placa: placa.toUpperCase(), marca, modelo: modeloMoto, ano, cor: corMoto, cidade },
      }),
    }

    console.log(`${modo === 'login' ? 'Login' : 'Cadastro'} realizado:`, dadosUsuario)

    if (modo === 'cadastro' && perfil === 'motorista') {
      setSucesso('Cadastro realizado! Aguarde a aprovação do administrador para começar a receber corridas.')
    } else if (modo === 'cadastro') {
      setSucesso('Cadastro realizado com sucesso! Faça login para continuar.')
      setModo('login')
    } else {
      setSucesso('Login realizado com sucesso!')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">

      {/* ===== CABEÇALHO ===== */}
      <header className="bg-neutral-900 border-b-2 border-red-600 px-5 py-5">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Ícone da moto */}
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/30">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
              <path d="M19.5 9.5c-.17 0-.32.03-.48.06-.16-.55-.67-.94-1.27-.94h-1.55l-1.68-3.16a1.5 1.5 0 0 0-1.34-.84h-5.2c-.58 0-1.1.33-1.34.84L5.8 8.62H4.25c-.6 0-1.11.39-1.27.94-.16-.03-.31-.06-.48-.06-.83 0-1.5.67-1.5 1.5S2.67 12 3.5 12c0 2.5 2.5 4.5 5.5 4.5h6c3 0 5.5-2 5.5-4.5.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zM7 15.5c-1.38 0-2.5-1.12-2.5-2.5h1c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h1c0 1.38-1.12 2.5-2.5 2.5zm9 0c-1.38 0-2.5-1.12-2.5-2.5h1c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h1c0 1.38-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Rota Express
            </h1>
            <p className="text-red-500 text-xs font-semibold tracking-widest uppercase">
              Entregas rápidas e seguras
            </p>
          </div>
        </div>
      </header>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-md mx-auto w-full px-5 py-6">

          {/* Seletor de Perfil */}
          <div className="bg-neutral-900 rounded-xl p-1 mb-5 border border-neutral-800">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setPerfil('cliente')}
                className={`py-3 px-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  perfil === 'cliente'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                    : 'bg-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Sou Cliente
              </button>
              <button
                type="button"
                onClick={() => setPerfil('motorista')}
                className={`py-3 px-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  perfil === 'motorista'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                    : 'bg-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Sou Motorista
              </button>
            </div>
          </div>

          {/* Abas Login / Cadastro */}
          <div className="flex bg-neutral-900 rounded-lg p-1 mb-5 border border-neutral-800">
            <button
              type="button"
              onClick={() => { setModo('login'); setErro(''); setSucesso('') }}
              className={`flex-1 py-2.5 rounded-md text-sm font-bold transition-all ${
                modo === 'login'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => { setModo('cadastro'); setErro(''); setSucesso('') }}
              className={`flex-1 py-2.5 rounded-md text-sm font-bold transition-all ${
                modo === 'cadastro'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* ===== FORMULÁRIO ===== */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nome — só no cadastro */}
            {modo === 'cadastro' && (
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Carlos Andrade"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
              </div>
            )}

            {/* Telefone */}
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                Telefone
              </label>
              <input
                type="text"
                value={telefone}
                onChange={handleTelefoneChange}
                placeholder="(11) 99999-9999"
                maxLength={15}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder={modo === 'cadastro' ? 'Mínimo 6 caracteres' : 'Sua senha'}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 pr-11 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l-3.293-3.293m0 0a3 3 0 104.243-4.242l3.293 3.293m-3.293-3.293l3.293 3.293M3 3l3.59 3.59m0 0A9.967 9.967 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirmar Senha — só no cadastro */}
            {modo === 'cadastro' && (
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Confirmar senha
                </label>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita sua senha"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
              </div>
            )}

            {/* ===== CAMPOS DO MOTORISTA ===== */}
            {modo === 'cadastro' && perfil === 'motorista' && (
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-bold text-neutral-200">Dados da Moto</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                      Placa
                    </label>
                    <input
                      type="text"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                      placeholder="ABC1D23"
                      maxLength={7}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm uppercase focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                      Marca
                    </label>
                    <input
                      type="text"
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                      placeholder="Honda"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                      Modelo
                    </label>
                    <input
                      type="text"
                      value={modeloMoto}
                      onChange={(e) => setModeloMoto(e.target.value)}
                      placeholder="CG 160"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                      Ano
                    </label>
                    <input
                      type="number"
                      value={ano}
                      onChange={(e) => setAno(e.target.value)}
                      placeholder="2024"
                      min={2000}
                      max={2026}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                      Cor
                    </label>
                    <input
                      type="text"
                      value={corMoto}
                      onChange={(e) => setCorMoto(e.target.value)}
                      placeholder="Vermelha"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                      Cidade de atuação
                    </label>
                    <select
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2378716c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                    >
                      <option value="">Selecione uma cidade</option>
                      {cidades.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagens de erro e sucesso */}
            {erro && (
              <div className="bg-red-950 border border-red-800 text-red-300 rounded-lg px-4 py-3 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{erro}</span>
              </div>
            )}

            {sucesso && (
              <div className="bg-green-950 border border-green-800 text-green-300 rounded-lg px-4 py-3 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{sucesso}</span>
              </div>
            )}

            {/* Botão de submit */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 flex items-center justify-center gap-2 mt-2"
            >
              {modo === 'login' ? (
                <>Entrar</>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a1 1 0 01-1-1v-1a2 2 0 012-2h12a2 2 0 012 2v1a1 1 0 01-1 1H3z" />
                  </svg>
                  Criar conta
                </>
              )}
            </button>

          </form>

          {/* ===== RODAPÉ ===== */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 text-xs">
              Ao continuar, você concorda com os Termos de Uso e Política de Privacidade da Rota Express.
            </p>
          </div>

          {/* ===== INFO DE CONTEXTO (estado inicial) ===== */}
          {modo === 'login' && (
            <div className="mt-5 bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-4">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Contas de demonstração
              </p>
              <div className="space-y-1.5 text-xs text-neutral-500">
                <p><span className="text-neutral-400">Cliente:</span> maria@email.com / 123456</p>
                <p><span className="text-neutral-400">Motorista:</span> joao@email.com / 123456</p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ===== RODAPÉ DA TELA ===== */}
      <footer className="bg-neutral-900 border-t border-neutral-800 px-5 py-3">
        <p className="text-center text-neutral-600 text-xs">
          Rota Express · Entregas rápidas e seguras · © 2026
        </p>
      </footer>

    </div>
  )
}
