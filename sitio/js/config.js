// CONFIGURACION CENTRAL (publica; aqui NO van contrasenas)
window.CONFIG={
  anio:2026,
  zona:"America/El_Salvador",   // zona horaria que decide cuando cambia el dia
  // Mes-dia en que se abre cada tarjeta (1 a 12). Las ultimas dos son las sorpresas especiales: cambialas libremente.
  desbloqueo:["11-12","11-13","11-14","11-15","11-16","11-17","11-18","11-19","11-20","11-21","11-22","11-22"],
  cumple:"11-22",               // desde este dia se abren todas las tarjetas
  usarHoraServidor:true,        // usa la hora del hosting (no la del celular) cuando es posible
  fechaPrueba:"",               // SOLO PARA PROBAR: ej. "2026-11-18". Dejalo vacio ("") al publicar
  pistas:{}                     // opcional, ej. {1:"Es algo que me dices siempre"}
};
