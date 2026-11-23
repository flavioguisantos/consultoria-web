import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, ChevronDown, Code2, Database, FileSearch, Layers3, Mail, Menu, ShieldCheck, Smartphone, Workflow, X, Cloud } from 'lucide-react';
import './styles.css';
import NeuralNetwork from './NeuralNetwork.jsx';
import CasePage from './CasePage.jsx';
import { cases } from './cases.js';

const COMPANY = {
  name: import.meta.env.VITE_COMPANY_NAME?.trim() || 'DESPARTECH AI Solutions',
  email: import.meta.env.VITE_CONTACT_EMAIL?.trim() || '',
};

const services = [
  { icon: Code2, title: 'Software sob medida', description: 'Produtos digitais, plataformas e sistemas corporativos desenhados para a realidade da sua operação.', tags: ['Web apps', 'SaaS', 'APIs'] },
  { icon: BrainCircuit, title: 'Inteligência artificial', description: 'Agentes, assistentes e aplicações de IA conectados a processos e dados do seu negócio.', tags: ['Agentes de IA', 'RAG', 'LLMs'] },
  { icon: Workflow, title: 'Automação inteligente', description: 'Integrações e fluxos que reduzem tarefas repetitivas e dão mais espaço ao trabalho estratégico.', tags: ['Workflows', 'RPA', 'Integrações'] },
  { icon: Smartphone, title: 'Aplicativos mobile', description: 'Experiências para iOS e Android com foco em clareza, desempenho e evolução.' },
  { icon: Cloud, title: 'Cloud e arquitetura', description: 'Modernização, infraestrutura e arquitetura para sustentar novas demandas.' },
  { icon: Database, title: 'Dados e analytics', description: 'Engenharia de dados, painéis e análises para orientar decisões.' },
  { icon: FileSearch, title: 'Gestão documental', description: 'OCR, busca inteligente e extração de informações em fluxos documentais.' },
  { icon: ShieldCheck, title: 'Consultoria tecnológica', description: 'Diagnóstico, estratégia e direção técnica para evoluir sistemas e equipes.' },
];
const steps = [
  { title: 'Entender', description: 'Investigamos contexto, objetivos e restrições antes de desenhar a solução.' },
  { title: 'Desenhar', description: 'Definimos prioridades, experiência e arquitetura com uma direção clara.' },
  { title: 'Construir', description: 'Entregamos em etapas, com validação frequente e qualidade de engenharia.' },
  { title: 'Evoluir', description: 'Acompanhamos o uso e ajustamos o produto conforme o negócio avança.' },
];
const number = index => String(index + 1).padStart(2, '0');

function Brand() {
  return <a className="brand" href="#inicio" aria-label={`${COMPANY.name}, voltar ao início`}><span className="brand-mark" aria-hidden="true"><Layers3 size={22} strokeWidth={1.8} /></span><span>{COMPANY.name}<small>ENGENHARIA + INTELIGÊNCIA</small></span></a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailPrepared, setEmailPrepared] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const update = (field, value) => setForm(current => ({ ...current, [field]: value }));
  useEffect(() => {
    const closeOnEscape = event => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, []);
  function submit(event) {
    event.preventDefault();
    if (!COMPANY.email) return;
    const subject = encodeURIComponent(`Contato sobre ${form.service || 'consultoria'}`);
    const body = encodeURIComponent(`Nome: ${form.name}\nE-mail: ${form.email}\nEmpresa: ${form.company || 'Não informada'}\nÁrea de interesse: ${form.service || 'Não informada'}\n\nMensagem:\n${form.message}`);
    setEmailPrepared(true);
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
  }
  return <>
    <header className="header"><div className="container nav"><Brand /><nav id="main-navigation" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Navegação principal"><a href="#servicos" onClick={() => setMenuOpen(false)}>Soluções</a><a href="#diferenciais" onClick={() => setMenuOpen(false)}>Abordagem</a><a href="#processo" onClick={() => setMenuOpen(false)}>Processo</a><a href="#segmentos" onClick={() => setMenuOpen(false)}>Segmentos</a><a className="mobile-contact" href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></nav><a className="nav-cta" href={COMPANY.email ? "#contato" : "#diferenciais"}>{COMPANY.email ? "Vamos conversar" : "Nossa abordagem"} <ArrowUpRight size={17} /></a><button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></header>
    <main>
      <section id="inicio" className="hero">
        <div className="hero-gridlines" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow"><span className="eyebrow-line" /> INTELIGÊNCIA ARTIFICIAL + ENGENHARIA</span>
            <h1>Conectamos ideias. Criamos <span>inteligência.</span></h1>
            <p>Unimos software, dados e IA para transformar desafios complexos em soluções que movem o seu negócio.</p>
            <div className="hero-actions">
              <a href={COMPANY.email ? "#contato" : "#servicos"} className="btn btn-primary">{COMPANY.email ? "Conte seu desafio" : "Explore as soluções"} <ArrowUpRight size={19} /></a>
              <a href={COMPANY.email ? "#servicos" : "#processo"} className="btn btn-ghost">{COMPANY.email ? "Conheça as soluções" : "Como trabalhamos"} <ArrowRight size={18} /></a>
            </div>
            <div className="hero-index"><span>DADOS</span><i /><span>INTELIGÊNCIA</span><i /><span>EVOLUÇÃO</span></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <NeuralNetwork />
            <div className="neural-orbit orbit-one" />
            <div className="neural-orbit orbit-two" />
            <div className="neural-core"><span className="neural-core-inner"><BrainCircuit size={43} strokeWidth={1.2} /><strong>IA</strong><small>ORQUESTRADOR</small></span></div>
            <div className="agent-card agent-research"><span>AGENTE 01</span><strong>PESQUISA</strong><small><i /> analisando contexto</small></div>
            <div className="agent-card agent-plan"><span>AGENTE 02</span><strong>PLANEJAMENTO</strong><small><i /> definindo caminhos</small></div>
            <div className="agent-card agent-execute"><span>AGENTE 03</span><strong>EXECUÇÃO</strong><small><i /> conectando soluções</small></div>
            <span className="neural-caption">REDE DE AGENTES · VISUALIZAÇÃO CONCEITUAL</span>
          </div>
        </div>
        <div className="container hero-bottom"><span>ENGENHARIA PARA O PRÓXIMO PASSO</span><span className="hero-bottom-rule" /><a href="#servicos">EXPLORAR SOLUÇÕES <ChevronDown size={16} /></a></div>
      </section>
      <section className="intro section"><div className="container intro-grid"><div><span className="section-label">O QUE NOS MOVE</span><h2>Menos complexidade.<br /><em>Mais direção.</em></h2></div><div><p>Unimos visão de negócio, engenharia e inteligência artificial para criar tecnologia que funciona na prática — do primeiro desenho à operação.</p><a className="text-link" href="#diferenciais">Conheça nossa abordagem <ArrowUpRight size={17} /></a></div></div></section>
      <section id="servicos" className="services section"><div className="container"><div className="section-top"><div><span className="section-label">O QUE FAZEMOS</span><h2>Capacidade técnica.<br /><em>Visão de negócio.</em></h2></div><p>Escolhemos as ferramentas certas para cada desafio, com soluções que podem crescer junto com a operação.</p></div><div className="featured-services">{services.slice(0, 3).map((service, index) => <article className="featured-card" key={service.title}><div className="featured-top"><span>{number(index)} / SOLUÇÃO</span><service.icon size={28} strokeWidth={1.5} /></div><div><h3>{service.title}</h3><p>{service.description}</p><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a href={COMPANY.email ? "#contato" : "#processo"} aria-label={COMPANY.email ? `Conversar sobre ${service.title}` : `Conhecer o processo para ${service.title}`}><ArrowUpRight size={21} /></a></article>)}</div><div className="capabilities"><div className="capabilities-heading"><span className="section-label">OUTRAS ESPECIALIDADES</span><p>Uma atuação completa para apoiar cada fase do seu projeto.</p></div><div className="capabilities-list">{services.slice(3).map((service, index) => <a href="#contato" key={service.title} aria-label={`Conversar sobre ${service.title}`}><span>{number(index + 3)}</span><service.icon size={19} strokeWidth={1.7} /><strong>{service.title}</strong><ArrowUpRight size={18} /></a>)}</div></div></div></section>
      <section id="diferenciais" className="difference section"><div className="container diff-grid"><div className="diff-content"><span className="section-label">NOSSA ABORDAGEM</span><h2>Uma parceria para<br /><em>resolver de verdade.</em></h2><p>O ponto de partida é entender o problema. A partir daí, conectamos estratégia, experiência e engenharia para construir o que faz sentido para o seu negócio.</p><div className="benefits">{[['Contexto antes da tecnologia', 'As decisões começam pelo objetivo e pelas pessoas envolvidas.'], ['Clareza em cada escolha', 'Priorização, arquitetura e entregas com direção compartilhada.'], ['Espaço para evoluir', 'Soluções pensadas para acompanhar mudanças e novas necessidades.']].map(([title, description], index) => <div key={title}><span>{number(index)}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></div><div className="diff-visual" aria-hidden="true"><div className="architecture"><div className="architecture-heading"><span>MAPA DE SOLUÇÃO</span><span>↗</span></div><div className="architecture-center"><span className="architecture-ring ring-one" /><span className="architecture-ring ring-two" /><div className="architecture-core"><Layers3 size={36} strokeWidth={1.3} /><span>SEU NEGÓCIO</span></div><div className="architecture-node node-one">ESTRATÉGIA</div><div className="architecture-node node-two">ENGENHARIA</div><div className="architecture-node node-three">INTELIGÊNCIA</div></div><div className="architecture-foot"><span>VISÃO INTEGRADA</span><span>001 — 003</span></div></div></div></div></section>
      <section id="processo" className="process section"><div className="container"><div className="section-top"><div><span className="section-label">COMO TRABALHAMOS</span><h2>Um caminho claro.<br /><em>Da ideia à evolução.</em></h2></div><p>Colaboração e entregas progressivas para transformar intenção em produto.</p></div><div className="steps">{steps.map((step, index) => <article className="step" key={step.title}><span className="step-num">{number(index)}</span><div className="step-rule" /><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
      <section id="segmentos" className="sectors section"><div className="container"><div className="section-top"><div><span className="section-label">ONDE ATUAMOS</span><h2>Cada setor tem um desafio.<br /><em>Cada solução, um contexto.</em></h2></div><p>Explore projetos conceituais com fluxo, arquitetura e uma interface ilustrativa para cada segmento.</p></div><div className="sector-list">{cases.map((sector, index) => <a className="sector-card" href={`/casos/${sector.slug}`} key={sector.slug}><div className="sector-card-top"><span>{number(index)} / SEGMENTO</span><ArrowDownRight size={18} aria-hidden="true" /></div><h3>{sector.sector}</h3><strong>{sector.title}</strong><p>{sector.summary}</p><span className="sector-card-link">Explorar projeto <ArrowUpRight size={15} aria-hidden="true" /></span></a>)}</div></div></section>
      <section id="contato" className="contact section"><div className="container contact-grid"><div className="contact-intro"><span className="section-label">PRÓXIMO PASSO</span><h2>Vamos tirar sua ideia<br /><em>do papel?</em></h2><p>Conte o que você quer construir, melhorar ou automatizar. Uma boa conversa é o começo de uma solução bem pensada.</p>{COMPANY.email && <a className="contact-email" href={`mailto:${COMPANY.email}`}><Mail size={18} />{COMPANY.email}</a>}<div className="contact-aside">ATENDIMENTO REMOTO EM TODO O BRASIL <ArrowUpRight size={16} /></div></div>{COMPANY.email ? <form className="contact-form" onSubmit={submit}><span className="form-kicker">INICIE UMA CONVERSA <span>↗</span></span><div className="form-row"><label>Seu nome<input required autoComplete="name" value={form.name} onChange={event => update('name', event.target.value)} placeholder="Como podemos chamar você?" /></label><label>Seu e-mail<input type="email" required autoComplete="email" value={form.email} onChange={event => update('email', event.target.value)} placeholder="voce@empresa.com.br" /></label></div><div className="form-row"><label>Empresa<input autoComplete="organization" value={form.company} onChange={event => update('company', event.target.value)} placeholder="Nome da empresa" /></label><label>Área de interesse<select value={form.service} onChange={event => update('service', event.target.value)}><option value="">Selecione uma solução</option>{services.map(service => <option key={service.title} value={service.title}>{service.title}</option>)}<option value="Outro projeto">Outro projeto</option></select></label></div><label>Conte sobre seu projeto<textarea required rows="5" value={form.message} onChange={event => update('message', event.target.value)} placeholder="O que você gostaria de desenvolver ou automatizar?" /></label><button className="btn btn-primary submit" type="submit">Preparar e-mail <ArrowUpRight size={18} /></button><p className="form-note">Seu aplicativo de e-mail abrirá com a mensagem preenchida. Confirme o envio por lá.</p>{emailPrepared && <p className="form-feedback" role="status">Confira a mensagem no seu aplicativo de e-mail para concluir o envio.</p>}</form> : <div className="contact-pending" aria-label="Canal de contato em preparação"><Mail size={31} strokeWidth={1.4} /><span>CANAL DE CONTATO</span><h3>Em breve, vamos conversar.</h3><p>Estamos preparando um canal direto para receber novos projetos.</p></div>}</div></section>
    </main>
    <footer className="footer"><div className="container footer-top"><div><Brand /><p>Engenharia, inteligência e visão de negócio para criar o próximo passo.</p></div><div><h3>Explore</h3><a href="#servicos">Soluções</a><a href="#diferenciais">Abordagem</a><a href="#processo">Processo</a><a href="#segmentos">Segmentos</a></div><div><h3>Contato</h3><a href="#contato">{COMPANY.email ? "Vamos conversar" : "Contato em breve"}</a>{COMPANY.email && <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>}</div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
  </>;
}

const caseSlug = window.location.pathname.match(/^\/casos\/([^/]+)\/?$/)?.[1];
createRoot(document.getElementById('root')).render(caseSlug ? <CasePage caseStudy={cases.find(item => item.slug === caseSlug)} companyName={COMPANY.name} contactEmail={COMPANY.email} /> : <App />);
