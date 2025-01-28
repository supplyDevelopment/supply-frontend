const pageSearchParamObj = {
  language: true,
} as const;

export type PageSearchParam = keyof typeof pageSearchParamObj;
export type ParsedPageSearchParams = Record<PageSearchParam, string | null>;
export type SearchParams = Record<string, string | undefined>;

export const isPageSearchParam = (
  pageSearchParam: string,
): pageSearchParam is PageSearchParam =>
  Object.hasOwn(pageSearchParamObj, pageSearchParam);

export const parsePageSearchParams = (
  searchParams: SearchParams,
): ParsedPageSearchParams => {
  const out: ParsedPageSearchParams = {
    language: null,
  };

  for (const [key, value] of Object.entries(searchParams)) {
    if (!isPageSearchParam(key) || !value) {
      continue;
    }

    out[key] = value;
  }

  return out;
};
