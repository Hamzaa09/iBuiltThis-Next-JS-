import { CalendarIcon, RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-get-queries";

export default async function RecentlyLaunchedProducts() {
  const recentlyLaunchedProduct = await getRecentlyLaunchedProducts();

  return (
    <div className="py-10 lg:py-20">
      <div className="wrapper space-y-12">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Discover the latest products from our community"
        />

        {recentlyLaunchedProduct.length > 0 ? (
          <div className="grid-wrapper">
            {recentlyLaunchedProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No recently launched product this week. Check back soon for new launches."
            icon={CalendarIcon}
          />
        )}
      </div>
    </div>
  );
}
