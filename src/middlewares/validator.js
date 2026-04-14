import Task from "../models/Task.js";
import { check, validationResult } from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

const validateCreateTask = [
  check("title")
    .notEmpty().withMessage("El titulo es obligatorio")
    .isString()
    .withMessage("El campo debe ser un string")
    .isLength({ min: 5, max: 50 })
    .withMessage("El titulo debe tener entre 5 y 50 caracteres")
    .custom(async (value) => {
      const validateExistsTask = await Task.findOne({ title: value });
      if (validateExistsTask) {
        throw new Error("Ya existe una tarea con ese título");
      }
    }),

  check("description")
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isString()
    .withMessage("El campo tiene que se un string")
    .isLength({ min: 5, max: 500 })
    .withMessage("La descripcion debe tener entre 5 y 500 caracteres"),
  handleValidationErrors,
];

const validateTaskById = async (id) => {
  const taskById = await Task.findById(id);

  if (!taskById) {
    throw new Error("La tarea no existe");
  }
};

const validateUpdateTask = [
  check("id")
    .isMongoId()
    .withMessage("Envia un ID valido")
    .custom(validateTaskById),

  handleValidationErrors,
];


const validateDeleteTask = [
  check("id")
    .isMongoId()
    .withMessage("Envia un ID valido")
    .custom(validateTaskById),

  handleValidationErrors,
];

export { handleValidationErrors, validateCreateTask ,validateUpdateTask ,validateDeleteTask};
