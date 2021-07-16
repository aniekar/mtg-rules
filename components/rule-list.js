import parse from 'html-react-parser';
import { useState } from 'react';

import FilterForm from '../components/filter-form';

const Rule = ({ rule, searchTerm }) => {
  const highlightedText = rule.text.replace(
    new RegExp(searchTerm, 'gi'),
    (match) => `<mark>${match}</mark>`
  );
  return (
    <li className="ruleLine">
      <b>{rule.number}</b> {parse(highlightedText)}
    </li>
  );
};

export default function RuleList({ rules }) {
  const [filter, setFilter] = useState('');
  const clearFilter = () => setFilter('');
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const rulesToShow = rules.filter((rule) =>
    rule.text.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <div className="ruleListDiv">
      <FilterForm filter={filter} clearFilter={clearFilter} handleFilterChange={handleFilterChange}/>
      {/* <h2>{chapter}.</h2> */}
      {rules && (
        <ul>
          {rulesToShow.map((rule, i) => (
            <Rule key={i} rule={rule} searchTerm={filter} />
          ))}
        </ul>
      )}
    </div>
  );
}
