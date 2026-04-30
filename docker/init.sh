#!/bin/bash
# docker/init.sh
# Script para inicializar y ejecutar la aplicación React

set -e

echo "🚀 Inicializando aplicación React..."

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Ejecutar en modo desarrollo
echo "🎉 Iniciando servidor de desarrollo..."
npm run dev
