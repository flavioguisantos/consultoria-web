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
  const count = small ? 288 : 930;
  const nodes = Array.from({ length: count }, (_, index) => {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random());
    return {
      x: width * (0.5 + Math.cos(angle) * distance * 0.53),
      y: height * (0.5 + Math.sin(angle) * distance * 0.47),
      size: index % 37 === 0 ? 2.3 : 0.45 + random() * 0.85,
      tint: index % 11 === 0 ? 'lime' : index % 7 === 0 ? 'violet' : 'cyan',
    };
  });
  const edges = [];
  const maxDistance = small ? 62 : 78;
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
  return { nodes, edges, flowEdges: edges.filter((_, index) => index % 37 === 0) };
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

    let background;
    let paths = [];

    function pointOnCurve(path, progress) {
      const inverse = 1 - progress;
      return {
        x: inverse ** 3 * path.start.x + 3 * inverse ** 2 * progress * path.controlA.x + 3 * inverse * progress ** 2 * path.controlB.x + progress ** 3 * path.end.x,
        y: inverse ** 3 * path.start.y + 3 * inverse ** 2 * progress * path.controlA.y + 3 * inverse * progress ** 2 * path.controlB.y + progress ** 3 * path.end.y,
      };
    }

    function createAgentPaths() {
      const center = { x: width * 0.5, y: height * 0.5 };
      const agents = [
        { x: 0.2, y: 0.21 },
        { x: 0.82, y: 0.34 },
        { x: 0.78, y: 0.77 },
      ];
      paths = agents.map((agent, index) => {
        const start = { x: width * agent.x, y: height * agent.y };
        const bend = (index - 1) * height * 0.1;
        return {
          start,
          controlA: { x: start.x + (center.x - start.x) * 0.37, y: start.y + bend },
          controlB: { x: center.x + (start.x - center.x) * 0.32, y: center.y - bend * 0.5 },
          end: center,
        };
      });
    }

    function paintBackground(ratio) {
      background = document.createElement('canvas');
      background.width = canvas.width;
      background.height = canvas.height;
      const base = background.getContext('2d');
      base.setTransform(ratio, 0, 0, ratio, 0, 0);

      const glow = base.createRadialGradient(width * 0.5, height * 0.5, 10, width * 0.5, height * 0.5, width * 0.55);
      glow.addColorStop(0, 'rgba(42, 226, 215, .14)');
      glow.addColorStop(0.44, 'rgba(73, 85, 198, .08)');
      glow.addColorStop(1, 'rgba(6, 14, 31, 0)');
      base.fillStyle = glow;
      base.fillRect(0, 0, width, height);

      for (const [a, b, distance] of graph.edges) {
        const start = graph.nodes[a];
        const end = graph.nodes[b];
        const strength = 1 - distance / (width < 460 ? 62 : 78);
        base.strokeStyle = 'rgba(101, 208, 226, ' + (0.035 + strength * 0.11) + ')';
        base.lineWidth = 0.6;
        base.beginPath();
        base.moveTo(start.x, start.y);
        base.lineTo(end.x, end.y);
        base.stroke();
      }

      graph.nodes.forEach(node => {
        base.fillStyle = node.tint === 'lime' ? '#b9f676' : node.tint === 'violet' ? '#9e95ff' : '#76dae9';
        base.globalAlpha = node.size > 2 ? 0.85 : 0.42;
        base.beginPath();
        base.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        base.fill();
      });
      base.globalAlpha = 1;
    }

    function resize() {
      const bounds = stage.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      graph = createGraph(width, height);
      createAgentPaths();
      paintBackground(ratio);
      draw(0);
    }

    function draw(time) {
      if (!graph || !background) return;
      const seconds = time / 1000;
      context.clearRect(0, 0, width, height);
      context.drawImage(background, 0, 0, width, height);

      context.save();
      context.shadowBlur = 12;
      context.shadowColor = '#b8ff7a';
      context.fillStyle = '#caff94';
      graph.flowEdges.forEach(([a, b], index) => {
        const start = graph.nodes[a];
        const end = graph.nodes[b];
        const progress = (seconds * (0.13 + (index % 5) * 0.025) + index * 0.17) % 1;
        context.beginPath();
        context.arc(start.x + (end.x - start.x) * progress, start.y + (end.y - start.y) * progress, 1.55, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();

      paths.forEach((path, index) => {
        context.save();
        context.beginPath();
        context.moveTo(path.start.x, path.start.y);
        context.bezierCurveTo(path.controlA.x, path.controlA.y, path.controlB.x, path.controlB.y, path.end.x, path.end.y);
        context.setLineDash([5, 12]);
        context.lineDashOffset = -seconds * 16;
        context.shadowBlur = 10;
        context.shadowColor = '#58d9e8';
        context.strokeStyle = 'rgba(139, 234, 242, .76)';
        context.lineWidth = 1.7;
        context.stroke();
        context.setLineDash([]);
        context.shadowBlur = 13;
        context.shadowColor = index === 1 ? '#bdacff' : '#b4ec62';
        context.fillStyle = index === 1 ? '#c4b8ff' : '#caff94';
        for (let packet = 0; packet < 3; packet += 1) {
          const progress = (seconds * (0.15 + index * 0.025) + packet / 3 + index * 0.19) % 1;
          const position = pointOnCurve(path, progress);
          context.beginPath();
          context.arc(position.x, position.y, 2.8, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      });
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
