# CLAUDE.md

Contexto persistente do projeto. Lido automaticamente pelo Claude Code em cada sessão.

## O projeto

Modernização da página pessoal de **Adelson Guaraci Jantsch** (médico de família e pesquisador, atua em Brasil/Moçambique/Angola/Canadá/Reino Unido). Reconstrução de um site Flask antigo (`dashboard9-reference.py`, ignorar — só referência) em Astro estático com identidade visual nova chamada **"Atlas"**.

Briefing completo está em `briefing-website-pessoal.md` — anexar quando precisar de detalhe específico de seção.

## Stack

- Astro 6.x (template Empty, TypeScript strict)
- Tailwind CSS v4 (configurado via `@theme` em `src/styles/global.css`, NÃO em `tailwind.config.mjs`)
- Fontsource Inter Variable (`@fontsource-variable/inter`)
- astro-icon + @iconify-json/lucide
- Mobile-first
- Cloudflare Pages (deploy automático em cada `git push origin main`)
- URL pública: https://family-medicine-impact-website.pages.dev

## Sistema de design Atlas

**Cor de destaque:** navy `#1e3a8a` (claro) / `#60a5fa` (escuro)
**Paleta neutra:** slate (slate-50 → slate-900)
**Tipografia:** Inter Variable. Headlines h1 com `font-semibold` (600) e `tracking-[-0.035em]`. Eyebrows com `tracking-[0.14em]` uppercase 11px.
**Bordas:** 0.5px (não 1px). Sem sombras dramáticas.
**Tema:** claro como padrão, com toggle. Persistido em localStorage com chave `"atlas-theme"`.
**Largura de leitura:** `max-w-3xl` em prosa, `max-w-4xl` em conteúdo com componentes.
**Container central:** `max-w-4xl mx-auto px-4 md:px-8 lg:px-12`

**Assinatura visual do Atlas:** headlines em duas linhas com a segunda linha em navy (ex: "Strengthening primary care, where people live." onde "where people live" fica em navy).

**Autoswap de tema:** `--color-accent` redefinido em `.dark`, então `text-accent` e `bg-accent` funcionam direto em ambos os temas.

## Regras importantes

1. **Nunca modificar `dashboard9-reference.py`** — é só referência, está no `.gitignore`.
2. **Não recriar o projeto Astro** — já existe e está configurado. Trabalhar a partir do que existe.
3. **Bilíngue PT/EN** com i18n nativo do Astro. Default PT, EN é variante traduzida.
4. **Mobile-first sempre.** Testar em 375px e 1440px.
5. **Sem JS no servidor.** Tudo estático. Componentes interativos (slider de impacto, simulador) são "ilhas" Astro com `client:load`.
6. **Acessibilidade WCAG AA** em ambos os temas. HTML semântico.
7. **Nunca usar caixas de escolha (ask_user_input_v0) no diálogo com o usuário.** Apresentar perguntas numeradas em texto. Usuário responde por escrito.

## Estrutura de páginas

| Rota PT | Rota EN | Conteúdo | Status |
|---|---|---|---|
| `/` | `/en/` | Home (hero + carrossel + cards) | ✅ pronto |
| `/sobre` | `/en/about` | Bio em 1ª pessoa + foto + redes | ✅ pronto |
| `/projetos` | `/en/projects` | 6 projetos em tabs (Rio, UNA-SUS, Angola, Moçambique, Besrour, Find the evidence) | ✅ pronto |
| `/impacto` | `/en/impact` | Dashboard estudo Rio com barra de proporção sticky | ✅ pronto |
| `/simulador` | `/en/simulator` | Simulador municipal com custos SIGTAP | ✅ pronto |
| `/impacto-visual` | `/en/visual-impact` | Bubble charts experimentais (4 categorias) | 🧪 experimental — decisão pendente |

## Sequência de fases

1. ✅ **Fase 1:** Tailwind v4 + paleta Atlas + Fontsource Inter + Base.astro + Header/Footer + theme toggle sem FOUC + i18n PT/EN
2. ✅ **Fase 2A:** Hero refinado (eyebrow + headline em duas linhas com navy + subline + 2 CTAs)
3. ✅ **Fase 2B:** Carrossel argumentativo de 8 slides
4. ❌ **Fase 2C:** Mapa-múndi — descartado (parecia medieval). Geografia ficou em /sobre e /projetos.
5. ✅ **Fase 2D:** Cards de próximos passos (Impact, Simulator, Projects)
6. ✅ **Fase 3A:** Página /sobre
7. ✅ **Fase 3B:** Página /projetos (tabs com URL hash sync, agora com 6ª tab Find the evidence)
8. ❌ **Fase 3D:** Página /contato — descartada (contatos consolidados em /sobre + footer)
9. ✅ **Fase 3C:** Página /impacto (dashboard interativo completo)
10. ✅ **Fase 4:** Simulador municipal com custos SIGTAP
11. 🧪 **Extra experimental:** Bubble charts (`/impacto-visual`) — decisão pendente
12. 📅 **Fase 5 (atual):** Polish + migração do domínio Railway → Cloudflare

## Fluxo de trabalho

- Após cada sub-tarefa concluída e validada com `npm run dev`: `git add . && git commit -m "..." && git push origin main`
- Cloudflare Pages deploya automaticamente em ~60s
- Validação visual obrigatória (screenshot) antes de commit
- Claude Code NÃO deve rodar `npm run dev` (já roda localmente)
- Claude Code NÃO deve modificar CLAUDE.md, briefing-website-pessoal.md, ou os arquivos de conteúdo `*-content-*.md`
- Em caso de erro, Claude Code deve parar e consultar, não tentar auto-corrigir em loop

## Conteúdo e dados auxiliares

- `briefing-website-pessoal.md` — briefing completo (32KB)
- `projetos-content-pt.md` e `projects-content-en.md` — conteúdo de /projetos (no `.gitignore`)
- `dashboard9-reference.py` — Flask antigo, referência apenas (6.648 linhas, no `.gitignore`)
- `public/adelson-jantsch.jpg` — foto pessoal

### Dados para /impacto (CSVs já existentes no projeto)

- `hospital.csv` — 14 condições ACSC, RR de internação (paper PLOS 2023)
- `detection.csv` — 28 condições crônicas, RR de detecção (paper BMC 2021)
- `tests.csv` — 30 exames laboratoriais, RR (paper BMC 2021)
- `referrals.csv` — 31 especialidades/exames, RR de encaminhamento (paper BMJ Open 2022)

Estrutura de colunas em todos os CSVs: `name | RR_ci | pop | baseline | motivo`

## Links pessoais (não inventar)

- ORCID: https://orcid.org/0000-0002-3012-5619
- LinkedIn: https://www.linkedin.com/in/adelson-guaraci-jantsch-263639266/
- Email: adelson.guaracii@gmail.com
- Site irmão: https://findtheevidence.org

## Header e Footer

- **Header PT:** Início · Impacto · Simulador · Projetos · Sobre
- **Header EN:** Home · Impact · Simulator · Projects · About
- **Footer:** ORCID + LinkedIn + Email (mailto com copy-to-clipboard) + "Find the evidence →" (sem GitHub). Toggle de idioma no Header preserva o pathname atual via mapa bidirecional PT↔EN.

---

# Fase 3C — Página /impacto (decisões consolidadas)

## Tese editorial

Dashboard interativo apresentando evidências de duas coortes no Rio de Janeiro comparando generalistas (médicos sem residência) vs. médicos de família (MFCs, com 2 anos de residência). Mostra impacto em 4 dimensões (detecção, exames, encaminhamentos, internações) + continuidade do cuidado (follow-up).

## Decisões editoriais

| Decisão | Escolha |
|---|---|
| Estrutura | **Caminho C** (híbrido: matriz visual 2×2 no topo + detalhamento abaixo) |
| Profundidade | **Média** — 4 seções com destaques + tabela completa colapsada |
| Nuance de encaminhamentos | **Incluída**, com framing positivo: MFCs encaminham com critério — mais para o necessário (reabilitação, fisio, cirurgia oftalmológica), menos para o desnecessário (derm, ortop ambulatorial, cardio geral). Aumenta capacidade de resposta. |
| Cards da matriz | **Agregados** (soma de todos os deltas da categoria), reagem à barra em tempo real |
| Tabelas | **Dupla camada:** destaques (5-7 linhas curadas) sempre visível + tabela completa colapsada com botão "Ver todas as N" |
| Barra de proporção | **Uma só, sticky**, controla toda a página simultaneamente. Valor inicial 33.6% (proporção real da coorte original). |
| Cards | **Clicáveis** com scroll suave para a seção correspondente |
| Categoria Follow-up | Mantida como **Seção 5**, com 3 sub-tabelas estáticas (não reagem à barra), preservando conteúdo do Flask antigo |
| CTA final | Link "Ir para o simulador →" |

## Títulos

- **PT:** "O que dois anos de treinamento em Medicina de Família fazem na prática médica na Atenção Primária à Saúde."
- **EN:** "What two years of family medicine training do to medical practice in primary care."

## Tagline

- **PT:** "Evidências de duas coortes no Rio de Janeiro, 600 mil pacientes, 6 anos."
- **EN:** "Evidence from two cohorts in Rio de Janeiro, 600,000 patients, 6 years."

## Estrutura da página

1. **Page Hero** — eyebrow IMPACTO/IMPACT + H1 + tagline
2. **Setup do estudo** — explica coorte (400k generalistas, 200k MFCs, mesma estrutura, única variável é a formação) + frase-ponte para a barra
3. **Barra de proporção sticky** — slider 0–100%, valor inicial 33.6%, mostra "Generalistas: X% · MFCs: Y%"
4. **Matriz visual** — 4 cards agregados clicáveis (2×2 desktop, empilhado mobile)
5. **Índice de navegação** — "Nesta página: Detecção · Exames · Encaminhamentos · Internações · Continuidade"
6. **Seção 1 — Detecção** (28 condições, BMC 2021): eyebrow + meta + parágrafo + destaques + tabela completa colapsada + interpretação + link paper
7. **Seção 2 — Exames** (30 exames, BMC 2021): mesma estrutura
8. **Seção 3 — Encaminhamentos** (31 itens, BMJ Open 2022): mesma estrutura + parágrafo de nuance
9. **Seção 4 — Internações** (14 condições ACSC, PLOS 2023): mesma estrutura
10. **Seção 5 — Continuidade do cuidado:** 3 sub-tabelas estáticas (pós-diagnóstico, pós-encaminhamento 3/6 meses, pós-internação 2/4/6 meses) com textos narrativos do Flask antigo
11. **Metodologia e limitações** — modelos multinível, fórmula PAF, limitações do contexto Rio
12. **Referências** — 5 links clicáveis (ver abaixo)
13. **CTA final** — "Ir para o simulador →"

## Fórmula de cálculo (extraída de dashboard9.py, validada e revisada)

```javascript
const P_MF_BASE = 0.336;  // 33.6% — proporção real de MFCs na coorte

function calc(base, RR, pMF, popRef) {
    const pop = popRef;
    if (pop <= 0) return [base, 0];
    const rG = base / (pop * (1 - P_MF_BASE + P_MF_BASE * RR));
    const n = pop * ((1 - pMF) * rG + pMF * RR * rG);
    return [n, n - base];  // [novo valor, delta]
}
```

**Tradução:**
- `base` = eventos/ano observados (coluna `baseline` do CSV)
- `RR` = Risk Ratio do paper (primeira parte da coluna `RR_ci`)
- `pMF` = proporção de MFCs escolhida pelo usuário (slider, 0 a 1)
- `pop` = população de risco (coluna `pop` do CSV)
- Retorna: `[novo_valor_no_cenario, delta_em_relacao_ao_baseline]`

A lógica deconstrói o `baseline` observado para descobrir a taxa de evento dos generalistas sozinhos, assumindo a proporção real de 33.6% na coorte original, depois recompõe a taxa total com `pMF` arbitrário. Fundamentada nas fórmulas da OMS para Population Attributable Fraction.

## Função auxiliar de parsing (necessária para os CSVs)

```javascript
function parseNum(x) {
    if (x == null) return null;
    let s = String(x).replace(/,/g, '.');
    s = s.replace(/[^\d.\u202F\u00A0\s]/g, '');
    s = s.replace(/[\u202F\u00A0\s]/g, '');
    const n = parseFloat(s);
    return isNaN(n) ? null : n;
}

// RR extraído de "0.53 (0.53 - 0.54)" → primeira parte antes do espaço
function parseRR(rr_ci) {
    return parseNum(String(rr_ci).split(' ')[0]);
}
```

## Comportamento dos elementos interativos

- **Slider:** `<input type="range" min="0" max="100" value="33.6" step="0.1">`
- **Ao mover slider:** dispara recálculo de todos os 4 cards agregados + todas as tabelas (destaques + completas) das 4 primeiras seções
- **Seção 5 não reage ao slider** — tabelas estáticas
- **Card click:** scroll suave para a seção correspondente, sem mudar a barra
- **Display de delta:** `↑ N` (verde para detecção, vermelho para outros) ou `↓ N` (inverso). Zero = neutro.
- **Cores de mudança:**
  - Detecção: ↑ = positive-diagnosis (favorável), ↓ = negative-diagnosis
  - Outras categorias: ↑ = positive-other (geralmente desfavorável, mais exames/encaminhamentos/internações), ↓ = negative-other (favorável)

## Estado inicial das tabelas

- Slider em 33.6%
- Todas as tabelas mostram baseline observado + delta zero (porque é o cenário real da coorte)
- Mover o slider muda essa visão

## Referências (5 itens, links clicáveis com título)

Renderizar como lista simples na seção "Referências" da página /impacto:

1. **RBMFC 2020** — *Pesquisa científica, atenção primária e medicina de família: três ingredientes essenciais para melhorar a qualidade dos cuidados de saúde.* Rev Bras Med Fam Comunidade. Rio de Janeiro, 2020 Jan-Dec; 15(42):24661.
   Link: https://rbmfc.org.br/rbmfc/article/view/2466/1565

2. **BMC Family Practice 2021** — Jantsch, A.G., Burström, B., Nilsson, G. et al. *Detection and follow-up of chronic health conditions in Rio de Janeiro – the impact of residency training in family medicine.* BMC Fam Pract 22, 223 (2021).
   Link: https://bmcprimcare.biomedcentral.com/articles/10.1186/s12875-021-01542-5

3. **BMJ Open 2022** — Jantsch AG, Burström B, Nilsson GH, et al. *Residency training in family medicine and its impact on coordination and continuity of care: an analysis of referrals to secondary care in Rio de Janeiro.* BMJ Open 2022;12:e051515.
   Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8852675/pdf/bmjopen-2021-051515.pdf

4. **PLOS Global Public Health 2023** — Jantsch AG, Burström B, Nilsson GH, Ponce de Leon A (2023) *The impact of residency training in family medicine on hospital admissions due to Ambulatory-care Sensitive Conditions in Rio de Janeiro.* PLOS Glob Public Health 3(10): e0000547.
   Link: https://journals.plos.org/globalpublichealth/article?id=10.1371/journal.pgph.0000547

5. **Tese completa (UERJ)** — *The impact of residency training in family medicine in promoting the attributes of primary care in Rio de Janeiro / O impacto da residência em medicina de família na promoção dos atributos da atenção primária no Rio de Janeiro.*
   Link: https://www.bdtd.uerj.br:8443/handle/1/20692

## Conteúdo da Seção 5 (Follow-up) — preservado do Flask antigo

Três sub-seções, cada uma com texto narrativo + tabela estática:

### 5.1 — Após diagnóstico (28 condições)
Tabela 2 colunas: Condição | Follow-up RR (95% CI). Dados de hipertensão (1.54), diabetes (1.43), drogadição (2.64), etc.

### 5.2 — Após encaminhamento (3 e 6 meses)
Tabela 3 colunas com 3 sub-grupos: Consulta ambulatorial / Avaliação cirúrgica / Exames diagnósticos. ~30 linhas.

### 5.3 — Após internação hospitalar (2/4/6 meses)
Tabela 4 colunas: Condição | 2 meses | 4 meses | 6 meses. 8 linhas (Hipertensão, Diabetes, AVC, Angina, IC, Pneumonia infantil/adulta, Infecção de pele).

Textos completos estão em `dashboard9-reference.py` linhas 2752–3035 (PT e EN paralelos).

## Componentes Astro a criar para /impacto

1. `src/components/ImpactBar.astro` — barra de proporção sticky com slider
2. `src/components/ImpactMatrix.astro` — 4 cards agregados clicáveis
3. `src/components/ImpactSection.astro` — seção com eyebrow + meta + parágrafo + destaques + tabela completa colapsada + interpretação + link paper
4. `src/components/ImpactTable.astro` — tabela reativa (recebe array de dados + modo destaques/completa)
5. `src/components/FollowupTables.astro` — 3 tabelas estáticas da Seção 5
6. `src/pages/impacto.astro` (PT) e `src/pages/en/impact.astro` (EN)

## Dados para /impacto — preparar JSONs ou import dos CSVs

Os 4 CSVs (`hospital.csv`, `detection.csv`, `tests.csv`, `referrals.csv`) podem ser:
- Importados como JSON no build (preferível, sem fetch runtime)
- OU lidos como assets estáticos via fetch no client (alternativa)

Preferir importação no build.

### Curadoria de "destaques" por seção (5-7 linhas em cada)

**Detecção (top 7 por RR ou impacto clínico):**
- Doença arterial periférica (RR 2.41)
- Drogadição (RR 1.98)
- Insuficiência renal (RR 1.82)
- Abuso de álcool (RR 1.72)
- Insuficiência cardíaca (RR 1.69)
- Hipertensão (RR 1.15, mas grande volume: 11.681 casos/ano)
- Diabetes Mellitus (RR 1.07, grande volume: 4.089 casos/ano)

**Exames (top 7 por delta absoluto):**
- Hemograma (RR 0.53, −19.202/ano)
- Ureia (RR 0.29, −13.975/ano)
- LDL colesterol (RR 0.41, −10.838/ano)
- Ácido úrico (RR 0.23, −10.766/ano)
- Urinálise (RR 0.67, −10.209/ano)
- A1C Hemoglobina (RR 0.64, −6.996/ano)
- PSA (RR 0.36, −2.361/ano)

**Encaminhamentos (mix de reduções e aumentos para mostrar nuance):**
- Ortopedia (RR 0.52, −1.895/ano)
- Dermatologia (RR 0.49, −1.711/ano)
- Cardiologia (RR 0.40, −1.010/ano)
- Cirurgia oftalmológica (RR 1.21, +593/ano) — **AUMENTO**
- Reabilitação (RR 1.68, +441/ano) — **AUMENTO**
- Fisioterapia (RR 1.17, +261/ano) — **AUMENTO**

**Internações (top 7 ACSC):**
- Asma (RR 0.35, −47%)
- Pneumonia adultos (RR 0.36, −59/ano)
- Gastroenterite (RR 0.45)
- Insuficiência cardíaca (RR 0.52, −68/ano)
- Pneumonia crianças (RR 0.57)
- Angina pectoris (RR 0.62, −61/ano)
- AVC (RR 0.74)

---

# Fase 4 — /simulador (defaults documentados, implementar depois)

Inputs editáveis:
- População: 600.000 (default)
- Número de MFCs no cenário: 50 (slider 0–150, default 50)
- Custo da equipe de saúde/mês: R$ 50.000
- Custo de consulta secundária: R$ 130
- Custo de internação: R$ 5.000
- Custo de exame laboratorial: R$ 1,00 (constante, não editável)

Outputs:
- Economia anual em exames, consultas, internações
- Custo anual total no novo cenário
- Comparação baseline vs cenário escolhido
- Mesma fórmula `calc` da /impacto, mas multiplicada por custos

Página separada (não embarcada em /impacto). CTA no fim de /impacto leva para cá.

---

# Estado real da implementação (Fases 3C e 4 entregues)

## Arquitetura de arquivos

```
src/
├── components/
│   ├── ImpactBar.astro            barra de proporção sticky
│   ├── ImpactMatrix.astro         4 cards agregados clicáveis
│   ├── ImpactSection.astro        wrapper das 4 categorias (eyebrow + meta + slot + tabela)
│   ├── ImpactTable.astro          tabela reativa única com botão "Ver todas as N" (toggle de hidden)
│   ├── FollowupTables.astro       3 tabelas estáticas da Seção 5
│   ├── ImpactReferences.astro     5 refs acadêmicas
│   └── BubbleChart.astro          experimental: SVG + circle packing greedy server-side + flutuação CSS
├── data/
│   ├── detection.csv  tests.csv  referrals.csv  hospital.csv
│   ├── impact-data.ts             parser dos CSVs + getDisplayName(category, name, locale)
│   │                              com 103 traduções PT-BR (morbidades, exames, especialidades, internações)
│   └── sigtap-costs.ts            tabela de custos unitários SUS para os 35 itens com preço fixo
├── scripts/
│   └── impact-calc.ts             função calc() preservada do dashboard9 + formatters + getChangeClass
└── pages/
    ├── impacto.astro              dashboard PT
    ├── impacto-visual.astro       experimental PT (4 bubble charts)
    ├── simulador.astro            simulador PT (panorama 3-col)
    ├── projetos.astro             6 tabs incluindo Find the evidence
    └── en/
        ├── impact.astro  visual-impact.astro  simulator.astro  projects.astro
        └── (espelhos EN com texto traduzido)
```

## Decisões finais que divergem do plano original

- **Tabelas reativas em /impacto:** uma tabela única em ordem do CSV com botão "Ver todas as N" que expande in-place (não mais "destaques curados + completa em sanfona" — usuário pediu para simplificar).
- **Cor semântica em /simulador:** verde escuro `emerald-700` (favorável, com ↓) e vermelho `red-600` (desfavorável, com ↑). Setas embutidas no `fmtSavings`.
- **Currency em BRL nas duas línguas** (`Intl.NumberFormat` com `style: "currency", currency: "BRL"`) — dado é brasileiro, mostrar USD no EN seria enganoso.
- **Custos por item via SIGTAP:** o `LAB_TEST_COST = 1.0` foi substituído por `SIGTAP_COSTS[name]` em `src/data/sigtap-costs.ts`. 30 exames lab + 5 procedimentos diagnósticos (Eco, Espir, Colon, EDA, Erg) com preços fixos do SUS; demais especialidades e cirurgias fazem fallback para o input "Custo de consulta secundária".
- **Slider do simulador no topo (sticky), constrange em `max-w-2xl mx-auto`**. Layout panorama de 3 colunas (Configurações, Cenário atual, Projeção) com container `max-w-7xl` e grid `md:grid-cols-3`.
- **Header com mapa bidirecional de rotas:** `localePairs` para preservar pathname ao trocar idioma. Rotas PT em português (`/sobre`, `/projetos`, `/impacto`, `/simulador`, `/impacto-visual`), EN em inglês.
- **Nova aba Find the evidence em /projetos:** 6ª tab no final, descrição com link `https://findtheevidence.org/`.
- **Hero da home atualizado:** "Fortalecer a atenção primária e a medicina de família / na comunidade, onde ela acontece." (PT) + equivalente EN.
- **Email mailto com copy-to-clipboard:** script no Footer; ao clicar copia endereço e mostra "Email copiado!" / "Email copied!" por 2s.

## Páginas experimentais (decisão pendente)

`/impacto-visual` e `/en/visual-impact`: 4 bubble charts (uma por categoria — detecção, exames, encaminhamentos, internações). Cada bolha é um evento, tamanho ∝ volume anual (potência 0.8 do baseline), cor muda com slider (verde-claro favorável, vermelho-claro desfavorável). Circle packing greedy server-side; sem simulação de física no cliente; flutuação leve via CSS `@keyframes`. Reativos ao mesmo `impact:proportion-change` do ImpactBar.

Não estão linkadas no Header. Acesso direto por URL. Decisão de manter/integrar/descartar pendente.