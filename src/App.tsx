import { useState, useEffect } from 'react'
import SelecaoDePerfil from './screens/SelecaoDePerfil'
import LoginCadastro from './screens/LoginCadastro'
import SolicitarCorridaEntregaCliente from './screens/SolicitarCorridaEntregaCliente'
import AcompanhamentoDoTrajetoCliente from './screens/AcompanhamentoDoTrajetoCliente'
import NovosPedidosMotorista from './screens/NovosPedidosMotorista'
import CorridaEmAndamentoMotorista from './screens/CorridaEmAndamentoMotorista'

const htmlStyle = document.createElement('style')
htmlStyle.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;600;700&display=swap');
* { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
body { font-family:'Source Sans 3',sans-serif; background:#0a0a0a; color:#fff; overflow-x:hidden; }
h1,h2,h3,h4,h5,h6,.font-display { font-family:'Oswald',sans-serif; text-transform:uppercase; letter-spacing:.02em; }
::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:#dc2626; border-radius:3px; }
input,select,textarea { font-family:'Source Sans 3',sans-serif; }
@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
@keyframes slideR { from{transform:translateX(30px);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes spin { to{transform:rotate(360deg)} }
.anim-up { animation:fadeUp .35s ease-out both; }
.anim-in { animation:fadeIn .25s ease-out both; }
.anim-slide { animation:slideR .3s ease-out both; }
.pulse-dot { animation:pulse-dot 1.8s ease-in-out infinite; }
.delay-1 { animation-delay:.08s; } .delay-2 { animation-delay:.16s; } .delay-3 { animation-delay:.24s; }
.phone-frame { max-width:430px; margin:0 auto; min-height:100vh; min-height:100dvh; position:relative; }
.safe-bottom { padding-bottom:calc(72px + env(safe-area-inset-bottom,0px)); }
.safe-top { padding-top:env(safe-area-inset-top,0px); }
.btn-primary { background:linear-gradient(135deg,#dc2626,#b91c1c); color:#fff; font-family:'Oswald',sans-serif; font-weight:600; text-transform:uppercase; letter-spacing:.06em; border:none; cursor:pointer; transition:all .2s; }
.btn-primary:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(220,38,38,.35); }
.btn-primary:active { transform:scale(.97); }
.btn-outline { background:transparent; color:#dc2626; border:1.5px solid #dc2626; font-family:'Oswald',sans-serif; font-weight:600; text-transform:uppercase; letter-spacing:.06em; cursor:pointer; transition:all .2s; }
.btn-outline:hover { background:rgba(220,38,38,.08); }
.card-dark { background:#141414; border:1px solid rgba(255,255,255,.06); }
.input-dark { background:#0f0f0f; border:1px solid rgba(255,255,255,.1); color:#fff; transition:border-color .2s; }
.input-dark:focus { outline:none; border-color:#dc2626; }
.input-dark::placeholder { color:#555; }
`
document.head.appendChild(htmlStyle)

const AdmCadastroMotorista = ({ irPara, motoristas, setMotoristas }: any) => {
  const [tab, setTab] = useState<'cadastro' | 'lista' | 'monitor'>('cadastro')
  const [formNome, setFormNome] = useState('')
  const [formCnh, setFormCnh] = useState('')
  const [formPlaca, setFormPlaca] = useState('')
  const [formModelo, setFormModelo] = useState('')
  const [formTelefone, setFormTelefone] = useState('')
  const [sucessoCadastro, setSucessoCadastro] = useState(false)
  const [motoristaExpandido, setMotoristaExpandido] = useState<string|null>(null)
  const [pedidoExpandido, setPedidoExpandido] = useState<string|null>(null)

  const handleCadastrar = () => {
    if (!formNome.trim() || !formCnh.trim() || !formPlaca.trim() || !formModelo.trim() || !formTelefone.trim()) return
    const novo: any = {
      id: `mot-${String(Date.now()).slice(-3)}`, nome: formNome.trim(), foto: `https://i.pravatar.cc/150?u=${Date.now()}`,
      cnh: formCnh.trim(), placaMoto: formPlaca.trim().toUpperCase(), modeloMoto: formModelo.trim(),
      avaliacao: 5.0, corridasRealizadas: 0, status: 'offline' as const, telefone: formTelefone.trim(),
    }
    setMotoristas([...motoristas, novo])
    setFormNome(''); setFormCnh(''); setFormPlaca(''); setFormModelo(''); setFormTelefone('')
    setSucessoCadastro(true)
    setTimeout(() => { setSucessoCadastro(false); setTab('lista') }, 2000)
  }

  const toggleStatus = (id: string) => {
    setMotoristas(motoristas.map((m: any) => m.id === id ? { ...m, status: m.status === 'offline' ? 'disponivel' : m.status === 'disponivel' ? 'ocupado' : 'offline' } : m))
  }

  const stats = { total: motoristas.length, disponivel: motoristas.filter((m:any)=>m.status==='disponivel').length, ocupado: motoristas.filter((m:any)=>m.status==='ocupado').length, offline: motoristas.filter((m:any)=>m.status==='offline').length }

  const pedidosPendentes: any[] = [
    { id:'ped-003', tipo:'corrida', clienteNome:'Fernanda Lima', origem:{rua:'Av. Brigadeiro Faria Lima',numero:'4232',bairro:'Pinheiros'}, destino:{rua:'Av. Corifeu de Azevedo Marques',numero:'3995',bairro:'Butantã'}, valor:18.0, distanciaKm:7.1, tempoEstimadoMin:22, pagamento:'dinheiro', createdAt:'2025-07-14T11:05:00', motoristaId:undefined },
    { id:'ped-004', tipo:'entrega', clienteNome:'Roberto Almeida', origem:{rua:'Rua da Glória',numero:'322',bairro:'Liberdade'}, destino:{rua:'Av. Cruzeiro do Sul',numero:'1800',bairro:'Santana'}, valor:28.75, distanciaKm:12.5, tempoEstimadoMin:35, pagamento:'pix', createdAt:'2025-07-14T11:20:00', descricao:'Caixa de presente — 40x30x20cm, não virar', motoristaId:undefined },
  ]
  const pedidosAtivos: any[] = [
    { ...pedidosPendentes[0], motoristaNome:'Carlos Eduardo Rocha', motoristaId:'mot-003', status:'em_andamento' },
  ]

  const statusLabel: Record<string,string> = { pendente:'Pendente', aceito:'Aceito', em_andamento:'Em Andamento', concluido:'Concluído', cancelado:'Cancelado' }
  const statusColor: Record<string,string> = { pendente:'#f59e0b', aceito:'#3b82f6', em_andamento:'#10b981', concluido:'#6b7280', cancelado:'#ef4444' }
  const motStatusColor: Record<string,string> = { disponivel:'#10b981', ocupado:'#f59e0b', offline:'#6b7280' }
  const motStatusBg: Record<string,string> = { disponivel:'rgba(16,185,129,.15)', ocupado:'rgba(245,158,11,.15)', offline:'rgba(107,114,128,.15)' }

  return (
    <div style={{paddingBottom:80, minHeight:'100vh', background:'#0a0a0a'}}>
      <div style={{padding:'16px 20px', background:'linear-gradient(180deg,#1a0000,#0a0a0a)', borderBottom:'1px solid rgba(220,38,38,.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:38,height:38,background:'linear-gradient(135deg,#dc2626,#991b1b)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🏍️</div>
            <div><h3 className="font-display" style={{fontSize:15,color:'#fff',lineHeight:1.2}}>Rota Express</h3><p style={{fontSize:10,color:'#dc2626',letterSpacing:'.12em',textTransform:'uppercase'}}>Painel Administrativo</p></div>
          </div>
          <button onClick={()=>irPara('SelecaoDePerfil')} style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',color:'#aaa',padding:'6px 12px',borderRadius:8,fontSize:12,cursor:'pointer',fontFamily:'Oswald',textTransform:'uppercase',letterSpacing:'.04em'}}>Sair</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
          {[
            {l:'Total',v:stats.total,c:'#fff'},{l:'Disponíveis',v:stats.disponivel,c:'#10b981'},
            {l:'Em Corrida',v:stats.ocupado,c:'#f59e0b'},{l:'Offline',v:stats.offline,c:'#6b7280'}
          ].map(s=>(
            <div key={s.l} style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:10,padding:'10px 8px',textAlign:'center'}}>
              <p className="font-display" style={{fontSize:22,color:s.c,lineHeight:1}}>{s.v}</p>
              <p style={{fontSize:10,color:'#666',marginTop:3}}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'flex',padding:'8px 16px',gap:6,borderBottom:'1px solid rgba(255,255,255,.05)',background:'#0a0a0a',position:'sticky',top:0,zIndex:10}}>
        {[['cadastro','➕ Cadastrar'],['lista','👥 Motoristas'],['monitor','📡 Monitor']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k as any)} style={{flex:1,background:tab===k?'linear-gradient(135deg,#dc2626,#b91c1c)':'transparent',color:tab===k?'#fff':'#555',border:'none',padding:'10px 4px',borderRadius:8,fontSize:11,fontFamily:'Oswald',fontWeight:600,textTransform:'uppercase',letterSpacing:'.04em',cursor:'pointer',transition:'all .2s'}}>{l}</button>
        ))}
      </div>

      {tab==='cadastro' && (
        <div className="anim-up" style={{padding:'16px 20px'}}>
          <h4 className="font-display" style={{fontSize:16,color:'#fff',marginBottom:4}}>Novo Motorista</h4>
          <p style={{fontSize:13,color:'#666',marginBottom:20}}>Preencha os dados para cadastrar na frota</p>
          {sucessoCadastro && <div className="anim-in" style={{background:'rgba(16,185,129,.12)',border:'1px solid rgba(16,185,129,.25)',borderRadius:10,padding:'12px 16px',marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:18}}>✅</span><p style={{fontSize:13,color:'#10b981'}}>Motorista cadastrado com sucesso!</p></div>}
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {l:'Nome completo',v:formNome,s:setFormNome,p:'Ex: João da Silva',t:'text',ic:'👤'},
              {l:'CNH',v:formCnh,s:setFormCnh,p:'Ex: SP-12.345.678',t:'text',ic:'🪪'},
              {l:'Placa da moto',v:formPlaca,s:setFormPlaca,p:'Ex: BRA-2E19',t:'text',ic:'🏍️'},
              {l:'Modelo da moto',v:formModelo,s:setFormModelo,p:'Ex: Honda CG 160 Fan',t:'text',ic:'🛵'},
              {l:'Telefone',v:formTelefone,s:setFormTelefone,p:'(11) 90000-0000',t:'tel',ic:'📱'},
            ].map(f=>(
              <div key={f.l}>
                <label style={{fontSize:12,color:'#888',fontFamily:'Oswald',textTransform:'uppercase',letterSpacing:'.06em',display:'block',marginBottom:6}}>{f.ic} {f.l}</label>
                <input type={f.t} value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p} className="input-dark" style={{width:'100%',padding:'11px 14px',borderRadius:8,fontSize:14}} />
              </div>
            ))}
          </div>
          <button onClick={handleCadastrar} className="btn-primary" style={{width:'100%',padding:'13px',borderRadius:10,marginTop:20,fontSize:15}}>Cadastrar Motorista</button>
        </div>
      )}

      {tab==='lista' && (
        <div className="anim-up" style={{padding:'12px 16px',display:'flex',flexDirection:'column',gap:10}}>
          <h4 className="font-display" style={{fontSize:14,color:'#666',padding:'0 4px 4px'}}>{motoristas.length} motorista{motoristas.length!==1?'s':''} na frota</h4>
          {motoristas.map((m: any, i: number) => {
            const isExp = motoristaExpandido===m.id
            return (
              <div key={m.id} className="anim-slide" style={{animationDelay:`${i*.06}s`,background:'#141414',border:`1px solid ${isExp?'rgba(220,38,38,.3)':'rgba(255,255,255,.06)'}`,borderRadius:12,overflow:'hidden',transition:'all .2s'}}>
                <div onClick={()=>setMotoristaExpandido(isExp?null:m.id)} style={{padding:'14px 16px',display:'flex',alignItems:'center',gap:12,cursor:'pointer'}}>
                  <div style={{position:'relative',flexShrink:0}}>
                    <img src={m.foto} alt="" style={{width:44,height:44,borderRadius:'50%',objectFit:'cover',border:`2px solid ${motStatusColor[m.status]}40`}} />
                    <div style={{position:'absolute',bottom:-1,right:-1,width:14,height:14,background:motStatusColor[m.status],borderRadius:'50%',border:'2.5px solid #141414'}} />
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontFamily:'Oswald',fontSize:14,fontWeight:500,color:'#fff',textTransform:'uppercase'}}>{m.nome}</p>
                    <p style={{fontSize:12,color:'#666',marginTop:1}}>{m.modeloMoto} • {m.placaMoto}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{fontFamily:'Oswald',fontSize:12,color:m.avaliacao>=4.7?'#fbbf24':m.avaliacao>=4.5?'#10b981':'#f59e0b'}}>⭐ {m.avaliacao}</span>
                    <span style={{background:motStatusBg[m.status],color:motStatusColor[m.status],padding:'2px 8px',borderRadius:20,fontSize:10,fontFamily:'Oswald',textTransform:'uppercase',letterSpacing:'.04em',whiteSpace:'nowrap'}}>{m.status==='disponivel'?'DISPONÍVEL':m.status==='ocupado'?'EM CORRIDA':'OFFLINE'}</span>
                  </div>
                </div>
                {isExp && (
                  <div className="anim-up" style={{padding:'0 16px 14px',borderTop:'1px solid rgba(255,255,255,.04)'}}>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:12,marginBottom:12}}>
                      <div style={{background:'rgba(255,255,255,.03)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                        <p className="font-display" style={{fontSize:18,color:'#fff'}}>{m.corridasRealizadas}</p>
                        <p style={{fontSize:10,color:'#555',marginTop:2}}>Corridas</p>
                      </div>
                      <div style={{background:'rgba(255,255,255,.03)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                        <p className="font-display" style={{fontSize:18,color:'#fbbf24'}}>⭐ {m.avaliacao}</p>
                        <p style={{fontSize:10,color:'#555',marginTop:2}}>Avaliação</p>
                      </div>
                      <div style={{background:'rgba(255,255,255,.03)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                        <p className="font-display" style={{fontSize:11,color:'#dc2626'}}>{m.cnh}</p>
                        <p style={{fontSize:10,color:'#555',marginTop:2}}>CNH</p>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={()=>toggleStatus(m.id)} style={{flex:1,background:m.status==='offline'?'rgba(16,185,129,.12)':'rgba(245,158,11,.12)',color:m.status==='offline'?'#10b981':'#f59e0b',border:`1px solid ${m.status==='offline'?'rgba(16,185,129,.25)':'rgba(245,158,11,.25)'}`,padding:'8px',borderRadius:8,fontSize:12,fontFamily:'Oswald',textTransform:'uppercase',letterSpacing:'.04em',cursor:'pointer'}}>
                        {m.status==='offline'?'✅ Ativar':m.status==='disponivel'?'⏸ Pausar':'🔴 Offline'}
                      </button>
                      <button style={{background:'rgba(220,38,38,.1)',color:'#dc2626',border:'1px solid rgba(220,38,38,.2)',padding:'8px 12px',borderRadius:8,fontSize:11,fontFamily:'Oswald',textTransform:'uppercase',cursor:'pointer'}}>📋</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab==='monitor' && (
        <div className="anim-up" style={{padding:'12px 16px',display:'flex',flexDirection:'column',gap:14}}>
          <h4 className="font-display" style={{fontSize:14,color:'#666'}}>Monitoramento em Tempo Real</h4>
          {pedidosAtivos.length===0 && pedidosPendentes.length===0 ? (
            <div style={{textAlign:'center',padding:'40px 20px'}}><p style={{fontSize:40,marginBottom:12}}>✅</p><p style={{color:'#555',fontSize:14}}>Tudo em ordem. Nenhuma corrida ativa no momento.</p></div>
          ) : (
            <>
              {pedidosAtivos.length>0 && <p className="font-display" style={{fontSize:12,color:'#10b981',letterSpacing:'.06em'}}>● EM ANDAMENTO ({pedidosAtivos.length})</p>}
              {pedidosAtivos.map((p:any)=>(
                <div key={p.id} style={{background:'#141414',border:'1px solid rgba(16,185,129,.15)',borderRadius:12,overflow:'hidden'}}>
                  <div onClick={()=>setPedidoExpandido(pedidoExpandido===p.id?null:p.id)} style={{padding:'14px 16px',cursor:'pointer'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{fontSize:20}}>{p.tipo==='corrida'?'🏍️':'📦'}</span>
                        <div>
                          <p className="font-display" style={{fontSize:13,color:'#fff'}}>{p.clienteNome}</p>
                          <p style={{fontSize:11,color:'#666'}}>{p.id.toUpperCase()} • {p.tipo==='corrida'?'Corrida':'Entrega'}</p>
                        </div>
                      </div>
                      <div style={{textAlign:'right'}}><p className="font-display" style={{fontSize:16,color:'#10b981'}}>R$ {p.valor.toFixed(2).replace('.',',')}</p></div>
                    </div>
                    <div style={{background:'rgba(255,255,255,.02)',borderRadius:8,padding:'10px 12px',marginBottom:8}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}><div style={{width:8,height:8,background:'#10b981',borderRadius:'50%',flexShrink:0}}/><p style={{fontSize:12,color:'#ccc'}}>{p.origem.rua}, {p.origem.numero} — {p.origem.bairro}</p></div>
                      <div style={{width:1.5,height:12,background:'rgba(255,255,255,.08)',marginLeft:3.5,marginBottom:6}}/>
                      <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,background:'#dc2626',borderRadius:'50%',flexShrink:0}}/><p style={{fontSize:12,color:'#ccc'}}>{p.destino.rua}, {p.destino.numero} — {p.destino.bairro}</p></div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',gap:12,alignItems:'center'}}>
                        <span style={{background:'rgba(16,185,129,.12)',color:'#10b981',padding:'2px 8px',borderRadius:20,fontSize:10,fontFamily:'Oswald',textTransform:'uppercase'}}>Em Andamento</span>
                        <span style={{fontSize:11,color:'#666'}}>{p.distanciaKm} km • {p.tempoEstimadoMin} min</span>
                      </div>
                      <p style={{fontSize:11,color:'#dc2626',fontFamily:'Oswald'}}>🟢 {p.motoristaNome}</p>
                    </div>
                  </div>
                </div>
              ))}
              {pedidosPendentes.length>0 && <p className="font-display" style={{fontSize:12,color:'#f59e0b',letterSpacing:'.06em'}}>● AGUARDANDO MOTORISTA ({pedidosPendentes.length})</p>}
              {pedidosPendentes.map((p:any)=>(
                <div key={p.id} style={{background:'#141414',border:'1px solid rgba(245,158,11,.15)',borderRadius:12,padding:'14px 16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontSize:20}}>{p.tipo==='corrida'?'🏍️':'📦'}</span>
                      <div><p className="font-display" style={{fontSize:13,color:'#fff'}}>{p.clienteNome}</p><p style={{fontSize:11,color:'#666'}}>{p.id.toUpperCase()}</p></div>
                    </div>
                    <p className="font-display" style={{fontSize:16,color:'#f59e0b'}}>R$ {p.valor.toFixed(2).replace('.',',')}</p>
                  </div>
                  <div style={{background:'rgba(255,255,255,.02)',borderRadius:8,padding:'10px 12px',marginBottom:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}><div style={{width:8,height:8,background:'#10b981',borderRadius:'50%',flexShrink:0}}/><p style={{fontSize:12,color:'#ccc'}}>{p.origem.rua}, {p.origem.numero} — {p.origem.bairro}</p></div>
                    <div style={{width:1.5,height:10,background:'rgba(255,255,255,.08)',marginLeft:3.5,marginBottom:4}}/>
                    <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,background:'#dc2626',borderRadius:'50%',flexShrink:0}}/><p style={{fontSize:12,color:'#ccc'}}>{p.destino.rua}, {p.destino.numero} — {p.destino.bairro}</p></div>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{background:'rgba(245,158,11,.12)',color:'#f59e0b',padding:'2px 8px',borderRadius:20,fontSize:10,fontFamily:'Oswald',textTransform:'uppercase'}}>Pendente</span>
                    <span style={{fontSize:11,color:'#ef4444',fontFamily:'Oswald'}}>⏳ Sem motorista</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [tela, setTela] = useState('SelecaoDePerfil')
  const [perfil, setPerfil] = useState<'cliente'|'motorista'|'admin'|null>(null)
  const [motoristas, setMotoristas] = useState<any[]>([])
  const [mostrarAdm, setMostrarAdm] = useState(false)
  const [navTab, setNavTab] = useState('inicio')

  const irPara = (t: string) => { setTela(t); window.scrollTo({top:0,behavior:'smooth'}) }

  const navItems = perfil==='admin' ? [
    {key:'painel',icon:'📊',label:'Painel'},{key:'cadastrar',icon:'➕',label:'Cadastrar'},{key:'motoristas',icon:'👥',label:'Equipe'},{key:'monitor',icon:'📡',label:'Monitor'}
  ] : perfil==='motorista' ? [
    {key:'inicio',icon:'🏠',label:'Início'},{key:'pedidos',icon:'🔔',label:'Pedidos'},{key:'corrida',icon:'🏍️',label:'Corrida'},{key:'perfil',icon:'👤',label:'Perfil'}
  ] : perfil==='cliente' ? [
    {key:'inicio',icon:'🏠',label:'Início'},{key:'solicitar',icon:'➕',label:'Solicitar'},{key:'acompanhar',icon:'📍',label:'Acompanhar'},{key:'perfil',icon:'👤',label:'Perfil'}
  ] : []

  const isNavScreen = (t: string) => perfil && ['SelecaoDePerfil','LoginCadastro'].includes(t)==false && mostrarAdm===false

  return (
    <div className="phone-frame">
      {mostrarAdm ? (
        <AdmCadastroMotorista irPara={irPara} motoristas={motoristas} setMotoristas={setMotoristas} />
      ) : tela==='SelecaoDePerfil' ? (
        <SelecaoDePerfil irPara={(t:string)=>{ if(t==='LoginCadastro'){ setPerfil('cliente'); irPara('LoginCadastro') } else if(t==='Motorista'){ setPerfil('motorista'); irPara('LoginCadastro') } else if(t==='AdmCadastroMotorista'){ setMostrarAdm(true) } else if(t==='NovosPedidosMotorista'){ setPerfil('motorista'); irPara('NovosPedidosMotorista') } }} />
      ) : tela==='LoginCadastro' ? (
        <LoginCadastro irPara={(t:string)=>{ if(t==='SolicitarCorridaEntregaCliente'){ setPerfil('cliente'); irPara('SolicitarCorridaEntregaCliente') } else if(t==='NovosPedidosMotorista'){ setPerfil('motorista'); irPara('NovosPedidosMotorista') } else if(t==='AdmCadastroMotorista'){ setMostrarAdm(true) } else { irPara(t) } }} perfil={perfil||'cliente'} setPerfil={setPerfil} />
      ) : tela==='SolicitarCorridaEntregaCliente' ? (
        <SolicitarCorridaEntregaCliente irPara={irPara} />
      ) : tela==='AcompanhamentoDoTrajetoCliente' ? (
        <AcompanhamentoDoTrajetoCliente irPara={irPara} />
      ) : tela==='NovosPedidosMotorista' ? (
        <NovosPedidosMotorista irPara={irPara} />
      ) : tela==='CorridaEmAndamentoMotorista' ? (
        <CorridaEmAndamentoMotorista irPara={irPara} />
      ) : (
        <SelecaoDePerfil irPara={setTela} />
      )}

      {isNavScreen(tela) && navItems.length>0 && (
        <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:'rgba(10,10,10,.97)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(220,38,38,.15)',display:'flex',paddingBottom:'env(safe-area-inset-bottom,0px)',zIndex:100}}>
          {navItems.map(item=>{
            const isActive = navTab===item.key || (tela==='SolicitarCorridaEntregaCliente'&&item.key==='solicitar') || (tela==='AcompanhamentoDoTrajetoCliente'&&item.key==='acompanhar') || (tela==='NovosPedidosMotorista'&&item.key==='pedidos') || (tela==='CorridaEmAndamentoMotorista'&&item.key==='corrida')
            const telaMap: Record<string,string> = { inicio:'LoginCadastro', solicitar:'SolicitarCorridaEntregaCliente', acompanhar:'AcompanhamentoDoTrajetoCliente', pedidos:'NovosPedidosMotorista', corrida:'CorridaEmAndamentoMotorista', perfil:'LoginCadastro', painel:'AdmCadastroMotorista', cadastrar:'AdmCadastroMotorista', motoristas:'AdmCadastroMotorista', monitor:'AdmCadastroMotorista' }
            return (
              <button key={item.key} onClick={()=>{ setNavTab(item.key); irPara(telaMap[item.key]||item.key) }} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'10px 4px 8px',background:'transparent',border:'none',color:isActive?'#dc2626':'#444',cursor:'pointer',transition:'color .2s',fontFamily:'Source Sans 3'}}>
                <span style={{fontSize:20,lineHeight:1}}>{item.icon}</span>
                <span style={{fontFamily:'Oswald',fontSize:9,textTransform:'uppercase',letterSpacing:'.05em',fontWeight:500}}>{item.label}</span>
                {isActive && <div style={{width:16,height:2.5,background:'#dc2626',borderRadius:2,position:'absolute',bottom:6}}/>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}