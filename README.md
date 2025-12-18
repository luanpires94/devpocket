📱 DevPocket

DevPocket é um aplicativo mobile para desenvolvedores salvarem, organizarem e reutilizarem snippets de código diretamente no celular.

Construído com React Native + Expo, o projeto foca em boas práticas, tipagem forte, arquitetura limpa e experiência real de produto.

✨ Funcionalidades

✅ Criar snippets de código

✅ Editar snippets existentes

✅ Persistência local com AsyncStorage

🗑️ Excluir snippets (em desenvolvimento)

🔍 Busca e filtros (planejado)

🌙 Dark mode (planejado)

🧱 Stack utilizada

React Native

Expo

TypeScript

Zustand (gerenciamento de estado)

React Navigation (Native Stack)

AsyncStorage (persistência local)

UUID (identificadores únicos)

🗂️ Estrutura do projeto
src/
├── components/ # Componentes reutilizáveis
├── navigation/ # Configuração de rotas
├── screens/ # Telas da aplicação
├── store/ # Zustand stores
├── storage/ # AsyncStorage abstraído
├── types/ # Tipos e interfaces
├── utils/ # Funções utilitárias

🚀 Como rodar o projeto
Pré-requisitos

Node.js (18+)

Expo CLI

Android Studio ou Expo Go

Instalação
git clone https://github.com/SEU_USUARIO/devpocket.git
cd devpocket
npm install

Executar
npm start

Depois pressione:

a para abrir no emulador Android

ou escaneie o QR Code com o Expo Go

🧠 Aprendizados e decisões técnicas

Uso de Zustand para evitar prop drilling e manter o estado previsível

Persistência isolada em camada própria (storage)

Tipagem rigorosa com TypeScript

Navegação tipada com Native Stack

Tratamento de edge cases de ambiente mobile (UUID, polyfills)
