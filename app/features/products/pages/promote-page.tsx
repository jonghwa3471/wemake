import { Form, type MetaFunction } from "react-router";
import type { Route } from "./+types/promote-page";
import { PageHero } from "~/common/components/page-hero";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export function loader({ request }: Route.LoaderArgs) {
  return { requestUrl: request.url };
}

export function action({ request }: Route.ActionArgs) {
  return { requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Promote Product | wemake" },
    { name: "description", content: "Promote your product" },
  ];
};

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days",
        ).days
      : 0;
  return (
    <div>
      <PageHero
        title="Promote Your Product"
        subtitle="Boost your product's visibility"
      />
      <Form className="mx-auto flex max-w-sm flex-col items-center gap-10">
        <SelectPair
          label="Select a product"
          description="Select the product you want to promote."
          name="product"
          placeholder="Select a product"
          options={[
            {
              label: "AI Dark Mode Maker",
              value: "ai-dark-mode-maker-1",
            },
            {
              label: "AI Dark Mode Maker",
              value: "ai-dark-mode-maker-2",
            },
            {
              label: "AI Dark Mode Maker",
              value: "ai-dark-mode-maker-3",
            },
          ]}
        />
        <div className="flex w-full flex-col items-center gap-2">
          <Label className="flex flex-col gap-1">
            Select a range of dates for promotion
            <small className="text-muted-foreground">
              Minimum duration is 3 days.
            </small>
          </Label>
          <Calendar
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={[{ before: new Date() }]}
          />
        </div>
        <Button disabled={totalDays === 0}>
          Go to checkout (${totalDays * 20})
        </Button>
      </Form>
    </div>
  );
}
