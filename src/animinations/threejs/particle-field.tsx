import { useRef, useEffect } from "react";

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let scene: any, camera: any, renderer: any, particleSystem: any;
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

        // Create particle field
        const particleCount = 800;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Positions
          positions[i3] = (Math.random() - 0.5) * 50;
          positions[i3 + 1] = (Math.random() - 0.5) * 30;
          positions[i3 + 2] = (Math.random() - 0.5) * 30;
          
          // Colors (orange and white theme)
          const colorChoice = Math.random();
          if (colorChoice < 0.3) {
            colors[i3] = 1; colors[i3 + 1] = 0.42; colors[i3 + 2] = 0.11; // Orange
          } else if (colorChoice < 0.6) {
            colors[i3] = 1; colors[i3 + 1] = 0.65; colors[i3 + 2] = 0.3; // Light orange
          } else {
            colors[i3] = 1; colors[i3 + 1] = 1; colors[i3 + 2] = 1; // White
          }
          
          // Velocities
          velocities[i3] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 0.8,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        camera.position.z = 25;

        const animate = (time: number) => {
          animationId = requestAnimationFrame(animate);

          if (particleSystem) {
            const positions = particleSystem.geometry.attributes.position.array;
            
            for (let i = 0; i < particleCount; i++) {
              const i3 = i * 3;
              
              // Apply velocities
              positions[i3] += velocities[i3];
              positions[i3 + 1] += velocities[i3 + 1];
              positions[i3 + 2] += velocities[i3 + 2];
              
              // Add wave motion
              positions[i3] += Math.sin(time * 0.001 + positions[i3 + 1] * 0.01) * 0.005;
              positions[i3 + 1] += Math.cos(time * 0.0015 + positions[i3] * 0.01) * 0.005;
              
              // Mouse interaction
              const mouseInfluenceX = (mouseX * 0.001) * Math.sin(time * 0.002 + i * 0.1);
              const mouseInfluenceY = (mouseY * 0.001) * Math.cos(time * 0.002 + i * 0.1);
              positions[i3] += mouseInfluenceX * 0.1;
              positions[i3 + 1] += mouseInfluenceY * 0.1;
              
              // Boundary wrapping
              if (positions[i3] > 25) positions[i3] = -25;
              if (positions[i3] < -25) positions[i3] = 25;
              if (positions[i3 + 1] > 15) positions[i3 + 1] = -15;
              if (positions[i3 + 1] < -15) positions[i3 + 1] = 15;
              if (positions[i3 + 2] > 15) positions[i3 + 2] = -15;
              if (positions[i3 + 2] < -15) positions[i3 + 2] = 15;
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
            
            // Rotate the entire system slowly
            particleSystem.rotation.y += 0.001;
            particleSystem.rotation.x += 0.0005;
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
        console.log("Three.js not available for particle field");
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
    <div className="w-full h-80 relative overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 pointer-events-none" />
    </div>
  );
}