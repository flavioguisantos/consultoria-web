import React, { useEffect, useRef } from 'react';

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createGraph(width, height) {
  const random = seededRandom(74129);
  const small = width < 460;
  const count = small ? 96 : 310;
  const nodes = Array.from({ length: count }, (_, index) => {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random());
    return {
      x: width * (0.5 + Math.cos(angle) * distance * 0.53),
      y: height * (0.5 + Math.sin(angle) * distance * 0.47),
      phase: random() * Math.PI * 2,
      speed: 0.3 + random() * 0.5,
      size: index % 19 === 0 ? 2.5 : 0.75 + random() * 1.1,
      tint: index % 11 === 0 ? 'lime' : index % 7 === 0 ? 'violet' : 'cyan',
    };
  });
  const edges = [];
  const maxDistance = small ? 86 : 112;
  for (let a = 0; a < nodes.length; a += 1) {
    const neighbors = [];
    for (let b = 0; b < nodes.length; b += 1) {
      if (a === b) continue;
      const distance = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);
      if (distance < maxDistance) neighbors.push({ b, distance });
    }
    neighbors.sort((left, right) => left.distance - right.distance);
    for (const neighbor of neighbors.slice(0, small ? 4 : 7)) {
      if (a < neighbor.b) edges.push([a, neighbor.b, neighbor.distance]);
    }
  }
  return { nodes, edges };
}

export default function NeuralNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas.parentElement;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let graph;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let visible = true;

    function resize() {
      const bounds = stage.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      graph = createGraph(width, height);
      draw(0);
    }

    function draw(time) {
      if (!graph) return;
      const seconds = time / 1000;
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * 0.51, height * 0.5, 12, width * 0.51, height * 0.5, width * 0.53);
      glow.addColorStop(0, 'rgba(43, 225, 211, .12)');
      glow.addColorStop(0.45, 'rgba(71, 68, 190, .075)');
      glow.addColorStop(1, 'rgba(6, 14, 31, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const positions = graph.nodes.map(node => ({
        x: node.x + Math.sin(seconds * node.speed + node.phase) * 2.7,
        y: node.y + Math.cos(seconds * node.speed * 0.8 + node.phase) * 2.7,
      }));

      for (const [a, b, distance] of graph.edges) {
        const start = positions[a];
        const end = positions[b];
        const strength = 1 - distance / (width < 460 ? 86 : 112);
        context.strokeStyle = `rgba(96, 204, 223, ${0.08 + strength * 0.2})`;
        context.lineWidth = 0.7;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
      }

      context.save();
      context.shadowBlur = 16;
      graph.edges.forEach(([a, b], index) => {
        if (index % 19 !== 0) return;
        const progress = (seconds * (0.13 + (index % 5) * 0.025) + index * 0.17) % 1;
        const x = positions[a].x + (positions[b].x - positions[a].x) * progress;
        const y = positions[a].y + (positions[b].y - positions[a].y) * progress;
        context.shadowColor = '#b8ff7a';
        context.fillStyle = '#caff94';
        context.beginPath();
        context.arc(x, y, 1.7, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();

      for (let index = 0; index < graph.nodes.length; index += 1) {
        const node = graph.nodes[index];
        const position = positions[index];
        context.fillStyle = node.tint === 'lime' ? '#b9f676' : node.tint === 'violet' ? '#9e95ff' : '#76dae9';
        context.globalAlpha = node.size > 2 ? 0.95 : 0.55;
        context.beginPath();
        context.arc(position.x, position.y, node.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    }

    function animate(time) {
      if (!visible || document.hidden || motion.matches) return;
      if (time - lastFrame > 32) {
        draw(time);
        lastFrame = time;
      }
      frame = requestAnimationFrame(animate);
    }

    function refreshAnimation() {
      cancelAnimationFrame(frame);
      draw(0);
      if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refreshAnimation();
    });
    resizeObserver.observe(stage);
    visibilityObserver.observe(stage);
    document.addEventListener('visibilitychange', refreshAnimation);
    motion.addEventListener('change', refreshAnimation);
    resize();
    refreshAnimation();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', refreshAnimation);
      motion.removeEventListener('change', refreshAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}
