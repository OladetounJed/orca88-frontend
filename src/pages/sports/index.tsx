import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SportsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sports/football");
  }, [router]);

  return null;
}
