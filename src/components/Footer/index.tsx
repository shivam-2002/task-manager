import React from "react";
import StyledFooter from "./styled";

const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <p>&copy; {new Date().getFullYear()} Task Management System. All rights reserved. | Designed by <a href={"https://portfolio.shivamtech.xyz/"} target="_blank"> Shivam</a></p>
        </StyledFooter>
    );
};

export default Footer;