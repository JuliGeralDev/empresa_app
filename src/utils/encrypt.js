import bcrypt from "bcryptjs";

export const comparePasswords = async (input, hashed) => {
  return await bcrypt.compare(input, hashed);
};
