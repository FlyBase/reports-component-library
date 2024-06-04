import '../../styles/multiTextInput.scss';
import XIcon from "../icons/XIcon";
import React, {useEffect, useId, useRef, useState} from "react";
import PlusIcon from "../icons/PlusIcon";

type MultiTextInputProps = {
    defaultList?: string[],
    onChange?: (items: string[]) => void,
    placeholder?: string
};

const MultiTextInput: React.FC<MultiTextInputProps> = ({ defaultList = [], onChange, placeholder = "Placeholder" }) => {

    const id = useId();
    const [items, setItems] = useState(defaultList);
    const [newItem, setNewItem] = useState("");
    const newItemInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(!onChange) return;

        let fullList = [...items];
        if(newItem !== "") {
            fullList.push(newItem);
        }

        onChange(fullList);

    }, [items, newItem, onChange]);

    const handleAddItem = () => {
        if(newItem === "") return;

        setItems([...items, newItem]);
        setNewItem("");

        newItemInputRef.current?.focus();
    };

    const handleDeleteItem = (index: number) => {
        if(!items[index]) {
            throw new Error(`No items exist for index ${index}.`);
        }

        const newItems = [...items];
        newItems.splice(index, 1);

        setItems(newItems);
    }

    return (
        <div className="multi-text-input">
            {
                items.length > 0 &&
                <ul className="multi-text-input-list">
                    {
                        items.map((item, index) => (
                            <li key={`multi-text-input-item-${item}-${index}-${id}`}
                                onClick={() => handleDeleteItem(index)}>
                                <span>{item}</span>
                                <XIcon />
                            </li>
                        ))
                    }

                </ul>
            }
            <form className="multi-text-input-add-new-item"
                  onSubmit={e => {
                      e.preventDefault();
                      handleAddItem();
                  }}
            >
                <input type="text"
                       placeholder={placeholder}
                       value={newItem}
                       onChange={e => setNewItem(e.target.value)}
                       ref={newItemInputRef}
                />
                <button className="add-new-icon-wrapper"
                        type="submit"
                >
                    <PlusIcon />
                </button>
            </form>
        </div>
    );
};

export default MultiTextInput;