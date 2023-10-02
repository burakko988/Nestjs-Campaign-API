const userExceptions = {
    UserAlreadyExist: "'USER_ALREADY_EXIST'",
};
const productExceptions = {
    ProductNotFound: 'PRODUCT_DID_NOT_FOUND',
    StockNotEnough: 'STOCK_NOT_ENOUGH',
};
const categoryExceptions = {
    CategoryNotFound: 'CATEGORY_DID_NOT_FOUND',
};
const authExceptions = {
    WrongPassword: 'WRONG_PASSWORD',
    EmailNotCorrect: 'EMAIL_NOT_CORRECT',
    EmailAlreadyExists: 'EMAIL_ALREADY_EXISTS',
    InvalidRefreshToken: 'INVALID_REFRESH_TOKEN',
};
const orderExceptions = {
    OrderNotFound: 'ORDER_DID_NOT_FOUND',
};

export { userExceptions, productExceptions, categoryExceptions, authExceptions, orderExceptions };
