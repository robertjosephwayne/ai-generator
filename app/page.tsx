'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const [response, setResponse] = useState({});
    const [resultImage, setResultImage] = useState(null);

    const getResponse = async () => {
        const response = await fetch('/api/hello');
        const json = await response.json();
        setResultImage(json.output[0]);
        setResponse(json);
    };

    useEffect(() => {
        getResponse();
    }, []);

    return <div>{resultImage ? <img src={resultImage} /> : ''}</div>;
}
