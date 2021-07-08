import Head from "next/head";

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
  const response = await fetch(
    "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  );
  const data = await response.text();
  return {
    props: {
      rules: data,
    },
  };
}
