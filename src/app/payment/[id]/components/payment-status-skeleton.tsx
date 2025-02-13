"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentStatusSkeleton() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <Skeleton className="w-20 h-20 rounded-full" />
      <div className="max-w-sm text-center">
        <Skeleton className="h-4 w-64 mx-auto" />
        <Skeleton className="h-9 w-full mt-4" />
      </div>
    </div>
  );
}
