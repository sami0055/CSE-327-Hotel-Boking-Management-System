import { useMutation } from '@apollo/client';
import { ADD_BOOKING, MAKE_PAYMENT } from './graphql/mutations';
import { toast } from 'react-toastify';

/**
 * Handles booking and payment processing.
 * @param {Object} bookingData - The booking data.
 * @param {boolean} bookingExists - Indicates if booking already exists.
 * @param {Object} token - Payment token.
 * @returns {Promise} Promise representing the result of the booking and payment process.
 */
export async function processBookingAndPayment(bookingData, bookingExists, token) {
  const [addBooking] = useMutation(ADD_BOOKING);
  const [payAmount] = useMutation(MAKE_PAYMENT);

  try {
    let bookingId;

    if (!bookingExists) {
      const addBookingResult = await addBooking({
        variables: {
          from: bookingData.from,
          to: bookingData.to,
          roomNumbers: bookingData.roomNumbers,
          bookedBy: bookingData.bookedBy,
          paid: bookingData.paid,
          amount: bookingData.amount + 20,
          people: bookingData.people,
          room: bookingData.room,
          hotel: bookingData.hotel,
        },
      });
      bookingId = addBookingResult.data.addBooking.id;
    } else {
      bookingId = bookingData.id;
    }

    const paymentResult = await payAmount({
      variables: {
        tokenId: token.id,
        bookingId: bookingId,
        bookedBy: bookingData.bookedBy.id,
      },
    });

    return paymentResult.data.payAmount;
  } catch (error) {
    toast.error(error.message, {
      autoClose: 5500,
      pauseOnHover: true,
    });
    throw error;
  }
}
