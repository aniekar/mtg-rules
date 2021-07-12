const FilterForm = ({ filter, handleFilterChange, clearFilter }) => {
  return (
    <div>
      <form>
        <input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter"
        ></input>
        <button type="button" onClick={clearFilter}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
