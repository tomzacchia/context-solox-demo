import { ImmutableModelStore } from "solox";

interface SWAPICharacter {
  name: string;
  height: string;
  mass: string;
}

export interface CharacterState {
  counter: number;
  character: SWAPICharacter | undefined;
  isLoading: boolean;
}

export class CharacterController {
  // create a new instance of ImmutableModelStore which exposes some handy methods, e.g mutating the immutable state we initialize
  // When there is a state change only controller.state.current changes, the controller instance never changes
  public state = new ImmutableModelStore<CharacterState>({
    counter: 1,
    character: undefined,
    isLoading: true,
  });

  constructor() {}

  updateCounter = () => {
    // Cannot assign to 'character' because it is a read-only property.ts(2540)
    // this.state.current.character = 2;

    // update with immer produce: we pass in immutable state and a recipe, function for "mutating" the state. Inside we perform mutable operations (e.g pop, push, assignment etc...) without returning anything
    this.state.update((state) => {
      // state is mutable within scope of the recipe
      state.counter += 1;
    });
  };

  updateCharacter = (character: SWAPICharacter) => {
    this.state.update((state) => {
      state.character = character;
    });
  };

  // AppController is a regular object as such methods can be asynchronous
  loadCharacter = async () => {
    const character = await fetchCharacter();
    this.state.update((state) => {
      state.character = character;
      state.isLoading = false;
    });
  };
}

// Highlight: Global controller instance
// new AppController()

async function fetchCharacter() {
  const res = await fetch("https://swapi.dev/api/people/1", {
    method: "GET",
  });

  return res.json();
}
