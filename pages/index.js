import { constructTableOfContents } from '../utils/ruleParser';
import RuleList from '../components/rule-list';
import TableOfContents from '../components/table-of-contents';

export default function Home({ tableOfContents }) {
  return (
    <>
      <TableOfContents contents={tableOfContents} />
      <RuleList />
    </>
  );
}

export async function getStaticProps() {
  const tableOfContents = await constructTableOfContents();

  return {
    props: {
      tableOfContents: JSON.parse(JSON.stringify(tableOfContents)),
    },
  };
}
