const fs = require('fs');
const path = require('path');

const files = {
  'frontend/src/pages/admin/ProductList.jsx': `import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { Edit, Trash, Plus } from 'lucide-react';

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery({ keyword: '', pageNumber: 1 });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900">Manage Products</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} /> Create Product
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-slate-500">Loading products...</div>
      ) : error ? (
        <div className="p-8 text-rose-500">{error?.data?.message || error.error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">NAME</th>
                <th className="p-4 font-semibold">PRICE</th>
                <th className="p-4 font-semibold">CATEGORY</th>
                <th className="p-4 font-semibold">BRAND</th>
                <th className="p-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data.products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-400">{product._id}</td>
                  <td className="p-4 font-medium">{product.title}</td>
                  <td className="p-4">\${product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ProductList;`,

  'frontend/src/pages/admin/OrderList.jsx': `import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900">Manage Orders</h1>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-slate-500">Loading orders...</div>
      ) : error ? (
        <div className="p-8 text-rose-500">{error?.data?.message || error.error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">USER</th>
                <th className="p-4 font-semibold">DATE</th>
                <th className="p-4 font-semibold">TOTAL</th>
                <th className="p-4 font-semibold">PAID</th>
                <th className="p-4 font-semibold">DELIVERED</th>
                <th className="p-4 font-semibold text-right">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {orders?.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-400">{order._id}</td>
                  <td className="p-4 font-medium">{order.user?.name}</td>
                  <td className="p-4">{order.createdAt?.substring(0, 10)}</td>
                  <td className="p-4 font-bold">\${order.totalPrice}</td>
                  <td className="p-4">
                    {order.isPaid ? (
                      <div className="flex items-center gap-1 text-emerald-600"><CheckCircle size={16}/> {order.paidAt?.substring(0, 10)}</div>
                    ) : (
                      <div className="text-rose-500"><XCircle size={16}/></div>
                    )}
                  </td>
                  <td className="p-4">
                    {order.isDelivered ? (
                      <div className="flex items-center gap-1 text-emerald-600"><CheckCircle size={16}/> {order.deliveredAt?.substring(0, 10)}</div>
                    ) : (
                      <div className="text-rose-500"><XCircle size={16}/></div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default OrderList;`,

  'frontend/src/pages/admin/UserList.jsx': `import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Edit, Trash, CheckCircle, XCircle } from 'lucide-react';

const UserList = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900">Manage Users</h1>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-slate-500">Loading users...</div>
      ) : error ? (
        <div className="p-8 text-rose-500">{error?.data?.message || error.error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">NAME</th>
                <th className="p-4 font-semibold">EMAIL</th>
                <th className="p-4 font-semibold">ADMIN</th>
                <th className="p-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-400">{user._id}</td>
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4"><a href={\`mailto:\${user.email}\`} className="text-indigo-600 hover:underline">{user.email}</a></td>
                  <td className="p-4">
                    {user.isAdmin ? (
                      <div className="text-emerald-600"><CheckCircle size={16}/></div>
                    ) : (
                      <div className="text-rose-500"><XCircle size={16}/></div>
                    )}
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <button className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UserList;`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Admin subpages generated.');
