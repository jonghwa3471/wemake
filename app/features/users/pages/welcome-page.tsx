import { Resend } from "resend";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async () => {
  const { data, error } = await client.emails.send({
    from: "Nico <nico@mail.jonghwa.uk>",
    to: ["whdghk3471@naver.com"],
    subject: "Welcome to wemake",
    html: "<h1>Welcome to wemake</h1>",
  });
  return Response.json({
    data,
    error,
  });
};
