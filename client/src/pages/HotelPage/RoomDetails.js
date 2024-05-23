import React, { useState } from 'react';
import styled from 'styled-components';
import { FormButton, Image, SelectBox, Text } from '../../components/GlobalStyles/PageStyles';
import RoomIMG from "../../assets/hotel.png";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { detailsSettings } from '../../utils/carouselSettings';
import { toast } from 'react-toastify';

const CardContainer = styled.div`
    margin-top: 20px;
    background: #ffeedb;
    padding: 16px;
    border-radius: 6px;
`;

const Details = styled.div`
    width: 40%;
    margin-left: 20px;
`;

const Features = styled.div`
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    p {
        text-align: center;
        padding: 6px 10px;
        border: 1px solid #cbcbcb;
        border-radius: 20px;
        margin: 0;
    }

    @media(max-width: 600px) {
        margin-top: 20px;
    }
`;

const SliderContainer = styled.div`
    width: 60%;
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
        @media(max-width: 600px) {
            width: 100% !important;
            margin: 0 0 16px 0 !important;
        }
    }
`;

/**
 * RoomDetails Component
 * 
 * This component displays the detailed view of a room. It shows the room's images, description, price, 
 * and available features. It also includes a booking button that navigates to the payment page.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.room - The room object containing details like name, description, price, images, etc.
 * @param {Array} props.roomNumbers - The list of available room numbers.
 * @param {Object} props.params - The parameters passed from the previous component or route.
 * @returns {JSX.Element} The RoomDetails component.
 */
const RoomDetails = (props) => {
    const { room, roomNumbers, params } = props;
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [roomsNum, setroomsNum] = useState(1);

    /**
     * Handle the room booking process. It navigates to the payment page with booking details.
     */
    const handleBook = () => {
        if (roomNumbers.length > 0) {
            let nums = [];
            let i = 0;
            while (i < roomsNum) {
                nums.push(roomNumbers[i]);
                i++;
            }

            const bookingData = {
                from: params.from,
                to: params.to,
                roomNumbers: nums,
                bookedBy: user.id,
                paid: false,
                amount: room.price * nums.length,
                people: params.people,
                room: room.id,
                hotel: room.hotel.id
            };

            navigate(`/payment/${room.hotel.id}/${room.id}/1`, { state: bookingData });
        } else {
            toast.error("No available rooms.", {
                autoClose: 5500,
                pauseOnHover: true
            });
        }
    };

    return (
        <CardContainer style={{ marginTop: '20px' }}>
            <Flex>
                {room.images.length === 0 ? (
                    <Image style={{ backgroundImage: `url(${RoomIMG})`, height: "300px", width: "60%", }} className="img-container" />
                ) : (
                    <SliderContainer className="img-container">
                        <Slider {...detailsSettings}>
                            {room.images.map(img => (
                                <div className="banners" key={img.uuid}>
                                    <img src={img.url} alt="" />
                                </div>
                            ))}
                        </Slider>
                    </SliderContainer>
                )}

                <Details style={{ width: '40%', marginLeft: '20px' }} className="details">
                    <Text className="clip">{room.name}</Text>
                    <Text className="clamp small" style={{ marginTop: '12px' }}>{room.description}</Text>
                    <Text className="small">Price: <span>{room.price}/-</span></Text>
                    {params['view'] === undefined ? (
                        <FormButton onClick={handleBook}
                            style={{ display: 'initial', marginRight: '16px' }}>
                            Book Room
                        </FormButton>
                    ) : null}
                    {roomNumbers.length !== 0 ? (
                        <SelectBox name="cars" id="cars"
                            onChange={(e) => setroomsNum(Number(e.target.value))}
                            value={roomsNum}>
                            {roomNumbers.map((r, i) => (
                                <option value={i + 1}
                                    key={r}>{`${i === 0 ? '1 Room' : `${i + 1} Rooms`} `}
                                </option>
                            ))}
                        </SelectBox>
                    ) : null}
                </Details>
            </Flex>
            <Features>
                {room.others.concat(room.others).map((oth, index) => (
                    <Text key={index} style={{fontSize: '12px'}} className="small">{oth}</Text>
                ))}
            </Features>
        </CardContainer>
    );
}

export default RoomDetails;

