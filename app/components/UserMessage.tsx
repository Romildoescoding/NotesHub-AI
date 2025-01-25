import Image from "next/image";
import React from "react";

const UserMessage = ({ user, text }) => {
  console.log(user);
  return (
    <div className="h-fit items-end w-full flex gap-3 ">
      <span className="h-fit w-full max-w-[40vw] user-message">{text}</span>
      <Image
        src={user?.image}
        height={24}
        width={24}
        alt="user-image"
        className="rounded-full border-2"
      />
    </div>
  );
};

export default UserMessage;
