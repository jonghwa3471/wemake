import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { PageHero } from "~/common/components/page-hero";
import { Button } from "~/common/components/ui/button";

export const meta = () => {
  return [
    { title: `IdeasGPT | wemake` },
    {
      name: "description",
      content: "Find ideas for your next project",
    },
  ];
};

export default function IdeaPage() {
  return (
    <div className="">
      <PageHero title="Idea #12314" />
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10">
        <p className="text-center italic">
          "A startup that creates an AI-powered generated personal trainer,
          delivering customized fitness recommendations and tracking of progress
          using a mobile app to track workouts and progress as well as a website
          to manage the business."
        </p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span>123</span>
          </div>
          <DotIcon className="size-4" />
          <span>12 hours ago</span>
          <DotIcon className="size-4" />
          <Button variant="outline">
            <HeartIcon className="size-4" />
            <span>12</span>
          </Button>
        </div>
        <Button size={"lg"}>Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
