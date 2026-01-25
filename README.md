# 📱 DevPocket

> Seu bolso de código sempre à mão

DevPocket é um aplicativo mobile para desenvolvedores salvarem, organizarem e reutilizarem snippets de código diretamente no celular. Com syntax highlighting, tags, busca avançada e muito mais.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Expo](https://img.shields.io/badge/Expo-54.0.29-black.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6.svg)

---

## ✨ Funcionalidades

### 📝 Gerenciamento de Snippets
- ✅ Criar, editar e deletar snippets
- ✅ Syntax highlighting em tempo real (suporta 20+ linguagens)
- ✅ Editor de código com scroll horizontal e vertical
- ✅ Preview de código com highlight
- ✅ Copiar código para área de transferência

### 🏷️ Organização
- ✅ Sistema de tags completo
- ✅ Tags sugeridas baseadas na linguagem
- ✅ Filtro por tags (múltipla seleção)
- ✅ Badges visuais para tags

### ⭐ Favoritos
- ✅ Marcar snippets como favoritos
- ✅ Filtrar apenas favoritos
- ✅ Ordenação automática (favoritos primeiro)

### 🔍 Busca Avançada
- ✅ Busca por título, código, linguagem e tags
- ✅ Filtros combinados (tags + favoritos)
- ✅ Busca em tempo real

### 📊 Estatísticas
- ✅ Dashboard completo com métricas
- ✅ Top 5 linguagens mais usadas
- ✅ Top 10 tags mais populares
- ✅ Snippets criados nos últimos 30 dias
- ✅ Média de tags por snippet

### 💾 Importar/Exportar
- ✅ Exportar todos os snippets (JSON)
- ✅ Exportar snippet individual
- ✅ Importar snippets (substituir ou mesclar)
- ✅ Compartilhar snippets

### 🌍 Internacionalização
- ✅ Suporte a Português (pt-BR) e Inglês (en-US)
- ✅ Detecção automática do idioma do dispositivo
- ✅ Interface completamente traduzida

### 💰 Monetização
- ✅ Versão gratuita: limite de 5 snippets
- ✅ Versão premium: snippets ilimitados
- ✅ Compras in-app (mensal/anual)
- ✅ Restaurar compras
- ✅ Anúncios AdMob (apenas versão gratuita)
  - Banner na lista de snippets
  - Intersticial ao criar snippet

### 🎨 Interface
- ✅ Tema claro e escuro
- ✅ Design moderno e responsivo
- ✅ Animações suaves
- ✅ Feedback visual em todas as ações

---

## 🧱 Stack Tecnológica

### Core
- **React Native** 0.81.5
- **Expo** 54.0.29
- **TypeScript** 5.9.2
- **React** 19.1.0

### Estado e Navegação
- **Zustand** - Gerenciamento de estado
- **React Navigation** - Navegação tipada

### Persistência
- **AsyncStorage** - Armazenamento local
- **UUID** - Identificadores únicos

### Funcionalidades
- **react-native-syntax-highlighter** - Syntax highlighting
- **expo-clipboard** - Área de transferência
- **expo-file-system** - Sistema de arquivos
- **expo-sharing** - Compartilhamento
- **expo-localization** - Detecção de idioma
- **i18n-js** - Internacionalização
- **react-native-iap** - Compras in-app
- **react-native-google-mobile-ads** - Anúncios AdMob

---

## 📁 Estrutura do Projeto

```
devpocket/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── AdBanner.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── CodePreview.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── Fab.tsx
│   │   ├── ImportModal.tsx
│   │   ├── Input.tsx
│   │   ├── LanguageSelect.tsx
│   │   ├── LimitReachedModal.tsx
│   │   ├── Screen.tsx
│   │   ├── SearchHeader.tsx
│   │   ├── TagBadge.tsx
│   │   ├── TagFilter.tsx
│   │   ├── TagInput.tsx
│   │   └── ThemeToggle.tsx
│   ├── constants/            # Constantes
│   │   ├── languages.ts
│   │   └── suggestedTags.ts
│   ├── hooks/                # Custom hooks
│   │   └── useTranslation.ts
│   ├── i18n/                 # Internacionalização
│   │   ├── index.ts
│   │   ├── pt-BR.ts
│   │   └── en-US.ts
│   ├── navigation/           # Configuração de rotas
│   │   └── index.tsx
│   ├── screens/              # Telas da aplicação
│   │   ├── SnippetListScreen.tsx
│   │   ├── SnippetFormScreen.tsx
│   │   ├── StatisticsScreen.tsx
│   │   └── UpgradeScreen.tsx
│   ├── storage/              # Persistência
│   │   └── snippetStorage.ts
│   ├── store/                # Zustand stores
│   │   ├── snippetStore.ts
│   │   └── premiumStore.ts
│   ├── theme/                # Sistema de temas
│   │   ├── colors.ts
│   │   ├── theme.ts
│   │   ├── ThemeProvider.tsx
│   │   └── tokens.ts
│   ├── types/                # Tipos TypeScript
│   │   ├── snippet.ts
│   │   └── syntax-highlighter.d.ts
│   ├── utils/                # Funções utilitárias
│   │   ├── adMob.ts
│   │   ├── generateId.ts
│   │   ├── getSuggestedTagsByLanguage.ts
│   │   ├── interstitialAd.ts
│   │   ├── languageMap.ts
│   │   ├── purchases.ts
│   │   ├── snippetExport.ts
│   │   ├── snippetImport.ts
│   │   └── snippetStatistics.ts
│   └── App.tsx               # Componente raiz
├── assets/                   # Imagens e ícones
├── app.json                  # Configuração Expo
├── package.json
└── tsconfig.json
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente ou via npx)
- **Expo Go** (para testar no dispositivo) ou **Android Studio** (para emulador)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/devpocket.git

# Entrar na pasta
cd devpocket

# Instalar dependências
npm install
```

### Executar

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Ou usar Expo CLI diretamente
npx expo start
```

Depois, pressione:
- **`a`** para abrir no emulador Android
- **`i`** para abrir no simulador iOS
- **Escaneie o QR Code** com o Expo Go no seu dispositivo

### Comandos Adicionais

```bash
# Limpar cache e reiniciar
npx expo start --clear

# Rodar apenas Android
npm run android

# Rodar apenas iOS
npm run ios

# Criar build de desenvolvimento (requer configuração)
npx expo run:android
npx expo run:ios
```

---

## 🎯 Funcionalidades Detalhadas

### Syntax Highlighting

O app suporta syntax highlighting para mais de 20 linguagens de programação:
- JavaScript, TypeScript
- Python, Java, C, C++
- HTML, CSS, SCSS
- React, Vue, Angular
- SQL, JSON, XML
- E muitas outras...

### Sistema de Tags

- Tags sugeridas baseadas na linguagem selecionada
- Validação de formato (sem espaços, caracteres especiais)
- Filtro por múltiplas tags simultaneamente
- Contador de tags selecionadas

### Busca Inteligente

A busca funciona em:
- Título do snippet
- Código completo
- Linguagem
- Tags

### Estatísticas

O dashboard de estatísticas mostra:
- Total de snippets
- Total de favoritos
- Tags únicas
- Snippets dos últimos 30 dias
- Top linguagens (com barras de progresso)
- Top tags (com contadores)
- Média de tags por snippet
- Snippet mais antigo e mais recente

---

## 💰 Modelo de Monetização

### Versão Gratuita
- ✅ Limite de 5 snippets
- ✅ Todas as funcionalidades básicas
- ✅ Anúncios AdMob (banner + intersticial)

### Versão Premium
- ✅ Snippets ilimitados
- ✅ Sem anúncios
- ✅ Todas as funcionalidades
- 💵 R$ 9,90/mês ou R$ 79,90/ano

---

## 🌍 Idiomas Suportados

- 🇧🇷 **Português (pt-BR)**
- 🇺🇸 **Inglês (en-US)**

O app detecta automaticamente o idioma do dispositivo e ajusta a interface.

---

## 🧠 Decisões Técnicas

### Arquitetura
- **Zustand** para gerenciamento de estado (leve e performático)
- **Separação de responsabilidades** (components, screens, utils, store)
- **Tipagem forte** com TypeScript em todo o projeto
- **Navegação tipada** com React Navigation

### Persistência
- **AsyncStorage** para armazenamento local
- **Abstração em camada própria** (`storage/`) para facilitar migração futura
- **Normalização de dados** ao carregar snippets

### Performance
- **Lazy loading** de componentes pesados
- **Memoização** onde necessário
- **Otimização de re-renders** com Zustand

### UX/UI
- **Tema claro/escuro** com detecção automática
- **Feedback visual** em todas as ações
- **Animações suaves** para transições
- **Empty states** informativos
- **Loading states** durante operações

---

## 📱 Plataformas Suportadas

- ✅ **Android** (5.0+)
- ✅ **iOS** (13.0+)

---

## 🔧 Configuração para Produção

### Compras In-App

1. Configure produtos no Google Play Console / App Store Connect
2. Atualize os IDs em `src/utils/purchases.ts`
3. Teste em sandbox antes de publicar

### AdMob

1. Crie conta no Google AdMob
2. Registre seu app
3. Obtenha App IDs e Ad Unit IDs
4. Atualize em `app.json` e `src/utils/adMob.ts`

### Build de Produção

```bash
# Usando EAS Build (recomendado)
npm install -g eas-cli
eas build --platform android --profile production
eas build --platform ios --profile production

# Ou build local
npx expo run:android --variant release
npx expo run:ios --configuration Release
```

---

## 📄 Licença

Este projeto é privado e proprietário.

---

## 👨‍💻 Desenvolvimento

### Adicionar Nova Linguagem

1. Adicione a linguagem em `src/constants/languages.ts`
2. O syntax highlighting funcionará automaticamente

### Adicionar Novo Idioma

1. Crie arquivo em `src/i18n/` (ex: `es-ES.ts`)
2. Copie estrutura de `pt-BR.ts` e traduza
3. Adicione em `src/i18n/index.ts`

### Estrutura de um Snippet

```typescript
{
  id: string;
  title: string;
  code: string;
  language: CodeLanguage;
  tags: string[];
  isFavorite?: boolean;
  createdAt: number;
  updatedAt: number;
}
```

---

## 🐛 Troubleshooting

### Erro ao iniciar
```bash
# Limpar cache
npx expo start --clear
# Ou
rm -rf node_modules && npm install
```

### Erro de módulos nativos
- Use Development Build (`npx expo run:android`) em vez de Expo Go
- Alguns módulos (compras, anúncios) não funcionam no Expo Go

### Erro de compras
- Verifique se os IDs dos produtos estão corretos
- Teste em sandbox primeiro
- Certifique-se de estar usando Development Build

---

## 📚 Documentação Adicional

- `GUIA_CONFIGURACAO.md` - Configuração de compras e i18n
- `GUIA_ADMOB.md` - Configuração do AdMob
- `INSTRUCOES_BUILD.md` - Como criar builds

---

## 🎉 Agradecimentos

Desenvolvido com ❤️ usando React Native e Expo.

---

**Versão:** 1.0.0  
**Última atualização:** 2024
