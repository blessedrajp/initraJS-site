import { useRef, useEffect } from "react";

export default function GeometricShapes() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let scene: any, camera: any, renderer: any, shapes: any[] = [];
    let animationId: number;

    const init = async () => {
      try {
        const THREE = await import("three");

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / 280, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, 280);
        renderer.setClearColor(0x000000, 0);

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Create different geometric shapes
        const geometries = [
          new THREE.TetrahedronGeometry(1),
          new THREE.OctahedronGeometry(1),
          new THREE.IcosahedronGeometry(1),
          new THREE.DodecahedronGeometry(1),
          new THREE.ConeGeometry(1, 2, 6),
          new THREE.CylinderGeometry(0.5, 1, 2, 8)
        ];

        for (let i = 0; i < 12; i++) {
          const geometry = geometries[Math.floor(Math.random() * geometries.length)];
          const material = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xff6b35 : 0xffffff,
            wireframe: Math.random() > 0.5,
            transparent: true,
            opacity: 0.7
          });

          const shape = new THREE.Mesh(geometry, material);
          
          shape.position.x = (Math.random() - 0.5) * 25;
          shape.position.y = (Math.random() - 0.5) * 15;
          shape.position.z = (Math.random() - 0.5) * 15;
          
          shape.scale.setScalar(Math.random() * 1.5 + 0.5);
          
          // Store animation properties
          (shape as any).rotationSpeed = {
            x: (Math.random() - 0.5) * 0.03,
            y: (Math.random() - 0.5) * 0.03,
            z: (Math.random() - 0.5) * 0.03
          };
          (shape as any).orbitRadius = Math.random() * 3 + 2;
          (shape as any).orbitSpeed = Math.random() * 0.02 + 0.01;
          (shape as any).orbitOffset = Math.random() * Math.PI * 2;
          (shape as any).initialY = shape.position.y;
          
          shapes.push(shape);
          scene.add(shape);
        }

        camera.position.z = 20;

        const animate = (time: number) => {
          animationId = requestAnimationFrame(animate);

          shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += (shape as any).rotationSpeed.x;
            shape.rotation.y += (shape as any).rotationSpeed.y;
            shape.rotation.z += (shape as any).rotationSpeed.z;
            
            // Orbital motion
            const orbitTime = time * (shape as any).orbitSpeed + (shape as any).orbitOffset;
            shape.position.x += Math.cos(orbitTime) * 0.1;
            shape.position.y = (shape as any).initialY + Math.sin(orbitTime) * (shape as any).orbitRadius;
            
            // Pulsing scale
            const pulseScale = 1 + Math.sin(time * 0.003 + index) * 0.2;
            shape.scale.setScalar(pulseScale * (0.5 + Math.random() * 0.5));
            
            // Color transition
            const material = shape.material as any;
            const hue = (time * 0.001 + index * 0.1) % 1;
            material.color.setHSL(hue, 0.7, 0.6);
          });

          renderer.render(scene, camera);
        };

        animate(0);

        const handleResize = () => {
          camera.aspect = window.innerWidth / 280;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, 280);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.log("Three.js not available for geometric shapes");
      }
    };

    init();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full h-72 relative overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />
    </div>
  );
}