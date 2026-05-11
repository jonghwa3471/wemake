import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";

export function loader({ params }: Route.LoaderArgs) {
  return { productId: params.productId };
}

export function action({ params, request }: Route.ActionArgs) {
  return { productId: params.productId, requestMethod: request.method };
}

export const meta = ({ params }: Route.MetaArgs) => {
  const id = params.productId ?? "";
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Read and write product reviews" },
  ];
};

export default function ProductReviewsPage({}: Route.ComponentProps) {
  return (
    <div className="max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">10 Reviews</h2>
        <Button variant={"secondary"}>Write a review</Button>
      </div>
      <div className="space-y-20">
        {Array.from({ length: 10 }).map((_, index) => (
          <ReviewCard
            key={index}
            username="J2yonghwa"
            handle="@username"
            avatarUrl="https://github.com/jonghwa3471.png"
            rating={4}
            content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere sed est culpa, sequi nemo corrupti quo asperiores quia nulla officia ullam beatae. Minima laudantium sit officiis maxime asperiores repellendus vel?"
            postedAt="10 days ago"
          />
        ))}
      </div>
    </div>
  );
}
