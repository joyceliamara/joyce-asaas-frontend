"use client";

import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";

export default function QueryClientProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return <Provider client={queryClient}>{children}</Provider>;
}

type Props = {
  children: React.ReactNode;
} & Record<string, unknown>;
