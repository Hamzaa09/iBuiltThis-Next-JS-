"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { downVote, upVote } from "@/lib/products/product-action";
import { useOptimistic, useTransition } from "react";

export default function VotingButtons({
  hasVoted,
  voteCount: initialVoteCount,
  productId,
}: {
  hasVoted?: boolean;
  voteCount: number;
  productId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (initialVoteCount, change: number) => {
      return Math.max(0, initialVoteCount + change);
    }
  );

  const handleUpVote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(1);
      const result = await upVote(productId);
    });
  };

  const handleDownVote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(-1);
      const result = await downVote(productId);
    });
  };
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="flex flex-col gap-1 shrink-0 items-center"
    >
      <Button
        onClick={handleUpVote}
        variant={"ghost"}
        size={"icon-sm"}
        className={cn(
          "h-8 w-8 text-primary",
          hasVoted
            ? "hover:bg-primary/20 bg-primary/10 text-primary"
            : "hover:bg-primary/10 hover:text-primary"
        )}
      >
        <ChevronUp className="size-4" />
      </Button>
      <span className="text-sm font-semibold transition-colors text-foreground">
        {optimisticVoteCount}
      </span>
      <Button
        onClick={handleDownVote}
        variant={"ghost"}
        size={"icon-sm"}
        className={cn(
          "h-8 w-8 text-primary",
          hasVoted
            ? "hover:text-destructive"
            : "opacity-50 hover:cursor-not-allowed"
        )}
      >
        <ChevronDown className="size-4" />
      </Button>
    </div>
  );
}
