import BkashGateway from 'bkash-payment-gateway';

const bkashConfig: any = {
    //get intellisense here
    baseURL: 'https://checkout.sandbox.bka.sh/v1.2.0-beta', //do not add a trailing slash
    key: 'abcdxx2369',
    username: 'bkashTest',
    password: 'bkashPassword1',
    secret: 'bkashSup3rS3cRet',
};

const bkash = new BkashGateway(bkashConfig);
export default bkash;