import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col items-center text-center group">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform"><Package size={32} /></div>
          <h2 className="text-xl font-bold text-slate-800">Manage Products</h2>
          <p className="text-slate-500 text-sm mt-2">Add, edit, or delete inventory</p>
        </Link>
        <Link to="/admin/orders" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:emerald-200 transition-all flex flex-col items-center text-center group">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform"><ShoppingBag size={32} /></div>
          <h2 className="text-xl font-bold text-slate-800">Manage Orders</h2>
          <p className="text-slate-500 text-sm mt-2">View and update order status</p>
        </Link>
        <Link to="/admin/users" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:purple-200 transition-all flex flex-col items-center text-center group">
          <div className="bg-purple-50 text-purple-600 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform"><Users size={32} /></div>
          <h2 className="text-xl font-bold text-slate-800">Manage Users</h2>
          <p className="text-slate-500 text-sm mt-2">View customers and permissions</p>
        </Link>
      </div>
    </div>
  );
};
export default AdminDashboard;