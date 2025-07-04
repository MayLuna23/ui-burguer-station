import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  icon: "success" | "error";
  title: string;
  message: string;
  buttonText: string;
  navigateTo?: string | null;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  icon,
  title,
  message,
  buttonText,
  navigateTo = null,
}: ConfirmModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    if (navigateTo) {
      setTimeout(() => navigate(navigateTo!), 300);
    }
  };

  const isSuccess = icon === "success";
  const IconComponent = isSuccess ? CheckCircle : XCircle;
  const iconColor = isSuccess ? "text-orange-500" : "text-red-500";
  const buttonColor = isSuccess ? "bg-orange-500 hover:bg-orange-600" : "bg-red-500 hover:bg-red-600";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity`} />
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
                <IconComponent className={`mx-auto w-16 h-16 mb-4 ${iconColor}`} />
                <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-white">{message}</p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className={`inline-flex justify-center rounded-md px-6 py-2 text-sm font-semibold text-white shadow transition ${buttonColor}`}
                    onClick={handleClose}
                  >
                    {buttonText}
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
