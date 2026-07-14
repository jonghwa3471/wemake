import { Link } from "react-router";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";

import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
  id: number;
  title: string;
  owner?: boolean;
  viewsCount?: number;
  postedAt?: string;
  likesCount?: number;
  claimed?: boolean;
}

export function IdeaCard({
  id,
  title,
  owner,
  viewsCount,
  postedAt,
  likesCount,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className="hover:bg-card/50 bg-transparent transition-colors">
      <CardHeader>
        <Link to={claimed || owner ? "" : `/ideas/${id}`}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                claimed
                  ? "bg-muted-foreground text-muted-foreground selection:bg-muted-foreground break-all"
                  : "",
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {owner ? null : (
        <CardContent className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span>{viewsCount}</span>
          </div>
          <DotIcon className="size-4" />
          {postedAt && <span>{DateTime.fromISO(postedAt).toRelative()}</span>}
        </CardContent>
      )}
      <CardFooter className="mt-auto flex justify-end gap-2 border-none bg-transparent">
        {claimed || owner ? (
          <Button variant="outline" className="cursor-not-allowed" disabled>
            <LockIcon className="size-4" />
            Claimed
          </Button>
        ) : (
          <>
            <Button variant="outline">
              <HeartIcon className="size-4" />
              <span>{likesCount}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
