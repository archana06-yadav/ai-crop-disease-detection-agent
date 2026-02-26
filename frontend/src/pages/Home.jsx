import React, { useState } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, CheckCircle2, Loader, Menu, X } from 'lucide-react';
import './Home.css';

const API_URL = 'http://127.0.0.1:5000';

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [report, setReport] = useState(null);
    const [reportLoading, setReportLoading] = useState(false);
    const [questionnaire, setQuestionnaire] = useState(false);

    // Questionnaire form state
    const [formData, setFormData] = useState({
        leaf_discoloration: '',
        wilting_dropping: '',
        recent_weather: '',
        temperature_condition: '',
        recent_fertilizer: '',
        previous_pesticide: '',
        insects_observed: '',
        evidence_of_damage: '',
        watering_frequency: '',
        plant_age_growth: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setPrediction(null);
            setReport(null);
            setError(null);
            setQuestionnaire(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setPrediction(null);
            setReport(null);
            setError(null);
            setQuestionnaire(false);
        }
    };

    const handlePredict = async () => {
        if (!selectedImage) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await axios.post(`${API_URL}/predict`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setPrediction(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to predict. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateReport = async () => {
        if (!prediction) return;

        setReportLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/get_diagnosis`, {
                disease_name: prediction.predicted_class_name,
                user_context: formData,
                lang: 'en'
            });
            setReport(response.data.report);
            setQuestionnaire(false);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate report.');
        } finally {
            setReportLoading(false);
        }
    };

    return (
        <div className="home-container container">
            <div className="hero-section">
                <h1 className="heading-1 text-gradient">AI Crop Disease Diagnosis</h1>
                <p className="body-text">Upload a picture of your plant leaf and get an instant AI-powered diagnosis along with tailored treatment plans.</p>
            </div>

            <div className="diagnosis-grid">
                {/* Upload Section */}
                <div className="upload-card glass-panel">
                    <h2 className="heading-2">Upload Image</h2>

                    <div
                        className={`drop-zone ${previewUrl ? 'has-image' : ''}`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {previewUrl ? (
                            <div className="image-preview-container">
                                <img src={previewUrl} alt="Preview" className="image-preview" />
                                <button className="remove-image-btn" onClick={() => { setSelectedImage(null); setPreviewUrl(null); }}>
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="drop-content flex-center" style={{ flexDirection: 'column' }}>
                                <Upload size={48} className="text-light" style={{ marginBottom: '1rem' }} />
                                <p>Drag & drop your leaf image here</p>
                                <span className="text-light" style={{ margin: '0.5rem 0' }}>or</span>
                                <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                                    Browse Files
                                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="actions" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <button
                            className="btn-primary"
                            onClick={handlePredict}
                            disabled={!selectedImage || loading}
                            style={{ width: '100%', maxWidth: '300px' }}
                        >
                            {loading ? <><Loader className="spin" size={20} /> Analyzing...</> : 'Analyze Image'}
                        </button>
                    </div>

                    {error && (
                        <div className="error-alert">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {prediction && (
                    <div className="result-card glass-panel animate-fade-in">
                        <h2 className="heading-2">Diagnosis Result</h2>
                        <div className="prediction-box">
                            <CheckCircle2 color="var(--primary-color)" size={32} />
                            <div>
                                <h3 className="disease-name">{prediction.predicted_class_name.replace(/_/g, ' ')}</h3>
                                <p className="confidence">Confidence: {prediction.confidence.toFixed(2)}%</p>
                            </div>
                        </div>

                        {!report && !questionnaire ? (
                            <div style={{ marginTop: '2rem' }}>
                                <p className="body-text" style={{ marginBottom: '1rem' }}>Get a detailed personalized report by providing context, or generate an instant report.</p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn-primary flex-1" onClick={generateReport} disabled={reportLoading}>
                                        {reportLoading ? <Loader className="spin" size={20} /> : 'Instant Report'}
                                    </button>
                                    <button className="btn-secondary flex-1" onClick={() => setQuestionnaire(true)}>
                                        Add Context
                                    </button>
                                </div>
                            </div>
                        ) : null}

                        {questionnaire && !report && (
                            <div className="questionnaire animate-fade-in">
                                <h3 style={{ marginBottom: '1rem', marginTop: '1.5rem' }}>Additional Context</h3>
                                <div className="form-group">
                                    <label>Leaf discoloration observed?</label>
                                    <input type="text" name="leaf_discoloration" value={formData.leaf_discoloration} onChange={handleFormChange} placeholder="e.g. Yellow spots" />
                                </div>
                                <div className="form-group">
                                    <label>Recent weather?</label>
                                    <input type="text" name="recent_weather" value={formData.recent_weather} onChange={handleFormChange} placeholder="e.g. Heavy rain" />
                                </div>
                                <button className="btn-primary" onClick={generateReport} disabled={reportLoading} style={{ width: '100%', marginTop: '1rem' }}>
                                    {reportLoading ? <Loader className="spin" size={20} /> : 'Generate Detailed Report'}
                                </button>
                            </div>
                        )}

                        {report && (
                            <div className="report-container animate-fade-in">
                                <h3>Treatment Plan</h3>
                                {/* Simple markdown parser for the report display */}
                                <div className="report-content">
                                    {report.split('\n').map((line, idx) => {
                                        if (line.startsWith('*') && line.endsWith('*')) return <strong key={idx} style={{ display: 'block', marginTop: '1rem' }}>{line.replace(/\*/g, '')}</strong>;
                                        if (line.startsWith('-')) return <li key={idx} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{line.substring(1)}</li>;
                                        if (line.trim() === '') return <br key={idx} />;
                                        return <p key={idx} style={{ marginBottom: '0.5rem' }}>{line}</p>;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
