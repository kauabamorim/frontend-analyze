# frontend-analyze

Este é o front-end da aplicação **Analyze**, desenvolvido com [Next.js](https://nextjs.org/) e hospedado na **AWS Amplify**. A aplicação integra-se com um back-end em Node.js/Express e utiliza o Prisma ORM para gerenciamento do banco de dados.

---

## 🔗 Link de Produção

> ✅ Hospedado via Vercel:  
[https://frontend-analyze.vercel.app/](https://frontend-analyze.vercel.app/)

---

## 🛠️ Tecnologias Utilizadas

- **Next.js** – Framework React com suporte a SSR/SSG.
- **TypeScript** – Superset do JavaScript com tipagem estática.
- **Prisma** – ORM moderno para banco de dados relacional.
- **ShadCN UI** – Componentes acessíveis baseados em Tailwind CSS.
- **Tailwind CSS** – Framework de utilitários para estilização.
- **Axios** – Cliente HTTP para comunicação com a API.
- **Zod** – Biblioteca de validação de esquemas.
- **Lucide-react** – Biblioteca de ícones leves e personalizáveis.

---

## ⚙️ Funcionalidades

- Sistema de autenticação e controle de sessão.
- Alternância de tema **claro** e **escuro**, com persistência via cookies.
- Interface responsiva e moderna, adaptada para mobile e desktop.
- Visualização e gerenciamento de dados conectados à API.
- Integração com sistema de convites e organizações por plano de usuário.

---

## 🚀 Deploy

O deploy é realizado automaticamente pela **Vercel** a cada novo push na branch `main`. O processo inclui:

- Instalação de dependências
- Build do projeto
- Deploy contínuo

---

## 📁 Estrutura de Pastas

```
/src
├── app/                       # Estrutura de rotas (Next.js App Router)
│   ├── (private)/             # Rotas protegidas (autenticadas)
│   │   └── layout.tsx
│   ├── (public)/              # Rotas públicas (login, cadastro)
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx             # Layout raiz
│   ├── page.tsx               # Página inicial
│   └── globals.css            # Estilo global
│
├── components/                # Componentes reutilizáveis
│   └── ui/                    # Componentes de interface
│
├── hooks/                     # Hooks personalizados
│   └── use-mobile.ts
│
├── lib/                       # Funções utilitárias, configs, instâncias
│   ├── api/                   # Organização melhor para API
│   │   └── instance.ts        # Instância do Axios
│   ├── utils.ts               # Funções utilitárias
│   └── middleware.ts          # Middlewares
│
├── public/                    # Arquivos públicos (favicon, imagens)
│
└── styles/                    # Estilos globais
    └── tailwind.css
```

