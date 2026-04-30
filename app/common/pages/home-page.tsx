import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | wemake" },
    { name: "description" },
    { content: "Welcome to wemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="space-y-40 px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Today's Products
          </h2>
          <p className="text-foreground text-xl font-light">
            The best products made by our community today
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-foreground text-xl font-light">
            The latest discussions from our community.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => (
          <PostCard
            key={`postId-${index}`}
            id={`postId-${index}`}
            title="What is the best productivity tool?"
            author="Nico"
            authorAvatarUrl="https://github.com/apple.png"
            category="Productivity"
            postedAt="12 hours ago"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-foreground text-xl font-light">
            Find ideas for your next project.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewsCount={123}
            postedAt="12 hours ago"
            likesCount={12}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-foreground text-xl font-light">
            Find your dream job.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => (
          <JobCard
            key={`jobId-${index}`}
            id={`jobId-${index}`}
            company="Meta"
            companyLogoUrl="https://github.com/facebook.png"
            postedAt="12 hours ago"
            title="Software Engineer"
            type="Full-time"
            positionLocation="Remote"
            salary="$100,000 - $120,000"
            companyHq="San Francisco, CA"
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Find a team mate
          </h2>
          <p className="text-foreground text-xl font-light">
            Join a team looking for a new member.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/teams">Explore all teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            id={`teamId-${index}`}
            leaderUsername="@j2yonghwa"
            leaderAvatarUrl="https://github.com/jonghwa3471.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Product Manager",
            ]}
            projectDescription="a new social media platform."
          />
        ))}
      </div>
    </div>
  );
}
