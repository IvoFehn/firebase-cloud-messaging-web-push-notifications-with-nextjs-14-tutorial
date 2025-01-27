"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/get-users");
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const sendNotification = async (userId: string) => {
    await fetch("/api/send-notification", {
      method: "POST",
      body: JSON.stringify({
        userId,
        title: "Neue Nachricht!",
        message,
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Nachricht gesendet!");
  };

  return (
    <div>
      <h1>Benutzerliste</h1>
      <input
        type="text"
        placeholder="Nachricht eingeben"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} 
            <button onClick={() => sendNotification(user.id)}>Senden</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
