import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          title: item.title,
          qty: item.qty,
          image: item.image,
          price: Number(item.price),
          product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: Number(cart.itemsPrice),
        shippingPrice: Number(cart.shippingPrice),
        taxPrice: Number(cart.taxPrice),
        totalPrice: Number(cart.totalPrice),
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Shipping</h2>
          <p className="text-slate-600">
            <strong className="text-slate-800">Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Payment Method</h2>
          <strong className="text-slate-800">Method: </strong>
          <span className="text-slate-600">{cart.paymentMethod}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">Your cart is empty</div>
          ) : (
            <ul className="space-y-4">
              {cart.cartItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <Link to={`/product/${item._id}`} className="flex-1 font-semibold text-slate-800 hover:text-indigo-600">{item.title}</Link>
                  <div className="font-medium text-slate-600">
                    {item.qty} x ${item.price} = <span className="font-bold text-slate-900">${(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 h-fit sticky top-24">
        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Order Summary</h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-slate-600"><span>Items</span><span className="font-medium">${cart.itemsPrice}</span></div>
          <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="font-medium">${cart.shippingPrice}</span></div>
          <div className="flex justify-between text-slate-600"><span>Tax</span><span className="font-medium">${cart.taxPrice}</span></div>
          <div className="h-px bg-slate-100 my-2"></div>
          <div className="flex justify-between text-lg font-black text-slate-900"><span>Total</span><span>${cart.totalPrice}</span></div>
        </div>
        
        <button
          type="button"
          disabled={cart.cartItems.length === 0 || isLoading}
          onClick={placeOrderHandler}
          className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};
export default PlaceOrderPage;