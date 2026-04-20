import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sage-dark via-sage to-charcoal text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        <Image
          src="/images/logos/Asset-2.svg"
          alt="Frontier Property Management"
          width={120}
          height={120}
          className="mb-8 opacity-50"
        />
        <h1 className="font-heading text-7xl font-bold text-peach md:text-8xl">
          404
        </h1>
        <h2 className="mt-4 font-heading text-2xl text-white md:text-3xl">
          Looks like you wandered off the trail
        </h2>
        <p className="mt-4 max-w-md text-base text-white/80">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to familiar territory.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-white text-sage hover:bg-cream">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/search">Browse Cabins</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
