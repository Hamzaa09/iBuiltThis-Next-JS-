"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { BuildingIcon, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CustomUserButton() {
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="Organization Settings"
        labelIcon={<BuildingIcon className="size-4" />}
        url="organizations"
      >
        <div className="p-4">
          <h2>Manage Organization</h2>

          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl={"/submit"}
            afterSelectOrganizationUrl={"/submit"}
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </UserButton.UserProfilePage>

      <UserButton.UserProfilePage
        label="Admin Panel"
        labelIcon={<UserRoundCog className="size-4" />}
        url="admin"
      >
        <div className="p-4">
          <h2>Admin Panel</h2>
          <Link href="/admin" className="w-full justify-start">
            <Button
              size="default"
              className="w-full justify-start active:translate-y-1 cursor-pointer"
            >
              Go to Admin Panel
            </Button>
          </Link>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
