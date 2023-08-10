import { isEqualWith } from "lodash";

import * as React from "react";
import { useControllerState, useLocalController } from "solox";

import Counter from "../Counter";
import { CharacterController, CharacterState } from "./AppController";

export default function App() {
  // Create controller instance that we want to subscribe to
  const characterController = useLocalController(
    () => new CharacterController()
  );
  const [showCharacter, setShowCharacter] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // useControllerState : we pass in immutable state via appController.state, that we want to subscribe to, and a selector function where we can specify what will be returned by the hook
  const { character, isLoading } = useControllerState(
    characterController.state,
    (state: CharacterState) => {
      return {
        character: state.character,
        isLoading: state.isLoading,
      };
    },
    // optional parameter. Required when selector returns a new object
    isShallowEqual
  );

  function updateCharacterNameHandler() {
    if (!character) {
      return;
    }

    const newName = inputRef.current?.value ?? "no name";

    characterController.updateCharacter({
      ...structuredClone(character),
      name: newName,
    });
  }

  React.useEffect(() => {
    characterController.loadCharacter();
  }, []);

  return (
    <div className="p-4 border-[1px] border-solid border-red-500">
      <div className="mb-4">
        <button
          className="border rounded p-2 bg-yellow-500"
          onClick={() => {
            setShowCharacter((prev) => !prev);
          }}
        >
          TOGGLE CHARACTER
        </button>
        <button
          className="border rounded p-2 bg-green-500"
          onClick={characterController.updateCounter}
        >
          INCREMENT COUNTER
        </button>
      </div>
      <div className="flex flex-col items-start ">
        <label htmlFor="name" className="flex flex-col">
          Enter a new name
          <input className="border" id="name" ref={inputRef} />
        </label>
        <button
          className="mt-4 border rounded p-2 bg-green-800 text-white"
          onClick={updateCharacterNameHandler}
        >
          Update Name
        </button>
      </div>
      {isLoading && <p>loading...</p>}
      {!isLoading && character && showCharacter && (
        <div>
          <h1 className="text-2xl">Character info</h1>
          <p>{character.name}</p>
          <p>{character.height}</p>
          <p>{character.mass}</p>
        </div>
      )}
      <Counter message="<App />" />
      <PageCounterMemo characterController={characterController} />
    </div>
  );
}

function PageCounter({
  characterController,
}: {
  characterController: CharacterController;
}) {
  const counter = useControllerState(
    characterController.state,
    (state) => state.counter
  );

  // Highlight: re-render initiated when either counter or isLoading changes
  // const { counter, isLoading } = useControllerState(
  //   appController.state,
  //   (state) => ({
  //     counter: state.counter,
  //     isLoading: state.isLoading,
  //   }),
  //   isShallowEqual
  // );

  // isShallowEqual --> prevent object returned by selector from triggering re-render
  // if objects have same key and values 1 level deep

  return (
    <div className="border-[1px] border-solid border-blue-500 p-4 mt-8">
      <div className="flex items-baseline gap-4">
        <h1 className="text-2xl"> Controller Counter </h1>
        <p className="text-2xl">{counter}</p>
      </div>
      <Counter message="<PageCounter />" />
    </div>
  );
}

const PageCounterMemo = React.memo(PageCounter);

// shallowly compares two objects (1 level deep)
// { foo: { bar: 10 } }
const isShallowEqual = (a: any, b: any) =>
  isEqualWith(a, b, (aval, bval, index) =>
    index === undefined ? undefined : Object.is(aval, bval)
  );
