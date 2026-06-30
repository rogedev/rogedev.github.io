import React, { useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TorusKnotGeometry,
  MeshNormalMaterial,
  Mesh,
} from "three";

// A rotating 3D torus knot rendered with a normal material, which paints each
// face by its surface normal — producing the signature "rainbow" look.
const RainbowKnot = ({ height = 320 }) => {
  const mountRef = useRef(null);
  const theme = useTheme();
  const clearColor = (theme && theme.knotClear) || "#ffffff";
  const clearColorRef = useRef(clearColor);
  clearColorRef.current = clearColor;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let width = mount.clientWidth || 320;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(clearColorRef.current);
    renderer.setSize(width, height);

    const geometry = new TorusKnotGeometry(1, 0.175, 100, 10, 5, 6);
    const material = new MeshNormalMaterial();
    const torus = new Mesh(geometry, material);
    scene.add(torus);

    mount.appendChild(renderer.domElement);

    let frameId;
    const animate = () => {
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      torus.rotation.z += 0.01;
      renderer.setClearColor(clearColorRef.current);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = mount.clientWidth || width;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(handleResize)
        : null;
    if (observer) observer.observe(mount);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [height]);

  return <div ref={mountRef} style={{ width: "100%", height }} />;
};

export default RainbowKnot;
