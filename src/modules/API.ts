export const getSidebarTags = () => {
  return fetch("http://localhost:5050/sidetags")
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const postSidebarTags = (input: any) => {
  return fetch("http://localhost:5050/sidetags", {
    method: "POST",
    body: input,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
