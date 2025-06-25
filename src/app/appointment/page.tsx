'use client';

import { useState } from 'react';
import { Clock, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format, addMonths, startOfMonth, getDaysInMonth, addHours, isBefore, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useTranslation } from '@/contexts/TranslationContext';

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    guestName: '',
    guestEmail: '',
    guestPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  // Get available months (current month + next 2 months)
  const availableMonths = Array.from({ length: 3 }, (_, i) =>
    addMonths(startOfMonth(new Date()), i)
  );

  // Get days in selected month
  const daysInMonth = getDaysInMonth(selectedMonth);
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const isDayDisabled = (day: number, selectedMonth: Date) => {
    const selectedDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    const currentDate = new Date();
    const minDate = addHours(currentDate, 24); // Add 24 hours to the current date

    return isBefore(selectedDate, minDate) && !isSameDay(selectedDate, currentDate);
  };

  const isTimeDisabled = (time: string, selectedDate: Date) => {
    const currentDate = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    selectedDate.setHours(hours, minutes, 0, 0);

    return isBefore(selectedDate, currentDate);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    const dateString = format(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day), 'yyyy-MM-dd');
    setFormData(prev => ({ ...prev, date: dateString }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment: {
            date: formData.date,
            time: formData.time,
            reason: formData.reason,
          },
          user: user ? {
            id: user.id,
          } : {
            nom: formData.guestName,
            email: formData.guestEmail,
            telephone: formData.guestPhone
          },
          isGuest: !user
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('appointmentSection.error.failedToRequestAppointment'));
      }

      toast({
        title: t('appointmentSection.success.title'),
        description: t('appointmentSection.success.description'),
      });

      setFormData({
        date: '',
        time: '',
        reason: '',
        guestName: '',
        guestEmail: '',
        guestPhone: ''
      });
      setSelectedDay(null);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t('appointmentSection.error.title'),
        description: error instanceof Error ? error.message : t('appointmentSection.error.generic'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-green-50 py-16 from-white to-green-900 pt-32">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-green-900 mb-8">
              {t('appointmentSection.title')}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Month Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-green-900">
                  {t('appointmentSection.selectMonth')}
                </label>
                <div className="flex gap-4">
                  {availableMonths.map((month) => (
                    <Button
                      key={month.getTime()}
                      type="button"
                      variant={selectedMonth.getMonth() === month.getMonth() ? "default" : "outline"}
                      onClick={() => setSelectedMonth(month)}
                      className={`flex-1 ${selectedMonth.getMonth() === month.getMonth()
                          ? 'bg-green-900 text-white hover:bg-green-800'
                          : 'bg-white text-green-900 border-green-900 hover:bg-green-50'
                        }`}
                    >
                      {format(month, 'MMMM yyyy', { locale: fr })}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Day Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-green-900">
                  {t('appointmentSection.selectDay')}
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
                    const dayOfWeek = format(date, 'EEE', { locale: fr }); // Get the abbreviated day of the week
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Check if it's a weekend
                    const isDisabled = isDayDisabled(day, selectedMonth) || isWeekend;

                    return (
                      <Button
                        key={day}
                        type="button"
                        variant={selectedDay === day ? "default" : "outline"}
                        onClick={() => !isDisabled && handleDaySelect(day)}
                        disabled={isDisabled}
                        className={`h-16 flex flex-col items-center justify-center ${selectedDay === day
                            ? 'bg-green-900 text-white hover:bg-green-800'
                            : 'bg-white text-green-900 border-green-900 hover:bg-green-50'
                          } ${isDisabled ? 'opacity-50' : ''}`}
                      >
                        <span className="text-sm font-medium">{dayOfWeek}</span>
                        <span className="text-lg font-bold">{day}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDay && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-green-900">
                    {t('appointmentSection.selectTime')}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => {
                      const selectedDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), selectedDay);
                      const isDisabled = isTimeDisabled(time, selectedDate);

                      return (
                        <Button
                          key={time}
                          type="button"
                          variant={formData.time === time ? "default" : "outline"}
                          onClick={() => !isDisabled && handleTimeSelect(time)}
                          disabled={isDisabled}
                          className={`h-12 ${formData.time === time
                              ? 'bg-green-900 text-white hover:bg-green-800'
                              : 'bg-white text-green-900 border-green-900 hover:bg-green-50'
                            } ${isDisabled ? 'opacity-50' : ''}`}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reason Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-900">
                  {t('appointmentSection.reasonLabel')}
                </label>
                <Textarea
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder={t('appointmentSection.reasonPlaceholder')}
                  className="h-32 border-green-900 focus:border-green-900 focus:ring-green-900"
                  required
                />
              </div>

              {/* Guest Information Fields (only show if not logged in) */}
              {!user && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-900">
                    {t('appointmentSection.guestInfo.title')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-green-900">
                        {t('appointmentSection.guestInfo.name')}*
                      </label>
                      <input
                        type="text"
                        value={formData.guestName}
                        onChange={(e) => setFormData(prev => ({ ...prev, guestName: e.target.value }))}
                        className="w-full border-green-900 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-green-900">
                        {t('appointmentSection.guestInfo.email')}*
                      </label>
                      <input
                        type="email"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, guestEmail: e.target.value }))}
                        className="w-full border-green-900 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-green-900">
                        {t('appointmentSection.guestInfo.phone')}
                      </label>
                      <input
                        type="tel"
                        value={formData.guestPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, guestPhone: e.target.value }))}
                        className="w-full border-green-900 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      />
                      <p className="text-sm text-gray-500">
                        {t('appointmentSection.guestInfo.phoneOptional')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-900 text-white hover:bg-green-800"
                disabled={
                  isSubmitting || 
                  !formData.date || 
                  !formData.time || 
                  !formData.reason || 
                  (!user && (!formData.guestName || !formData.guestEmail))
                }
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Clock className="animate-spin" size={20} />
                    {t('appointmentSection.submitting')}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={20} />
                    {t('appointmentSection.submitButton')}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}