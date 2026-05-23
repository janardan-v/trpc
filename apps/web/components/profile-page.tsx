"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Avatar,
  AvatarFallback,
} from "./ui/avatar";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

import {
  useLogout,
  useUser,
  useUserUpdate,
} from "../hooks/api/auth";

import { useEffect, useState } from "react"
export function ProfilePage() {
  const { user, isLoading } = useUser();

  const {
    updateUserAsync,
    status: updateStatus,
  } = useUserUpdate();

  const {
    logoutAsync,
    status: logoutStatus,
  } = useLogout();

  const [fullname, setFullname] =
    useState("");

  const [email, setEmail] =
    useState("");

  useEffect(() => {
    if (!user) return;

    setFullname(user.fullname);
    setEmail(user.email);
  }, [user]);

  async function saveProfile() {
    await updateUserAsync({
      fullname,
      email,
    });
  }

  async function logout() {
    await logoutAsync();
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-muted-foreground">
          Manage account settings
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        className="space-y-6"
      >

        <TabsList>

          <TabsTrigger value="profile">
            Profile
          </TabsTrigger>

          <TabsTrigger value="account">
            Account
          </TabsTrigger>

        </TabsList>

        <TabsContent value="profile">

          <Card>

            <CardHeader>

              <div className="flex items-center gap-4">

                <Avatar className="h-16 w-16">

                  <AvatarFallback>

                    {fullname
                      ?.split(" ")
                      .map(
                        (word) => word[0]
                      )
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}

                  </AvatarFallback>

                </Avatar>

                <div>

                  <CardTitle>
                    Profile Information
                  </CardTitle>

                  <CardDescription>
                    Update your details
                  </CardDescription>

                </div>

              </div>

            </CardHeader>

            <Separator />

            <CardContent className="space-y-6 pt-6">

              <div>

                <Label>
                  Full Name
                </Label>

                <Input
                  value={fullname}
                  onChange={(e) =>
                    setFullname(
                      e.target.value
                    )
                  }
                />

              </div>

              <div>

                <Label>
                  Email
                </Label>

                <Input
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

              </div>

              <Button
                onClick={saveProfile}
                disabled={
                  updateStatus ===
                  "pending"
                }
              >
                Save Changes
              </Button>

            </CardContent>

          </Card>

        </TabsContent>

        <TabsContent value="account">

          <Card>

            <CardHeader>

              <CardTitle>
                Account Actions
              </CardTitle>

              <CardDescription>
                Manage session
              </CardDescription>

            </CardHeader>

            <Separator />

            <CardContent>

              <Button
                variant="destructive"
                onClick={logout}
                disabled={
                  logoutStatus ===
                  "pending"
                }
              >
                Logout
              </Button>

            </CardContent>

          </Card>

        </TabsContent>

      </Tabs>

    </div>
  );
}

export default ProfilePage;