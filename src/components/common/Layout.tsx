'use client';
import { useCallback, useState } from 'react';
import RangeBar from '@/components/common/RangeBar';
import Questions from '@/components/screen/Questions';
import useFunnel from '@/hooks/useFunnel';
import { QUESTIONS, TITLES } from '@/constant/question';
import { fetchQ1 } from '@/service/fetch';

type AnswerType = {
    //   Q1: string[];
    Q2: string[];
    Q3: string;
    Q4: string;
    Q5: string;
    Q6: string;
};

type AnswerKey = keyof AnswerType;

export default function Layout() {
    const [answer, setAnswer] = useState<AnswerType>({
        // Q1: "",
        // Q1: Array(6).fill(""),
        Q2: Array(6).fill(''),
        Q3: '',
        Q4: '',
        Q5: '',
        Q6: '',
    });
    const { Funnel, Step, setStep, currentStep } = useFunnel('Q1');

    const handleAnswer = (value: string | string[], step: string) => {
        setAnswer({ ...answer, [step]: value });
        setStep(step);
        fetchQ1();
    };

    const handleClickRequest = (value: AnswerKey) => {
        setAnswer({ ...answer, Q6: value });
        alert('할거 정하셈');
    };

    const calRangeBarProps = useCallback(() => {
        const index = Object.keys(QUESTIONS).indexOf(currentStep);
        const maxStep = Object.keys(QUESTIONS).length;
        const step = index + 1;
        return {
            width: (step / maxStep) * 100,
            maxStep,
            step,
        };
    }, [currentStep]);

    return (
        <main className='p-[20px]'>
            <RangeBar {...calRangeBarProps()} />

            <Funnel>
                <Step name='Q1'>
                    <Questions
                        title={TITLES.Q1}
                        questions={QUESTIONS.Q1}
                        isDuplicate={true}
                        onSubmit={value => {
                            handleAnswer(value, 'Q2');
                        }}></Questions>
                </Step>
                <Step name='Q2'>
                    <Questions
                        title={TITLES.Q2}
                        questions={QUESTIONS.Q2}
                        onSubmit={value => {
                            handleAnswer(value, 'Q3');
                        }}
                    />
                </Step>
                <Step name='Q3'>
                    <Questions
                        title={TITLES.Q3}
                        questions={QUESTIONS.Q3}
                        onSubmit={value => {
                            handleAnswer(value, 'Q4');
                        }}
                    />
                </Step>

                <Step name='Q4'>
                    <Questions
                        title={TITLES.Q4}
                        questions={QUESTIONS.Q4}
                        onSubmit={value => {
                            handleAnswer(value, 'Q5');
                        }}
                    />
                </Step>

                <Step name='Q5'>
                    <Questions
                        title={TITLES.Q5}
                        questions={QUESTIONS.Q5}
                        onSubmit={value => {
                            handleAnswer(value, 'Q6');
                        }}
                    />
                </Step>

                <Step name='Q6'>
                    <Questions
                        title={TITLES.Q6}
                        questions={QUESTIONS.Q6}
                        onSubmit={value => {
                            handleClickRequest(value as AnswerKey);
                        }}
                    />
                </Step>
            </Funnel>
        </main>
    );
}
