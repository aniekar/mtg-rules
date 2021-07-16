import {
  constructTableOfContents,
  parseChapters,
  getRulesForChapter,
} from '../../utils/ruleParser';
import RuleList from '../../components/rule-list';
import TableOfContents from '../../components/table-of-contents';

export default function ChapterPage({ chapter, rules, tableOfContents }) {
  return (
    <>
      <TableOfContents contents={tableOfContents} />
      <RuleList chapter={chapter} rules={rules} />
    </>
  );
}

export async function getStaticProps(context) {
  const tableOfContents = await constructTableOfContents();
  const parsedToC = JSON.parse(tableOfContents);

  const chapterNumber = context.params.chapterNumber;

  const rules = await getRulesForChapter(chapterNumber);
  const parsedRules = JSON.parse(rules);
  return {
    props: {
      tableOfContents: parsedToC,
      rules: parsedRules,
      chapter: chapterNumber,
    },
  };
}

export async function getStaticPaths() {
  const chapters = await parseChapters();
  const chapterObjects = JSON.parse(chapters);

  const paths = chapterObjects.map((chapter) => ({
    params: { chapterNumber: chapter.number },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
}
