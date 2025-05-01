import { useEffect, useState } from "react";
import { UserIcon } from "lucide-react";
import { auth } from "../../../services/firebase";

const UserStats = () => {
  const [joinDate, setJoinDate] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime);
      const formatted = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      setJoinDate(formatted);
    }
  }, []);

  return (
    <div className="mt-4 flex items-center text-sm text-gray-500">
      <UserIcon className="h-4 w-4 mr-1" />
      <span>
        {joinDate ? `Member since ${joinDate}` : "Loading member info..."}
      </span>
      <span className="mx-2">•</span>
      <span>{/* Replace this with dynamic interview count when available */}5 interviews completed</span>
    </div>
  );
};

export default UserStats;
