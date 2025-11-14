# Hooks Documentation

## useForm

Hook pour gérer l'état et la validation d'un formulaire.

### Usage

```javascript
import { useForm } from '@/app/hooks/useForm'
import { registerSchema } from '@/app/lib/validators'

export function MyForm() {
  const { formData, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { name: '', email: '' },
    async (data) => {
      // Handle form submission
      console.log('Form data:', data)
    }
  )

  return (
    <form onSubmit={(e) => handleSubmit(e, registerSchema)}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.name && <span>{errors.name}</span>}
      <button type="submit">Submit</button>
    </form>
  )
}
```

### API

#### Properties
- `formData` - Objet contenant les données du formulaire
- `errors` - Objet contenant les erreurs de validation
- `touched` - Objet indiquant les champs visités
- `isLoading` - Boolean indiquant si la soumission est en cours

#### Methods
- `handleChange(e)` - Met à jour les données du formulaire
- `handleBlur(e)` - Marque un champ comme visité
- `handleReset()` - Réinitialise le formulaire
- `validateForm(schema)` - Valide le formulaire avec un schéma Zod
- `handleSubmit(e, schema)` - Soumet le formulaire avec validation

---

## useAuth

Hook pour gérer l'authentification et les routes protégées.

### useProtectedRoute

Protège une route et redirige vers login si non authentifié.

```javascript
import { useProtectedRoute } from '@/app/hooks/useAuth'

export function ProfilePage() {
  const { session, isAuthenticated, isLoading } = useProtectedRoute()

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return null

  return <div>Bienvenue {session.user.name}</div>
}
```

#### Returns
- `session` - Objet session contenant les données utilisateur
- `status` - Statut de la session ('loading', 'authenticated', 'unauthenticated')
- `isLoading` - Boolean indiquant le chargement
- `isAuthenticated` - Boolean indiquant l'authentification

### useFormLoading

Hook pour gérer l'état de chargement d'un formulaire.

```javascript
import { useFormLoading } from '@/app/hooks/useAuth'

export function MyForm() {
  const { isLoading, startLoading, stopLoading } = useFormLoading()

  const handleSubmit = async () => {
    startLoading()
    try {
      // API call
    } finally {
      stopLoading()
    }
  }

  return <button onClick={handleSubmit}>{isLoading ? 'Loading...' : 'Submit'}</button>
}
```

#### Returns
- `isLoading` - Boolean indiquant le chargement
- `setIsLoading` - Fonction pour définir l'état
- `startLoading()` - Commence le chargement
- `stopLoading()` - Termine le chargement

### useFormError

Hook pour gérer les erreurs de formulaire.

```javascript
import { useFormError } from '@/app/hooks/useAuth'

export function MyForm() {
  const { error, setError, clearError } = useFormError()

  return (
    <form>
      {error && <div className="error">{error}</div>}
      <button onClick={() => setError('Something went wrong')}>Error</button>
      <button onClick={clearError}>Clear</button>
    </form>
  )
}
```

#### Returns
- `error` - String contenant le message d'erreur
- `setError(message)` - Définit le message d'erreur
- `clearError()` - Efface le message d'erreur
