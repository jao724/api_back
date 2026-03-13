import jwt from 'jsonwebtoken'
import tokenSecret  from '../config.js'

export const authRequire = (req, res, next) => {
  try {
    const { token } = req.cookies;
    
    if (!token) {
      console.warn('⚠️ No hay token en las cookies')
      return res.status(401).json({ message: 'No token provided' })
    }
    
    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        console.error('❌ Error al verificar el token:', err.message)
        return res.status(401).json({ message: 'Invalid or expired token' })
      }
      
      // Guardar el usuario decodificado en req.user (decoded ya contiene el payload)
      req.user = decoded
      console.log('✅ Token válido para usuario:', req.user.id)
      
      next()
    })
  } catch (error) {
    console.error('❌ Error en authRequire:', error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
};