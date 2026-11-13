// Fechas: se comparan como año-mes-dia completos en la zona horaria configurada.
(function(g){
var C=g.CONFIG;
function fecha(n){return C.anio+'-'+C.desbloqueo[n-1]}
function ymd(d){try{return new Intl.DateTimeFormat('en-CA',{timeZone:C.zona,year:'numeric',month:'2-digit',day:'2-digit'}).format(d)}catch(e){return new Intl.DateTimeFormat('en-CA').format(d)}}
async function hoy(){
  if(C.fechaPrueba)return C.fechaPrueba;
  var d=new Date();
  if(C.usarHoraServidor){try{
    var a=new AbortController(),t=setTimeout(function(){a.abort()},2500);
    var r=await fetch(location.pathname,{method:'HEAD',cache:'no-store',signal:a.signal});clearTimeout(t);
    var h=r.headers.get('date');if(h&&!isNaN(new Date(h)))d=new Date(h);
  }catch(e){}}
  return ymd(d);
}
g.Tiempo={
  hoy:hoy,fecha:fecha,
  abierto:function(n,h){return h>=fecha(n)||h>=C.anio+'-'+C.cumple},
  bonita:function(n){var p=fecha(n).split('-').map(Number);return new Date(Date.UTC(p[0],p[1]-1,p[2])).toLocaleDateString('es',{day:'numeric',month:'long',timeZone:'UTC'})}
};
})(typeof window!=='undefined'?window:globalThis);
