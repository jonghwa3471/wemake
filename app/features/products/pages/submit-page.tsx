import type { MetaFunction } from "react-router";
import type { Route } from "./+types/submit-page";

export function loader({ request }: Route.LoaderArgs) {
  return { requestUrl: request.url };
}

export function action({ request }: Route.ActionArgs) {
  return { requestMethod: request.method };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product to wemake." },
  ];
};

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Submit Your Product</h1>
      {/* Add submission form */}
    </div>
  );
}
