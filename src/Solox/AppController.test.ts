import { describe, it, expect, beforeEach } from "vitest";
import { CharacterController } from "./AppController";

describe("CharacterController", () => {
  let characterController: CharacterController;
  beforeEach(() => {
    characterController = new CharacterController();
  });

  describe("updateCounter", () => {
    it("should increment counter", () => {
      characterController.updateCounter();

      expect(characterController.state.current.counter).to.equal(2);
    });
  });
});
