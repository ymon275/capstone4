import { useEffect, useState } from "react";
import { getSidebarTags } from "../../modules/API";
import _ from "lodash";

function Sidebar() {
  const [tags, setTags] = useState<{ main_tag: string; sub_tags: string[] }[]>(
    []
  );
  const [selectedTag, setSelectedTag] = useState<string[]>();
  const [isMainView, setIsMainView] = useState(true);

  const handleMainTagEvent = (target: HTMLElement) => {
    console.info("Event Handler Ran! for element => ", target);
    if (isMainView) {
      setSelectedTag(tags[parseInt(_.trim(target.id, "main_tag_"))].sub_tags);
      setIsMainView(false);
    } else if (!isMainView) {
      throw new Error("Tag clicked out of bounds");
    }
  };

  const redirectToCategory = (target: HTMLElement) => {

  };

  const fetchTags = async () => {
    setTags(await getSidebarTags());
  };

  useEffect(() => {
    fetchTags();
  }, []);
  if (isMainView) {
    return (
      <div>
        <div id="mySidebar" className="sidebar">
          <a
            href="#"
            className="closebtn"
            onClick={() => {
              document.getElementById("mySidebar")!.style.width = "0";
              const main = document.getElementById("main")!;
              main.style.marginLeft = "0";
              main.style.width = `${main.offsetWidth + 150}px`;
            }}
          >
            &times;
          </a>
          {/* {console.log("In the sidebar => ", tags)} */}
          {tags.map(
            (
              tagGroup: { main_tag: string; sub_tags: string[] },
              index: number
            ) => (
              <a
                href="#"
                id={`main_tag_${index}`}
                className="side_tag"
                key={index}
                onClick={(event) =>
                  handleMainTagEvent(event.target as HTMLElement)
                }
              >
                {tagGroup.main_tag}
              </a>
            )
          )}
        </div>
      </div>
    );
  } else if (!isMainView) {
    return (
      <div>
        <div id="mySidebar" className="sidebar">
          <a href="#" className="backarw" onClick={() => {
            setIsMainView(true);
          }}>&#8592;</a>
          <a
            href="#"
            className="closebtn"
            onClick={() => {
              document.getElementById("mySidebar")!.style.width = "0";
              const main = document.getElementById("main")!;
              main.style.marginLeft = "0";
              main.style.width = `${main.offsetWidth + 150}px`;
            }}
          >
            &times;
          </a>
          {/* {console.log("In the sidebar => ", tags)} */}
          {selectedTag?.map((sub, index) => <a
                href="#"
                id={`sub_tag_${index}`}
                className="side_tag"
                key={index}
                onClick={(event) =>
                  redirectToCategory(event.target as HTMLElement)
                }
              >
                {sub}
              </a>)}
        </div>
      </div>
    );
  }
  return null;
}

export default Sidebar;
