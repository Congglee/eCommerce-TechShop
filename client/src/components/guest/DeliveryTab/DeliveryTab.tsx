import React from "react";

type Props = {};

const DeliveryTab = (props: Props) => {
  return (
    <>
      <h2 className="font-semibold text-xl uppercase text-main-500 mb-[10px]">
        MUA HÀNG & GIAO HÀNG
      </h2>

      <p className="mb-[10px] text-sm text-main-500">
        Trước khi mua hàng, bạn nên biết số đo của khu vực bạn định đặt đồ nội
        thất. Bạn cũng nên đo bất kỳ ô cửa và hành lang nào mà đồ nội thất sẽ đi
        qua để đến đích cuối cùng.
        <span className="text-xs text-main-500">Nhận tại cửa hàng</span>
      </p>

      <p className="mb-[10px] text-sm text-main-500">
        Shopify Shop yêu cầu tất cả các sản phẩm phải được kiểm tra kỹ lưỡng
        TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất ngờ nào xảy ra. Nhóm
        của chúng tôi sẵn lòng mở tất cả các gói hàng và sẽ hỗ trợ trong quá
        trình kiểm tra. Sau đó chúng tôi sẽ niêm phong lại các kiện hàng để vận
        chuyển an toàn. Chúng tôi khuyến khích tất cả khách hàng mang theo miếng
        đệm hoặc chăn để bảo vệ đồ đạc trong quá trình vận chuyển cũng như dây
        thừng hoặc dây buộc. Shopify Shop sẽ không chịu trách nhiệm đối với hư
        hỏng xảy ra sau khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển.
        Người mua có trách nhiệm đảm bảo chọn đúng mặt hàng và ở tình trạng tốt.
        <span className="text-xs text-main-500">Vận chuyển</span>
      </p>

      <p className="text-sm text-main-500">
        Khách hàng có thể chọn ngày giao hàng có sẵn tiếp theo phù hợp nhất với
        lịch trình của họ. Tuy nhiên, để định tuyến các điểm dừng hiệu quả nhất
        có thể, Shopify Shop sẽ cung cấp khung thời gian. Khách hàng sẽ không
        được chọn thời gian. Bạn sẽ được thông báo trước về khung thời gian đã
        lên lịch của mình. Vui lòng đảm bảo rằng một người lớn có trách nhiệm
        (18 tuổi trở lên) sẽ ở nhà vào thời điểm đó. Để chuẩn bị cho việc giao
        hàng của bạn, vui lòng loại bỏ đồ nội thất, tranh ảnh, gương, phụ kiện,
        v.v. hiện có để tránh hư hỏng. Ngoài ra, hãy đảm bảo rằng khu vực mà bạn
        muốn đặt đồ đạc của mình không có bất kỳ đồ nội thất cũ nào và bất kỳ
        vật dụng nào khác có thể cản trở lối đi của đội giao hàng. Cửa hàng
        Shopify sẽ giao hàng, lắp ráp và bố trí việc mua đồ nội thất mới của
        bạn, đồng thời chuyển tất cả vật liệu đóng gói ra khỏi nhà bạn. Đội giao
        hàng của chúng tôi không được phép di chuyển đồ nội thất hiện có của bạn
        hoặc các vật dụng gia đình khác. Nhân viên giao hàng sẽ cố gắng giao các
        mặt hàng đã mua một cách an toàn và có kiểm soát nhưng sẽ không cố gắng
        đặt đồ đạc nếu họ cảm thấy việc đó sẽ gây hư hại cho sản phẩm hoặc nhà
        của bạn. Nhân viên giao hàng không thể mở cửa, cẩu đồ đạc hoặc mang đồ
        đạc lên quá 3 tầng cầu thang. Phải có thang máy để giao hàng từ tầng 4
        trở lên.
      </p>
    </>
  );
};

export default DeliveryTab;
