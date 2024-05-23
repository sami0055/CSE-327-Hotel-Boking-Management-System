import { expect } from 'chai';
import { processBookingAndPayment } from './problem.js';
import sinon from 'sinon';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

describe('processBookingAndPayment', function () {
  let addBookingStub, payAmountStub, toastErrorStub;

  beforeEach(function () {
    addBookingStub = sinon.stub().returns({
      data: {
        addBooking: { id: '123' },
      },
    });

    payAmountStub = sinon.stub().returns({
      data: {
        payAmount: { id: '456', paid: true },
      },
    });

    toastErrorStub = sinon.stub(toast, 'error');

    sinon.replace(useMutation, 'useMutation', sinon.stub().returns([addBookingStub, payAmountStub]));
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should process booking and payment for new booking', async function () {
    const bookingData = {
      from: '2024-01-01',
      to: '2024-01-05',
      roomNumbers: [101, 102],
      bookedBy: { id: 'user1' },
      paid: false,
      amount: 5000,
      people: { adults: 2, children: 1 },
      room: 'room1',
      hotel: 'hotel1',
    };
    const token = { id: 'token1' };
    const bookingExists = false;

    const result = await processBookingAndPayment(bookingData, bookingExists, token);

    expect(result).to.deep.equal({ id: '456', paid: true });
    expect(addBookingStub.calledOnce).to.be.true;
    expect(payAmountStub.calledOnce).to.be.true;
  });

  it('should process payment for existing booking', async function () {
    const bookingData = {
      id: '123',
      bookedBy: { id: 'user1' },
      amount: 5000,
    };
    const token = { id: 'token1' };
    const bookingExists = true;

    const result = await processBookingAndPayment(bookingData, bookingExists, token);

    expect(result).to.deep.equal({ id: '456', paid: true });
    expect(addBookingStub.called).to.be.false;
    expect(payAmountStub.calledOnce).to.be.true;
  });

  it('should handle errors during booking and payment', async function () {
    const bookingData = {
      from: '2024-01-01',
      to: '2024-01-05',
      roomNumbers: [101, 102],
      bookedBy: { id: 'user1' },
      paid: false,
      amount: 5000,
      people: { adults: 2, children: 1 },
      room: 'room1',
      hotel: 'hotel1',
    };
    const token = { id: 'token1' };
    const bookingExists = false;

    addBookingStub.throws(new Error('Booking error'));

    try {
      await processBookingAndPayment(bookingData, bookingExists, token);
    } catch (error) {
      expect(error.message).to.equal('Booking error');
      expect(toastErrorStub.calledOnce).to.be.true;
    }
  });
});
