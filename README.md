# Landing Page - Missões Juventude Missionária (Regnum Christi)

Esta é a landing page oficial e minimalista para captação de interesse e divulgação dos eventos de **Missões da Juventude Missionária (Regnum Christi / Juventud y Familia Misionera)**.

---

## 🌟 Destaques do Projeto & Identidade Visual

- **Manual de Identidade Respeitado**: Utilização fiel das cores oficiais corporativas:
  - **Laranja Principal**: `#F38A00` (PANTONE 144 C)
  - **Amarelo Vibrante**: `#FFDB00` (PANTONE 108 C)
  - **Vermelho**: `#EB0028` / `#FF3A1D` (PANTONE 185 C)
  - **Preto/Grafite**: `#2E2925` (PANTONE Black C)
  - **Azul Escuro Auxiliar**: `#001A70`
- **Gigantismo Tipográfico**: Fontes modernas (`Outfit` / `Plus Jakarta Sans` / `Caveat`) alinhadas ao estilo *Keep Calm* e às tipografias auxiliares do manual.
- **Elementos Gráficos**: Anéis orgânicos translúcidos em movimento suave no fundo, representando as 4 dimensões do **Misionero 365** (Espiritual, Apostólico, Humano, Social).
- **Destaque Central**: Imagem oficial da garotinha representando a missão e a entrega a Cristo, acompanhada de frases motivacionais em rotação automática.
- **Contador Regressivo em Tempo Real**: Timer em tempo real de dias, horas, minutos e segundos até a próxima missão.
- **Botão Inteligente do WhatsApp**: Encaminhamento direto para o Grupo de Informações do WhatsApp com mensagem pré-formatada.
- **Modal de Cadastro de Interesse**: Formulário rápido para os jovens deixarem nome, telefone/WhatsApp, idade e cidade/paróquia.
- **Painel de Configuração Rápida**: Botão no próprio rodapé do contador que permite ao organizador ajustar o nome do evento, a data/hora exata e o link do grupo do WhatsApp sem mexer no código!

---

## 📁 Estrutura de Arquivos

```
MissoesRegnum/
├── index.html            # Estrutura principal da página (SEO, Open Graph, HTML5)
├── styles.css            # Estilização minimalista, moderna e responsiva
├── script.js             # Lógica do contador, formulários, WhatsApp e localStorage
├── README.md             # Documentação do projeto
└── assets/
    ├── logo-isotipo.png  # Logotipo oficial (Cruz e traços de tinta)
    ├── garotinha-missoes.jpg # Imagem da garotinha missionária com Cristo
    └── favicon.svg       # Favicon personalizado para o navegador
```

---

## 🚀 Como Executar e Testar

1. **Abertura Direta**: Basta dar um duplo clique no arquivo `index.html` em qualquer navegador (Chrome, Edge, Firefox, Safari).
2. **Servidor Local (Opcional)**:
   Se preferir testar em um servidor local (ex: Node/Python):
   ```bash
   # Utilizando Python
   python -m http.server 8000

   # Ou utilizando Node/npx
   npx serve .
   ```
   Acesse: `http://localhost:8000`

---

## ⚙️ Como Personalizar o Evento e o Link do WhatsApp

### 1. Pela Interface (Recomendado)
Clique no botão **"⚙️ Ajustar data do evento"** localizado logo abaixo do contador regressivo na página. Você poderá alterar:
- Nome do Evento (ex: *Missão de Férias 2027*, *Missão de Semana Santa*)
- Data e Hora exata do evento
- Link do seu grupo do WhatsApp (ex: `https://chat.whatsapp.com/SEU_GRUPO`)

As alterações ficam salvas no navegador!

### 2. Diretamente no Arquivo `script.js`
Caso deseje alterar os padrões para todos os visitantes, edite a constante no início do arquivo `script.js`:
```javascript
const DEFAULT_EVENT_NAME = "Missão de Férias & Semana Santa";
let whatsappGroupUrl = "https://chat.whatsapp.com/SEU_LINK_AQUI";
```

---

## ⛪ Juventude e Família Misionera • Regnum Christi
*"Convocar, formar e enviar agentes de evangelização que transformem suas comunidades."*
