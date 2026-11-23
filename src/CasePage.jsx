import React, { useEffect } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BrainCircuit, Database, Layers3, Monitor, Workflow } from 'lucide-react';
import { cases } from './cases.js';
import './case-page.css';

const architectureIcons = [Database, Workflow, BrainCircuit, Monitor];

export default function CasePage({ caseStudy, companyName, contactEmail }) {
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    document.title = caseStudy ? `${caseStudy.title} | ${companyName}` : `Página não encontrada | ${companyName}`;
    if (description && caseStudy) description.content = caseStudy.summary;
    const frame = requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, [caseStudy, companyName]);

  if (!caseStudy) {
    return <main className="case-not-found container"><span className="section-label">CASO DE USO</span><h1>Página não encontrada.</h1><p>O projeto solicitado não está nesta coleção.</p><a className="btn btn-primary" href="/#segmentos">Ver todos os casos <ArrowRight size={18} /></a></main>;
  }

  const index = cases.findIndex(item => item.slug === caseStudy.slug);
  const next = cases[(index + 1) % cases.length];
  const number = String(index + 1).padStart(2, '0');

  return <div className="case-page">
    <header className="case-header">
      <div className="container case-nav">
        <a className="case-brand" href="/" aria-label={`${companyName}, página inicial`}>
          <img className="brand-mark" src="/despartech-icon.png" alt="" width="96" height="96" />
          <span>{companyName}<small>ENGENHARIA + INTELIGÊNCIA</small></span>
        </a>
        <nav aria-label="Navegação do caso"><a href="#fluxo">Fluxo</a><a href="#arquitetura">Arquitetura</a><a href="#interface">Interface</a></nav>
        <a className="case-back" href="/#segmentos"><ArrowLeft size={16} /> Todos os casos</a>
      </div>
    </header>

    <main>
      <section className="case-hero">
        <div className="container case-hero-grid">
          <div className="case-hero-copy">
            <a className="case-breadcrumb" href="/#segmentos"><ArrowLeft size={15} /> Segmentos / {caseStudy.sector}</a>
            <span className="case-kicker">CASO {number} / PROJETO CONCEITUAL</span>
            <h1>{caseStudy.title}<span>.</span></h1>
            <p>{caseStudy.summary}</p>
            <div className="case-hero-actions"><a className="btn btn-primary" href="#fluxo">Entenda o fluxo <ArrowDown size={18} /></a><a className="case-outline-link" href="#arquitetura">Ver arquitetura <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="case-map" aria-label="Resumo visual das quatro etapas do projeto">
            <div className="case-map-head"><span>VISÃO DA SOLUÇÃO</span><span>{number} / 10</span></div>
            {caseStudy.flow.map(([title], step) => <div className="case-map-row" key={title}><span>{String(step + 1).padStart(2, '0')}</span><strong>{title}</strong><span className="case-map-dot" aria-hidden="true" /></div>)}
            <div className="case-map-foot"><span>DA INFORMAÇÃO À AÇÃO</span><BrainCircuit size={24} strokeWidth={1.4} aria-hidden="true" /></div>
          </div>
        </div>
      </section>

      <section className="case-intro section">
        <div className="container case-intro-grid"><div><span className="section-label">O DESAFIO</span><h2>Onde este projeto<br /><em>faz diferença.</em></h2></div><p>{caseStudy.challenge}</p></div>
      </section>

      <section id="fluxo" className="case-flow section" aria-labelledby="case-flow-title">
        <div className="container"><div className="case-section-heading"><div><span className="section-label">01 / FLUXOGRAMA</span><h2 id="case-flow-title">Como a solução funciona.</h2></div><p>Quatro etapas, da entrada de dados até uma ação acompanhada por pessoas.</p></div>
          <ol className="case-flow-list">{caseStudy.flow.map(([title, detail], step) => <li key={title}><span className="case-flow-number">{String(step + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol>
        </div>
      </section>

      <section id="arquitetura" className="case-architecture section" aria-labelledby="case-architecture-title">
        <div className="container"><div className="case-section-heading"><div><span className="section-label">02 / ARQUITETURA DE REFERÊNCIA</span><h2 id="case-architecture-title">As peças que se conectam.</h2></div><p>Uma visão conceitual dos componentes. A implementação final depende dos sistemas e dados disponíveis.</p></div>
          <ol className="case-architecture-list">{caseStudy.architecture.map(([layer, title, detail], step) => { const Icon = architectureIcons[step]; return <li key={layer}><div className="case-layer-head"><span>{String(step + 1).padStart(2, '0')} / {layer}</span><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></div><h3>{title}</h3><p>{detail}</p></li>; })}</ol>
          <p className="case-architecture-note"><span aria-hidden="true">↗</span> Os dados seguem da origem para a operação; o retorno das equipes ajuda a ajustar o sistema.</p>
        </div>
      </section>

      <section id="interface" className="case-interface section" aria-labelledby="case-interface-title">
        <div className="container"><div className="case-section-heading"><div><span className="section-label">03 / INTERFACE ILUSTRATIVA</span><h2 id="case-interface-title">Como seria usar o produto.</h2></div><p>Uma amostra visual do tipo de informação que a equipe poderia consultar.</p></div>
          <div className="case-interface-grid">
            <div className="case-product" aria-label={`Exemplo de interface: ${caseStudy.preview.title}`}>
              <div className="case-product-bar"><div className="case-window-dots" aria-hidden="true"><i /><i /><i /></div><span>DEMONSTRAÇÃO CONCEITUAL</span><span className="case-product-mark" aria-hidden="true"><Layers3 size={16} /></span></div>
              <div className="case-product-body"><aside aria-hidden="true"><span>PAINEL</span><span className="selected">Visão geral</span><span>Atividades</span><span>Histórico</span></aside><div className="case-product-main"><div className="case-product-title"><div><small>VISÃO OPERACIONAL</small><h3>{caseStudy.preview.title}</h3></div><span className="case-live"><i /> Exemplo</span></div><div className="case-product-rows">{caseStudy.preview.rows.map(([label, state, detail]) => <div className="case-product-row" key={label}><div><strong>{label}</strong><small>{detail}</small></div><span>{state}</span></div>)}</div><div className="case-product-action"><span>PRÓXIMA AÇÃO</span><strong>{caseStudy.preview.action} <ArrowUpRight size={15} aria-hidden="true" /></strong></div></div></div>
            </div>
            <aside className="case-guidance"><span className="section-label">DECISÃO RESPONSÁVEL</span><h3>O que precisa de atenção.</h3><p>{caseStudy.guardrail}</p><div className="case-guidance-rule" /><span className="case-note">Os dados e estados mostrados na interface são apenas ilustrativos.</span></aside>
          </div>
        </div>
      </section>

      <section className="case-next"><div className="container case-next-grid"><div><span className="section-label">CONTINUE EXPLORANDO</span><h2>Conheça outro cenário.</h2></div><a href={`/casos/${next.slug}`}><span>{next.sector}</span><strong>{next.title}</strong><ArrowRight size={24} aria-hidden="true" /></a></div></section>
    </main>

    <footer className="case-footer"><div className="container"><span>© {new Date().getFullYear()} {companyName}. Casos conceituais.</span><div><a href="/#segmentos">Todos os casos</a><a href={contactEmail ? '/#contato' : '/#processo'}>{contactEmail ? 'Fale sobre seu projeto' : 'Nossa abordagem'} <ArrowUpRight size={15} aria-hidden="true" /></a></div></div></footer>
  </div>;
}
