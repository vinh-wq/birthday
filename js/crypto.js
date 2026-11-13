// Cifrado en el navegador: PBKDF2 + AES-GCM. Sirve para el sitio y para privado/constructor.html
(function(g){
var te=new TextEncoder(),td=new TextDecoder();
function b64(u){var s='';new Uint8Array(u).forEach(function(c){s+=String.fromCharCode(c)});return btoa(s)}
function ub(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()}
async function derivar(p,salt){
  var m=await crypto.subtle.importKey('raw',te.encode(norm(p)),'PBKDF2',false,['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:250000,hash:'SHA-256'},m,{name:'AES-GCM',length:256},true,['encrypt','decrypt']);
}
g.Boveda={
  async cifrar(p,texto){var s=crypto.getRandomValues(new Uint8Array(16)),i=crypto.getRandomValues(new Uint8Array(12));
    var k=await derivar(p,s);var c=await crypto.subtle.encrypt({name:'AES-GCM',iv:i},k,te.encode(texto));return{s:b64(s),i:b64(i),c:b64(c)}},
  claveDesde:function(p,e){return derivar(p,ub(e.s))},
  async abrir(e,k){return td.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:ub(e.i)},k,ub(e.c)))},
  async exportar(k){return b64(await crypto.subtle.exportKey('raw',k))},
  importar:function(s){return crypto.subtle.importKey('raw',ub(s),'AES-GCM',false,['decrypt'])}
};
})(typeof window!=='undefined'?window:globalThis);
