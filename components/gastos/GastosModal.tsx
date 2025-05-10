"use client"
import {  Fragment } from 'react';
import { useRouter, useSearchParams, usePathname, useParams } from 'next/navigation';
import { Dialog, DialogPanel,  Transition, TransitionChild } from '@headlessui/react';
import AddGastosForm from './AddGastosForm';
import EditGastosForm from './EditGastosForm';
import DeleteGastosForm from './DeleteGastosForm';

export default function ModalContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams();
  const id = params.id as string;
  const showModal = searchParams.get('showModal')
  const show = showModal ? true : false
  const addGastos = searchParams.get('addexpense')
  const editGastos = searchParams.get('editexpense')
  const idgasto = searchParams.get('IdGasto')

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())
    Array.from(hideModal.entries()).forEach(([key]) => {
      hideModal.delete(key)
    });
    router.replace(`${pathname}?${hideModal}`)
  }

  const renderContent = () => {
    if (addGastos) {
      return <AddGastosForm />
    }
    if (editGastos ) {
      return <EditGastosForm  />
    }
    return null
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  {renderContent()}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}