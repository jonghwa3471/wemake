import type { Route } from "./+types/product-reviews-page";
import { PageHero } from "~/common/components/page-hero";

export function loader({ params }: Route.LoaderArgs) {
  return { productId: params.productId };
}

export function action({ params, request }: Route.ActionArgs) {
  return { productId: params.productId, requestMethod: request.method };
}

export const meta = ({ params }: Route.MetaArgs) => {
  const id = params.productId ?? "";
  return [
    { title: `Reviews · Product ${id} | wemake` },
    { name: "description", content: "Product reviews" },
  ];
};

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <PageHero
        title="Reviews"
        subtitle={`Product ${loaderData.productId}`}
      />
    </div>
  );
}
