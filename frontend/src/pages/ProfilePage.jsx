import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Link } from 'react-router-dom';
import { User, Lock, Mail, CheckCircle, XCircle } from 'lucide-react';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading: loadingOrders, error } = useGetMyOrdersQuery();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Profile Settings */}
      <div className="md:col-span-1">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="text-indigo-600" /> User Profile
          </h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
              <div className="relative">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <div className="relative">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
              <div className="relative">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <button type="submit" disabled={loadingUpdateProfile} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 mt-4 disabled:opacity-50">
              {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>

      {/* Order History */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900">My Orders</h2>
          </div>
          {loadingOrders ? (
            <div className="p-8 text-center text-slate-500">Loading orders...</div>
          ) : error ? (
            <div className="p-8 text-rose-500">{error?.data?.message || error.error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-semibold">ID</th>
                    <th className="p-4 font-semibold">DATE</th>
                    <th className="p-4 font-semibold">TOTAL</th>
                    <th className="p-4 font-semibold">PAID</th>
                    <th className="p-4 font-semibold">DELIVERED</th>
                    <th className="p-4 font-semibold text-right">DETAILS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-500">You haven't placed any orders yet.</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-mono text-xs text-slate-400">{order._id.substring(0, 8)}...</td>
                        <td className="p-4">{order.createdAt.substring(0, 10)}</td>
                        <td className="p-4 font-bold">${order.totalPrice}</td>
                        <td className="p-4">
                          {order.isPaid ? (
                            <div className="text-emerald-600"><CheckCircle size={16}/></div>
                          ) : (
                            <div className="text-rose-500"><XCircle size={16}/></div>
                          )}
                        </td>
                        <td className="p-4">
                          {order.isDelivered ? (
                            <div className="text-emerald-600"><CheckCircle size={16}/></div>
                          ) : (
                            <div className="text-rose-500"><XCircle size={16}/></div>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <Link to={`/order/${order._id}`} className="bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
