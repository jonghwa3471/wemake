import type { Route } from "./+types/otp-complete-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Complete OTP | wemake" }];
};

export default function OtpCompletePage() {
  return <div>OTP complete</div>;
}
