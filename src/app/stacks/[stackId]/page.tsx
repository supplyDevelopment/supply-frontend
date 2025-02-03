"use server";

import { getPageDataBySearchParams } from "@/server";

import type { SearchParams } from "@/server/types";
import type { Metadata } from "next";

interface GenerateMetadataProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { text } = getPageDataBySearchParams(await searchParams);

  return {
    title: text["title"],
  };
}

interface PageProps {
  params: Promise<{ stackId: string }>;
}

export default async function Page({
  params,
}: PageProps): Promise<React.ReactNode> {
  const { stackId } = await params;

  return <div>ТМЦ - один стак {stackId}</div>;
}
