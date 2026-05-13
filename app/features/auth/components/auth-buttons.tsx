import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";
import { SiKakaotalk, SiGithub } from "react-icons/si";
import { LockIcon } from "lucide-react";
import { Link } from "react-router";

export default function AuthButtons() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center gap-2">
        <Separator className="w-full" />
        <span className="text-muted-foreground text-xs font-medium uppercase">
          Or continue with
        </span>
        <Separator className="w-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button variant={"outline"} className="w-full" asChild>
          <Link to={`/auth/social/kakao/start`}>
            <SiKakaotalk className="size-4" />
            Kakao Talk
          </Link>
        </Button>
        <Button variant={"outline"} className="w-full" asChild>
          <Link to={`/auth/social/github/start`}>
            <SiGithub className="size-4" />
            Github
          </Link>
        </Button>
        <Button variant={"outline"} className="w-full" asChild>
          <Link to={`/auth/otp/start`}>
            <LockIcon className="size-4" />
            OTP
          </Link>
        </Button>
      </div>
    </div>
  );
}
