type TabProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
  id: string;
};

function Tab({ title, isActive, onClick }: TabProps) {
  return (
    <div
      className={`flex items-center px-4 py-2 rounded-t-md cursor-pointer 
        ${isActive ? "bg-gray-500 text-black" : "bg-gray-400 text-white"}`}
      onClick={onClick}
    >
        <span className="mr-2">{title}</span>
    </div>
  );
}

export default Tab;
