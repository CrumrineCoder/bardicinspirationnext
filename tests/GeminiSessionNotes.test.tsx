import { render, screen, fireEvent } from "@testing-library/react";
import GeminiSessionNotes from "../src/app/AI/GeminiSessionNotes";
import {expect, jest, test, describe, it} from '@jest/globals';
import '@testing-library/jest-dom';

describe("Home Page AI Notes", () =>{
    it("render default", () => {
        render (<GeminiSessionNotes />);
        const textarea = screen.getByPlaceholderText("Add your session notes here!");
       })
})