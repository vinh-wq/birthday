// Pagina de cada dia: revisa la fecha, pide la clave y descifra el mensaje en el navegador.
(async function(){
  var n=+document.body.dataset.dia,$=function(i){return document.getElementById(i)};
  var caja=$('caja'),cont=$('contenido'),nav=document.querySelector('.dia-nav');
  var titulo=document.querySelector('.dia-fecha').textContent;
  var ls={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}},del:function(k){try{localStorage.removeItem(k)}catch(e){}}};
  var ICONO='<svg class="icono" viewBox="0 0 64 64" width="84" height="84" aria-hidden="true"><defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3c6d3"/><stop offset="1" stop-color="#d9c9f0"/></linearGradient></defs><path class="grillete" d="M21 29v-8a11 11 0 0 1 22 0v8" fill="none" stroke="#b5708a" stroke-width="4" stroke-linecap="round"/><rect x="13" y="28" width="38" height="26" rx="9" fill="url(#gl)" stroke="#b5708a" stroke-width="2"/><circle cx="32" cy="39.5" r="3.6" fill="#fffdfc"/><rect x="30.6" y="41" width="2.8" height="6" rx="1.4" fill="#fffdfc"/></svg>';
  function fotos(r){r.querySelectorAll('.photo img').forEach(function(img){
    var f=img.parentElement;f.dataset.ruta=img.getAttribute('src').replace('../','');
    function rev(){if(!img.naturalWidth)f.classList.add('vacia')}
    if(img.complete)rev();img.addEventListener('error',rev)})}
  function mostrar(html){cont.innerHTML=html;fotos(cont);caja.hidden=true;cont.hidden=false;nav.hidden=false;cont.classList.add('entra')}
  function panel(html){caja.innerHTML='<div class="halo"></div>'+ICONO+html;caja.hidden=false}
  var hoy=await Tiempo.hoy(),ent=(window.VAULT||{})[n];
  if(!Tiempo.abierto(n,hoy)){
    panel('<h2>Todavia no es momento</h2><p class="sub">Esta sorpresa se abre el '+Tiempo.bonita(n)+'. Vale la pena esperar.</p><a class="boton" href="../index.html">Volver al inicio</a>');return;
  }
  if(!ent){panel('<h2>'+titulo+'</h2><p class="sub">Esta sorpresa aun no esta lista.</p><a class="boton" href="../index.html">Volver al inicio</a>');return;}
  var g=ls.get('llave-'+n);
  if(g){try{mostrar(await Boveda.abrir(ent,await Boveda.importar(g)));return}catch(e){ls.del('llave-'+n)}}
  var pista=(CONFIG.pistas||{})[n];
  panel('<h2>'+titulo+'</h2><p class="sub">Esta sorpresa tiene una pequena llave. ¿Puedes descubrirla?</p>'+
    '<form id="f" autocomplete="off"><div class="campo"><input id="clave" type="password" placeholder="Escribe la clave" aria-label="Clave" autocapitalize="off" autocorrect="off" spellcheck="false"><button type="button" id="ver" aria-label="Mostrar u ocultar la clave">Ver</button></div><button class="boton" id="ok" type="submit">Desbloquear</button></form>'+
    '<p id="msg" role="status"></p>'+(pista?'<button type="button" class="enlace" id="pista">Necesito una pista</button>':''));
  var clave=$('clave'),msg=$('msg'),ok=$('ok');
  $('ver').onclick=function(){clave.type=clave.type==='password'?'text':'password'};
  if(pista)$('pista').onclick=function(){msg.textContent='Pista: '+pista};
  $('f').onsubmit=async function(e){
    e.preventDefault();
    if(!clave.value.trim()){msg.textContent='Escribe la clave para intentarlo.';return}
    ok.disabled=true;msg.textContent='Abriendo...';
    try{
      var k=await Boveda.claveDesde(clave.value,ent),html=await Boveda.abrir(ent,k);
      ls.set('llave-'+n,await Boveda.exportar(k));
      msg.textContent='Se abrio ♡'.replace(' ♡','.');caja.classList.add('abierta');
      setTimeout(function(){mostrar(html)},1100);
    }catch(err){
      caja.classList.remove('error');void caja.offsetWidth;caja.classList.add('error');
      msg.textContent='Esa no es la llave, pero puedes intentarlo otra vez.';ok.disabled=false;clave.select();
    }
  };
})();
