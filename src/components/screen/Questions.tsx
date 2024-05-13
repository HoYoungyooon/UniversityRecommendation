import SelectItem from '@/components/common/SelectItem';

type QuestionsProps = {
    title?: string;
    questions: string[];
    selected?: string;
    onClick: (value: string) => void;
};

const Questions = ({ questions, title, selected, onClick }: QuestionsProps) => {
    return (
        <section className='w-full'>
            <h2 className='text-white'>{title}</h2>
            <div className='w-full flex flex-col items-center justify-center gap-[10px] my-[10px]'>
                {questions.map((question, index) => (
                    <SelectItem
                        key={index}
                        isSelected={question === selected ? true : false}
                        value={question}
                        label={question}
                        onClick={onClick}
                    />
                ))}
            </div>
        </section>
    );
};

export default Questions;
