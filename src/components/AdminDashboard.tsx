import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Booking {
  id: string;
  service_id: string;
  add_ons: string[];
  booking_date: string;
  booking_time: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes: string;
  total: number;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAndFetchBookings();
  }, []);

  const checkAdminAndFetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session) throw new Error('No authenticated session');

      // Fetch bookings - the RLS policies will automatically handle admin check
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true });

      if (bookingsError) {
        if (bookingsError.code === 'PGRST301') {
          throw new Error('Not authorized as admin');
        }
        throw bookingsError;
      }

      setBookings(bookingsData || []);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success('Booking status updated');
      checkAdminAndFetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto"></div>
            <p className="mt-4 text-stone-600">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleLogout}
              className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full hover:bg-stone-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-stone-800">Booking Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full hover:bg-stone-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-stone-600">No bookings found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-stone-900">
                          {format(new Date(booking.booking_date), 'MMM d, yyyy')}
                        </div>
                        <div className="text-sm text-stone-500">{booking.booking_time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-stone-900">{booking.client_name}</div>
                        <div className="text-sm text-stone-500">{booking.client_email}</div>
                        <div className="text-sm text-stone-500">{booking.client_phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-stone-900">{booking.service_id}</div>
                        {booking.add_ons && booking.add_ons.length > 0 && (
                          <div className="text-sm text-stone-500">
                            Add-ons: {booking.add_ons.join(', ')}
                          </div>
                        )}
                        {booking.notes && (
                          <div className="text-sm text-stone-500 mt-1">
                            Notes: {booking.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                        ${booking.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 sm:text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;