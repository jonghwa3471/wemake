import type { MetaFunction } from "react-router";
import type { Route } from "./+types/daily-leaderboard-page";

export function loader({ params, request }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    day: params.day,
    requestUrl: request.url,
  };
}

export function action({ params, request }: Route.ActionArgs) {
  return {
    year: params.year,
    month: params.month,
    day: params.day,
    requestMethod: request.method,
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Leaderboard | wemake" },
    { name: "description", content: "View daily product rankings." },
  ];
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Top Products of {loaderData.month}/{loaderData.day}/{loaderData.year}
      </h1>
      {/* Add daily leaderboard content */}
    </div>
  );
}
