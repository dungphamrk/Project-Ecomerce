import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  openModal,
  closeModal,
  ProductState,
} from "../../store/reducers/productsSlice";
import Modal from "./Modal"; // Component Modal để thêm/sửa sản phẩm
import { Product } from "../../interfaces/types";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";

const AdminProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const modalOpen = useSelector((state: any) => state.products.modalOpen);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [sortField, setSortField] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage,setCurrentPage]=useState<number>(1);
  const pages:number[]=[];
  useEffect(() => {
    dispatch(fetchProducts());
    products.map((element:ProductState,index:number)=>{
      for (let i = 1; i < index+1; i++) {
        pages.push(i);
      }
    })
  }, [dispatch]);
  const loadData=()=>{
    axios.get(`http://localhost:3000/products?_page=${currentPage}&_per_page=2`)
    .then(res=>{
        setStudents(res.data.data);
        setTotalPages(res.data.pages); 
        setTotalItem(res.data.items);         
    })
    .catch(err=>console.log(err)
    )
}
useEffect(()=>{
    
    loadData();
},[currentPage]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleSaveProduct = () => {
    if (currentProductId !== null) {
      dispatch(updateProduct({ ...productForm, id: currentProductId }));
    } else {
      dispatch(addProduct(productForm));
    }
    dispatch(closeModal());
    setProductForm({});
    setCurrentProductId(null);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProductId(product.id);
    setProductForm(product);
    dispatch(openModal());
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setProductForm({});
    setCurrentProductId(null);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    console.log(12345678123>1111111111111111);
    
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-product-list bg-gray-100 p-6">
      <div className="flex justify-between p-3 bg-slate-400">
        <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
        <div className="w-3/5 flex justify-center">
          <label className="text-2xl p-3" htmlFor="search">
            <SearchOutlined />
          </label>
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-2/3 h-12 border-black border-[1px] p-3"
            placeholder="Tìm kiếm"
          />
        </div>
        <button
          onClick={() => dispatch(openModal())}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Thêm sản phẩm
        </button>
      </div>
      {modalOpen && (
        <Modal>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={productForm.name || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Giá
            </label>
            <input
              type="number"
              name="price"
              value={productForm.price || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div>
            <button
              onClick={handleSaveProduct}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              {currentProductId ? "Cập nhật" : "Thêm mới"}
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
              onClick={() => toggleSort("id")}
            >
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                ID
                <div className="flex flex-col">
                  <CaretUpOutlined
                    className={sortField === "id" && sortDirection === "asc" ? "" : "text-gray-400"}
                  />
                  <CaretDownOutlined
                    className={sortField === "id" && sortDirection === "desc" ? "" : "text-gray-400"}
                  />
                </div>
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 relative"
              onClick={() => toggleSort("name")}
            >
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                Tên sản phẩm
                <div className="flex flex-col">
                  <CaretUpOutlined
                    className={sortField === "name" && sortDirection === "asc" ? "" : "text-gray-400"}
                  />
                  <CaretDownOutlined
                    className={sortField === "name" && sortDirection === "desc" ? "" : "text-gray-400"}
                  />
                </div>
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 relative"
              onClick={() => toggleSort("price")}
            >
              <div className="flex justify-center gap-2 items-center cursor-pointer">
                Giá
                <div className="flex flex-col">
                  <CaretUpOutlined
                    className={sortField === "price" && sortDirection === "asc" ? "" : "text-gray-400"}
                  />
                  <CaretDownOutlined
                    className={sortField === "price" && sortDirection === "desc" ? "" : "text-gray-400"}
                  />
                </div>
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product: Product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
