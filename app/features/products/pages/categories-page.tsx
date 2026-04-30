import type { MetaFunction } from "react-router";
import type { Route } from "./+types/categories-page";

export function loader({ request }: Route.LoaderArgs) {
  return { requestUrl: request.url };
}

export function action({ request }: Route.ActionArgs) {
  return { requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Categories | wemake" },
    { name: "description", content: "Browse product categories." },
  ];
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Categories</h1>
      {/* Add categories grid */}
    </div>
  );
}
