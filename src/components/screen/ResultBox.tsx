import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

type ResultProps = {
    result: string[];
};

const ResultBox = ({ result = [""] }: ResultProps) => {
    const [clickedDateIndicesByA, setClickedDateIndicesByA] = useState<{ [key: string]: number[] }>({});
    const [disabledDates, setDisabledDates] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState('a');
    const [selectedA, setSelectedA] = useState('');
    const [selectedBC, setSelectedBC] = useState<number | null>(null);
    const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);

    // 임의로 숫자 받게 설정
    const competitionRates = [
        113, 98, 102, 91, 111, 91, 93, 105, 71, 73, 68, 57, 56, 85, 78, 57, 51
    ];
    const minGrades = [
        "2합 5", "2합 4", "3합 6", "3합 7"
    ];

    useEffect(() => {
        if (selectedA) {
            const newDisabledDates = result
                .filter((item, index) => clickedDateIndicesByA[selectedA]?.includes(index))
                .flatMap((item) =>
                    result
                        .filter((resItem) => resItem.includes(item.split("_")[1]))
                        .map((resItem) => resItem.split("_")[1])
                );

            setDisabledDates(newDisabledDates);
        }
    }, [clickedDateIndicesByA, result, selectedA]);

    const handleClick = (date: string, index: number) => {
        setClickedDateIndicesByA((prevIndices) => {
            const newIndices = { ...prevIndices };
            if (!newIndices[selectedA]) {
                newIndices[selectedA] = [];
            }
            if (newIndices[selectedA].includes(index)) {
                newIndices[selectedA] = newIndices[selectedA].filter((i) => i !== index);
            } else {
                newIndices[selectedA].push(index);
            }
            return newIndices;
        });
    };

    const handleAClick = (a: string) => {
        setSelectedA(a);
        setCurrentStep('b');
        setSelectedBC(null);
    };

    const handleBCClick = (currentDate: string, index: number) => {
        handleClick(currentDate, index);
        setSelectedBC(index);
        setSelectedUniversities((prevUniversities) => {
            const university = result[index];
            if (prevUniversities.includes(university)) {
                return prevUniversities.filter((u) => u !== university);
            } else {
                return [...prevUniversities, university];
            }
        });
    };

    const handlePrevClick = () => {
        setCurrentStep('a');
    };

    const handleNextClick = () => {
        if (selectedBC !== null) {
            alert('Selected value saved.');
            setCurrentStep('a');
        } else {
            alert('대학을 선택해주세요.');
        }
    };

    const handleCompleteClick = () => {
        if (selectedUniversities.length > 0) {
            setCurrentStep('details');
        } else {
            alert('대학을 하나 이상 선택해주세요.');
        }
    };

    const getResultButtonClass = (index: number, currentDate: string): string => {
        if (clickedDateIndicesByA[selectedA]?.includes(index))
            return 'border bg-violet-400 bg-opacity-30 border-purple-700';
        if (disabledDates.includes(currentDate))
            return 'bg-gray-500 opacity-50 cursor-not-allowed';
        return 'bg-white border border-black';
    };

    const groupedByA = result.reduce((acc, item) => {
        const [aPart] = item.split("_")[0].split(" ");
        if (!acc[aPart]) {
            acc[aPart] = [];
        }
        acc[aPart].push(item);
        return acc;
    }, {});

    const getRandomElement = (arr: any[]) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    };

    const renderUniversityDetails = (university: string) => {
        const [name, date] = university.split("_");
        const competitionRate = getRandomElement(competitionRates) + ":1";
        const minGrade = getRandomElement(minGrades);

        return (
            <div key={university} className="w-full max-w-[300px] bg-white border border-gray-300 rounded-md mt-[10px] p-[10px]">
                <p><strong>대학:</strong> {name}</p>
                <p><strong>논술 일정:</strong> {date}</p>
                <p><strong>경쟁률:</strong> {competitionRate}</p>
                <p><strong>최저등급:</strong> {minGrade}</p>
            </div>
        );
    };

    const getButtonClassForStepA = (a: string) => {
        const allDisabled = groupedByA[a].every((item, index) => {
            const currentDate = item.split("_")[1] || '';
            return disabledDates.includes(currentDate);
        });

        const anySelected = groupedByA[a].some((item, index) => clickedDateIndicesByA[a]?.includes(index));

        if (anySelected) return 'bg-violet-400 bg-opacity-30 border-purple-700';
        if (allDisabled) return 'bg-gray-500 opacity-50 cursor-not-allowed';
        return 'bg-white border border-black';
    };

    return (
        <div className="flex flex-col items-center w-full">
            {currentStep === 'a' && (
                <>
                    <p className='text font-bold text-[18px] text-purple-700 mt-12'>
                        지원할 수 있는 대학 목록이에요.
                    </p>
                    <p className='text-center font-bold text-[14px] text-gray-400 mt-5'>
                        대학을 선택하면 학과를 고를 수 있어요.<br/>
                        중복 지원이 어려운 일정은 자동으로 제외돼요.
                    </p>
                    
                    {Object.keys(groupedByA).map((a, index) => (
                        <button
                            key={index}
                            className={`w-full h-[40px] max-w-[300px] rounded-md mt-[10px] px-[20px] flex items-center justify-center ${getButtonClassForStepA(a)}`}
                            onClick={() => handleAClick(a)}
                            disabled={getButtonClassForStepA(a).includes('cursor-not-allowed')}
                        >
                            {a}
                        </button>
                    ))}
                    <button
                        className="w-full h-[40px] max-w-[300px] bg-purple-700 text-white rounded-md mt-[10px] px-[20px] flex items-center justify-center"
                        onClick={handleCompleteClick}
                    >
                        원하는 대학을 모두 선택했어요.
                    </button>
                </>
            )}
            {currentStep === 'b' && selectedA && (
                <div className="flex flex-col items-center w-full">
                    {groupedByA[selectedA].map((item, index) => {
                        const currentDate = item.split("_")[1] || '';
                        const [aPart, bPart, cPart] = item.split("_")[0].split(" ");
                        return (
                            <button
                                key={index}
                                className={`w-full h-[40px] max-w-[300px] border border-transparent rounded-md mt-[10px] px-[20px] flex items-center justify-center ${getResultButtonClass(index, currentDate)}`}
                                onClick={() => handleBCClick(currentDate, index)}
                                disabled={disabledDates.includes(currentDate) && !clickedDateIndicesByA[selectedA]?.includes(index)}
                            >
                                {bPart} {cPart}
                            </button>
                        );
                    })}
                    <div className="flex mt-[10px] space-x-4 w-full max-w-[300px]">
                        <button
                            className="w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]"
                            onClick={handlePrevClick}
                        >
                            이전
                        </button>
                        <button
                            className="w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]"
                            onClick={handleNextClick}
                        >
                            다음
                        </button>
                    </div>
                </div>
            )}
            {currentStep === 'details' && selectedUniversities.length > 0 && (
                <div className="flex flex-col items-center w-full">
                    <p className='text font-bold text-[18px] text-purple-700 mt-12'>
                        최종 선택하신 대학 정보에요.<br/><br/>
                    </p>
                    {selectedUniversities.map(renderUniversityDetails)}
                    <div className='flex mt-[10px] space-x-4 w-full max-w-[300px]'>
                        <button
                            className='my-2 w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]'
                            onClick={() => setCurrentStep('a')}
                        >
                            돌아가기
                        </button>
                        <button
                            className='my-2 w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]'
                            onClick={() => setCurrentStep('a')}
                        >
                            선택 대학 기출 풀기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultBox;
