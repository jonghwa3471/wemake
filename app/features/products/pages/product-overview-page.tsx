import { ChevronUpIcon, StarIcon } from "lucide-react";
import type { Route } from "./+types/product-overview-page";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export function loader({ params }: Route.LoaderArgs) {
  return { productId: params.productId };
}

export function action({ params, request }: Route.ActionArgs) {
  return { productId: params.productId, requestMethod: request.method };
}

export const meta = () => {
  return [
    { title: `Product Overview | wemake` },
    { name: "description", content: "View product details and information" },
  ];
};

export default function ProductOverviewPage({
  params: { productId },
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this product?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic voluptas
          quo rerum commodi ducimus expedita consequuntur mollitia, tenetur
          animi consectetur libero laborum molestiae velit ratione deleniti
          voluptatibus nam atque! Architecto.
        </p>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold">How does it work?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic voluptas
          quo rerum commodi ducimus expedita consequuntur mollitia, tenetur
          animi consectetur libero laborum molestiae velit ratione deleniti
          voluptatibus nam atque! Architecto.
        </p>
      </div>
    </div>
  );
}
