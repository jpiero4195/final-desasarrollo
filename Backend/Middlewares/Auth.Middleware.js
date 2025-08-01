import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });

  try {
    const { email, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email, role };
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token inválido' });
  }
};
