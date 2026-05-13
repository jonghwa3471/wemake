import type { Route } from "./+types/social-start-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Social sign-in | wemake" }];
};

export default function SocialStartPage() {
  return <div>Social start</div>;
}
