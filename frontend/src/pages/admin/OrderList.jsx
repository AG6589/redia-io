import { useGetOrdersQuery, useDeliverOrderMutation } from '../../slices/ordersApiSlice';
import { Eye, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const deliverHandler = async (id) => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
                  <td className="p-4 font-bold">${order.totalPrice}</td>
                  <td className="p-4">
                    {order.isPaid ? (
                      <div className="flex items-center gap-1 text-emerald-600"><CheckCircle size={16}/> {order.paidAt?.substring(0, 10)}</div>
                    ) : order.paymentMethod === 'Cash On Delivery' ? (
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-md">COD</span>
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
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    {order.paymentMethod === 'Cash On Delivery' && !order.isDelivered && (
                      <button 
                        onClick={() => deliverHandler(order._id)}
                        disabled={loadingDeliver}
                        className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1 font-bold text-xs"
                        title="Directly mark COD as delivered"
                      >
                        <Truck size={16} /> Update
                      </button>
                    )}
                    <Link to={`/order/${order._id}`} className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-indigo-600 rounded-lg transition-colors inline-block">
                      <Eye size={16} />
                    </Link>
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
export default OrderList;