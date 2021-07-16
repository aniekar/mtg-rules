import Head from 'next/head'

function Layout(props) {
  return (
    <div>
      <Head>
        <title>Magic: The Gathering Comprehensive Rules</title>
        <meta
          name="description"
          content="Magic: The Gathering Comprehensive Rules"
        />
      </Head>
      <header>
        <h1>Magic: The Gathering Comprehensive Rules</h1>
        {/* <FilterForm
          filter={filter}
          handleFilterChange={handleFilterChange}
          clearFilter={clearFilter}
        /> */}
      </header>
      <main>
        <div className="flexContainer">{props.children}</div>
      </main>
    </div>
  );
}

export default Layout;
