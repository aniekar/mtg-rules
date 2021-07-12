import Head from "next/head";
import { useState } from "react";

import { constructTableOfContents, parseRules } from "../utils/ruleParser";
import FilterForm from "../components/filter-form";
import RuleList from "../components/rule-list";
import TableOfContents from "../components/table-of-contents";

export default function Home(props) {
  const contents = JSON.parse(props.tableOfContents);
  const rules = JSON.parse(props.rules);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedRules, setSelectedRules] = useState([]);
  const selectChapter = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedRules(
      rules.filter((r) => r.code.substring(0, 3) == chapter.substring(0, 3))
    );
  };
  const [filter, setFilter] = useState("");
  const clearFilter = () => setFilter("");
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const rulesToShow = selectedRules.filter((rule) =>
    rule.ruleText.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <div>
      <Head>
        <title>Magic: The Gathering Comprehensive Rules</title>
        <meta
          name="description"
          content="Magic: The Gathering Comprehensive Rules"
        />
      </Head>

      <main>
        <header>
          <h1>Magic: The Gathering Comprehensive Rules</h1>
          <FilterForm
            filter={filter}
            handleFilterChange={handleFilterChange}
            clearFilter={clearFilter}
          />
        </header>
        <div className="flexContainer">
          <TableOfContents contents={contents} selectChapter={selectChapter} />
          <RuleList chapter={selectedChapter} rules={rulesToShow} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const tableOfContents = await constructTableOfContents();
  const rules = await parseRules();
  return {
    props: {
      tableOfContents: tableOfContents,
      rules: rules,
    },
  };
}
