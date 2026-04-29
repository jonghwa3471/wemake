import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | wemake" },
    { name: "description" },
    { content: "Welcome to wemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="space-y-40 px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Today's Products
          </h2>
          <p className="text-foreground text-xl font-light">
            The best products made by our community today
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-foreground text-xl font-light">
            The latest discussions from our community.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => (
          <PostCard
            id={`postId-${index}`}
            title="What is the best productivity tool?"
            author="Nico"
            authorAvatarUrl="https://github.com/apple.png"
            category="Productivity"
            postedAt="12 hours ago"
          />
        ))}
      </div>
    </div>
  );
}
