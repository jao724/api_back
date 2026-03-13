import React from 'react';

export default function TaskForm({ title, setTitle, description, setDescription, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="contenedor max-w-none! m-0! mt-0! mb-12 transform-none hover:transform-none">
      <div className="form-header text-left">
        <h2 className="text-2xl! text-left!">Crear Nueva Tarea</h2>
        <p className="subtitle text-left!">Define los detalles de tu próximo objetivo</p>
      </div>

      <div className="form-register p-0!">
        <div className="input-group">
          <input
            type="text"
            placeholder="¿Qué hay que hacer?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <textarea
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-600 transition-all min-h-[120px] resize-none"
            placeholder="Añade una descripción detallada..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button type="submit" className="flex-1 m-0!">
            Guardar Tarea
          </button>
        </div>
      </div>
    </form>

  );
}

