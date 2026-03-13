export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    const formatted = error.errors.reduce((acc, e) => {
      const key = e.path && e.path.length ? e.path.join('.') : 'body'
      if (!acc[key]) acc[key] = []
      acc[key].push(e.message)
      return acc
    }, {})

    return res.status(400).json({errors: formatted})
  }
} 