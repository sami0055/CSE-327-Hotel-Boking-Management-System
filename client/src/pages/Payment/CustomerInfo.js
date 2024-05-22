import React from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import styled from 'styled-components'
import { getAge } from '../../utils/utilFunctions'
import { useNavigate } from 'react-router-dom'
import { Layout } from './CommonStyles'

/**
 * Represents a component for displaying customer information and booking details.
 * @module CustomerInfo
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
 * @returns {JSX.Element} JSX representation of the customer information component.
 */

const CustomerInfo = (props) => {
    const { user, room, booking } = props
    const navigate = useNavigate()

    console.log(props)

    return (
        <>
            <Layout>
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
                        Total: <span>{booking.people.adults+booking.people.children} Persons</span>
                    </Text>
                </div>
                <div className="section">
                    <Text>Booking Info</Text>
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
            </Layout>
            <Layout className="buttons">
                <FormButton onClick={() => navigate(`/hotel/${room.hotel.id}`, {state: booking})}>
                    Go Back
                </FormButton>
                <FormButton onClick={() => navigate(`/payment/${room.hotel.id}/${room.id}/2`, {state: booking})}>
                    Confirm
                </FormButton>
            </Layout>
        </>
    )
}

export default CustomerInfo
