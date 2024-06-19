import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  // Function to toggle packed status of an item
  const togglePacked = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, packed: !item.packed };
      }
      return item;
    });
    setItems((s) => (s = updatedItems));
  };

  // Function to remove item from the list
  const clearSelect = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems((s) => (s = updatedItems));
  };

  // Function to add a new item to the list
  const handleAddItem = (newItem) => {
    const updatedItems = [...items, newItem];
    setItems((s) => (s = updatedItems));
  };

  return (
    <div className="app">
      <Logo />
      <Form itemLength={items.length} handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        togglePacked={togglePacked}
        clearSelect={clearSelect}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🎂Far Away👨‍🌾</h1>;
}

function Form({ itemLength, handleAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const handleQuantityChange = (event) => {
    setQuantity((s) => (s = parseInt(event.target.value))); // Convert to integer
  };

  const handleDescriptionChange = (event) => {
    setDescription((s) => (s = event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    if (!description) return alert("Please Enter Description");
    // Create a new item object
    const newItem = {
      id: itemLength + 1,
      description,
      quantity,
      packed: false, // Initial packed status
    };

    // Call handleAddItem to add the new item
    handleAddItem(newItem);

    // Clear the form fields after adding
    setQuantity((s) => (s = 1));
    setDescription((s) => (s = ""));
  };

  // Generate options from 1 to 100
  const quantityOptions = [];
  for (let i = 1; i <= 100; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={handleQuantityChange}>
        {quantityOptions}
      </select>
      <input
        type="text"
        placeholder="Write What you need"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, togglePacked, clearSelect }) {
  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            togglePacked={togglePacked}
            clearSelect={clearSelect}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, togglePacked, clearSelect }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => togglePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} - Quantity: {item.quantity}
      </span>
      <button onClick={() => clearSelect(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // Calculate total items and packed items
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items on your list and you already packed{" "}
        {packedItems}
      </em>
    </footer>
  );
}
