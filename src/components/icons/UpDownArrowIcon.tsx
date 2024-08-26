import React from "react";
import {ClickableProps} from "../../types/clickableProps";

const DownArrowIcon: React.FC<ClickableProps> = ({ onClick }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 384 512">
        {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
        <path
            d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/>
    </svg>
);
export default DownArrowIcon;