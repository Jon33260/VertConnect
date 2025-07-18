// Importation du hook useState pour gérer les états locaux
import { useState } from "react";

// Importation des composants de formulaire
import FormulaireDeConnexion from "../components/FormulaireDeConnexion";
import FormulaireDinscription from "../components/FormulaireDinscription";

// Composant principal de la page d'inscription/connexion
export default function PageInscription() {
  // État pour basculer entre le formulaire d’inscription et de connexion
  const [isSignup, setIsSignup] = useState(true);

  // Fonction pour inverser l’état du formulaire affiché (signup <-> login)
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  // État pour stocker les données saisies dans le formulaire d'inscription
  const [utilisateur, setUtilisateur] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as UtilisateurTypes); // Typage explicite avec UtilisateurTypes

  // Fonction qui met à jour les champs de l’utilisateur à chaque changement dans les inputs
  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUtilisateur({ ...utilisateur, [event.target.name]: event.target.value });
  };

  return (
    <div className="inscription-page-container">
      {/* Section contenant le formulaire et les titres visuels */}
      <section className="form-section">
        <div className="visual-title">
          <h1>Explorez nos</h1>
          <h2>galeries.</h2>
        </div>

        {/* Affiche le formulaire d’inscription ou de connexion selon l’état */}
        {!isSignup ? (
          // Formulaire d’inscription avec les données et le gestionnaire d’input
          <FormulaireDinscription
            utilisateur={utilisateur}
            handleChangeForm={handleChangeForm}
          />
        ) : (
          // Formulaire de connexion
          <FormulaireDeConnexion />
        )}

        {/* Bouton pour passer d’un formulaire à l’autre */}
        <button type="button" className="login-link" onClick={toggleForm}>
          {!isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}
        </button>
      </section>

      {/* Section contenant une image illustrative à droite */}
      <section className="img-section">
        <div className="visual-image">
          <img src="/images/form_image.jpg" alt="Peinture abstraite" />
        </div>
      </section>
    </div>
  );
}
