import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import React from "react";
// sidebar context
const SidebarContext = createContext();

export default function SidebarLogic({ children }) {
  // collapse sidebar
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://i.ibb.co/bMm0tJ5j/website-icon.png"
            alt="website-icon"
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-green-300"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* user section */}
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Landon+Thompson"
            alt="profile-initials"
            className="w-10 h-10 rounded-md"
          />
          {/* user info section */}
          <div
            className={`flex justify-between items-center 
                        overflow-hidden transition-all ${
                          expanded ? "w-52 ml-3" : "w-0"
                        }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">LandonThompson</h4>
              <span className="text-xs text-gray-600">lanthomp@gmail.com</span>
            </div>
            {/* logout button? */}
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

// logic for the sidebar items themselves
export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      onClick={onClick}
      className={`
            relative flex items-center py-2 px-3 
            my-1 font-medium rounded-md cursor-pointer
            transition-colors group
            ${
              active
                ? "bg-gradient-to-tr from-purple-300 to bg-purple-100 text-black"
                : "hover:bg-purple-100 text-black"
            }    
        `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${
            expanded ? "" : "top-2"
          }
                `}
        />
      )}

      {!expanded && (
        <div
          className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-purple-300 text-black text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
