import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { DayPicker } from 'react-day-picker';
import { format, getDay } from 'date-fns';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import 'react-day-picker/dist/style.css';

const services = [
  { id: 'forest-bloom', name: 'Forest Bloom Facial', duration: '60', price: 80 },
  { id: 'quartz-glow', name: 'Quartz Glow Facial', duration: '60', price: 85 },
  { id: 'relaxation', name: 'Relaxation Massage', duration: '90', price: 90 },
  { id: 'ground-glow', name: 'Ground & Glow', duration: '90', price: 140, description: 'Massage and facial combo with reiki-infused touch' },
  { id: 'back-facial', name: 'Back Facial', duration: '30', price: 50 },
];

const addOns = [
  { 
    id: 'aromatherapy-scrub',
    name: 'Aromatherapy Back or Foot Scrub',
    price: 5,
    description: 'Mineral-rich salt scrub with nourishing oils'
  },
  {
    id: 'cranial-massage',
    name: 'Aromatherapy Cranial Massage',
    price: 10,
    duration: '10',
    description: 'Relaxing scalp and temple massage'
  }
];

// Define available time slots for each day
const timeSlotsByDay = {
  0: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'], // Sunday
  2: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'], // Tuesday
  4: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'], // Thursday
  5: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'] // Friday
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const calculateTotal = () => {
    const servicePrice = services.find(s => s.id === selectedService)?.price || 0;
    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return servicePrice + addOnsTotal;
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Function to check if a date is available
  const isDateAvailable = (date: Date) => {
    const dayOfWeek = getDay(date);
    return dayOfWeek in timeSlotsByDay;
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];
    const dayOfWeek = getDay(selectedDate);
    return timeSlotsByDay[dayOfWeek as keyof typeof timeSlotsByDay] || [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    
    try {
      console.log('Submitting booking with data:', {
        service_id: selectedService,
        add_ons: selectedAddOns,
        booking_date: format(selectedDate, 'yyyy-MM-dd'),
        booking_time: selectedTime,
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        notes: formData.notes,
        total: calculateTotal(),
        status: 'pending'
      });

      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          service_id: selectedService,
          add_ons: selectedAddOns,
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          booking_time: selectedTime,
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          notes: formData.notes,
          total: calculateTotal(),
          status: 'pending'
        }])
        .select();

      console.log('Supabase response:', { data, error });

      if (error) throw error;

      toast.success('Booking submitted successfully! We will contact you to confirm your appointment.');
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedService('');
      setSelectedTime('');
      setSelectedAddOns([]);
      setFormData({ name: '', email: '', phone: '', notes: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-serif text-stone-800">
              Book Your Session
            </Dialog.Title>
            <Dialog.Close className="text-stone-500 hover:text-stone-700">
              <X className="h-6 w-6" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Select Service
              </label>
              <Select.Root value={selectedService} onValueChange={setSelectedService}>
                <Select.Trigger className="w-full px-4 py-2 text-left border rounded-md">
                  <Select.Value placeholder="Choose a service" />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border rounded-md shadow-lg">
                    <Select.Viewport>
                      {services.map((service) => (
                        <Select.Item
                          key={service.id}
                          value={service.id}
                          className="px-4 py-2 hover:bg-stone-100 cursor-pointer"
                        >
                          <Select.ItemText>
                            {service.name} - ${service.price} ({service.duration} min)
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Add-ons Selection */}
            {selectedService && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Add-On Services (Optional)
                </label>
                <div className="space-y-3">
                  {addOns.map((addOn) => (
                    <div key={addOn.id} className="flex items-start">
                      <input
                        type="checkbox"
                        id={addOn.id}
                        checked={selectedAddOns.includes(addOn.id)}
                        onChange={() => handleAddOnToggle(addOn.id)}
                        className="mt-1 mr-3"
                      />
                      <label htmlFor={addOn.id} className="text-sm">
                        <div className="font-medium text-stone-800">{addOn.name}</div>
                        <div className="text-stone-600">{addOn.description}</div>
                        <div className="text-stone-500">
                          ${addOn.price} {addOn.duration && `(${addOn.duration} min)`}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Select Date
              </label>
              <div className="border rounded-md p-4">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={[
                    { before: new Date() },
                    { dayOfWeek: [1, 3, 6] }, // Disable Monday, Wednesday, Saturday
                    (date) => !isDateAvailable(date)
                  ]}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Select Time
                </label>
                <Select.Root value={selectedTime} onValueChange={setSelectedTime}>
                  <Select.Trigger className="w-full px-4 py-2 text-left border rounded-md">
                    <Select.Value placeholder="Choose a time" />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border rounded-md shadow-lg">
                      <Select.Viewport>
                        {getAvailableTimeSlots().map((time) => (
                          <Select.Item
                            key={time}
                            value={time}
                            className="px-4 py-2 hover:bg-stone-100 cursor-pointer"
                          >
                            <Select.ItemText>{time}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border focus:ring-sage-500 focus:border-sage-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border focus:ring-sage-500 focus:border-sage-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border focus:ring-sage-500 focus:border-sage-500"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-stone-700 mb-1">
                  Special Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border focus:ring-sage-500 focus:border-sage-500"
                />
              </div>
            </div>

            {/* Total Price */}
            {selectedService && (
              <div className="text-right text-lg font-medium text-stone-800">
                Total: ${calculateTotal()}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-sage-600 text-white px-8 py-3 rounded-full hover:bg-sage-700 transition-colors"
            >
              Request Booking
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BookingModal;