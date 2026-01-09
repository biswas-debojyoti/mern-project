// Promote existing user to admin role

db.users.updateOne(
  { email: "admin@example.com" },
  {
    $set: {
      role: "admin",
      updatedAt: new Date()
    }
  }
);



// Promote user by ObjectId

db.users.updateOne(
  { _id: ObjectId("65fa1234abcd5678ef901234") },
  {
    $set: {
      role: "admin"
    }
  }
);

