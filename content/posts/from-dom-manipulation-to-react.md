---
title: "From DOM Manipulation to React: Simplifying Dynamic Web Development"
date: "2024-03-14"
description: "How React abstracts imperative DOM work via declarative components, reconciliation, and diffing algorithms with concrete examples."
tags: ["React", "JavaScript", "Frontend Architecture", "DOM"]
published: true
---

React is a popular JavaScript library for building user interfaces, particularly for web applications. It was developed by Facebook and released to the public in 2013. React is known for its efficiency and flexibility, allowing developers to create interactive and dynamic user interfaces with ease.

To understand the importance of frameworks and libraries like React or jQuery, let us first understand how dynamic websites were built before these abstractions were introduced.

---

## The DOM and Imperative Updates

Before the introduction of libraries like React, jQuery, or Angular, developers interacted directly with the **Document Object Model (DOM)** to give websites their dynamic nature.

The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a web page as a tree of nodes, where each node represents a part of the document, such as an element, attribute, or text. The DOM provides an API for programs to dynamically update and change the document's content, structure, and style using languages like JavaScript.

Let us understand this using an example of a simple todo application.

```javascript
function createChild(title, description, id) {
    const parent = document.createElement("div");
    const titleDiv = document.createElement("div");
    const descriptionDiv = document.createElement("div");
    const markAsDone = document.createElement("button");

    markAsDone.setAttribute("onclick", `markAsDone(${id})`);
    markAsDone.innerHTML = 'Mark as done';
    titleDiv.innerHTML = title;
    descriptionDiv.innerHTML = description;
    parent.setAttribute("id", id);

    parent.appendChild(titleDiv);        
    parent.appendChild(descriptionDiv);        
    parent.appendChild(markAsDone);   
    return parent;     
}
```

This JavaScript function takes `title`, `description`, and `id` as parameters and returns a parent DOM element with the given `id`. The element incorporates three children:
1. A title `div` containing the title of the todo.
2. A description `div` containing the description.
3. A "Mark as done" button with an `onclick` event handler.

Here, `document.createElement()` is a native DOM API method that dynamically allocates and instantiates elements. 

However, simply creating elements is not enough to maintain a reactive UI. We must continuously synchronize the state of the website with user inputs or backend payloads.

```javascript
function updateState(newTodos) {
    const parent = document.getElementById("todos");
    parent.innerHTML = "";
    for (let i = 0; i < newTodos.length; i++) {
        const title = newTodos[i].title;
        const description = newTodos[i].description;
        parent.appendChild(createChild(title, description, globalId++));
    }
}
```

This function receives the new state of todos, clears the previous inner HTML, and iterates through the array to append fresh elements.

---

## Why Direct DOM Manipulation Breaks Down

Suppose our state is represented as an array of objects:

```json
[
  {
    "id": 1,
    "title": "Complete Distributed Systems Lab",
    "description": "Implement Raft consensus election loop"
  },
  {
    "id": 2,
    "title": "Benchmarking",
    "description": "Profile memory pool allocations in C++"
  }
]
```

Clearing `parent.innerHTML = ""` on every update works, but it is sub-optimal:
- **Destructive Reflows**: Tearing down and recreating existing DOM nodes causes unnecessary layout recalculations and repaints.
- **Lost UI State**: Active focus states, text selections, and scroll positions within nested elements are wiped out.
- **Wasted Computations**: If only one item out of a hundred changed, recreating all 100 is purely redundant.

A better approach is to **calculate the diff** between the new state and the old state, determining whether each item was added, updated, deleted, or unchanged:

```javascript
// Calculating the diff between oldState and newState
function calculatingDiff(oldState, newState) {
    let todosToAdd = [];

    let todosToUpdate = newState.filter((newStateTodo) => {
        for (let i = 0; i < oldState.length; i++) {
            if (oldState[i].id == newStateTodo.id) {
                return true;
            }
        }
        todosToAdd.push(newStateTodo);
        return false;
    });

    let todosToRemove = oldState.filter((oldStateTodo) => {
        for (let i = 0; i < newState.length; i++) {
            if (oldStateTodo.id == newState[i].id) {
                return false;
            }
        }
        return true;
    });

    updateTodos(todosToUpdate);
    removeTodos(todosToRemove);
    addTodos(todosToAdd);
}
```

The `calculatingDiff()` function segregates items into three buckets:
- `todosToUpdate`: Items present in both states that might need attribute changes.
- `todosToAdd`: New items present in the incoming state.
- `todosToRemove`: Items present in the old state that were omitted from the new state.

While writing custom reconcilers is a great exercise for understanding state synchronization, writing manual diff algorithms and imperative DOM mutations for complex interfaces quickly becomes unmaintainable.

---

## How React Simplifies This

React completely abstracts manual DOM reconciliation by introducing a **declarative component model** and the **Virtual DOM**.

Instead of telling the browser *how* to transition the DOM from step A to step B, you declare *what* the UI should look like for a given state:

```jsx
import { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), title: input, completed: false }
    ]);
    setInput("");
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-row">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="New task..."
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Key Takeaways

1. **State as the Single Source of Truth**: When `setTodos` is invoked, React re-renders the virtual tree, diffs it against the previous tree in memory, and batches minimal mutations to the actual browser DOM.
2. **Keyed Diffing**: By supplying a stable `key` property (like `todo.id`), React tracks moved, inserted, and deleted nodes efficiently with $O(n)$ heuristic diffing.
3. **Developer Ergonomics**: Developers focus on business logic and state transitions rather than micro-managing element creation, event listeners, and cleanup lifecycles.
