import React, { useState } from "react";

interface User {
  name: string;
}

function PropDrillingApp() {
  const [user] = useState<User>({ name: "John Smith" });
  return (
    <div>
      <MainPage user={user} />
    </div>
  );
}

export default PropDrillingApp;

/**
 * What is a problem with the prop, user, being passed to MainPage?
 */
function MainPage({ user }: { user: User }) {
  return (
    <div className="p-4 bg-red-300">
      <Content user={user} />
    </div>
  );
}

function Content({ user }: { user: User }) {
  return <p className="text-2xl underline">{user.name}</p>;
}
