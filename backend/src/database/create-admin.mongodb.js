// Create admin user directly in database
// Password must be bcrypt-hashed

db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2b$10$REPLACE_WITH_BCRYPT_HASH",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
});





// for hash the passwoard   
import bcrypt from "bcrypt";

const hash = await bcrypt.hash("admin123", 10);
console.log(hash);


