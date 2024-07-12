 export interface Product {
    id: number;
    name: string;
    price: number;
    description:string;
    quantity:number;
    image:string;
    category:string;
    created_at: string;      // Thời gian được tạo (format dd/mm/yyyy)
    updated_at: string;      // Thời gian cập nhật gần nhất (format dd/mm/yyyy)
  }
export  interface User {
    id: number;               // ID người dùng
    username: string;        // Tên đăng nhập
    email: string;           // Email
    fullname: string;        // Họ và tên
    status: boolean;         // Trạng thái người dùng (True - Active, False - Block)
    password: string;        // Mật khẩu
    role: boolean;           // Vai trò (True - Quản trị viên, False - User)
    avatar: string;          // Hình đại diện
    phone: string;           // Số điện thoại
    address: string;         // Địa chỉ
    created_at: string;      // Thời gian được tạo (format dd/mm/yyyy)
    updated_at: string;      // Thời gian cập nhật gần nhất (format dd/mm/yyyy)
  }
export interface Category{
  id: number;
  name:string;
  status:boolean
  }