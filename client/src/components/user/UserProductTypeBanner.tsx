import React from "react";

type Props = {};

const UserProductTypeBanner = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default UserProductTypeBanner;
