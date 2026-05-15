import { Form } from "react-router";
import type { Route } from "./+types/submit-post-page";
import { PageHero } from "~/common/components/page-hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Post | wemake" }];
};

export default function SubmitPostPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <PageHero
        title="Create Discussion"
        subtitle="Ask questions, share ideas, and connect with other developers"
      />
      <Form className="mx-auto flex max-w-3xl flex-col space-y-10">
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="(40 characters or less)"
          required
          placeholder="i.e What is the best productivity tool?"
        />
        <SelectPair
          label="Category"
          name="Category"
          description="Select the category that best fits your discussion"
          placeholder="i.e Productivity"
          required
          options={[
            { label: "Productivity", value: "productivity" },
            { label: "Programming", value: "programming" },
            { label: "Design", value: "design" },
          ]}
        />
        <InputPair
          label="Content"
          name="content"
          id="content"
          description="(1000 characters or less)"
          required
          placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are the best tools out there?"
          textArea
        />
        <Button className="self-center">Create Discussion</Button>
      </Form>
    </div>
  );
}
