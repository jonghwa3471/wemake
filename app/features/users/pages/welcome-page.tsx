import { Resend } from "resend";
import { render } from "@react-email/components";
import type { Route } from "./+types/welcome-page";
import WelcomeUser from "../../../../react-email-starter/emails/welcome-user";

const client = new Resend(process.env.RESEND_API_KEY);

// resend를 사용하지 않고 다른 email service를 사용할 경우

/* export const loader = async ({ params }: Route.LoaderArgs) => {
  const emailHtml = await render(<WelcomeUser username={params.username} />); 
  const { data, error } = await client.emails.send({
    from: "Somename <somename@mail.your.domain>",
    to: ["blabla@naver.com"],
    subject: "Welcome to wemake",
    html: emailHtml,
  });
  return Response.json({
    data,
    error,
    emailHtml,
  });
}; */

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { data, error } = await client.emails.send({
    from: "Somename <somename@mail.your.domain>",
    to: ["blabla@naver.com"],
    subject: "Welcome to wemake",
    react: <WelcomeUser username={params.username} />,
  });
  return Response.json({
    data,
    error,
  });
};
