import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Leave Management System</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate("/login?role=employee")}>
                    Employee Login
                </button>
                <button style={styles.button} onClick={() => navigate("/login?role=management")}>
                    Management Login
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1e3a8a",
        color: "white",
    },
    heading: {
        fontSize: "2rem",
        marginBottom: "20px",
    },
    buttonContainer: {
        display: "flex",
        gap: "20px",
    },
    button: {
        padding: "12px 24px",
        fontSize: "1rem",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#f5f5f5",
        color: "#1e3a8a",
        fontWeight: "bold",
        transition: "0.3s",
    },
    buttonHover: {
        backgroundColor: "#ddd",
    },
};

export default Home;