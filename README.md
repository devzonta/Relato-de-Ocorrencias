# Relato de Ocorrências e Acidentes - SSMA 🛡️

Um sistema web moderno e offline-first desenvolvido para o registro de ocorrências, desvios e acidentes de segurança do trabalho. Substitui papéis e formulários estáticos por uma experiência inteligente e responsiva.

## 🌟 Funcionalidades

- **Diagrama Corporal Dinâmico:** Interface interativa para marcação do local exato da lesão corporal clicando diretamente sobre o manequim.
- **Importação Segura de Excel (Offline-First):** Abasteça o banco de dados do sistema localmente pelo navegador importando a planilha `LISTA_PESSOAS.xlsx`, sem necessidade de enviar dados sensíveis dos funcionários para servidores na nuvem.
- **Inferência Inteligente de Hierarquia:** Ao informar o Líder de um funcionário na planilha, o motor algorítmico do sistema calcula automaticamente toda a árvore hierárquica superior (Coordenador, Gestor) e limpa anomalias e prefixos numéricos.
- **Auto-Completar Turbinado:** O formulário busca instantaneamente no banco de dados local (`IndexedDB`) garantindo zero *delay* na experiência do usuário ao buscar matrículas ou responsáveis.

## 🛠️ Tecnologias Utilizadas

- **Frontend Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) para design utility-first fluido.
- **Banco de Dados Local:** [Dexie.js](https://dexie.org/) operando sobre o IndexedDB para altíssima performance offline.
- **Processamento de Dados:** Biblioteca `xlsx` para conversão e raspagem de dados nativa em browser.

## 🚀 Como Executar Localmente

**Pré-requisitos:** Node.js v18+

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone https://github.com/devzonta/Relato-de-Ocorrencias.git
   cd Relato-de-Ocorrencias
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

*Nota de Segurança: O arquivo LISTA_PESSOAS.xlsx que abastece a base de dados em produção foi intencionalmente bloqueado de subir para este repositório via `.gitignore` para proteção de dados.*
