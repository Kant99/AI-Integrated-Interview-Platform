import StartInterviewButton from "./startInterviewButton";
import UserStats from "./UserStats";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase";

const WelcomeSection = ({ userData, quote }) => {
  const [user] = useAuthState(auth);

  const username =
    user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {username}!
          </h1>
          <p className="mt-2 text-gray-600">{quote}</p>
          <UserStats userData={userData} />
        </div>
        <div className="mt-6 md:mt-0">
          <StartInterviewButton />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
