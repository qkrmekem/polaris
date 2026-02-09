"use client"

import { ClerkProvider, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ThemeProvider } from "./them-provider";
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children } : { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Authenticated>
                        <UserButton />
                        {children}
                    </Authenticated>
                    <Unauthenticated>
                        <UnauthenticatedView></UnauthenticatedView>
                    </Unauthenticated>
                    <AuthLoading>
                        Auth Loading...
                    </AuthLoading>
                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}