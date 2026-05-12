import { useParams } from "react-router";
import type { Route } from "./+types/job-page";
import { PageHero } from "~/common/components/page-hero";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Job | wemake" },
    {
      name: "description",
      content: "View job details",
    },
  ];
};

export default function JobPage() {
  const { jobId } = useParams();

  return (
    <div>
      <PageHero title={jobId ? `Job ${jobId}` : "Job"} />
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10">
        <p className="text-muted-foreground text-center text-sm">
          Job details will appear here.
        </p>
        <Button size="lg">Apply now &rarr;</Button>
      </div>
    </div>
  );
}
