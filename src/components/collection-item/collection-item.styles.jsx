
import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';


export const CollectionItemContainer = styled.div`
    display               : grid;
    grid-template-rows    : 1fr min-content;    
    position              : relative;
    height                : 450px;

    // below we are saying: "when were hoving our CollectionItemContainer component
    // then apply the following styles to the CollectionItemImage component and to the
    // CollectionItemButton component "

    &:hover {

        .collection-item-container--image {
            opacity: 0.8;
        }

        .collection-item-container--button {
            display      : grid;
            justify-self : center;
            position     : absolute;
            width        : 80%;
            top          : 340px;

            opacity : 0.7;
            outline : none;
        }

    }
`;


export const CollectionItemImage = styled.div`
    // w3schools said: " How To Create Responsive Images? If you want the image to scale
    // both up and down on responsiveness, set the CSS width property to 100% and height
    // to auto ( i.e. { width : 100%; height : auto; } ) " and " If you want an image to
    // scale down if it has to, but never scale up to be larger than its original size,
    // use max-width: 100%; ( i.e. { max-width : 100%; height : auto; } ) "

    width  : 100%;
    height : auto;

    background-size     : cover;
    background-position : center;
    background-image    : ${ ( props ) => `url( ${ props.imageUrl } )` };

    transition : all 0.3s ease;
`;


export const CollectionItemFooter = styled.div`
    display               : grid;
    grid-template-rows    : min-content;
    grid-template-columns : repeat( 2, max-content );
    justify-content       : space-between;
    margin                : 10px 0 0 0;

    font-size : 18px;
`;


// the CollectionItemButton component below is modifying our CustomButtonContainer styles
// inside the custom-button.styles.jsx file and remember this is the only styled-component
// inside the custom-button.styles.jsx file and therefore when we import in " CustomButton "
// above we are really just importing in one styled-component or the CustomButtonContainer
// component inside the custom-button.styles.jsx file
export const CollectionItemButton = styled( CustomButton )`
    display : none;

    transition : all 0.3s ease;
`;


