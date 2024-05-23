import React from 'react';
import styled from 'styled-components';
import { Image, Text } from '../../components/GlobalStyles/PageStyles';
import HotelIMG from "../../assets/hotel.png";
import RoomDetails from './RoomDetails';
import { useQuery } from '@apollo/client';
import { GET_AVAILABLE_ROOMS } from '../../graphql/queries/roomQueries';
import PageLoader from "../../components/Loaders/PageLoader";
import ComponentError from '../../components/Error/ComponentError';

const Details = styled.div`
    border: 0.5px solid #d8d8d8;
    padding: 16px;
`;

const Flex = styled.div`
    display: flex;
    width: 100%;

    @media(max-width: 600px) {
        flex-direction: column;
    }

    .img-container {
        @media(max-width: 600px) {
            width: 100% !important;
            margin: 0 0 16px 0;
        }
    }

    .details {
        border: 0.5px solid #d8d8d8;
        padding: 16px;

        @media(max-width: 600px) {
            width: 100% !important;
            margin: 0 0 16px 0 !important;
        }
    }
`;

/**
 * ManagerView Component
 * 
 * This component displays the detailed view of a hotel for managers. It shows the hotel's image, location, price range,
 * description, manager details, and the list of rooms.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.hotel - The hotel object containing details like name, location, description, etc.
 * @param {Object} props.params - The parameters passed from the previous component or route.
 * @returns {JSX.Element} The ManagerView component.
 */
export const ManagerView = (props) => {
    const { hotel, params } = props;
    const ratings = !hotel.ratings ? 0.00 : hotel.ratings;
    const rooms = hotel.rooms;

    /**
     * Get the price range of the hotel's rooms.
     * 
     * @returns {string} The price range of the rooms.
     */
    const getPriceRange = () => {
        if (hotel.rooms.length === 0) return "Price - N/A";
        let prices = hotel.rooms.map(room => room.price);
        let maxPrice = Math.max(...prices);
        let minPrice = Math.min(...prices);

        if (maxPrice === minPrice) return `${maxPrice}/-`;
        return `${minPrice} - ${maxPrice}/-`;
    };

    return (
        <div>
            <Flex>
                <Image style={{ backgroundImage: `url(${hotel.image ? hotel.image : HotelIMG})`, height: "300px", width: "60%", }} className="img-container" />
                <div className='details' style={{ width: '40%', marginLeft: '20px' }}>
                    <Text className="small">Location: <span>{hotel.location}</span></Text>
                    <Text className="small">Price: <span>{getPriceRange()}</span></Text>
                </div>
            </Flex>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">{hotel.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.description}</Text>
            </Details>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">Manager Details</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.manager.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>
                    Contact: <span>{hotel.manager.email}</span>
                </Text>
            </Details>
            <Text style={{ marginTop: '20px' }}>Rooms</Text>
            <div style={{ marginTop: '20px' }}>
                {rooms.map(r => (
                    <RoomDetails room={r}
                        roomNumbers={[]}
                        params={params} />
                ))}
            </div>
        </div>
    );
};

/**
 * HotelDetails Component
 * 
 * This component displays the detailed view of a hotel for customers. It shows the hotel's image, location, price range,
 * description, manager details, and the list of available rooms.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.hotel - The hotel object containing details like name, location, description, etc.
 * @param {Object} props.params - The parameters passed from the previous component or route.
 * @returns {JSX.Element} The HotelDetails component.
 */
export const HotelDetails = (props) => {
    const { hotel, params } = props;
    let total = Object.values(params.people).reduce((a, b) => a + b);

    // Execute the query to fetch available rooms
    const { data, loading, error } = useQuery(GET_AVAILABLE_ROOMS, {
        variables: {
            hotelId: hotel.id,
            from: params.from,
            to: params.to,
            occupancy: total
        }
    });

    /**
     * Get the price range of the hotel's rooms.
     * 
     * @returns {string} The price range of the rooms.
     */
    const getPriceRange = () => {
        if (hotel.rooms.length === 0) return "Price - N/A";
        let prices = hotel.rooms.map(room => room.price);
        let maxPrice = Math.max(...prices);
        let minPrice = Math.min(...prices);

        if (maxPrice === minPrice) return `${maxPrice}/-`;
        return `${minPrice} - ${maxPrice}/-`;
    };

    if (loading) return <PageLoader />;
    if (error) return <ComponentError error={error} />;

    const rooms = data.getAvailableRooms;

    return (
        <div>
            <Flex>
                <Image style={{ backgroundImage: `url(${hotel.image ? hotel.image : HotelIMG})`, height: "300px", width: "60%", }} className="img-container" />
                <div className='details' style={{ width: '40%', marginLeft: '20px' }}>
                    <Text className="small">Location: <span>{hotel.location}</span></Text>
                    <Text className="small">Price: <span>{getPriceRange()}</span></Text>
                </div>
            </Flex>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">{hotel.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.description}</Text>
            </Details>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">Manager Details</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.manager.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>
                    Contact: <span>{hotel.manager.email}</span>
                </Text>
            </Details>
            <Text style={{ marginTop: '20px' }}>Rooms</Text>
            <div style={{ marginTop: '20px' }}>
                {rooms.map(r => (
                    <RoomDetails room={r.room}
                        roomNumbers={r.roomNumbers}
                        params={params} />
                ))}
            </div>
        </div>
    );
};
