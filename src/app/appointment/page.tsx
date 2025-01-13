'use client';

import { useState } from 'react';
import { Clock, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format, addMonths, startOfMonth, getDaysInMonth, addHours, isBefore, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from '@/context/TranslationContext';

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
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

    if (!user) {
      setShowLoginDialog(true);
      return;
    }

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
          user: {
            id: user.id,
          },
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

      setFormData({ date: '', time: '', reason: '' });
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
      <div className="min-h-screen bg-blue-50 py-16 from-white to-blue-900 pt-32">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-8">
              {t('appointmentSection.title')}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Month Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-blue-900">
                  {t('appointmentSection.selectMonth')}
                </label>
                <div className="flex gap-4">
                  {availableMonths.map((month) => (
                    <Button
                      key={month.getTime()}
                      type="button"
                      variant={selectedMonth.getMonth() === month.getMonth() ? "default" : "outline"}
                      onClick={() => setSelectedMonth(month)}
                      className={`flex-1 ${
                        selectedMonth.getMonth() === month.getMonth()
                          ? 'bg-blue-900 text-white hover:bg-blue-800'
                          : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-50'
                      }`}
                    >
                      {format(month, 'MMMM yyyy', { locale: fr })}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Day Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-blue-900">
                  {t('appointmentSection.selectDay')}
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
                    const dayOfWeek = date.getDay();
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                    const isDisabled = isDayDisabled(day, selectedMonth) || isWeekend;

                    return (
                      <Button
                        key={day}
                        type="button"
                        variant={selectedDay === day ? "default" : "outline"}
                        onClick={() => !isDisabled && handleDaySelect(day)}
                        disabled={isDisabled}
                        className={`h-12 ${
                          selectedDay === day
                            ? 'bg-blue-900 text-white hover:bg-blue-800'
                            : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-50'
                        } ${isDisabled ? 'opacity-50' : ''}`}
                      >
                        {day}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDay && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-blue-900">
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
                          className={`h-12 ${
                            formData.time === time
                              ? 'bg-blue-900 text-white hover:bg-blue-800'
                              : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-50'
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
                <label className="block text-sm font-medium text-blue-900">
                  {t('appointmentSection.reasonLabel')}
                </label>
                <Textarea
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder={t('appointmentSection.reasonPlaceholder')}
                  className="h-32 border-blue-900 focus:border-blue-900 focus:ring-blue-900"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-900 text-white hover:bg-blue-800"
                disabled={isSubmitting || !formData.date || !formData.time || !formData.reason}
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

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-white border border-blue-900 rounded-lg shadow-lg">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-blue-900 text-xl font-bold">
              {t('appointmentSection.loginDialog.title')}
            </DialogTitle>
            <DialogDescription className="text-blue-800">
              {t('appointmentSection.loginDialog.description')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowLoginDialog(false)}
              className="text-blue-900 border-blue-900 hover:bg-blue-50 hover:border-blue-800"
            >
              {t('appointmentSection.loginDialog.cancelButton')}
            </Button>
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                router.push('/login');
              }}
              className="bg-blue-900 text-white hover:bg-blue-800"
            >
              {t('appointmentSection.loginDialog.loginButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}