import 'dotenv/config';

export default {
  secret: process.env.JWT_SECRETKEY,
  expiresIn: process.env.EXPIRES_IN || '24h',
};
