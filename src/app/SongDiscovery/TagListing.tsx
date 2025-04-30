interface TagListingProps {
    selectedTag: string | null;
    allTags: string[] | null;
    setSelectedTag: (tagName: string | null) => void;
    getSongsByTagName: (tagName: string | null) => void;
    getAllSongs: () => void; 
  }
  
  export default function Taglisting({
    selectedTag,
    allTags,
    setSelectedTag,
    getSongsByTagName,
    getAllSongs
  }: TagListingProps) {
    return (
      <div>
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            if (selectedTag) {
              getSongsByTagName(selectedTag); // Trigger search when the form is submitted
            }
          }}
        >
          <input
            type="text"
            name="tagName"
            placeholder="Enter Tag"
            required
            value={selectedTag || ""}
            onChange={(e) => {
              setSelectedTag(e.target.value); 
            }}
            className="mr-2 p-1"
          />
          <button className="SmallButton" type="submit">
            Search Tag
          </button>
        </form>
        <button
          className="SmallButton"
          onClick={() => {
            setSelectedTag(null); 
            getAllSongs();
          }}
        >
          Reset Filter
        </button>
        {allTags && (
          <div className="text-center">
            <h4>Recent Tags</h4>
            {allTags.map((tag, index) => (
              <span
                key={index}
                onClick={() => {
                  setSelectedTag(tag); // Set the selected tag when a tag is clicked
                  getSongsByTagName(tag); // Trigger search for the clicked tag
                }}
                className="pr-2 ClickableInlineEntry SidebarTagListing"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }