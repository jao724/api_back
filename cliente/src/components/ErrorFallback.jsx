
import React from 'react'

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 text-center"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Oops! Algo salió mal.
        </h2>
        <p className="mb-4 text-gray-600">
          Ha ocurrido un error inesperado.
        </p>
        <pre className="mb-6 max-h-40 overflow-auto rounded bg-gray-100 p-3 text-left text-sm text-red-500">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
