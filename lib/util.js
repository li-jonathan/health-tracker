import run from "../public/icons/running-man.svg" 
import scale from "../public/icons/scale.svg"
import steak from "../public/icons/steak.svg"
import ice from "../public/icons/ice.svg"
import plate from "../public/icons/plate.svg"

export const metrics = [
  { icon: ice, label: "fl oz", path: "/water", dbName: "water" },
  { icon: run, label: "steps", path: "/steps", dbName: "steps"},
  { icon: scale, label: "lbs", path: "/weight", dbName: "weight"},
  { icon: plate, label: "calories", path: "/calories", dbName: "calories"}
];

