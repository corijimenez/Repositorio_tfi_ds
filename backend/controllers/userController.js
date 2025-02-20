const userModel = require("../models/userModel");

exports.createCuenta = (req, res) => {
  const cuenta = req.body;
  userModel.createCuenta(cuenta, (err, cuentaId) => {
    if (err) {
      return res.status(500).send("Error al crear la cuenta");
    }
    res.status(201).send({ id: cuentaId, ...cuenta });
  });
};
