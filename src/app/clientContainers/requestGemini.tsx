

export default function requestGemini(){

    async function requestGeminiAPI(){
        const response = await fetch('/api/requestGemini', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
              },
        })
    }
    return(
        <div>
            <button onClick={()=> requestGeminiAPI()}>Request Gemini</button>
        </div>
    )
}