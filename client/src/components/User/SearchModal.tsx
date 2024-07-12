import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../interfaces/types";
import { getAllProduct } from "../../store/reducers/productsSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  closeModal: () => void;
}
const SearchModal: React.FC<SearchModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  const products: Product[] = useSelector(
    (state: any) => state.products.products
  );

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  const navigate=useNavigate();
  const [query, setQuery] = useState("");

  const filteredData = query
    ? products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 flex items-start justify-center bg-gray-800 bg-opacity-75"
      onClick={closeModal}
    >
      <div
        className="bg-white p-4 rounded-lg mt-10 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            placeholder="Find anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="h-6 w-6 absolute right-3 top-3 text-gray-400">
            {" "}
            <MagnifyingGlassIcon />
          </span>
        </div>
        {filteredData.length > 0 && (
          <div className="max-h-64 overflow-y-auto rounded-lg shadow-md">
            {filteredData.map((item, index) => (
              <div
                key={index}
                onClick={()=>{navigate(`/products/${item.id}`)}}
                className="flex justify-between p-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="text-base text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-500">{item.category}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
