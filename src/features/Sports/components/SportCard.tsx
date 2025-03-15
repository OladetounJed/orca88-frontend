import Image from "next/image";
import Link from "next/link";
import type { Sport } from "@/types";
import { cn } from "@/lib/utils";

interface SportCardProps {
  sport: Sport;
  isActive?: boolean;
}

export function SportCard({ sport, isActive }: SportCardProps) {
  return (
    <Link key={sport.id} href={`/sports/${sport.slug}`}>
      <div
        className={cn(
          "flex flex-col items-center gap-2 p-3 rounded-lg transition-colors relative w-20 h-20",
          isActive
            ? "w-24 h-24"
            : "w-20 h-20"
        )}
        style={{
          backgroundColor: isActive ? sport.backgroundColor : undefined,
        }}
      >
        <div className="absolute top-0 left-0 bottom-0 right-0 ">
          <Image
            src={sport.image}
            alt={sport.title}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <span className="text-xs font-medium">{sport.title}</span>
      </div>
    </Link>
  );
}
