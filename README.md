# 🐾 PetMatch

Aplicação web de **cadastro e adoção de pets** desenvolvida com React e TypeScript, permitindo o registro completo de animais e tutores, ficha de anamnese, perfis detalhados, sistema de avaliações e comentários, com autenticação segura e interface totalmente responsiva.

O projeto foi desenvolvido com foco em boas práticas de arquitetura frontend, organização escalável por features e integração com backend via BaaS.

🔗 Deploy: https://pet-match-app-nine.vercel.app/  
🔗 Repositório: https://github.com/hubdanielcode/PetMatch-App

---

## 🚀 Demonstração

O sistema permite:

- Cadastro e autenticação de usuários
- Registro completo de pets e tutores
- Ficha de anamnese detalhada por animal
- Feed de pets disponíveis para adoção
- Filtros de busca no feed
- Perfis individuais de pets e tutores
- Sistema de avaliações com estrelas
- Sistema de comentários nos perfis
- Suporte a tema claro e escuro
- Persistência de sessão
- Interface responsiva para desktop e mobile

---

## 🏗️ Arquitetura e Decisões Técnicas

O projeto foi estruturado seguindo o padrão de organização por **features**, promovendo escalabilidade e separação de responsabilidades:

- `features/authentication`
- `features/pet-registration`
- `features/user-profile`
- `shared`

### Principais decisões técnicas:

- Separação clara entre lógica, UI, pages e serviços dentro de cada feature
- Context API para gerenciamento de estado global (registro e tema)
- Camada de services para comunicação com o Supabase
- Hooks customizados organizados por domínio (pet-hooks, tutor-hooks, anamnese-hooks)
- Componentização reutilizável com pasta `ui` por feature
- Estrutura preparada para crescimento e manutenção futura

---

## 🔐 Autenticação

Implementada com Supabase utilizando:

- Registro e login com e-mail e senha
- Autenticação baseada em JWT
- Persistência automática de sessão
- Proteção de rotas privadas
- Isolamento de dados por usuário autenticado

Cada usuário visualiza e gerencia exclusivamente seus próprios dados.

---

## ⚙️ Funcionalidades

✔ Cadastro e autenticação de usuários  
✔ CRUD completo de pets  
✔ CRUD completo de tutores  
✔ Ficha de anamnese completa (comportamento, doenças, alimentação, reprodução, cirurgias, testículos, passeios)  
✔ Feed de pets com filtros dinâmicos  
✔ Perfis de pets e tutores  
✔ Sistema de avaliações com estrelas  
✔ Sistema de comentários nos perfis  
✔ Upload de imagens  
✔ Badges por raça e características do pet  
✔ Tema claro e escuro  
✔ Modal de boas-vindas para novos usuários  
✔ Páginas institucionais (Sobre, Como Funciona, Política de Privacidade, Termos de Uso)  
✔ Página 404 personalizada  
✔ Testes automatizados com Vitest e React Testing Library  
✔ Conexão direta com banco de dados real via Supabase  

---

## 🧪 Testes

O projeto conta com uma suíte de testes automatizados cobrindo os principais componentes, hooks, serviços e utilitários:

- **Autenticação** — `Authentication`, `Login`, `ProtectedRoute`, `RecoverPassword`, componentes de UI (`Card`, `CardActions`, `CardText`, `CardTitle`, `FeatureItem`)
- **Pet Registration** — hooks de pet, tutor e anamnese, pages de formulário e anamnese, serviços, contexto e componentes de UI
- **User Profile** — hooks de comentários, pages de perfil de pet e tutor, modal de edição e serviço de comentários
- **Shared** — contexto de tema, hooks de avaliação, pages principais, feed, filtro, modais, UI compartilhada e serviço de avaliações

Os testes utilizam `renderHook` para hooks e mocks do Supabase para isolamento de dependências externas.

---

## 🛠️ Tecnologias Utilizadas

- React (Vite)
- TypeScript
- Tailwind CSS
- Supabase (Autenticação e Banco de Dados)
- Vitest + React Testing Library
- Vercel (Deploy e hospedagem)
- Git & GitHub

---

## ▶️ Executando Localmente

Clone o repositório:

```bash
git clone https://github.com/hubdanielcode/PetMatch-App.git
cd PetMatch-App
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

Execute a aplicação:

```bash
npm run dev
```

Acesse no navegador:

```
http://localhost:5173
```

Execute os testes:

```bash
npm run test
```

---

## 🧠 Conceitos Aplicados

- Componentização e reutilização de UI
- Organização escalável por features
- Gerenciamento de estado com Hooks e Context API
- Autenticação JWT com Supabase
- Integração com Backend as a Service (BaaS)
- Persistência de sessão
- Upload e exibição de imagens
- Testes automatizados de componentes, hooks e serviços
- Boas práticas de estruturação de projeto frontend

---

## 📂 Estrutura do Projeto

```
PetMatch/
├── public/
│   ├── animais-cama.png
│   └── logo-petmatch.png
│
├── src/
│   ├── assets/
│   │   └── peticon.png
│   │
│   ├── features/
│   │   ├── authentication/
│   │   │   ├── pages/
│   │   │   │   ├── Authentication.tsx
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   └── RecoverPassword.tsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── CardActions.tsx
│   │   │   │   ├── CardText.tsx
│   │   │   │   ├── CardTitle.tsx
│   │   │   │   └── FeatureItem.tsx
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── pet-registration/
│   │   │   ├── context/
│   │   │   │   └── RegistrationContext.tsx
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── anamnese-hooks/
│   │   │   │   │   ├── useCreateAnamnese.ts
│   │   │   │   │   └── useGetAnamnese.ts
│   │   │   │   │
│   │   │   │   ├── context-hooks/
│   │   │   │   │   └── useRegistrationContext.ts
│   │   │   │   │
│   │   │   │   ├── pet-hooks/
│   │   │   │   │   ├── useCreatePet.ts
│   │   │   │   │   ├── useDeletePet.ts
│   │   │   │   │   ├── useGetAllPets.ts
│   │   │   │   │   ├── useGetPets.ts
│   │   │   │   │   ├── usePetBadges.ts
│   │   │   │   │   ├── usePetBreeds.ts
│   │   │   │   │   └── useUpdatePet.ts
│   │   │   │   │
│   │   │   │   └── tutor-hooks/
│   │   │   │       ├── useCreateTutor.ts
│   │   │   │       ├── useDeleteTutor.ts
│   │   │   │       ├── useGetTutors.ts
│   │   │   │       └── useUpdateTutor.ts
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── anamnese/
│   │   │   │   │   ├── AnamneseBehavior.tsx
│   │   │   │   │   ├── AnamneseDiseases.tsx
│   │   │   │   │   ├── AnamneseFeeding.tsx
│   │   │   │   │   ├── AnamneseFlow.tsx
│   │   │   │   │   ├── AnamneseReproduction.tsx
│   │   │   │   │   ├── AnamneseSurgeries.tsx
│   │   │   │   │   ├── AnamneseTesticles.tsx
│   │   │   │   │   └── AnamneseWalks.tsx
│   │   │   │   │
│   │   │   │   └── forms/
│   │   │   │       ├── RegisterFlow.tsx
│   │   │   │       ├── RegisterPet.tsx
│   │   │   │       └── RegisterTutor.tsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── anamneseService.ts
│   │   │   │   ├── petService.ts
│   │   │   │   └── tutorService.ts
│   │   │   │
│   │   │   ├── types/
│   │   │   │   ├── anamnsese.ts
│   │   │   │   ├── pet.ts
│   │   │   │   └── tutor.ts
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── FileUpload.tsx
│   │   │   │   └── RadioGroup.tsx
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   └── user-profile/
│   │       ├── hooks/
│   │       │   ├── useCreateComment.ts
│   │       │   ├── useDeleteComment.ts
│   │       │   ├── useGetComments.ts
│   │       │   └── useUpdateComment.ts
│   │       │
│   │       ├── pages/
│   │       │   ├── modal/
│   │       │   │   └── EditProfileModal.tsx
│   │       │   │
│   │       │   └── profile/
│   │       │       ├── PetInfo.tsx
│   │       │       ├── PetProfile.tsx
│   │       │       ├── TutorInfo.tsx
│   │       │       └── TutorProfile.tsx
│   │       │
│   │       ├── services/
│   │       │   └── commentService.ts
│   │       │
│   │       ├── types/
│   │       │   └── comment.ts
│   │       │
│   │       └── index.ts
│   │
│   ├── shared/
│   │   ├── context/
│   │   │   └── ThemeContext.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── rating/
│   │   │   │   ├── useCreateRating.ts
│   │   │   │   ├── useDeleteRating.ts
│   │   │   │   ├── useGetRatings.ts
│   │   │   │   └── useUpdateRating.ts
│   │   │   │
│   │   │   └── theme/
│   │   │       └── useTheme.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── footer-links/
│   │   │   │   ├── About.tsx
│   │   │   │   ├── HowDoesItWork.tsx
│   │   │   │   ├── PrivacyPolicy.tsx
│   │   │   │   └── TermsOfUse.tsx
│   │   │   │
│   │   │   ├── main/
│   │   │   │   ├── MainPage.tsx
│   │   │   │   ├── PetFeed.tsx
│   │   │   │   └── PetFilter.tsx
│   │   │   │
│   │   │   ├── missing/
│   │   │   │   └── Missing.tsx
│   │   │   │
│   │   │   └── modal/
│   │   │       ├── Modal.tsx
│   │   │       └── Welcome.tsx
│   │   │
│   │   ├── services/
│   │   │   └── ratingService.ts
│   │   │
│   │   ├── types/
│   │   │   └── rating.ts
│   │   │
│   │   ├── ui/
│   │   │   ├── Badges.tsx
│   │   │   ├── FeedCard.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── StarRating.tsx
│   │   │
│   │   ├── utils/
│   │   │   ├── masks.ts
│   │   │   ├── regex.ts
│   │   │   ├── registerPetOptions.ts
│   │   │   └── theme.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── supabase/
│   ├── .temp/
│   │   └── cli-latest
│   └── supabase.ts
│
├── tests/
│   ├── features/
│   │   ├── authentication/
│   │   │   ├── pages/
│   │   │   │   ├── Authentication.test.tsx
│   │   │   │   ├── Login.test.tsx
│   │   │   │   ├── ProtectedRoute.test.tsx
│   │   │   │   └── RecoverPassword.test.tsx
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Card.test.tsx
│   │   │       ├── CardActions.test.tsx
│   │   │       ├── CardText.test.tsx
│   │   │       ├── CardTitle.test.tsx
│   │   │       └── FeatureItem.test.tsx
│   │   │
│   │   ├── pet-registration/
│   │   │   ├── context/
│   │   │   │   └── RegistrationContext.test.tsx
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── anamnese-hooks/
│   │   │   │   │   ├── useCreateAnamnese.test.ts
│   │   │   │   │   └── useGetAnamnese.test.ts
│   │   │   │   │
│   │   │   │   ├── context-hooks/
│   │   │   │   │   └── useRegistrationContext.test.tsx
│   │   │   │   │
│   │   │   │   ├── pet-hooks/
│   │   │   │   │   ├── useCreatePet.test.ts
│   │   │   │   │   ├── useDeletePet.test.ts
│   │   │   │   │   ├── useGetAllPets.test.ts
│   │   │   │   │   ├── useGetPets.test.ts
│   │   │   │   │   ├── usePetBadge.test.ts
│   │   │   │   │   ├── usePetBreed.test.ts
│   │   │   │   │   └── useUpdatePet.test.ts
│   │   │   │   │
│   │   │   │   └── tutor-hooks/
│   │   │   │       ├── useCreateTutor.test.ts
│   │   │   │       ├── useDeleteTutor.test.ts
│   │   │   │       ├── useGetTutors.test.ts
│   │   │   │       └── useUpdateTutor.test.ts
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── anamnese/
│   │   │   │   │   ├── AnamneseBehavior.test.tsx
│   │   │   │   │   ├── AnamneseDiseases.test.tsx
│   │   │   │   │   ├── AnamneseFeeding.test.tsx
│   │   │   │   │   ├── AnamneseFlow.test.tsx
│   │   │   │   │   ├── AnamneseReproduction.test.tsx
│   │   │   │   │   ├── AnamneseSurgeries.test.tsx
│   │   │   │   │   ├── AnamneseTesticles.test.tsx
│   │   │   │   │   └── AnamneseWalks.test.tsx
│   │   │   │   │
│   │   │   │   └── forms/
│   │   │   │       ├── RegisterFlow.test.tsx
│   │   │   │       ├── RegisterPet.test.tsx
│   │   │   │       └── RegisterTutor.test.tsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── anamneseService.test.ts
│   │   │   │   ├── petService.test.ts
│   │   │   │   └── tutorService.test.ts
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── FileUpload.test.tsx
│   │   │       └── RadioGroup.test.tsx
│   │   │
│   │   └── user-profile/
│   │       ├── hooks/
│   │       │   ├── useCreateComment.test.ts
│   │       │   ├── useDeleteComment.test.ts
│   │       │   ├── useGetComments.test.ts
│   │       │   └── useUpdateComment.test.ts
│   │       │
│   │       ├── pages/
│   │       │   ├── modal/
│   │       │   │   └── EditProfileModal.test.tsx
│   │       │   │
│   │       │   └── profile/
│   │       │       ├── PetInfo.test.tsx
│   │       │       ├── PetProfile.test.tsx
│   │       │       ├── TutorInfo.test.tsx
│   │       │       └── TutorProfile.test.tsx
│   │       │
│   │       └── services/
│   │           └── commentService.test.ts
│   │
│   ├── shared/
│   │   ├── context/
│   │   │   └── ThemeContext.test.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── rating/
│   │   │   │   ├── useCreateRating.test.ts
│   │   │   │   ├── useDeleteRating.test.ts
│   │   │   │   ├── useGetRatings.test.ts
│   │   │   │   └── useUpdateRating.test.ts
│   │   │   │
│   │   │   └── theme/
│   │   │       └── useTheme.test.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── footer-links/
│   │   │   │   ├── About.test.tsx
│   │   │   │   ├── HowDoesItWork.test.tsx
│   │   │   │   ├── PrivacyPolicy.test.tsx
│   │   │   │   └── TermsOfUse.test.tsx
│   │   │   │
│   │   │   ├── main/
│   │   │   │   ├── MainPage.test.tsx
│   │   │   │   ├── PetFeed.test.tsx
│   │   │   │   └── PetFilter.test.tsx
│   │   │   │
│   │   │   ├── missing/
│   │   │   │   └── Missing.test.tsx
│   │   │   │
│   │   │   └── modal/
│   │   │       ├── Modal.test.tsx
│   │   │       └── Welcome.test.tsx
│   │   │
│   │   ├── services/
│   │   │   └── ratingService.test.ts
│   │   │
│   │   └── ui/
│   │       ├── Badges.test.tsx
│   │       ├── FeedCard.test.tsx
│   │       ├── Footer.test.tsx
│   │       ├── Header.test.tsx
│   │       └── StarRating.test.tsx
│   │
│   └── setup.ts
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

---

## 🌍 Deploy

O projeto está publicado na Vercel, garantindo:

- Deploy automático via GitHub
- Build otimizado para produção
- Ambiente seguro com variáveis de ambiente configuradas no painel da Vercel

---

## 📱 Responsividade

A aplicação possui adaptação completa para:

- **Desktop** — layout padrão com feed e visualizações amplas
- **Mobile** — componentes otimizados para toque e telas pequenas

---

## 📌 Observações

- Os dados são vinculados ao usuário autenticado
- Cada usuário gerencia exclusivamente seus próprios pets, tutores e avaliações
- As variáveis de ambiente do Supabase são obrigatórias para o funcionamento local

---

## 📄 Licença

Este projeto é livre para fins de estudo, aprendizado e uso pessoal.
