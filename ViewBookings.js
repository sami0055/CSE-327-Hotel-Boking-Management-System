import React from 'react'
import { ModalBox, ModalContainer, ModalTitle } from '../GlobalStyles/ModalStyles'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import "./animation.css"
import Bookings from '../../pages/Bookings/Bookings';

/**
 * ViewBookings component for displaying booking details in a modal.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.setBookingsModal - Function to close the bookings modal.
 * @param {string} props.title - Title of the modal.
 * @param {Object} props.hotel - Hotel details.
 * @param {Array} props.bookings - Array of booking data.
 * @returns {JSX.Element} The rendered component.
 */
const ViewBookings = (props) => {

    return (
        <ModalContainer>
            <ModalBox className="modal-box" style={{ width: '1200px' }}>
                <CloseIcon className="close-icon"
                    onClick={() => props.setBookingsModal({ state: false, title: '' })} />
                <ModalTitle>{props.title}</ModalTitle>

                <Bookings
                    style={{ marginTop: '0px', padding: '0px' }}
                    filter={'hotel'}
                    hotel={props.hotel}
                    bookingsData={props.bookings} />

            </ModalBox>
        </ModalContainer>
    )
}

export default ViewBookings
