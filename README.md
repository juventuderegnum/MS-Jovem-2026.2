# ✝️ Landing Page - Missão Nossa Senhora Aparecida (SJC)
### Juventude Missionária • Regnum Christi Vale do Paraíba

Esta é a landing page oficial, responsiva e de alta performance desenvolvida para a divulgação e engajamento da **Missão Nossa Senhora Aparecida em São José dos Campos (SJC)**, realizada pela **Juventude Missionária Regnum Christi (Vale do Paraíba)** de 10 a 12 de Outubro de 2026.

---

## 🛠️ Tecnologias & Arquitetura

O projeto foi construído utilizando **Vanilla Web Technologies (Web Nativas)** para garantir tempo de carregamento ultrarrápido, consumo mínimo de memória e pontuação máxima no Google Lighthouse / Core Web Vitals.

* **HTML5 Semântico:** Estrutura acessível (`<header>`, `<main>`, `<section>`, `<footer>`), suporte a leitores de tela (`skip-link`, tags `aria-*`), SEO otimizado e marcas Open Graph para preview no WhatsApp e redes sociais.
* **CSS3 Vanilla (Modern Design System):**
  * **Variáveis CSS (`:root`):** Paleta corporativa fiel ao Manual de Identidade JFM (Laranja `#F38A00`, Amarelo `#FFDB00`, Vermelho `#EB0028`, Grafite `#2E2925` e Azul `#001A70`).
  * **Layout Responsivo Mobile-First:** Uso de Flexbox e CSS Grid.
  * **Efeitos Visuais:** Efeito Glassmorphism (`backdrop-filter: blur`), botões arredondados e transições suaves.
* **JavaScript ES6+ (Vanilla / Sem Frameworks):**
  * **Contador Regressivo:** Timer dinâmico até 10/10/2026 com auto-cleanup (`clearInterval`) para economizar recursos de CPU.
  * **Scroll Performance:** Escutador de rolagem otimizado com `requestAnimationFrame` para animações fluidas (60 FPS) e acionamento do pop-up inferior e do botão de navegação.
  * **FAQ Interativo:** Sistema de sanfona (accordion) acessível via teclado.
* **Otimização de Mídias (Imagens Next-Gen):**
  * Utilização da tag `<picture>` com fontes em formato **WebP** de última geração (redução de ~80% no peso da página).
  * Atributos de dimensionamento `width` e `height` explícitos em todas as imagens para evitar **CLS** (Cumulative Layout Shift).
  * Carregamento sob demanda (`loading="lazy"`) para elementos abaixo da dobra e prioridade (`fetchpriority="high"`) na imagem de abertura (Hero).
* **Hospedagem & Deploy:**
  * Configurado para **Vercel** com integração contínua (CI/CD) direta do repositório **GitHub**. Qualquer atualização na branch `main` dispara um deploy automático na Vercel Edge Network.

---

## 📁 Estrutura do Repositório

```
MissoesRegnum/
├── index.html                  # Estrutura HTML5 semântica e acessível
├── styles.css                  # Design System, variáveis de cores e responsividade
├── script.js                   # Lógica de interações, scroll e contador regressivo
├── README.md                   # Documentação completa do projeto
└── assets/
    ├── garotinha-missoes.webp  # Imagem da missão (WebP otimizada)
    ├── garotinha-missoes.jpg   # Imagem da missão (Fallback JPG)
    ├── logo-isotipo.webp       # Logotipo Isotipo JFM (WebP)
    ├── logo-isotipo.png        # Logotipo Isotipo JFM (Fallback PNG)
    ├── logo-regnumchristi.webp # Escudo oficial Regnum Christi (WebP)
    └── logo-regnumchristi.png  # Escudo oficial Regnum Christi (Fallback PNG)
```

---

## 🚀 Como Executar Localmente

### 1. Abertura Direta
Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Safari, Edge, Firefox).

### 2. Servidor Local (Recomendado para Testes)
Você pode subir um servidor HTTP local usando Python ou Node:

```bash
# Com Python
python -m http.server 8080

# Com Node / npx
npx http-server -p 8080
```

Em seguida, acesse `http://localhost:8080` no seu navegador.

---

## 🌐 Deploy na Vercel

O projeto está conectado diretamente à plataforma **Vercel** via repositório **GitHub**.

1. Ao efetuar qualquer `git push origin main`, a Vercel compila e disponibiliza a nova versão instantaneamente na CDN global.
2. Como se trata de um site estático (HTML/CSS/JS), não requer etapa de build complexa (`build command` vazio e diretório raiz `./`).

---

## ⛪ Juventude Missionária • Regnum Christi
*«Vinde e vede.» (São João 1, 39)*  
*«A Cristo, o Reino presente aqui e agora!»*
