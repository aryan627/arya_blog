declare module 'react-graph-vis' {
  import { Component } from 'react';

  interface GraphProps {
    graph: {
      nodes: Array<{ id: number; label: string; title: string; tags: string[] }>;
      edges: Array<{ from: number; to: number }>;
    };
    options?: object;
    events?: object;
    key?: number;
  }

  export class Graph extends Component<GraphProps> {}
} 