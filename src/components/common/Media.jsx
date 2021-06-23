import { useEffect, useState } from "react";

const Media = ({ query, children }) => {
  const media: MediaQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState(media.matches);

  useEffect(() => {
    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  });

  function update({ matches }) {
    setMatches(matches);
  }

  return children(matches);
};

export default Media;
