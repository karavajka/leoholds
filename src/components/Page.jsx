import React, { useState, useEffect } from "react";

const query = `
{
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`;

const API_BASE_URL = 'https://graphql.contentful.com';
const API_SPACE_ID = 'fvvee9f7jis0';
const API_TOKEN = 'pegKIqK-Acqf8h9fn8nYNKcWn9_7GMN47QiWTYtpJpQ';

function Page() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`${API_BASE_URL}/content/v1/spaces/${API_SPACE_ID}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setPage(data.pageCollection.items[0]);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }
  
    return(
      <div>
     
        <img src={page.logo.url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
        <p>{page.title}</p>
      
    </div>
    )

}

export default Page;