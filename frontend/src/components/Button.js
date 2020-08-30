import styled from "styled-components";

export const ButtonContainer = styled.button`
text-transform: capitalize;
border-radius: 9px;
border: none;
padding: 4px 10px 4px 10px;
background: white;
transition:all 0.5 ease-in-out;
&:focus {
    outline: 0 !important;
}
:hover{
    box-shadow: 0px 0px 8px #adb5bd;
}
`