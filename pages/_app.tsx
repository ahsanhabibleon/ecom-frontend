import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import "../styles/global.scss"
import { notification } from 'antd';
import { StoreProvider } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  notification.config({
    // placement: 'bottomRight',
    // bottom: 50,
    duration: 3,
    // rtl: true,
  });
  return <StoreProvider >
    <Component {...pageProps} />
  </StoreProvider>
}

export default MyApp
