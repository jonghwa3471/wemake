import { Form } from "react-router";
import type { Route } from "./+types/new-product-review-page";
import { PageHero } from "~/common/components/page-hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";

export function loader({ params }: Route.LoaderArgs) {
  return { productId: params.productId };
}

export function action({ params, request }: Route.ActionArgs) {
  return { productId: params.productId, requestMethod: request.method };
}

export const meta = ({ params }: Route.MetaArgs) => {
  const id = params.productId ?? "";
  return [
    { title: `Write a review · Product ${id} | wemake` },
    { name: "description", content: "Write a product review" },
  ];
};

export default function NewProductReviewPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <PageHero
        title="Write a review"
        subtitle={`Product ${loaderData.productId}`}
      />
      <Form className="mx-auto mt-8 max-w-2xl space-y-5">
        <InputPair
          textArea
          label="Review"
          description="Share your experience with this product"
          id="body"
          name="body"
          required
          type="text"
          placeholder="What worked well? What could be better?"
        />
        <Button type="submit" className="w-full" size="lg">
          Submit review
        </Button>
      </Form>
    </div>
  );
}
