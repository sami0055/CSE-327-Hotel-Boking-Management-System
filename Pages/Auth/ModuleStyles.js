import styled from 'styled-components';

/**
 * Container for the authentication page.
 * This container ensures that its children are centered both vertically and horizontally.
 *
 * @component
 * @example
 * return (
 *   <AuthContainer>
 *     <YourComponent />
 *   </AuthContainer>
 * )
 */
export const AuthContainer = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

/**
 * Container for the form elements.
 * This container provides a fixed width, padding, shadow, and border-radius for its children.
 *
 * @component
 * @example
 * return (
 *   <FormContainer>
 *     <YourFormComponent />
 *   </FormContainer>
 * )
 */
export const FormContainer = styled.div`
    width: 450px;
    padding: 16px;
    box-shadow: 0 0 10px #bbbbbb;
    border-radius: 6px;
`;

/**
 * Container for the form buttons.
 * This container arranges its children with space between them and adds a top margin.
 *
 * @component
 * @example
 * return (
 *   <ButtonsContainer>
 *     <Button1 />
 *     <Button2 />
 *   </ButtonsContainer>
 * )
 */
export const ButtonsContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;