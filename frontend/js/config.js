/**
 * CONFIGURACIÓN GLOBAL DE API
 * Cambia SOLO esta variable
 */

// Detecta automáticamente el entorno
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? "http://localhost:8000"
    : "https://tu-backend.onrender.com";  // Cambia esto por tu URL de Render

// También puedes usar este formato si prefieres configurar manualmente:
// const API_BASE_URL = "http://localhost:8000";  // Desarrollo
// const API_BASE_URL = "https://tu-backend.onrender.com";  // Producción

// const API_BASE_URL = "https://scratch-makes-shown-implies.trycloudflare.com"; // cloudflared 