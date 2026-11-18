# Orientações para o Codex

Projeto: site institucional de consultoria em engenharia de software, IA, automação, apps e soluções personalizadas.

## Stack
- React 18 com Vite 6 e JavaScript JSX.
- CSS responsivo sem framework de UI.
- lucide-react para ícones.

## Diretrizes
1. Manter idioma pt-BR, estética corporativa premium, responsividade e acessibilidade.
2. Não inventar clientes, cases, depoimentos, prêmios, certificações ou métricas.
3. Preservar os links de âncora e a navegação móvel.
4. Não incluir bibliotecas pesadas sem justificativa.
5. Ao implementar envio real do formulário, usar backend ou serviço seguro; nunca expor chaves privadas no frontend.
6. Ao adicionar analytics, cookies ou coleta de dados, avaliar requisitos de privacidade e LGPD.
7. Validar com `npm run build` após alterações.

## Primeiras tarefas recomendadas
- Substituir `COMPANY.name` e `COMPANY.email` em `src/main.jsx`.
- Implementar formulário com backend seguro e feedback de envio.
- Adicionar favicon, logo e metadados Open Graph.
- Publicar em domínio próprio e configurar HTTPS.
