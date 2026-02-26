import React from 'react';
import { Leaf, Droplets, Sun, Wind, Sprout } from 'lucide-react';
import './Tools.css';

const Tools = () => {
    const tools = [
        {
            title: 'Fertilizer Calculator',
            description: 'Calculate the exact amount of NPK needed based on your crop and field size.',
            icon: <Sprout size={32} />
        },
        {
            title: 'Water Requirement',
            description: 'Estimate daily water needs based on crop stage and local weather.',
            icon: <Droplets size={32} />
        },
        {
            title: 'Weather Forecast',
            description: 'Get 7-day agricultural weather forecast to plan your activities.',
            icon: <Sun size={32} />
        },
        {
            title: 'Pest Alert System',
            description: 'Receive alerts about common pests in your region based on climate conditions.',
            icon: <Wind size={32} />
        }
    ];

    return (
        <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="heading-1 text-gradient">Agricultural Tools</h1>
                <p className="body-text">Utility calculators and trackers to help you manage your farm better.</p>
            </div>

            <div className="tools-grid">
                {tools.map((tool, index) => (
                    <div key={index} className="tool-card glass-panel flex-center" style={{ flexDirection: 'column', textAlign: 'center', padding: '2rem' }}>
                        <div className="tool-icon-wrapper flex-center">
                            {tool.icon}
                        </div>
                        <h3 className="heading-2" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{tool.title}</h3>
                        <p className="body-text" style={{ marginBottom: '1.5rem' }}>{tool.description}</p>
                        <button className="btn-secondary" style={{ width: '100%' }}>Launch Tool</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tools;
