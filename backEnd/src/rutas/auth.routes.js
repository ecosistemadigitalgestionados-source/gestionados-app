//login - validaciones y JWT
import { Router } from "express";
import pool from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM tbl_usuarios WHERE usuario = $1",
      [usuario],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ mensaje: "Usuario no existe" });
    }

    const user = result.rows[0];
    const passwordCorrecto = await bcrypt.compare(password, user.password);
    if (!passwordCorrecto) {
      return res.status(400).json({ mensaje: "Password incorrecto" });
    }

    // 🔐 AQUÍ VA EL JWT
    const token = jwt.sign(
      {
        id: user.id_usuario,
        usuario: user.usuario,
        es_admin: user.es_admin || false,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );
    const { password: _, ...userSinPassword } = user;
    return res.json({
      mensaje: "Login correcto",
      token,
      user: userSinPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en login" });
  }
});

export default router;
