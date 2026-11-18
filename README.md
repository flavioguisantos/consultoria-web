# Site institucional — Consultoria de Tecnologia e IA

Landing page institucional responsiva em **React 18 + Vite 6**, com CSS próprio e ícones Lucide. Conteúdo em português do Brasil, com foco em software, inteligência artificial e automação.

## Executar localmente

Requisitos: Node.js 20 ou superior.

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

A pasta `dist/` pode ser publicada na Vercel, Netlify, Cloudflare Pages ou hospedagem estática. Build command: `npm run build`; output directory: `dist`.

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
