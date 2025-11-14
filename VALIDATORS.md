# Validators Documentation

## Overview

Les validateurs utilisent **Zod** pour fournir une validation de données de type sécurisée.

## Schémas disponibles

### registerSchema
Valide les données d'inscription.

```javascript
import { registerSchema, validateData } from '@/app/lib/validators'

const data = {
  name: 'Dupont',
  firstName: 'Jean',
  email: 'jean@example.com',
  dateOfBirth: '1990-01-01',
  password: 'SecurePass123',
  confirmPassword: 'SecurePass123'
}

const result = validateData(data, registerSchema)
if (result.success) {
  console.log('Données validées:', result.data)
} else {
  console.log('Erreurs:', result.errors)
}
```

**Validation rules:**
- `name`: 2-50 caractères
- `firstName`: 2-50 caractères
- `email`: Email valide
- `dateOfBirth`: Obligatoire
- `password`: Min 6 caractères, au moins 1 majuscule, au moins 1 chiffre
- `confirmPassword`: Doit correspondre au password

---

### loginSchema
Valide les données de connexion.

```javascript
const data = {
  email: 'jean@example.com',
  password: 'SecurePass123'
}

const result = validateData(data, loginSchema)
```

**Validation rules:**
- `email`: Email valide
- `password`: Obligatoire

---

### profileSchema
Valide les données de profil (tous les champs optionnels).

```javascript
const data = {
  name: 'Dupont',
  firstName: 'Jean',
  email: 'jean@example.com'
}

const result = validateData(data, profileSchema)
```

**Validation rules:**
- `name`: 2-50 caractères (optionnel)
- `firstName`: 2-50 caractères (optionnel)
- `email`: Email valide (optionnel)

---

## Fonction utilitaire: validateData

Fonction générique pour valider contre n'importe quel schéma Zod.

```javascript
function validateData(data, schema) {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        const path = err.path.join('.')
        acc[path] = err.message
        return acc
      }, {})
      return { success: false, errors }
    }
    return { success: false, errors: { general: 'Validation error' } }
  }
}
```

### Returns
```typescript
{
  success: boolean
  data?: ValidatedData      // Si success === true
  errors?: Record<string, string>  // Si success === false
}
```

---

## Ajouter un nouveau validateur

### 1. Définir le schéma

```javascript
// Dans app/lib/validators.js
export const mySchema = z.object({
  field1: z.string().min(1),
  field2: z.number().positive(),
  field3: z.enum(['option1', 'option2']),
})
```

### 2. Utiliser dans votre composant

```javascript
import { validateData, mySchema } from '@/app/lib/validators'

const result = validateData(formData, mySchema)
if (!result.success) {
  setErrors(result.errors)
  return
}

// Proceed with validated data
handleSubmit(result.data)
```

---

## Constantes liées à la validation

Ces constantes se trouvent dans `lib/constants.js`:

```javascript
export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_MAX_LENGTH = 128
export const NAME_MAX_LENGTH = 50
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

---

## Messages d'erreur

Messages d'erreur prédéfinis dans `lib/constants.js`:

```javascript
export const MESSAGES = {
  REGISTER_SUCCESS: 'Inscription réussie ! Connectez-vous',
  REGISTER_ERROR: 'Erreur lors de l\'inscription',
  LOGIN_ERROR: 'Erreur lors de la connexion',
  INVALID_EMAIL: 'Veuillez entrer une adresse email valide',
  PASSWORDS_MISMATCH: 'Les mots de passe ne correspondent pas',
  PASSWORD_TOO_SHORT: `Le mot de passe doit faire au moins ${PASSWORD_MIN_LENGTH} caractères`,
  SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette page',
}
```

---

## Exemples complets

### Formulaire d'inscription

```javascript
import { useForm } from '@/app/hooks/useForm'
import { registerSchema } from '@/app/lib/validators'
import { MESSAGES } from '@/app/lib/constants'

export function RegisterForm() {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    {
      name: '',
      firstName: '',
      email: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
    },
    async (data) => {
      // Envoyez au serveur
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    }
  )

  return (
    <form onSubmit={(e) => handleSubmit(e, registerSchema)}>
      <input {...} />
      {errors.name && <span className="error">{errors.name}</span>}
      {/* autres champs */}
    </form>
  )
}
```
