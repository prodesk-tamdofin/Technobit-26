"use client";

import { reqImgWrapper } from "@/api/requests";

const GalleryImage = ({
  item,
  keyVal,
  openModal,
}: {
  item: any;
  keyVal: number;
  openModal: () => void;
}) => {
  const imgSrc = item.BigImage?.startsWith('http') ? item.BigImage : reqImgWrapper(item.BigImage)?.toString();
  
  return (
    <figure className={`image-${keyVal}`} onClick={openModal}>
      <a data-featherlight="image">
        <img
          alt=""
          loading="lazy"
          src={imgSrc}
        />
        <figcaption>{`Image ${keyVal}`}</figcaption>
      </a>
    </figure>
  );
};

export default GalleryImage;
