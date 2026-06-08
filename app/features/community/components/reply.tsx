import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";

interface ReplyProps {
  avatarUrl: string | null;
  username: string;
  timestamp: string;
  content: string;
  topLevel: boolean;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
}

export function Reply({
  avatarUrl,
  username,
  timestamp,
  content,
  topLevel,
  replies,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-2/3 items-start gap-5">
        <Avatar className="size-14">
          <AvatarFallback>{username[0]}</AvatarFallback>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
        </Avatar>
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Link to={`/users/@${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-muted-foreground text-xs">
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          <Button
            variant={"ghost"}
            className="self-end"
            onClick={toggleReplying}
          >
            <MessageCircleIcon className="size-4" /> Reply
          </Button>
        </div>
      </div>
      {replying && (
        <Form className="flex w-3/4 items-start gap-5">
          <Avatar className="size-14">
            <AvatarFallback>N</AvatarFallback>
            <AvatarImage src="https://github.com/jonghwa3471.png" />
          </Avatar>
          <div className="flex w-full flex-col items-end gap-5">
            <Textarea
              placeholder="Write a reply"
              className="w-full resize-none"
              rows={5}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className="w-full pl-20">
          {replies.map((reply) => (
            <Reply
              avatarUrl={reply.user.avatar}
              username={reply.user.name}
              timestamp={reply.created_at}
              content={reply.reply}
              topLevel={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
