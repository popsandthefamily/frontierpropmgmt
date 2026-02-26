import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <Image
        src="/images/logos/Asset-2.svg"
        alt="Frontier Property Management"
        width={120}
        height={120}
        className="mb-8 opacity-30"
      />
      <h1 className="text-6xl font-heading font-bold text-sage mb-4">404</h1>
      <h2 className="text-2xl font-heading text-charcoal mb-4">
        Looks Like You Wandered Off the Trail
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to familiar territory.
      </p>
      <div className="flex gap-4">
        <Button asChild className="bg-sage hover:bg-sage-dark text-white">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/search">Browse Cabins</Link>
        </Button>
      </div>
    </div>
  );
}
