import {Router} from 'express';
import pool from '../db/db.js';
import { isAdmin, verifyToken } from '../middlewares/auth.js';

const router = Router();

// =======================
// GET - OBTENER 
// =======================

router.get('/clientes', verifyToken, async (req,res)=>{
try {
    const result = await pool.query("SELECT * FROM tbl_formulario");
     res.json(result.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
}

});

// =======================
// POST- CREAR
// =======================
router.post('/clientes', async (req, res) => {
  try {
    const { nombre_cliente, contacto_cliente, correo_cliente, comentario_cliente } = req.body;

    await pool.query(
      `INSERT INTO tbl_formulario 
      (nombre_cliente, contacto_cliente, correo_cliente, comentario_cliente)
      VALUES ($1, $2, $3, $4)`,
      [nombre_cliente, contacto_cliente, correo_cliente, comentario_cliente]
    );

    res.json({ mensaje: "Cliente creado correctamente 🚀" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear cliente" });
  }
});

// =======================
// PUT - ACTUALIZAR
// =======================
router.put('/clientes/:id', verifyToken,isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_cliente, contacto_cliente, correo_cliente, comentario_cliente } = req.body;

    const result = await pool.query(
      `UPDATE tbl_formulario 
       SET nombre_cliente = $1,
           contacto_cliente = $2,
           correo_cliente = $3,
           comentario_cliente = $4
       WHERE id_cliente = $5`,
      [nombre_cliente, contacto_cliente, correo_cliente, comentario_cliente, id]
    );

    res.json({ mensaje: "Cliente actualizado correctamente 🚀" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
});

// =======================
// DELETE- ELIMINAR
// =======================
router.delete('/clientes/:id', verifyToken,isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM tbl_formulario WHERE id_cliente = $1",
      [id]
    );

    res.json({ mensaje: "Cliente eliminado correctamente 🚀" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
});

export default router;