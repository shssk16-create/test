"use client";
import { ReactFlow, Background, MarkerType } from '@xyflow/react';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'استعلام معقد (Prompt)' }, type: 'input' },
  { id: '2', position: { x: 100, y: 120 }, data: { label: 'تحليل دلالي عربي (NLP)' } },
  { id: '3', position: { x: 400, y: 120 }, data: { label: 'استرجاع البيانات (RAG DB)' } },
  { id: '4', position: { x: 250, y: 240 }, data: { label: 'توليد لغوي فصيح وموجه' }, type: 'output' },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#D4AF37' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#D4AF37' } },
];

export default function AIFlow() {
  return (
    <div className="h-96 w-full border border-neutral-200 bg-white" dir="ltr">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView attributionPosition="bottom-right">
        <Background color="#e5e5e5" gap={20} />
      </ReactFlow>
    </div>
  );
}
