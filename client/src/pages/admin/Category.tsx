import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  fetchPaginatedCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  openModal,
  closeModal,
} from "../../store/reducers/categoriesSlice";
import Modal from "../../components/Admin/Modal"; // Component Modal để thêm/sửa danh mục
import { Category } from "../../interfaces/types";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const AdminCategoryList: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);
  const modalOpen = useSelector((state: any) => state.categories.modalOpen);
  const totalPages = useSelector((state: any) => state.categories.totalPages);

  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({});
  const [sortField, setSortField] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    dispatch(
      fetchPaginatedCategories({ page: currentPage, limit: ITEMS_PER_PAGE })
    );
  }, [dispatch, currentPage]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  const handleSaveCategory = () => {
    if (currentCategoryId !== null) {
      dispatch(updateCategory({ ...categoryForm, id: currentCategoryId }));
    } else {
      dispatch(addCategory(categoryForm));
    }
    dispatch(closeModal());
    setCategoryForm({});
    setCurrentCategoryId(null);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategoryId(category.id);
    setCategoryForm(category);
    dispatch(openModal());
  };

  const handleDeleteCategory = (id: number) => {
    dispatch(deleteCategory(id));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setCategoryForm({});
    setCurrentCategoryId(null);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredCategories = sortedCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const delta = 2; // Number of pages to display around the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pageButtons.push(
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              currentPage === i
                ? "bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }`}
          >
            {i}
          </a>
        );
      } else if (
        i === currentPage - delta - 1 ||
        i === currentPage + delta + 1
      ) {
        pageButtons.push(
          <span
            key={i}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
            ...
          </span>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="admin-category-list bg-gray-100 p-6">
      <div className="flex justify-between p-3 bg-slate-400">
        <h2 className="text-xl font-semibold mb-4">Danh sách danh mục</h2>
        <div className="w-3/5 flex justify-center">
          <label className="text-2xl p-3" htmlFor="search">
            <SearchOutlined />
          </label>
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2/3 h-12 border-black border-[1px] p-3"
            placeholder="Tìm kiếm"
          />
        </div>
        <button
          onClick={() => dispatch(openModal())}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Thêm danh mục
        </button>
      </div>
      {modalOpen && (
        <Modal>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên danh mục
            </label>
            <input
              type="text"
              name="name"
              value={categoryForm.name || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={handleSaveCategory}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Lưu
            </button>
            <button
              onClick={handleCloseModal}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Hủy
            </button>
          </div>
        </Modal>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th
                onClick={() => toggleSort("id")}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                ID{" "}
                {sortField === "id" &&
                  (sortDirection === "asc" ? (
                    <CaretUpOutlined className="ml-1" />
                  ) : (
                    <CaretDownOutlined className="ml-1" />
                  ))}
              </th>
              <th
                onClick={() => toggleSort("name")}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Tên danh mục{" "}
                {sortField === "name" &&
                  (sortDirection === "asc" ? (
                    <CaretUpOutlined className="ml-1" />
                  ) : (
                    <CaretDownOutlined className="ml-1" />
                  ))}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category: Category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditCategory(category)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">{renderPaginationButtons()}</div>
    </div>
  );
};

export default AdminCategoryList;
