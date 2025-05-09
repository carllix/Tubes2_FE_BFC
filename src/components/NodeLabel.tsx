interface NodeDatum {
  name: string;
  children?: NodeDatum[];
}

interface CustomNodeProps {
  nodeDatum: NodeDatum;
}

export default function NodeLabel({ nodeDatum }: CustomNodeProps) {
  if (!nodeDatum || !nodeDatum.name) return null;

  return (
    <foreignObject width={120} height={40} x={-60} y={-20}>
      <div
        // xmlns="http://www.w3.org/1999/xhtml"
        style={{
          padding: "6px 10px",
          backgroundColor: "#f9f5ff",
          border: "2px solid #ffffff",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 600,
          color: "#3f0e6e",
          textAlign: "center",
        }}
      >
        {nodeDatum.name}
      </div>
    </foreignObject>
  );
}
