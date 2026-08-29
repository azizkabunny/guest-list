import { useEffect, useState } from 'react';

const API_URL =
  'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2606-ftb-ct-web-pt/guests';

async function fetchGuests() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch guests.');
  }

  const result = await response.json();
  return result.data;
}

async function fetchGuest(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch guest details.');
  }

  const result = await response.json();
  return result.data;
}

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    async function loadGuests() {
      const guestList = await fetchGuests();
      setGuests(guestList);
    }

    loadGuests();
  }, []);

  useEffect(() => {
    async function loadSelectedGuest() {
      if (selectedGuestId === null) {
        setSelectedGuest(null);
        return;
      }

      const guest = await fetchGuest(selectedGuestId);
      setSelectedGuest(guest);
    }

    loadSelectedGuest();
  }, [selectedGuestId]);

  return (
    <main className='app'>
      <h1>Guest List</h1>

      {selectedGuestId !== null ? (
        selectedGuest ? (
          <section className='guest-details'>
            <h2>{selectedGuest.name}</h2>
            <p>Email: {selectedGuest.email}</p>
            <p>Phone: {selectedGuest.phone}</p>
            <p>Bio: {selectedGuest.bio}</p>
            <p>Job: {selectedGuest.job}</p>

            <button onClick={() => setSelectedGuestId(null)}>
              Back to guest list
            </button>
          </section>
        ) : (
          <p>Loading guest details...</p>
        )
      ) : (
        <div className='guest-grid'>
          {guests.map((guest) => (
            <article
              className='guest-card'
              key={guest.id}
              onClick={() => setSelectedGuestId(guest.id)}
            >
              <h2>{guest.name}</h2>
              <p>{guest.email}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
