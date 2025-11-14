'use client'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4 text-red-500">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-2">Une erreur s'est produite</h1>
        <p className="text-gray-300 mb-6">
          {error?.message || 'Une erreur inattendue s\'est produite. Veuillez réessayer.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
