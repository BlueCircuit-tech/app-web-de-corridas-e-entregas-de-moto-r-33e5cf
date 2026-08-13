import React, { useState } from 'react'
import { motoristas } from '../dados'

const COR_PRETA = '#151418'
const COR_VERMELHA = '#E61521'

const estilizaInput =
  'block w-full rounded bg-[#232123] border border-[#a4a4a42c] px-3 py-2 mb-3 text-sm text-white focus:outline-none focus:border-[#E61521] placeholder-gray-400 transition-all'

function LogoRotaExpress() {
  return (
    <div className="flex flex-col items-center gap-1 mt-7 mb-5 select-none">
      <div className="flex items-center gap-2">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="20" ry="20" fill={COR_PRETA}/><path d="M13 28 l6-11.5a2 2 0 0 1 1.9-1.1h4.8c.7 0 1.1.8.8 1.4l-0.8 1.6c-.2.4-.1 1 .3 1.2l1 .6c.8.4 1.5 0 2-1.2l.9-2.3c.4-.9-.1-2-1-2.7-.8-.7-2.3-1-4-1H21c-3 0-3.9.5-5 2.8l-3.5 7.2c-.4.9-.2 2.1.8 2.3l2.3.4z" fill={COR_VERMELHA} /></svg>
        <span className="font-semibold text-2xl tracking-tight text-white" style={{letterSpacing: '.02em'}}>Rota Express</span>
      </div>
      <span className="text-gray-300 text-xs font-medium italic -mt-1">Entregas rápidas e seguras</span>
    </div>
  )
}

const opcoesPerfil = [
  { key: 'cliente', label: 'Sou Cliente' },
  { key: 'motorista', label: 'Sou Motorista' }
]

type Perfil = 'cliente' | 'motorista'

type Modo = 'login' | 'cadastro'

export default function LoginCadastro({ irPara }: { irPara: (tela: string) => void }) {
  const [perfilSelecionado, setPerfilSelecionado] = useState<Perfil>('cliente')
  const [modo, setModo] = useState<Modo>('login')
  // Campos comuns
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  // Motorista
  const [placaMoto, setPlacaMoto] = useState('')
  const [modeloMoto, setModeloMoto] = useState('')
  const [cnh, setCnh] = useState('')
  // Feedback visual
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // Para demonstração: login "valida" pelo campo email para cliente e telefone para motorista
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    setTimeout(() => {
      setCarregando(false)
      if (modo === 'login') {
        if (perfilSelecionado === 'cliente') {
          if (
            email.trim() === '' ||
            telefone.trim() === ''
          ) {
            setErro('E-mail e telefone obrigatórios.')
            return
          }
          // Login "demo": qualquer cliente vai para o fluxo
          irPara('SolicitarCorridaEntregaCliente')
        } else {
          if (telefone.trim().length < 8 || cnh.trim().length < 5) {
            setErro('Telefone e CNH são obrigatórios.')
            return
          }
          // Login "demo": qualquer motorista do telefone cadastrado
          const mot = motoristas.find(m => m.telefone.replace(/\D/g, '') === telefone.replace(/\D/g, ''))
          if (!mot) {
            setErro('Motorista não encontrado.')
            return
          }
          irPara('NovosPedidosMotorista')
        }
      } else { // cadastro
        if (nome.trim() === '' || telefone.trim() === '' || email.trim() === '') {
          setErro('Preencha todos os campos obrigatórios.')
          return
        }
        if (perfilSelecionado === 'cliente') {
          // Cliente cadastrado, vai para o fluxo
          irPara('SolicitarCorridaEntregaCliente')
        } else {
          // Validação simplificada
          if (
            placaMoto.trim() === '' ||
            modeloMoto.trim() === '' ||
            cnh.trim() === ''
          ) {
            setErro('Preencha todos os campos da moto.')
            return
          }
          irPara('NovosPedidosMotorista')
        }
      }
    }, 600)
  }

  const btnPrincipal = carregando
    ? (
      <button disabled className="mt-4 w-full bg-[#E61521]/60 text-white text-base rounded py-2 font-semibold opacity-80 flex items-center justify-center">
        <svg className="animate-spin mr-2" width="20" height="20" fill="none" viewBox="0 0 24 24"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"/><path d="M22 12a10 10 0 1 1-4-8.1" stroke="#fff" strokeWidth="4" strokeLinecap="round"/></svg>
        Entrando...
      </button>
    ) : (
      <button type="submit" className="mt-4 w-full bg-[#E61521] text-white text-base rounded py-2 font-semibold shadow hover:bg-[#b90a12] transition-colors">
        {modo === 'login' ? 'Entrar' : 'Finalizar cadastro'}
      </button>
    )

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#151418] text-white px-2" style={{fontFamily:'Inter,Roboto,Arial,sans-serif'}}>
      <LogoRotaExpress />
      <div className="w-full max-w-[380px] bg-[#1C191C] rounded-2xl flex-1 shadow-lg p-5 pt-7 mb-8 border border-[#E61521]/10">
        <div className="flex justify-between mb-6 gap-2">
          {opcoesPerfil.map( p => (
            <button
              key={p.key}
              className={`flex-1 py-2 rounded font-semibold text-base transition-all ${perfilSelecionado===p.key ? 'bg-[#E61521] text-white shadow' : 'bg-[#262325] text-gray-300 hover:bg-[#211f21]'}`}
              aria-selected={perfilSelecionado===p.key}
              style={perfilSelecionado===p.key?{boxShadow:'0 0 0 2px #E6152160'}:{}}
              onClick={()=>{
                setPerfilSelecionado(p.key as Perfil)
                setErro('')
                setModo('login')
                setNome('')
                setTelefone('')
                setEmail('')
                setCnh('')
                setPlacaMoto('')
                setModeloMoto('')
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-2 mb-7">
          <button
            className={`flex-1 py-1 rounded-t-md font-semibold text-sm transition-all ${modo==='login' ? 'bg-[#262325] text-[#E61521]' : 'bg-transparent text-gray-200'}`}
            onClick={()=>{setModo('login'); setErro('')}}
          >Entrar</button>
          <button
            className={`flex-1 py-1 rounded-t-md font-semibold text-sm transition-all ${modo==='cadastro' ? 'bg-[#262325] text-[#E61521]' : 'bg-transparent text-gray-200'}`}
            onClick={()=>{setModo('cadastro'); setErro('')}}
          >Cadastrar</button>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          {modo==='cadastro' && (
            <>
              <label className="block text-xs font-semibold mb-1 ml-0.5">Nome completo</label>
              <input className={estilizaInput} autoComplete='off' placeholder="Seu nome" value={nome} onChange={e=>setNome(e.target.value)} required />
            </>
          )}
          <label className="block text-xs font-semibold mb-1 ml-0.5">Telefone</label>
          <input
            className={estilizaInput}
            type="tel"
            inputMode="tel"
            placeholder="(11) 91234-5678"
            value={telefone}
            onChange={e=>setTelefone(e.target.value.replace(/[^0-9()-\s]/g,''))}
            required
          />
          <label className="block text-xs font-semibold mb-1 ml-0.5">E-mail</label>
          <input
            className={estilizaInput}
            type="email"
            autoComplete='off'
            placeholder="exemplo@email.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
          {perfilSelecionado==='motorista' && (
            <>
              <div className="mt-4 mb-2 px-2 py-1 bg-[#E61521]/10 rounded flex items-center gap-2 text-xs text-[#E61521] border-l-4 border-[#E61521]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9 2h2.2c.9 0 1.4.7 1.8 1.4l1.8 3.7c.4.8.6 1.2.2 1.9-.4.6-1 .8-1.7.8H13s-.4 2.2-2 2.2-.6-2.2-2-2.2H5c-.9 0-1.4-.7-1.8-1.4l-1.8-3.7c-.3-.8 0-1.6.9-1.9C2.6 2 3.5 2 4 2h1m0 0l-.5 5.5" stroke="#E61521" strokeWidth="1.2" strokeLinecap="round"></path></svg>
                Preencha dados da moto</div>
              <label className="block text-xs font-semibold mb-1 ml-0.5">CNH</label>
              <input className={estilizaInput} autoComplete='off' placeholder="Número da CNH" value={cnh} onChange={e=>setCnh(e.target.value)} required />
              <label className="block text-xs font-semibold mb-1 ml-0.5">Placa da Moto</label>
              <input className={estilizaInput} autoComplete='off' placeholder="Ex: BRA-2E19" value={placaMoto} onChange={e=>setPlacaMoto(e.target.value.toUpperCase())} required maxLength={8}/>
              <label className="block text-xs font-semibold mb-1 ml-0.5">Modelo da Moto</label>
              <input className={estilizaInput} autoComplete='off' placeholder="Ex: Honda CG 160 Fan" value={modeloMoto} onChange={e=>setModeloMoto(e.target.value)} required />
            </>
          )}
          {erro && (
            <div className="bg-[#E61521]/20 text-[#E61521] text-sm mt-2 mb-2 px-2 py-1 rounded">{erro}</div>
          )}
          {btnPrincipal}
        </form>
        <button
          className="mt-6 w-full py-2 text-[#E61521] bg-transparent rounded hover:underline text-sm font-medium"
          type="button"
          onClick={() => irPara('SelecaoDePerfil')}
        >
          Voltar à seleção de perfil
        </button>
        {perfilSelecionado==='motorista' && modo==='login' && (
          <div className="mt-3 text-xs text-gray-400 text-center">Dica: use um telefone dos exemplos: (11) 98765-4321, (11) 97654-3210...</div>
        )}
      </div>
      <div className="w-full flex flex-col items-center gap-2 pb-8 pt-2">
        <span className="text-gray-500 text-[11px]">Versão de demonstração — Rota Express São Paulo/SP</span>
      </div>
    </div>
  )
}
