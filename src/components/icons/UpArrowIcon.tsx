import React from "react";
import {ClickableProps} from "../../types/clickableProps";

const UpArrowIcon: React.FC<ClickableProps> = ({ onClick }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 384 512">
        {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
        <path
            d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"/>
    </svg>
);
export default UpArrowIcon;