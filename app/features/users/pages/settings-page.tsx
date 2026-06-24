import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import z from "zod";
import { updateUser } from "../mutations";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

const formSchema = z.object({
  name: z.string().min(3),
  role: z.string(),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  }
  const { name, role, headline, bio } = data;
  await updateUser(client, {
    id: userId,
    name,
    role: role as
      | "developer"
      | "designer"
      | "marketer"
      | "founder"
      | "product-manager",
    headline,
    bio,
  });
  return {
    ok: true,
  };
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files?.[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your profile has been updated.
              </AlertDescription>
            </Alert>
          ) : null}
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex w-1/2 flex-col gap-5" method="POST">
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              name="name"
              placeholder="John Doe"
              defaultValue={loaderData.user.name}
            />
            {actionData?.fieldErrors?.name && (
              <p className="text-sm text-red-500">
                {actionData.fieldErrors.name.join(", ")}
              </p>
            )}
            <SelectPair
              label="Role"
              description="What role do you do identify the most with"
              name="role"
              placeholder="Select a role"
              defaultValue={loaderData.user.role}
              options={[
                {
                  label: "Developer",
                  value: "developer",
                },
                {
                  label: "Designer",
                  value: "designer",
                },
                {
                  label: "Product Manager",
                  value: "product-manager",
                },
                {
                  label: "Founder",
                  value: "founder",
                },
                {
                  label: "Marketer",
                  value: "marketer",
                },
              ]}
            />
            {actionData?.fieldErrors?.role && (
              <p className="text-sm text-red-500">
                {actionData.fieldErrors.role.join(", ")}
              </p>
            )}
            <InputPair
              label="Headline"
              description="An introduction to your profile."
              required
              id="headline"
              name="headline"
              placeholder="John Doe"
              defaultValue={loaderData.user.headline ?? ""}
              textArea
            />
            {actionData?.fieldErrors?.headline && (
              <p className="text-sm text-red-500">
                {actionData?.fieldErrors?.headline.join(", ")}
              </p>
            )}
            <InputPair
              label="Bio"
              description="Your public bio. It will be displayed on your profile page."
              required
              id="bio"
              name="bio"
              placeholder="John Doe"
              defaultValue={loaderData.user.bio ?? ""}
              textArea
            />
            {actionData?.fieldErrors?.bio && (
              <p className="text-sm text-red-500">
                {actionData?.fieldErrors?.bio.join(", ")}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Update profile"
              )}
            </Button>
          </Form>
        </div>
        <aside className="col-span-2 rounded-lg border p-6 shadow-md">
          <Label className="flex flex-col items-start gap-1">
            Avatar
            <small className="text-muted-foreground">
              This is your public avatar.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="flex size-40 items-center justify-center overflow-hidden rounded-full shadow-xl">
              {avatar ? (
                <img
                  src={avatar}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <svg
                  data-slot="icon"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-muted-foreground size-15"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              )}
            </div>
            <Input
              type="file"
              className="w-1/2 cursor-pointer"
              onChange={onChange}
              required
              name="icon"
              accept="image/*"
            />
            <div className="flex flex-col text-xs">
              <span className="text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className="text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className="text-muted-foreground">Max file size: 1MB</span>
            </div>
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Update avatar"
              )}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
