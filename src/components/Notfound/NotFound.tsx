import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
    const navigate = useNavigate(); 

    return (
      <main className="p-10 text-red-600 text-2xl text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg mt-2">Sorry, the page you're looking for doesn't exist.</p>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/")} 
            className="flex items-center gap-2 text-blue-600 font-semibold px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition"
          >
            <AiOutlineArrowLeft className="text-xl" />
            Back
          </button>
        </div>
      </main>
    );
};