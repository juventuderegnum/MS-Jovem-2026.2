# ✝️ Landing Page - Missão Nossa Senhora Aparecida (SJC)
### Juventude Missionária • Regnum Christi Vale do Paraíba

[![Deploy with Vercel](https://vercelbadge.vercel.app/api/juventuderegnum/MS-Jovem-2026.2)](https://missoes-regnum.vercel.app/)
[![HTML5 / CSS3 / Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20Web-orange.svg)](https://missoes-regnum.vercel.app/)
[![Analytics-Microsoft Clarity](https://img.shields.io/badge/Analytics-Microsoft%20Clarity-blue.svg)](https://clarity.microsoft.com/)
[![Status](https://img.shields.io/badge/Status-Produção%20Ativa-brightgreen.svg)](https://missoes-regnum.vercel.app/)

Esta é a landing page oficial, responsiva e de alta performance desenvolvida para a divulgação, captação e engajamento da **Missão Nossa Senhora Aparecida em São José dos Campos (SJC-SP)**, realizada pela **Juventude Missionária Regnum Christi (Vale do Paraíba)** de 10 a 12 de Outubro de 2026.

🌐 **Site no Ar:** [missoes-regnum.vercel.app](https://missoes-regnum.vercel.app/)  
📸 **Instagram Oficial:** [@jm.valedoparaiba](https://www.instagram.com/jm.valedoparaiba/)

---

## ✨ Principais Funcionalidades & Recursos

### 1. 📊 Analytics & Inteligência de Comportamento (Microsoft Clarity)
* **Mapas de Calor (*Heatmaps*):** Monitoramento visual de onde os usuários clicam e até onde rolam a tela no celular e desktop.
* **Gravação de Sessões (*Session Replays*):** Vídeos anônimos e conformes com a LGPD da experiência real de navegação dos jovens.
* **Métricas do Instagram:** Identificação automática de acessos originados do navegador interno do Instagram (*In-App Browser*).
* **Zero Impacto em Performance:** Script carregado de forma assíncrona (`async`).

### 2. 🎯 Funil de Conversão em 2 Passos & Ficha de Interesse
* **Micro-CTA Persuasivo:** Pílula minimalista com scroll suave conectando a mensagem de propósito diretamente à ficha de interesse.
* **Mini Stepper Visual:** Trilha sequencial clara (*Passo 1: Preencha a Ficha* $\rightarrow$ *Passo 2: Entre no Grupo*).
* **CTA Pulsante de Alta Conversão:** Botão de inscrição com borda em vermelho Regnum Christi e halo luminoso pulsante (`@keyframes redPulseAttention`).

### 3. ⏳ Contador Regressivo em Tempo Real
* Cálculo dinâmico até o dia de início da missão (10 de Outubro de 2026).
* Otimização de ciclo de vida com auto-limpeza (`clearInterval`) para não consumir CPU do dispositivo.
* Marca d'água sagrada e sutil de Nossa Senhora Aparecida integrada ao card.

### 4. 🗺️ Dinâmica dos 3 Dias (Linha do Tempo / Stepper Track)
* Trilha visual de progresso conectada (`10/Out • Sábado` $\rightarrow$ `11/Out • Domingo` $\rightarrow$ `12/Out • Segunda`).
* Destaque do **Dia Principal de Missão** com visitas aos lares e adoração.
* Ícone vetorial estilizado da silhueta de Nossa Senhora Aparecida no Dia 3.

### 5. 📖 Frase Católica Interativa & Tradução
* Carrossel de citações em latim e português com suporte a **gestos de toque lateral (*touch swipe*)**.
* Botão interativo de alternância e tradução instantânea.

### 6. ❓ FAQ Dinâmico & Atendimento da Coordenação
* Sistema de sanfona (*accordion*) com animações suaves e total acessibilidade (`aria-expanded`, `role="region"`).
* Informações transparentes sobre locais atendidos na **Zona Norte de São José dos Campos**, alojamento paroquial, alimentação e autorização de menores.
* Botão de contato direto via WhatsApp com a equipe de coordenação (`+55 12 99188-2850`).

### 7. 🌐 Ecossistema Regnum Christi & Apostolados
* Apresentação histórica dos **40 anos da Juventude Missionária (1986–2026)**.
* Seção de apostolados irmãos no Vale do Paraíba com ícones vetoriais temáticos: *ECYD* (chama jovem), *Cristo na Rua* (cruz e calçadas da cidade), *Teologia no Bar* (diálogo e fé), *Sonhar Acordado* (alegria infantil), *Superação* (construção de capelas) e *MedCal* (estetoscópio e saúde humanitária).
* Card de comunidade com link direto para o Instagram oficial.

---

## 🛠️ Tecnologias & Engenharia

O projeto foi construído utilizando **Vanilla Web Technologies (Web Nativas)** para garantir tempo de carregamento ultrarrápido (< 0.8s) e pontuação máxima no Google Lighthouse / Core Web Vitals.

* **HTML5 Semântico:** Estrutura acessível (`<header>`, `<main>`, `<section>`, `<footer>`), suporte a leitores de tela (`skip-link`, tags `aria-*`), SEO otimizado e marcas Open Graph para preview no WhatsApp e redes sociais.
* **CSS3 Vanilla (Modern Design System):**
  * **Variáveis CSS (`:root`):** Paleta corporativa fiel ao Manual de Identidade JFM (Laranja `#F38A00`, Amarelo `#FFDB00`, Vermelho `#EB0028`, Grafite `#2E2925` e Azul `#001A70`).
  * **Layout Responsivo Mobile-First:** Uso de Flexbox e CSS Grid.
  * **Efeitos Visuais:** Efeito Glassmorphism (`backdrop-filter: blur`), botões arredondados e transições suaves.
* **JavaScript ES6+ (Vanilla / Sem Dependências Externas):**
  * Manipulação de DOM nativa com tratamento de erros e checagem nula (*null safety*).
  * Gestos *touch* com proteção contra travamento de rolagem vertical.
* **Otimização de Mídias (Imagens Next-Gen):**
  * Utilização da tag `<picture>` com fontes em formato **WebP** de última geração (redução de ~80% no peso).
  * Atributos de dimensionamento `width` e `height` explícitos em todas as imagens para evitar **CLS** (Cumulative Layout Shift).
  * Carregamento sob demanda (`loading="lazy"`) para elementos abaixo da dobra e prioridade (`fetchpriority="high"`) na imagem de abertura (Hero).
* **Hospedagem & Deploy:**
  * Configurado para **Vercel** com integração contínua (CI/CD) direta do repositório **GitHub**. Qualquer atualização na branch `main` dispara um deploy automático na Vercel Edge Network.

---

## 📁 Estrutura do Repositório

```
MissoesRegnum/
├── index.html                  # Estrutura HTML5 semântica, Microsoft Clarity e SEO
├── styles.css                  # Design System, variáveis de cores e responsividade
├── script.js                   # Lógica de interações, carrossel, FAQ e contador regressivo
├── README.md                   # Documentação técnica e operacional do projeto
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

1. Ao efetuar qualquer `git push origin main`, a Vercel compila e disponibiliza a nova versão instantaneamente na CDN global com certificado SSL/HTTPS automático.
2. Como se trata de um site estático (HTML/CSS/JS), não requer etapa de build complexa (`build command` vazio e diretório raiz `./`).

---

## ⛪ Juventude Missionária • Regnum Christi
*«Vinde e vede.» (São João 1, 39)*  
*«Sejas o que fores, sê todo de Deus.»*  
*«Christus Rex noster, adveniat Regnum Tuum!»*  
*«Cristo Rei nosso, venha a nós o Vosso Reino!»*
