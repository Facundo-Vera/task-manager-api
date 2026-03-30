import Task from "../models/Task";

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
        ok:false,
        message:"Erro al obtener tareas"
    })
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await Task.create({ title, description });

    return res.status(200).json({
      ok: true,
      message: "Tarea creada correctamente",
      data: newTask,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

export { createTask, getTask };
