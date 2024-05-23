import styled from "styled-components"

/**
 * Represents a styled container for layout purposes.
 * @constant {StyledComponent} Layout - A styled div element with specific CSS properties.
 * @property {string} display - Specifies the display behavior as flex.
 * @property {string} max-width - Sets the maximum width to 1200px.
 * @property {string} margin - Sets the margins to 80px on top, 10px on the bottom, and auto on the left and right.
 * @property {string} border - Sets the border to 0.5px solid #d8d8d8.
 * @property {string} justify-content - Aligns the items along the main axis with space-between.
 * @property {string} &.buttons - Modifies the styles when the element has the class 'buttons'.
 * @property {string} .section - Modifies the styles of elements with the class 'section'.
 * @returns {StyledComponent} The styled Layout component.
 */
export const Layout = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 80px auto 10px auto;
    border: 0.5px solid #d8d8d8;
    &.buttons{
        justify-content: space-between;
        border: 0;
        margin-top: 10px;
        @media(max-width: 576px){
            flex-direction: row;
        }
    }
    .section{
        margin: 16px;
        :first-child{
            flex-basis: 60%;
            border-right: 0.5px solid #d8d8d8;
            @media(max-width: 576px){
                border-right: 0
            }
        }
        :last-child{
            flex-basis: 40%
        }
    }
    @media(max-width: 576px){
        flex-direction: column;
        button{
            width: fit-content;
            margin-bottom: 16px;
        }
    }
`

/**
 * Represents a styled confirmation message container.
 * @constant {StyledComponent} Confirmation - A styled div element for displaying confirmation messages.
 * @property {string} max-width - Sets the maximum width to 1200px.
 * @property {string} margin - Sets the margins to 80px on top, 10px on the bottom, and auto on the left and right.
 * @property {string} border - Sets the border to 0.5px solid #d8d8d8.
 * @property {string} display - Specifies the display behavior as flex.
 * @property {string} align-items - Aligns the items along the cross axis to the center.
 * @property {string} justify-content - Aligns the items along the main axis to the center.
 * @property {string} padding - Sets the padding to 20px.
 * @returns {StyledComponent} The styled Confirmation component.
 */

export const Confirmation = styled.div`
    max-width: 1200px;
    margin: 80px auto 10px auto;
    border: 0.5px solid #d8d8d8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`