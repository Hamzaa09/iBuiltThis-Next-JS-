"use client";
import {
  CompassIcon,
  HomeIcon,
  LoaderIcon,
  SparkleIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Suspense, useState } from "react";
import CustomUserButton from "./custom-user-button";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="bg-primary size-8 rounded-lg flex items-center justify-center">
        <SparkleIcon className="size-4 text-primary-foreground" />
      </div>

      <span className="font-bold text-xl">
        i<span className="text-primary">Built</span>This
      </span>
    </Link>
  );
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 left-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-10">
      <div className="wrapper px-6 md:px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <HomeIcon className="size-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/explore"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <CompassIcon className="size-4" />
              <span>Explore</span>
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Suspense
              fallback={
                <div>
                  <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
                </div>
              }
            >
              <SignedOut>
                <SignInButton>
                  <Button variant={"ghost"}>Sign In</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button asChild>
                  <Link href="/submit">
                    <SparkleIcon className="size-4" />
                    Submit Project
                  </Link>
                </Button>
                <CustomUserButton />
              </SignedIn>
            </Suspense>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile slider nav */}
        {menuOpen && (
          <nav
            className={`flex flex-col md:hidden gap-2 mt-2 overflow-x-auto scrollbar-none pb-5 transition-all ease-in-out duration-200 overflow-hidden`}
          >
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <HomeIcon className="size-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/explore"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <CompassIcon className="size-4" />
              <span>Explore</span>
            </Link>

            <Suspense
              fallback={
                <div>
                  <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
                </div>
              }
            >
              <SignedOut>
                <div className="flex justify-between w-full">
                  <SignInButton>
                    <Button className="w-[48%]" variant={"ghost"}>
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-[48%]">Sign Up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex justify-between gap-2 w-full">
                  <Button asChild size={"lg"} className="flex-2">
                    <Link href="/submit">
                      <SparkleIcon className="size-4" />
                      Submit Project
                    </Link>
                  </Button>
                  <CustomUserButton />
                </div>
              </SignedIn>
            </Suspense>
          </nav>
        )}
      </div>
    </header>
  );
}
