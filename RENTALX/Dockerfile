# Imagem que vai baixar do docker hub ( node )
FROM node

# um diretorio onde queremos que as nossas informações estejam contidas
WORKDIR /usr/app

# estou copiando o package.json para o diretorio /usr/app
COPY package.json ./

# rodando para baixar as depêdencias
RUN npm install

# copiando todos os outros arquivos paro o /usr/app
COPY . .

# rodando na porta 3333
EXPOSE 3333

CMD ["npm","run","dev"]