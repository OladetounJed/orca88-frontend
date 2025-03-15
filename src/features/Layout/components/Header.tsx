import { Search } from "lucide-react";

export function Header() {
  return (
    <div className="space-y-4 mb-6 mt-6">
      <h1 className="text-lg font-black">orca88.</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for any event or market"
          className="w-full bg-[#1a1a1a] text-gray-300 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
