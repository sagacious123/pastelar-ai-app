export const SliderMenu = ({
  className,
  data,
  headings,
  activeMenu,
  setActiveMenu,
}: {
  className?: string;
  data?: any;
  headings: string[];
  activeMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleHeadingClick = (index: number) => {
    setActiveMenu(index);
  };

  return (
    <div className={`border-bottom border-grey-100 mb-3 ${className}`} style={{ overflowX: "auto" }}>
      <div className='heading-wrapper'>
        {headings.map((heading, index) => (
          <div
            key={index}
            onClick={() => handleHeadingClick(index)}
            className={
              index === activeMenu ? "heading col active text-grey-600" : "heading col text-grey-600"
            }
          >
            {data && data.values && typeof data.values[index] !== "undefined"
              ? `${heading} (${data.values[index]})`
              : heading}
          </div>
        ))}
      </div>
    </div>
  );
};
