import { PageHero } from "~/common/components/page-hero";
import type { Route } from "./+types/submit-job-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createJob } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post a Job | wemake" },
    { name: "description", content: "Post a job opening" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().max(40),
  overview: z.string().max(400),
  responsibilities: z.string().max(400),
  qualifications: z.string().max(400),
  benefits: z.string().max(400),
  skills: z.string().max(400),
  companyName: z.string().max(40),
  companyLogoUrl: z.string().max(40),
  companyLocation: z.string().max(40),
  applyUrl: z.string().max(40),
  jobType: z.enum(JOB_TYPES.map((type) => type.value)),
  jobLocation: z.enum(LOCATION_TYPES.map((location) => location.value)),
  salaryRange: z.enum(SALARY_RANGE),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <PageHero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form
        className="mx-auto flex max-w-7xl flex-col items-center gap-10"
        method="POST"
      >
        <div className="grid w-full grid-cols-3 gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            defaultValue="Senior React Developer"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.position?.join(", ")}
            </p>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            defaultValue="We are looking for a Senior React Developer"
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.overview?.join(", ")}
            </p>
          )}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, comma separated)"
            name="responsibilities"
            maxLength={40}
            type="text"
            required
            defaultValue="Implement new features, Maintain code quality, etc."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.responsibilities?.join(", ")}
            </p>
          )}
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 characters max, comma separated)"
            name="qualifications"
            maxLength={40}
            type="text"
            required
            defaultValue="3+ years of experience, Strong TypeScript skills, etc."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.qualifications?.join(", ")}
            </p>
          )}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={40}
            type="text"
            required
            defaultValue="Flexible working hours, Health insurance, etc."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.benefits?.join(", ")}
            </p>
          )}
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, comma separated)"
            name="skills"
            maxLength={40}
            type="text"
            required
            defaultValue="React, TypeScript, etc."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.skills?.join(", ")}
            </p>
          )}
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            defaultValue="wemake"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.companyName?.join(", ")}
            </p>
          )}
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(40 characters max)"
            name="companyLogoUrl"
            type="url"
            required
            defaultValue="https://wemake.services/logo.png"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.companyLogoUrl?.join(", ")}
            </p>
          )}
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            defaultValue="Remote, New York, etc."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.companyLocation?.join(", ")}
            </p>
          )}
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            defaultValue="https://wemake.services/apply"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.applyUrl?.join(", ")}
            </p>
          )}
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            required
            placeholder="Select the type of job"
            options={JOB_TYPES.map((type) => type)}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.jobType?.join(", ")}
            </p>
          )}
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => location)}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.jobLocation?.join(", ")}
            </p>
          )}
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="Select the salary range of the job"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.salaryRange?.join(", ")}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size={"lg"}>
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
