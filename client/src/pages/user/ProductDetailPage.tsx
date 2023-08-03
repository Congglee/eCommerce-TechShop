import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/product/product.services";
import { IProduct } from "../../@types/product.interface";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cart.slice";

type Props = {};

const ProductDetailPage = (props: Props) => {
  const { id } = useParams();
  const { data, isFetching, isLoading } = useGetProductQuery(id!);
  const product = data?.productData;
  function formatCurrency(amount: number | undefined) {
    return ((amount as number) / 100).toLocaleString("vi-VN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const dispatch = useDispatch();
  return (
    <div>
      <div className="pages  py-[15px] mb-[35px]">
        <div className="pages-container px-[170px]">
          <div>
            <div className="flex items-center gap-x-2 text-[#1c1d1d]">
              Trang chủ <i className="fa-solid fa-chevron-right text-[8px]"></i>
              {product?.name}
            </div>
          </div>
        </div>
      </div>

      <div className="product mb-7">
        <div className="product-container px-[170px] flex gap-x-[66px]">
          <div className="product-images w-[50%] flex-shrink-0">
            <div className="flex">
              <div>
                <div className="w-[75px] h-[75px] cursor-pointer pr-3">
                  <img src={product?.images[0]} />
                </div>
                <div className="w-[75px] h-[75px] cursor-pointer pr-3">
                  <img src={product?.images[1]} />
                </div>
                <div className="w-[75px] h-[75px] cursor-pointer pr-3">
                  <img src={product?.images[2]} />
                </div>
                <div className="w-[75px] h-[75px] cursor-pointer pr-3">
                  <img src={product?.images[4]} />
                </div>
              </div>
              <div className="w-[460px] h-[460px] border border-solid border-[#eee] cursor-pointer">
                <img src={product?.images[0]} className="" />
              </div>
            </div>
          </div>

          <div className="product-content w-[50%] flex-1">
            <h2 className="text-3xl font-semibold uppercase mb-[18px]">
              {product?.name}
            </h2>

            <span className="text-xl text-[red] mb-2 inline-block">
              {formatCurrency(product?.price)} VND
            </span>
            <div className="mb-3">
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>
              <span className="pl-2">10 đánh giá</span>
            </div>

            <div className="mb-4">
              <p>{product?.description}</p>
            </div>

            {/* <div className="mb-4">
              <span className="text-[#151515] font-semibold pr-2">
                {" "}
                Số lượng
              </span>
              <input
                type="number"
                min="0"
                step="1"
                value="1"
                className="pl-2 h-8 w-[120px] text-[black] border-black"
              />
            </div> */}

            <button
              className="bg-digital-400 bg-red-500 hover:bg-red-700 text-white mb-5 py-2 px-4 rounded"
              onClick={() => dispatch(addToCart(product))}
            >
              Thêm vào giỏ hàng
            </button>

            <div className="flex gap-x-[14px]">
              <div className="w-[35px] h-[35px] flex items-center justify-center bg-black text-white rounded-[50%]">
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div className="w-[35px] h-[35px] flex items-center justify-center bg-black text-white rounded-[50%]">
                <i className="fa-brands fa-twitter"></i>
              </div>
              <div className="w-[35px] h-[35px] flex items-center justify-center bg-black text-white  rounded-[50%]">
                <i className="fa-brands fa-pinterest "></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-desc mb-[30px]">
        <div className="product-desc-container px-[170px]">
          <div className="flex gap-x-1">
            <div className="py-[9px] px-5  cursor-pointer uppercase">Mô tả</div>
            <div className="py-[9px] px-5  cursor-pointer uppercase">
              BẢO HÀNH
            </div>
            <div className="py-[9px] px-5 cursor-pointer uppercase">
              VẬN CHUYỂN
            </div>
            <div className="py-[9px] px-5  cursor-pointer uppercase">
              Thanh toán
            </div>
            <div className="py-[9px] px-5 b cursor-pointer uppercase">
              PHẢN HỒI KHÁCH HÀNG
            </div>
          </div>

          <div className="p-5 border border-solid ">
            <p>Đây là mô tả sản phẩm</p>
          </div>
        </div>
      </div>

      <div className="related-products mb-[90px]">
        <div className="related-products-container px-[170px]">
          <div className="border-b-2 border-solid border-digital-400 mb-[50px]">
            <div className="text-lg font-semibold uppercase">
              SẢN PHẨM TƯƠNG TỰ
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-5">
            <div className="border border-solid border-[#ccc] p-[15px]">
              <div className="flex flex-col h-full">
                <div className="flex-grow-0 w-[250px] h-[250px]">
                  <a href="">
                    <img
                      src="https://laptoptcc.com/wp-content/uploads/2021/04/9575-dell-xps-laptop-tcc.jpg"
                      className="h-full w-full object-contain"
                    />
                  </a>
                </div>

                <div className="flex-grow">
                  <a className="text-[#2b3743] text-base mb-[6px] inline-block line-clamp-2">
                    Relate product name
                  </a>
                  <div className="mb-3 text-[#f1b400] text-xs">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <span className="text-[#2b3743] text-base">200.000 VND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
