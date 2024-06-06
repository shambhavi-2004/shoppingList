## where DOM stored in memeory

The elements in the Document Object Model (DOM) are stored in the browser's memory. Here’s a deeper look into how this works:

### DOM Structure

The DOM represents the structure of a web document, which includes elements, attributes, and text content. When a web page is loaded, the browser parses the HTML and creates a corresponding DOM tree in memory. Each node in this tree represents a part of the document (e.g., an element, attribute, or text node).

### Memory Storage

1. **Browser's Memory Heap:** The DOM elements are stored in the browser's memory heap. This is a region of memory allocated for dynamic memory allocation where JavaScript objects and variables are stored.

2. **DOM Nodes:** Each element in the DOM is a node object in memory. For example, an `<h1>` tag on a webpage will correspond to an `HTMLHeadingElement` object in memory.

3. **References and Garbage Collection:** JavaScript engines like V8 (used in Chrome) and SpiderMonkey (used in Firefox) manage memory for these objects. When DOM nodes are no longer referenced (e.g., removed from the DOM and not held by any JavaScript variables), they can be garbage collected, freeing up memory.

### Interacting with the DOM

When you use JavaScript to interact with the DOM, you're essentially manipulating these in-memory objects. For example:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">Hello, World!</h1>
    <script>
      // Access the DOM element
      let titleElement = document.getElementById("title");

      // Modify the DOM element
      titleElement.textContent = "Hello, Universe!";
    </script>
  </body>
</html>
```

In the script above:

- `document.getElementById('title')` accesses the `HTMLHeadingElement` object stored in memory.
- `titleElement.textContent = 'Hello, Universe!';` modifies the in-memory representation of the DOM, which the browser then renders on the screen.

### Memory Management

1. **JavaScript Engine:** The JavaScript engine manages memory allocation and deallocation. When you create or manipulate DOM elements, the engine ensures that memory is allocated for new objects and eventually freed when those objects are no longer needed.

2. **Garbage Collection:** Modern JavaScript engines perform automatic garbage collection. When objects (including DOM nodes) are no longer reachable from the root (e.g., the global object), the garbage collector will reclaim that memory.

3. **Performance Considerations:** Frequent DOM manipulations can lead to performance issues, as each change can cause the browser to re-render parts of the webpage. Techniques like document fragments, batch updates, and virtual DOMs (used in libraries like React) help mitigate these performance costs.

### Summary

- **Storage:** DOM elements are stored in the browser's memory heap as JavaScript objects.
- **Manipulation:** Interactions with the DOM via JavaScript involve reading and modifying these in-memory objects.
- **Memory Management:** The JavaScript engine and browser handle memory allocation and garbage collection, ensuring efficient use of memory.

Understanding how the DOM is stored and managed in memory can help you write more efficient and performant web applications.

Local Storage is a feature of the Web Storage API in JavaScript that allows web applications to store data locally in the user's browser. The stored data is persisted across browser sessions, meaning it remains available even after the browser is closed and reopened. Here’s a more detailed look at how Local Storage works and where it fits into the overall memory management within a browser.

## Where Local Storage Data is Stored

Local Storage data is stored in the browser's internal storage mechanism, typically on the user's disk, which ensures persistence across sessions. Each browser implements this differently, but the general concept remains the same:

Storage Location: The data is stored in a special directory designated for web storage, separate from the main memory heap where DOM elements and JavaScript objects reside.

Security and Scope: Local Storage is scoped to the origin (domain) of the webpage. This means data stored by one website cannot be accessed by another website. This is in line with the same-origin policy, which enhances security by preventing cross-site access to data.

## local storage

serach for application on devtools

When we use local storage in our shopping list, when we when we add an item, it gets stored in the
browser.

It's not something where we're connecting to a server with a database where other people from, you
local ans sessio have the same API, they have the same methods
Local Storage and Session Storage are part of the Web Storage API in JavaScript. They allow you to store data on the client's browser, with slight differences in their usage and scope.

### Local Storage

Local Storage provides a way to store key-value pairs in a web browser with no expiration time. This means the data will persist even after the browser is closed and reopened.

#### Syntax:

```javascript
// Set item
localStorage.setItem("key", "value");

// Get item
let value = localStorage.getItem("key");

// Remove item
localStorage.removeItem("key");

// Clear all items
localStorage.clear();
```

#### Example:

```javascript
// Store data
localStorage.setItem("username", "JohnDoe");

// Retrieve data
let username = localStorage.getItem("username");
console.log(username); // Output: JohnDoe

// Remove data
localStorage.removeItem("username");

// Clear all data
localStorage.clear();
```

### Session Storage

Session Storage is similar to Local Storage, but the data is stored only for the duration of the page session. This means the data is cleared when the page session ends, i.e., when the page or browser is closed.

#### Syntax:

```javascript
// Set item
sessionStorage.setItem("key", "value");

// Get item
let value = sessionStorage.getItem("key");

// Remove item
sessionStorage.removeItem("key");

// Clear all items
sessionStorage.clear();
```

#### Example:

```javascript
// Store data
sessionStorage.setItem("username", "JaneDoe");

// Retrieve data
let username = sessionStorage.getItem("username");
console.log(username); // Output: JaneDoe

// Remove data
sessionStorage.removeItem("username");

// Clear all data
sessionStorage.clear();
```

### Use Cases

- **Local Storage:** Useful for storing data that you want to persist across browser sessions, such as user preferences, tokens, etc.
- **Session Storage:** Useful for storing data that you want to persist only for a single session, such as temporary state data.

### Example of Both

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Web Storage Example</title>
  </head>
  <body>
    <script>
      // Using Local Storage
      localStorage.setItem("localUser", "LocalJohnDoe");
      console.log(localStorage.getItem("localUser")); // Output: LocalJohnDoe

      // Using Session Storage
      sessionStorage.setItem("sessionUser", "SessionJaneDoe");
      console.log(sessionStorage.getItem("sessionUser")); // Output: SessionJaneDoe

      // Clean up
      localStorage.removeItem("localUser");
      sessionStorage.removeItem("sessionUser");
    </script>
  </body>
</html>
```

### Key Points

- **Storage Limits:** Local Storage and Session Storage typically have a storage limit of around 5-10 MB per origin (domain).
- **Data Format:** The stored data is always in the form of strings. If you need to store objects or arrays, you can use `JSON.stringify` to convert them to strings, and `JSON.parse` to convert them back to their original form.
- **Security:** Avoid storing sensitive data in Local Storage or Session Storage as it can be accessed by any script running on the same domain.

These methods provide a simple and efficient way to store data on the client-side, enhancing the user experience by maintaining state and preferences across sessions.
