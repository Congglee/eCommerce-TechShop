import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetMonthlySaleQuery } from "../../../features/order/order.services";

const Chart = () => {
  const { data: monthlySalesData, isFetching } = useGetMonthlySaleQuery();

  const [sales, setSales] = useState<
    {
      day: string;
      amount: number;
    }[]
  >([]);

  useEffect(() => {
    if (monthlySalesData && monthlySalesData.monthlySalesOrders.length >= 2) {
      const newData = monthlySalesData.monthlySalesOrders.map((item) => {
        const MONTHS = [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ];

        return {
          day: MONTHS[item._id - 1],
          amount: item.total / 100,
        };
      });
      setSales(newData);
    }
  }, [monthlySalesData]);

  return (
    <div className="w-full h-[320px] mt-[2rem] p-[1rem] border-2 border-[rgba(48,51,78,0.2)] rounded-[5px] text-sm">
      {isFetching && <div className="mt-[2rem]">Loading ...</div>}

      {!isFetching && (
        <>
          <h3 className="mb-[1rem]">Thu nhập các tháng (VN vnd)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default Chart;
