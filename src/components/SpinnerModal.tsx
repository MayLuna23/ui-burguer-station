// components/SpinnerModal.tsx
import { Loader2 } from "lucide-react";

export default function SpinnerModal({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-orange-100/30 backdrop-blur-sm flex items-center justify-center z-50">
      <Loader2 className="animate-spin text-orange-500 w-16 h-16" />
    </div>
  );
}
