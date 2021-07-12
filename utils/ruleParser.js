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
      chapters.add(line);
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
      (c) => s.charAt(0) === c.charAt(0)
    );
    sectionObjects.push(newSection);
  });

  return JSON.stringify(sectionObjects);
}

export async function parseRules() {
  const lines = await getDataAsLines();
  const rules = [];
  lines.forEach((line) => {
    if (/^\d{3}.\S{2,}/.test(line)) {
      const newRule = {};
      newRule.code = line.match(/^\d{3}.\S{2,}/)[0];
      newRule.ruleText = line.substring(newRule.code.length + 1);
      rules.push(newRule);
    }
  });
  return JSON.stringify(rules);
}
