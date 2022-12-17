import bcrypt from 'bcryptjs';

export const createPasswordHash = async (password) =>
    await bcrypt.hash(password, 8);

export const checkPassword = async (user, password) =>
    await bcrypt.compare(password, user.password);
    console.log('Checking password')