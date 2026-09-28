import Image from "next/image";
import { cn } from "@/lib/utils";

interface PostCoverProps {
  /** An owned photo. When absent, the emoji panel is used. */
  image?: string;
  /** Shown on the fallback panel. Decorative, so hidden from screen readers. */
  emoji?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Scale the photo on card hover. */
  hoverZoom?: boolean;
}

/**
 * A blog post's cover.
 *
 * Only photos Frontier owns or has rights to belong on posts: Sublime
 * Retreat, the house on Old Broken Bow Highway, local landscapes, and
 * landmarks. Earlier covers included a stock photo of a stranger and a
 * cabin that is not ours. When no owned photo fits a topic (tax law,
 * fees, a list of questions), a post sets `emoji` instead and gets a
 * branded panel, which is better than a photo that misleads.
 */
export function PostCover({
  image,
  emoji = "🌲",
  alt,
  sizes,
  priority,
  className,
  hoverZoom,
}: PostCoverProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover",
          hoverZoom && "transition-transform duration-500 group-hover:scale-105",
          className,
        )}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage via-sage-dark to-forest",
        className,
      )}
    >
      {/* Soft texture so the panel does not read as an empty block. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_45%),radial-gradient(circle_at_80%_90%,white_0,transparent_40%)]"
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative select-none leading-none drop-shadow-sm",
          "text-[clamp(3rem,9vw,7rem)]",
          hoverZoom && "transition-transform duration-500 group-hover:scale-110",
        )}
      >
        {emoji}
      </span>
    </div>
  );
}
