import { useRef, useEffect } from "react";

export default function InteractiveWaves() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let scene: any, camera: any, renderer: any, plane: any;
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const init = async () => {
      try {
        const THREE = await import("three");

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, 300);
        renderer.setClearColor(0x000000, 0);

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Create wave geometry
        const geometry = new THREE.PlaneGeometry(40, 40, 50, 50);
        const material = new THREE.MeshBasicMaterial({
          color: 0xff6b35,
          wireframe: true,
          transparent: true,
          opacity: 0.7
        });

        plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 3;
        scene.add(plane);

        camera.position.y = 10;
        camera.position.z = 20;
        camera.lookAt(0, 0, 0);

        // Store original positions
        const positions = geometry.attributes.position.array;
        const originalPositions = new Float32Array(positions.length);
        for (let i = 0; i < positions.length; i++) {
          originalPositions[i] = positions[i];
        }

        const animate = (time: number) => {
          animationId = requestAnimationFrame(animate);

          if (plane) {
            const positions = plane.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
              const x = originalPositions[i];
              const y = originalPositions[i + 1];
              
              // Create wave effect
              const waveX = Math.sin(x * 0.2 + time * 0.003) * 2;
              const waveY = Math.sin(y * 0.2 + time * 0.004) * 2;
              const mouseInfluence = Math.sin(x * 0.1 + mouseX * 0.001) * Math.sin(y * 0.1 + mouseY * 0.001) * 0.5;
              
              positions[i + 2] = waveX + waveY + mouseInfluence;
            }
            
            plane.geometry.attributes.position.needsUpdate = true;
            
            // Subtle rotation
            plane.rotation.z = Math.sin(time * 0.001) * 0.1;
          }

          renderer.render(scene, camera);
        };

        animate(0);

        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX - window.innerWidth / 2) * 0.1;
          mouseY = (event.clientY - window.innerHeight / 2) * 0.1;
        };

        const handleResize = () => {
          camera.aspect = window.innerWidth / 300;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, 300);
        };

        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.log("Three.js not available for interactive waves");
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/30 pointer-events-none" />
    </div>
  );
}