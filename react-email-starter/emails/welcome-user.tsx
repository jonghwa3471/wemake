// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import tailwindConfig from "../tailwind.config";

interface WelcomeUserProps {
  username?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeUser = ({ username }: WelcomeUserProps) => (
  <Html>
    <Head />
    <Tailwind config={tailwindConfig}>
      <Body className="font-github bg-white text-[#24292e]">
        <Preview>
          A fine-grained personal access token has been added to your account
        </Preview>
        <Container className="mx-auto my-0 max-w-120 px-0 pt-5 pb-12">
          <Img
            src={`${baseUrl}/static/github.png`}
            width="32"
            height="32"
            alt="Github"
          />

          <Text className="text-[24px] leading-tight">
            Welcome to wemake {username}
          </Text>

          <Section className="rounded-[5px] border border-solid border-[#dedede] p-6 text-center">
            <Text className="mt-0 mb-2.5 text-left">
              Hey <strong>{username}</strong>!
            </Text>
            <Text className="mt-0 mb-2.5 text-left">
              A fine-grained personal access token (<Link>resend</Link>) was
              recently added to your account.
            </Text>

            <Button className="rounded-lg bg-[#28a745] px-6 py-3 text-sm leading-normal text-white">
              View your token
            </Button>
          </Section>
          <Text className="text-center">
            <Link className="text-[12px] text-[#0366d6]">
              Your security audit log
            </Link>{" "}
            ・{" "}
            <Link className="text-[12px] text-[#0366d6]">Contact support</Link>
          </Text>

          <Text className="mt-15 mb-4 text-center text-xs leading-6 text-[#6a737d]">
            GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeUser.PreviewProps = {
  username: "alanturing",
} as WelcomeUserProps;

export default WelcomeUser;
