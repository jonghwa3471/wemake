import type { Route } from "./+types/category-page";
import { PageHero } from "~/common/components/page-hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import z from "zod";
import {
  getCategory,
  getCategoryPages,
  getProductsByCategory,
} from "../queries";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | wemake` },
    { name: "description", content: `Browse Developer Tools products` },
  ];
};

const paramsSchema = z.object({
  category: z.coerce.number(),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const { data, success } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Response("Invalid category", { status: 400 });
  }
  const category = await getCategory(data.category);
  const products = await getProductsByCategory({
    categoryId: category.category_id,
    page: Number(page),
  });
  const totalPages = await getCategoryPages(data.category);
  return { category, products, totalPages };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <PageHero
        title={loaderData.category.name}
        subtitle={loaderData.category.description}
      />

      <div className="mx-auto w-full max-w-3xl space-y-5">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
