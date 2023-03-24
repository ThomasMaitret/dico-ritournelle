import { loadHtml } from "./loadHtml";

export const searchAcademie = async (word: string): Promise<SearchResult> => {
  const url = `/academie/${word}`;
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
      url: `https://academie.atilf.fr/9/consulter/${word}`,
    },
  };
};
