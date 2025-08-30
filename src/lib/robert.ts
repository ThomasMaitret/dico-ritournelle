import { loadHtml } from "./loadHtml";

export const searchRobert = async (word: string): Promise<SearchResult> => {
  const prodUrl = `https://dictionnaire.lerobert.com/definition/${word}`;
  const url = import.meta.env.PROD ? prodUrl : `/robert/${word}`;
  const $ = await loadHtml(url);
  if (!$) return null;

  const wordExists = $("#definitions");
  if (!wordExists) return null;

  $(".d_sound_cont").remove();

  return {
    source: {
      name: "robert",
      url: prodUrl,
    },
  };
};
