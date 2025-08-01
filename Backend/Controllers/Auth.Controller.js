import User from '../Models/User.Model.js';
import { hash } from 'bcryptjs';

export async function register(req, res) {
  const { email, password, role } = req.body;

  // Validaciones básicas
  if (!email || !password || (role && !['admin', 'user'].includes(role))) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: 'El correo ya está registrado' });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      email,
      role: role || 'user',
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al registrar el usuario', error: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ msg: 'Error al iniciar sesión', error: error.message });
  }
}

export function logout(req, res) {
  req.user = null;
  res.clearCookie('token');
  res.clearCookie('token');
  req.user = null;
  res.status(200).json({ msg: 'Sesión cerrada exitosamente' });
}