import React from "react";

type Props = {};

const WarrantyTab = (props: Props) => {
  return (
    <>
      <h2 className="font-semibold text-xl uppercase text-main-500 mb-[10px]">
        THÔNG TIN BẢO HÀNH
      </h2>

      <p className="mb-[10px] text-sm text-main-500">
        BẢO HÀNH CÓ GIỚI HẠN <br />
        Bảo hành có giới hạn là không thể chuyển nhượng. Bảo hành có giới hạn
        sau đây được trao cho người mua lẻ ban đầu của các Sản phẩm của Ashley
        Furniture Industries, Inc. sau đây:
      </p>

      <p className="mb-[10px] text-sm text-main-500">
        Khung được sử dụng trong các sản phẩm bọc và da <br /> Bảo hành trọn đời
        có giới hạn <br /> Bảo hành trọn đời có giới hạn áp dụng cho tất cả các
        khung được sử dụng trong ghế sofa, ghế dài, ghế tình yêu, ghế bọc, ghế
        dài có giường, ghế ghép và giường ngủ. Ashley Furniture Industries, Inc.
        đảm bảo các thành phần này cho bạn, người mua lẻ ban đầu, không có lỗi
        sản xuất vật liệu.
      </p>
    </>
  );
};

export default WarrantyTab;
