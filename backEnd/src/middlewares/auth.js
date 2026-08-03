import jwt from "jsonwebtoken";

// =======================
// VERIFICAR TOKEN
// =======================
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // validar existencia y formato Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // guardar usuario decodificado en req
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};

// =======================
// VERIFICAR ADMIN (solo usuario "admin")
// =======================
export const isAdmin = (req, res, next) => {
  if (req.user?.usuario !== "admin") {
    return res.status(403).json({ mensaje: "Solo admin puede hacer esto" });
  }
  next();
};