const db = require("../config/db");
const bcrypt = require("bcryptjs");
const GeneradorCodigo = require("../utils/GeneradorCodigo");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  const { email, password, confirmPassword, acceptTerms } = req.body;

  if (!acceptTerms)
    return res
      .status(400)
      .json({ message: "Debe aceptar los términos y condiciones." });
  if (!validateEmail(email))
    return res.status(400).json({ message: "Formato de email inválido." });
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Las contraseñas no coinciden." });
  if (!validatePassword(password))
    return res
      .status(400)
      .json({ message: "La contraseña no cumple los requisitos." });

  const hashedPassword = await bcrypt.hash(password, 10);
  const confirmationCode = GeneradorCodigo.generarCodigo();

  db.query(
    "SELECT id FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (results.length > 0)
        return res
          .status(400)
          .json({ message: "El email ya está registrado." });

      db.query(
        "INSERT INTO usuarios (email, password, estado, codigo_confirmacion) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, "INACTIVO", confirmationCode],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Error al registrar usuario." });
          enviarEmailConfirmacion(email, confirmationCode);
          res.json({
            message:
              "Usuario registrado. Revise su correo para confirmar la cuenta.",
          });
        }
      );
    }
  );
};

exports.confirm = (req, res) => {
  const { email, code } = req.body;

  db.query(
    "SELECT codigo_confirmacion FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (results.length === 0 || results[0].codigo_confirmacion !== code) {
        return res
          .status(400)
          .json({ message: "Código incorrecto o expirado." });
      }
      db.query(
        "UPDATE usuarios SET estado = ? WHERE email = ?",
        ["ACTIVO", email],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Error al activar la cuenta." });
          res.json({ message: "Cuenta activada correctamente." });
        }
      );
    }
  );
};

function validateEmail(email) {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function enviarEmailConfirmacion(email, code) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Código de Confirmación",
    text: `Su código de confirmación es: ${code}`,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) console.error("Error enviando email:", err);
  });
}
