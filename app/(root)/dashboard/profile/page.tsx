"use client";
import { useCurrentUser } from "@/app/auth/useCurrentUser";
import ModalDeleteAccount from "@/app/components/ModalDeleteAccount";
import { useSidebar } from "@/app/context/SidebarContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Camera, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const professions = [
  "Engineering",
  "Design",
  "Research",
  "Writing",
  "Product Management",
  "Other",
];

const Profile = () => {
  const { collapsed, setIsCollapsed } = useSidebar();
  const { user } = useCurrentUser();
  const [showModal, setShowModal] = useState<string | boolean>("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [profTitle, setProfTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [profession, setProfession] = useState<string>("");
  useEffect(() => {
    setName(user?.name);
    setImageUrl(user?.image);
  }, [user]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  }

  return (
    <div
      className={` ${
        !collapsed ? "pl-6 min-[600px]:pl-32" : "pl-6"
      } transition-all duration-300 flex justify-center`}
    >
      <div className="p-4 pb-6 flex flex-col gap-6 max-w-[1000px]">
        {showModal === "delete-account" && (
          <ModalDeleteAccount setShowModal={setShowModal} />
        )}

        <label htmlFor="image-upload">
          <div className="hover:grayscale img-hover rounded-full h-fit w-fit transition-all relative">
            <span className="absolute cursor-pointer top-1/2 img-hover-ele left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
              <Camera size={50} />
            </span>
            <Image
              src={imageUrl || user?.image}
              alt="user-image"
              height={100}
              width={100}
              className=" cursor-pointer h-[100px] w-[100px] rounded-full border-[2px] border-[#ededed] shadow-md transition-all"
            />
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border p-2 rounded-md border-gray-300 w-full`}
            placeholder=""
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="text"
            value={user?.email || ""}
            disabled={true}
            className={`border disabled:cursor-not-allowed select-none disabled:bg-zinc-100 p-2 rounded-md border-gray-300 w-full`}
            placeholder=""
          />
        </div>

        <div className="flex flex-col gap-2 min-w-full">
          <label className="text-sm font-medium">
            What describes your work?
          </label>

          <div
            className={`border relative p-2 cursor-pointer rounded-md border-gray-300 w-full ${
              !profession ? "text-zinc-500" : "text-black"
            }`}
            onClick={() => setOpen((val) => !val)}
          >
            {profession || "Select Profession"}
            <AnimatePresence>
              {open && (
                <motion.div
                  className="text-black absolute top-[calc(100%+1px)] left-0 flex flex-col p-1 rounded-md w-full bg-white shadow-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {professions.map((work) => (
                    <button
                      key={work}
                      className=" w-full flex justify-between hover:bg-zinc-100 bg-white transition-all duration-300 p-2 rounded-md"
                      onClick={() => setProfession(work)}
                    >
                      {work} {work === profession && <Check size={20} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Professional Title</label>
          <input
            type="text"
            value={profTitle}
            className={`border select-none disabled:bg-zinc-100 p-2 rounded-md border-gray-300 w-full`}
            placeholder="e.g. Full Stack Developer, UI/UX Designer, University Student"
            onChange={(e) => setProfTitle(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowModal("delete-account")}
          className="p-2 px-4 rounded-lg bg-zinc-950 w-fit text-white hover:bg-zinc-800 transition"
        >
          Update Profile
        </button>

        <div className="flex  min-[600px]:items-center w-full justify-between gap-4 flex-col min-[600px]:flex-row p-4 h-fit border rounded-md border-gray-300">
          <div className="flex flex-col w-full min-[600px]:w-[75%]">
            <span className="text-md font-medium">Delete Account:</span>
            <span className="text-zinc-500 text-xs min-[600px]:text-sm">
              This action is irreversible. All data associated with your account
              will be permanently deleted.
            </span>
          </div>
          <div className="h-full min-w-fit flex items-center">
            <button
              onClick={() => setShowModal("delete-account")}
              className="p-2 px-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
