// Navigation links
export const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Notre Mission', href: '#mission' },
  { label: 'Nos Actions', href: '#actions' },
  { label: 'Nous Soutenir', href: '#donate' },
];

// Mission cards data
export const MISSION_CARDS = [
  {
    icon: 'Heart',
    title: 'Solidarité',
    description: 'Nous soutenons les plus vulnerables en créant des liens de fraternité et d\'entraide.',
  },
  {
    icon: 'Users',
    title: 'Communauté',
    description: 'Ensemble, nous bâtissons une communauté forte et inclusive pour un impact durable.',
  },
  {
    icon: 'Zap',
    title: 'Action',
    description: 'Nous agissons concrètement sur le terrain pour créer un changement réel et visible.',
  },
];

// Actions data
export const ACTIONS_DATA = [
  {
    id: 1,
    title: 'Distribution alimentaire',
    description: 'Aide alimentaire pour les familles en difficulté',
    image: 'food-distribution',
  },
  {
    id: 2,
    title: 'Formation professionnelle',
    description: 'Accompagnement vers l\'emploi et formation',
    image: 'training',
  },
  {
    id: 3,
    title: 'Soutien scolaire',
    description: 'Aide aux enfants en difficulté scolaire',
    image: 'education',
  },
  {
    id: 4,
    title: 'Santé et bien-être',
    description: 'Accès aux soins pour tous',
    image: 'health',
  },
];

// Stats data
export const STATS_DATA = [
  { number: '5000+', label: 'Personnes aidées' },
  { number: '50+', label: 'Projets lancés' },
  { number: '1000+', label: 'Bénévoles actifs' },
  { number: '100%', label: 'Transparence' },
];

// Email regex pattern
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password requirements
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 128;
export const NAME_MAX_LENGTH = 50;

// Messages
export const MESSAGES = {
  REGISTER_SUCCESS: 'Inscription réussie ! Connectez-vous',
  REGISTER_ERROR: 'Erreur lors de l\'inscription',
  LOGIN_ERROR: 'Erreur lors de la connexion',
  INVALID_EMAIL: 'Veuillez entrer une adresse email valide',
  PASSWORDS_MISMATCH: 'Les mots de passe ne correspondent pas',
  PASSWORD_TOO_SHORT: `Le mot de passe doit faire au moins ${PASSWORD_MIN_LENGTH} caractères`,
  SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette page',
};
