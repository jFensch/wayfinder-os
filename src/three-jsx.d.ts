/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      directionalLight: any;
      primitive: any;
      [elem: string]: any;
    }
  }
}
export {};
