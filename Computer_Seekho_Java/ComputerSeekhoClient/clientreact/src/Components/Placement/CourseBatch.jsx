import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseBatch.css";

const CourseBatch = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/batch/all");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setBatches(data.slice(0, 3)); // Sirf pehle 3 batches dikhane ke liye
                } else {
                    setBatches([]);
                }
            } catch (error) {
                console.error("Error fetching batches:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (batches.length === 0) {
        return <p className="no-data">No batches found</p>;
    }

    return (
        <div className="course-batch-container">
            <h2 className="title">BATCHES</h2>
            <div className="batch-list">
                {batches.map((batch) => (
                    <div key={batch.batchId} className="batch-card" onClick={() => navigate(`/batch/${batch.batchId}`)}>
                        <img className="batch-image" src={batch.batchPhoto} alt={batch.batchName} />
                        <div className="batch-info">
                            <h3>{batch.batchName}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseBatch;


