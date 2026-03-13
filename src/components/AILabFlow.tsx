"use client";
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'استعلام المستخدم (User Prompt)' }, type: 'input' },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'تحليل صرفي للغة العربية (NLP)' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: 'بحث في قاعدة البيانات (Vector DB)' } },
  { id: '4', position: { x: 250, y: 200 }, data: { label: 'توليد الاستجابة (LLM Generation)' }, type: 'output' },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#a3a3a3' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#a3a3a3' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#a3a3a3' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#a3a3a3' } },
];

export default function AILabFlow() {
  return (
    <div className="h-80 w-full border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/50" dir="ltr">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView attributionPosition="bottom-right">
        <Background color="#262626" gap={16} />
        <Controls className="fill-neutral-400" />
      </ReactFlow>
    </div>
  );
}
