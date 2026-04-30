import type { MetaFunction } from "react-router";
import type { Route } from "./+types/weekly-leaderboard-page";

export function loader({ params, request }: Route.LoaderArgs) {
  return {
    year: params.year,
    week: params.week,
    requestUrl: request.url,
  };
}

export function action({ params, request }: Route.ActionArgs) {
  return {
    year: params.year,
    week: params.week,
    requestMethod: request.method,
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Weekly Leaderboard | wemake" },
    { name: "description", content: "View weekly product rankings." },
  ];
};

export default function WeeklyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Top Products of Week {loaderData.week}, {loaderData.year}
      </h1>
      {/* Add weekly leaderboard content */}
    </div>
  );
}
