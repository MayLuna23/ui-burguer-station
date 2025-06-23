import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircle } from "lucide-react";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay con color cálido y blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-orange-100/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        {/* Contenedor central */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-center shadow-xl transition-all">
                <CheckCircle className="mx-auto text-orange-500 w-16 h-16 mb-4" />
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-white"
                >
                  ¡Pedido Enviado!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-white">
                Se ha enviado a tu correo la confirmación y los datos de tu compra.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 transition"
                    onClick={onClose}
                  >
                    Aceptar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
