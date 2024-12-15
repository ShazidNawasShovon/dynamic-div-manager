import React, { useState, useCallback } from "react";

const SplitDiv = ({ onRemove }) => {
    const [splitDirection, setSplitDirection] = useState(null); // null, 'horizontal', 'vertical'
    const [children, setChildren] = useState([]); // Holds the nested child divs
    const [draggingIndex, setDraggingIndex] = useState(null); // Track the index of the div being dragged
    const [dragOverIndex, setDragOverIndex] = useState(null); // Track the index of the div being hovered during drag

    // Split the div into horizontal or vertical children
    const handleSplit = (direction) => {
        setSplitDirection(direction);
        setChildren([{ id: Math.random() }, { id: Math.random() }]); // Create two unique children
    };

    // Remove the current div or notify the parent to remove it
    const handleRemove = () => {
        if (onRemove) {
            onRemove(); // Notify parent to remove this div
        } else {
            // Reset state if it's the root component
            setSplitDirection(null);
            setChildren([]);
        }
    };

    // Remove a specific child div
    const removeChild = useCallback(
        (index) => {
            setChildren((prev) => {
                const updatedChildren = prev.filter((_, i) => i !== index);
                if (updatedChildren.length === 0) {
                    // Reset state if no children are left
                    setSplitDirection(null);
                }
                return updatedChildren;
            });
        },
        [setChildren]
    );

    // Handle drag start
    const handleDragStart = (index) => {
        setDraggingIndex(index);
    };

    // Handle drag over (hover effect)
    const handleDragOver = (index) => {
        setDragOverIndex(index);
    };

    // Handle drop event
    const handleDrop = (index) => {
        if (draggingIndex === null || draggingIndex === index) return;

        // Swap the positions of the dragged and target divs
        setChildren((prev) => {
            const updatedChildren = [...prev];
            const temp = updatedChildren[draggingIndex];
            updatedChildren[draggingIndex] = updatedChildren[index];
            updatedChildren[index] = temp;
            return updatedChildren;
        });

        setDraggingIndex(null); // Reset the dragging index
        setDragOverIndex(null); // Reset the hover effect
    };
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
            {children.map((child, index) => (
                <div
                    key={child.id}
                    className={`flex-1 ${
                        dragOverIndex === index
                            ? "bg-blue-600 border-blue-500 border-2 border-dashed animate-pulse" 
                            : "border border-teal-600 animate-none"
                    }`}
                    draggable
                    onDragStart={() => handleDragStart(index)} // Start dragging
                    onDragOver={(e) => {
                        e.preventDefault(); // Allow drop
                        handleDragOver(index); // Add hover effect
                    }}
                    onDragLeave={() => setDragOverIndex(null)} // Remove hover effect
                    onDrop={() => handleDrop(index)} // Drop onto this div
                >
                    <SplitDiv onRemove={() => removeChild(index)} />
                </div>
            ))}
        </div>
    );
};

export default SplitDiv;
