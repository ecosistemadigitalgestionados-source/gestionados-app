import { Router } from 'express';
import pool from '../db/db.js';
import { isAdmin, verifyToken } from '../middlewares/auth.js';
import bcrypt from 'bcrypt'

const router = Router();

// =======================
// GET - OBTENER USUARIOS
// =======================
router.get('/usuarios', verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT id_usuario, usuario FROM tbl_usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// =======================
// POST - CREAR USUARIO
// =======================
router.post('/usuarios', verifyToken, isAdmin, async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO tbl_usuarios (usuario, password)
       VALUES ($1, $2)`,
      [usuario, hashedPassword]
    );

    res.json({ mensaje: "Usuario creado correctamente 🚀" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
});

// =======================
// PUT - ACTUALIZAR USUARIO
// =======================
router.put('/usuarios/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE tbl_usuarios
       SET usuario = $1,
           password = $2
       WHERE id_usuario = $3`,
      [usuario, hashedPassword, id]
    );

    res.json({ mensaje: "Usuario actualizado correctamente 🚀" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
});

// =======================
// DELETE - ELIMINAR USUARIO
// =======================
router.delete('/usuarios/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM tbl_usuarios WHERE id_usuario = $1",
      [id]
    );

    res.json({ mensaje: "Usuario eliminado correctamente 🚀" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
});

export default router;