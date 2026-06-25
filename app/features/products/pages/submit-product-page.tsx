import { Form, redirect, useNavigation, type MetaFunction } from "react-router";
import { PageHero } from "~/common/components/page-hero";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import React, { useState } from "react";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-product-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { getCategories } from "../queries";
import { createProduct } from "../mutations";
import { LoaderCircle } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return {
    categories,
  };
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  howItWorks: z.string().min(1),
  category: z.coerce.number(),
  icon: z.instanceof(File).refine((file) => {
    return file.size <= 2097152 && file.type.startsWith("image/");
  }),
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
  const { icon, ...rest } = data;
  const { data: uploadData, error: uploadError } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });
  if (uploadError) {
    return {
      fieldErrors: { icon: ["Failed to upload icon"] },
    };
  }
  const {
    data: { publicUrl },
  } = client.storage.from("icons").getPublicUrl(uploadData.path);
  const productId = await createProduct(client, {
    name: rest.name,
    tagline: rest.tagline,
    description: rest.description,
    howItWorks: rest.howItWorks,
    url: rest.url,
    iconUrl: publicUrl,
    categoryId: rest.category,
    userId,
  });
  return redirect(`/products/${productId}`);
};

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files?.[0];
      setIcon(URL.createObjectURL(file));
    }
  };
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div>
      <PageHero
        title="Submit Your Product"
        subtitle="Share your product with the world"
      />
      <Form
        className="mx-auto grid max-w-5xl grid-cols-2 gap-10"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            type="text"
            required
            placeholder="Name of your product"
          />
          {actionData?.fieldErrors?.name && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.name.join(", ")}
            </p>
          )}
          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise description of your product"
          />
          {actionData?.fieldErrors?.tagline && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.tagline.join(", ")}
            </p>
          )}
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          {actionData?.fieldErrors?.url && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.url.join(", ")}
            </p>
          )}
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your product"
          />
          {actionData?.fieldErrors?.description && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.description.join(", ")}
            </p>
          )}
          <InputPair
            textArea
            label="How it works"
            description="A detailed description of how your product works"
            id="howItWorks"
            name="howItWorks"
            required
            type="text"
            placeholder="A detailed description of how your product works"
          />
          {actionData?.fieldErrors?.howItWorks && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.howItWorks.join(", ")}
            </p>
          )}
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          {actionData?.fieldErrors?.category && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.category.join(", ")}
            </p>
          )}
          <Button className="w-full" disabled={isSubmitting} size={"lg"}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex size-40 items-center justify-center overflow-hidden rounded-xl shadow-xl">
            {icon ? (
              <img
                src={icon}
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
                className="text-muted-foreground size-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            )}
          </div>
          <Label className="flex flex-col items-start gap-1">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your product.
            </small>
          </Label>
          <Input
            type="file"
            className="w-1/2 cursor-pointer"
            onChange={onChange}
            required
            name="icon"
            accept="image/*"
          />
          {actionData?.fieldErrors?.icon && (
            <p className="text-sm text-red-500">
              {actionData?.fieldErrors?.icon.join(", ")}
            </p>
          )}
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">
              Recommended size: 128x128px
            </span>
            <span className="text-muted-foreground">
              Allowed formats: PNG, JPEG
            </span>
            <span className="text-muted-foreground">Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
