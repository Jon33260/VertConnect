// Hook pour gérer les états locaux
import { useState } from "react";

// Fonction qui fait une requête POST pour créer un utilisateur
import { postCreateUser } from "../services/requests";

// Styles spécifiques au formulaire d’inscription
import "../styles/SignupForm.css";

// Permet de naviguer entre les pages (redirection)
import { useNavigate } from "react-router-dom";

// Contexte d’authentification global
import Auth from "../services/AuthContext";

// Composant d’icônes SVG utilisé pour afficher ou masquer le mot de passe
import SvgIcons from "./SvgIcons";

// Données SVG pour les icônes d’œil (visible / non visible)
const icon = [
  {
    visible: {
      width: "21px",
      height: "21px",
      path: "M480-312q70 ...", // icône œil ouvert
    },
    notVisible: {
      width: "21px",
      height: "21px",
      path: "m637-425 ...", // icône œil barré
    },
  },
];

// Composant principal du formulaire d'inscription
export default function FormulaireDinscription({
  utilisateur, // Objet contenant les données du formulaire
  handleChangeForm, // Fonction pour gérer les changements de champs
}: propsFormTypes) {
  const navigate = useNavigate(); // Hook pour rediriger l'utilisateur après inscription
  const { setRole, setCurrentUser } = Auth(); // Contexte pour stocker l'utilisateur connecté

  const [error, setError] = useState(""); // État pour afficher les messages d'erreur

  // Fonction appelée à la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(""); // Réinitialise l’erreur précédente

    try {
      // Envoie les infos de l’utilisateur au serveur
      const loginData = await postCreateUser(utilisateur);

      // Met à jour le contexte global avec les infos de l'utilisateur connecté
      setRole("utilisateur");
      setCurrentUser({
        id: loginData.utilisateur_id,
        nom: loginData.nom,
        photo: loginData.photo_profil,
        email: utilisateur.email,
        is_admin: loginData.is_admin,
        anniversaire: loginData.anniversaire,
      });

      navigate("/"); // Redirige vers la page d’accueil
    } catch (error) {
      // Affiche une erreur lisible si quelque chose s’est mal passé
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue lors de l'inscription");
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou masquer les mots de passe
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Sélection de l’icône appropriée selon l’état `showPassword`
  const currentIcon = showPassword ? icon[0].visible : icon[0].notVisible;

  const [checked, setChecked] = useState(false); // État pour la case à cocher CGU
  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Affichage du message d’erreur si nécessaire */}
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}

          {/* Champ du nom d'utilisateur */}
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              name="nom"
              value={utilisateur.nom}
              onChange={handleChangeForm}
              placeholder="Entrez un nom d'utilisateur"
              required
            />
          </div>

          {/* Champ e-mail */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={utilisateur.email}
              onChange={handleChangeForm}
              placeholder="Votre adresse mail"
              required
            />
          </div>

          {/* Champ mot de passe avec icône d'affichage */}
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={utilisateur.password}
                onChange={handleChangeForm}
                placeholder="Veuillez entrer un mot de passe"
                required
              />
              <span
                className="password-toggle"
                onClick={togglePassword}
                onKeyDown={togglePassword}
              >
                <SvgIcons
                  path={currentIcon.path}
                  height={currentIcon.height}
                  width={currentIcon.width}
                />
              </span>
            </div>
          </div>

          {/* Champ confirmation du mot de passe avec même icône */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={utilisateur.confirmPassword}
                onChange={handleChangeForm}
                placeholder="Veuillez entrer un mot de passe"
                required
              />
              <span
                className="password-toggle"
                onClick={togglePassword}
                onKeyDown={togglePassword}
              >
                <SvgIcons
                  path={currentIcon.path}
                  height={currentIcon.height}
                  width={currentIcon.width}
                />
              </span>
            </div>
          </div>

          {/* Case à cocher pour accepter les CGU */}
          <div className="checkbox-container">
            <input type="checkbox" checked={checked} onChange={toggleCheck} />
            <p>En cochant cette case, j'accepte les CGU.</p>
          </div>

          {/* Bouton de soumission désactivé si CGU non cochées */}
          <button type="submit" className="signup-button" disabled={!checked}>
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
}
