"use client";

import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types";
import { ClockIcon, SearchIcon, TrendingUpIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function ProductExplorer({
  products,
}: {
  products: ProductType[];
}) {
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "recent">(
    "trending"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const filtered = [...products];
    if (searchQuery.length > 0) {
      return filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "trending":
        return filtered.sort((a, b) => b.voteCount - a.voteCount);

      case "newest":
        return filtered.sort(
          (a, b) =>
            new Date(a.createdAt || "").getDate() -
            new Date(b.createdAt || "").getDate()
        );

      case "recent":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );

      default:
        return filtered;
    }
  }, [products, searchQuery, sortBy]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={sortBy === "trending" ? "default" : "outline"}
            onClick={() => setSortBy("trending")}
          >
            <TrendingUpIcon className="size-4" />
            Trending
          </Button>
          <Button
            variant={sortBy === "recent" ? "default" : "outline"}
            onClick={() => setSortBy("recent")}
          >
            <ClockIcon className="size-4" />
            Recent
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} products
        </p>
      </div>

      <div className="grid-wrapper">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
