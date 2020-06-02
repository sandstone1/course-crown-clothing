
import styled from 'styled-components';


// the SpinnerOverlay component makes sure that our spinner is always centered
export const SpinnerOverlay = styled.div`
    display         : grid;
    align-items     : center;
    justify-content : center;
    width           : 100%;
    height          : 60vh;
`;


// the SpinnerContainer component is our actual spinner

// CSS Animation Properties
// The following table lists the @keyframes rule and all the CSS animation
// properties:

// @keyframes - Specifies the animation code
// animation - A shorthand property for setting all the animation properties
// animation-delay - Specifies a delay for the start of an animation
// animation-direction - Specifies whether an animation should be played forwards, backwards
// or in alternate cycles
// animation-duration -	Specifies how long time an animation should take to complete one cycle
// animation-fill-mode - Specifies a style for the element when the animation is not playing
// (before it starts, after it ends, or both)
// animation-iteration-count - Specifies the number of times an animation should be played
// animation-name -	Specifies the name of the @keyframes animation
// animation-play-state - Specifies whether the animation is running or paused
// animation-timing-function - Specifies the speed curve of the animation

// for @keyframes, remember " from " is the same as 0% and " to " is the same as 100%
export const SpinnerContainer = styled.div`
    display : inline-block;
    width   : 50px;
    height  : 50px;

    border        : 3px solid rgba( 195, 195, 195, 0.6  );
    border-top    : rgba( 99, 103, 103, 1 );
    border-radius : 50%;

    animation : spin 1s ease-in-out infinite;

    @keyframes spin {

        from {
            transform : rotate( 0deg );
        }

        to {
            transform : rotate( 360deg );
        }

    }
`;

