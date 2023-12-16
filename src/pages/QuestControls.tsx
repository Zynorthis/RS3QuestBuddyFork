import React, { useState, useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
const QuestControls: React.FC<{
    scrollNext: () => void;
    scrollPrev: () => void;
    handleStepChange: (nextStep: number) => void; // Add handleStepChange prop
}> = ({ scrollNext, scrollPrev, handleStepChange }) => {
    const [active, setActive] = useState(0);

    const handleScrollNext = () => {
        const nextStep = active + 1;
        setActive(nextStep);
        handleStepChange(nextStep); // Call handleStepChange with the updated step
        scrollNext();
        scrollIntoView(nextStep);
    };

    const handleScrollPrev = () => {
        const nextStep = active - 1;
        setActive(nextStep);
        handleStepChange(nextStep); // Call handleStepChange with the updated step
        scrollPrev();
        scrollIntoView(nextStep);
    };
    const scrollIntoView = (step: number) => {
        const element = document.getElementById(step.toString());
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    useEffect(() => {
        console.log("QuestControls component initialized");
    }, []);

    return (
        <>
            <Flex className="ButtonGroupTwo" gap="sm">
                <Button onClick={handleScrollPrev}>Prev Step</Button>
                <Button onClick={handleScrollNext}>Next Step</Button>
            </Flex>
        </>
    );
};

export default QuestControls;