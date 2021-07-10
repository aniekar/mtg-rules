export default function RuleList({ chapter, rules }) {
  return (
    <div className="ruleListDiv">
      <h2>{chapter}</h2>
      <ul>
        {rules.map((rule, i) => (
          <li key={i} className="ruleLine">
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}