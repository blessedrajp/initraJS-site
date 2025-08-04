import { useRef, useEffect } from "react";

export default function FloatingCubes() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let scene: any, camera: any, renderer: any, cubes: any[] = [];
    let animationId: number;

    const init = async () => {
      try {
        const THREE = await import("three");

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, 200);
        renderer.setClearColor(0x000000, 0);

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Create floating cubes
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        
        for (let i = 0; i < 15; i++) {
          const cubeMaterial = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xff6b35 : 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
          });
          
          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          
          cube.position.x = (Math.random() - 0.5) * 20;
          cube.position.y = (Math.random() - 0.5) * 10;
          cube.position.z = (Math.random() - 0.5) * 10;
          
          cube.rotation.x = Math.random() * Math.PI;
          cube.rotation.y = Math.random() * Math.PI;
          cube.rotation.z = Math.random() * Math.PI;
          
          // Store initial position and rotation speed
          (cube as any).initialY = cube.position.y;
          (cube as any).rotationSpeed = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
          };
          (cube as any).floatSpeed = Math.random() * 0.02 + 0.01;
          
          cubes.push(cube);
          scene.add(cube);
        }

        camera.position.z = 15;

        const animate = (time: number) => {
          animationId = requestAnimationFrame(animate);

          cubes.forEach((cube) => {
            // Floating motion
            cube.position.y = (cube as any).initialY + Math.sin(time * (cube as any).floatSpeed) * 2;
            
            // Rotation
            cube.rotation.x += (cube as any).rotationSpeed.x;
            cube.rotation.y += (cube as any).rotationSpeed.y;
            cube.rotation.z += (cube as any).rotationSpeed.z;
          });

          renderer.render(scene, camera);
        };

        animate(0);

        const handleResize = () => {
          camera.aspect = window.innerWidth / 200;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, 200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.log("Three.js not available for floating cubes");
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
    <div className="w-full h-48 relative overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </div>
  );
}