import Head from "next/head";
import { parseRules } from "../utils/ruleParser";

export default function Home(props) {
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
        <div>{props.rules}</div>
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
