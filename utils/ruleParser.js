const getDataAsLines = async function () {
  const response = await fetch(
    'https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt'
  );
  const data = await response.text();
  const lines = data.split(/\r?\n/);

  return lines;
};

export async function constructTableOfContents() {
  const lines = await getDataAsLines();
  const sections = new Set();
  const chapters = new Set();

  lines.forEach((line) => {
    if (/^\d{1}\.\s/.test(line) && sections.size < 9) {
      sections.add(line);
    } else if (/^\d{3}\.\s/.test(line)) {
      const chapter = {};
      chapter.number = line.match(/^\d{3}/)[0];
      chapter.text = line.substring(chapter.number.length + 1);
      chapters.add(chapter);
    }
  });

  const sectionObject = {
    name: '',
    chapters: [],
  };

  const sectionObjects = [];

  const chapterArray = Array.from(chapters);

  sections.forEach((s) => {
    const newSection = Object.create(sectionObject);
    newSection.name = s;
    newSection.chapters = chapterArray.filter(
      (c) => s.charAt(0) === c.number.charAt(0)
    );
    sectionObjects.push(newSection);
  });

  return JSON.stringify(sectionObjects);
}

export async function parseChapters() {
  const lines = await getDataAsLines();
  const chapters = new Set();
  lines.forEach((line) => {
    if (/^\d{3}\.\s/.test(line)) {
      const chapter = {};
      chapter.number = line.match(/^\d{3}/)[0];
      chapter.text = line.substring(chapter.number.length + 1);
      chapters.add(chapter);
    }
  });
  return JSON.stringify(Array.from(chapters));
}

export async function getRulesForChapter(chapterNumber) {
  const rules = await parseRules();
  const chapterRules = rules.filter(
    (rule) => rule.number.substring(0, 3) == chapterNumber
  );
  return JSON.stringify(chapterRules);
}

export async function parseRules() {
  const lines = await getDataAsLines();
  const rules = [];
  lines.forEach((line) => {
    if (/^\d{3}.\S{2,}/.test(line)) {
      const rule = {};
      rule.number = line.match(/^\d{3}.\S{2,}/)[0];
      rule.text = line.substring(rule.number.length + 1);
      rules.push(rule);
    }
  });
  return rules;
}
