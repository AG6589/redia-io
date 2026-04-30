import { useGetOrdersQuery, useDeliverOrderMutation, useShipOrderMutation } from '../../slices/ordersApiSlice';
import { Eye, CheckCircle, XCircle, Truck, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const [shipOrder, { isLoading: loadingShip }] = useShipOrderMutation();

  const deliverHandler = async (id) => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const shipHandler = async (id) => {
    try {
      await shipOrder(id);
      refetch();
      toast.success('Order shipped');
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
                <th className="p-4 font-semibold">SHIPPED</th>
                <th className="p-4 font-semibold">DELIVERED</th>
                <th className="p-4 font-semibold text-right">ACTIONS</th>
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
                      <div className="flex items-center gap-1 text-emerald-600 font-medium"><CheckCircle size={14}/> {order.paidAt?.substring(0, 10)}</div>
                    ) : order.paymentMethod === 'Cash On Delivery' ? (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">COD</span>
                    ) : (
                      <div className="text-rose-400"><XCircle size={14}/></div>
                    )}
                  </td>
                  <td className="p-4">
                    {order.isShipped ? (
                      <div className="flex items-center gap-1 text-blue-600 font-medium"><Package size={14}/> {order.shippedAt?.substring(0, 10)}</div>
                    ) : (
                      <div className="text-rose-400"><XCircle size={14}/></div>
                    )}
                  </td>
                  <td className="p-4">
                    {order.isDelivered ? (
                      <div className="flex items-center gap-1 text-emerald-600 font-medium"><CheckCircle size={14}/> {order.deliveredAt?.substring(0, 10)}</div>
                    ) : (
                      <div className="text-rose-400"><XCircle size={14}/></div>
                    )}
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    {/* One-by-one process buttons */}
                    {(order.isPaid || order.paymentMethod === 'Cash On Delivery') && !order.isShipped && (
                      <button 
                        onClick={() => shipHandler(order._id)}
                        disabled={loadingShip}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1 font-bold text-[10px] uppercase shadow-sm shadow-blue-200"
                        title="Mark as Shipped"
                      >
                        <Package size={14} /> Ship
                      </button>
                    )}
                    
                    {order.isShipped && !order.isDelivered && (
                      <button 
                        onClick={() => deliverHandler(order._id)}
                        disabled={loadingDeliver}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 font-bold text-[10px] uppercase shadow-sm shadow-emerald-200"
                        title="Mark as Delivered"
                      >
                        <Truck size={14} /> Deliver
                      </button>
                    )}

                    <Link to={`/order/${order._id}`} className="p-1.5 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-indigo-600 rounded-lg transition-colors inline-block" title="View Details">
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