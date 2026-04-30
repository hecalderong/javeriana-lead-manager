# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar solo package.json para instalar dependencias
COPY app/package*.json ./

# Instalar dependencias
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]