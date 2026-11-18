# Site institucional — Consultoria de Tecnologia e IA

Landing page institucional responsiva em **React 18 + Vite 6**, com CSS próprio e ícones Lucide. Conteúdo em português do Brasil, com foco em software, inteligência artificial e automação.

A primeira dobra inclui uma visualização conceitual de rede neural em Canvas, com agentes de pesquisa, planejamento e execução ligados a um orquestrador. O grafo usa 930 nós no desktop e 288 no celular. As conexões são pré-renderizadas para preservar o desempenho; a animação pausa fora da tela e é desativada para quem prefere movimento reduzido.

## Executar localmente

Requisitos: Node.js 22.18.0 (versão usada também no build do Render).

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite (normalmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

A pasta `dist/` contém o site estático gerado pelo Vite.

## Casos de uso

Os dez cards da seção **Onde atuamos** abrem páginas em `/casos/<segmento>`. Cada página apresenta um projeto conceitual com desafio, fluxograma, arquitetura de referência e interface ilustrativa. Esses exemplos não são cases realizados nem aplicações funcionais.

Os textos e dados das páginas ficam em `src/cases.js`; a apresentação compartilhada fica em `src/CasePage.jsx` e `src/case-page.css`. Para testar uma URL diretamente, por exemplo, abra `/casos/industria` no servidor local. No Render, a regra de rewrite em `render.yaml` permite acessar e atualizar essas URLs sem passar pela página inicial.

## Publicar no Render

O arquivo `render.yaml` configura um **Static Site** com `npm ci && npm run build` e diretório de publicação `dist`. O arquivo `.node-version` fixa a versão do Node.js usada no build.

1. Envie este projeto para um repositório Git acessível pelo Render.
2. No painel do Render, crie um **Blueprint** a partir do repositório. O Render lerá `render.yaml` na raiz.
3. Na criação, informe `VITE_COMPANY_NAME` (nome exibido no site) e `VITE_CONTACT_EMAIL` (e-mail público de contato). Essas variáveis são incorporadas aos arquivos do site durante o build; não coloque segredos em variáveis `VITE_`.
4. Revise o título e as descrições em `index.html` para refletirem a marca antes da publicação definitiva. O nome configurado via variável não altera esses metadados automaticamente.
5. Após o deploy, abra a URL `onrender.com` fornecida pelo Render e confira a navegação, o favicon e o contato. Para usar um domínio próprio, configure-o no painel do serviço e siga as instruções de DNS do Render.

Também é possível criar um **Static Site** manualmente com build command `npm ci && npm run build`, publish directory `dist` e as mesmas variáveis de ambiente. Se alterar qualquer variável `VITE_` depois, faça um novo deploy para atualizar os arquivos publicados.

O formulário apenas prepara uma mensagem `mailto:` no aplicativo de e-mail do visitante. O Render não fornece envio automático para esse formulário.

## Personalizar

1. Copie `.env.example` para `.env.local` e preencha `VITE_COMPANY_NAME` e `VITE_CONTACT_EMAIL`.
2. Atualize o título e os metadados em `index.html` com a marca definitiva.
3. Substitua o símbolo genérico em `src/main.jsx` e `public/favicon.svg` pelo logotipo definitivo.
4. Edite os serviços e segmentos em `src/main.jsx`, se necessário.
5. Ajuste as cores e a tipografia em `src/styles.css`.

Enquanto o nome não for definido, o site usa o nome descritivo “Consultoria Digital”. Sem um e-mail configurado, a seção de contato exibe uma mensagem de preparação e não oferece um formulário inoperante.

## Formulário

Com `VITE_CONTACT_EMAIL` configurado, o formulário usa `mailto:` para preparar a mensagem no aplicativo de e-mail do visitante. **Não há backend nem envio automático.** O visitante precisa confirmar o envio no aplicativo de e-mail. Para envio direto pelo site, integrar um backend ou serviço seguro, com validação no servidor e proteção antispam. Avaliar os requisitos de privacidade e LGPD antes de coletar ou armazenar dados.

## Codex

Abra esta pasta no VS Code com Codex. O arquivo `AGENTS.md` contém orientações para modificações.

## Observações

- Não foram incluídos depoimentos, clientes, certificações ou números fictícios.
- O nome, os metadados e o símbolo genéricos devem ser substituídos antes da publicação definitiva.
- Fontes externas são carregadas do Google Fonts; se necessário, hospede-as localmente.
