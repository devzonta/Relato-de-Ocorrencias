# Relato de Ocorrências e Acidentes - SSMA 🛡️

Um sistema web moderno e offline-first desenvolvido para o registro de ocorrências, desvios e acidentes de segurança do trabalho. Substitui papéis e formulários estáticos por uma experiência inteligente e responsiva.

## 🌟 Funcionalidades

- **Diagrama Corporal Dinâmico:** Interface interativa para marcação do local exato da lesão corporal clicando diretamente sobre o manequim.
- **Dados de funcionários locais:** A lista de funcionários é gerada a partir de `public/LISTA_PESSOAS.xlsx`. O processo inclui no site somente Matrícula, Nome, Cargo, Setor, Líder e Turno; o arquivo original não é incluído no build de produção.
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
3. Coloque a planilha atualizada em `public/LISTA_PESSOAS.xlsx` e inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   A planilha deve ter as colunas `Matrícula`, `Nome`, `Cargo`, `Setor (Descrição)`, `Líder` e `Turno` na mesma linha de cabeçalho. O cabeçalho pode estar nas primeiras 50 linhas da primeira aba.

Para publicar o site, execute `npm run build` e publique o conteúdo de `dist`. O build gera os dados filtrados em `funcionarios.json`; quando a planilha mudar, substitua o XLSX e gere/publique um novo build. O arquivo original é ignorado pelo Git e removido do build final. O JSON filtrado ainda contém dados de funcionários, portanto o site deve permanecer em um local com acesso autorizado.

*Nota de Segurança: O arquivo `LISTA_PESSOAS.xlsx` é intencionalmente ignorado pelo Git para proteger os dados de funcionários.*
