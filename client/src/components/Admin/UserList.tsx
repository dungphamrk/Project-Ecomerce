import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  updateUser,
  deleteUser,
  openModal,
  closeModal,
  UserState,
  fetchPaginatedUsers, // Import UserState type
} from '../../store/reducers/userSlice'; // Update path to userSlice
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Modal from './Modal'; // Component Modal to edit user
import { User } from '../../interfaces/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: { users: UserState }) => state.users.users); // Adjust type of state
  
  const modalOpen = useSelector((state: { users: UserState }) => state.users.modalOpen); // Adjust type of state
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [userForm, setUserForm] = useState<any>({});
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const ITEMS_PER_PAGE = 7;

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
    setUserForm({});
    setCurrentUserId(null);
  };

  const handleEditUser = (user: any) => {
    setCurrentUserId(user.id);
    setUserForm(user);
    dispatch(openModal());
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setUserForm({});
    setCurrentUserId(null);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  console.log(users);
  
  const sortedUsers = [...users].sort((a: User, b: User) => {
    if (a[sortField as keyof User] < b[sortField as keyof User]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField as keyof User] > b[sortField as keyof User]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user:User) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
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
              value={userForm.username || ''}
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
              value={userForm.email || ''}
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
              value={userForm.fullname || ''}
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
              value={userForm.status || ''}
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
              value={userForm.password || ''}
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
              value={userForm.role || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="true">Quản trị viên</option>
              <option value="false">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hình đại diện
            </label>
            <input
              type="text"
              name="avatar"
              value={userForm.avatar || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={userForm.phone || ''}
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
              value={userForm.address || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div>
            <button
              onClick={handleSaveUser}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              {currentUserId ? 'Cập nhật' : 'Thêm mới'}
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Đóng
            </button>
          </div>
        </Modal>
      )}
      <table className="min-w-full bg-white border-collapse border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th
              className="border border-gray-300 px-4 py-2"
              onClick={() => toggleSort('id')}
            >
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                ID
                <div className="flex flex-col">
                  <CaretUpOutlined
                    className={
                      sortField === 'id' && sortDirection === 'asc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                  <CaretDownOutlined
                    className={
                      sortField === 'id' && sortDirection === 'desc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                </div>
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 relative"
              onClick={() => toggleSort('username')}
            >
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                Tên đăng nhập
                <div className="flex flex-col">
                  <CaretUpOutlined
                    className={
                      sortField === 'username' && sortDirection === 'asc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                  <CaretDownOutlined
                    className={
                      sortField === 'username' && sortDirection === 'desc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                </div>
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 relative"
              onClick={() => toggleSort('email')}
            >
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                Email
                <div className="flex flex-col">
                  <CaretUpOutlined
                    className={
                      sortField === 'email' && sortDirection === 'asc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                  <CaretDownOutlined
                    className={
                      sortField === 'email' && sortDirection === 'desc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                </div>
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 relative"
              onClick={() => toggleSort('fullname')}
            >
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                Họ và tên
                <div className="flex flex-col">
                  <CaretUpOutlined
                    className={
                      sortField === 'fullname' && sortDirection === 'asc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                  <CaretDownOutlined
                    className={
                      sortField === 'fullname' && sortDirection === 'desc'
                        ? ''
                        : 'text-gray-400'
                    }
                  />
                </div>
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.fullname}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        {renderPaginationButtons()}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default UserList;
