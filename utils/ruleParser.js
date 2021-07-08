const fetchData = async function () {
  const response = await fetch(
    "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  );
  const data = await response.text();

  return data;
};

const constructChaptersWithRules = function (chapters, rules) {
  const chapterObject = {
    section: 0,
    name: "",
    rules: [],
  };

  const chapterObjects = [];
  const ruleArray = Array.from(rules);

  chapters.forEach((c) => {
    const re = new RegExp(`^${c.substring(0, 3)}`);
    const chapterRules = ruleArray.filter((r) => re.test(r));
    const newChapter = Object.create(chapterObject);
    newChapter.section = c.charAt(0);
    newChapter.name = c;
    newChapter.rules = chapterRules;
    chapterObjects.push(newChapter);
  });

  return chapterObjects;
};

function constructSectionsWithChapters(sections, chapterObjects) {
  const sectionObject = {
    name: "",
    chapters: [],
  };
  const sectionObjects = [];

  sections.forEach((s) => {
    const newSection = Object.create(sectionObject);
    newSection.name = s;
    newSection.chapters = chapterObjects.filter(
      (c) => s.charAt(0) === c.section
    );
    sectionObjects.push(newSection);
  });

  return sectionObjects;
}

export async function parseRules() {
  const data = await fetchData();
  const lines = data.split(/\r?\n/);

  const sections = new Set();
  const chapters = new Set();
  const rules = new Set();

  lines.forEach((line) => {
    if (/^\d{1}\.\s/.test(line) && sections.size < 9) {
      sections.add(line);
    } else if (/^\d{3}\.\s/.test(line)) {
      chapters.add(line);
    } else if (/^\d{3}.\S/.test(line)) {
      rules.add(line);
    }
  });

  const chapterObjects = constructChaptersWithRules(chapters, rules);
  const parsedRules = constructSectionsWithChapters(sections, chapterObjects);

  return JSON.stringify(parsedRules);
}
