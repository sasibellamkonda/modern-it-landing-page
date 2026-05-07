"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Three.js scene — floating geometry in deep space
───────────────────────────────────────────────── */
function useThreeScene(mountRef: React.RefObject<HTMLDivElement | null>) {
  const scrollY = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    /* Scene + fog for depth */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0F1E, 0.028);

    /* Camera */
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    /* Lights */
    scene.add(new THREE.AmbientLight(0x0D1B3E, 5));
    const mouseLight = new THREE.PointLight(0x3B82F6, 18, 28);
    mouseLight.position.set(0, 0, 6);
    scene.add(mouseLight);
    const orangeLight = new THREE.PointLight(0xF97316, 14, 22);
    orangeLight.position.set(3, -2, 2);
    scene.add(orangeLight);
    const rimLight = new THREE.DirectionalLight(0x2563EB, 2.5);
    rimLight.position.set(-6, 4, -3);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0x1E3A8A, 10, 18);
    fillLight.position.set(-4, 3, 4);
    scene.add(fillLight);

    /* Utility */
    const rng = (a: number, b: number) => Math.random() * (b - a) + a;
    const coin = () => Math.random() > 0.5;

    type ShapeData = {
      mesh: THREE.Mesh;
      baseY: number;
      speedX: number; speedY: number; speedZ: number;
      floatAmp: number; floatSpeed: number; floatPhase: number;
    };

    const shapes: ShapeData[] = [];

    const addShape = (geo: THREE.BufferGeometry, x: number, y: number, z: number, hue: number, wire: boolean) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(hue, 0.9, 0.55),
        emissive: new THREE.Color().setHSL(hue, 1, 0.22),
        metalness: 0.75, roughness: 0.18, wireframe: wire,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rng(0, Math.PI * 2), rng(0, Math.PI * 2), rng(0, Math.PI));
      scene.add(mesh);
      shapes.push({
        mesh, baseY: y,
        speedX: rng(0.003, 0.012), speedY: rng(0.003, 0.011), speedZ: rng(0, 0.007),
        floatAmp: rng(0.04, 0.14), floatSpeed: rng(0.3, 0.75), floatPhase: rng(0, Math.PI * 2),
      });
    };

    /* Icosahedrons — alternate blue and orange */
    for (let i = 0; i < 7; i++)
      addShape(new THREE.IcosahedronGeometry(rng(0.55, 1.4), coin() ? 0 : 1),
        rng(-8, 8), rng(-4, 4), rng(-5, 1.5),
        i % 2 === 0 ? rng(0.58, 0.64) : rng(0.07, 0.11), coin());

    /* Toruses — 2 blue, 2 orange */
    for (let i = 0; i < 4; i++)
      addShape(new THREE.TorusGeometry(rng(0.7, 1.4), rng(0.1, 0.22), 20, 60),
        rng(-7, 7), rng(-4, 4), rng(-6, 1),
        i < 2 ? rng(0.60, 0.65) : rng(0.07, 0.10), false);

    /* Octahedrons — 2 blue, 1 orange */
    for (let i = 0; i < 3; i++)
      addShape(new THREE.OctahedronGeometry(rng(0.6, 1.1)),
        rng(-6, 6), rng(-3.5, 3.5), rng(-5, 0),
        i < 2 ? rng(0.58, 0.63) : rng(0.07, 0.10), false);

    /* Starfield */
    const starPos = new Float32Array(350 * 3).map(() => (Math.random() - 0.5) * 45);
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x6699ff, size: 0.035, transparent: true, opacity: 0.45 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* Mouse */
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    /* Scroll */
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Resize */
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* Animation loop */
    let raf: number;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      /* Scroll-driven fly-through */
      const sp = Math.min(scrollY.current / window.innerHeight, 1);
      const targetZ = 9 - sp * 7;
      camera.position.z += (targetZ - camera.position.z) * 0.04;
      camera.position.x += (mx * 0.9 - camera.position.x) * 0.025;
      camera.position.y += (my * 0.7 - camera.position.y) * 0.025;

      /* Mouse light drift */
      mouseLight.position.x += (mx * 5 - mouseLight.position.x) * 0.06;
      mouseLight.position.y += (my * 4 - mouseLight.position.y) * 0.06;
      orangeLight.position.x += (-mx * 3 - orangeLight.position.x) * 0.03;

      /* Shape rotation + float */
      shapes.forEach(({ mesh, baseY, speedX, speedY, speedZ, floatAmp, floatSpeed, floatPhase }) => {
        mesh.rotation.x += speedX;
        mesh.rotation.y += speedY;
        mesh.rotation.z += speedZ;
        mesh.position.y = baseY + Math.sin(t * floatSpeed + floatPhase) * floatAmp;
      });

      /* Slow star drift */
      stars.rotation.y = t * 0.008;
      stars.rotation.x = t * 0.003;

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      shapes.forEach(({ mesh }) => {
        (mesh.geometry as THREE.BufferGeometry).dispose();
        (mesh.material as THREE.Material).dispose();
      });
      starGeo.dispose(); starMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [mountRef]);
}

/* ─────────────────────────────────────────────
   Word-by-word animations — each from a unique direction
───────────────────────────────────────────────── */
const wordConfig = [
  { word: "The",       initial: { x: -180, y: 0,  rotate: -8,  filter: "blur(16px)" } },
  { word: "Future",    initial: { x:  180, y: 0,  rotate:  8,  filter: "blur(16px)" } },
  { word: "of",        initial: { x:  0,   y: 90, rotate:  0,  filter: "blur(12px)" } },
  { word: "IT,",       initial: { x: -100, y:-80, rotate: -12, filter: "blur(16px)" } },
];
const wordConfig2 = [
  { word: "Delivered", initial: { x: -200, y: 60, rotate: -6, filter: "blur(18px)" } },
  { word: "Today.",    initial: { x:  200, y:-40, rotate:  6, filter: "blur(18px)" } },
];

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  useThreeScene(mountRef);

  return (
    <section id="hero" className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E]">

      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Scroll-dissolve overlay — fades site in over the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/60 pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6 py-28 md:py-36 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1.5 mb-12 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
          <span className="text-orange-400 text-xs font-semibold tracking-wide uppercase">
            Trusted by 50+ Enterprises
          </span>
        </motion.div>

        {/* Headline line 1 — each word from a different direction */}
        <div className="glitch-headline flex flex-wrap justify-center gap-x-[0.28em] mb-1
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06]">
          {wordConfig.map(({ word, initial }, i) => (
            <div key={i} className="overflow-visible">
              <motion.span
                className="inline-block"
                initial={{ ...initial, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: 0, filter: "blur(0px)", opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 13, delay: 0.1 + i * 0.13 }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Headline line 2 — gradient words */}
        <div className="glitch-headline flex flex-wrap justify-center gap-x-[0.28em] mb-8 md:mb-10
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06]">
          {wordConfig2.map(({ word, initial }, i) => (
            <div key={i} className="overflow-visible">
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 via-blue-300 to-orange-400 bg-clip-text text-transparent"
                initial={{ ...initial, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: 0, filter: "blur(0px)", opacity: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 11, delay: 0.62 + i * 0.14 }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 1.0, ease: "easeOut" }}
          className="text-base md:text-lg xl:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8 md:mb-10 backdrop-blur-[2px] px-1"
        >
          We accelerate digital transformation through AI, cloud, and intelligent
          automation — empowering enterprises to scale faster, innovate boldly, and
          operate smarter.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#services"
            className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.55)] backdrop-blur-sm">
            Explore Services
          </a>
          <a href="#contact"
            className="w-full sm:w-auto text-center border border-blue-600 hover:border-blue-400 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:bg-blue-600/10 group backdrop-blur-sm">
            Talk to Us
            <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
