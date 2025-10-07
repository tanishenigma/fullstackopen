import noteService from "./services/notes";
import Note from "./components/Note";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    noteService
      .getAll()
      .then((notes) => {
        setNotes(notes);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exist = notes.filter((n) => {
      return n.name === newName;
    });
    if (exist.length < 0) {
      noteService
        .create({
          name: newName,
          phone: newPhone,
          important: false,
        })
        .then((response) => {
          setNotes((prev) => [...prev, response]);
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
    } else {
      
    }
  };
  const handleDelete = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter((n) => n.id !== id));
    });
  };
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService.update(id, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id === id ? response : n)));
    });
  };

  const filteredSearch = notes.filter(
    (note) =>
      note.name.toLowerCase().includes(search.toLowerCase()) ||
      note.phone.toString().includes(search)
  );

  return (
    <div className="min-h-screen  flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 xl:w-1/3 flex flex-col items-center  md:border-r border-amber-600/20 py-10 px-4 shadow-md bg-amber-100/20">
        <h1 className="text-5xl md:text-7xl font-black mb-8 bg-amber-500/30 px-8 py-2 rounded-full text-center shadow-md border-t-2 border-amber-100  tracking-">
          Phone<span className="text-amber-500">book</span>
        </h1>
        {/* Search */}
        <h2 className="text-2xl md:text-4xl inline-flex gap-x-2 text-center font-black tracking-wide text-amber-500 mb-4">
          <Search size={32} />
          Search for a number
        </h2>
        <input
          className="border mb-4 rounded-full p-2 border-amber-200 bg-amber-800/10 focus:outline-none w-full max-w-xs duration-300 focus:shadow-md hover:shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone"
        />
        {/* Add new contact */}
        <div className="bg-amber-500/20 flex flex-col items-center justify-center p-8 rounded-xl w-full max-w-xs mt-6 shadow-md">
          <h2 className="text-2xl md:text-4xl text-center font-black tracking-wide text-amber-500 mb-2">
            Add New Contact
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-2 w-full mt-2">
            <label className="font-bold text-black">Add Name</label>
            <input
              className="border mb-2 rounded-full p-2 border-amber-200 bg-amber-800/10 focus:outline-none duration-300 focus:shadow-md hover:shadow-md"
              placeholder="Add name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label className="font-bold text-black">Add Phone Number</label>
            <input
              className="border mb-2 rounded-full p-2 border-amber-200 bg-amber-800/10 focus:outline-none duration-300 focus:shadow-md hover:shadow-md"
              placeholder="Add Phone Number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              type="number"
            />
            <button className="bg-amber-500 text-white p-2 rounded-xl mt-2 cursor-pointer hover:bg-amber-600/70 duration-300 focus:shadow-md hover:shadow-md">
              Submit
            </button>
          </form>
        </div>
      </aside>

      {/* Numbers List */}
      <main className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-wide text-amber-500 mb-8 text-center">
          Numbers
        </h1>
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-amber-500/40 text-xl">No Numbers Yet!</p>
          </div>
        ) : (
          <div className="w-full">
            {filteredSearch.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredSearch.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                    handleDelete={() => handleDelete(note.id)}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center text-amber-500/60 text-xl">
                <p>Not Found!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
