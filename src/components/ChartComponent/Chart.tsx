import "./Chart.scss";

type FlexDirection =
  | "column"
  | "inherit"
  | "-moz-initial"
  | "initial"
  | "revert"
  | "unset"
  | "column-reverse"
  | "row"
  | "row-reverse";

function Chart({
  title,
  percentage,
  total,
  direction,
}: {
  title: string;
  percentage: number;
  total: string;
  direction: FlexDirection;
}) {
  return (
    <div className="single-chart" style={{ flexDirection: `${direction}` }}>
      <svg viewBox="0 0 36 36" className="single-chart__chart">
        <path
          className="single-chart__circle-bg"
          d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="single-chart__circle"
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
    a 15.9155 15.9155 0 0 0 0 31.831
    a 15.9155 15.9155 0 0 0 0 -31.831"
        />
        <text x="18" y="20.35" className="single-chart__percentage">
          {total}
        </text>
      </svg>
      <p>{title}</p>
    </div>
  );
}

export default Chart;
