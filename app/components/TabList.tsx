import Image from 'next/image'
import Tab from "./Tab";
import { useState } from "react";
import ChartRender from "./ChartRender";
import { useCompanyStore } from "../store";

function TabList() {
  const { companies } = useCompanyStore();
  const [activeTab, setActiveTab] = useState<string>(
    companies.length > 0 ? companies[0].id : "c1"
  );

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="flex-col grow">
      <div className="flex mx-4">
        {companies.map((tab) => (
          <Tab
            key={tab.id}
            title={tab.name}
            isActive={activeTab === tab.id}
            id={tab.id}
            onClick={() => handleTabClick(tab.id)}
          />
        ))}
      </div>

      <div
        className="flex-col flex-wrap grow p-4 bg-gray-500 mx-4 mb-4 min-h-[300px]
        rounded-tr-lg rounded-br-lg rounded-bl-lg "
      >
        {companies.find((tab) => tab.id === activeTab)?.emissions?.length ? (
          <div className="basis-full my-4 flex-shrink-0">
            <ChartRender companyId={activeTab} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-white p-4">No charts to display</p>
                <Image src="/Pie chart.png"
                    width={200}
                    height={200}
                    alt="No chart"
                />
          </div>
        )}
      </div>

    </div>
  );
}

export default TabList;
