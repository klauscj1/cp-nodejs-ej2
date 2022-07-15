# API REST CON NODEJS & EXPRESS

**Descripción**

Este es un proyecto creado para enseñar la construcción de una API REST que se conecta a una base de datos utilizando JS, Nodejs & Express

## Instalación

#### 1- Dependencias

Cuando se haya descargado el repositorio

```
cd cp-nodejs-ej2/
npm install
```

#### 2- Variables de entorno

Crear un archivo **.env** el cual contenga las variables de entorno que estan descritas en el archivo **.env.template**

```
PORT=puerto para levantar el servidor Ej. 3000
DB_USER=nombre del usuario de la base de datos Ej. postgres
DB_PASSWORD=password del usuario de la base de datos Ej. 21630
DB_HOST=host de su base de datos Ej. localhost
DB_NAME=nombre de la base de datos en su host Ej. api_rest
DB_PORT=puerto del host de la base de datos Ej. 5432
JWT_SEED=clave para manejar la codificacion del  token

```

#### 3- Base de datos PostgreSQL

Para que el proyecto funcione se necesita crear una base de datos con nombre de la variable de entorno seteada anteriormente `DB_NAME`, en el directorio principal se adjunta el backup de la base de datos llamado `cp-nodejs-ej2.backup`

#### 4- Levantar el proyecto (en maquina local)

Para levantar en modo **dev**:

```
npm run dev
```

Para levantar en modo **production**:

```
npm start
```

ó

```
node index.js
```

#### 5- Levantar el proyecto (Docker)

Este paso es opcional, si queremos manejar la API en docker

- Cambiar la variable de entorno `DB_HOST` a `DB_HOST=host.docker.internal` para comunicar el contenedor con la base de datos local (SO)

Crear imagen de docker

```
docker build -t cp-nodejs-ej2 .
```

Crear un container utilizando la imagen

```
docker run -d -p 3000:3000 --name api-docker cp-nodejs-ej2
```

#### 6- Probar el API REST

Abrir un navegador y ir a la siguiente ruta

```
http:localhost:3000/api-doc
```
