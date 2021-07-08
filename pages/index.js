import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { parseRules } from "../utils/ruleParser";

export default function Home(props) {
  const rules = JSON.parse(props.rules);

  const [selectedRules, setSelectedRules] = useState();
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
        <div>
          <p>Table of Contents</p>
          <ul>
            {rules.map((section, i) => (
              <li key={i}>
                {section.name}
                <ul>
                  {section.chapters.map((chapter, i) => (
                    <li key={i}>
                      <Link href="#" scroll={false}>
                        <button onClick={() => selectRules(chapter.rules)}>
                          {chapter.name}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>{selectedRules}</div>
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
