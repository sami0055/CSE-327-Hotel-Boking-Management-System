import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from '../SearchBox/SearchBox';
import styled from "styled-components";

/**
 * Represents a styled container for the left sidebar.
 * @component
 */
const SidebarContainer = styled.div`
    background: #fff;
    border-radius: 10px;
    position: fixed;
    width: 460px;
    z-index: 9;

    @media(max-width: 1000px) {
        width: 100%;
        position: relative;
    }
`;

/**
 * Represents the left sidebar component.
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.data - The data to be passed to the SearchBox component.
 * @returns {JSX.Element} The rendered left sidebar component.
 */
const LeftSidebar = (props) => {
    /**
     * Renders the left sidebar component.
     * @returns {JSX.Element} The rendered left sidebar component.
     */
    return (
        <SidebarContainer>
            {/* Renders the SearchBox component */}
            <SearchBox params={props.data} styles={{
                background: '#ff6e2926',
            }}/>
        </SidebarContainer>
    );
};

export default LeftSidebar;
