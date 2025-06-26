//this is a component for the DAO governance page where I made changes

const DaoPage = () => {
  return (
    <div className="text-white bg-[#000]  h-[calc(100vh-1rem)] w-full flex items-center justify-center">
      <div className="bg-[#EDEDED1A] rounded-2xl px-6 py-7 w-fit-content mx-[1rem] ">
        <span className="flex gap-6 items-center  pt-2 pb-4">
          <img
            className="w-[40px]"
            src="/dao-icons/dao_icon.svg"
            alt="DAO Icon"
          />
          <h2 className="font-[400] text-[26px]">DAO Governance</h2>
        </span>

        <span className="flex gap-2 items-center mb-[2rem]">
          <img
            className="w-[]"
            src="/dao-icons/fluent-icon.svg"
            alt="DAO Icon"
          />
          <p>
            Participate in votes, suggest improvements and moderate disputes (If
            eligible)
          </p>
        </span>
        <div className="flex  justify-center items-center w-full my-[1rem] ">
          <button className="bg-[#6A57D0] hover:bg-[#5945c0] w-full md:py-[1rem] py-[0.8rem] rounded-[10px] border border-[#fff] cursor-pointer transition-colors duration-300">
            Open DAO Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaoPage;
