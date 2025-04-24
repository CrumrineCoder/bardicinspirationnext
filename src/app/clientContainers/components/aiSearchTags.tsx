import {useState} from "react";

export default function AISearchTags(){
    const [userInput, setUserInput] = useState<string | null>(null);
    // Take user input 
    // Get all Tags
    // Ask AI to parse user input and match it to tags
    return(
        <div className="AISearchTagsContainer">
            <blockquote className="AISearchTagsInput" contentEditable="true">
                <p>Add your session notes here!</p>
            </blockquote>
        </div>
    )
}