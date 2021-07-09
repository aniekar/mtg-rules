export default function RuleList(props) {
  const { rules } = props;

  return (
    <div className="flexChild">
      <ul>
        {rules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </div>
  );
}
