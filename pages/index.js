import Head from "next/head";
import { useState } from "react";

import { parseRules } from "../utils/ruleParser";
import RuleList from "../components/rule-list";
import TableOfContents from "../components/table-of-contents"

export default function Home(props) {
  const rules = JSON.parse(props.rules);

  const [selectedRules, setSelectedRules] = useState([]);
  const selectRules = (rules) => setSelectedRules(rules);

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
        <h1>Magic: The Gathering Comprehensive Rules</h1>
        <div className="flexContainer">
          <TableOfContents rules={rules} selectRules={selectRules}/>
            <RuleList rules={selectedRules} />
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
