import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const {username, email, password } = req.body;

    const user = new User({
      email,
      password,
      username
    });

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Usuario creado corectamente",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
        ok:false,
        message:error.message
    })
  }
};

export {

    register,

}