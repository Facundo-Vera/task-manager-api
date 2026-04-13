import User from "../models/User.js";
import { check, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

const validateRegisterUser = () => [
  check("username")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isString()
    .withMessage("El campo tiene que ser un string")
    .isLength({ min: 1, max: 30 })
    .withMessage("El nommbre de usuario debe tener entre 1 y 30 caracteres")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user && user.username === value) {
        throw new Error("El usuario ya existe");
      }
    }),

  check("email")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isEmail()
    .withMessage("Ingresá un correo electrónico válido.")
    .custom(async (email) => {
      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        throw new Error("El email ya esta registrado");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número",
    ),

  handleValidationErrors,
];

const validateLoginUser = () => [
  check("email")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isEmail()
    .withMessage("Ingresa un correo electrónico válido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .withMessage("El campo tiene que ser un string"),

  handleValidationErrors,
];

export { validateRegisterUser ,validateLoginUser};
