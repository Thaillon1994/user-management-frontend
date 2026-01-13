#!/bin/bash

# Smart Rent Demo - Deploy Script
# Use este script para fazer upload do site de demonstração

echo "🚀 Smart Rent - Deploy de Demonstração"
echo "========================================"

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale antes de continuar."
    exit 1
fi

# Build do projeto
echo "📦 Buildando projeto..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
else
    echo "❌ Erro no build. Verifique os erros acima."
    exit 1
fi

echo ""
echo "📋 Opções de Deploy:"
echo "1. Vercel (recomendado) - vercel --prod"
echo "2. Netlify - upload da pasta 'dist'"
echo "3. Surge.sh - cd dist && surge"
echo "4. Preview local - npx serve dist -p 3000"
echo ""
echo "⚠️  LEMBRE-SE: Este é um site de DEMONSTRAÇÃO!"
echo "   Não use dados reais nem informações sensíveis."
echo ""

# Opção de preview local
read -p "Deseja iniciar preview local? (y/n): " preview
if [[ $preview == "y" || $preview == "Y" ]]; then
    echo "🌐 Iniciando servidor de preview em http://localhost:3000"
    npx serve dist -p 3000
fi