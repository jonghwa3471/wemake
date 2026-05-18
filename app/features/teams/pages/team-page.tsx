import type { Route } from "./+types/team-page";
import { PageHero } from "~/common/components/page-hero";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Team Details | wemake" }];
};

export default function TeamPage() {
  const positions = [
    "React Developer",
    "Backend Developer",
    "Product Manager",
  ];

  return (
    <div className="space-y-20">
      <PageHero title="Team" subtitle="Build something great together" />
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback>J</AvatarFallback>
            <AvatarImage src="https://github.com/jonghwa3471.png" />
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">@j2yonghwa</h2>
            <p className="text-muted-foreground">Team leader</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Looking for</h3>
          <div className="flex flex-wrap gap-2">
            {positions.map((role) => (
              <Badge key={role} className="text-base">
                {role}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Project</h3>
          <p className="text-lg">
            We are building a new social media platform focused on connecting
            makers and sharing product launches.
          </p>
        </div>
        <Button size="lg" className="self-center">
          Join team &rarr;
        </Button>
      </div>
    </div>
  );
}
