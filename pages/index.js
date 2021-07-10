import Head from "next/head";
import { useState } from "react";

import { parseRules } from "../utils/ruleParser";
import FilterForm from "../components/filter-form";
import RuleList from "../components/rule-list";
import TableOfContents from "../components/table-of-contents";

export default function Home(props) {
  const rules = JSON.parse(props.rules);

  const [selectedRules, setSelectedRules] = useState([]);
  const selectRules = (rules) => setSelectedRules(rules);
  const [filter, setFilter] = useState("");
  const clearFilter = () => setFilter("");
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const rulesToShow = selectedRules.filter((rule) =>
    rule.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <div>
      <Head>
        <title>Magic: The Gathering Comprehensive Rules</title>
        <meta
          name="description"
          content="Magic: The Gathering Comprehensive Rules"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header>
          <h1>Magic: The Gathering Comprehensive Rules</h1>
          <FilterForm filter={filter} handleFilterChange={handleFilterChange} clearFilter={clearFilter}/>
        </header>
        <div className="flexContainer">
          <TableOfContents rules={rules} selectRules={selectRules} />
          <RuleList rules={rulesToShow} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const rules = await parseRules();
  return {
    props: {
      rules: rules,
    },
  };
}
