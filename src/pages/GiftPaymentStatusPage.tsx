import React from 'react';
import { useSearchParams } from 'react-router-dom';

const GiftPaymentStatusPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status');
  const paymentId = searchParams.get('payment_id');
  const preferenceId = searchParams.get('preference_id');

  // TODO: Send paymentId and preferenceId to the backend for reconciliation
  console.log('Payment ID:', paymentId);
  console.log('Preference ID:', preferenceId);

  const renderStatusMessage = () => {
    switch (status) {
      case 'approved':
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-lg">Thank you for your wonderful gift! We're so excited to celebrate with you.</p>
          </div>
        );
      case 'in_process':
      case 'pending':
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-yellow-600 mb-4">Payment Processing</h1>
            <p className="text-lg">Your payment is being processed and you will receive a confirmation soon.</p>
          </div>
        );
      case 'rejected':
      case 'cancelled':
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Not Completed</h1>
            <p className="text-lg">Unfortunately, the payment was not completed. Please try again.</p>
            {/* Optionally, provide a button to try again */}
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Unknown Payment Status</h1>
            <p className="text-lg">We could not determine the status of your payment. Please contact us for assistance.</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderStatusMessage()}
    </div>
  );
};

export default GiftPaymentStatusPage;
