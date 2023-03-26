import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { prompt, imageUrl } = await request.json();

    const result = await fetch(
        'https://stablediffusionapi.com/api/v3/img2img',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: process.env.STABLE_DIFFUSION_API_KEY,
                prompt,
                negative_prompt: null,
                init_image: imageUrl,
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
    let json = await result.json();
    while (json.status === 'processing') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await fetch(
            `https://stablediffusionapi.com/api/v3/fetch/${json.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: process.env.STABLE_DIFFUSION_API_KEY,
                }),
            },
        );
        json = await result.json();
    }
    
    return NextResponse.json(json);
}