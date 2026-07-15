import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form, useNavigation, useOutletContext } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { LoaderCircle, SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getMessagesByRoomId,
  getRoomsParticipant,
  sendMessageToRoom,
} from "../queries";
import z from "zod";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "Message | wemake",
    },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByRoomId(client, {
    userId,
    messageRoomId: params.messageRoomId,
  });
  const participant = await getRoomsParticipant(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  return { messages, participant };
};

const formSchema = z.object({
  message: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  }
  await sendMessageToRoom(client, {
    messageRoomId: params.messageRoomId,
    message: data.message,
    userId,
  });
  return {
    ok: true,
  };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex h-full flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={loaderData.participant.profile.avatar ?? ""} />
            <AvatarFallback>
              {loaderData.participant.profile.name[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>{loaderData.participant.profile.name}</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex h-full max-h-2/3 flex-col justify-start space-y-4 overflow-y-auto py-10">
        {loaderData.messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={message.sender.avatar ?? ""}
            avatarFallback={message.sender.name[0] ?? "?"}
            content={message.content}
            isCurrentUser={message.sender.profile_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form
            className="relative flex items-center justify-end"
            method="POST"
            ref={formRef}
          >
            <Textarea
              placeholder="Write a message..."
              rows={2}
              name="message"
              required
              className="resize-none"
            />
            <Button
              type="submit"
              size={"icon"}
              className="absolute right-2 cursor-pointer hover:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <SendIcon className="size-4" />
              )}
            </Button>
          </Form>
          {actionData && actionData.fieldErrors?.message && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.message?.join(", ")}
            </p>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}
