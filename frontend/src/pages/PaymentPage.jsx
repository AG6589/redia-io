import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
      <h1 className="text-3xl font-black text-slate-900 mb-6">Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-6 space-y-3">
          <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <input type="radio" className="w-5 h-5 text-indigo-600" id="PayPal" name="paymentMethod" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} />
            <span className="font-semibold text-slate-800">PayPal or Credit Card</span>
          </label>
          <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <input type="radio" className="w-5 h-5 text-indigo-600" id="Stripe" name="paymentMethod" value="Stripe" checked={paymentMethod === 'Stripe'} onChange={(e) => setPaymentMethod(e.target.value)} />
            <span className="font-semibold text-slate-800">Stripe</span>
          </label>
          <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <input type="radio" className="w-5 h-5 text-indigo-600" id="COD" name="paymentMethod" value="Cash On Delivery" checked={paymentMethod === 'Cash On Delivery'} onChange={(e) => setPaymentMethod(e.target.value)} />
            <span className="font-semibold text-slate-800">Cash On Delivery (COD)</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95">
          Continue to Order Preview
        </button>
      </form>
    </div>
  );
};
export default PaymentPage;