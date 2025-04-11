# 💼 Desafio Técnico Backend - Node.js

Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de Desenvolvedor Backend (Node.js). Ele permite o gerenciamento de boletos, com funcionalidades como importação via CSV ou PDF, listagem com filtros, geração de relatórios em PDF (base64), e mapeamento automático de lotes.

---

## 🚀 Tecnologias Utilizadas

- **Node.js + TypeScript**
- **Express** (servidor HTTP)
- **Sequelize + SQLite** (ORM e banco de dados)
- **PDFKit** (geração de relatórios PDF)
- **Multer** (upload de arquivos)
- **CSV-Parse** (leitura de arquivos `.csv`)
- **Zod** (validação de filtros e entradas)
- **Swagger** (documentação da API)
- **Docker** (containerização para execução em produção)

---

## 📄 Documentação da API (Swagger)

A documentação interativa está disponível em:

```
http://localhost:3000/api-docs
```

Você pode testar todos os endpoints por ali — inclusive upload de CSVs e geração de relatórios PDF.

---

## 📁 Endpoints da API

### 📥 Importar boletos via CSV

- `POST /api/importar-csv`
- Espera um arquivo `.csv` com os campos: `nome`, `unidade`, `valor`, `linha_digitavel`
- A unidade será mapeada automaticamente para `id_lote` com base no padrão `"0017" → 17"`

### 🗂 Importar boletos via PDF (lote)

- `POST /api/importar-pdf`
- Espera um PDF com uma página por boleto (já inserido via CSV)
- O sistema salvará os arquivos como `1.pdf`, `2.pdf`, etc., na pasta `/tmp/boletos`

### 📃 Listar boletos com filtros

- `GET /api/boletos`
- Parâmetros de filtro:
  - `nome`
  - `valor_inicial`
  - `valor_final`
  - `id_lote`

### 🧾 Gerar relatório em PDF (base64)

- `GET /api/boletos?relatorio=1`
- Retorna o PDF (base64) com os boletos filtrados

---

## 🧪 Testes Automatizados

O projeto possui testes com Jest cobrindo:

- Importação de boletos via CSV
- Geração de relatório PDF
- Listagem com filtros
- Validação de erros e mapeamento de lotes

### Executar os testes:

```bash
npm run test
```

---

## ⚙️ Como rodar o projeto

### 🔸 Opção 1: Localmente com Node.js

```bash
# Instale as dependências
npm install

# Rode a aplicação em modo desenvolvimento
npm run dev

# (opcional) Popule o banco com lotes
npx sequelize-cli db:seed:all
```

### 🔸 Opção 2: Com Docker (produção)

```bash
# Construa a imagem
docker build -t desafio-boletos .

# Rode o container
docker run -p 3000:3000 desafio-boletos
```

> Após isso, acesse: `http://localhost:3000/api-docs`

---

## 💾 Estrutura de Diretórios

```
src/
├── api/routes/         # Rotas HTTP da aplicação
├── controllers/        # Recebem e respondem às requisições
├── services/           # Lógica de negócio
├── infrastructure/     # Banco de dados, ORM, config
├── docs/               # Swagger/OpenAPI
└── tmp/boletos/        # PDFs gerados após importação em lote
```

---

## ✉️ Exemplo de retorno (PDF base64)

```json
{
  "relatorio": "JVBERi0xLjQKJeLjz9MK... (base64)"
}
```

Cole o conteúdo em sites como [https://base64.guru/converter/decode/pdf](https://base64.guru/converter/decode/pdf) para visualizar o relatório.

---

## ✅ Diferenciais do Projeto

- 🧠 Arquitetura limpa e bem segmentada (controllers, services, infra)
- ⚙️ Cobertura total dos requisitos técnicos
- 📄 Swagger completo e funcional
- 🔍 Validação com Zod para segurança dos filtros
- 🐳 Pronto para rodar com Docker
- 💡 Código testável, limpo e modular

---

## 📌 Considerações finais

Todos os critérios do desafio foram implementados com foco em clareza, boas práticas, testes e documentação. O projeto está pronto para uso local, demonstração técnica ou continuação em produção.

---

## 🔗 Repositório

"repository": "https://github.com/seu-usuario/seu-repositorio.git"
