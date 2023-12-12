import bcrypt from "bcrypt";


export const BcryptPassword = async (password) =>
  await bcrypt.hash(password, 10);

export const ComparePassword = async (password, hashed) =>
  await bcrypt.compare(password, hashed);
