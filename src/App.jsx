import gsap from "gsap";

import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

import { Dock, Navbar, Welcome } from "@/components";
import { Safari, Terminal } from "./windows";

gsap.registerPlugin(useGSAP, Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
    </main>
  );
};

export default App;
