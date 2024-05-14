import SelectItem from '@/components/common/SelectItem';
import { useState } from 'react';
import Button from '../common/Button';

type QuestionsProps = {
    title?: string;
    questions: string[];
    onSubmit: (value: string) => void;
};

const Questions = ({ questions, title, onSubmit }: QuestionsProps) => {
    const [selectedQuestion, setSelectedQuestion] = useState<string>('');
    return (
        <section className='w-full flex flex-col gap-[15px] mt-[40px]'>
            <h2 className='text-white'>{title}</h2>
            <div className='w-full flex flex-col items-center justify-center gap-[10px] my-[10px]'>
                {questions.map((question, index) => (
                    <SelectItem
                        key={index}
                        isSelected={
                            question === selectedQuestion ? true : false
                        }
                        value={question}
                        label={question}
                        onClick={value => {
                            setSelectedQuestion(value);
                        }}
                    />
                ))}
            </div>

            <Button label='다음' onClick={() => onSubmit(selectedQuestion)} />
        </section>
    );
};

export default Questions;
