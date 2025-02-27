"use server";

import { getPageDataBySearchParams } from "@/server";

import { Icon } from "@/client/shared";

import { ClientPage } from "@/client/pages/Registr";

import styles from "./page.module.css";

import type { SearchParams } from "@/server/types";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { text } = getPageDataBySearchParams(await searchParams);

  return {
    title: text["title"],
  };
}

export default async function Page(): Promise<React.ReactNode> {
  return (
    <div className={styles.pos}>
      <Icon.SupplyLogo />
      <p className={styles.description}>
        Система учета ресурсов <br />
        строительных компаний
      </p>
      <ClientPage />
    </div>
  );
}
