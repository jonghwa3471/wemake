import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import { Form, Link, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Log in | wemake" }];
};

export const action = async ({ request }: Route.ActionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return { message: "Success!" };
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Button variant={"ghost"} asChild className="absolute top-8 right-8">
        <Link to={`/auth/join`}>Join</Link>
      </Button>
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4" method="POST">
          <InputPair
            id="email"
            label="Email"
            description="Enter your email address"
            name="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>
          {actionData?.message && (
            <p className="text-sm text-teal-500">{actionData.message}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
