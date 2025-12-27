"use client"

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type Props = PropsWithChildren;

const queryClient = new QueryClient();

export default function Providers({ children }: Props) {

    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}