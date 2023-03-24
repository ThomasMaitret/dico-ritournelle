import "./style.css";

import { boutades } from "./lib/boutades";
import { searchCnrtl } from "./lib/cnrtl";
import { searchLarousse } from "./lib/larousse";
import { searchLittré } from "./lib/littre";
import { searchRobert } from "./lib/robert";
// import { searchAcademie } from "./lib/academie";

const cache = new Map();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="container">
  <h1>Ritournelle dico 📔</h1>
    <form action="" id="searchForm">
      <input autofocus type="search" id="word" placeholder="Entrer un mot..." />
      <button>🔍</button>
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
  definitionDiv.innerHTML = "Loading...";

  const wordInput = document.querySelector("#word") as HTMLInputElement;
  const word = wordInput.value;
  if (!word) return;

  const definition = await getDefinition(word);
  definitionDiv.innerHTML = `${definition}`;

  return;
}

async function getDefinition(word: string) {
  const parsed = encodeURI(word.trim().toLowerCase());
  const cachedValue = cache.get(parsed) as WordResponse;
  if (cachedValue) {
    return cachedValue.definition;
  }

  const response = await searchWord(parsed);
  if (!response || !response.definition) return "Pas de définition trouvée 😞";

  cache.set(parsed, response);

  return response.definition;
}

async function searchWord(word: string): Promise<WordResponse> {
  const response = await Promise.any([
    searchRobert(word),
    searchLittré(word),
    searchLarousse(word),
    searchCnrtl(word),
    // searchAcademie(word),
  ]);

  return {
    boutade: boutades[word],
    definition: response?.definition || "",
    catgram: response?.catgram || "",
    source: response?.source || { name: null, url: "" },
  };
}
