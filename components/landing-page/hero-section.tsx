import Link from "next/link";
import StatsCard from "./stats-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ArrowRightIcon,
  EyeIcon,
  RocketIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

const LiveBadge = () => (
  <Badge
    variant={"outline"}
    className="px-4 py-2 mb-8 text-sm backdrop-blur-sm"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping h-full w-full bg-primary opacity-75 rounded-full inline-flex absolute"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
    </span>

    <span>Join thousands of creators sharing their work</span>
  </Badge>
);

const statsData = [
  {
    icon: RocketIcon,
    value: "2.5K+",
    label: "Projects Shared",
  },
  {
    icon: UsersIcon,
    value: "10K+",
    label: "Active Creators",
    hasBorder: true,
  },
  {
    icon: EyeIcon,
    value: "50K+",
    label: "Monthly Visitore",
  },
];

export default function HeroSection() {
  return (
    <section className="realtive overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
          <LiveBadge />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-6xl">
            Share What You've Built, Discover What's Launching
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-10 text-muted-foreground leading-relaxed">
            A community platform for creators to showcase their apps, AI tools,
            SaaS products, and creative projects. Authentic launches, real
            builders, genuine feedback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild className="text-base shadow-lg px-8" size="lg">
              <Link href="/submit">
                <SparklesIcon className="size-5" />
                Share Your Project
              </Link>
            </Button>

            <Button
              asChild
              className="text-base shadow-lg px-8"
              variant="secondary"
              size="lg"
            >
              <Link href="/explore">
                Explore Projects
                <ArrowRightIcon className="size-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
