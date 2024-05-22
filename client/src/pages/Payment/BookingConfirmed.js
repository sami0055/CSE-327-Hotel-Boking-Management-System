import React from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import styled from 'styled-components'
import { getAge } from '../../utils/utilFunctions'
import { useNavigate } from 'react-router-dom'
import { Confirmation, Layout } from './CommonStyles'

/**
 * Represents a component for displaying booking confirmation details.
 * @module BookingConfirmed
 * @param {Object} props - The props object containing user, room, and booking details.
 * @param {Object} props.user - The user information.
 * @param {string} props.user.name - The name of the user.
 * @param {string} props.user.email - The email of the user.
 * @param {string} props.user.dob - The date of birth of the user.
 * @param {Object} props.room - The room information.
 * @param {Object} props.room.hotel - The hotel information.
 * @param {string} props.room.hotel.name - The name of the hotel.
 * @param {string} props.room.name - The name of the room.
 * @param {number} props.room.price - The price of the room.
 * @param {Object} props.booking - The booking information.
 * @param {Object} props.booking.people - The number of people.
 * @param {number} props.booking.people.adults - The number of adults.
 * @param {number} props.booking.people.children - The number of children.
 * @param {Array<number>} props.booking.roomNumbers - An array of room numbers.
 * @param {number} props.booking.amount - The total amount of the booking.
 * @param {boolean} props.booking.paid - Indicates whether the booking is paid or not.
 * @returns {JSX.Element} JSX representation of the booking confirmation component.
 */

const BookingConfirmed = (props) => {
    const { user, room, booking } = props
    const navigate = useNavigate()

    return (
        <>
            <Confirmation>
                <img src="https://img.icons8.com/fluency/48/000000/ok.png" alt="/"
                    style={{ marginRight: '10px' }} />
                <Text style={{ margin: '0' }}>Booking Confirmed</Text>
            </Confirmation>
            <Layout style={{ marginTop: '20px' }}>
                <div className="section">
                    <Text>Customer Info</Text>
                    <Text className="small">
                        Name: <span>{user.name}</span>
                    </Text>
                    <Text className="small">
                        Email: <span>{user.email}</span>
                    </Text>
                    <Text className="small">
                        Age: <span>{getAge(user.dob)}</span>
                    </Text>
                    <Text className="small">
                        Total: <span>{booking.people.adults + booking.people.children}</span>
                    </Text>
                    <Text style={{ marginTop: '20px' }}>Booking Info</Text>
                    <Text className="small">
                        Hotel: <span>{room.hotel.name}</span>
                    </Text>
                    <Text className="small">
                        Room: <span>{room.name}</span>
                    </Text>
                    <Text className="small" style={{ margin: '-10px 0 10px 0' }}>
                        Room Number(s):
                        {booking.roomNumbers.map(r =>
                            (<span className="highlight" style={{ margin: '4px 2px' }}>{r}</span>)
                        )}
                    </Text>
                    <Text className="small">
                        Price (Each room): <span>Rs. {room.price}</span>
                    </Text>
                    <Text className="small">
                        Total Cost: <span>Rs. {booking.amount}</span>
                    </Text>
                </div>
                <div className="section">
                    <Text>Payment Info</Text>
                    <Text className="small">
                        Room(s) Cost: <span>Rs. {booking.amount}</span>
                    </Text>
                    <Text className="small">
                        Tax: <span>Rs. {20}</span>
                    </Text>
                    <Text className="small">
                        Total Cost: <span>Rs. {booking.amount + 20}</span>
                    </Text>
                    <Text className="small">
                        Payment Status: <span>{booking.paid ? 'Paid' : 'Not Paid'}</span>
                    </Text>
                </div>
            </Layout>
            <Layout className="buttons">
                <FormButton onClick={() => navigate(`/bookings`)}
                    style={{ marginLeft: 'auto' }}>
                    Your Bookings
                </FormButton>
            </Layout>
        </>
    )
}

export default BookingConfirmed
