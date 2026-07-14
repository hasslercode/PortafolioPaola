import { useEffect, useRef, useState } from 'react';

const SPARKLE_PATH = 'M8 1.2 8.95 5.35 13.1 6.3 8.95 7.25 8 11.4 7.05 7.25 2.9 6.3 7.05 5.35Z';
const MIN_DISTANCE = 16;
const MAX_PARTICLES = 24;
const LIFETIME_MS = 780;
const VARIANTS = ['lg', 'sm', 'xs'];

function canUseSparkles() {
  return (
    globalThis.matchMedia('(pointer: fine)').matches
    && !globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function pickVariant() {
  const roll = Math.random();
  if (roll < 0.45) {
    return 'lg';
  }
  if (roll < 0.8) {
    return 'sm';
  }
  return 'xs';
}

function createSparkle(id, x, y) {
  return {
    id,
    x: x + (Math.random() - 0.5) * 10,
    y: y + (Math.random() - 0.5) * 10,
    variant: pickVariant(),
    rotate: Math.random() * 360,
    driftX: (Math.random() - 0.5) * 18,
    driftY: -6 - Math.random() * 14,
  };
}

export function useCursorSparkles() {
  const [sparkles, setSparkles] = useState([]);
  const [enabled, setEnabled] = useState(canUseSparkles);
  const lastPosRef = useRef(null);
  const idRef = useRef(0);
  const timeoutsRef = useRef(new Set());

  useEffect(() => {
    const finePointer = globalThis.matchMedia('(pointer: fine)');
    const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)');

    const syncEnabled = () => setEnabled(canUseSparkles());

    finePointer.addEventListener('change', syncEnabled);
    reducedMotion.addEventListener('change', syncEnabled);

    return () => {
      finePointer.removeEventListener('change', syncEnabled);
      reducedMotion.removeEventListener('change', syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const onMove = (event) => {
      if (document.body.classList.contains('modal-open')) {
        return;
      }

      const { clientX, clientY } = event;
      const lastPos = lastPosRef.current;

      if (lastPos) {
        const distance = Math.hypot(clientX - lastPos.x, clientY - lastPos.y);
        if (distance < MIN_DISTANCE) {
          return;
        }
      }

      lastPosRef.current = { x: clientX, y: clientY };

      const id = idRef.current + 1;
      idRef.current = id;

      const sparkle = createSparkle(id, clientX, clientY);

      setSparkles((current) => [...current.slice(-(MAX_PARTICLES - 1)), sparkle]);

      const timeoutId = globalThis.setTimeout(() => {
        timeoutsRef.current.delete(timeoutId);
        setSparkles((current) => current.filter((item) => item.id !== id));
      }, LIFETIME_MS);

      timeoutsRef.current.add(timeoutId);
    };

    globalThis.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      globalThis.removeEventListener('mousemove', onMove);
      timeoutsRef.current.forEach((timeoutId) => globalThis.clearTimeout(timeoutId));
      timeoutsRef.current.clear();
      lastPosRef.current = null;
    };
  }, [enabled]);

  return { sparkles, enabled, sparklePath: SPARKLE_PATH };
}
