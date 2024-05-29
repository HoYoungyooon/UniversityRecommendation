import clsx from 'clsx';

type SelectItemProps = {
    value: string;
    label: string;
    isSelected?: boolean;
    onClick: (value: string) => void;
};

const SelectItem = ({ value, label, isSelected, onClick }: SelectItemProps) => {
    return (
        <button
            onClick={() => onClick(value)}
            className={clsx(
                'w-full h-[40px] flex items-center justify-start border  border-line1 rounded-[10px] px-[20px]',
                isSelected ? 'bg-violet-400 bg-opacity-30 border-purple-700' : ''
            )}>
            <span>{label}</span>
        </button>
    );
};

export default SelectItem;
