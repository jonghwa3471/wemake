import { cn } from "~/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({ title, subtitle, className }: PageHeroProps) {
  return (
    <div
      className={cn(
        "from-background to-primary/20 flex flex-col items-center justify-center rounded-md bg-linear-to-t py-20",
        className,
      )}
    >
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-foreground text-center text-2xl font-light">
        {subtitle}
      </p>
    </div>
  );
}
