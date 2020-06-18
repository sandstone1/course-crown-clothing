
import styled from 'styled-components';


export const CollectionPageContainer = styled.div`
    display : grid;
`;


export const CollectionPageTitle = styled.h2`
    justify-self : center;
    margin       : 0 0 30px 0;

    font-size : 38px;
`;


export const CollectionPageItemsContainer = styled.div`
    display               : grid;
    grid-template-rows    : auto;
    grid-template-columns : repeat( 4, 1fr );
    grid-gap              : 40px 4%; 
`;