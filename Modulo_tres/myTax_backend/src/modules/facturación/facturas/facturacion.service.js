const emisores = [];
const receptores = [];

/* =========================
   EMISORES
========================= */

emisores.length = 0;
receptores.length = 0;

const guardarEmisor = (emisor) => {

  const index = emisores.findIndex(
    item => item.nombre === emisor.nombre
  );

  if (index >= 0) {
    emisores[index] = emisor;
  } else {
    emisores.push(emisor);
  }

  return emisor;
};

const obtenerEmisores = () => {

  for (let i = emisores.length - 1; i >= 0; i--) {

    if (!emisores[i].nombre?.trim()) {
      emisores.splice(i, 1);
    }

  }

  return emisores;
};

const eliminarEmisor = (nombre) => {

  const index = emisores.findIndex(
    emisor => emisor.nombre === nombre
  );

  if (index >= 0) {
    return emisores.splice(index, 1);
  }

  return null;
};



/* =========================
   RECEPTORES
========================= */

const guardarReceptor = (receptor) => {

  const index = receptores.findIndex(
    item => item.nombre === receptor.nombre
  );

  if (index >= 0) {
    receptores[index] = receptor;
  } else {
    receptores.push(receptor);
  }

  return receptor;
};

const obtenerReceptores = () => {

  for (let i = receptores.length - 1; i >= 0; i--) {

    if (!receptores[i].nombre?.trim()) {
      receptores.splice(i, 1);
    }

  }

  return receptores;
};

const eliminarReceptor = (nombre) => {

  const index = receptores.findIndex(
    receptor =>
      (receptor.nombre) === (nombre)
  );

  if (index >= 0) {
    return receptores.splice(index, 1);
  }

  return null;
};

module.exports = {
  guardarEmisor,
  obtenerEmisores,
  eliminarEmisor,


  guardarReceptor,
  obtenerReceptores,
  eliminarReceptor,
};