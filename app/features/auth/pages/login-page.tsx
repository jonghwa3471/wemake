import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircle } from "lucide-react";
import z from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Log in | wemake" }];
};

const formSchema = z.object({
  email: z
    .string("Email should be a string")
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      formErrors: z.flattenError(error).fieldErrors,
      loginError: null,
    };
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return { formErrors: null, loginError: loginError.message };
  }
  return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
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
          {actionData && "formErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.formErrors?.email?.join(", ")}
            </p>
          )}
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.formErrors?.password?.join(", ")}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>
          {actionData && "loginError" in actionData && (
            <p className="text-sm text-red-500">{actionData.loginError}</p>
          )}
        </Form>
        {/* <Button
          onClick={() => {
            throw new Error("some error thrown in a button");
          }}
        >
          Make Error
        </Button> */}
        <AuthButtons />
      </div>
    </div>
  );
}
