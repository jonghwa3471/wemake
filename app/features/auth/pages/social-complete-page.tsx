import type { Route } from "./+types/social-complete-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Social sign-in complete | wemake" }];
};

export default function SocialCompletePage() {
  return <div>Social complete</div>;
}
