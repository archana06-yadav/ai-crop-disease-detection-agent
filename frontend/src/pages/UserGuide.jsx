import React from 'react';
import { Camera, Sun, ZoomIn, Beaker } from 'lucide-react';
import './UserGuide.css';

const UserGuide = () => {
    const steps = [
        {
            title: 'Find the affected leaf',
            description: 'Choose a leaf that clearly shows the disease symptoms for the most accurate diagnosis.',
            icon: <ZoomIn size={32} />
        },
        {
            title: 'Ensure good lighting',
            description: 'Take the picture in natural daylight or well-lit conditions. Avoid harsh shadows.',
            icon: <Sun size={32} />
        },
        {
            title: 'Take a clear photo',
            description: 'Focus on the leaf. Make sure the image is not blurry and the leaf fills most of the frame.',
            icon: <Camera size={32} />
        },
        {
            title: 'Get instant diagnosis',
            description: 'Upload the image to get an AI-powered diagnosis and personalized treatment plan.',
            icon: <Beaker size={32} />
        }
    ];

    return (
        <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                <h1 className="heading-1 text-gradient">How to Use AI Crop Doctor</h1>
                <p className="body-text">Follow these simple steps to get the most accurate results from our AI diagnosis tool.</p>
            </div>

            <div className="guide-steps">
                {steps.map((step, index) => (
                    <div key={index} className="step-card glass-panel flex-center" style={{ flexDirection: 'column', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div className="step-number">{index + 1}</div>
                        <div className="step-icon">
                            {step.icon}
                        </div>
                        <h3 className="heading-2" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{step.title}</h3>
                        <p className="body-text">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserGuide;
