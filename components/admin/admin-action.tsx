"use client";
import { ProductType } from "@/types";
import { Button } from "../ui/button";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { approveProduct, rejectProduct } from "@/lib/admin/admin-actions";

export default function AdminActions({
  status,
  productId,
}: {
  status: String;
  productId: ProductType["id"];
}) {
  const handleApprove = async () => {
    await approveProduct(productId);
  };

  const handleReject = async () => {
    await rejectProduct(productId);
  };

  return (
    <div className="space-y-2">
      {status === "pending" && (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="hover:cursor-pointer"
            onClick={handleApprove}
          >
            <CheckCircleIcon className="size-4" />
            Approve
          </Button>
          <Button
            variant="destructive"
            className="hover:cursor-pointer"
            onClick={handleReject}
          >
            <XCircleIcon className="size-4" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
