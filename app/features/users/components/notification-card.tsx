import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link } from "react-router";

interface NotificationCardProps {
  username: string;
  avatarUrl: string;
  avatarFallback: string;
  type: "follow" | "review" | "reply";
  timestamp: string;
  seen: boolean;
  productName?: string;
  postTitle?: string;
  payloadId?: number;
}

export function NotificationCard({
  username,
  avatarUrl,
  avatarFallback,
  type,
  timestamp,
  seen,
  productName,
  postTitle,
  payloadId,
}: NotificationCardProps) {
  const getMessage = (type: "follow" | "review" | "reply") => {
    switch (type) {
      case "follow":
        return " followed you.";
      case "review":
        return " reviewed your product: ";
      case "reply":
        return " replied to your post: ";
    }
  };
  return (
    <Card className={cn("min-w-sm", seen ? "" : "bg-sky-500/60")}>
      <CardHeader className="flex flex-row items-start gap-5">
        <Avatar>
          <AvatarFallback>{avatarFallback}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{username}</span>
            <span> {getMessage(type)}</span>
            {productName && (
              <Button variant={"ghost"} asChild className="text-lg">
                <Link to={`/products/${payloadId}/reviews`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant={"ghost"} asChild className="text-lg">
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end border-none bg-transparent">
        <Button variant={"outline"} size={"icon"}>
          <CheckIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
