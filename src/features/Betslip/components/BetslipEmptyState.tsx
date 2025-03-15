import { Ticket } from "lucide-react";

export function BetslipEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-400">
      <Ticket className="h-8 w-8 mb-2" />
      <p className="text-sm text-center">
        Click on the odds to add selections to your bet slip
      </p>
    </div>
  );
}
