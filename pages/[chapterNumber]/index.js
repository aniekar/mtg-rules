import {
  constructTableOfContents,
  getChapters,
  getChapterByNumber,
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
  const chapter = await getChapterByNumber(context.params.chapterNumber);
  const rules = await getRulesForChapter(context.params.chapterNumber);

  return {
    props: {
      tableOfContents: JSON.parse(JSON.stringify(tableOfContents)),
      rules: JSON.parse(JSON.stringify(rules)),
      chapter: JSON.parse(JSON.stringify(chapter)),
    },
  };
}

export async function getStaticPaths() {
  const chapters = await getChapters();

  const paths = chapters.map((chapter) => ({
    params: { chapterNumber: chapter.number },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}
