import { Form, type MetaFunction } from "react-router";
import type { Route } from "./+types/promote-page";
import { PageHero } from "~/common/components/page-hero";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

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

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "hQXCTRFORCizlkzGCjBSD"; // userId

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
  const widgets = useRef<TossPaymentsWidgets | null>(null);
  useEffect(() => {
    const initToss = async () => {
      const toss = await loadTossPayments(clientKey);
      widgets.current = toss.widgets({ customerKey });
      await widgets.current.setAmount({
        value: 0,
        currency: "KRW",
      });
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-methods",
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    };
    initToss();
  }, [clientKey, customerKey]);
  useEffect(() => {
    const updateAmount = async () => {
      if (widgets.current) {
        await widgets.current.setAmount({
          value: totalDays * 20000,
          currency: "KRW",
        });
      }
    };
    updateAmount();
  }, [promotionPeriod]);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product = formData.get("product");
    if (!product || !promotionPeriod?.from || !promotionPeriod.to) return;
    await widgets.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `wemake promotion for ${product}`,
      customerEmail: "whdghk3471@naver.com",
      customerName: "jonghwa",
      customerMobilePhone: "01012345678",
      metadata: {
        product,
        promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
        promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
      },
      successUrl: `${window.location.href}/success`,
      failUrl: `${window.location.href}/fail`,
    });
  };
  return (
    <div>
      <PageHero
        title="Promote Your Product"
        subtitle="Boost your product's visibility"
      />
      <form className="grid grid-cols-6 gap-10" onSubmit={handleSubmit}>
        <div className="col-span-3 mx-auto flex flex-col items-center gap-10">
          <SelectPair
            required
            label="Select a product"
            description="Select the product you want to promote."
            name="product"
            placeholder="Select a product"
            options={[
              {
                label: "AI Dark Mode Maker 1",
                value: "ai-dark-mode-maker-1",
              },
              {
                label: "AI Dark Mode Maker 2",
                value: "ai-dark-mode-maker-2",
              },
              {
                label: "AI Dark Mode Maker 3",
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
              className="min-w-sm"
              mode="range"
              selected={promotionPeriod}
              onSelect={setPromotionPeriod}
              min={3}
              disabled={[{ before: new Date() }]}
            />
          </div>
        </div>
        <aside className="col-span-3 flex flex-col items-center px-20">
          <div id="toss-payment-methods" className="w-full" />
          <div id="toss-payment-agreement" className="w-full" />
          <Button disabled={totalDays === 0} className="w-full">
            Checkout (
            {(totalDays * 20000).toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
            )
          </Button>
        </aside>
      </form>
    </div>
  );
}
