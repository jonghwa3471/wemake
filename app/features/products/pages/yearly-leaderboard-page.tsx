import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import z from "zod";
import { PageHero } from "~/common/components/page-hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  })
    .setZone("Asia/Seoul")
    .setLocale("ko");
  return [
    {
      title: `Best of ${date.toLocaleString({
        year: "numeric",
      })}`,
    },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "invalid_date",
        message: "Invalid date",
      },
      {
        status: 400,
      },
    );
  }
  const date = DateTime.fromObject({
    year: parsedData.year,
  });
  if (!date.isValid) {
    throw data(
      {
        error_code: "invalid_date",
        message: "Invalid date",
      },
      {
        status: 400,
      },
    );
  }
  const today = DateTime.now().startOf("year");
  if (date > today) {
    throw data(
      {
        error_code: "future_date",
        message: "Future date",
      },
      {
        status: 400,
      },
    );
  }
  return {
    ...parsedData,
  };
}

export default function YearlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const prevYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  return (
    <div className="space-y-10">
      <PageHero
        title={`Best of ${urlDate.toLocaleString({
          year: "numeric",
        })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant={"secondary"} asChild>
          <Link to={`/products/leaderboards/yearly/${prevYear.year}`}>
            &larr;
            {prevYear.toLocaleString({
              year: "numeric",
            })}
          </Link>
        </Button>
        {!isToday && (
          <Button variant={"secondary"} asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({
                year: "numeric",
              })}
              &rarr;
            </Link>
          </Button>
        )}
      </div>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
