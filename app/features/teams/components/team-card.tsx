import { Link } from "react-router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface TeamCardProps {
  id: string;
  leaderUsername: string;
  leaderAvatarUrl: string;
  positions: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  leaderUsername,
  leaderAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="hover:bg-card/50 bg-transparent transition-colors">
        <CardHeader className="flex items-center">
          <CardTitle className="text-base">
            <Badge
              variant="secondary"
              className="inline-flex items-center text-base shadow-sm"
            >
              <span>{leaderUsername}</span>
              <Avatar className="size-5">
                <AvatarFallback>N</AvatarFallback>
                <AvatarImage src={leaderAvatarUrl} />
              </Avatar>
            </Badge>
            <span> is looking for </span>
            {positions.map((role) => (
              <Badge key={role} className="text-base">
                {role}
              </Badge>
            ))}
            <span> to build </span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end border-none bg-transparent">
          <Button variant="link">Join team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
