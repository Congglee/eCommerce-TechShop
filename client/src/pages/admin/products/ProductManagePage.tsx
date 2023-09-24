import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icons from "../../../utils/icons";
import {
  AdminBrandFilter,
  AdminPagination,
  AdminSearch,
  AdminSortFilter,
  ProductLoadingRow,
} from "../../../components/admin";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../features/product/product.services";
import {
  formatCurrency,
  formatDate,
  generateSearchParamsURL,
} from "../../../utils/fn";
import { ICategory } from "../../../interfaces/category.interface";
import { useQueryString } from "../../../hooks/useQueryString";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrandFilter,
  setSeletedSort,
} from "../../../features/product/product.slice";
import { useGetBrandsQuery } from "../../../features/brand/brand.services";
import { RootState } from "../../../store/store";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useOutsideClickHandler from "../../../hooks/useOutsiteClickHandle";

const { BiBookAdd, AiFillStar } = icons;

const ProductManagePage = () => {
  const queryString: {
    name?: string;
    sort?: string;
    brand?: string;
    page?: string;
  } = useQueryString();
  const { name, sort, brand, page } = queryString;
  const [isShowBrandFilter, setIsShowBrandFilter] = useState(false);
  const { brandFilter } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const productsPath = path[path.length - 1];
  const productOptionsSort = [
    {
      label: "Theo tên, A - Z",
      value: "name",
    },
    {
      label: "Theo tên, Z - A",
      value: "-name",
    },
    {
      label: "Giá, tăng dần",
      value: "price",
    },
    {
      label: "Giá, giảm dần",
      value: "-price",
    },
    {
      label: "Đánh giá, tăng dần",
      value: "totalRatings",
    },
    {
      label: "Đánh giá, giảm dần",
      value: "-totalRatings",
    },
    {
      label: "Ngày cập nhật, xa nhất",
      value: "updatedAt",
    },
    {
      label: "Ngày cập nhật, gần nhất",
      value: "-updatedAt",
    },
  ];

  const brandFilterRef = useRef<HTMLDivElement | null>(null);
  useOutsideClickHandler(brandFilterRef, () => {
    setIsShowBrandFilter(false);
  });

  const { data: productsData, isFetching } = useGetProductsQuery({
    name: name || "",
    sort: sort || "",
    brand: brand || "",
    page: page || 1,
    limit: import.meta.env.VITE_APP_LIMIT_ADMIN_PER_PAGE || 8,
  });
  const { data: brandsData } = useGetBrandsQuery({});
  const [deleteProduct, deleteProductResult] = useDeleteProductMutation();

  const handleDeleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa sản phẩm này",
      text: "Bạn có chắc là muốn xóa sản phẩm này không ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Không",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
    });

    if (result.isConfirmed) {
      deleteProduct(id);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement).searchInput.value;
    const searchUrl = generateSearchParamsURL({
      name: inputValue,
      sort,
      price_filter_gte: "",
      price_filter_lte: "",
      brand,
      page,
      isCategory: false,
      categoryUrlValue: "",
      isAdmin: true,
      adminUrlValue: productsPath,
    });
    navigate(searchUrl);
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setSeletedSort(value));
    const sortUrl = generateSearchParamsURL({
      name,
      sort: value,
      price_filter_gte: "",
      price_filter_lte: "",
      brand,
      page,
      isCategory: false,
      categoryUrlValue: "",
      isAdmin: true,
      adminUrlValue: productsPath,
    });
    navigate(sortUrl);
  };

  const handleChangeFilterBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedBrands = [...brandFilter];

    if (checked) updatedBrands.push(value);
    else updatedBrands = updatedBrands.filter((brand) => brand !== value);
    dispatch(setBrandFilter(updatedBrands));

    const brandFilterUrl = generateSearchParamsURL({
      name,
      sort,
      price_filter_gte: "",
      price_filter_lte: "",
      brand: updatedBrands.join(","),
      page,
      isCategory: false,
      categoryUrlValue: "",
      isAdmin: true,
      adminUrlValue: productsPath,
    });

    navigate(brandFilterUrl);
  };

  useEffect(() => {
    return () => {
      dispatch(setBrandFilter([]));
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteProductResult.isSuccess) {
      toast.success(deleteProductResult.data.message);
    }
  }, [deleteProductResult.isSuccess]);

  useEffect(() => {
    if (deleteProductResult.isError) {
      toast.error((deleteProductResult.error as any).data.message);
    }
  }, [deleteProductResult.isError]);

  return (
    <div className="relative overflow-hidden shadow-md tablet:rounded-lg">
      <div className="flex flex-col laptop:flex-row items-center gap-y-3 justify-between space-y-3 ipad:space-y-0 ipad:space-x-4 p-4 bg-white dark:bg-gray-900">
        <div className="w-full ipad:w-auto flex flex-col ipad:flex-row space-y-2 ipad:space-y-0 items-center ipad:items-stretch justify-end ipad:space-x-2 flex-shrink-0">
          <Link
            to="create"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-2.5 gap-x-2"
          >
            <BiBookAdd size={20} />
            <span>Thêm mới</span>
          </Link>

          <AdminSortFilter
            handleChangeSort={handleChangeSort}
            options={productOptionsSort}
          />

          <AdminBrandFilter
            brandFilterRef={brandFilterRef}
            setIsShowBrandFilter={setIsShowBrandFilter}
            isShowBrandFilter={isShowBrandFilter}
            brandsData={brandsData?.brands}
            handleChangeFilterBrand={handleChangeFilterBrand}
            brandFilter={brandFilter}
          />
        </div>

        <AdminSearch
          placeHolder="Tìm kiếm sản phẩm"
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                #
              </th>
              <th scope="col" className="px-4 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-4 py-3">
                Ảnh
              </th>
              <th scope="col" className="px-4 py-3">
                Giá
              </th>
              <th scope="col" className="px-4 py-3">
                Số lượng
              </th>
              <th scope="col" className="px-4 py-3">
                Đã bán
              </th>
              <th scope="col" className="px-4 py-3">
                Đánh giá
              </th>
              <th scope="col" className="px-4 py-3">
                Thương hiệu
              </th>
              <th scope="col" className="px-4 py-3">
                Danh mục
              </th>
              <th scope="col" className="px-4 py-3">
                Cập nhật vào
              </th>

              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isFetching &&
              [...Array(3)].map((_, index) => (
                <ProductLoadingRow key={index} />
              ))}

            {!isFetching &&
              productsData?.products.map((product, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={product._id}
                >
                  <td className="px-4 py-3 text-base font-semibold text-white">
                    {page
                      ? (Number(page) - 1) *
                          import.meta.env.VITE_APP_LIMIT_ADMIN_PER_PAGE +
                        index +
                        1
                      : index + 1}
                  </td>

                  <td className="px-4 py-3 text-white">{product.name}</td>
                  <td className="px-4 py-3 text-white">
                    <div className="w-24 h-24">
                      <img
                        className="w-full h-full object-cover"
                        src={product.thumb as string}
                        alt="Jese image"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-4 py-3 text-white">{product.quantity}</td>

                  <td className="px-4 py-3 text-white">{product.sold}</td>
                  <td className="px-4 py-3 text-white">
                    <div className="flex items-center gap-x-2 gap-y-2 flex-row">
                      <span>{product.totalRatings}</span>
                      <div className="text-yellow-400">
                        <AiFillStar size={16} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">{product.brand}</td>
                  <td className="px-4 py-3 text-white">
                    {(product.category as ICategory).name}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {formatDate(product.updatedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-x-2">
                      <Link to={`update/${product._id}`}>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm  text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Sửa
                          </span>
                        </button>
                      </Link>

                      <button
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Xóa
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AdminPagination
        name={name}
        sort={sort}
        totalData={productsData?.products.length as number}
        totalCount={productsData?.totalProduct as number}
        brand={brand}
        adminPath={productsPath}
      />
    </div>
  );
};

export default ProductManagePage;
