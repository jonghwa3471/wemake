import { cn } from "~/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  className?: string;
}

export function PageHero({ title, description, className }: PageHeroProps) {
  return (
    <div
      className={cn(
        "from-background to-primary/10 flex flex-col items-center justify-center rounded-md bg-linear-to-t py-20",
        className,
      )}
    >
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-foreground text-2xl font-light">{description}</p>
    </div>
  );
}
