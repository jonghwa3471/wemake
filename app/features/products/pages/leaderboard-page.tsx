import type { MetaFunction } from "react-router";
import type { Route } from "./+types/leaderboard-page";

export function loader({ request }: Route.LoaderArgs) {
  return { requestUrl: request.url };
}

export function action({ request }: Route.ActionArgs) {
  return { requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Leaderboards | wemake" },
    { name: "description", content: "Explore product leaderboards." },
  ];
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Leaderboard</h1>
      {/* Add leaderboard content */}
    </div>
  );
}
