export default function LearningRoadmap({ chart }: { chart: string }) {
  const lines = chart.split("\n");
  const title = lines[1]
    .trim()
    .replace(/^root\(\(/, "")
    .replace(/\)\)$/, "");
  const groups: Array<{ title: string; items: string[] }> = [];
  for (const line of lines.slice(2)) {
    if (!line.trim()) continue;
    if (line.startsWith("      ")) groups.at(-1)?.items.push(line.trim());
    else groups.push({ title: line.trim(), items: [] });
  }
  return (
    <div className="learning-roadmap">
      <div className="roadmap-title">
        {title.split("<br/>").map((part, index) => (
          <span key={part}>
            {index > 0 && <br />}
            {part}
          </span>
        ))}
      </div>
      <dl className="roadmap-grid">
        {groups.map((group) => (
          <div className="roadmap-stage" key={group.title}>
            <dt>{group.title}</dt>
            {group.items.map((item) => (
              <dd key={item}>{item}</dd>
            ))}
          </div>
        ))}
      </dl>
    </div>
  );
}
