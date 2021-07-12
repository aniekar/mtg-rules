import parse from "html-react-parser";

const Rule = ({ rule, searchTerm }) => {
  const highlightedText = rule.ruleText.replace(
    new RegExp(searchTerm, 'gi'),
    (match) => `<mark>${match}</mark>`
  );
  return (
    <li className="ruleLine">
      <b>{rule.code}</b> {parse(highlightedText)}
    </li>
  );
};

export default function RuleList({ chapter, rules, searchTerm }) {
  return (
    <div className="ruleListDiv">
      <h2>{chapter}</h2>
      <ul>
        {rules.map((rule, i) => (
          <Rule key={i} rule={rule} searchTerm={searchTerm} />
        ))}
      </ul>
    </div>
  );
}
