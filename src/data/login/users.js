import bcrypt from "bcryptjs";

export const users = [
  {
    email: "admin@empresa.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    email: "externo@empresa.com",
    password: bcrypt.hashSync("externo123", 10),
    role: "externo",
  },
];
