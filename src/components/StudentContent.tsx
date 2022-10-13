import next from "../assets/images/next.svg";
import previous from "../assets/images/previous.svg";

const StudentContent = ({}: any) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[10%] flex items-center justify-center font-semibold text-lg bg-green-200 gap-2 px-2">
        What is Lorem Ipsum?
      </div>
      <div className="w-full h-[80%]">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </div>

      <div className="w-full h-[10%] flex items-center justify-end bg-blue-100 px-2 gap-4 relative">
        <img className="cursor-pointer" src={previous} alt="PREVIOUS" />
        <img className="cursor-pointer" src={next} alt="NEXT" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-200">
          <div className="w-4/5 h-full bg-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default StudentContent;
