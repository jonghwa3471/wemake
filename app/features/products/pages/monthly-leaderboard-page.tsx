import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import z from "zod";
import { PageHero } from "~/common/components/page-hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
  })
    .setZone("Asia/Seoul")
    .setLocale("ko");
  return [
    {
      title: `Best of week ${date.toLocaleString({
        year: "2-digit",
        month: "long",
      })} | wemake`,
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
    month: parsedData.month,
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
  const today = DateTime.now().startOf("month");
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

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });
  const prevMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("month"));
  return (
    <div className="space-y-10">
      <PageHero
        title={`Best of week ${urlDate.toLocaleString({
          year: "2-digit",
          month: "long",
        })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant={"secondary"} asChild>
          <Link
            to={`/products/leaderboards/monthly/${prevMonth.year}/${prevMonth.month}`}
          >
            &larr;
            {prevMonth.toLocaleString({
              year: "2-digit",
              month: "long",
            })}
          </Link>
        </Button>
        {!isToday && (
          <Button variant={"secondary"} asChild>
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
            >
              {nextMonth.toLocaleString({
                year: "2-digit",
                month: "long",
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
