'use client'
import {sendData} from "../queries/addToDB";

export default function SendDataButton() {
    return <button onClick={sendData}>Send Data, daddio!</button>;
}