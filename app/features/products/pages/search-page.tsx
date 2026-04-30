import type { MetaFunction } from "react-router";
import type { Route } from "./+types/search-page";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  return { query: url.searchParams.get("q") ?? "" };
}

export function action({ request }: Route.ActionArgs) {
  return { requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search products on wemake." },
  ];
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Search Results</h1>
      {/* Add search results */}
    </div>
  );
}
