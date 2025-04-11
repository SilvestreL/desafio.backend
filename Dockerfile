# Imagem base oficial do Node.js com suporte a npm e TypeScript
FROM node:18-alpine

# Cria o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência primeiro (para cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para dentro do container
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta (altere se sua API usar outra)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]