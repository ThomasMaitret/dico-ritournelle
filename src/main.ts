import "./style.css";

import { searchCnrtl } from "./lib/cnrtl";
import { searchLarousse } from "./lib/larousse";
import { searchLittré } from "./lib/littre";
import { searchRobert } from "./lib/robert";
import { searchAcademie } from "./lib/academie";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="container">
    <form action="" id="searchForm">
      <input autofocus type="search" id="word" placeholder="Entrer un mot..." />
      <button>Chercher</button>
    </form>

    <p id="definition" style="display: grid;"></p>
  </div>
`;

const searchForm = document.querySelector("#searchForm") as HTMLElement;
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await main();
});

async function main() {
  const definitionDiv = document.querySelector("#definition")!;
  definitionDiv.classList.value = "response";
  definitionDiv.innerHTML = "<span class='loader'></span>";

  const wordInput = document.querySelector("#word") as HTMLInputElement;
  const word = strNoAccent(wordInput.value);
  if (!word) return;

  const definition = await getDefinition(word);
  definitionDiv.innerHTML = definition
    ? `<a href="${definition}" target="_blank" rel="noopener">${definition}</a>
    <span class="loader"></span>`
    : "Pas de définition trouvée";

  if (definition) {
    const sources = await getSources(word);
    definitionDiv.innerHTML = sources
      .map(
        (source) =>
          `<a href="${source}" target="_blank" rel="noopener">${source}</a>`
      )
      .join("\n");
  }

  return;
}

async function getDefinition(word: string) {
  const parsed = encodeURI(word.trim().toLowerCase());

  const response = await searchWord(parsed);
  if (!response || !response.source.url) return;

  return response.source.url;
}

async function searchWord(word: string): Promise<WordResponse> {
  const response = await Promise.race([
    searchCnrtl(word),
    searchRobert(word),
    searchLittré(word),
    searchLarousse(word),
    searchAcademie(word),
  ]);

  return {
    source: response?.source || { name: null, url: "" },
  };
}

async function getSources(word: string): Promise<string[]> {
  const response = await Promise.all([
    searchCnrtl(word),
    searchRobert(word),
    searchLittré(word),
    searchLarousse(word),
    searchAcademie(word),
  ]);

  return response?.map((r) => r?.source.url || "");
}

function strNoAccent(a) {
  return a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
