
import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const { dispatch } = useWorkoutsContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        try {
            const response = await fetch("/api/workouts", {
                method: "POST",
                body: JSON.stringify(workout),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || "Could not add workout");
                return;
            }

            setTitle("");
            setLoad("");
            setReps("");
            setError(null);

            dispatch({
                type: "CREATE_WORKOUT",
                payload: json,
            });

            console.log("New workout added", json);
        } catch (err) {
            setError("Could not connect to the server");
            console.error(err);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                required
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                required
            />

            <button type="submit">Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
