import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import ConfirmAccount from "./components/ConfirmAccount";

function App() {
  const [email, setEmail] = useState("");

  return (
    <div>
      {!email ? (
        <RegisterForm onRegisterSuccess={(userEmail) => setEmail(userEmail)} />
      ) : (
        <ConfirmAccount email={email} />
      )}
      <h1>Hola, React está funcionando! 🚀</h1>
    </div>
  );
}

export default App;
