import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
    const [reactionTimes, setReactionTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTime, setNewTime] = useState('');
    const [submissionError, setSubmissionError] = useState(null);
    const [isTiming, setIsTiming] = useState(false);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        const fetchReactionTimes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const decodedToken = jwtDecode(token);

                const userId = decodedToken.id;

                const response = await api.get(`/get-reaction-times/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setReactionTimes(response.data);
            } catch (err) {
                setError('Failed to fetch reaction times');
            } finally {
                setLoading(false);
            }
        };

        fetchReactionTimes();
    }, []);

    const startTimer = () => {
        setStartTime(Date.now());
        setIsTiming(true);
        setNewTime('');
    };

    const stopTimer = async () => {
        if (isTiming) {
            const reactionTime = Date.now() - startTime;
            setIsTiming(false);
            setNewTime(reactionTime);
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await api.post('/submit-reaction-time', { time: reactionTime }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setReactionTimes([...reactionTimes, response.data]);
                setSubmissionError(null);
            } catch (err) {
                setSubmissionError('Failed to submit reaction time');
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Your Reaction Times</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {reactionTimes.length === 0 ? (
                <div>
                    <p>No reaction times available. Please try the F1 Reaction Timer:</p>
                    <button onClick={startTimer} disabled={isTiming}>
                        {isTiming ? 'Timing...' : 'Start F1 Reaction Timer'}
                    </button>
                    {isTiming && <button onClick={stopTimer}>Stop Timer</button>}
                    {newTime && <p>Your time: {newTime} ms</p>}
                    {submissionError && <p>{submissionError}</p>}
                </div>
            ) : (
                <div>
                    <ul>
                        {reactionTimes.map((entry, index) => (
                            <li key={index}>Time: {entry.time} ms</li>
                        ))}
                    </ul>
                    <button onClick={startTimer} disabled={isTiming}>
                        {isTiming ? 'Timing...' : 'Start F1 Reaction Timer'}
                    </button>
                    {isTiming && <button onClick={stopTimer}>Stop Timer</button>}
                    {newTime && <p>Your time: {newTime} ms</p>}
                    {submissionError && <p>{submissionError}</p>}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
