import { createContext, useContext } from "react";

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
  currentUser: {
    id: number;
    nom: string;
    photo: string;
    email: string;
    is_admin: boolean;
    anniversaire: string;
  };
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;

  setCurrentUser: (utilisateur: {
    id: number;
    nom: string;
    photo: string;
    email: string;
    is_admin: boolean;
    anniversaire: string;
  }) => void;
}

const authContext = createContext<AuthProps | null>(null);

export default function Auth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Le auth context doit exister");
  }
  return context;
}
