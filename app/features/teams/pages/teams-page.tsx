import { Link } from "react-router";
import type { Route } from "./+types/teams-page";
import { PageHero } from "~/common/components/page-hero";
import { Button } from "~/common/components/ui/button";
import { TeamCard } from "../components/team-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Teams | wemake" }];
};

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <PageHero
        title="Teams"
        subtitle="Find a team looking for a new member."
      />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            id={`teamId-${index}`}
            leaderUsername="@j2yonghwa"
            leaderAvatarUrl="https://github.com/jonghwa3471.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Product Manager",
            ]}
            projectDescription="a new social media platform."
          />
        ))}
      </div>
    </div>
  );
}
