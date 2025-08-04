import { useRef, useEffect } from "react";

export default function CodeRain() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let scene: any, camera: any, renderer: any, textMeshes: any[] = [];
    let animationId: number;

    const init = async () => {
      try {
        const THREE = await import("three");

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / 250, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, 250);
        renderer.setClearColor(0x000000, 0);

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Create code characters
        const codeChars = ['0', '1', '{', '}', '(', ')', '<', '>', '/', '\\', '=', '+', '-', '*'];
        const colors = [0xff6b35, 0xffffff, 0xff8c42, 0xffa366];

        for (let i = 0; i < 100; i++) {
          // Create text geometry for each character
          const textGeometry = new THREE.RingGeometry(0.1, 0.3, 4);
          const textMaterial = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: Math.random() * 0.8 + 0.2
          });

          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          
          textMesh.position.x = (Math.random() - 0.5) * 30;
          textMesh.position.y = Math.random() * 20 + 10;
          textMesh.position.z = (Math.random() - 0.5) * 20;
          
          // Store properties for animation
          (textMesh as any).fallSpeed = Math.random() * 0.1 + 0.05;
          (textMesh as any).rotationSpeed = (Math.random() - 0.5) * 0.05;
          (textMesh as any).initialX = textMesh.position.x;
          
          textMeshes.push(textMesh);
          scene.add(textMesh);
        }

        camera.position.z = 15;

        const animate = (time: number) => {
          animationId = requestAnimationFrame(animate);

          textMeshes.forEach((mesh) => {
            // Falling effect
            mesh.position.y -= (mesh as any).fallSpeed;
            
            if (mesh.position.y < -15) {
              mesh.position.y = 15;
              mesh.position.x = (Math.random() - 0.5) * 30;
            }
            
            // Rotation and slight horizontal drift
            mesh.rotation.z += (mesh as any).rotationSpeed;
            mesh.position.x += Math.sin(time * 0.001 + mesh.position.y * 0.1) * 0.02;
            
            // Pulsing opacity
            const baseMaterial = mesh.material as any;
            baseMaterial.opacity = 0.3 + Math.sin(time * 0.005 + mesh.position.y * 0.1) * 0.3;
          });

          renderer.render(scene, camera);
        };

        animate(0);

        const handleResize = () => {
          camera.aspect = window.innerWidth / 250;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, 250);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.log("Three.js not available for code rain");
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
    <div className="w-full h-60 relative overflow-hidden bg-gradient-to-b from-transparent to-background/10">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none" />
    </div>
  );
}