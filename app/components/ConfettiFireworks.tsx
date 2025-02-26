// import confetti from "canvas-confetti";

// import { Button } from "@/components/ui/button";
// import { ReactNode } from "react";

// export function ConfettiFireworks({
//   children,
//   ref,
// }: {
//   children: ReactNode;
//   ref: any;
// }) {
//   const handleClick = () => {
//     const duration = 5 * 1000;
//     const animationEnd = Date.now() + duration;
//     const defaults = {
//       startVelocity: 30,
//       spread: 360,
//       ticks: 60,
//       zIndex: 999999,
//     };

//     const randomInRange = (min: number, max: number) =>
//       Math.random() * (max - min) + min;

//     const interval = window.setInterval(() => {
//       const timeLeft = animationEnd - Date.now();

//       if (timeLeft <= 0) {
//         return clearInterval(interval);
//       }

//       const particleCount = 50 * (timeLeft / duration);
//       confetti({
//         ...defaults,
//         particleCount,
//         colors: ["#000000", "#ffffff"], // Black & White confetti
//         origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
//       });
//       confetti({
//         ...defaults,
//         particleCount,
//         colors: ["#000000", "#ffffff"],
//         origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
//       });
//     }, 250);
//   };

//   return (
//     <div className="relative">
//       <Button onClick={handleClick} className="rounded-full" ref={ref}>
//         {children}
//       </Button>
//     </div>
//   );
// }

"use client";

import confetti from "canvas-confetti";

// import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function ConfettiFireworks() {
  useEffect(() => {
    const handleClick = () => {
      const end = Date.now() + 1.5 * 1000; // 3 seconds
      const colors = ["#000000", "#ffffff"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.55 },
          colors: colors,
          zIndex: 99999,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.55 },
          colors: colors,
          zIndex: 99999,
        });

        requestAnimationFrame(frame);
      };

      frame();
    };

    handleClick();
  }, []);

  return (
    <div className="relative">
      {/* <Button ref={ref}>Trigger Side Cannons</Button> */}
    </div>
  );
}
