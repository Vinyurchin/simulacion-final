# 🚀 Guía de Deployment - Explorador de Datos ML

## 📋 Requisitos Previos
- Cuenta en [GitHub](https://github.com)
- Cuenta en [Render](https://render.com) (gratuita)
- Cuenta en [Vercel](https://vercel.com) o [Netlify](https://netlify.com) (gratuita)

---

## 🔧 Paso 1: Preparar el Proyecto

### 1.1 Subir a GitHub

```bash
# Inicializa el repositorio (si no lo has hecho)
git init

# Agrega todos los archivos
git add .

# Commit inicial
git commit -m "Preparado para deployment"

# Crea un repositorio en GitHub y conecta
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Sube los cambios
git branch -M main
git push -u origin main
```

---

## 🖥️ Paso 2: Desplegar Backend en Render

### 2.1 Crear Web Service

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: `explorador-ml-backend` (o el que prefieras)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `chmod +x build.sh && ./build.sh`
   - **Start Command**: `gunicorn backend.wsgi:application`
   - **Instance Type**: `Free`

### 2.2 Variables de Entorno

En la sección **Environment Variables**, agrega:

```
SECRET_KEY=tu-clave-secreta-super-segura-aqui
DEBUG=False
PYTHON_VERSION=3.13.0
FRONTEND_URL=https://tu-frontend.vercel.app
```

Para generar una SECRET_KEY segura en Python:
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### 2.3 Crear Base de Datos PostgreSQL (Opcional pero recomendado)

1. En Render Dashboard, click en **"New +"** → **"PostgreSQL"**
2. Configura:
   - **Name**: `explorador-ml-db`
   - **Database**: `explorador_ml`
   - **Instance Type**: `Free`
3. Copia la **Internal Database URL**
4. En tu Web Service, agrega esta variable:
   ```
   DATABASE_URL=postgresql://...
   ```

### 2.4 Deploy

Click en **"Create Web Service"** y espera a que termine el deployment (5-10 minutos).

Copia tu URL de backend, será algo como: `https://explorador-ml-backend.onrender.com`

---

## 🌐 Paso 3: Desplegar Frontend en Vercel

### 3.1 Actualizar config.js

Edita `frontend/js/config.js` y reemplaza `"https://tu-backend.onrender.com"` con tu URL real de Render.

### 3.2 Deploy en Vercel

**Opción A: Desde la interfaz web**
1. Ve a [Vercel](https://vercel.com)
2. Click en **"Add New"** → **"Project"**
3. Importa tu repositorio de GitHub
4. Configura:
   - **Framework Preset**: `Other`
   - **Root Directory**: `frontend`
   - **Build Command**: (déjalo vacío)
   - **Output Directory**: `.`
5. Click en **"Deploy"**

**Opción B: Desde la terminal**
```bash
# Instala Vercel CLI
npm install -g vercel

# Ve a la carpeta frontend
cd frontend

# Deploy
vercel

# Sigue las instrucciones en pantalla
```

Tu frontend estará en: `https://tu-proyecto.vercel.app`

---

## 🔄 Paso 4: Actualizar CORS

Ahora que tienes ambas URLs, actualiza el CORS:

1. En Render, ve a tu Web Service
2. Agrega/actualiza la variable de entorno:
   ```
   FRONTEND_URL=https://tu-proyecto.vercel.app
   ```
3. Guarda y espera a que se redespliegue

---

## ✅ Paso 5: Verificar

1. Abre tu frontend: `https://tu-proyecto.vercel.app`
2. Intenta cargar un dataset
3. Verifica que todo funcione correctamente

---

## 🐛 Solución de Problemas

### Error de CORS
- Asegúrate de que `FRONTEND_URL` esté correctamente configurada en Render
- Verifica que el backend esté respondiendo: `https://tu-backend.onrender.com/apis/upload_dataset/`

### Error 500 en Backend
- Revisa los logs en Render Dashboard
- Verifica que todas las variables de entorno estén configuradas

### Base de datos vacía
- Ejecuta las migraciones manualmente en Render Shell:
  ```bash
  python manage.py migrate
  ```

---

## 📝 Alternativas de Deployment

### Railway (Alternativa a Render)
- Similar a Render pero con mejor UI
- Plan gratuito generoso
- https://railway.app

### Netlify (Alternativa a Vercel para frontend)
- Igual de fácil que Vercel
- Drag & drop deployment
- https://netlify.com

### PythonAnywhere (Todo en uno para Django)
- Especializado en Python
- Incluye MySQL gratuito
- https://www.pythonanywhere.com

---

## 🔐 Recomendaciones de Seguridad

1. **Nunca subas** el archivo `.env` a GitHub
2. **Cambia** el `SECRET_KEY` en producción
3. **Desactiva** `DEBUG=False` en producción
4. **Usa** HTTPS siempre
5. **Configura** CORS correctamente (no uses `CORS_ALLOW_ALL_ORIGINS=True` en producción)

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render Dashboard
2. Verifica la consola del navegador (F12)
3. Comprueba que las URLs sean correctas

---

¡Listo! Tu aplicación ya está en línea 🎉
