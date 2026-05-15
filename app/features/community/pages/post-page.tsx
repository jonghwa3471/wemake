import type { Route } from "./+types/post-page";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { Form, Link } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `${params.postId} | wemake` }];
};

export default function PostPage({}: Route.ComponentProps) {
  return (
    <div className="grid grid-cols-6 items-start gap-40">
      <div className="col-span-4 space-y-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/community`}>Community</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/community?topic=productivity`}>Productivity</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/community/postId`}>
                  What is the best productivity tool?
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex w-full items-start gap-10">
          <Button variant="outline" className="flex h-14 flex-col">
            <ChevronUpIcon className="size-4 shrink-0" />
            <span>{10}</span>
          </Button>
          <div className="space-y-20">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">
                What is the best productivity tool?
              </h2>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <span>@nico</span>
                <DotIcon className="size-5" />
                <span>12 hours ago</span>
                <DotIcon className="size-5" />
                <span>10 replies</span>
              </div>
              <p className="text-muted-foreground max-w-3/4">
                Hello, I'm looking for a productivity tool that can help me
                manage my tasks and projects. Any recommendations? I have tried
                Notion, but it's not what I'm looking for. I dream of a tool
                that can help me manage my tasks and projects. Any
                recommendations?
              </p>
            </div>
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
          </div>
        </div>
      </div>
      <aside className="col-span-2"></aside>
    </div>
  );
}
