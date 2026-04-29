import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { CheckCircle, XCircle, CreditCard, Truck } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const payOrderHandler = async () => {
    try {
      await payOrder({ orderId, details: { id: 'cash', status: 'COMPLETED', update_time: new Date().toISOString(), payer: { email_address: order.user.email } } });
      refetch();
      toast.success('Order marked as paid');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  if (isLoading) return <div className="text-center p-8 text-slate-500">Loading Order Details...</div>;
  if (error) return <div className="text-center p-8 text-rose-500">{error?.data?.message || error.error}</div>;

  const steps = [
    { label: 'Order Placed', completed: true, date: order.createdAt },
    { label: order.paymentMethod === 'Cash On Delivery' ? 'Payment (COD)' : 'Payment Confirmed', completed: order.isPaid || order.paymentMethod === 'Cash On Delivery', date: order.paidAt },
    { label: 'Shipped', completed: order.isDelivered, date: order.deliveredAt },
    { label: 'Delivered', completed: order.isDelivered, date: order.deliveredAt },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Order #{order._id}</h1>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-semibold text-sm">
          {order.createdAt.substring(0, 10)}
        </div>
      </div>

      {/* Order Tracker */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
            <div style={{ width: `${(steps.filter(s => s.completed).length - 1) * 33.33}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
          </div>
          <div className="flex justify-between w-full">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center w-1/4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 ${step.completed ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 text-slate-400'}`}>
                  {step.completed ? <CheckCircle size={16} /> : index + 1}
                </div>
                <div className={`text-xs font-semibold text-center ${step.completed ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</div>
                {step.completed && step.date && <div className="text-[10px] text-slate-500 mt-1">{step.date.substring(0, 10)}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <Truck className="text-indigo-600" /> Shipping
            </h2>
            <p className="mb-2"><strong className="text-slate-800">Name:</strong> {order.user.name}</p>
            <p className="mb-2"><strong className="text-slate-800">Email:</strong> {order.user.email}</p>
            <p className="mb-4"><strong className="text-slate-800">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? (
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <CheckCircle size={18}/> Delivered on {order.deliveredAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <XCircle size={18}/> Not Delivered
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <CreditCard className="text-indigo-600" /> Payment
            </h2>
            <p className="mb-4"><strong className="text-slate-800">Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <CheckCircle size={18}/> Paid on {order.paidAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <XCircle size={18}/> Not Paid
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Order Items</h2>
            <ul className="space-y-4">
              {order.orderItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl p-2"><img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" /></div>
                  <div className="flex-1 font-semibold text-slate-800">{item.title}</div>
                  <div className="font-medium text-slate-600">{item.qty} x ${item.price} = <span className="font-bold text-slate-900">${(item.qty * item.price).toFixed(2)}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-slate-600"><span>Items</span><span className="font-medium">${order.itemsPrice}</span></div>
            <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="font-medium">${order.shippingPrice}</span></div>
            <div className="flex justify-between text-slate-600"><span>Tax</span><span className="font-medium">${order.taxPrice}</span></div>
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="flex justify-between text-lg font-black text-slate-900"><span>Total</span><span>${order.totalPrice}</span></div>
          </div>
          {!order.isPaid && order.paymentMethod !== 'Cash On Delivery' && (
            <div className="bg-slate-50 p-4 rounded-xl text-center font-medium text-slate-500 border border-slate-200 mb-4">
              Payment Gateway placeholder (e.g. PayPal/Stripe)
            </div>
          )}
          {!order.isPaid && order.paymentMethod === 'Cash On Delivery' && (
            <div className="bg-amber-50 p-4 rounded-xl text-center font-medium text-amber-700 border border-amber-200 mb-4">
              Please pay with cash upon delivery.
            </div>
          )}
          {userInfo && userInfo.isAdmin && !order.isPaid && (
             <button disabled={loadingPay} onClick={payOrderHandler} className="w-full mb-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors">
               {loadingPay ? 'Updating...' : 'Mark as Paid'}
             </button>
          )}
          {userInfo && userInfo.isAdmin && (order.isPaid || order.paymentMethod === 'Cash On Delivery') && !order.isDelivered && (
             <button disabled={loadingDeliver} onClick={deliverOrderHandler} className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors">
               {loadingDeliver ? 'Updating...' : 'Mark as Delivered'}
             </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderDetailsPage;