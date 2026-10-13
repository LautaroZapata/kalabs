/* Snippet vanilla para ViaGrúa, Oleo Cáceres y Cupo.
   Pegar antes de </body> cambiando PROJECT por su slug:
   kalabs | cupo | viagrua | oleocaceres
   No necesita clave de Supabase: habla con /api/track de kalabs.dev,
   que valida el slug y escribe en Supabase del lado servidor. */
(function () {
  var PROJECT = "cupo"; // <-- cambiar por sitio
  var ENDPOINT = "https://www.kalabs.dev/api/track";
  var sid = sessionStorage.getItem("kalabs-sid");
  if (!sid) {
    sid =
      crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + Math.random().toString(16).slice(2);
    sessionStorage.setItem("kalabs-sid", sid);
  }
  function mandar(evento) {
    var cuerpo = JSON.stringify({
      project: PROJECT,
      path: location.pathname,
      referrer: document.referrer.slice(0, 300),
      session: sid,
      evento: evento,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        ENDPOINT,
        new Blob([cuerpo], { type: "application/json" }),
      );
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: cuerpo,
        keepalive: true,
      }).catch(function () {});
    }
  }
  mandar("view");
  setInterval(function () {
    mandar("ping");
  }, 25000);
})();
