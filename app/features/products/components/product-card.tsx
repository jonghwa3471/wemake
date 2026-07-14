import { Link } from "react-router";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";

interface ProductCardProps {
  id: number | string;
  name: string;
  description: string;
  reviewsCount: string;
  viewsCount: string;
  votesCount: string;
}

export function ProductCard({
  id,
  name,
  description,
  reviewsCount,
  viewsCount,
  votesCount,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="block h-full">
      <Card className="hover:bg-card/50 flex h-full flex-row items-center justify-between bg-transparent px-2">
        <div className="flex w-full pb-4">
          <CardHeader className="w-full">
            <CardTitle className="text-2xl leading-none font-semibold tracking-tight">
              {name}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
            <div className="mt-2 flex items-center gap-4">
              <div className="text-muted-foreground flex items-center gap-px text-xs">
                <MessageCircleIcon className="size-4" />
                <span className="text-sm font-medium">{reviewsCount}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-px text-xs">
                <EyeIcon className="size-4" />
                <span>{viewsCount}</span>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="border-none bg-transparent py-0">
            <Button variant="outline" className="flex h-14 flex-col">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{votesCount}</span>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
