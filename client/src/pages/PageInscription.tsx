import { useState } from "react";
import FormulaireDeConnexion from "../components/FormulaireDeConnexion";
import FormulaireDinscription from "../components/FormulaireDinscription";

export default function PageInscription() {
  const [isSignup, setIsSignup] = useState(true);
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };
  const [utilisateur, setUtilisateur] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as UtilisateurTypes);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtilisateur({ ...utilisateur, [event.target.name]: event.target.value });
  };
  return (
    <div className="inscription-page-container">
      <section className="form-section">
        <div className="visual-title">
          <h1>Explorez nos</h1>
          <h2>galeries.</h2>
        </div>
        {!isSignup ? (
          <FormulaireDinscription
            utilisateur={utilisateur}
            handleChangeForm={handleChangeForm}
          />
        ) : (
          <FormulaireDeConnexion />
        )}
        <button type="button" className="login-link" onClick={toggleForm}>
          {!isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}
        </button>
      </section>
      <section className="img-section">
        <div className="visual-image">
          <img src="/images/form_image.jpg" alt="Peinture abstraite" />
        </div>
      </section>
    </div>
  );
}
