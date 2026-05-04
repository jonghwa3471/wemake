import { data, redirect } from "react-router";
import type { Route } from "./+types/leaderboards-redirection-page";
import { DateTime } from "luxon";

export function loader({ params, request }: Route.LoaderArgs) {
  const { period } = params;
  let url: string;
  const today = DateTime.now().setZone("Asia/Seoul");
  if (period === "daily") {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `/products/leaderboards/yealy/${today.year}`;
  } else {
    return data(null, { status: 400 });
    // data fn으로 Response를 shortcut으로 사용할 수 있다.
    // return new Response("Not Found", { status: 404 });
  }
  return redirect(url);
}
