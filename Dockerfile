# FROM node:18

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD npm run dev

# Etapa base
FROM node:18 AS base

WORKDIR /app
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto para desarrollo
CMD ["npm", "run", "dev"]

# Etapa de producción
FROM base AS production

# Establecer la variable de entorno NODE_ENV a production
ENV NODE_ENV=production

# Copiar el archivo .env.prod y renombrarlo a .env
COPY .env.prod .env

# Ejecutar la aplicación en modo producción
CMD ["npm", "start"]

