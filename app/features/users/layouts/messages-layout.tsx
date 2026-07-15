import { Outlet, useOutletContext } from "react-router";
import { MessagesCard } from "~/features/users/components/messages-card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import type { Route } from "./+types/messages-layout";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getMessages } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, { userId });
  return { messages };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { userId, avatar, name } = useOutletContext<{
    userId: string;
    avatar: string;
    name: string;
  }>();
  return (
    <SidebarProvider className="flex h-[calc(100vh-14rem)] max-h-[calc(100vh-14rem)] min-h-full overflow-hidden">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {loaderData.messages.map((message) => (
                <MessagesCard
                  key={message.message_room_id}
                  id={message.message_room_id.toString()}
                  name={message.name}
                  avatarUrl={message.avatar}
                  lastMessage={message.last_message}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 p-1">
        <Outlet context={{ userId, avatar, name }} />
      </div>
    </SidebarProvider>
  );
}
