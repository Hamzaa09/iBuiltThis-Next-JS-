"use cache";
import { ArrowUpRight, StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";
import { getFeaturedProducts } from "@/lib/products/product-get-queries";

export default async function FeaturedProducts() {
  const featuredProduct = await getFeaturedProducts();

  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Products"
            icon={StarIcon}
            description="Top picks from our community this week"
          />

          <Button asChild className="hidden sm:flex" variant={"outline"}>
            <Link href={"/explore"}>
              View All
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid-wrapper">
          {featuredProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
