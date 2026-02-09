import React from "react";
import HorizontalInfiniteScroll from "../ui/HorizontalInfiniteScroll";

const promotionalImages = [
  "/Promotional/1.png",
  "/Promotional/2.png",
  "/Promotional/3.png",
  "/Promotional/4.png",
  "/Promotional/5.png",
  "/Promotional/6.jpeg",
  "/Promotional/7.jpeg",
  "/Promotional/8.png",
  "/Promotional/9.png",
  "/Promotional/10.jpeg",
];

const Promotional = () => {
  return (
    <div className="flex w-full flex-col items-center bg-opacity-50 bg-[linear-gradient(90deg,_var(--primary-600)_0%,_var(--secondary-600)_40%,_var(--secondary-600)_60%,_var(--primary-600)_100%)] py-3">
      <h1 className="title">Technobit'26 Highlights</h1>
      <HorizontalInfiniteScroll>
        {promotionalImages.map((src, index) => {
          return (
            <img
              src={src}
              key={index}
              style={{
                minWidth: `calc(100vw / ${promotionalImages.length})`,
              }}
              className="h-36 object-contain"
              alt="Technobit'26 promotional"
            />
          );
        })}
      </HorizontalInfiniteScroll>
    </div>
  );
};

export default Promotional;
