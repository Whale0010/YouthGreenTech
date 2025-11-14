'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MESSAGES } from '@/app/lib/constants';

/**
 * Hook for protecting routes that require authentication
 * Redirects to login if user is not authenticated
 * @returns {Object} { session, status, isLoading }
 */
export function useProtectedRoute() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login?error=' + encodeURIComponent(MESSAGES.SESSION_EXPIRED));
    }

    setIsLoading(false);
  }, [session, status, router]);

  return {
    session,
    status,
    isLoading,
    isAuthenticated: !!session,
  };
}

/**
 * Hook for tracking form loading state
 * @returns {Object} { isLoading, setIsLoading, startLoading, stopLoading }
 */
export function useFormLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
  };
}

/**
 * Hook for error handling
 * @returns {Object} { error, setError, clearError }
 */
export function useFormError() {
  const [error, setError] = useState('');

  const clearError = () => setError('');
  const setErrorMessage = (message) => setError(message);

  return {
    error,
    setError: setErrorMessage,
    clearError,
  };
}
