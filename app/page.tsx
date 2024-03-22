"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  const router = useRouter()
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [session,router]);
  return null;
};

export default App;
