import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const HolographicGlobe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Création de la scène, de la caméra et du renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Géométrie de la sphère
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Shader pour effet holographique
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        // Effet de pulsation basé sur la coordonnée vUv et le temps
        float pulsate = sin(time + vUv.y * 20.0) * 0.5 + 0.5;
        // Couleur cyan pour un effet holographique
        vec3 baseColor = vec3(0.0, 1.0, 1.0);
        // Calcul de la luminosité en fonction de l'angle de vue
        float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        vec3 color = baseColor * pulsate * intensity;
        gl_FragColor = vec4(color, 0.6);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lumières d'ambiance pour renforcer l'effet
    const ambientLight = new THREE.AmbientLight(0x00ffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Contrôles pour rotation interactive
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Boucle d'animation
    const startTime = Date.now();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = (Date.now() - startTime) / 1000;
      material.uniforms.time.value = elapsed;
      sphere.rotation.y += 0.002; // Rotation lente automatique
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Nettoyage à la destruction du composant
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
};

export default HolographicGlobe;
