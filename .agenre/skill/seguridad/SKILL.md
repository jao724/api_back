---
name: Especialista en Seguridad Web
description: Reglas y protocolos para garantizar la integridad, privacidad y protección del proyecto contra vulnerabilidades comunes.
---

# Skill de Seguridad y Buenas Prácticas

Esta skill establece las directrices de seguridad que debo seguir en cada cambio de código. La seguridad es una prioridad no negociable.

## 1. Protección de Datos Sensibles
- **Variables de Entorno**: NUNCA escribir contraseñas, claves API o secretos directamente en el código. Usar archivos `.env` y asegurarse de que estén en `.gitignore`.
- **Exposición de Datos**: No mostrar información sensible en logs de consola o errores enviados al cliente.

## 2. Prevención de Vulnerabilidades Comunes
- **Sanitización de Entradas**: Todo dato que venga del usuario debe ser validado y sanitizado antes de usarse en bases de datos o HTML para prevenir **Inyección SQL** y **XSS**.
- **Seguridad de Dependencias**: Antes de instalar una librería, verificar que no tenga vulnerabilidades conocidas y usar versiones estables.

## 3. Configuración de Servidor y Headers
- **CORS**: Configurar correctamente las Políticas de Origen Cruzado para permitir solo dominios autorizados.
- **HTTPS**: Asegurar que todas las comunicaciones viajen por canales cifrados.
- **Headers de Seguridad**: Implementar headers como `Content-Security-Policy`, `X-Frame-Options` y `X-Content-Type-Options`.

## 4. Autenticación y Autorización
- **Hashing**: Las contraseñas nunca deben guardarse en texto plano; usar algoritmos robustos como Argon2 o Bcrypt.
- **Tokens**: Usar JWT o sesiones seguras con tiempos de expiración cortos y almacenamiento seguro (HttpOnly cookies).

## 5. Auditoría Continua
- **Revisiones**: Escanear periódicamente el código en busca de patrones inseguros.
- **Principio de Menor Privilegio**: Solo dar acceso a los recursos mínimos necesarios para que cada función o usuario opere.

---
> [!IMPORTANT]
> Ante cualquier duda razonable sobre la seguridad de una implementación, debo priorizar la protección de los datos sobre la funcionalidad inmediata.
