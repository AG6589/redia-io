import { useGetUsersQuery } from '../../slices/usersApiSlice';
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
                  <td className="p-4"><a href={`mailto:${user.email}`} className="text-indigo-600 hover:underline">{user.email}</a></td>
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
export default UserList;