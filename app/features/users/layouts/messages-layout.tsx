import { Outlet } from "react-router";
import { MessagesCard } from "~/features/users/components/messages-card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="h-full max-h-[calc(100vh-14rem)] min-h-full overflow-hidden">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessagesCard
                  key={index}
                  id={index.toString()}
                  name={`User ${index}`}
                  avatarUrl="https://github.com/serranoarevalo.png"
                  lastMessage={`Last message ${index}`}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
