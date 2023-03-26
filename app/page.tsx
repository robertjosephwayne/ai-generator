'use client';

import { useState } from 'react';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';

const validationSchema = yup.object({
    imageUrl: yup.string().required('Required'),
    prompt: yup.string().required('Required'),
});

export default function Home() {
    const [response, setResponse] = useState({});
    const [resultImage, setResultImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            imageUrl:
                'https://raw.githubusercontent.com/CompVis/stable-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo.png',
            prompt: 'a cat sitting on a bench',
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            getResponse(values.prompt, values.imageUrl);
        },
    });

    const getResponse = async (prompt: string, imageUrl: string) => {
        setIsLoading(true);
        const body = { prompt, imageUrl };
        const response = await fetch('/api/hello', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        const json = await response.json();
        setResultImage(json.output[0]);
        setResponse(json);
        setIsLoading(false);
    };

    return (
        <div>
            {resultImage ? <img src={resultImage} /> : ''}
            {isLoading ? 'Loading...' : <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { my: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px',
                    }}>
                    <TextField
                        id="imageUrl"
                        name="imageUrl"
                        label="Image URL"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.imageUrl &&
                            Boolean(formik.errors.imageUrl)
                        }
                        helperText={
                            formik.touched.imageUrl && formik.errors.imageUrl
                        }
                    />

                    <TextField
                        id="prompt"
                        name="prompt"
                        label="Prompt"
                        value={formik.values.prompt}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.prompt &&
                            Boolean(formik.errors.prompt)
                        }
                        helperText={
                            formik.touched.prompt && formik.errors.prompt
                        }
                    />
                    <Button color="primary" variant="contained" type="submit">
                        Submit
                    </Button>
                </Box>
            </form>}
        </div>
    );
}
