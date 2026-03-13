import React from 'react';

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="contenedor max-w-none! p-6! transform-none hover:translate-y-[-4px] hover:shadow-blue-500/10 mb-0">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent truncate">
          {task.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2! mt-0! bg-white/5! hover:bg-yellow-500/20! text-yellow-500 shadow-none! border border-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2! mt-0! bg-white/5! hover:bg-red-500/20! text-red-500 shadow-none! border border-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
        {task.description}
      </p>
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Pendiente</span>
      </div>
    </div>
  );
}

