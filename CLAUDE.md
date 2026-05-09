\# CLAUDE.md



Contexto persistente do projeto. Lido automaticamente pelo Claude Code em cada sessão.



\## O projeto



Modernização da página pessoal de \*\*Adelson Guaraci Jantsch\*\* (médico de família e pesquisador, atua em Brasil/Moçambique/Angola/Canadá/Reino Unido). Reconstrução de um site Flask antigo (`dashboard9-reference.py`, ignorar — só referência) em Astro estático com identidade visual nova chamada \*\*"Atlas"\*\*.



Briefing completo está em `briefing-website-pessoal.md` — anexar quando precisar de detalhe específico de seção.



\## Stack



\- Astro 6.x (já instalado, template Empty, TypeScript strict)

\- Tailwind CSS (a configurar — usar `npx astro add tailwind`)

\- Fontsource Inter Variable (`@fontsource-variable/inter`)

\- astro-icon + @iconify-json/lucide

\- Mobile-first

\- Cloudflare Pages (deploy automático em cada `git push origin main`)



\## Sistema de design Atlas



\*\*Cor de destaque:\*\* navy `#1e3a8a` (claro) / `#60a5fa` (escuro)

\*\*Paleta neutra:\*\* slate (slate-50 → slate-900)

\*\*Tipografia:\*\* Inter Variable. Headlines h1 com `font-semibold` (600) e `tracking-\[-0.035em]`. Eyebrows com `tracking-\[0.14em]` uppercase 11px.

\*\*Bordas:\*\* 0.5px (não 1px). Sem sombras dramáticas.

\*\*Tema:\*\* claro como padrão, com toggle. Persistir em localStorage.

\*\*Largura de leitura:\*\* `max-w-3xl` em prosa, `max-w-4xl` em conteúdo com componentes.



\*\*Assinatura visual do Atlas:\*\* headlines em duas linhas com a segunda linha em navy (ex: "Strengthening primary care, where people live." onde "where people live" fica em navy).



\## Regras importantes



1\. \*\*Nunca modificar `dashboard9-reference.py`\*\* — é só referência, nem deve ir para o GitHub (já está no `.gitignore`).

2\. \*\*Não recriar o projeto Astro\*\* — ele já existe e está configurado. Trabalhar a partir do que existe.

3\. \*\*Bilíngue PT/EN\*\* com i18n nativo do Astro. Default a definir com o autor antes de configurar.

4\. \*\*Mobile-first sempre.\*\* Testar em 375px e 1440px.

5\. \*\*Sem JS no servidor.\*\* Tudo estático. Simulador será "ilha" Astro com `client:load`.

6\. \*\*Acessibilidade WCAG AA\*\* em ambos os temas. HTML semântico.



\## Estrutura de páginas



| Rota | Conteúdo | Status |

|---|---|---|

| `/` | Home (hero + carrossel + mapa + cards) | A construir |

| `/impact` | Dashboard estudo Rio (curvas FM vs GP animadas) | A construir |

| `/simulate` | Simulador municipal interativo | A migrar do Flask |

| `/projects` | Projetos (hover-reveal cards) | A construir |

| `/about` | Sobre o estudo + publicações | A construir |

| `/contact` | Bio + redes sociais | A construir |



\## Sequência de fases



1\. \*\*Fase 1 (atual):\*\* Tailwind + paleta Atlas + Fontsource Inter + Base.astro + Header.astro + Footer.astro + theme toggle + i18n PT/EN

2\. \*\*Fase 2:\*\* Home (hero + carrossel + mapa + cards)

3\. \*\*Fase 3:\*\* Páginas restantes com placeholders

4\. \*\*Fase 4:\*\* Migrar lógica do simulador

5\. \*\*Fase 5:\*\* Conteúdo real, polish, deploy



\## Fluxo de trabalho



\- Após cada sub-tarefa concluída e validada com `npm run dev`: `git add . \&\& git commit -m "..." \&\& git push origin main`

\- Cloudflare Pages deploya automaticamente em \~60s

\- URL pública: https://family-medicine-impact-website.pages.dev

## Progresso

- [x] Fase 1 (Tailwind v4 via @theme, Inter Variable, Base.astro, Header/Footer, theme toggle sem FOUC, i18n PT/EN)
- [ ] Fase 2: Home (hero + carrossel + mapa + cards)
- [ ] Fase 3: Páginas restantes
- [ ] Fase 4: Simulador
- [ ] Fase 5: Polish e deploy

## Notas técnicas relevantes

- Tailwind v4 instalado — configuração via `@theme` em `src/styles/global.css`, NÃO em `tailwind.config.mjs`
- Theme toggle persistido em `localStorage` com chave `"atlas-theme"`
- Nav do Header tem links para rotas futuras que ainda dão 404 (alinhado com critério da Fase 2)
- `--color-accent` autoswap entre temas via redefinição em `.dark`, então `text-accent` e `bg-accent` funcionam direto em ambos