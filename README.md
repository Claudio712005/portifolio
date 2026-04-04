# Portfólio Pessoal

Site de portfólio pessoal moderno, responsivo e multilíngue — construído com Next.js 14, TypeScript e Tailwind CSS.

## Visão Geral

Aplicação de página única (SPA) com roteamento por localidade, animações fluidas e fundos 3D interativos. Todo o conteúdo é alimentado por arquivos de dados estáticos versionados junto ao código, sem dependência de APIs externas.

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Animações | Framer Motion |
| 3D / WebGL | Three.js |
| Temas | next-themes |
| Internacionalização | i18n (pt-BR / en / es) |

## Funcionalidades

- **Multilíngue** — suporte a Português (padrão), Inglês e Espanhol via roteamento dinâmico `[locale]`
- **Tema claro/escuro** — alternância sem flash (SSR-safe) via `next-themes`
- **Fundos 3D interativos** — cenas WebGL com Three.js (ondas, geometrias flutuantes, constelação de partículas)
- **Trilha do mouse** — efeito canvas animado que segue o cursor
- **Seções completas** — Hero, Sobre, Habilidades, Projetos, Experiência, Formação e Contato
- **Dados estáticos tipados** — perfil carregado de arquivos JSON por localidade, sem chamadas a APIs externas
- **Server Components por padrão** — máximo de performance e SEO com Next.js App Router

## Estrutura do Projeto

```
src/
├── app/
│   └── [locale]/          # Roteamento por localidade
├── features/              # Módulos por funcionalidade
│   ├── hero/
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── experience/
│   ├── education/
│   └── contact/
├── components/
│   ├── ui/                # Componentes genéricos reutilizáveis
│   └── layout/            # Header, Footer, providers
├── lib/
│   ├── i18n/              # Configuração e dicionários de tradução
│   └── three/             # Cenas e utilitários WebGL
├── hooks/                 # Custom hooks
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
