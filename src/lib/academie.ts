import { loadHtml } from "./loadHtml";

export const searchAcademie = async (word: string): Promise<SearchResult> => {
  const prodUrl = `https://academie.atilf.fr/9/consulter/${word}`;
  const url = import.meta.env.PROD ? prodUrl : `/robert/${word}`;
  const $ = await loadHtml(url);

  if (!$) {
    return null;
  }

  const wordExists = $(".contenu-site");
  if (!wordExists) {
    return null;
  }

  return {
    catgram: "",
    definition: "",
    source: {
      name: "academie",
      url: prodUrl,
    },
  };
};
