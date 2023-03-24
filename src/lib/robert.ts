import { loadHtml } from "./loadHtml";

export const searchRobert = async (word: string): Promise<SearchResult> => {
  const url = `/robert/${word}`;
  const $ = await loadHtml(url);
  if (!$) return null;

  const wordExists = $("#definitions");
  if (!wordExists) return null;

  $(".d_sound_cont").remove();

  const catgram = $(".d_cat:first").text();
  const definition = $(".d_ptma").html();

  return {
    catgram,
    definition,
    source: {
      name: "robert",
      url: `https://dictionnaire.lerobert.com/definition/${word}`,
    },
  };
};
