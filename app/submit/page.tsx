import SectionHeader from "@/components/common/section-header";
import SubmitForm from "@/components/products/product-submit-form";
import { SparkleIcon } from "lucide-react";

export default function SubmitPage() {
  return (
    <section className="max-w-3xl mx-auto p-4">
      <div className="wrapper py-5 md:py-20">
        <div className="mb-12">
          <SectionHeader
            title="Submit Your Product"
            description="Share your creation with the community. Your submission will be reviewed before going live."
            icon={SparkleIcon}
          />
        </div>

        <div className="mx-auto max-w-2xl">
          <SubmitForm />
        </div>
      </div>
    </section>
  );
}
