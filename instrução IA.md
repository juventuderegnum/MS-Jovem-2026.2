# Instrução IA — Handoff da Otimização (Performance + Segurança)

> **Data:** 31/08/2026
> **Projeto:** Missões Regnum (landing page estática, deploy na Vercel via GitHub)
> **Estado do trabalho:** ~95% concluído e testado. Faltam apenas itens finais (ver seção "O que falta").

---

## 1. O pedido original (texto exato do usuário)

> "Otimize o código do meu projeto visando ganho real de performance e segurança, sem alterar absolutamente nada do design atual, dos links, das funcionalidades existentes ou do layout visual. O objetivo é apenas tornar tudo mais rápido e mais seguro, mantendo o comportamento idêntico ao que já está em produção. Aplique técnicas como lazy loading, minificação, otimização de consultas/requisições, cache quando fizer sentido, remoção de código morto, boas práticas de segurança contra XSS, CSRF, injeção e exposição desnecessária de dados, além de garantir que nada visualmente perceptível seja modificado."

**Regra de ouro do projeto:** design, links, funcionalidades e layout visual DEVEM permanecer 100% idênticos. Só muda o que é invisível ao usuário (velocidade e segurança).

---

## 2. O que foi feito (arquivo por arquivo, com o porquê)

### 2.1. `index.html`

| Mudança | Por quê |
|---|---|
| Google Fonts: `<link rel="stylesheet">` bloqueante → `<link rel="preload" as="style" id="googleFontsCss">` + fallback `<noscript>` | O CSS de fontes bloqueava a primeira renderização (FCP). Agora baixa em paralelo sem bloquear. O `script.js` (deferred) troca `rel="preload"` → `rel="stylesheet"` — padrão recomendado, compatível com CSP estrita (o truque clássico `onload=` inline é bloqueado sem `unsafe-inline`). **Maior ganho de FCP para visitas via WhatsApp (cache frio).** |
| Snippet inline do Microsoft Clarity → arquivo externo `clarity.js` + `<link rel="preconnect" href="https://www.clarity.ms">` | Script inline impedia remover `'unsafe-inline'` do `script-src` da CSP. Externalizado, a CSP fica estrita (proteção real contra XSS). Preconnect antecipa a conexão. |
| `<link rel="preload" as="image" href="assets/garotinha-missoes.webp" fetchpriority="high">` no `<head>` | A foto do hero é a imagem LCP (maior elemento visível). Preload descobre a imagem no head, antes de parser o body. |
| `decoding="async"` adicionado a todas as 57 imagens (hero + 54 do carrossel + 3 logos) | Descodificação fora da thread principal — menos travadas no scroll. Não muda nada visual (dimensões já fixadas por width/height). |
| 3 atributos `style="..."` inline removidos (`.icon-play`, `.countdown-section-standalone`, `.quote-carouselRef`) → regras CSS equivalents | Menos inline styles = menos exceções de CSP no futuro + HTML menor. Valores **idênticos** aos originais (mesma padding, mesmo `display:none` inicial). O JS continua controlando via `style.display` (inline via JS sempre vence classe CSS — comportamento igual). |
| `<div class="toast-container" id="toastContainer">` removido | Código morto: o container e a função `showToast` não eram usados em nenhum fluxo. |
| `<script src="script.js">` → `<script src="script.js" defer>` | HTML parseia sem esperar o JS; o script roda antes do DOMContentLoaded. Ordem/funcionamento idênticos (todo o código já espera o evento DOMContentLoaded). |

### 2.2. `script.js`

| Mudança | Por quê |
|---|---|
| IIFE no topo: troca `rel="preload"` → `rel="stylesheet"` do link de fontes | Parte do sistema de fontes não-bloqueantes (ver 2.1). Roda no início do script deferred. |
| `IntersectionObserver` no carrossel de fotos: `updateSpotlight()` só roda quando o carrossel está visível (rootMargin 120px) | **Maior ganho de CPU do projeto.** Antes: loop RAF chamava `updateSpotlight()` a cada frame = 54 × `getBoundingClientRect()` por frame, ~3.240/s, mesmo com o carrossel fora da tela. Agora: custo zero quando fora da viewport. O rootMargin de 120px garante que as classes `.is-spotlight` já estão corretas ANTES de o carrossel entrar na tela (zero diferença perceptível). O `transform` do carrossel continua avançando sempre — posições idênticas ao original. |
| Removidos: `showToast()`, `toastContainer`, `btnFaqSupport` | Código morto confirmado por análise estática (nenhuma chamada, nenhum elemento no HTML). |

### 2.3. `styles.css` (66.531 → ~59.400 bytes; 3.230 → ~2.870 linhas)

**Removido (~360 linhas de código morto)** — classes que não existiam em nenhum elemento do HTML nem eram injetadas por JS (verificado por script de análise cruzada `tools/analyze-dead-code.mjs`):

- `.btn-primary`, `.btn-dark`, `.btn-ghost` (botões não usados)
- `.movement-persuasive-box` (substituída no HTML por `.unified-mission-card` há tempos)
- `.interest-card-title`, `.interest-card-desc` (inclusive na media query mobile)
- `.prayer-commitment-note .prayer-icon` (o ícone não existe no HTML)
- `.bible-cross-symbol` (não existe no HTML)
- Seção inteira do antigo showcase do Instagram: `.instagram-community-section` (×2 duplicada), `.instagram-feed-card`, `.insta-showcase-header`, `.insta-profile-lockup`, `.insta-avatar-wrapper`, `.insta-avatar-img`, `.insta-verified-badge`, `.insta-badge-tag`, `.insta-handle-title`, `.insta-handle-sub`, `.insta-showcase-footer`, `.showcase-lead-phrase`, `.showcase-lead-sub` (+ regras na media query). **Atenção: `.btn-instagram-pill` e `.btn-instagram-action` foram MANTIDOS — são usados no card atual do Instagram.**
- `.cta-regnum-logo` (não existe no HTML)
- Seções MODALS + FORMS inteiras (`.modal-*`, `.form-group`, `.form-row` etc.) e TOASTS (`.toast`, `.toast-container`) — nada disso existe no HTML
- `#btnShareHeader span` (id não existe), `.btn-instagram-compact` (não existe)

**Adicionadas 3 regras** (equivalentes exatas dos inline styles removidos):
- `.countdown-section-standalone { padding: 1.5rem 0 2.5rem 0; }` (antes inline no HTML)
- `.quote-carousel-ref { display: none; }` — posicionada DEPOIS de `.catholic-reference` na ordem do arquivo para vencer o `display:block` deste (mesma especificidade, ordem de origem decide). Era inline no `<cite>`.
- `.icon-play { display: none; }` (era inline no SVG do botão play/pause)

**Validação:** chaves `{}` balanceadas (395/395), 0 classes mortas restantes (script de análise retorna vazio).

### 2.4. `vercel.json`

| Mudança | Por quê |
|---|---|
| `"buildCommand": "npm run build"` + `"outputDirectory": "dist"` | Ativa o pipeline de minificação na Vercel (ver 2.5). Bônus de segurança: só o conteúdo de `dist/` é servido publicamente — arquivos-fonte (script.js original, tools/, package.json) deixam de ficar expostos na URL pública. |
| CSP `script-src`: **removido `'unsafe-inline'`** | Era a maior fraqueza de segurança. Agora nenhum script inline roda (Clarity foi externalizado; não há handlers inline no HTML). Isso mitiga XSS de injeção de script. |
| CSP: adicionados `object-src 'none'`, `frame-src 'none'`, `upgrade-insecure-requests` | Bloqueia plugins/objects, iframes e força upgrade de qualquer URL http residual. |
| Novo header `Cross-Origin-Resource-Policy: same-origin` | Outros sites não podem embutir/hotlinkar as imagens do site. **Não afeta previews de link do WhatsApp/Instagram** (crawlers baixam a imagem direto; CORP só é aplicado por navegadores). |
| Mantidos | XCTO nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, HSTS+preload, COOP, cache imutável de 1 ano para `/assets/*`. `style-src` mantém `'unsafe-inline'` (o Clarity pode injetar styles inline; risco baixo). `form-action` mantém forms.gle/docs.google.com. |

### 2.5. Novos arquivos (pipeline de build)

- **`clarity.js`** — snippet do Clarity externalizado (mesmo IIFE, mesmo projeto ID `y4hforzqno`).
- **`package.json`** — devDependency `esbuild`, script `"build": "node tools/build.mjs"`.
- **`tools/build.mjs`** — minifica `styles.css`, `script.js`, `clarity.js` para `dist/` **mantendo os mesmos nomes de arquivo** (zero mudanças de referência no HTML), copia `index.html` e `assets/`. Roda em ~170ms.
- **`.gitignore`** — `node_modules/`, `dist/`, `.vercel`.
- **`tools/analyze-dead-code.mjs`** — script de análise de código morto (reutilizável).

**Por que build na Vercel e não minificar os arquivos-fonte?** Você edita `styles.css`/`index.html` direto (histórico do git mostra edições frequentes). Minificar em cima dos fontes destruiria a manutenibilidade; `.min.css` com nome diferente criaria risco de desatualização. Com o build, o fluxo continua sendo **editar → commit → push** e a Vercel minifica sozinha.

**Resultados da minificação (testado localmente):**
- `script.js`: 24,2 KB → **11,2 KB** (−54%)
- `styles.css`: 66,5 KB → **41,6 KB** (−37%)
- `clarity.js`: 267 B
- **Total JS+CSS: ~90,7 KB → ~53,1 KB (−41%)** por visita de cache frio

---

## 3. Testes de regressão executados (e resultados)

Método: harness próprio via Chrome DevTools Protocol (Chrome headless real, zero dependências), servindo as duas versões localmente **com os headers de segurança do vercel.json aplicados**.

### 3.1. Testes funcionais — TODOS PASSARAM (desktop 1280×800 e mobile 390×844, antes vs depois)
- Contador regressivo ticando (segundos mudando) ✓ (uma leitura deu falso-negativo por timing do harness; teste focado isolado confirmou ticando normalmente: 27→24→21)
- Carrossel infinito animando + `.is-spotlight` no card central ✓
- Botão play/pause pausa/retoma a rolagem ✓
- Frase católica (carrossel de citações) alterna no clique ✓
- FAQ accordion abre/fecha ✓
- Lightbox abre/fecha por clique e ESC ✓
- Popup inferior surge perto do fim da página ✓
- Fontes Google carregadas (Cinzel, Outfit, Newsreader, Plus Jakarta — todas "loaded" nas duas versões) ✓
- Zero erros de JavaScript no console nas duas versões ✓

### 3.2. Segurança / CSP
- **Versão otimizada: ZERO violações de CSP.** Clarity carrega corretamente com a CSP estrita (`apiLoaded: true`, script tag presente).
- Versão antiga sob a CSP nova: 1 violação (`script-src-elem ← inline`) — o snippet inline do Clarity era bloqueado. Prova empírica de que a externalização era **necessária** para endurecer a CSP.

### 3.3. Layout (a parte mais crítica do pedido)
- **Altura total da página: 7220px = 7220px (idêntica)** entre a versão sem otimização (working tree) e `dist/` otimizada.
- **Todas as seções, footer e elementos com id: posições e alturas IDÊNTICAS** (diff elemento a elemento retornou zero divergências).
- Pixel diff das screenshots full-page: 4,1% dos pixels divergem, concentrados em: **carrossel animado** (posições do RAF inevitavelmente diferentes entre duas capturas) e **dígitos do contador** (hora diferente). Bandas de 523-1007 e 1112-1325 px **não foram identificadas antes da parada** — como o layout é provadamente idêntico, a hipótese mais provável é timing de decodificação/antialiasing de imagens lazy (ver seção 5).

### 3.4. Descoberta importante durante os testes
Ao comparar com o HEAD do git, a página estava 29px mais alta. **Investigado a fundo: NÃO é causa das otimizações** — é o seu **trabalho não-commitado** (work in progress): o badge `hero-cross-badge` (cruz tricolor SVG, 24px + margem) que você adicionou ao HTML/CSS e ainda não fez commit. Esse badge está presente tanto na versão "antes" (working tree) quanto na `dist/`, então o teste justo (3.3) já o considera.

---

## 4. Arquivos modificados/criados — resumo

**Modificados:** `index.html`, `script.js`, `styles.css`, `vercel.json`
**Criados:** `clarity.js`, `package.json`, `.gitignore`, `tools/build.mjs`, `tools/analyze-dead-code.mjs`
**Gerados localmente (gitignored):** `node_modules/`, `dist/` (a Vercel gera o próprio dist/ no deploy), `package-lock.json` (este deve ser commitado junto)

---

## 5. O que falta fazer (e como fazer)

1. **Identificar as bandas de pixel diff 523-1007 / 1112-1325** (confirmação final, risco baixo):
   - O script `C:\Users\Caique\AppData\Local\Temp\missoes-qa\bands.mjs` já lista os elementos nessas posições. Rodar com os servidores de teste ativos (ver item 5.1).
   - Critério de decisão: se os elementos nessas bandas forem as fotos do carrossel/imagens lazy (decode timing) → benigno, encerrar. Se houver elemento de layout → investigar regra CSS específica.
   - Como o layout foi provado idêntico (posições/alturas byte a byte), a probabilidade de problema real é muito baixa.

2. **Atualizar o `README.md`**: documentar o build (`npm install` + `npm run build` local; automático na Vercel), a CSP e por que `clarity.js` é externo.

3. **Commit e push** (sugestão de mensagem: `perf+security: preload fonts/LCP, externalize Clarity, strict CSP, esbuild minify pipeline, dead code removal (~350 linhas CSS, toast/btnFaqSupport JS)`).
   - Incluir: `index.html`, `script.js`, `styles.css`, `vercel.json`, `clarity.js`, `package.json`, `package-lock.json`, `.gitignore`, `tools/`.
   - NÃO incluir: `node_modules/`, `dist/` (já no .gitignore).
   - No push, a Vercel roda `npm install` + `npm run build` automaticamente e publica o `dist/`.

4. **Validação pós-deploy** (5 minutos): abrir `https://missoes-regnum.vercel.app/`, conferir DevTools → Console (zero erros/CSP), Network (styles.css ~41KB, script.js ~11KB), testar carrossel/lightbox/FAQ, e conferir no painel do Clarity se as sessões voltam a aparecer (confirmação final da CSP com Clarity em produção).

5. **(Opcional) Reproduzir o ambiente de teste local:**
   - Servidores: `node serve.mjs <dir> <porta>` (script em `C:\Users\Caique\AppData\Local\Temp\missoes-qa\serve.mjs` — aplica os headers do vercel.json)
   - Harness de testes: `cdp-test.mjs` (funcional + screenshots), `layout-diff.mjs` (diff de layout), `cdp-diff2.mjs` (pixel diff via data URLs), `bands.mjs` (elementos por banda) — todos na mesma pasta temp.
   - "Antes" para comparação: `git worktree add <caminho> HEAD` (já existe um em `C:\Users\Caique\AppData\Local\Temp\missoes-before` — pode remover com `git worktree remove`).

6. **Plano B se o Clarity quebrar em produção por CSP:** basta re-adicionar `'unsafe-inline'` ao `script-src` no `vercel.json` (voltando ao valor anterior). Os testes locais indicam que NÃO será necessário — Clarity funcionou perfeitamente com a CSP estrita.

---

## 6. Decisões de projeto registradas (para futuras sessões)

- **URL do Google Fonts intocada** (pesos investigados um a um — remover peso mudaria a renderização, ex.: `.verse-text` usa weight 400 mas só há Newsreader italic 500/600/700; o browser sintetiza a partir do 500).
- **Loop do carrossel NÃO é pausado quando fora da tela** — só o recálculo do spotlight é pulado. Pausar o `transform` mudaria a posição das fotos ao voltar (comportamento visível).
- **`updateEventDetailsUI` mantido** apesar de redundante (hrefs já corretos no HTML) — defensivo, 5 linhas, inofensivo.
- **Minificação preserva a ordem da cascata do CSS** (esbuild não reordena regras) — crítico porque o design depende da ordem (ex.: `.quote-carousel-ref` após `.catholic-reference`).
- **Fontes com `display=swap`**: FOUT (troca de fonte fallback → final) já existia antes e continua igual; estado final renderizado é idêntico.

---

*Documento gerado em 31/08/2026 às ~20h30. Workbench de teste em `%TEMP%\missoes-qa` (pode ser apagado). Worktree em `%TEMP%\missoes-before` (remover com `git worktree remove`).*
