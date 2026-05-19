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

interface NotificationCardProps {
  username: string;
  avatarUrl: string;
  avatarFallback: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export function NotificationCard({
  username,
  avatarUrl,
  avatarFallback,
  message,
  timestamp,
  seen,
}: NotificationCardProps) {
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
            <span> {message}</span>
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
