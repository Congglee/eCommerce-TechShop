import React, { useState } from "react";
import icons from "../../../utils/icons";
import { IProduct } from "../../../interfaces/product.interface";

const { AiTwotoneStar } = icons;

interface productDetailTabsProps {
  product: IProduct | undefined;
}

const ProductDetailTabs = (props: productDetailTabsProps) => {
  const { product } = props;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isReviewActive, setIsReviewActive] = useState(false);

  return (
    <div className="mb-[30px]">
      <div className="flex gap-x-1">
        <div
          className={`py-[9px] px-5 uppercase text-[15px] text-main-500 border border-main-700 hover:bg-white hover:text-black transition-all duration-500 ease-linear cursor-pointer bg-[#f1f1f1] ${
            activeTab === "description" && "bg-white border-b-transparent"
          }`}
          onClick={() => setActiveTab("description")}
        >
          <span>Mô tả</span>
        </div>

        <div
          className={`py-[9px] px-5 uppercase text-[15px] text-main-500 border border-main-700 hover:bg-white hover:text-black transition-all duration-500 ease-linear cursor-pointer bg-[#f1f1f1] ${
            activeTab === "warranty" && "bg-white border-b-transparent"
          }`}
          onClick={() => setActiveTab("warranty")}
        >
          <span>Bảo hành</span>
        </div>

        <div
          className={`py-[9px] px-5 uppercase text-[15px] text-main-500 border border-main-700 hover:bg-white hover:text-black transition-all duration-500 ease-linear cursor-pointer bg-[#f1f1f1] ${
            activeTab === "delivery" && "bg-white border-b-transparent"
          }`}
          onClick={() => setActiveTab("delivery")}
        >
          <span>Vận chuyển</span>
        </div>

        <div
          className={`py-[9px] px-5 uppercase text-[15px] text-main-500 border border-main-700 hover:bg-white hover:text-black transition-all duration-500 ease-linear cursor-pointer bg-[#f1f1f1] ${
            activeTab === "payment" && "bg-white border-b-transparent"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          <span>Thanh toán</span>
        </div>

        <div
          className={`py-[9px] px-5 uppercase text-[15px] text-main-500 border border-main-700 hover:bg-white hover:text-black transition-all duration-500 ease-linear cursor-pointer bg-[#f1f1f1] ${
            activeTab === "customer-review" && "bg-white border-b-transparent"
          }`}
          onClick={() => setActiveTab("customer-review")}
        >
          <span>Nhận xét của khách hàng</span>
        </div>
      </div>

      <div className="p-5 border border-main-700 mt-[-1px]">
        {activeTab === "description" && (
          <ul className="flex flex-col gap-y-[2px] w-[90%]">
            {product?.description.split("\n").map((item) => (
              <li
                className="text-sm text-main-500 list-disc list-inside list-image-[initial]"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {activeTab === "warranty" && (
          <>
            <h2 className="font-semibold text-xl uppercase text-main-500 mb-[10px]">
              THÔNG TIN BẢO HÀNH
            </h2>

            <p className="mb-[10px] text-sm text-main-500">
              BẢO HÀNH CÓ GIỚI HẠN <br />
              Bảo hành có giới hạn là không thể chuyển nhượng. Bảo hành có giới
              hạn sau đây được trao cho người mua lẻ ban đầu của các Sản phẩm
              của Ashley Furniture Industries, Inc. sau đây:
            </p>

            <p className="mb-[10px] text-sm text-main-500">
              Khung được sử dụng trong các sản phẩm bọc và da <br /> Bảo hành
              trọn đời có giới hạn <br /> Bảo hành trọn đời có giới hạn áp dụng
              cho tất cả các khung được sử dụng trong ghế sofa, ghế dài, ghế
              tình yêu, ghế bọc, ghế dài có giường, ghế ghép và giường ngủ.
              Ashley Furniture Industries, Inc. đảm bảo các thành phần này cho
              bạn, người mua lẻ ban đầu, không có lỗi sản xuất vật liệu.
            </p>
          </>
        )}

        {activeTab === "delivery" && (
          <>
            <h2 className="font-semibold text-xl uppercase text-main-500 mb-[10px]">
              MUA HÀNG & GIAO HÀNG
            </h2>

            <p className="mb-[10px] text-sm text-main-500">
              Trước khi mua hàng, bạn nên biết số đo của khu vực bạn định đặt đồ
              nội thất. Bạn cũng nên đo bất kỳ ô cửa và hành lang nào mà đồ nội
              thất sẽ đi qua để đến đích cuối cùng.
              <span className="text-xs text-main-500">Nhận tại cửa hàng</span>
            </p>

            <p className="mb-[10px] text-sm text-main-500">
              Shopify Shop yêu cầu tất cả các sản phẩm phải được kiểm tra kỹ
              lưỡng TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất ngờ nào
              xảy ra. Nhóm của chúng tôi sẵn lòng mở tất cả các gói hàng và sẽ
              hỗ trợ trong quá trình kiểm tra. Sau đó chúng tôi sẽ niêm phong
              lại các kiện hàng để vận chuyển an toàn. Chúng tôi khuyến khích
              tất cả khách hàng mang theo miếng đệm hoặc chăn để bảo vệ đồ đạc
              trong quá trình vận chuyển cũng như dây thừng hoặc dây buộc.
              Shopify Shop sẽ không chịu trách nhiệm đối với hư hỏng xảy ra sau
              khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Người mua
              có trách nhiệm đảm bảo chọn đúng mặt hàng và ở tình trạng tốt.
              <span className="text-xs text-main-500">Vận chuyển</span>
            </p>

            <p className="text-sm text-main-500">
              Khách hàng có thể chọn ngày giao hàng có sẵn tiếp theo phù hợp
              nhất với lịch trình của họ. Tuy nhiên, để định tuyến các điểm dừng
              hiệu quả nhất có thể, Shopify Shop sẽ cung cấp khung thời gian.
              Khách hàng sẽ không được chọn thời gian. Bạn sẽ được thông báo
              trước về khung thời gian đã lên lịch của mình. Vui lòng đảm bảo
              rằng một người lớn có trách nhiệm (18 tuổi trở lên) sẽ ở nhà vào
              thời điểm đó. Để chuẩn bị cho việc giao hàng của bạn, vui lòng
              loại bỏ đồ nội thất, tranh ảnh, gương, phụ kiện, v.v. hiện có để
              tránh hư hỏng. Ngoài ra, hãy đảm bảo rằng khu vực mà bạn muốn đặt
              đồ đạc của mình không có bất kỳ đồ nội thất cũ nào và bất kỳ vật
              dụng nào khác có thể cản trở lối đi của đội giao hàng. Cửa hàng
              Shopify sẽ giao hàng, lắp ráp và bố trí việc mua đồ nội thất mới
              của bạn, đồng thời chuyển tất cả vật liệu đóng gói ra khỏi nhà
              bạn. Đội giao hàng của chúng tôi không được phép di chuyển đồ nội
              thất hiện có của bạn hoặc các vật dụng gia đình khác. Nhân viên
              giao hàng sẽ cố gắng giao các mặt hàng đã mua một cách an toàn và
              có kiểm soát nhưng sẽ không cố gắng đặt đồ đạc nếu họ cảm thấy
              việc đó sẽ gây hư hại cho sản phẩm hoặc nhà của bạn. Nhân viên
              giao hàng không thể mở cửa, cẩu đồ đạc hoặc mang đồ đạc lên quá 3
              tầng cầu thang. Phải có thang máy để giao hàng từ tầng 4 trở lên.
            </p>
          </>
        )}

        {activeTab === "payment" && (
          <>
            <h2 className="font-semibold text-xl uppercase text-main-500 mb-[10px]">
              MUA HÀNG & GIAO HÀNG
            </h2>

            <p className="mb-[10px] text-sm text-main-500">
              Trước khi mua hàng, bạn nên biết số đo của khu vực bạn định đặt đồ
              nội thất. Bạn cũng nên đo bất kỳ ô cửa và hành lang nào mà đồ nội
              thất sẽ đi qua để đến đích cuối cùng.
              <span className="text-xs text-main-500">Nhận tại cửa hàng</span>
            </p>

            <p className="mb-[10px] text-sm text-main-500">
              Shopify Shop yêu cầu tất cả các sản phẩm phải được kiểm tra kỹ
              lưỡng TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất ngờ nào
              xảy ra. Nhóm của chúng tôi sẵn lòng mở tất cả các gói hàng và sẽ
              hỗ trợ trong quá trình kiểm tra. Sau đó chúng tôi sẽ niêm phong
              lại các kiện hàng để vận chuyển an toàn. Chúng tôi khuyến khích
              tất cả khách hàng mang theo miếng đệm hoặc chăn để bảo vệ đồ đạc
              trong quá trình vận chuyển cũng như dây thừng hoặc dây buộc.
              Shopify Shop sẽ không chịu trách nhiệm đối với hư hỏng xảy ra sau
              khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Người mua
              có trách nhiệm đảm bảo chọn đúng mặt hàng và ở tình trạng tốt.
              <span className="text-xs text-main-500">Vận chuyển</span>
            </p>

            <p className="text-sm text-main-500">
              Khách hàng có thể chọn ngày giao hàng có sẵn tiếp theo phù hợp
              nhất với lịch trình của họ. Tuy nhiên, để định tuyến các điểm dừng
              hiệu quả nhất có thể, Shopify Shop sẽ cung cấp khung thời gian.
              Khách hàng sẽ không được chọn thời gian. Bạn sẽ được thông báo
              trước về khung thời gian đã lên lịch của mình. Vui lòng đảm bảo
              rằng một người lớn có trách nhiệm (18 tuổi trở lên) sẽ ở nhà vào
              thời điểm đó. Để chuẩn bị cho việc giao hàng của bạn, vui lòng
              loại bỏ đồ nội thất, tranh ảnh, gương, phụ kiện, v.v. hiện có để
              tránh hư hỏng. Ngoài ra, hãy đảm bảo rằng khu vực mà bạn muốn đặt
              đồ đạc của mình không có bất kỳ đồ nội thất cũ nào và bất kỳ vật
              dụng nào khác có thể cản trở lối đi của đội giao hàng. Cửa hàng
              Shopify sẽ giao hàng, lắp ráp và bố trí việc mua đồ nội thất mới
              của bạn, đồng thời chuyển tất cả vật liệu đóng gói ra khỏi nhà
              bạn. Đội giao hàng của chúng tôi không được phép di chuyển đồ nội
              thất hiện có của bạn hoặc các vật dụng gia đình khác. Nhân viên
              giao hàng sẽ cố gắng giao các mặt hàng đã mua một cách an toàn và
              có kiểm soát nhưng sẽ không cố gắng đặt đồ đạc nếu họ cảm thấy
              việc đó sẽ gây hư hại cho sản phẩm hoặc nhà của bạn. Nhân viên
              giao hàng không thể mở cửa, cẩu đồ đạc hoặc mang đồ đạc lên quá 3
              tầng cầu thang. Phải có thang máy để giao hàng từ tầng 4 trở lên.
            </p>
          </>
        )}

        {activeTab === "customer-review" && (
          <div>
            <h2 className="font-semibold text-xl uppercase text-main-500 mb-[10px]">
              PHẢN HỒI KHÁCH HÀNG
            </h2>

            <div className="flex flex-col mb-6">
              <div className="flex items-center gap-x-1 text-[#f1b400] mb-1">
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
              </div>
              <span className="text-sm text-main-500">Dựa trên 1 đánh giá</span>
              <div>
                <span
                  className="text-sm text-main-200 cursor-pointer hover:text-main-600"
                  onClick={() => setIsReviewActive((prev) => !prev)}
                >
                  Bình luận và Đánh giá
                </span>
              </div>
            </div>

            {isReviewActive && (
              <div className="pt-6 border-t border-[rgba(0,0,0,0.1)]">
                <form action="">
                  <h3 className="text-base font-semibold text-main-500 mb-2">
                    Bình luận và Đánh giá
                  </h3>

                  <div className="mb-[15px] flex flex-col gap-y-[2px]">
                    <label htmlFor="" className="text-sm text-main-500">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên của bạn"
                      className="text-sm border-transparent border-2 text-main-600 w-full py-2 
                      px-[10px] bg-[#f6f6f6] focus:ring-0 focus:border-2 focus:border-main-600 focus:rounded placeholder:font-light placeholder:text-main-100"
                    />
                  </div>

                  <div className="mb-[15px] flex flex-col gap-y-[2px]">
                    <label htmlFor="" className="text-sm text-main-500">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="john.smith@example.com"
                      className="text-sm border-transparent border-2 text-main-600 w-full py-2 
                      px-[10px] bg-[#f6f6f6] focus:ring-0 focus:border-2 focus:border-main-600 focus:rounded placeholder:font-light placeholder:text-main-100"
                    />
                  </div>

                  <div className="mb-[15px] flex flex-col gap-y-[1px]">
                    <label htmlFor="" className="text-sm text-main-500">
                      Xếp hạng
                    </label>
                    <div className="star-rating flex items-center gap-x-[2px]">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={`${
                              index <= ((rating && hover) || hover)
                                ? "on text-[#f1b400]"
                                : "off text-[#ccc]"
                            } bg-transparent border-transparent outline-none cursor-pointer`}
                            onClick={() => setRating(index)}
                            onDoubleClick={() => {
                              setRating(0);
                              setHover(0);
                            }}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            <AiTwotoneStar size={15} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-[15px] flex flex-col gap-y-[2px]">
                    <label htmlFor="" className="text-sm text-main-500">
                      Tiêu đề đánh giá
                    </label>
                    <input
                      type="text"
                      placeholder="Đặt tiêu đề cho đánh giá của bạn"
                      className="text-sm border-transparent border-2 text-main-600 w-full py-2 
                      px-[10px] bg-[#f6f6f6] focus:ring-0 focus:border-2 focus:border-main-600 focus:rounded placeholder:font-light placeholder:text-main-100"
                    />
                  </div>

                  <div className="mb-[15px] flex flex-col gap-y-[2px]">
                    <label htmlFor="" className="text-sm text-main-500">
                      Nội dung đánh giá (1500)
                    </label>
                    <textarea
                      rows={10}
                      placeholder="Viết bình luận của bạn ở đây"
                      className="text-sm border-transparent border-2 text-main-600 w-full py-2 px-[10px] bg-[#f6f6f6] focus:ring-0 focus:border-2 focus:border-main-600 focus:rounded placeholder:font-light placeholder:text-main-100 h-full"
                    />
                  </div>

                  <div className="mb-[15px] flex flex-col items-end gap-y-[2px]">
                    <button className="bg-main-200 text-white text-sm py-[11px] px-[15px] uppercase hover:bg-main-600 hover:opacity-90 transition-all duration-150 ease-out">
                      Gửi đánh giá
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.1)]">
              <div className="mb-[14px]">
                <div className="flex items-center text-[#f1b400] mb-[6px] gap-x-1">
                  <AiTwotoneStar size={14} />
                  <AiTwotoneStar size={14} />
                  <AiTwotoneStar size={14} />
                  <AiTwotoneStar size={14} />
                  <AiTwotoneStar size={14} />
                </div>

                <h3 className="text-base font-semibold text-main-500">
                  Sản phẩm tốt
                </h3>
                <span className="flex text-sm gap-x-1 italic">
                  <strong>Tadatheme</strong>
                  vào
                  <strong>Tháng Năm 20, 2017</strong>
                </span>
              </div>

              <div className="text-sm text-main-500 mb-6">
                Bạn có thể tương tác với thực tế tăng cường bằng tai nghe và xem
                các vật thể 3D được "chiếu" vào thế giới thực của bạn -- thứ
                thường được gọi là "thực tế hỗn hợp". Tuy nhiên, thực tế tăng
                cường không cần tai nghe. Nó có thể sử dụng điện thoại của bạn.
                Trong thực tế, nó đã làm. Cú đánh thành công vào mùa hè năm 2016
                Pokemon Go là việc sử dụng AR rộng rãi nhất từng thấy.
              </div>

              <div className="text-main-200 text-[11px] text-right cursor-pointer hover:text-main-600">
                <span>Báo cáo là không phù hợp</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTabs;
