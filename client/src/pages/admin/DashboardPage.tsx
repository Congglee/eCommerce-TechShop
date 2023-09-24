import { useEffect, useState } from "react";
import { useGetUsersStatsQuery } from "../../features/user/user.services";
import icons from "../../utils/icons";
import {
  useGetOrdersIncomeQuery,
  useGetOrdersStatsQuery,
} from "../../features/order/order.services";
import { formatCurrency } from "../../utils/fn";
import { Chart } from "../../components/admin";
import { useGetProductsQuery } from "../../features/product/product.services";

const {
  AiOutlineUser,
  TfiStatsUp,
  TfiStatsDown,
  FaMoneyBill,
  AiOutlineAreaChart,
  FaLaptop,
} = icons;

const Dashboard = () => {
  const { data: usersStatsData } = useGetUsersStatsQuery();
  const { data: productsData } = useGetProductsQuery({});
  const [sortedUsers, setSortedUsers] = useState<
    { _id: number; total: number }[]
  >([]);
  const [usersPerc, setUsersPerc] = useState(0);

  const { data: ordersStatsData } = useGetOrdersStatsQuery();
  const [sortedOrders, setSortedOrders] = useState<
    { _id: number; total: number }[]
  >([]);
  const [ordersPerc, setOrdersPerc] = useState(0);

  const { data: ordersIncomeData } = useGetOrdersIncomeQuery();
  const [sortedOrdersIncome, setSortedOrdersIncome] = useState<
    { _id: number; total: number }[]
  >([]);
  const [ordersIncomePerc, setOrdersIncomePerc] = useState(0);

  const compare = (a: any, b: any) => {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    return 0;
  };

  useEffect(() => {
    if (usersStatsData && usersStatsData.users.length >= 2) {
      const users = [...usersStatsData.users];
      users.sort(compare);
      setSortedUsers(users);

      const percentage =
        ((users[0].total - users[1].total) / users[1].total) * 100;
      setUsersPerc(percentage);
    }
  }, [usersStatsData]);

  useEffect(() => {
    if (ordersStatsData && ordersStatsData.orders.length >= 2) {
      const orders = [...ordersStatsData.orders];
      orders.sort(compare);
      setSortedOrders(orders);

      const percentage =
        ((orders[0].total - orders[1].total) / orders[1].total) * 100;
      setOrdersPerc(percentage);
    }
  }, [ordersStatsData]);

  useEffect(() => {
    if (ordersIncomeData && ordersIncomeData.ordersIncome.length >= 2) {
      const ordersIncome = [...ordersIncomeData.ordersIncome];
      ordersIncome.sort(compare);
      setSortedOrdersIncome(ordersIncome);

      const percentage =
        ((ordersIncome[0].total - ordersIncome[1].total) /
          ordersIncome[1].total) *
        100;
      setOrdersIncomePerc(percentage);
    }
  }, [ordersIncomeData]);

  return (
    <>
      <div className="grid tablet:grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 mb-4">
        <div className="rounded-lg border-2 border-gray-500 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sản phẩm</p>
              <p className="text-2xl font-medium text-gray-900">
                {productsData?.products.length}
              </p>
            </div>

            <span className="rounded-full bg-blue-100 p-3 text-blue-600">
              <FaLaptop size={20} />
            </span>
          </div>
        </div>

        <div className="rounded-lg border-2 border-gray-500 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Khách hàng</p>
              <p className="text-2xl font-medium text-gray-900">
                {sortedUsers[0]?.total}
              </p>
            </div>
            <span className="rounded-full bg-blue-100 p-3 text-blue-600">
              <AiOutlineUser size={20} />
            </span>
          </div>

          <div
            className={`mt-1 flex gap-1 ${
              usersPerc > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {usersPerc > 0 ? (
              <TfiStatsUp size={16} />
            ) : (
              <TfiStatsDown size={16} />
            )}

            <p className="flex gap-2 text-xs">
              <span className="font-medium"> {usersPerc}% </span>
              <span className="text-gray-500"> Kể từ tháng trước </span>
            </p>
          </div>
        </div>

        <div className="rounded-lg border-2 border-gray-500 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Đơn hàng</p>
              <p className="text-2xl font-medium text-gray-900">
                {sortedOrders[0]?.total}
              </p>
            </div>
            <span className="rounded-full bg-blue-100 p-3 text-blue-600">
              <FaMoneyBill size={20} />
            </span>
          </div>

          <div
            className={`mt-1 flex gap-1 ${
              ordersPerc > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {ordersPerc > 0 ? (
              <TfiStatsUp size={16} />
            ) : (
              <TfiStatsDown size={16} />
            )}

            <p className="flex gap-2 text-xs">
              <span className="font-medium"> {ordersPerc}% </span>
              <span className="text-gray-500"> Kể từ tháng trước </span>
            </p>
          </div>
        </div>

        <div className="rounded-lg border-2 border-gray-500 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Thu nhập</p>
              <p className="text-2xl font-medium text-gray-900">
                {sortedOrdersIncome[0]?.total
                  ? formatCurrency(sortedOrdersIncome[0]?.total)
                  : ""}
              </p>
            </div>
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 flex-shrink-0">
              <AiOutlineAreaChart size={20} />
            </span>
          </div>

          <div
            className={`mt-1 flex gap-1 ${
              ordersIncomePerc > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {ordersIncomePerc > 0 ? (
              <TfiStatsUp size={16} />
            ) : (
              <TfiStatsDown size={16} />
            )}

            <p className="flex gap-2 text-xs">
              <span className="font-medium">
                {" "}
                {ordersIncomePerc.toFixed(2)}%{" "}
              </span>
              <span className="text-gray-500"> Kể từ tháng trước </span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
        <Chart />
      </div>
      {/* <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 ipad:h-72"></div>
        <div className="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 ipad:h-72" />
      </div> */}
    </>
  );
};

export default Dashboard;
