"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function getUser() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
  });
  if (res.status !== 200) {
    return {
      user: null,
      error: "Unauthorized!",
    };
  }
  const data = await res.json();
  return {
    user: data,
    error: null,
  };
}

const ProtectedLayout = ({ children }: Props) => {
  const [isAuthed, setIsAuthed] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        router.push("/login");
      }
      if (user) {
        setIsAuthed(true);
      }
    })();
  }, []);
  //TODO: do a proper loading screen
  if (!isAuthed) return <p>Loading...</p>;
  if (isAuthed) return <>{children}</>;
};

export default ProtectedLayout;
