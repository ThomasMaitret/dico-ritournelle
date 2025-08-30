import { loadHtml } from "./loadHtml";

export const searchLittré = async (word: string): Promise<SearchResult> => {
  const prodUrl = `https://www.littre.org/definition/${word}`;
  const url = import.meta.env.PROD ? prodUrl : `/robert/${word}`;
  const $ = await loadHtml(url);

  if (!$) {
    return null;
  }

  const wordExists = $(".definition");
  if (!wordExists) {
    return null;
  }

  $(".num").remove();
  $("cite").remove();
  $("p").remove();

  return {
    source: {
      name: "littré",
      url: prodUrl,
    },
  };
};
