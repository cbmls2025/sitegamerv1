# 🚀 Guia de Deployment - CrazyGames

## Opções de Publicação

### 1. GitHub Pages (Recomendado - Gratuito)

**Passo a passo:**

```bash
# 1. Criar repositório no GitHub
# Acesse: https://github.com/new

# 2. Nomear o repositório
# Pode ser qualquer nome, ex: "crazy-games" ou "jogossite"

# 3. Clonar localmente
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# 4. Copiar arquivos do projeto para a pasta
# (Copie todos os arquivos do jogossite aqui)

# 5. Fazer commit e push
git add .
git commit -m "Initial commit - CrazyGames platform"
git push -u origin main

# 6. Ativar GitHub Pages
# Vá para: Settings > Pages
# Source: main branch
# Folder: / (root)
# Save

# 7. Acessar
# https://seu-usuario.github.io/seu-repositorio
```

### 2. Netlify (Recomendado - Muito Fácil)

**Opção A: Arrastar e Soltar**

1. Acesse: https://netlify.com
2. Crie uma conta (grátis)
3. Arraste a pasta do projeto para a área de upload
4. Pronto! URL automática gerada

**Opção B: GitHub Integration**

1. Conecte seu GitHub
2. Selecione o repositório
3. Configure build (não necessário)
4. Deploy automático a cada push

### 3. Vercel (Recomendado - Muito Rápido)

**Via CLI:**

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd caminho/para/jogossite
vercel

# 4. Seguir instruções interativas
# Selecionar projeto como estático
```

### 4. Google Firebase Hosting

```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Inicializar projeto
firebase init hosting

# 4. Deploy
firebase deploy

# URL: https://seu-projeto.firebaseapp.com
```

### 5. AWS Amplify

```bash
# 1. Instalar Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configure
amplify configure

# 3. Inicialize
amplify init

# 4. Deploy
amplify publish
```

## Configuração do Site

### SEO Básico

```html
<!-- Adicione ao <head> do index.html -->
<meta name="description" content="CrazyGames - Plataforma de jogos de tiro online">
<meta name="keywords" content="jogos online, tiro, HTML5">
<meta name="author" content="CrazyGames Team">
<meta property="og:title" content="CrazyGames">
<meta property="og:description" content="Jogos de tiro no navegador">
<meta property="og:image" content="https://seu-site.com/logo.png">
```

### Analytics (Google Analytics)

```html
<!-- Adicione ao final do <body> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X');
</script>
```

## Performance

### Otimizações Já Implementadas:
✅ CSS minificado
✅ JavaScript modular
✅ Canvas 2D (não usa WebGL pesado)
✅ Sem dependências externas
✅ Compressão de imagens recomendada

### Melhorias Opcionais:
- Minificar CSS/JS com tools como:
  - UglifyJS
  - CSSNano
  - Parcel
  - Webpack

### Exemplo com Parcel:

```bash
npm install -D parcel-bundler

# Criar package.json
{
  "scripts": {
    "build": "parcel build index.html"
  }
}

npm run build
```

## Domínio Customizado

### GitHub Pages:
1. Comprar domínio (GoDaddy, Namecheap, etc)
2. Criar arquivo `CNAME` com seu domínio
3. Configurar DNS apontando para GitHub

### Netlify:
1. Domain settings > Add custom domain
2. Atualizar DNS do registrador

### Vercel:
1. Settings > Domains
2. Adicionar domínio
3. Copiar registros DNS

## HTTPS (Certificado SSL)

- **GitHub Pages**: Automático ✅
- **Netlify**: Automático ✅
- **Vercel**: Automático ✅
- **Firebase**: Automático ✅

## Problema? Verificações

- [ ] Todos os arquivos foram copiados?
- [ ] Caminhos de URLs estão corretos (relativos)?
- [ ] Console do navegador sem erros?
- [ ] Imagens aparecem?
- [ ] Scripts carregam corretamente?

## Monitoramento

### Uptime Monitoring:
- Pingdom
- StatusCake
- Uptime Robot

### Error Tracking:
- Sentry
- Rollbar
- LogRocket

## Backup

```bash
# GitHub backup automático
# Netlify backup automático
# Vercel backup automático

# Backup manual local
cp -r jogossite jogossite-backup
```

## Versioning

### Manter histórico com Git tags:

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

## Suporte e Manutenção

### Problemas Comuns:

**1. Canvas não renderiza**
- Verificar suporte do navegador
- Verificar contexto 2D
- Verificar tamanho do canvas

**2. Sons não funcionam**
- WebAudioAPI pode ser bloqueada
- Verificar políticas CORS
- Testar em diferentes navegadores

**3. Controles não respondem**
- Verificar event listeners
- Verificar console para erros
- Testar em diferentes dispositivos

**4. Imagens não carregam**
- Verificar caminho dos arquivos
- Verificar extensão (.jpg, .png)
- Verificar permissões CORS

## Próximas Fases

### Fase 2 (v1.1):
- [ ] Leaderboard online (Backend simples)
- [ ] Autenticação de usuários
- [ ] Persistência de progresso
- [ ] Mais armas e inimigos

### Fase 3 (v2.0):
- [ ] Multiplayer
- [ ] Efeitos 3D
- [ ] Mais missões
- [ ] Sistema de clãs

## Contato e Suporte

- Email: support@crazygames.com
- Discord: https://discord.gg/crazygames
- Twitter: @CrazyGamesOfficial

---

**Última atualização:** Dezembro 2025
**Status:** ✅ Pronto para Deploy
