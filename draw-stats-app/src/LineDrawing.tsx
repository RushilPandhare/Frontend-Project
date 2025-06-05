import React, { useState, useRef } from "react";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };
type LineWithId = Line & { id: number };

export default function LineDrawing() {
  const [lines, setLines] = useState<LineWithId[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [selectedLineId, setSelectedLineId] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getSvgPoint = (event: React.MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const point = getSvgPoint(event);
    setCurrentLine({ start: point, end: point });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!currentLine) return;
    const point = getSvgPoint(event);
    setCurrentLine({ start: currentLine.start, end: point });
  };

  const handleMouseUp = () => {
    if (currentLine) {
      const newLine: LineWithId = {
        ...currentLine,
        id: Date.now(),
      };
      setLines([...lines, newLine]);
      setCurrentLine(null);
    }
  };

  const handleCanvasClick = () => {
    setSelectedLineId(null);
  };

  const handleDeleteLine = () => {
    if (selectedLineId !== null) {
      setLines(lines.filter((line) => line.id !== selectedLineId));
      setSelectedLineId(null);
    }
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      const newLines = lines.slice(0, -1);
      setLines(newLines);
      if (selectedLineId === lines[lines.length - 1].id) {
        setSelectedLineId(null);
      }
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
        <button
          onClick={handleDeleteLine}
          disabled={selectedLineId === null}
          style={{
            marginRight: 8,
            padding: "8px 12px",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: selectedLineId !== null ? "pointer" : "not-allowed",
            opacity: selectedLineId !== null ? 1 : 0.5,
          }}
        >
          Delete Line
        </button>
        <button
          onClick={handleUndo}
          disabled={lines.length === 0}
          style={{
            padding: "8px 12px",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: lines.length > 0 ? "pointer" : "not-allowed",
            opacity: lines.length > 0 ? 1 : 0.5,
          }}
        >
          Undo
        </button>
      </div>

      <svg
        ref={svgRef}
        style={{
          border: "1px solid #ccc",
          width: "100%",
          height: "100%",
          cursor: "crosshair",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {lines.map((line) => (
          <line
            key={line.id}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke={line.id === selectedLineId ? "red" : "black"}
            strokeWidth={2}
            onClick={(e) => {
              e.stopPropagation(); // Prevent canvas deselect
              setSelectedLineId(line.id);
            }}
          />
        ))}

        {currentLine && (
          <line
            x1={currentLine.start.x}
            y1={currentLine.start.y}
            x2={currentLine.end.x}
            y2={currentLine.end.y}
            stroke="black"
            strokeWidth={2}
          />
        )}
      </svg>
    </div>
  );
}
