import React, {useCallback, useState} from "react";

const SplitDiv = ({ onRemove }) => {
    const [splitDirection, setSplitDirection] = useState(null); // null, 'horizontal', 'vertical'
    const [children, setChildren] = useState([]); // Holds the nested child divs

    const handleSplit = (direction) => {
        setSplitDirection(direction);
        setChildren([{}, {}]); // Create two children
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove(); // Notify parent to remove this div
        } else {
            // If it's the root component, reset the state
            setSplitDirection(null);
            setChildren([]);
        }
    };

    const removeChild = useCallback(
        (index) => {
            setChildren((prev) => {
                const updatedChildren = prev.filter((_, i) => i !== index);
                if (updatedChildren.length === 0) {
                    // If no children are left, reset the state
                    setSplitDirection(null);
                }
                return updatedChildren;
            });
        },
        [setChildren] // Ensure the function updates with setChildren
    );

    return (
        <div
            className={`relative w-full h-full ${
                splitDirection === "horizontal" ? "flex flex-row" : ""
            } ${splitDirection === "vertical" ? "flex flex-col" : ""}`}
        >
            {/* Render Buttons if no children */}
            {children.length === 0 && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
                    <div className="space-x-2">
                        <button
                            onClick={() => handleSplit("horizontal")}
                            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                        >
                            Horizontal
                        </button>
                        <button
                            onClick={() => handleSplit("vertical")}
                            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                        >
                            Vertical
                        </button>
                        <button
                            onClick={handleRemove}
                            className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}

            {/* Render Children */}
            {children.map((_, index) => (
                <div key={index} className={`flex-1 border border-teal-600`}>
                    <SplitDiv onRemove={() => removeChild(index)} />
                </div>
            ))}
        </div>
    );
};

export default SplitDiv;
