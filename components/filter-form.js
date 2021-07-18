const FilterForm = ({ filter, handleFilterChange, clearFilter }) => {
  return (
    <div className="formDiv">
      <form>
        <input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter"
        ></input>
        <button type="button" onClick={clearFilter} className="clearButton">
          Clear
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
