import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { DotIcon } from "lucide-react";

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  category: string;
  postedAt: string;
  authorAvatarUrl: string;
}

export function PostCard({
  id,
  title,
  author,
  category,
  postedAt,
  authorAvatarUrl,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`}>
      <Card className="hover:bg-card/50 bg-transparent transition-colors">
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14">
            <AvatarFallback>N</AvatarFallback>
            {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
          </Avatar>

          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="text-muted-foreground flex gap-2 text-sm leading-tight">
              <span>{author} on</span>
              <span>{category}</span>
              <DotIcon className="size-4" />
              <span>{postedAt}</span>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="flex justify-end border-none bg-transparent">
          <Button variant="link">Reply &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
