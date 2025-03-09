import React, { useState } from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { AlertTriangle, LogOut, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ModalLogout = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<string | boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleLogout() {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        console.log("Logout successful");
        router.push("/auth/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    // <div className="w-[full] max-w-md bg-white rounded-md p-6 flex flex-col ">

    // </div>

    <Modal setShowModal={setShowModal}>
      <div className=" w-[95vw] max-w-[500px] p-4 rounded-md h-auto bg-white flex flex-col gap-2">
        <h2 className="text-xl min-[600px]:text-2xl pb-2 flex gap-2 font-bold text-zinc-900 border-b-2">
          <span className="border-2 border-zinc-300zzzzz flex items-center justify-center text-zinc-900 rounded-full h-8 w-8">
            <LogOut size={20} />
          </span>
          Logout
        </h2>
        <p className="text-gray-600 mt-2 text-xs min-[600px]:text-base text-md">
          {
            "Are you sure you want to logout? You’ll need to log in again next time you return."
          }
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-5 py-2 bg-zinc-200 text-gray-800 text-base rounded-lg hover:bg-zinc-300 transition"
            onClick={() => setShowModal("")}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 flex items-center justify-center bg-zinc-950 min-w-[88px] text-white text-base rounded-lg hover:bg-zinc-800 transition"
            onClick={handleLogout}
          >
            {isLoading ? (
              <Spinner isWhite={true} height={22} width={22} />
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogout;
