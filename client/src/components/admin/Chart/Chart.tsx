import React, { useEffect, useState } from "react";
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
import { useGetOneWeekSaleQuery } from "../../../features/order/order.services";

type Props = {};

const Chart = (props: Props) => {
  const { data: oneWeekSalesData, isFetching } = useGetOneWeekSaleQuery();

  const [sales, setSales] = useState<
    {
      day: string;
      amount: number;
    }[]
  >([]);

  const compare = (a: any, b: any) => {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    return 0;
  };

  useEffect(() => {
    if (oneWeekSalesData && oneWeekSalesData.weekSalesOrders.length >= 2) {
      const oneWeekSalesOrders = [...oneWeekSalesData.weekSalesOrders];
      oneWeekSalesOrders.sort(compare);

      const newData = oneWeekSalesData.weekSalesOrders.map((item) => {
        const DAYS = [
          "Chủ nhật",
          "Thứ hai",
          "Thứ ba",
          "Thứ tư",
          "Thứ năm",
          "Thứ sáu",
          "Thứ bảy",
        ];

        return {
          day: DAYS[item._id - 1],
          amount: item.total / 100,
        };
      });
      setSales(newData);
    }
  }, [oneWeekSalesData]);

  return (
    <div className="w-full h-[320px] mt-[2rem] p-[1rem] border-2 border-[rgba(48,51,78,0.2)] rounded-[5px] text-sm">
      {isFetching && <div className="mt-[2rem]">Loading Chart ...</div>}

      {!isFetching && (
        <>
          <h3 className="mb-[1rem]">Thu nhập 7 ngày qua (VN vnd)</h3>
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
