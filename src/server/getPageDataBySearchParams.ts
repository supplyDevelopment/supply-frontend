import { type LanguageText, getLanguageText, isLanguage } from "./language";
import { type SearchParams, parsePageSearchParams } from "./pageSearchParam";

interface GetPageDataBySearchParamsResult {
  text: LanguageText;
}

export const getPageDataBySearchParams = (
  searchParams: SearchParams,
): GetPageDataBySearchParamsResult => {
  const out: GetPageDataBySearchParamsResult = {
    text: getLanguageText("ru"),
  };

  const { language: potentialLanguage } = parsePageSearchParams(searchParams);

  if (isLanguage(potentialLanguage)) {
    out.text = getLanguageText(potentialLanguage);
  }

  return out;
};
