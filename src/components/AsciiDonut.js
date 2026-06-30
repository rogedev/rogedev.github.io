import React, { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";

const DonutLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: inherit;
    border-color: transparent;
  }
`;

// A spinning ASCII "donut" port of Andy Sloane's donut-math (https://www.a1k0n.net/2011/07/20/donut-math.html).

const LUMINANCE = ".,-~:;=!*#$@";
const COLS = 60;
const ROWS = 30;

// Torus + projection constants.
const R1 = 1; // tube radius
const R2 = 2; // center-to-tube radius
const K2 = 5; // viewer distance
// Scale so the projected donut fills the grid. Derived from K2 and the torus
// extent, matching a1k0n's K1 formula adapted to our column count.
const K1 = (COLS * K2 * 3) / (8 * (R1 + R2));

const AsciiDonut = ({ height = 320 }) => {
  const preRef = useRef(null);
  const theme = useTheme();
  const color = (theme && theme.text) || "#000000";
  const background =
    (theme && (theme.knotClear || theme.background)) || "#ffffff";

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return undefined;

    let A = 0;
    let B = 0;
    let frameId;

    const render = () => {
      const cosA = Math.cos(A);
      const sinA = Math.sin(A);
      const cosB = Math.cos(B);
      const sinB = Math.sin(B);

      const output = new Array(COLS * ROWS).fill(" ");
      const zbuffer = new Array(COLS * ROWS).fill(0);

      for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
          const cosPhi = Math.cos(phi);
          const sinPhi = Math.sin(phi);

          // Point on the tube circle, then offset to form the torus.
          const circleX = R2 + R1 * cosTheta;
          const circleY = R1 * sinTheta;

          // 3D position after rotating by A (x-axis) and B (z-axis).
          const x =
            circleX * (cosB * cosPhi + sinA * sinB * sinPhi) -
            circleY * cosA * sinB;
          const y =
            circleX * (sinB * cosPhi - sinA * cosB * sinPhi) +
            circleY * cosA * cosB;
          const z = K2 + cosA * circleX * sinPhi + circleY * sinA;
          const ooz = 1 / z; // one over z

          // Project to grid coordinates.
          const xp = Math.floor(COLS / 2 + K1 * ooz * x);
          const yp = Math.floor(ROWS / 2 - (K1 / 2) * ooz * y);

          if (xp < 0 || xp >= COLS || yp < 0 || yp >= ROWS) continue;

          // Luminance: surface normal dotted with light direction (0, 1, -1).
          const L =
            cosPhi * cosTheta * sinB -
            cosA * cosTheta * sinPhi -
            sinA * sinTheta +
            cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi);

          const idx = xp + yp * COLS;
          if (ooz > zbuffer[idx]) {
            zbuffer[idx] = ooz;
            const luminanceIndex = Math.max(0, Math.floor(L * 8));
            output[idx] =
              LUMINANCE[Math.min(luminanceIndex, LUMINANCE.length - 1)];
          }
        }
      }

      let frame = "";
      for (let row = 0; row < ROWS; row += 1) {
        frame += output.slice(row * COLS, (row + 1) * COLS).join("");
        if (row < ROWS - 1) frame += "\n";
      }
      pre.textContent = frame;

      A += 0.01;
      B += 0.005;
      frameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Size the monospace text so ROWS lines fit within the requested height.
  const fontSize = height / ROWS;

  return (
    <DonutLink
      href="https://www.a1k0n.net/2021/01/13/optimizing-donut.html"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Read about optimizing the ASCII donut"
      style={{ height, background }}
    >
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{
          margin: 0,
          color,
          fontFamily: "monospace",
          fontSize: `${fontSize}px`,
          lineHeight: 1,
          whiteSpace: "pre",
          userSelect: "none",
        }}
      />
    </DonutLink>
  );
};

export default AsciiDonut;
