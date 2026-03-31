import Task from "../models/Task.js";

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find(); //devuelve un array de documentos

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro al obtener tareas",
    });
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

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updateTask = await Task.findByIdAndUpdate(id,{
      title,
      description,
      completed
    },
    {new:true}
  )
  return res.status(200).json({
    ok:true,
    message:"Tarea actualizada correctamente"
  })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok:false,
      message:"Error al actualizar la tarea"
    })
  }
};

export { createTask, getTask ,updateTask};

//traer los datos que quiero actualizar  mediante el id
//actualizarlos
//guardaslos nuevamente
