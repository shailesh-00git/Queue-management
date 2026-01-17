import React from "react";
import "./App.css";

function App() {
  const [list, setList] = React.useState([]);
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [Issue, setIssue] = React.useState("");
  const [TotalUserCount, setTotalUserCount] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || contact === "") return;

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      contact: Number(contact),
      problem: Issue.trim(),
      status: "waiting",
    };

    setList([...list, newUser]);
    setTotalUserCount(TotalUserCount + 1);
    setName("");
    setContact("");
    setIssue("");
  };

  function handleDelete(id) {
    setList(list.filter((user) => user.id !== id));
  }

  function handleServe(id) {
    const isSomeoneServing = list.some((u) => u.status === "serving");

    setList(
      list.map((user) => {
        // Complete the currently serving user
        if (user.id === id && user.status === "serving") {
          return { ...user, status: "completed" };
        }

        // Start serving ONLY if no one else is serving
        if (user.id === id && user.status === "waiting" && !isSomeoneServing) {
          return { ...user, status: "serving" };
        }

        return user;
      })
    );
  }

  //  counts
  const waitingCount = list.filter((u) => u.status === "waiting").length;
  const servingCount = list.filter((u) => u.status === "serving").length;
  const completedCount = list.filter((u) => u.status === "completed").length;

  //  current serving detail
  const servingUser = list.find((u) => u.status === "serving");

  return (
    <div className="app">
      <div className="bg-gray-600 text-white text-2xl  p-5 mb-4 rounded-lg text-center font-bold">
        <h1>Queue Mancontactment System</h1>
      </div>
      <div className=" border p-4 rounded-lg mb-4 flex gap-5 text-center">
        <div className="border w-80 p-2  rounded-lg">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className=" font-semibold text-gray-800">Add User</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="contact"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Problem"
              value={Issue}
              onChange={(e) => setIssue(e.target.value)}
            />

            <div>
              <button type="submit">Add User</button>
            </div>
          </form>
        </div>
        <div className="border w-70 rounded-lg py-3 px-4 text-start bg-gray-100">
          <h2 className="font-semibold text-gray-800 mb-2 mt-1 text-center">
            Current Status
          </h2>

          <div className="flex justify-between mb-1">
            <p>Current Users:</p>
            <span className="font-semibold">{list.length}</span>
          </div>

          <div className="flex justify-between mb-1">
            <p>Currently Serving:</p>
            <span className="font-semibold">{servingCount}</span>
          </div>

          <div className="flex justify-between mb-1">
            <p>Completed:</p>
            <span className="font-semibold">{completedCount}</span>
          </div>

          <div className="flex justify-between mb-1">
            <p>Waiting:</p>
            <span className="font-semibold">{waitingCount}</span>
          </div>

          <div className="flex justify-between mb-1">
            <p>Total Users:</p>
            <span className="font-semibold">{TotalUserCount}</span>
          </div>
        </div>

        <div className="w-full border rounded-lg flex items-center p-3 gap-5">
          <div className="border rounded-full w-60 h-40 bg-blue-100 grid place-content-center">
            <span className="text-blue-800 font-bold text-8xl  ">
              {servingUser ? servingUser.name.charAt(0).toUpperCase() : ""}
            </span>
          </div>
          <div className="border rounded-lg w-full">
            {servingUser ? (
              <>
                <div className="flex justify-between mx-5 mt-6 mb-4">
                  <span className="text-blue-500 font-semibold text-2xl">
                    {servingUser.status}
                  </span>
                </div>
                <div className="flex gap-10 mx-5">
                  <p>Name:</p>
                  <span>{servingUser.name}</span>
                </div>
                <div className="flex justify-between mx-5 mb-6">
                  <p>contact:</p>
                  <span>{servingUser.contact}</span>
                </div>
              </>
            ) : (
              <p className="text-center p-5 text-gray-500 font-semibold">
                No user is being served
              </p>
            )}
          </div>
        </div>
      </div>

      {!list.length ? (
        <div className="border text-center p-5 rounded-lg bg-gray-200 ">
          <h1>No User</h1>
        </div>
      ) : (
        <div className="card-container border bg-gray-100 rounded-lg  p-4">
          {list.map((user) => (
            <div className="card border" key={user.id}>
              <h4>{user.name}</h4>
              <p>
                <strong>contact:</strong> {user.contact}
              </p>
              <p className={`status ${user.status}`}>
                {user.status}
                {user.status !== "completed" && "...."}
              </p>

              <div className="actions">
                {user.status !== "completed" && (
                  <button
                    className="serve-btn"
                    onClick={() => handleServe(user.id)}
                  >
                    {user.status === "waiting" ? "Serve" : "Complete"}
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
