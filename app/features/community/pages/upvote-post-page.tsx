import type { Route } from "./+types/upvote-post-page";

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  return {
    ok: true,
  };
};
