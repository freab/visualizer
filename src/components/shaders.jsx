// shaders.js
export const vertexShader = `
  varying vec3 vNormal;

  void main() {
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  varying vec3 vNormal;

  void main() {
    // Example: Modifying color based on normal direction
    vec3 color = vNormal * 0.5 + 0.5;
    gl_FragColor = vec4(color, 1.0);
  }
`;
