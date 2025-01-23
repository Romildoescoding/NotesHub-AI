import { Copy } from "lucide-react";
import Image from "next/image";
import React from "react";

const AiMessage = () => {
  return (
    <div className="h-fit items-end w-full flex gap-3">
      <Image
        src="/App_Logo.png"
        height={24}
        width={24}
        alt="user-image"
        className="rounded-full border-2"
      />
      <span className="h-fit w-full max-w-[40vw] ai-message relative">
        A version of this story first appeared in the fall 2020 Artnet
        Intelligence Report, which you can download in full for free here. One
        of the hottest invitations at Art Basel Miami Beach in December was to a
        star-studded dinner at the chic Faena Hotel honoring artist Amoako
        Boafo. A few years earlier, Boafo was in Accra, Ghana, struggling to
        sell works for $100 apiece to support his mother and grandmother. Now,
        he was the headliner of the art worlds buzziest week of the year, with a
        suite of gigantic paintings at the Rubell Museum and a sold-out booth at
        the fair. The best of Artnet News in your inbox. Sign up for our daily
        newsletter. “Almost anywhere that I walk, I dont manage to look at
        anything because people want to talk and give congratulations,” Boafo
        told Page Six, which lavished the dinner with breathless coverage. When
        the guest of honor arrived—two hours late—he was decked out in designer
        duds and surrounded by an entourage of friends, influencers, and
        hangers-on.
        <span className="absolute bottom-2 right-2 text-zinc-50">
          <Copy size={15} />
        </span>
      </span>
    </div>
  );
};

export default AiMessage;
