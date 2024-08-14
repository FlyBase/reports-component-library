import '../../styles/multiTextInput.scss';
import XIcon from "../icons/XIcon";
import React, {useEffect, useId, useRef, useState} from "react";
import PlusIcon from "../icons/PlusIcon";

type MultiTextInputProps = {
    defaultPills?: string[],
    defaultInputText?: string,
    onValueChange?: (pills: string[], inputText: string) => void,
    placeholder?: string
    id: string,
    singleItemOnly?: boolean
};

const MultiTextInput: React.FC<MultiTextInputProps> = ({
    defaultPills = [],
    defaultInputText = '',
    onValueChange,
    placeholder = 'Placeholder',
    id,
    singleItemOnly = false,
}) => {
    const newItemInputRef = useRef<HTMLInputElement | null>(null);

    const handleAddItem = () => {
        if (defaultInputText === '') return;

        const newPills = [...defaultPills, defaultInputText];

        onValueChange && onValueChange(newPills, '');

        newItemInputRef.current?.focus();
    };

    const handleDeleteItem = (index: number) => {
        if (defaultPills[index] === undefined) {
            throw new Error(`No items exist for index ${index}.`);
        }

        const newPills = [...defaultPills];
        newPills.splice(index, 1);

        onValueChange && onValueChange(newPills, defaultInputText);
    };

    return (
        <div className={`multi-text-input ${singleItemOnly ? 'single-item' : ''}`}>
            {defaultPills.length > 0 && (
                <ul className="multi-text-input-list">
                    {defaultPills.map((item, index) => (
                        <li
                            key={`multi-text-input-item-${item}-${index}-${id}`}
                            onClick={() => handleDeleteItem(index)}
                            onKeyDown={(e) => e.key === "Enter" && handleDeleteItem(index)}
                        >
                            <span>{item}</span>
                            <XIcon/>
                        </li>
                    ))}
                </ul>
            )}
            <form
                className="multi-text-input-add-new-item"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!singleItemOnly) handleAddItem();
                }}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    value={defaultInputText}
                    onChange={(e) => {
                        e.preventDefault();
                        onValueChange && onValueChange(defaultPills, e.target.value);
                    }}
                    ref={newItemInputRef}
                />
                {!singleItemOnly && (
                    <button className="add-new-icon-wrapper" type="submit">
                        <PlusIcon/>
                    </button>
                )}
            </form>
        </div>
    );
};

export default MultiTextInput;