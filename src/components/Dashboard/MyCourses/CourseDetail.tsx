import close from '../../../assets/images/close.svg';
import { AiFillTags } from 'react-icons/ai';
import { MdLabelImportant } from 'react-icons/md';
import moment from 'moment';

interface Props {
  course: any;
  setShowDetail: (arg: boolean) => void;
}

const CourseDetail = ({ course, setShowDetail }: Props) => {
  const tags = ['psychology', 'meditation', 'sport'];

  return (
    <div className='fixed fade inset-0 bg-gray-700 bg-opacity-50 h-full w-full z-50'>
      <div className='top-[10%] mx-auto w-[40%] h-fit max-h-[65%] relative'>
        <div className='w-full h-full flex flex-col items-center bg-gray-200 rounded-md relative '>
          <img
            onClick={() => setShowDetail(false)}
            className='absolute right-1.5 top-1.5 w-4 h-4 cursor-pointer object-cover bg-gray-200 hover:bg-gray-400'
            src={close}
            alt='Close'
          />
          <div className='w-full h-[25%] bg-blue-700 rounded-t pl-6 pr-12 py-5 flex flex-col justify-center'>
            <div className='w-fit h-fit flex items-center text-xs font-semibold gap-1 text-yellow-400'>
              <MdLabelImportant /> {`Last updated 11/2022`}
            </div>
            <div className='w-fit h-fit flex items-center text-white text-xs mb-1'>
              <AiFillTags />
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className='ml-1 tracking-wide cursor-pointer hover:text-red-400'
                >
                  #{tag}
                </div>
              ))}
            </div>
            <div className='w-full h-fit text-white truncate  whitespace-nowrap overflow-hidden font-semibold'>
              Section 1.10.32 of "de Finibus Bonorum et
              Malorum", written by Cicero in 45 BC
            </div>
          </div>
          <div className='w-full h-[75%] flex flex-col gap-3 rounded-b px-6 py-4'>
            <div className='w-full h-fit text-sm font-medium text-blue-900 text-justify indent-6 tracking-wide leading-4'>
              {course.course_description}
            </div>
            <div className='w-full h-fit flex items-center justify-between bg-gray-500 text-white py-2 px-2 rounded-tr rounded-bl rounded-br'>
              <div className='w-fit flex items-center gap-1 text-xs font-medium tracking-wide'>
                Created By: <span>{course.author}</span>
              </div>
              <div className='w-fit flex items-center gap-1 text-xs font-medium tracking-wide'>
                Published Date:
                <span>
                  {moment(course.created_at).format(
                    'MMM YYYY'
                  )}
                </span>
              </div>
            </div>
            <div className='w-full h-fit flex flex-col gap-2 px-2'>
              <div className='font-bold text-sm'>
                Course content
              </div>
              <div className='w-full h-fit flex flex-col gap-1.5'>
                {course.lessons.map(
                  (lesson: any, idx: any) => (
                    <div
                      className='text-sm font-semibold leading-4'
                      key={idx}
                    >
                      {`✍ ${lesson.title}`}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
