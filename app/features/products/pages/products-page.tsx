import type { MetaFunction } from "react-router";
import type { Route } from "./+types/products-page";

export function loader({ request }: Route.LoaderArgs) {
  return { requestUrl: request.url };
}

export function action({ request }: Route.ActionArgs) {
  return { requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Products | wemake" },
    { name: "description", content: "Browse products on wemake." },
  ];
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      {/* Add products grid */}
    </div>
  );
}
