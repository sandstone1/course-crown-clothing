
import styled from 'styled-components';

// I used flexbox below and had to use flexbox below and not grid in order for the flexbox
// styles in menu-item.styles.jsx file to work and flexbox allowed ( especially flex : 1 1 auto;
// in the menu-item.styles.jsx file ) boxes 4 & 5 to fill up the bottom row and I could not
// figure out how to do this with grid
export const DirectoryMenuContainer = styled.div`
    display   : flex;
    flex-wrap : wrap;
    width     : 100%;
`;