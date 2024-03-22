"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session)
  return <div>
    Dashboard Page
    <button onClick={() => signOut({ callbackUrl: '/login' })}>SignOut</button>
  </div>;
};

export default DashboardPage;
