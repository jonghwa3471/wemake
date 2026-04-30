import type { MetaFunction } from "react-router";
import type { Route } from "./+types/monthly-leaderboard-page";

export function loader({ params, request }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    requestUrl: request.url,
  };
}

export function action({ params, request }: Route.ActionArgs) {
  return {
    year: params.year,
    month: params.month,
    requestMethod: request.method,
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Monthly Leaderboard | wemake" },
    { name: "description", content: "View monthly product rankings." },
  ];
};

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Top Products of {loaderData.month}/{loaderData.year}
      </h1>
      {/* Add monthly leaderboard content */}
    </div>
  );
}
