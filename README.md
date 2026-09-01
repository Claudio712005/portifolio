# Portfólio Pessoal

Portfólio pessoal multilíngue com uma camada WebGL persistente: o título de cada rota é renderizado como material deformável, não como texto com efeito por cima.

## Visão Geral

Site multi-rota com roteamento por localidade, tema claro/escuro e um sistema visual próprio — "Ink" e "Bone" — construído sobre tokens de cor em CSS variables que a cena WebGL também lê. Todo o conteúdo vem de arquivos de dados estáticos versionados junto ao código, sem APIs externas.

O título de cada página é pintado num canvas 2D e entregue a um shader que o distorce, refrata e separa em canais de cor, reagindo ao cursor e ao scroll. Onde WebGL não se justifica — mobile, ponteiro grosseiro, `prefers-reduced-motion` — o mesmo título é tipografia real com o acento fora de registro, e o three.js nunca é baixado.

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| 3D / WebGL | Three.js (shader próprio, sem react-three-fiber) |
| Animações | GSAP + ScrollTrigger |
| Tipografia | Zodiak (self-hosted, ITF FFL) + Instrument Sans + JetBrains Mono |
| Temas | next-themes |
| Internacionalização | i18n (pt-BR / en / es) |

## Funcionalidades

- **Multilíngue** — suporte a Português (padrão), Inglês e Espanhol via roteamento dinâmico `[locale]`
- **Tema claro/escuro** — alternância sem flash (SSR-safe) via `next-themes`
- **Campo tipográfico em WebGL** — canvas único e persistente, que sobrevive à navegação e derrete/reforma o título a cada troca de rota
- **Fallback sem WebGL** — mobile e reduced-motion recebem o mesmo desenho em tipografia real; o chunk do three.js (≈504 kB) só é buscado quando vai ser usado
- **Página por projeto** — cada um dos 13 projetos tem rota própria, aberta pelo problema e seguida da solução, stack e links
- **Índice editorial** — projetos e stack como listas tipográficas, sem grade de cards
- **Sequência de boot** — intro que reporta marcos reais e só sai quando as fontes carregaram; uma vez por sessão, nunca sob `prefers-reduced-motion`
- **Reação por seção** — scramble, eixo de peso variável, atração magnética e leitura amarrada ao scroll; cada seção reage de um jeito
- **Acessibilidade** — HTML semântico, skip link, foco visível, contraste verificado e `prefers-reduced-motion`
- **Export estático** — 50 páginas HTML pré-renderizadas (3 localidades), sem runtime de servidor
- **Dados estáticos tipados** — perfil carregado de arquivos JSON por localidade, sem chamadas a APIs externas
- **Server Components por padrão** — máximo de performance e SEO com Next.js App Router

## Estrutura do Projeto

```
src/
├── app/
│   └── [locale]/          # Roteamento por localidade
│       ├── projects/      # Índice + [slug] por projeto
│       └── about/
├── features/              # Módulos por funcionalidade
│   ├── canvas/            # Camada WebGL: provider, canvas, fallback
│   ├── home/
│   ├── work/
│   └── about/
├── components/
│   ├── ui/                # Componentes genéricos reutilizáveis
│   └── layout/            # Header, Footer, providers
├── lib/
│   ├── i18n/              # Configuração e dicionários de tradução
│   ├── group-skills.ts    # Agrupamento das skills por categoria
│   ├── split-projects.ts  # Separação entre projetos em destaque e demais
│   ├── project-cover.ts   # Gradientes das capas de projeto
│   └── nav-sections.ts    # Âncoras da navegação
├── hooks/                 # Scroll spy e estado de scroll do header
└── types/                 # Tipagens globais
data/
├── profile.pt-BR.json     # Dados do perfil em português
├── profile.en.json        # Dados do perfil em inglês
└── profile.es.json        # Dados do perfil em espanhol
```

## Como Executar

**Pré-requisitos:** Node.js 18+ e npm

```bash
# 1. Clone o repositório
git clone https://github.com/Claudio712005/portifolio.git
cd portifolio

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Análise estática do código
```

## Personalização

Para atualizar o conteúdo do portfólio, edite os arquivos em [data/](data/). Cada idioma possui seu próprio arquivo JSON com os dados de perfil, projetos, experiências e formação acadêmica.

Para adicionar ou alterar textos da interface, edite os dicionários em [src/lib/i18n/locales/](src/lib/i18n/locales/).

## Licença

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
