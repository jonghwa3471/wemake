import type { MetaFunction } from "react-router";
import type { Route } from "./+types/yearly-leaderboard-page";

export function loader({ params, request }: Route.LoaderArgs) {
  return { year: params.year, requestUrl: request.url };
}

export function action({ params, request }: Route.ActionArgs) {
  return { year: params.year, requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Yearly Leaderboard | wemake" },
    { name: "description", content: "View yearly product rankings." },
  ];
};

export default function YearlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Top Products of {loaderData.year}
      </h1>
      {/* Add yearly leaderboard content */}
    </div>
  );
}
