import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  updateUser,
  deleteUser,
  openModal,
  closeModal,
  fetchPaginatedUsers,
  UserState,
} from "../../store/reducers/userSlice";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Modal from "../../components/Admin/Modal";
import { User } from "../../interfaces/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const totalPages = useSelector(
    (state: { users: UserState }) => state.users.totalPages
  );

  const modalOpen = useSelector(
    (state: { users: UserState }) => state.users.modalOpen
  );
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [userForm, setUserForm] = useState<User>({
    id: 0,
    username: "",
    email: "",
    fullname: "",
    status: false,
    password: "",
    role: false,
    avatar: "",
    phone: "",
    address: "",
    created_at: "",
    updated_at: "",
  });
  const [sortField, setSortField] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 7;
  console.log(111);
  

  useEffect(() => {
    dispatch(fetchPaginatedUsers({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [dispatch, currentPage]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSaveUser = () => {
    if (currentUserId !== null) {
      dispatch(updateUser({ ...userForm, id: currentUserId }));
    }
    dispatch(closeModal());
    setUserForm({} as User);
    setCurrentUserId(null);
  };

  const handleEditUser = (user: User) => {
    setCurrentUserId(user.id);
    setUserForm(user);
    dispatch(openModal());
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setUserForm({} as User);
    setCurrentUserId(null);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a: User, b: User) => {
    if (a[sortField as keyof User] < b[sortField as keyof User])
      return sortDirection === "asc" ? -1 : 1;
    if (a[sortField as keyof User] > b[sortField as keyof User])
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user: User) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const delta = 2;

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
    <div className="admin-user-list bg-gray-100 p-6">
      <div className="flex justify-between p-3 bg-slate-400">
        <h2 className="text-xl font-semibold mb-4">Danh sách người dùng</h2>
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
      </div>
      {modalOpen && (
        <Modal>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={userForm.username || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userForm.email || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullname"
              value={userForm.fullname || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái người dùng
            </label>
            <select
              name="status"
              value={userForm.status ? "true" : "false"}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="true">Active</option>
              <option value="false">Block</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={userForm.password || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vai trò
            </label>
            <select
              name="role"
              value={userForm.role ? "true" : "false"}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="true">Admin</option>
              <option value="false">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={userForm.phone || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={userForm.address || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleSaveUser}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </Modal>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white">
          <table className="min-w-full divide-y divide-gray-300">
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
                  onClick={() => toggleSort("username")}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Tên đăng nhập{" "}
                  {sortField === "username" &&
                    (sortDirection === "asc" ? (
                      <CaretUpOutlined className="ml-1" />
                    ) : (
                      <CaretDownOutlined className="ml-1" />
                    ))}
                </th>
                <th
                  onClick={() => toggleSort("email")}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Email{" "}
                  {sortField === "email" &&
                    (sortDirection === "asc" ? (
                      <CaretUpOutlined className="ml-1" />
                    ) : (
                      <CaretDownOutlined className="ml-1" />
                    ))}
                </th>
                <th
                  onClick={() => toggleSort("fullname")}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Họ và tên{" "}
                  {sortField === "fullname" &&
                    (sortDirection === "asc" ? (
                      <CaretUpOutlined className="ml-1" />
                    ) : (
                      <CaretDownOutlined className="ml-1" />
                    ))}
                </th>
                <th
                  onClick={() => toggleSort("status")}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Trạng thái người dùng{" "}
                  {sortField === "status" &&
                    (sortDirection === "asc" ? (
                      <CaretUpOutlined className="ml-1" />
                    ) : (
                      <CaretDownOutlined className="ml-1" />
                    ))}
                </th>
                <th
                  onClick={() => toggleSort("role")}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Vai trò{" "}
                  {sortField === "role" &&
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
              {filteredUsers.map((user: User) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`${
                        user.status
                          ? "inline-block px-3 py-2 bg-green-200 text-green-800 rounded-lg"
                          : "inline-block px-3 py-2 bg-red-200 text-red-800 rounded-lg"
                      }`}
                    >
                      {user.status ? "Active" : "Block"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={`inline-block px-2 py-1 rounded-lg ${
                        user.role
                          ? "bg-green-300 text-green-800"
                          : "bg-yellow-300 text-yellow-800"
                      }`}
                    
                    >
                      {user.role ? "Admin" : "User"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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
        <div className="flex justify-between p-3 bg-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Trang {currentPage} / {totalPages}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              } px-3 py-2 rounded-l-md`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              } px-3 py-2 rounded-r-md`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
