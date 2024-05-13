import { ReactNode, useState } from 'react';
type FunelProps = ReactNode & {
    name: string;
};

export default function useFunnel() {
    const [step, setStep] = useState('');

    const Step = ({ children }: { children: ReactNode }) => {
        return <>{children}</>;
    };

    const Funnel = ({ children }: { children: FunelProps[] }) => {
        const targetStep =
            children.find((child, index) => child.name === step) || {};
        return Object.assign(targetStep, { Step });
    };
    return [Funnel, setStep];
}
