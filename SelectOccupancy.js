import React from 'react';
import styled from "styled-components";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Input, InputContainer } from '../GlobalStyles/FormStyles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

/**
 * Styled component for the occupancy box.
 */
const OcpBox = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    width: 100%;
    padding: 10px 12px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #b6b6b6;
`;

/**
 * Styled component for the selection box.
 */
const SelectionBox = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    width: 100%;
    padding: 10px 12px;
    border-radius: 4px;
    .sec {
        display: flex;
        align-items: center;
    }
    .icon {
        color: #ff6e29 !important;
        cursor: pointer;
    }
`;

/**
 * SelectOccupancy component for selecting number of adults and children.
 * @param {Object} props - Component props.
 * @param {Function} props.setCount - Function to set the count of people.
 * @param {Object} props.count - Current count of children and adults.
 * @returns {JSX.Element} The rendered component.
 */
const SelectOccupancy = (props) => {
    const { setCount, count } = props;

    return (
        <Tippy
            placement="bottom"
            interactive={true}
            content={<SelectBox setCount={setCount} count={count} />}
            theme="light"
        >
            <OcpBox>
                {count.children + count.adults} People
            </OcpBox>
        </Tippy>
    );
};

/**
 * SelectBox component for incrementing and decrementing number of adults and children.
 * @param {Object} props - Component props.
 * @param {Function} props.setCount - Function to set the count of people.
 * @param {Object} props.count - Current count of children and adults.
 * @returns {JSX.Element} The rendered component.
 */
const SelectBox = (props) => {
    const { setCount, count } = props;

    /**
     * Increment the count for either children or adults.
     * @param {string} p - The type of count to increment ('children' or 'adults').
     */
    const inc = (p) => {
        if (p === 'children') {
            setCount({ ...count, children: count.children + 1 });
        } else {
            setCount({ ...count, adults: count.adults + 1 });
        }
    };

    /**
     * Decrement the count for either children or adults.
     * @param {string} p - The type of count to decrement ('children' or 'adults').
     */
    const dec = (p) => {
        if (p === 'children') {
            if (count.children === 0) return;
            setCount({ ...count, children: count.children - 1 });
        } else {
            if (count.adults === 0) return;
            setCount({ ...count, adults: count.adults - 1 });
        }
    };

    return (
        <SelectionBox>
            <InputContainer style={{ marginRight: '26px' }}>
                <label style={{ color: '#000', textAlign: 'center' }}>Children</label>
                <div className="sec">
                    <RemoveCircleIcon onClick={() => dec('children')} className="icon" />
                    <Input
                        value={count.children}
                        placeholder="Number of children"
                        type="number"
                        min="0"
                        style={{ margin: '0 8px' }}
                        onChange={(e) => {
                            let v = Number(e.target.value);
                            setCount({ ...count, children: v });
                        }}
                    />
                    <AddCircleIcon onClick={() => inc('children')} className="icon" />
                </div>
            </InputContainer>
            <InputContainer>
                <label style={{ color: '#000', textAlign: 'center' }}>Adults</label>
                <div className="sec">
                    <RemoveCircleIcon onClick={() => dec('adults')} className="icon" />
                    <Input
                        value={count.adults}
                        placeholder="Number of adults"
                        type="number"
                        min="0"
                        style={{ margin: '0 8px' }}
                        onChange={(e) => {
                            let v = Number(e.target.value);
                            setCount({ ...count, adults: v });
                        }}
                    />
                    <AddCircleIcon onClick={() => inc('adults')} className="icon" />
                </div>
            </InputContainer>
        </SelectionBox>
    );
};

export default SelectOccupancy;