const getDataAsLines = async function () {
  const response = await fetch(
    'https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt'
  );
  const data = await response.text();
  const lines = data.split(/\r?\n/);

  return lines;
};

export async function constructTableOfContents() {
  const sections = await getSections();
  const chapters = await getChapters();

  const sectionObject = {
    name: '',
    chapters: [],
  };

  const sectionObjects = [];

  sections.forEach((s) => {
    const section = Object.create(sectionObject);
    section.name = s;
    section.chapters = chapters.filter(
      (c) => s.charAt(0) === c.number.charAt(0)
    );
    sectionObjects.push(section);
  });

  return sectionObjects;
}

async function getSections() {
  const lines = await getDataAsLines();
  const sections = new Set();

  lines.forEach((line) => {
    if (/^\d{1}\.\s/.test(line) && sections.size < 9) {
      sections.add(line);
    }
  });
  return sections;
}

export async function getChapters() {
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
  return Array.from(chapters);
}

export async function getRulesForChapter(chapterNumber) {
  const rules = await getRules();
  const chapterRules = rules.filter(
    (rule) => rule.number.substring(0, 3) == chapterNumber
  );
  return chapterRules;
}

export async function getChapterByNumber(chapterNumber) {
  const chapters = await getChapters();
  const chapter = chapters.find((c) => c.number == chapterNumber);
  return chapter;
}

async function getRules() {
  const lines = await getDataAsLines();
  const rules = [];
  lines.forEach((line) => {
    if (/^\d{3}\.[a-zA-Z0-9]{1,}/.test(line)) {
      const rule = {};
      rule.number = line.match(/^\d{3}.[a-zA-Z0-9]{1,}\.*/)[0];
      rule.text = line.substring(rule.number.length + 1);
      rules.push(rule);
    }
  });
  return rules;
}
