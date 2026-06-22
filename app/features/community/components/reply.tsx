import { Form, Link, useActionData, useOutletContext } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { useEffect, useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
import type { action } from "../pages/post-page";

interface ReplyProps {
  name: string;
  username: string;
  avatarUrl: string | null;
  timestamp: string;
  content: string;
  topLevel: boolean;
  topLevelId: number;
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
  name,
  username,
  avatarUrl,
  timestamp,
  content,
  topLevel,
  topLevelId,
  replies,
}: ReplyProps) {
  const actionData = useActionData<typeof action>();
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  const {
    isLoggedIn,
    name: loggedInName,
    avatar,
  } = useOutletContext<{
    isLoggedIn: boolean;
    name: string;
    avatar: string;
  }>();
  useEffect(() => {
    if (actionData?.ok) {
      setReplying(false);
    }
  }, [actionData]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-2/3 items-start gap-5">
        <Avatar className="size-14">
          <AvatarFallback>{name[0]}</AvatarFallback>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
        </Avatar>
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Link to={`/users/@${username}`}>
              <h4 className="font-medium">{name}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-muted-foreground text-xs">
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          {isLoggedIn && (
            <Button
              variant={"ghost"}
              className="self-end"
              onClick={toggleReplying}
            >
              <MessageCircleIcon className="size-4" /> Reply
            </Button>
          )}
        </div>
      </div>
      {replying && (
        <Form className="flex w-3/4 items-start gap-5" method="POST">
          <input type="hidden" name="topLevelId" value={topLevelId} />
          <Avatar className="size-14">
            <AvatarFallback>{loggedInName[0]}</AvatarFallback>
            <AvatarImage src={avatar} />
          </Avatar>
          <div className="flex w-full flex-col items-end gap-5">
            <Textarea
              name="reply"
              placeholder="Write a reply"
              className="w-full resize-none"
              defaultValue={`@${username} `}
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
              name={reply.user.name}
              username={reply.user.username}
              avatarUrl={reply.user.avatar}
              timestamp={reply.created_at}
              content={reply.reply}
              topLevel={false}
              topLevelId={topLevelId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
