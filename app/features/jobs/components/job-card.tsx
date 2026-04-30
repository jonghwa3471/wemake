import { Link } from "react-router";

import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface JobCardProps {
  id: string;
  company: string;
  companyLogoUrl: string;
  postedAt: string;
  title: string;
  type: string;
  salary: string;
  positionLocation: string;
  companyHq: string;
}

export function JobCard({
  id,
  company,
  companyLogoUrl,
  postedAt,
  title,
  type,
  salary,
  positionLocation,
  companyHq,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="hover:bg-card/50 bg-transparent transition-colors">
        <CardHeader>
          <div className="mb-4 flex items-center gap-4">
            <img src={companyLogoUrl} className="size-10 rounded-full" />
            <div className="space-x-2">
              <span className="text-accent-foreground">{company}</span>
              <span className="text-muted-foreground text-xs">{postedAt}</span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{type}</Badge>
          <Badge variant="outline">{positionLocation}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between border-none bg-transparent">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium">
              {salary}
            </span>
            <span className="text-muted-foreground text-sm font-medium">
              {companyHq}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
