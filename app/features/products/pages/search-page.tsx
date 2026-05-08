import { Form, type MetaFunction } from "react-router";
import type { Route } from "./+types/search-page";
import z from "zod";
import { PageHero } from "~/common/components/page-hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce.number().int().min(1).optional().default(1),
  ),
});

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid params");
  }
  console.log(parsedData);
}

export function action({ request }: Route.ActionArgs) {
  return { requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products." },
  ];
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <PageHero
        title="Search"
        subtitle="Search for products by title or description"
      />
      <Form className="mx-auto flex max-w-xl items-center justify-center gap-2">
        <Input
          name="query"
          placeholder="Search for products"
          className="text-lg"
        />
        <Button type="submit">Search</Button>
      </Form>
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
