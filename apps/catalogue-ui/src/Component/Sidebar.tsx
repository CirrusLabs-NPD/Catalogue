import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, LayoutDashboard, PieChart, Shield, Plus } from "lucide-react";
import { useStatusContext } from "./StatusContext";

interface SidebarProps {
  userRole: string;
}

const statusColors: { [key: string]: string } = {
  "Ongoing": "#34C759",
  "Completed": "#FF9500",
  "Delayed": "#AF52DE",
  "At Risk": "#007AFF",
  "Awaiting Deletion": "#FF3B30",
};

const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
  const [randomColors, setRandomColors] = useState<{ [key: string]: string }>({});
  const { statuses, fetchStatuses, loading, error } = useStatusContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (statuses.length === 0) {
      fetchStatuses();
    }
  }, [statuses, fetchStatuses]);

  const handleStatusClick = (status: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append("statuses", status);
    navigate(`/projects/filter?${searchParams.toString()}`);
  };

  const handleAddStatusClick = () => {
    navigate("/ProjectStatus");
  };

  return (
    <aside className="fixed top-18 left-0 h-full w-72 bg-white shadow-lg">
      <div className="p-6 space-y-6">
        <Link to="/addpage">
          <button className="w-full flex items-center justify-center rounded-lg p-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-md hover:from-red-700 hover:to-red-800 transition duration-300">
            <PlusCircle className="mr-2" size={20} />
            <span>Add Project</span>
          </button>
        </Link>

        <nav className="space-y-2">
          <NavLink to="/home" icon={<LayoutDashboard size={20} />} label="Projects" />
          <NavLink to="/analytics" icon={<PieChart size={20} />} label="Analytics" />
          {userRole === "admin" && (
            <NavLink to="/AdminDashboard" icon={<Shield size={20} />} label="Admin Dashboard" />
          )}
        </nav>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">MY PROJECT STATUS</span>
            {userRole === "admin" && (
              <button
                onClick={handleAddStatusClick}
                className="text-red-600 hover:text-red-700"
              >
                <Plus size={20} />
              </button>
            )}
          </div>
          <div className="space-y-2">
            {loading ? (
              <p className="text-gray-500">Loading statuses...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : statuses.length > 0 ? (
              statuses.map((status) => {
                const color = statusColors[status.projectStatus] || randomColors[status.projectStatus] || generateRandomColor();

                if (!randomColors[status.projectStatus] && !statusColors[status.projectStatus]) {
                  setRandomColors((prev) => ({ ...prev, [status.projectStatus]: color }));
                }

                return (
                  <div
                    key={status._id}
                    className="relative"
                    onMouseEnter={() => setHoveredStatus(status.projectStatus)}
                    onMouseLeave={() => setHoveredStatus(null)}
                    onClick={() => handleStatusClick(status.projectStatus)}
                  >
                    <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150">
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-gray-700">{status.projectStatus}</span>
                    </div>
                    {hoveredStatus === status.projectStatus && (
                      <div className="absolute left-full ml-2 top-0 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-10">
                        {`View projects with status ${status.projectStatus}`}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No statuses available</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150">
    <span className="mr-3 text-gray-500">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Sidebar;
