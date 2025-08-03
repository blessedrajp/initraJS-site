import { useRef, useEffect } from "react";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let scene: any, camera: any, renderer: any, particles: any;
    let animationId: number;

    const init = async () => {
      try {
        // Dynamically import Three.js
        const THREE = await import('three');

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;

        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 100;
          posArray[i + 1] = (Math.random() - 0.5) * 100;
          posArray[i + 2] = (Math.random() - 0.5) * 100;

          // White and orange colors only
          const colors = [
            [1, 0.42, 0.11], // Orange
            [1, 0.55, 0.15], // Light orange
            [1, 1, 1], // White
            [0.9, 0.9, 0.9], // Light gray/white
          ];
          const colorIndex = Math.floor(Math.random() * colors.length);
          colorArray[i] = colors[colorIndex][0];
          colorArray[i + 1] = colors[colorIndex][1];
          colorArray[i + 2] = colors[colorIndex][2];
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.8,
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 30;

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          // Rotate particles
          if (particles) {
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0008;
          }

          // Move particles based on mouse position
          if (particles && window.mouseX !== undefined && window.mouseY !== undefined) {
            particles.rotation.x = window.mouseY * 0.00008;
            particles.rotation.y = window.mouseX * 0.00008;
          }

          renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Handle mouse movement
        const handleMouseMove = (event: MouseEvent) => {
          (window as any).mouseX = event.clientX - window.innerWidth / 2;
          (window as any).mouseY = event.clientY - window.innerHeight / 2;
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('resize', handleResize);
          document.removeEventListener('mousemove', handleMouseMove);
        };
      } catch (error) {
        console.log('Three.js not available, skipping 3D background');
      }
    };

    init();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0" 
      style={{ opacity: 0.3 }}
    />
  );
}
