import { useNavigate, useParams } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import clsx from "clsx";
import { useQueryString } from "../../../hooks/useQueryString";
import { generateSearchParamsURL } from "../../../utils/fn";

interface IPaginationProps {
  name: string | undefined;
  sort: string | undefined;
  price_filter_gte: string | undefined;
  price_filter_lte: string | undefined;
  brand: string | undefined;
  totalCount: number;
}

const Pagination = (props: IPaginationProps) => {
  const { name, sort, price_filter_gte, price_filter_lte, totalCount, brand } =
    props;
  const navigate = useNavigate();
  const pagination = usePagination(
    totalCount,
    1,
    import.meta.env.VITE_APP_LIMIT_PRODUCT_PER_PAGE
  );
  const { category } = useParams();
  const queryString = useQueryString();
  const page = Number(queryString.page) || 1;

  const handlePaginationUrl = (value: string | number) => {
    const isCategoryUrl: boolean = category ? true : false;
    const paginationUrl = generateSearchParamsURL({
      name,
      sort,
      price_filter_gte,
      price_filter_lte,
      brand,
      page: value as string,
      isCategory: isCategoryUrl,
      categoryUrlValue: category,
      isAdmin: false,
      adminUrlValue: "",
    });

    navigate(paginationUrl);
  };

  return (
    <div className="flex justify-center gap-x-[6px] font-medium text-base uppercase">
      {pagination?.map((item) => {
        const isActive = page === item;
        return (
          <div
            className={clsx(
              "hover:text-[#ee3131] w-5 h-5 p-4 rounded-full hover:bg-[rgba(0,0,0,0.4)] flex justify-center cursor-pointer",
              !Number(item) && "items-end",
              Number(item) && "items-center",
              isActive && "text-[#ee3131]"
            )}
            key={item as number}
            onClick={() => handlePaginationUrl(item as number)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
