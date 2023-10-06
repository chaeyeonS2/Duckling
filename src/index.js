<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
=======
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda

// // // react17
// // ReactDOM.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

//react18
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
<<<<<<< HEAD
  </React.StrictMode>,
  document.getElementById("root"),
=======
  </React.StrictMode>
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
);
