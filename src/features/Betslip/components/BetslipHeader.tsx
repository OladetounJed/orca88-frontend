import { X } from "lucide-react";

interface BetslipHeaderProps {
  onClose?: () => void;
}

export function BetslipHeader({ onClose }: BetslipHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gokulight">
      <h2 className="text-sm font-semibold">Bet Slip</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-gokulight rounded-md transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
