import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import {
  useRive,
  type StateMachineInput,
} from "@rive-app/react-canvas";

export type WalkingCharacterHandle = {
  setWalking: (walking: boolean) => void;
};

type WalkingCharacterProps = {
  characterRef: React.RefObject<HTMLDivElement | null>;
};

export const WalkingCharacter = forwardRef<
  WalkingCharacterHandle,
  WalkingCharacterProps
>(({ characterRef }, ref) => {
  const { rive, RiveComponent } = useRive({
    src: "/walking-character.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  const numberInput = useRef<StateMachineInput | null>(null);

  useEffect(() => {
    if (!rive) return;

    const inputs = rive.stateMachineInputs("State Machine 1");

    if (!inputs) return;

    const input = inputs.find(
      (input) => input.name === "Number 1"
    );

    if (!input) return;

    numberInput.current = input;
  }, [rive]);

  useImperativeHandle(ref, () => ({
    setWalking: (walking: boolean) => {
      const input = numberInput.current;

      if (!input) return;

      input.value = walking ? 1 : 0;
    },
  }));

  return (
    <div className="walking-character" ref={characterRef}>
      <RiveComponent />
    </div>
  );
});