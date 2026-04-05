import Swal from 'sweetalert2';

export const confirmAction = async (title = "¿Estás seguro?", text = "Esta acción no se puede deshacer.") => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444', 
    cancelButtonColor: '#C5A253',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    background: '#171717',
    color: '#ffffff',
    customClass: {
      popup: 'border border-neutral-800 rounded-lg shadow-2xl',
      title: 'font-karantina text-3xl tracking-wide text-white',
      htmlContainer: 'text-neutral-400 text-sm',
      confirmButton: 'font-bold rounded',
      cancelButton: 'font-bold rounded bg-brand-gold text-black hover:bg-yellow-500'
    }
  });
  return result.isConfirmed;
};
