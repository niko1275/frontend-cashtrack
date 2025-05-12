import { DialogTitle } from "@headlessui/react";

import { eliminarGasto } from "@/actions/gastos/eliminar-gasto.action";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteGastosFormProps {
  closeModal: () => void;
}

export default function DeleteGastosForm({ closeModal }: DeleteGastosFormProps){
    const searchParams = useSearchParams();
    const params = useParams();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            setErrorMessage('');
            
            const idPresupuesto = params.id as string;
            const idGasto = searchParams.get('IdGasto');

            if (!idGasto || !idPresupuesto) {
                const message = 'No se pudo obtener la información del gasto';
                setErrorMessage(message);
                toast.error(message);
                return;
            }

            const result = await eliminarGasto(idGasto, idPresupuesto);

            if (result.errors.length > 0) {
                setErrorMessage(result.errors[0]);
                toast.error(result.errors[0]);
                return;
            }

            toast.success(result.success);
            closeModal();
        } catch (error) {
            const message = 'Error al eliminar el gasto';
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <>
        <DialogTitle
          as="h3"
          className="font-black text-4xl text-purple-950 my-5"
        >
          Eliminar el Gasto
        </DialogTitle>
        <p className="text-xl font-bold">Confirma para eliminar, {''}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className='text-gray-600 text-sm'>(Un gasto eliminado no se puede recuperar)</p>
      
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
          disabled={isLoading}
        >Cancelar</button>
        <button
          type='button'
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors disabled:opacity-50"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
          
      </>
    )
}