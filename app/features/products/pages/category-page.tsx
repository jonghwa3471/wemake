import type { MetaFunction } from "react-router";
import type { Route } from "./+types/category-page";

export function loader({ params, request }: Route.LoaderArgs) {
  return { category: params.category, requestUrl: request.url };
}

export function action({ params, request }: Route.ActionArgs) {
  return { category: params.category, requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Category | wemake" },
    { name: "description", content: "View products in a category." },
  ];
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{loaderData.category}</h1>
      {/* Add category products grid */}
    </div>
  );
}
