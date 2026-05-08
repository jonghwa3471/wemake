import type { Route } from "./+types/category-page";
import { PageHero } from "~/common/components/page-hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";

export function loader({ params, request }: Route.LoaderArgs) {
  return { category: params.category, requestUrl: request.url };
}

export function action({ params, request }: Route.ActionArgs) {
  return { category: params.category, requestMethod: request.method };
}

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | wemake` },
    { name: "description", content: `Browse Developer Tools products` },
  ];
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <PageHero
        title="Developer Tools"
        subtitle="Tools for developers to build products faster"
      />

      <div className="mx-auto w-full max-w-3xl space-y-5">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
