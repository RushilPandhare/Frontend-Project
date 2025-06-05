import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import type { Connection, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';

export default function GraphCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/graph')
      .then((res) => res.json())
      .then(({ nodes, edges }) => {
        setNodes(
          nodes.map((node: any) => ({
            id: node._id,
            position: { x: node.x, y: node.y },
            data: { label: node.label },
          }))
        );
        setEdges(
          edges.map((edge: any) => ({
            id: edge._id,
            source: edge.source,
            target: edge.target,
          }))
        );
      })
      .catch(console.error);
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={{ width: '100vw', height: '100vh' }}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}
