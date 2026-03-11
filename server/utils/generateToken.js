import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'super_secret_luxe_drive_jwt_code', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  
  return token;
};

export default generateToken;
