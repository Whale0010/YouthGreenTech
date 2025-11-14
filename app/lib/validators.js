import { z } from 'zod';
import { PASSWORD_MIN_LENGTH, NAME_MAX_LENGTH, EMAIL_REGEX } from './constants';

// Register form validation
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(NAME_MAX_LENGTH, `Le nom ne doit pas dépasser ${NAME_MAX_LENGTH} caractères`)
    .trim(),
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(NAME_MAX_LENGTH, `Le prénom ne doit pas dépasser ${NAME_MAX_LENGTH} caractères`)
    .trim(),
  email: z
    .string()
    .email('Veuillez entrer une adresse email valide')
    .min(5, 'L\'email est trop court'),
  dateOfBirth: z
    .string()
    .min(1, 'La date de naissance est requise'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Le mot de passe doit faire au moins ${PASSWORD_MIN_LENGTH} caractères`)
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// Login form validation
export const loginSchema = z.object({
  email: z
    .string()
    .email('Veuillez entrer une adresse email valide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis'),
});

// Profile form validation
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(NAME_MAX_LENGTH, `Le nom ne doit pas dépasser ${NAME_MAX_LENGTH} caractères`)
    .optional(),
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(NAME_MAX_LENGTH, `Le prénom ne doit pas dépasser ${NAME_MAX_LENGTH} caractères`)
    .optional(),
  email: z
    .string()
    .email('Veuillez entrer une adresse email valide')
    .optional(),
});

/**
 * Validate data against schema
 * @param {*} data - Data to validate
 * @param {*} schema - Zod schema to validate against
 * @returns {Object} { success: boolean, data?: Object, errors?: Object }
 */
export function validateData(data, schema) {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {});
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Erreur de validation' } };
  }
}
