import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircle, XCircle } from "lucide-react";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
};

export default function ConfirmModal({ isOpen, onClose, success }: ConfirmModalProps) {
  const icon = success ? (
    <CheckCircle className="mx-auto text-orange-500 w-16 h-16 mb-4" />
  ) : (
    <XCircle className="mx-auto text-red-500 w-16 h-16 mb-4" />
  );

  const title = success ? "¡Pedido Enviado!" : "¡Algo salió mal!";
  const message = success
    ? "Se ha enviado a tu correo la confirmación y los datos de tu compra. Por favor revisa tu bandeja de Spam o correos no deseados."
    : "No se pudo enviar el correo de confirmación. Intenta de nuevo.";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay con blur y color dependiendo del estado */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 ${success ? "bg-orange-100/30" : "bg-red-100/30"} backdrop-blur-sm transition-opacity`} />
        </Transition.Child>

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
                {icon}
                <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-white">
                    {message}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className={`inline-flex justify-center rounded-md px-6 py-2 text-sm font-semibold text-white shadow transition ${
                      success ? "bg-orange-500 hover:bg-orange-600" : "bg-red-500 hover:bg-red-600"
                    }`}
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
