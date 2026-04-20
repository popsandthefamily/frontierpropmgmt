import { cn } from "@/lib/utils";

interface WazeEmbedProps {
  className?: string;
}

export function WazeEmbed({ className }: WazeEmbedProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      <iframe
        src="https://embed.waze.com/iframe?zoom=12&lat=34.1437&lon=-94.7597&ct=livemap"
        width="100%"
        height="450"
        allowFullScreen
        loading="lazy"
        title="Waze live traffic map, Broken Bow, Oklahoma"
        className="border-0"
      />
    </div>
  );
}
