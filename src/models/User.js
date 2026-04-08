import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: user,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparar las contraseñas
UserSchema.methods.comparePassword = function (userPassword) {
  return bcrypt.compareSync(userPassword, this.password); // Devuelve un booleano.
};

const User = mongoose.model("User", UserSchema);

export default User;