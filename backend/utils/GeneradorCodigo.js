class GeneradorCodigo {
  constructor() {
    if (!GeneradorCodigo.instancia) {
      GeneradorCodigo.instancia = this;
    }
    return GeneradorCodigo.instancia;
  }

  generarCodigo() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

module.exports = new GeneradorCodigo();
