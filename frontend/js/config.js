/**
 * CONFIGURACIÓN GLOBAL DE API
 * Cambia SOLO esta variable
 */

// Detecta automáticamente el entorno
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? "http://localhost:8000"
    : "https://explorador-ml-backend.onrender.com";

// const API_BASE_URL = "https://scratch-makes-shown-implies.trycloudflare.com"; // cloudflared 