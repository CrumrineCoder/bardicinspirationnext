interface TagListingProps {
  selectedTag: string | null;
  allTags: string[] | null;
  setSelectedTag: (tagName: string | null) => void;
  getSongsByTagName: (tagName: string | null) => void;
  getAllSongs: () => void;
  disabled?: boolean; 
}

export default function Taglisting({
  selectedTag,
  allTags,
  setSelectedTag,
  getSongsByTagName,
  getAllSongs,
  disabled
}: TagListingProps) {
  return (
    <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
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
        <div className="mt-4">
          <h4>Recent Tags</h4>
          {allTags.map((tag, index) => (
            <>
              <span
                key={index}
                onClick={() => {
                  setSelectedTag(tag); 
                  getSongsByTagName(tag);
                }}
                className={`pr-2 ClickableInlineEntry SidebarTagListing ${
                  selectedTag === tag ? "text-yellow-500 font-bold" : ""
                }`}
              >
                {tag}
              </span>
              {(index + 1) % 5 === 0 && <br />}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
