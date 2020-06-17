export const hasAuth = (
    !!process.env.REACT_APP_AUTH0_DOMAIN &&
    !!process.env.REACT_APP_AUTH0_CLIENT_ID
);
