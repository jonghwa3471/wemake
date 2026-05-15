import type { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import { PageHero } from "~/common/components/page-hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Post | wemake" }];
};

export default function SubmitPostPage({}: Route.ComponentProps) {
  return <div></div>;
}
