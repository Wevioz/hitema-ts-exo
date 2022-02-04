interface Administrateur {
  nom: string;
  email: string;
  ip: string;
  dt_connexion: Date;
  login: string;
  password: string;
}

type UtilisateurAnonymeUtilitaire = Partial<Pick<Administrateur, 'nom'>> &
  Required<Pick<Administrateur, 'ip'>>;

interface UtilisateurAnonyme {
  nom?: string;
  ip: string;
}

const test: UtilisateurAnonymeUtilitaire = { ip: 'test', nom: 'test' };
