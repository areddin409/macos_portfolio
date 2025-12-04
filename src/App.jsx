import gsap from "gsap";

import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

import { Dock, Navbar, Welcome } from "@/components";
import { Terminal } from "./windows";

gsap.registerPlugin(useGSAP, Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  );
};

export default App;
