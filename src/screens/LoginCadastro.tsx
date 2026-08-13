import { useState } from 'react'
import { Cliente, Motorista } from '../dados'

// ============================================================
// ROTA EXPRESS — Login / Cadastro
// ============================================================

export default function LoginCadastro() {
  const [tela, setTela] = useState<'escolha-perfil' | 'cadastro' | 'login'>('escolha-perfil')
  const [perfil, setPerfil] = useState<'cliente' | 'motorista' | null>(null)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  // Form cadastro cliente
  const [cliNome, setCliNome] = useState('')
  const [cliTel, setCliTel] = useState('')
  const [cliEmail, setCliEmail] = useState('')
  const [cliSenha, setCliSenha] = useState('')

  // Form cadastro motorista
  const [motNome, setMotNome] = useState('')
  const [motTel, setMotTel] = useState('')
  const [motCnh, setMotCnh] = useState('')
  const [motEmail, setMotEmail] = useState('')
  const [motSenha, setMotSenha] = useState('')
  const [motModelo, setMotModelo] = useState('')
  const [motPlaca, setMotPlaca] = useState('')
  const [motCor, setMotCor] = useState('')
  const [motAno, setMotAno] = useState('')

  // Form login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginSenha, setLoginSenha] = useState('')
  const [loginTipo, setLoginTipo] = useState<'cliente' | 'motorista'>('cliente')

  // --------------------------------------------------------
  // ESCOLHA DE PERFIL
  // --------------------------------------------------------
  function TelaEscolhaPerfil() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center mb-4 shadow-lg shadow-red-600/30">
            {/* Ícone de moto estilizado com SVG */}
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="46" r="10" stroke="white" strokeWidth="3" fill="none"/>
              <circle cx="46" cy="46" r="10" stroke="white" strokeWidth="3" fill="none"/>
              <path d="M18 46 L28 26 L36 26 L44 38" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 26 L42 22 L44 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="44" cy="20" r="2.5" fill="white"/>
              <path d="M28 30 L24 38 L22 38" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">ROTA EXPRESS</h1>
          <p className="text-red-500 text-sm font-semibold mt-1 tracking-wide uppercase">Entregas rápidas e seguras</p>
        </div>

        <p className="text-gray-400 text-center text-sm mb-8 max-w-xs">
          Bem-vindo! Escolha como deseja acessar o app e comece agora mesmo.
        </p>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => { setPerfil('cliente'); setTela('cadastro') }}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Sou Cliente
          </button>

          <button
            onClick={() => { setPerfil('motorista'); setTela('cadastro') }}
            className="w-full bg-transparent border-2 border-red-600 hover:bg-red-600/10 active:bg-red-600/20 text-red-500 hover:text-white font-bold py-4 px-6 rounded-xl text-lg transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-1.5m-13.5 9h13.5m-13.5-9h13.5" />
            </svg>
            Sou Motorista
          </button>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setTela('login')}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Já tenho conta — Entrar
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-8 text-center">
          © 2025 Rota Express — Entregas rápidas e seguras
        </p>
      </div>
    )
  }

  // --------------------------------------------------------
  // CADASTRO
  // --------------------------------------------------------
  function TelaCadastro() {
    const isMotorista = perfil === 'motorista'

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      alert(isMotorista ? 'Cadastro de motorista realizado com sucesso!' : 'Cadastro de cliente realizado com sucesso!')
      setTela('login')
    }

    return (
      <div className="min-h-screen flex flex-col bg-black">
        {/* Cabeçalho */}
        <header className="flex items-center p-4">
          <button
            onClick={() => { setTela('escolha-perfil'); setPerfil(null) }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h2 className="text-white font-bold text-lg ml-3">Criar conta</h2>
        </header>

        {/* Indicador de perfil */}
        <div className="px-6 mb-4">
          <div className="flex bg-zinc-900 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setPerfil('cliente')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                !isMotorista
                  ? 'bg-red-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Cliente
            </button>
            <button
              type="button"
              onClick={() => setPerfil('motorista')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isMotorista
                  ? 'bg-red-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Motorista
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 pb-6 overflow-y-auto">
          {/* Avatar placeholder */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.54-.51 1.22-.29 1.78.18.45.55.8.99.95.39.14.82.13 1.21-.01a2.5 2.5 0 011.46.59l2.08 2.08a2.5 2.5 0 011.46.59c.39.14.82.15 1.21.01.44-.15.81-.5.99-.95.22-.56.09-1.24-.29-1.78a2.31 2.31 0 00-1.64-.55H18a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25h-9.75A2.25 2.25 0 016 15.75v-.75c0-.97.78-1.75 1.75-1.75h.092" />
              </svg>
            </div>
            <span className="text-zinc-500 text-xs mt-2">Toque para adicionar foto</span>
          </div>

          {/* Campos comuns */}
          <div className="space-y-3">
            <Campo
              label="Nome completo"
              placeholder="Ex: Mariana Costa Silva"
              value={isMotorista ? motNome : cliNome}
              onChange={isMotorista ? setMotNome : setCliNome}
              required
            />
            <Campo
              label="Telefone"
              placeholder="(11) 98765-4321"
              value={isMotorista ? motTel : cliTel}
              onChange={isMotorista ? setMotTel : setCliTel}
              type="tel"
              required
            />
            <Campo
              label="E-mail"
              placeholder="seu@email.com"
              value={isMotorista ? motEmail : cliEmail}
              onChange={isMotorista ? setMotEmail : setCliEmail}
              type="email"
              required
            />
            <Campo
              label="Senha"
              placeholder="••••••••"
              value={isMotorista ? motSenha : cliSenha}
              onChange={isMotorista ? setMotSenha : setCliSenha}
              type={mostrarSenha ? 'text' : 'password'}
              required
              iconeDireita={
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="text-gray-500 hover:text-gray-300">
                  {mostrarSenha ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243l4.242 4.242z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              }
            />
          </div>

          {/* Campos exclusivos de motorista */}
          {isMotorista && (
            <div className="mt-6">
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                <h3 className="text-red-500 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-1.5m-13.5 9h13.5m-13.5-9h13.5" />
                  </svg>
                  Dados da moto
                </h3>
                <div className="space-y-3">
                  <Campo label="Modelo da moto" placeholder="Ex: Honda CG 160 Titan" value={motModelo} onChange={setMotModelo} required />
                  <div className="grid grid-cols-2 gap-3">
                    <Campo label="Placa" placeholder="BRA2E19" value={motPlaca} onChange={setMotPlaca} required />
                    <Campo label="Cor" placeholder="Vermelha" value={motCor} onChange={setMotCor} required />
                  </div>
                  <Campo label="Ano" placeholder="2024" value={motAno} onChange={setMotAno} type="number" required />
                  <Campo label="CNH" placeholder="12345678901" value={motCnh} onChange={setMotCnh} required />
                </div>
              </div>
            </div>
          )}

          {/* Termos */}
          <div className="mt-5 flex items-start gap-2">
            <input type="checkbox" id="termos" required className="mt-1 accent-red-600 w-4 h-4" />
            <label htmlFor="termos" className="text-gray-400 text-xs leading-relaxed">
              Li e aceito os <span className="text-red-500 underline">Termos de Uso</span> e a <span className="text-red-500 underline">Política de Privacidade</span> da Rota Express.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-4 rounded-xl text-base mt-5 transition-all shadow-lg shadow-red-600/20"
          >
            Cadastrar
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Já tem conta?{' '}
            <button type="button" onClick={() => setTela('login')} className="text-red-500 font-semibold hover:underline">Entrar</button>
          </p>
        </form>
      </div>
    )
  }

  // --------------------------------------------------------
  // LOGIN
  // --------------------------------------------------------
  function TelaLogin() {
    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      alert('Login realizado com sucesso!')
    }

    return (
      <div className="min-h-screen flex flex-col bg-black">
        {/* Cabeçalho */}
        <header className="flex items-center p-4">
          <button
            onClick={() => setTela('escolha-perfil')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h2 className="text-white font-bold text-lg ml-3">Entrar</h2>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
          {/* Logo menor */}
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4 shadow-lg shadow-red-600/30">
            <svg viewBox="0 0 64 64" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="46" r="10" stroke="white" strokeWidth="3" fill="none"/>
              <circle cx="46" cy="46" r="10" stroke="white" strokeWidth="3" fill="none"/>
              <path d="M18 46 L28 26 L36 26 L44 38" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 26 L42 22 L44 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="44" cy="20" r="2.5" fill="white"/>
              <path d="M28 30 L24 38 L22 38" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">ROTA EXPRESS</h1>
          <p className="text-red-500 text-xs font-semibold mb-8">Entregas rápidas e seguras</p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            {/* Seletor de tipo de login */}
            <div className="flex bg-zinc-900 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setLoginTipo('cliente')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  loginTipo === 'cliente'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={() => setLoginTipo('motorista')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  loginTipo === 'motorista'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Motorista
              </button>
            </div>

            <Campo
              label="E-mail"
              placeholder="seu@email.com"
              value={loginEmail}
              onChange={setLoginEmail}
              type="email"
              required
            />
            <Campo
              label="Senha"
              placeholder="••••••••"
              value={loginSenha}
              onChange={setLoginSenha}
              type={mostrarSenha ? 'text' : 'password'}
              required
              iconeDireita={
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="text-gray-500 hover:text-gray-300">
                  {mostrarSenha ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243l4.242 4.242z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              }
            />

            <div className="text-right">
              <button type="button" className="text-red-500 text-xs font-medium hover:underline">Esqueci minha senha</button>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-red-600/20"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Ainda não tem conta?{' '}
            <button onClick={() => setTela('cadastro')} className="text-red-500 font-semibold hover:underline">Cadastrar</button>
          </p>
        </div>

        <p className="text-gray-600 text-xs text-center pb-4">
          © 2025 Rota Express — Entregas rápidas e seguras
        </p>
      </div>
    )
  }

  // --------------------------------------------------------
  // RENDERIZAÇÃO
  // --------------------------------------------------------
  if (tela === 'escolha-perfil') return <TelaEscolhaPerfil />
  if (tela === 'cadastro') return <TelaCadastro />
  return <TelaLogin />
}

// ============================================================
// Componente reutilizável de campo de formulário
// ============================================================
interface CampoProps {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  iconeDireita?: React.ReactNode
}

function Campo({ label, placeholder, value, onChange, type = 'text', required, iconeDireita }: CampoProps) {
  return (
    <div>
      <label className="block text-gray-300 text-xs font-semibold mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
        />
        {iconeDireita && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {iconeDireita}
          </div>
        )}
      </div>
    </div>
  )
}
