"use server";

import { getPageDataBySearchParams } from "@/server";

import type { SearchParams } from "@/server/types";
import type { Metadata } from "next";

interface AuthProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  searchParams,
}: AuthProps): Promise<Metadata> {
  const { text } = getPageDataBySearchParams(await searchParams);

  return {
    title: text["title"],
  };
}

export default async function Home({
  searchParams,
}: AuthProps): Promise<React.ReactNode> {
  const { text } = getPageDataBySearchParams(await searchParams);
  // const user = getUserOrRedirect(await headers());

  return <div>{text["title"]}</div>;
}
