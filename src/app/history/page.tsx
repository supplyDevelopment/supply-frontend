"use server";

import { getPageDataBySearchParams } from "@/server";

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
  return <div>ТМЦ - история</div>;
}
