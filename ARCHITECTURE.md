# Mon Association - Architecture & Structure

## 📁 Structure du Projet

```
app/
├── api/                           # Routes d'API
│   └── auth/[...nextauth]/        # Authentification NextAuth
├── auth/                          # Pages d'authentification
│   ├── login/
│   └── register/
├── components/                    # Composants réutilisables
│   ├── common/                    # Header, Footer, etc.
│   ├── home/                      # Composants de la page d'accueil
│   │   ├── HeroSection.js
│   │   ├── MissionSection.js
│   │   ├── ActionsSection.js
│   │   ├── StatsSection.js
│   │   ├── DonationCTA.js
│   │   └── Footer.js
│   └── ui/                        # Composants génériques (Buttons, Cards, etc.)
├── hooks/                         # Hooks personnalisés
│   ├── useAuth.js                 # Authentification et routes protégées
│   └── useForm.js                 # Gestion des formulaires
├── lib/                           # Utilitaires
│   ├── constants.js               # Constantes de l'application
│   └── validators.js              # Schémas de validation Zod
├── profile/                       # Pages protégées
├── types/                         # Types JSDoc
├── layout.js                      # Layout racine avec métadonnées
├── page.js                        # Page d'accueil
├── loading.js                     # Page de chargement
├── error.js                       # Page d'erreur
└── globals.css                    # Styles globaux
```

## 🎯 Points clés de l'architecture

### 1. **Séparation des responsabilités**
- Les composants sont divisés par domaine (home, common, ui)
- Les hooks encapsulent la logique métier
- Les constantes et validateurs sont externalisés

### 2. **Gestion des formulaires**
- Hook `useForm` réutilisable
- Validation Zod intégrée
- Gestion des erreurs cohérente

### 3. **Authentification**
- NextAuth.js pour les sessions
- Hook `useProtectedRoute` pour les routes privées
- Hook `useFormError` pour la gestion des erreurs

### 4. **Constantes et Données**
Toutes les données statiques sont dans `lib/constants.js` :
- Navigation links
- Mission cards
- Actions data
- Stats
- Messages

### 5. **Validation**
Utilisation de Zod pour :
- Register form
- Login form
- Profile form
- Validation réutilisable via `validateData()`

## 🚀 Comment utiliser

### Créer un nouveau composant
```javascript
// app/components/common/MyComponent.js
export function MyComponent({ prop }) {
  return <div>{prop}</div>
}
```

### Créer un hook personnalisé
```javascript
// app/hooks/useMyHook.js
import { useState } from 'react'

export function useMyHook() {
  const [state, setState] = useState(null)
  // logic
  return { state, setState }
}
```

### Ajouter une validation
```javascript
// Dans app/lib/validators.js
export const mySchema = z.object({
  field: z.string().min(1)
})

// Utilisation
const result = validateData(data, mySchema)
```

### Protéger une route
```javascript
// app/profile/page.js
'use client'
import { useProtectedRoute } from '@/app/hooks/useAuth'

export default function ProfilePage() {
  const { session, isLoading } = useProtectedRoute()
  
  if (isLoading) return <div>Chargement...</div>
  if (!session) return null
  
  return <div>Profil de {session.user.name}</div>
}
```

## 📦 Dépendances principales

- **Next.js 16** - Framework React
- **NextAuth.js 4** - Authentification
- **Zod** - Validation de schémas
- **Tailwind CSS 4** - Styling
- **lucide-react** - Icônes

## 🔒 Sécurité

- ✅ Variables d'environnement pour les secrets
- ✅ Validation des données côté client ET serveur
- ✅ Protection des routes avec NextAuth
- ✅ CSRF protection via NextAuth

## 📝 À faire

- [ ] Implémenter l'API d'inscription réelle
- [ ] Ajouter tests unitaires
- [ ] Configurer CI/CD
- [ ] Ajouter monitoring/logging
- [ ] Optimiser les images
- [ ] Ajouter PWA support

## 🎨 Conventions de code

- **Composants** : PascalCase, `function Component() {}` 
- **Hooks** : camelCase, préfixe `use`, `function useHook() {}`
- **Fichiers** : kebab-case pour les dossiers, camelCase pour les fichiers (sauf composants)
- **Constantes** : UPPER_SNAKE_CASE
- **Classes CSS** : Tailwind CSS + conventions BEM si nécessaire
