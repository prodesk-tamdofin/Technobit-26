import { reqImgWrapper } from "@/api/requests";
import UserContext from "@/context/UserContext";
import React, { useContext } from "react";
import { FaUserEdit } from "react-icons/fa";

const ProfileCard = ({
  editEventHandler,
}: {
  editEventHandler: () => void;
}) => {
  const user = useContext(UserContext);

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="relative z-10 rounded-3xl bg-gradient-to-tl from-secondary-500/50 to-primary-600/70 px-5 py-10 text-white shadow-lg md:px-16">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="flex flex-col items-center gap-1 lg:flex-row lg:gap-4">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-tr from-secondary-500 to-primary-200 p-1.5">
              <img
                src={
                  reqImgWrapper(user.image) ||
                  `https://api.dicebear.com/7.x/bottts/svg?seed=${user.userName}`
                }
                alt={user.fullName}
                className="h-40 w-40 rounded-full object-cover bg-primary-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${user.userName}`;
                }}
              />
            </div>
            <div className="mt-5 flex flex-col text-center lg:mt-0 lg:text-left">
              <p className="text-sm text-white/50">{user.userName}</p>
              <p className="text-2xl font-bold md:text-3xl">{user.fullName}</p>
              <p className="font-semibold text-white/70">{user.email}</p>
              <p className="font-light text-white/70">{user.institute}</p>
              <p className="font-light text-white/60 text-sm">
                {user.className}
                {user.section ? ` • Section ${user.section}` : ""}
              </p>
              <div className="mt-4">
                <button
                  onClick={editEventHandler}
                  className="mx-auto flex items-center space-x-2 rounded-full border-4 border-primary-400 px-5 py-2 font-medium transition hover:bg-primary-400 lg:mx-0"
                >
                  <span>Edit Profile</span>
                  <FaUserEdit />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
