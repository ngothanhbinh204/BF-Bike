import Parallax from "parallax-js";

export function paralaxInit(elSet, option) {
  const optionDefault = {
    relativeInput: true,
    scalarX: 10,
    scalarY: 10,
    frictionX: 0.1,
    frictionY: 0.1,
  };
  const configMain = { ...optionDefault, ...option };
  $(elSet).each((i, scene) => {
    new Parallax(scene, {
      relativeInput: configMain.relativeInput,
      scalarX: configMain.scalarX,
      scalarY: configMain.scalarY,
      frictionX: configMain.frictionX,
      frictionY: configMain.frictionY,
    });
  });
}
