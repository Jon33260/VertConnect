interface UtilisateurTypes {
  nom: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface propsFormTypes {
  utilisateur: UserTypes;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
}
