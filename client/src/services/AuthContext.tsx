// Import des fonctions pour créer un contexte React et l'utiliser
import { createContext, useContext } from "react";

// Interface définissant la forme des données dans le contexte d'authentification
interface AuthProps {
  // Le rôle actuel de l'utilisateur ("utilisateur", "admin", etc.)
  role: string;

  // Fonction pour modifier le rôle
  setRole: (role: string) => void;

  // Informations de l'utilisateur actuellement connecté
  currentUser: {
    id: number;
    nom: string;
    photo: string;
    email: string;
    is_admin: boolean;
    anniversaire: string;
  };

  // Fonction pour modifier les infos de l'utilisateur courant
  setCurrentUser: (utilisateur: {
    id: number;
    nom: string;
    photo: string;
    email: string;
    is_admin: boolean;
    anniversaire: string;
  }) => void;
}

// Création du contexte React avec la forme AuthProps, initialisé à null par défaut
const authContext = createContext<AuthProps | null>(null);

// Hook personnalisé pour utiliser facilement le contexte d'authentification dans les composants
export default function Auth() {
  // Récupère le contexte avec useContext
  const context = useContext(authContext);

  // Si on essaie d'utiliser le contexte hors d'un Provider, on génère une erreur claire
  if (!context) {
    throw new Error("Le auth context doit exister");
  }

  // Sinon on renvoie le contexte pour être utilisé dans le composant appelant
  return context;
}
