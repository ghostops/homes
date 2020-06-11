interface Props {
    width: number;
    height: number;
    fill: string;
}

export const MapMarkerSVG = (props: Props) => `
<svg width="${props.width}" height="${props.height}" viewBox="0 0 83 100" xmlns="http://www.w3.org/2000/svg">
<path d="M70.818 12.09C54.61 -4.11701 28.421 -3.98601 12.214 12.222C-3.99401 28.429 -4.10901 54.676 12.098 70.884L41.382 100L70.729 70.653C86.937 54.445 87.026 28.298 70.818 12.09ZM41.493 66.225C27.704 66.225 16.525 55.045 16.525 41.256C16.525 27.466 27.704 16.287 41.493 16.287C55.283 16.287 66.462 27.466 66.462 41.256C66.462 55.045 55.283 66.225 41.493 66.225Z" fill="${props.fill}"/>
<path d="M59.086 40.231L40.993 22.22L23.099 39.856L29.14 39.923V54.633H53.14V40.167L59.086 40.231Z" fill="${props.fill}"/>
</svg>
`;
