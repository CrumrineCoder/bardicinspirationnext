

export default function requestGemini({ songName, artist }: { songName: string; artist: string }){

    async function requestGeminiAPI(){
        const response = await fetch(`/api/requestGemini?songName=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artist)}`, {
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