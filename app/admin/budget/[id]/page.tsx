import { obtenerPresupuestoById } from "@/actions/presupuesto/obtener-budget-user";
import AñadirGastoBoton from "@/components/gastos/AñadirGastoBoton";
import ExpenseMenu from "@/components/gastos/GastosMenu";
import ModalContainer from "@/components/gastos/GastosModal";
import Amount from "@/components/ui/Amount";
import Grafico from "@/components/ui/Grafico";


export default async function Page({params}:{params:{id:string}}) {
    console.log(params.id)



    const budget = await obtenerPresupuestoById(params.id)
    const totalGastos = budget?.gastos?.reduce((acc, gasto) => acc + Number(gasto.cantidad), 0) ?? 0
    const restante = Number(budget?.cantidad) - totalGastos
    const porcentajeRestante = ((restante / Number(budget?.cantidad)) * 100) || 0
    return (
        <>
          <div className='flex justify-between items-center'>
            <div>
                <h1 className="font-black text-4xl text-purple-950">{budget?.nombre}</h1>
                <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
            </div>
            <AñadirGastoBoton/>
            </div>


            {
                budget?.gastos.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
                        <div>
                            <Grafico porcentaje={porcentajeRestante}/>
                        </div>
                        <div className="flex flex-col gap-4 justify-center lg:ml-10 ">
                        <Amount label='Presupuesto'
                            cantidad={Number(budget.cantidad)}
                        />
                        <Amount label='Gastado'
                            cantidad={Number(totalGastos)}
                        />
                        <Amount label='Disponible'
                            cantidad={Number(restante)}
                        />
                        </div>
                       
                    </div>
                ) : (
                    <div>
                        <p className="text-xl text-purple-950 font-bold mt-10">No hay gastos en este presupuesto</p>
                    </div>
                )
            }

            <div>
                <p className="text-xl text-purple-950 font-bold mt-10">Gastos en este presupuesto</p>
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

           
                <ExpenseMenu IdGasto={Number(expense.id)}/>
                </li>
            ))}
            </ul>

            
            <ModalContainer/>
        </>
    );
}
