import { obtenerPresupuestoById } from "@/actions/presupuesto/obtener-budget-user";
import AñadirGastoBoton from "@/components/gastos/AñadirGastoBoton";
import ExpenseMenu from "@/components/gastos/GastosMenu";
import ModalContainer from "@/components/gastos/GastosModal";


export default async function Page({params}:{params:{id:string}}) {
    console.log(params.id)



    const budget = await obtenerPresupuestoById(params.id)
    
    return (
        <>
          <div className='flex justify-between items-center'>
            <div>
                <h1 className="font-black text-4xl text-purple-950">{budget?.nombre}</h1>
                <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
            </div>
            <AñadirGastoBoton/>
            </div>

            <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10">
            {budget?.gastos?.map((expense) => (
                <li key={expense.id} className="flex justify-between items-center p-5">
              
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                        {expense.nombre}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                        ${expense.cantidad}
                    </p>
                    <p className="text-gray-500 text-sm">ID gasto: {expense.id}</p>
                    </div>
                </div>

           
                <ExpenseMenu IdGasto={Number(expense.id)} IdPresupuesto={Number(budget.id)} />
                </li>
            ))}
            </ul>

            
            <ModalContainer/>
        </>
    );
}
