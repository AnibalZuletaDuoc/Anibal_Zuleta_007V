export interface usuarioLogeado {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    accessToken: string;
  }