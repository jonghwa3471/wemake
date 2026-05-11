import { StarIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

export interface ReviewCardProps {
  username: string;
  handle: string;
  avatarUrl?: string;
  rating: number;
  content: string;
  postedAt: string;
}

function getFallbackText(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.slice(0, 1).toUpperCase();
}

export function ReviewCard({
  username,
  handle,
  avatarUrl,
  rating,
  content,
  postedAt,
}: ReviewCardProps) {
  const clampedRating = Math.max(0, Math.min(5, Math.floor(rating)));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{getFallbackText(username)}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{username}</h4>
          <p className="text-muted-foreground text-sm">{handle}</p>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon
            key={index}
            className="size-4"
            fill={index < clampedRating ? "currentColor" : "transparent"}
          />
        ))}
      </div>
      <p className="text-muted-foreground">{content}</p>
      <span className="text-muted-foreground text-xs">{postedAt}</span>
    </div>
  );
}
