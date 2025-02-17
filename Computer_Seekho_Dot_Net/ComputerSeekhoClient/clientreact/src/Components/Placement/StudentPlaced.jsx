import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StudentPlaced.css";
const StudentPlaced = () => {
    const { batchId } = useParams();
    const [placements, setPlacements] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/placement/getByBatch/${batchId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Placements:", data);
                setPlacements(Array.isArray(data) ? data : [data]); // Ensure data is array
            })
            .catch((error) => console.error("Error fetching placements:", error));
    }, [batchId]);

    return (
        <div className="placements-container">
            <h2 className="title">PLACEMENTS FOR BATCH {batchId}</h2>
            <div className="placement-list">
                {placements.length > 0 ? (
                    placements.map((placement) => (
                        <div key={placement.placementID} className="placement-card">
                            <img 
                                src={placement.studentID.photoUrl} 
                                alt={placement.studentID.studentName} 
                                className="student-image" 
                            />
                            <div className="placement-info">
                                <h5 className="student-name">{placement.studentID.studentName}</h5>
                                <p className="recruiter-name">{placement.recruiterID.recruiterName}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-placements">No placements available for this batch.</p>
                )}
            </div>
        </div>
        
    );
};

export default StudentPlaced;




