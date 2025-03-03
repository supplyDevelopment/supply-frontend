"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { profileSubscribePostPayment } from "./api/profileSubscribePostPayment";

export default function Page(): React.ReactNode {
  const router = useRouter();

  useEffect(() => {
    void profileSubscribePostPayment().then(({ error }) => {
      if (error) {
        router.push("/registr");
        return;
      }

      router.push("/subscription");
    });
  }, [router]);

  return <></>;
}
