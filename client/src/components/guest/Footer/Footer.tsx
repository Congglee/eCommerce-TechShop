import icons from "../../../utils/icons";

const {
  BiLogoFacebook,
  BiLogoGoogle,
  BiLogoInstagramAlt,
  BiLogoPinterest,
  BiLogoTwitter,
  BsFillTelephoneFill,
  GiPositionMarker,
  GrMail,
} = icons;

const UserFooter = () => {
  return (
    <div>
      <div className="bg-main-200">
        <div className="py-[25px] max-w-[1220px] mx-auto px-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
          <div className="text-white w-1/2 md:mb-[15px] md:w-full">
            <div className="text-xl uppercase">
              ĐĂNG KÝ ĐỂ NHẬN TIN MỚI NHẤT
            </div>
            <div className="text-[13px]">
              Đăng ký ngay bây giờ và nhận tin hàng tuần
            </div>
          </div>

          <form className="relative w-1/2 md:w-full">
            <input
              type="text"
              placeholder="Địa chỉ email"
              className="px-5 py-4 outline-none text-white rounded-[30px] w-full pr-12 border-none border-0 text-sm bg-[rgba(255,255,255,.1)] placeholder:text-main-700 placeholder:opacity-50"
            />
            <button className="absolute w-5 h-5 right-5 top-1/2 translate-y-[-50%] text-white">
              <GrMail />
            </button>
          </form>
        </div>
      </div>

      <div className="bg-[#191919]">
        <div className="py-[50px] max-w-[1220px] mx-auto px-5 flex justify-between gap-x-5 md:flex-col md:items-start md:gap-y-[10px]">
          <div className="basis-1/3 flex-shrink-0">
            <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-main-200 after:top-0 after:left-0">
              VỀ CHÚNG TÔI
            </div>

            <div className="text-white mb-5">
              <div className="text-[13px] mb-[10px] flex items-center">
                <GiPositionMarker size={16} />
                <span className="pl-2">
                  Địa chỉ:
                  <span className="text-[#b7b7b7] pl-1">
                    474 Ontario St Toronto, ON M4X 1M7 Canada
                  </span>
                </span>
              </div>

              <div className="text-[13px] mb-[10px] flex items-center">
                <BsFillTelephoneFill size={16} />
                <span className="pl-2">
                  Điện thoại:
                  <span className="text-[#b7b7b7] pl-1">(+1234)56789xxx</span>
                </span>
              </div>

              <div className="text-[13px] mb-[10px] flex items-center">
                <GrMail />
                <span className="pl-2">
                  Mail:
                  <span className="text-[#b7b7b7] pl-1">
                    congltph27602@fpt.edu.vn
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-row gap-x-[7px] text-base text-white md:mb-[5px]">
              <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                <BiLogoFacebook />
              </div>
              <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                <BiLogoTwitter />
              </div>
              <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                <BiLogoPinterest />
              </div>
              <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                <BiLogoGoogle />
              </div>
              <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                <BiLogoInstagramAlt />
              </div>
            </div>
          </div>

          <div className="basis-1/6 flex-grow">
            <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-main-200 after:top-0 after:left-0">
              THÔNG TIN
            </div>

            <div className="text-[#b7b7b7] text-[13px]">
              <div className="mb-[10px]">Bộ sưu tập</div>
              <div className="mb-[10px]">Vị trí cửa hàng</div>
              <div className="mb-[10px]">Ưu đãi hôm nay</div>
              <div className="mb-[10px]">Liên hệ</div>
            </div>
          </div>

          <div className="basis-1/6 flex-grow">
            <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-main-200 after:top-0 after:left-0">
              CHÚNG TÔI LÀ AI
            </div>

            <div className="text-[#b7b7b7] text-[13px]">
              <div className="mb-[10px]">Trợ giúp</div>
              <div className="mb-[10px]">Miễn phí vận chuyển</div>
              <div className="mb-[10px]">FAQs</div>
              <div className="mb-[10px]">Chứng thực</div>
              <div className="mb-[10px]">Chính sách đổi trả</div>
            </div>
          </div>

          <div className="basis-1/6 flex-grow">
            <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-main-200 after:top-0 after:left-0">
              #DIGITALWORLDSTORE
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f0f0f] py-5">
        <div className="max-w-[1220px] mx-auto px-5">
          <span className="text-white">Powered by congltph27602</span>
        </div>
      </div>
    </div>
  );
};

export default UserFooter;
