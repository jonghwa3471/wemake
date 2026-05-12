import { Form } from "react-router";
import type { Route } from "./+types/submit-job-page";
import { PageHero } from "~/common/components/page-hero";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Job | wemake" },
    { name: "description", content: "Post a job opening" },
  ];
};

export default function SubmitJobPage() {
  return (
    <div>
      <PageHero
        title="Post a Job"
        subtitle="Reach candidates on wemake"
      />
      <Form className="mx-auto grid max-w-2xl gap-6">
        <InputPair
          label="Title"
          description="Role title as candidates will see it"
          id="title"
          name="title"
          type="text"
          required
          placeholder="Software Engineer"
        />
        <InputPair
          label="Company"
          description="Hiring company name"
          id="company"
          name="company"
          type="text"
          required
          placeholder="Acme Inc."
        />
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
