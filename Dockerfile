#Basarse en la img de node:16-alpine
FROM node:16-alpine
#Crear un directorio en el container
WORKDIR /usr/app
#Copiar los archivos de package.json al directorio de trabajo WORKDIR
COPY package*.json ./
#Instalacion de modules de node
RUN npm install
#Copio el codigo desde el local (.) a la carpeta de contenedor (.)
COPY . .
#Abro el puerto 3000
EXPOSE 3000
#comando para correr nuestra api -> node index.js
CMD ["node","index.js"]

