
import styled from 'styled-components';


export const CollectionPreviewContainer = styled.div`
    margin : 0 0 40px 0;
`;


export const CollectionPreviewTitle = styled.h1`
    margin : 0 0 25px 0;

    font-size : 28px;
`;


export const CollectionPreviewItems = styled.div`
    display               : grid;
    grid-template-rows    : min-content;
    grid-template-columns : repeat( 4, 1fr );
    grid-column-gap       : 4%;
`;