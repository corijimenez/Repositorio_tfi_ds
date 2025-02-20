import { useState } from "react";
import { confirmAccount } from "../services/api";

const ConfirmAccount = ({ email }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await confirmAccount(email, code);
    setMessage(response.error || "Cuenta activada correctamente");
  };

  return (
    <div>
      <h2>Confirmar Cuenta</h2>
      {message && (
        <p
          style={{ color: message.includes("correctamente") ? "green" : "red" }}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Código de Confirmación"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default ConfirmAccount;
