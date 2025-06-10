import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
    const navigate = useNavigate(); 

    return (
      <div style={{ textAlign: "center", padding: "10rem", color: "red", fontSize: "2rem" }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <button
            onClick={() => navigate("/")} 
            className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 rounded w-max cursor-pointer"
          >
            <AiOutlineArrowLeft className="text-xl" />
            Back
          </button>
        </div>
      </div>
    );
};
