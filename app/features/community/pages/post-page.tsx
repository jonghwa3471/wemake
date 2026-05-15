import type { Route } from "./+types/post-page";
import { PageHero } from "~/common/components/page-hero";
import { Button } from "~/common/components/ui/button";
import { DotIcon } from "lucide-react";

export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `${params.postId} | wemake` }];
};

export default function PostPage({}: Route.ComponentProps) {
  return <div></div>;
}
