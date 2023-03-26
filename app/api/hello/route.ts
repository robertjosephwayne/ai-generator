import { NextResponse } from 'next/server';

export async function GET() {
    const result = await fetch(
        'https://stablediffusionapi.com/api/v3/img2img',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: process.env.STABLE_DIFFUSION_API_KEY,
                prompt: 'a cat sitting on a bench',
                negative_prompt: null,
                init_image:
                    'https://raw.githubusercontent.com/CompVis/stable-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo.png',
                width: '512',
                height: '512',
                samples: '1',
                num_inference_steps: '30',
                safety_checker: 'no',
                enhance_prompt: 'yes',
                guidance_scale: 7.5,
                strength: 0.7,
                seed: null,
                webhook: null,
                track_id: null,
            }),
        },
    );
    const json = await result.json();
    return NextResponse.json(json);
}