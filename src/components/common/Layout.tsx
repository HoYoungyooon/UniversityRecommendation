'use client';
import SelectItem from '@/components/common/SelectItem';
import Button from '@/components/common/Button';
import RangeBar from './RangeBar';
import Questions from '../screen/Questions';
import { useState } from 'react';

export default function Layout() {
    const [question, setQuestion] = useState<string>('Q1');
    return (
        <>
            <div className='w-full py-5'>
                <RangeBar width={50} />
            </div>

            <div className='px-[20px] mt-[10px]'>
                <Questions
                    title='Questions'
                    selected={question}
                    questions={['Q1', 'Q2', 'Q3']}
                    onClick={value => setQuestion}
                />
                <Button label='다음' onClick={() => console.log('clicked')} />
            </div>
        </>
    );
}
