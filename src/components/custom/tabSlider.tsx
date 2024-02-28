import { useState, useEffect, useRef, FC } from "react";

export interface TabItemsProps {
  items: string[];
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

export const TabSlider: FC<TabItemsProps> = ({
  items,
  selectedTab,
  setSelectedTab,
}) => {
  //   const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef();

  //   useEffect(() => {
  //     firstBtnRef.current?.focus();
  //   }, []);

  return (
    <div className="bg-sky-100 flex justify-center items-center py-12">
      <div className="max-w-md flex flex-col gap-y-2 w-full">
        <div className="bg-transparent p-1 border-1 border-grey-100 rounded-3 flex justify-between items-center gap-x-2 font-bold text-white">
          {items.map((item, index) => (
            <button
              //   ref={index === 0 ? firstBtnRef : null}
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`px-4 py-2 fw-500 border-0 rounded-3 ${
                selectedTab === index
                  ? "bg-primary-50 text-primary-600"
                  : "text-grey-600"
              } `}
              //   className="secondary-btn align-self-baseline"
            >
              {item}
            </button>
          ))}
        </div>

        {/* <div className="bg-white p-2 rounded-xl">
          {items.map((item, index) => (
            <div className={`${selectedTab === index ? "" : "d-none"}`}>
              {item.content}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};
