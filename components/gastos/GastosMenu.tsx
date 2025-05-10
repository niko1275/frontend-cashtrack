"use client"
import { Fragment } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'

interface ExpenseMenuProps {
    IdPresupuesto: number;
    IdGasto: number;
}

export default function ExpenseMenu({ IdPresupuesto, IdGasto }: ExpenseMenuProps) {
    const router = useRouter()
  
    return (
        <div className="flex shrink-0 items-center gap-x-6">
            <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                </MenuButton>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                            <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                onClick={() => {
                                    const params = new URLSearchParams()
                                    params.set('editexpense', 'true')
                                    params.set('showModal', 'true')
                                    params.set('IdGasto', IdGasto.toString())
                                    router.push(`?${params.toString()}`)
                                }}
                            >
                                Editar Gasto
                            </button>
                        </MenuItem>

                        <MenuItem>
                            <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                onClick={() => {}}
                            >
                                Eliminar Gasto
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}